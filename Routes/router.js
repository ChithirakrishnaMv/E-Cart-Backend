// to define routes for the client request

// import express
const express = require('express');

// import product controller
const productController = require('../Controllers/productController')

// import product controller
const wishlistController = require('../Controllers/wishlistController')

// import cart controller
const cartController = require('../Controllers/cartController')

// using express create an object for router  class in-order to set up path 
const router = new express.Router();

// resolve various client request 
// Api Call

// 1. get all products
router.get('/products/allProducts',productController.getAllProducts)
// 2. view particular products details
router.get('/products/viewProduct/:id',productController.viewProduct)
// 3. Add wishlist 
router.post('/products/addWishlist',wishlistController.addToWishlist)
// 4 view wishlist product
router.get('/products/viewWishlist',wishlistController.getWishlist)
// 5 remove wishlist product
router.delete('/products/deleteWishlist/:id',wishlistController.deleteWishlist)
// 6 Add to cart 
router.post('/products/addToCart',cartController.addToCart)
// 7 get cart product
router.get('/products/viewCart',cartController.getCart)
// 8. delete cart product
router.delete('/products/deleteCart/:id',cartController.delete)
// 9. increment cart count
router.get('/products/increment/:id',cartController.incrementCartItems)
// 10. decrement cart count
router.get('/products/decrement/:id',cartController.decrementCartItems)


// export router
module.exports = router;