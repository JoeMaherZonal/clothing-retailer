var ShoppingBasket = require('../models/shopping_basket.js')
var assert = require('chai').assert
var Product = require('../models/product_manager.js')
var ProductManager = require('../models/product_manager.js')


describe("Shopping Basket Tests", function(){

  beforeEach(function(){
    productParams1 = {name: "Bag", colour: "Blue", category: "Accessory", price: 20, quantity: 1, discount: 0}
    productManager = new ProductManager()
    shoppingBasket = new ShoppingBasket()
    productManager.addProduct(productParams1)
    product = productManager.products[0]
  })

  it('can add item to basket', function(){
    shoppingBasket.addItem(product)
    assert.equal(1, shoppingBasket.items.length)
  })

  it('can remove item from basket', function(){
    shoppingBasket.addItem(product)
    assert.equal(1, shoppingBasket.items.length)
    shoppingBasket.removeItem(product)
    assert.equal(0, shoppingBasket.items.length)
  })

  it('can calculate price of all items in basket', function(){
    shoppingBasket.addItem(product)
    assert.equal(20, shoppingBasket.totalPrice())
  })

  it('return 0 for total cost of no items', function(){
    assert.equal(0, shoppingBasket.totalPrice())
  })

})