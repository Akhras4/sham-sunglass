const users = require('../modules/user');
 
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
        }
        return  Promise.all([user.save(), user.shoppingCart.save()]);
    })
    .then((savedUser) => {
        res.status(200).json({ user: savedUser });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
};
const removeFromCart = (req, res) => {
  if (req.method === 'POST') {
      const userId = req.params.id;
      console.log(userId);
      const { productId } = req.body;
      console.log(productId);
      users.findById(userId)
      .populate({
        path: 'shoppingCart',
        populate: {
            path: 'items.product'
        }
    })
          .then(user => {
              if (!user) {
                  return res.status(404).json({ message: 'User not found' });
              }
              const indexToRemove = user.shoppingCart && user.shoppingCart.items ? user.shoppingCart.items.findIndex(item =>{  console.log(item.productId.toString()); // Convert ObjectId to string for comparison
              return item.productId.toString() === productId.toString();}) : -1;
              console.log(indexToRemove)
              if (indexToRemove !== -1) {
                  user.shoppingCart.items.splice(indexToRemove, 1);
                  return user.shoppingCart.save();
              } else {
                  return res.status(404).json({ message: 'Item not found in shopping cart' });
              }
          })
          .then((savedShoppingCart ) => {
            console.log(savedShoppingCart );
            res.json({ message: 'Shopping cart found', shoppingCart: savedShoppingCart  });
        })
          .catch(error => {
              return res.status(500).json({ error: error.message });
          });
  }
};
const shoppingcart=(req,res)=>{
    if (req.method==="GET"){
    userId=req.params.id;
    console.log(userId)
    getData(userId)
    .then(data => {
      res.status(200).json(data);
  })
  .catch(error => {
      res.status(500).json({ error: error.message });
  });

}
}
const getData=(userId)=>{
  users.findById(userId)
  return new Promise((resolve, reject) => {
    users.findById(userId)
        .populate({
            path: 'shoppingCart',
            populate: {
                path: 'items.product'
            }
        })
        .then((user) => {
            console.log(user);
            if (!user.shoppingCart) {
                throw new Error('Shopping cart not found for this user');
            }
            resolve({ message: 'Shopping cart found', shoppingCart: user.shoppingCart });
        })
        .catch(error => {
            reject(error);
        });
});
}

  
  module.exports = { addToCart,shoppingcart,removeFromCart };