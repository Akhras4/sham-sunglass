require('dotenv').config();
const MSKS = process.env.MSKS;
const stripe = require('stripe')(MSKS);
const Order = require('../modules/order');
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const users = require('../modules/user')
const product = require('../modules/product')
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const ejs = require('ejs');

// Endpoint to create a Stripe Checkout session
const createPaymentIntent = (req, res) => {
    if (req.method === "POST") {
        const { total, productShoppingCart } = req.body;
        const userid = req.params.id
        console.log("userid",userid)
        const amount = Object.values(total).flat()
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
        console.log(typeof (productShoppingCarts))
        let totalPrice = 0;
        productShoppingCarts.forEach(item => {
            itemPrice = item.isOnSale ? Number(item.salePrice) : Number(item.price)
            const itemCount = item.count || 1
            console.log(itemPrice, "itemPrice ")
            totalPrice += itemPrice * itemCount;
        })
        console.log(totalPrice, "totalPrice ")
        console.log(amount[0], "amount.values")
        if (totalPrice == amount[0]) {
            console.log(amount, "amount ")
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
                payment_method_types: ['card', 'ideal'],
                line_items: lineItems,
                mode: 'payment',
                success_url: `http://localhost:3000/user?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: 'https://localhost:3000/waitingpage',
                metadata: {
                    userId: userid,
                },
            })

                .then(session => {
                    console.log("Session created:", session);
                    res.json({ sessionId: session.id, checkoutUrl: session.url });
                })
                .catch(error => {
                    console.error("Error creating checkout session:", error);
                    res.status(500).json({ error: "Failed to create checkout session" });
                });
        }
    } else {
        console.log("Someting Wrong Please Try Agine")
        res.status(500).json({ error: "Failed to create checkout session" });
    }
};
const webhook = (req, res) => {
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
        console.log(userId, "userId")
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
                if (!user || !user.shoppingCart || !user.shoppingCart.items) {
                    throw new Error('User or shopping cart not found');
                }
                const items = user.shoppingCart.items;
                const email = user.email;
                console.log(email)
                const UserName = user.UserName;
                const productPromises = items.map(item => product.findById(item.productId));
                return Promise.all(productPromises).then(products => ({ user, items, products, email, UserName }));
            })
            .then(({ user, items, products, email, UserName }) => {
                console.log("email", email)
                if (!products || products.length === 0) {
                    throw new Error('No products found');
                }
                const deliveryAt3Items = [];
                const deliveryAt10Items = [];
                products.forEach((product, index) => {
                    if (!product) {
                        console.error('Product not found for item:', items[index]);
                        return;
                    }
                    const deliveryAt = product.deleveryAt;
                    console.log(`Product ${product._id} deliveryAt: ${deliveryAt}`);
                    const item = items[index];
                    if (deliveryAt === "3") {
                        deliveryAt3Items.push(item);
                    } else if (deliveryAt === "10") {
                        deliveryAt10Items.push(item);
                    } else {
                        console.error(`Invalid deliveryAt value for Product ${product._id}: ${deliveryAt}`);
                        return  // Skip this item and continue with next
                    }
                });

        const getNextBusinessDay = (currentDate) => {
            const dayOfWeek = currentDate.getDay();
            let daysToAdd = 1; // Default to the next day

            // If current day is Friday (5), skip to Monday (1)
            if (dayOfWeek === 5) {
                daysToAdd = 3;
            } else if (dayOfWeek === 6) { // If current day is Saturday (6), skip to Monday (1)
                daysToAdd = 2;
            }

            const deliveryDate = new Date(currentDate);
            deliveryDate.setDate(currentDate.getDate() + daysToAdd);

            return deliveryDate;
        };
        const calculateExpectedDeliveryDate = (deliveryAt) => {
            const deliveryDays = parseInt(deliveryAt, 10); // Convert deliveryAt to integer

            if (isNaN(deliveryDays) || deliveryDays <= 0) {
                throw new Error('Invalid or non-positive delivery days provided');
            }

            let deliveryDate = new Date();
            deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);

            while (deliveryDate.getDay() === 0 || deliveryDate.getDay() === 6) {
                deliveryDate = getNextBusinessDay(deliveryDate);
            }

            if (!(deliveryDate instanceof Date && !isNaN(deliveryDate))) {
                throw new Error('Failed to calculate valid delivery date');
            }

            return deliveryDate;
        };
                const createOrder = (orderItems,deliveryAt) => {
                    const isValidOrder = orderItems.every(item => !!item.productId);
                    if (!isValidOrder) {
                        console.error('Invalid order items:', orderItems);
                        return Promise.reject('Invalid order items');
                    }
                    const expectedDeliveryDate = calculateExpectedDeliveryDate(deliveryAt);
                    const newOrder = new Order({
                        userId: user._id,
                        items: orderItems,
                        shippingStatus: 'pending',
                        trackingNumber: null,
                        expectedDeliveryDate: expectedDeliveryDate
                    });
                    return newOrder.save()
                        .then(savedOrder => {
                            console.log('Order created:', savedOrder);
                            return savedOrder;
                        }).catch(err => {
                            console.error('Error saving order:', err);
                            throw err;
                        });
                };
                const promises = [];
                let expectedDeliveryDate
                if (deliveryAt3Items.length > 0) {
                    promises.push(createOrder(deliveryAt3Items,'3'));
                }
                if (deliveryAt10Items.length > 0) {
                    promises.push(createOrder(deliveryAt10Items, '10'));
                }
                return Promise.all(promises)
                    .then(savedOrders => ({ user, savedOrders, email, items, UserName }));
            })
            .then(({ user, savedOrders, email, items, UserName }) => {
                console.log(email)
                if (savedOrders.length > 0) {
                    console.log('Saved orders:', savedOrders);
                    user.shoppingCart.items = [];
                    user.order = user.order || [];
                    user.order = [...user.order, ...savedOrders.map(order => order._id)];
                    user.shoppingCart = {};
                    const orderNumber = savedOrders.map(savedOrder => savedOrder._id);
                    order(email, UserName, items, orderNumber);
                    // emailTurkey="Sfsfshe3@gmail.com"
                    // order(emailTurkey, UserName, items, orderNumber)
                    return user.save();
                } else {
                    throw new Error('No orders were created');
                }
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


async function order(email, UserName, items, orderNumber) {
    console.log(email)
    console.log(orderNumber)
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

module.exports = { createPaymentIntent, webhook };