
// import wishlist collection
const wishlists = require("../model/wishlistSchema");

// Logic for Wishlist
// Add Product to Wishlist
exports.addToWishlist = async(req, res) => {
    //Get specific product details from the request
            // req.body={ 
            //   "id":"123",
            //   "title":"Apple Watch",
            //   "price":"$500"
            // }    
      // Js destructuring
    const { id, title, price, image } = req.body;
      // logic for wishlist 
    try{
      //check if product is already in the wishlist
      const item = await wishlists.findOne({id})
      if(item){
        res.status(401).json("Item Already In Your Wishlist...🤩 ")
      } else{
        // product is added to the wishlist
        const newProduct = await wishlists({id ,title, price, image})
        // to store in db
        await newProduct.save()
        res.status(200).json("Item Added To Wishlist...❤️ ") // Response sent back to client 
      }
    }catch(err){
      res.status(404).json(err)
    }
  }
  
 // get wishlist product from db
exports.getWishlist = async(req, res) => {
    try{
      const allWishlist = await wishlists.find();
      res.status(200).json(allWishlist); // response send back to the client
      console.log(allWishlist);
    } catch(err){
      res.status(401).json(err); // error send back to the client
      console.log(err);
    }
 }

// Delete wishlist product from db
exports.deleteWishlist = async(req, res) => {
  //get particular id
  const {id} = req.params
  try {
    // Logic
    // delete wishlist product from db
    const removeWishlist = await wishlists.deleteOne({id})
    if(removeWishlist){
      // get all wishlist product from db after delete particular product
      const remainingWishlist = await wishlists.find()
      res.status(200).json(remainingWishlist)
    }
  } catch(err) {
    res.status(401).json(err); // error send back to the client
    console.log(err);
  }
}