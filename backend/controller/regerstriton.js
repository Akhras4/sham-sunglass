const { model, Error } = require('mongoose');
const users = require("../modules/user");
const product=require("../modules/product")
const crypto=require("crypto")
const bcrypt=require("bcrypt");
require('dotenv').config();
const nodemailer = require("nodemailer");
const PORT = process.env.PORT ;
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { render } = require('ejs');

const redirecttologin =( req,res) =>{
if(req.method==="GET"){
    product.find()
    .then((product)=>{
        res.json({product})
    })
}
}

const singup = (req, res) => {
    if (req.method === "GET") {
        return res.json({ errors: null })
    } else if (req.method === "POST") {
        console.log(req.body)
        const { UserName, Password, email, phoneNumber, IPAddress } =req.body
        console.log(req.body)
        users.findOne({ email })
            .then((usercheck)=>{ if ( usercheck ){
             return res.status(400).send({ errors: { message: "the email has already registed" }})
            }else{
            let emailtoken = crypto.randomBytes(64).toString("hex")
            const NewUser = new users({UserName, Password, email, phoneNumber, IPAddress, emailtoken})
            NewUser.save()
            .then(() => {
                const hash = bcrypt.hashSync(Password, 15);
                NewUser.Password = hash;
                return NewUser.save();
            })
            .then(() => {
                sendemailtoclient(email, UserName, emailtoken, PORT);
                res.status(200).json({redirect: 'http://localhost:3000/wait'});
            })
            .catch((saveError) => {
                if (saveError.name === 'ValidationError') {
                    let errors = {};
                    Object.keys(saveError.errors).forEach((key) => {
                        errors[key] = saveError.errors[key].message;
                    });
                    return res.status(400).json( { errors: errors });
                } else {
                    handleSavingError(NewUser, email, res);
                }
            });
            function handleSavingError(user, email, res) {
                user.deleteOne({ email })
                    .then(() => {
                        return res.status(400).json( { errors: { message: "Failed to save user" }});
                    })
                    .catch((deleteError) => {
                        res.status(500).json({ error: "Error deleting user", deleteError });
                    });
            }
        
    }
})}}


const tokenval = (req, res) => {
    const emailtoken = req.query.emailtoken;
    if (!emailtoken) return res.status(404).json("Token not found");
    users.findOneAndUpdate({ emailtoken }, { isValid: true, emailtoken: null },{ new:true }) 
        .then(newUser => {
            const payload = {
                userId: newUser._id,
                UserName: newUser.UserName
            };
            jwt.sign(payload, process.env.MY_SECRET, { algorithm: 'HS256',expiresIn: '4h' }, (err, token) => {
                if (err) {
                    res.status(500).json({ error: "Failed to generate token" });
                } else {
                    res.cookie("token",token)
                    console.log(token)
                    res.writeHead(302, {
                        Location: `http://localhost:3000/`
                    });
                    res.end();
                    //res.status(200).json({ redirect:`http://localhost:3002/user`});//${newUser._id}
                }
            })
        })
        .catch(error => {
           return res.status(404).json("deed token");
        })
};


async function sendemailtoclient(email,UserName,emailtoken,PORT){
    console.log(emailtoken)
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
        const info = await transporter.sendMail({
            from: '"registration-system 👻" <aboakhras4@gmail.com>',
            to: email,
            subject: "Hello ✔",
            text: `Hello ${UserName}`,
            html: `<b>Hello ${UserName}</b> <a href="http://localhost:${PORT}/VerificationEmail?emailtoken=${emailtoken}">Verification Link</a>`
        });
        HoldingUntileRedirect(email)
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

 function HoldingUntileRedirect(email){
                setTimeout(() => {
                users.findOne({email}) 
                    .then((newuser)=>{
                        if (newuser.isValid === false) {
                             newuser.deleteOne({ email })
                                .then(() =>{
                                     console.log("User deleted successfully")
                                      return
                                    })
                                .catch((err) => console.error("Error deleting user:", err));
                    }}) 
              }, 150000);           
}


const login = (req,res)=>{
    if(req.method==="GET"){ 
        res.json({ errors: null })
    }else if(req.method==="POST"){
       const{email,Password}=req.body;
       if(!email || !Password) return res.status(404).json( {errors:"passwords or username  uncorrect"})
       users.findOne({email})
            .then((discover)=>{
                if (!discover) {
                    return res.status(400).json( { errors: 'Passwords or username incorrect' });
                }
               console.log(discover)
               bcrypt.compare(Password, discover.Password, (err, result) => {
                if(err){
                    res.status(400).json({message:"err"})//.render("login")
                }
                if (result){
                    const payload = {
                    userId: discover._id,
                    UserName: discover.UserName
                };
                console.log(discover)
                jwt.sign(payload, process.env.MY_SECRET, { algorithm: 'HS256',expiresIn: '1h' }, (err, token) => {
                    if (err) {
                        res.clearCookie(token);
                        res.status(500).json({ error: "Failed to generate token" });
                    } else {
                        res.cookie("token",token, {
                            path: '/',
                            domain: 'localhost',
                            secure: process.env.NODE_ENV === 'production', // Set to true for production
                            sameSite: 'strict',
                          });
                        console.log(token)
                        res.json({ redirect:"http://localhost:3000/" , token }).res.status(200).json({ token });
                    }
                });
               }else{
                return res.status(400).json({errors: 'passwords or username  uncorrect'})
               }})
            })
            .catch(error=>{
                console.error(error); 
                 res.status(500).json({message:"Internal Server Error"});
            })
    }
};


const cookieJWTAuth = (req, res, next) => {
    const token = req.query.token;
    if (!token) {
        console.log('tokencheck',token)
        res.clearCookie("token");
        return res.json({ redirect:"http://localhost:3000/signup"});
    }
    jwt.verify(token, process.env.MY_SECRET, { algorithm: 'HS256' }, (err, user) => {
        if (err) {
            console.log(err)
            res.clearCookie("token");
            return res.json({ redirect:"http://localhost:3000/signup"});
        } else {
            req.user = user;
            console.log(user);
            next();
        }
    });
};


const logout=(req,res)=>{
    if(req.method==="GET"){
        res.cookie('token','', { expires: new Date(0) })
        console.log('token')
        res.json({ redirect:'http://localhost:3000/'});
    }
}



const user=(req,res)=>{
    if (req.method === "GET") {
        if (req.cookies && req.cookies.token) {
            console.log('Token cookie cleared');
            res.json({ redirect: 'http://localhost:3000/' });
        } else {
            console.log('No token cookie found');
            res.json({ redirect: 'http://localhost:3000/' });
        }
    }
}

module.exports = {
    singup,
    tokenval,
    login,
    cookieJWTAuth,
    logout,
    user,
    redirecttologin,    
}