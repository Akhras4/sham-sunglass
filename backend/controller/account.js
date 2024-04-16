
const { model, Error } = require('mongoose');
const users = require("../modules/user");
const userinfo = require("../modules/userinfo");

const account=(req,res)=>{
    if ( req.method === "GET" ){
        const userid = req.params.id;
       users.findOne({_id:userid})
             .then(user=>{
                userinfo.findOne({user_id:userid})
                .then(userinfo=>{
                    if(!userinfo){
                       return res.status(200).json( {
                        userid,
                        username:user.UserName,
                        email:user.email,
                        phoneNumber:user.phoneNumber,
                        userinfo:null,
                     } ) 
                    }
                    res.status(200).json(
                     {userid,
                        username:user.UserName,
                        email:user.email,
                        phoneNumber:user.phoneNumber,
                        address:[...user.userinfo],

                    } )

                }).catch((err)=>{
                      res.status(200).json( {userid,username:user.UserName,email:user.email,phoneNumber:user.phoneNumber} )
                })
         }).catch(err=>{res.status(400).json( "Method Not Allowed" )})
    }  

/* This part of the code snippet is handling the logic for updating user information when a POST
request is made to the `/user/:id/account` endpoint. Here's a breakdown of what the code is doing: */
if (req.method === "POST") {
    const userId = req.params.id;
    console.log(userId);
    const { name, street, postalCode, city, country } = req.body;
    console.log(name);
    users.findOne({ _id: userId })
        .then(user => {
            userinfo.findOne({ user_id: userId })
                .then(userInfo => {
                    if (!userInfo) {
                        userInfo = new userinfo({
                            user_id: userId,
                            name,
                            street,
                            postalCode,
                            city,
                            country
                        });
                    } else {
                        userInfo.name = name;
                        userInfo.street = street;
                        userInfo.postalCode = postalCode;
                        userInfo.city = city;
                        userInfo.country = country;
                    }
                    userInfo.save()
                        .then(() => {
                            res.status(200).json({ redirect: 'http://localhost:3000/user' });
                        })
                        .catch(err => {
                            console.error("Error saving userinfo:", err);
                            res.status(500).send("Something went wrong, please try again.");
                        });
                })
                .catch(err => {
                    console.error("Error finding userinfo:", err);
                    res.status(500).send("Something went wrong, please try again.");
                });
        })
        .catch(err => {
            console.error("Error finding user:", err);
            res.status(500).send("Something went wrong, please try again.");
        });
}
}




module.exports = {
    account,    
}