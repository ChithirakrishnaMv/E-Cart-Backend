// import cart schema
const carts = require('../model/cartSchema');

// add to cart
exports.addToCart = async(req, res) => {
  // Get product details from request
  const { id, title, price, image, quantity } = req.body;

  try {
    // check if product is already in cart then update the quantity and price
    const product = await carts.findOne({ id });
    if (product) {
      // if product is already in cart , increment quantity
      product.quantity += 1;
      // update grand total
      product.grandTotal = product.price * product.quantity;
      // save the changes into db
      product.save();
      // sent response back to the cliend
      res.status(200).json("Item Updated...😀");
      console.log(product);
    } else {
      // else - product is not in the cart then add to cart
      const newProduct = new carts({
        id,title,price,image,quantity,grandTotal: price,
      });
      // save mew product
      await newProduct.save();
      // response back to the cliend
      res.status(200).json("Item Added To Your Cart...❤️");
      console.log(newProduct);
    }
  } catch (error) {
    res.status(404).json(error);
    console.log(error);
  }

}  
 // get cart
exports.getCart = async(req, res) => {
  try {
    const allCart = await carts.find();
    res.status(200).json(allCart); // send response back to the client
    console.log(allCart);
    
  } catch (err) {
    res.status(401).json(err); // send error back to the client
    console.log(err);
  }
};
// delete Cart
exports.delete = async(req, res) =>{
  // remove cart
  //get product id from parameters
  const {id} = req.params
  try {
    // Logic
    // delete cart  product from db
    const removeCart = await carts.deleteOne({id})
    if(removeCart.deleteCount != 0 ){
      // get all cart product from db after delete particular product
      const remainingCart = await carts.find()
      res.status(200).json(remainingCart)
    }
  } catch(err) {
    res.status(401).json(err); // error send back to the client
    console.log(err);
  }
}

// increment cart item
exports.incrementCartItems=async(req,res) => {
  //get product id from request
  const {id} = req.params
  try {
    // check if product is present
    const product = await carts.findOne({id})
    if(product){
      product.quantity += 1;
      product.grandTotal = product.quantity * product.price
      // save changes to the db
      await product.save();
      console.log(product)
      // updated details sent back to the client side
      const allCart = await carts.find();
      res.status(200).json(allCart); // send response back to the client
      console.log(allCart);

    } else {
      res.status(404).json('Product Not Found')
    }
    
  } catch (err) {
    res.status(401).json(err); // error send back to the client
    console.log(err);
  }
}

// decrement cart item
exports.decrementCartItems = async (req, res) => {
  //get product id from request
  const { id } = req.params;
  try {
    // check if product is present
    const product = await carts.findOne({ id });
    if (product) {
      product.quantity -= 1;

      if (product.quantity == 0) {
        const removeCart = await carts.deleteOne({ id });
        const remainingCart = await carts.find()
        res.status(200).json(remainingCart)

      } else {
        product.grandTotal = product.quantity * product.price;
         // save changes to the db
        await product.save();
        console.log(product);
         // updated details sent back to the client side
        const allCart = await carts.find();
        res.status(200).json(allCart); // send response back to the client
        console.log(allCart);
      }  
    } else {
      res.status(404).json("Product Not Found");
    }
  } catch (err) {
    res.status(401).json(err); // error send back to the client
    console.log(err);
  }
};