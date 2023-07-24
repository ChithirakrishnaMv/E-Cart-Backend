// logic to resolve

// import product collection
const products = require("../model/productSchema");




// get all products
exports.getAllProducts = async (req, res) => {
  // logic
  try {
    // get all products from product collection in mongodb
    const allProducts = await products.find();
    res.status(200).json(allProducts); // response send back to the client
    console.log(allProducts);
  } catch (err) {
    res.status(401).json(err); // error send back to the client
    console.log(err);
  }
};

// view particular products details
exports.viewProduct = async(req, res) => {
  // logic 
  // get particular products
  const id=req.params.id;
  // get details of particular product
  try{
    const product = await products.findOne({id});
    if(product){
      res.status(200).json(product); // product details send back to the client
      console.log(product);
    } else {
      res.status(404).json("Product not found") // error send back to the client
    }
  }catch (err) {
    res.status(401).json(err); // error send back to the client
    console.log(err);
  }
}
