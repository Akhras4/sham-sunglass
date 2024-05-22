require('dotenv').config();
const MSKS = process.env.MSKS ;
const stripe = require('stripe')(MSKS);
const Order = require('../modules/order');
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const users =require('../modules/user')
const mongoose = require('mongoose'); 

// Endpoint to create a Stripe Checkout session
const createPaymentIntent = (req, res) => {
    if (req.method === "POST") {
        const { total, productShoppingCart } = req.body;
        const userid='661dbc7a87b819759df37872'
        const amount=Object.values(total)
        console.log(amount, "amount", "productShoppingCart", productShoppingCart);
        const productShoppingCarts =  Object.values(productShoppingCart);
        console.log(typeof(total))
        console.log(productShoppingCart)
        console.log(typeof(productShoppingCarts))
        const lineItems = productShoppingCarts.map(item => ({
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: item.description || 'Product',
                    },
                    unit_amount: amount * 100, // price is in cents
                },
                quantity: 10,
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
            items: newOrderItems
        });
        
        if (user.order && Array.isArray(user.order)) {
            console.log("User already has existing orders. Pushing the new order...");
            user.order.push(newOrder._id);
        } else {
            console.log("User doesn't have existing orders. Creating a new order array...");
            user.order = [newOrder._id]; 
        }
        
        return Promise.all([newOrder.save(), user.save()])
            .then(([savedOrder, savedUser]) => {
                console.log('Order created and associated with user:', savedOrder);
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

module.exports = { createPaymentIntent,webhook};