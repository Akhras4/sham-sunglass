const { Router } = require("express");
const DoThis=require("../controller/regerstriton")
const router=Router()
const account=require("../controller/account")



router.get("/api",DoThis.redirecttologin)

router.get("/signup",DoThis.singup)
router.post("/signup",DoThis.singup)


router.get(`/VerificationEmail`,DoThis.tokenval)

router.get("/login",DoThis.login)
router.post("/login",DoThis.login)

router.get("/user/:id/logout",DoThis.cookieJWTAuth,DoThis.logout)
router.post("/user/:id/logout",DoThis.cookieJWTAuth,DoThis.logout)


router.get(`/user/:id`,DoThis.cookieJWTAuth,account.account)
router.post(`/:id`,DoThis.cookieJWTAuth,account.account)

module.exports = router;
