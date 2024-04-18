
const { model, Error } = require('mongoose');
const users = require("../modules/user");
const userinfo = require("../modules/userinfo");
const mongoose = require('mongoose');

const account=(req,res)=>{
    if ( req.method === "GET" ){
        const userid = req.params.id;
       users.findOne({_id:userid})
           .populate('userinfo')
            .exec()
             .then(user=>{
                userinfo.findOne({user_id:userid})
                .then(userinfo=>{
                    if(!userinfo){
                       return res.status(200).json( {
                        userid,
                        username:user.UserName,
                        email:user.email,
                        phoneNumber:user.phoneNumber,
                        address: user.userinfo || null,
                     } ) 
                    }console.log(user.userinfo )
                    res.status(200).json(
                     {userid,
                        username:user.UserName,
                        email:user.email,
                        phoneNumber:user.phoneNumber,
                        address: user.userinfo || null,

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
    const { name, street, postalCode, city, country } = req.body;
    users.findOne({ _id: userId })
        .then(user => {
            userinfo.findOneAndUpdate(
                { user_id: userId },
                { name, street, postalCode, city, country },
                { new: true, upsert: true } // Add upsert: true to create new document if not found
            )
                .then(updatedUserInfo => {
                    return users.findOneAndUpdate(
                        { _id: userId },
                        { userinfo: updatedUserInfo._id }, 
                        { new: true }
                    ).populate('userinfo').exec();
                })
                .then(populatedUser => {
                    res.status(200).json({ address: populatedUser.userinfo });
                })
                .catch(err => {
                    console.error("Error:", err);
                    res.status(500).send("Something went wrong, please try again.");
                });
        })
        .catch(err => {
            console.error("Error:", err);
            res.status(500).send("Something went wrong, please try again.");
        });
}
}




module.exports = {
    account,    
}