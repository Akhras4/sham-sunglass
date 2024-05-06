  
const favorites = require('../modules/favorites');
const product = require('../modules/product');
const users = require('../modules/user');

const addToFavorites = (req,res)=>{
     let userId=req.params.id;
    // console.log(userId)
    let {productId}=req.body;
    // console.log(productId)
    users.findById(userId)
    .populate('favorites')
        .then(user=>{
        if(! user){return res.status(500).json({errors:"user not found"})}
        if(!user.favorites){
            const newFavorites= new favorites({
                userId : user._id,
                items: []
            })
            return newFavorites.save()
            .then(savedFav => {
                user.favorites = savedFav._id;
                return user.save();
              })
        }else{
        const newItem = {
            productId
        }
        // console.log(newItem)
        user.favorites.items.push(newItem);
        // console.log(user)
        return  user.favorites.save();
    }
})
        .then(savedFavorites =>{
            // console.log("savedUser",savedFavorites )
            res.status(200).json({favorites:savedFavorites })
        })
        .catch(err=>{
            res.status(500).json({err})
        })
    
}

const removeItem =(req,res) =>{
  const userId=req.params.id;
  console.log(userId)
  const {productId}=req.body;
  users.findById(userId)
  .populate({
    path: 'favorites',
    populate: {
        path: 'items.product'
    }
})
  .then(user=>{
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (!user.favorites || !user.favorites.items) {
        return res.status(404).json({ message: 'Favorites list not found' });
    }
   const findIndex = user.favorites && user.favorites.items ? user.favorites.items.findIndex(item =>{  console.log(item.productId.toString());
    return item.productId.toString() === productId.toString();}) : -1;
    if (findIndex !== -1) {
        user.favorites.items.splice(findIndex, 1);
        return user.favorites.save();
    } else {
        return res.status(404).json({ message: 'Item not found in wishList' });
    }
  })
  .then((savedFavCart ) => {
    console.log(savedFavCart);
    res.json({ message: 'Fav item found', favorites: savedFavCart });
})
  .catch(error => {
      return res.status(500).json({ error: error.message });
  });
}

const getFav= (req,res)=>{
    const userId =req.params.id
    users.findById(userId)
    .populate({
        path:"favorites",
        populat:{
            path:"items.product",
        }
    })
    .then(favData =>{
        res.status(200).json({favorites:favData.favorites})
    })
    .catch(err =>{

    })
}


module.exports ={ addToFavorites, removeItem,getFav}