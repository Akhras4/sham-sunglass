const Order = require('../modules/order');
const users =require('../modules/user')
const product=require('../modules/product')


const order=(req,res)=>{
    if(req.method==="GET"){
    const userId=req.params.id
    users.findById(userId)
    .populate({
        path:'order',
        populate:{
            path:'items.product'
        }
        })
    .then(user=>{
        if(!user){
            return res.status(404).json({message:"User not found"})
            }
         if(!user.order){
            return res.status(404).json({error:'Order not found if You hane any expected order place contact with custoner support'})
         } 
         console.log("order :",user.order)  
         res.status(200).json({order:user.order}) 
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({error:err.message})
    })    
    }else{
        res.status(400).json({error:'method not allowd'})
    }
}
module.exports={
    order
}