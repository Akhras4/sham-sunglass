
const { model, Error } = require('mongoose');
const users = require("../modules/user");
const userinfo = require("../modules/userinfo");
const mongoose = require('mongoose');
const axios = require('axios');

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

const googleApi = process.env.googleApi;
const europeanCountries = [
    "Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus", "Belgium", "Bosnia and Herzegovina", 
    "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Georgia", 
    "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Kazakhstan", "Kosovo", "Latvia", "Liechtenstein", 
    "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia", 
    "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia", 
    "Spain", "Sweden", "Switzerland", "Turkey", "Ukraine", "United Kingdom", "Vatican City"
];
const countryMapping = {
    'Nederland': 'Netherlands',
    'Verenigd Koninkrijk': 'United Kingdom',
    'Duitsland': 'Germany',
    'Spanje': 'Spain',
};
const addressValidation =( req,res) =>{
        if (req.method === "GET") {
            if (req.method === "GET") {
                const address = req.query.address;
                // console.log(address, 'address');
        
                const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
                // console.log(url);
                axios.get(url)
                    .then(response => {
                        const data = response.data;
                        // console.log(data);
                        if (data && data.length > 0) {
                            const displayName = data[0].display_name;
                            if (displayName) {
                                const apiCountry = displayName.split(',').pop().trim();
                                const country = countryMapping[apiCountry] || apiCountry;
                                const isInEurope = europeanCountries.includes(country);
        
                                // console.log(`Address: ${displayName}`);
                                // console.log(`Is in Europe: ${isInEurope}`);
        
                                return res.status(200).json({ isInEurope });
                            } else {
                                // console.log('No valid address found in the API response.');
                                return res.status(400).json({ isInEurope: false });
                            }
                        } else {
                            // console.log('No data received from the API.');
                            return res.status(400).json({ isInEurope: false });
                        }
                    })
                    .catch(error => {
                        // console.error('Error fetching data from API:', error);
                        return res.status(500).json({ error: 'Internal Server Error' });
                    });
            } else {
                return res.status(405).json({ error: 'Method Not Allowed' });
            }
        };
    }


module.exports = {
    account,
    addressValidation    
}