require('dotenv').config();
const MSKS = process.env.MSKS ;
const stripe = require('stripe')(MSKS);
const Order = require('../modules/order');
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const users =require('../modules/user')
const mongoose = require('mongoose'); 
const nodemailer = require('nodemailer');
const ejs = require('ejs');

// Endpoint to create a Stripe Checkout session
const createPaymentIntent = (req, res) => {
    if (req.method === "POST") {
        const { total, productShoppingCart } = req.body;
        const userid='661dbc7a87b819759df37872'
        const amount=Object.values(total).flat()
        // console.log(amount, "amount", "productShoppingCart", productShoppingCart);
        let productShoppingCarts = [];
        if (Array.isArray(productShoppingCart)) {
            productShoppingCarts = productShoppingCart;
        } else if (typeof productShoppingCart === 'object' && productShoppingCart !== null) {
            productShoppingCarts = Object.values(productShoppingCart).flat();
        } else {
            return res.status(400).json({ error: "Invalid format for productShoppingCart" });
        }
        
        console.log(productShoppingCarts)
        console.log(typeof(productShoppingCarts))
        let totalPrice=0;
        productShoppingCarts.forEach(item =>{
            itemPrice  = item.isOnSale ? Number(item.salePrice) : Number(item.price)
        console.log(itemPrice , "itemPrice ")
        totalPrice += itemPrice ;
       
})
console.log(totalPrice , "totalPrice ")
console.log(amount[0],"amount.values")
if (totalPrice==amount[0]){
    console.log(amount , "amount ")
        const lineItems = productShoppingCarts.map(item => ({
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: item.description || 'Product',
                         images: [item.image[0]],
                    },
                    unit_amount: item.isOnSale ? Number(item.salePrice) * 100 : Number(item.price) * 100, // price is in cents
                },
                quantity: item.count,
            })) 
        stripe.checkout.sessions.create({
            payment_method_types: ['card','ideal'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,  
            cancel_url: 'https://localhost:3000/waitingpage',
            metadata: {
                userId: userid ,
              },
        })
   
        .then(session => {
            console.log("Session created:", session);
            res.json({sessionId: session.id, checkoutUrl: session.url});
        })
        .catch(error => {
            console.error("Error creating checkout session:", error);
            res.status(500).json({ error: "Failed to create checkout session" });
        });
    }
}else{
    console.log("Someting Wrong Please Try Agine")
    res.status(500).json({ error: "Failed to create checkout session" });
}
};
const webhook =  (req, res) => {
        const sig = req.headers['stripe-signature'];
        let event;
        try {
            event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
        } catch (err) {
            console.error(`Webhook signature verification failed: ${err.message}`);
            return res.sendStatus(400);
        }
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            const userId = session.metadata.userId;
            console.log(userId,"userId")
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                console.error('Invalid user ID:', userId);
                return res.status(400).send('Invalid user ID');
            }
    users.findById(userId)
    .populate({
        path: 'shoppingCart',
        populate: { path: 'items.product' }
    })
    .then(user => {
        const items = user.shoppingCart.items;
        const email=user.email
        const UserName=user.UserName
        console.log("User's shopping cart items:", items);
        
        const newOrderItems = items.map(item => ({
            productId: item.productId,
            size: item.size,
            product: item.product
        }));
        const isValidOrder = Array.isArray(newOrderItems) && newOrderItems.every(item => !!item.productId);
        if (!isValidOrder) {
            console.error('Invalid order items:', newOrderItems);
            return res.status(400).send('Invalid order items');
        }
        
        const newOrder = new Order({
            userId: user._id,
            items: newOrderItems,
            shippingStatus: 'pending', 
            trackingNumber: null
        });
        
        if (user.order && Array.isArray(user.order)) {
            console.log("User already has existing orders. Pushing the new order...");
            user.order.push(newOrder._id);
        } else {
            console.log("User doesn't have existing orders. Creating a new order array...");
            user.order = [newOrder._id]; 
        }
        user.shoppingCart = {};
        return Promise.all([newOrder.save(), user.save()])
            .then(([savedOrder, savedUser]) => {
                console.log('Order created and associated with user:', savedOrder);
                order(email,UserName,items,newOrder._id)
                return savedOrder;
            });
    })
    .then(() => {
        console.log('Order processing completed successfully for user ID:', userId);
        res.status(200).end();
    })
    .catch(error => {
        console.error('Error processing order:', error);
        res.status(500).send('Internal Server Error');
    });
    } else {
        res.status(200).end();
    }
};


async function order(email, UserName,items,orderNumber) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.Appemail,
            pass: process.env.AppPassword,
        },
    });

    try {
        const renderedHtml = await ejs.renderFile('views/emails/order.ejs', { UserName, items, orderNumber });
        const info = await transporter.sendMail({
            from: '"order " <aboakhras4@gmail.com>',
            to: email,
            subject: "Order",
            html: renderedHtml
        });
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

module.exports = { createPaymentIntent,webhook};