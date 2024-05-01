const { Router } = require("express");
const DoThis=require("../controller/regerstriton")
const router=Router()
const account=require("../controller/account")
const CartController = require("../controller/shopping")


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

module.exports = router;
