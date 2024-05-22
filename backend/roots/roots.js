const { Router } = require("express");
const express = require('express');
const DoThis=require("../controller/regerstriton")
const router=Router()
const account=require("../controller/account")
const CartController = require("../controller/shopping")
const Fav = require("../controller/wishlist")
const strip=require("../controller/payment")
const bodyParser = require('body-parser');
router.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

router.post('/webhook', bodyParser.raw({ type: 'application/json' }),strip.webhook)

router.get("/api",DoThis.redirecttologin)

router.get("/signup",DoThis.singup)
router.post("/signup",DoThis.singup)


router.get(`/VerificationEmail`,DoThis.tokenval)

router.get("/login",DoThis.login)
router.post("/login",DoThis.login)

router.get("/logout",DoThis.cookieJWTAuth,DoThis.logout)
router.post("/logout",DoThis.cookieJWTAuth,DoThis.logout)


router.get(`/user/:id`,DoThis.cookieJWTAuth,account.account)
router.post(`/:id`,DoThis.cookieJWTAuth,account.account)

router.post("/cart/:id", CartController.addToCart);
router.get("/cart/:id", CartController.shoppingcart);


router.post("/removeFromCart/:id", CartController.removeFromCart);


router.post("/wishList/:id",Fav.addToFavorites)
router.get('/wishList/:id',Fav.getFav)
router.post('/wishList/removeFromWishList/:id',Fav.removeItem)

router.post('/user/createOrder/:id',DoThis.cookieJWTAuth,strip.createPaymentIntent)
// router.post('/webhook/:id',DoThis.cookieJWTAuth, express.raw({ type: 'application/json' }),strip.webhook)
// router.post('/webhook', express.raw({ type: 'application/json' }),strip.webhook)



module.exports = router;
