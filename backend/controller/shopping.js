const users = require('../modules/user');
const product = require('../modules/product');
const ShoppingCart = require('../modules/shoppingcart');

const addToCart = (req, res) => {
    const userId = req.params.id;
    const {productId, size  } = req.body;
    console.log(userId ,productId, size)
    users.findById(userId)
    .populate('shoppingCart')
    .then(user => {
        if (!user) {
          throw new Error('User not found');
        }
      if (!user.shoppingCart) {
        const newShoppingCart = new ShoppingCart({ userId: user._id, items: [] });
        return newShoppingCart.save()
          .then(savedCart => {
            user.shoppingCart = savedCart._id;
            return user.save();
          })
      } else {
            const newItem = {
                productId: productId,
                size: size
            };
            user.shoppingCart.items.push(newItem);
            return  Promise.all([user.save(), user.shoppingCart.save()]);
        }
    })
    .then((savedUser) => {
        res.status(200).json({ user: savedUser });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
};



const shoppingcart=(req,res)=>{
    if (req.method==="GET"){
    userId=req.params.id;
    console.log(userId)
       users.findById(userId)
       .populate({
        path: 'shoppingCart',
        populate: {
            path: 'items.product'
        }
    })
       .then((user)=>{
        console.log(user)
        if (!user.shoppingCart) {
            return res.status(404).json({ message: 'Shopping cart not found for this user' });
        }
        return res.status(200).json({ message: 'Shopping cart found', shoppingCart: user.shoppingCart });
       })
       .catch(error => {
        return res.status(500).json({ error: error.message });
    });
}
}
  
  module.exports = { addToCart,shoppingcart };