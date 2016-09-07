var DiscountVoucher = require('../models/discount_voucher')
var assert = require('chai').assert
var ProductManager = require('../models/product_manager')
var ShoppingBasket = require('../models/shopping_basket')


describe("Discount Voucher Specs", function(){

  beforeEach(function(){
    productParams1 = {name: "Bag", colour: "Blue", category: "Accessory", price: 20}
    productParams2 = {name: "Blue Shoe", colour: "Blue", category: "Shoes", price: 60}
    productManager = new ProductManager()
    shoppingBasket = new ShoppingBasket()
    productManager.addProduct(productParams1)
    productManager.addProduct(productParams2)
    product = productManager.products[0]
    product2 = productManager.products[1]

    discountVoucher1 = new DiscountVoucher("5OFF", function(shoppingBasket){
      return 5
    })

    discountVoucher2 = new DiscountVoucher("10OFF", function(shoppingBasket){
      if(shoppingBasket.totalPrice() > 50){
        return 10;
      }else{
        //invalid
        return 0;
      }
    })

    discountVoucher3 = new DiscountVoucher("15OFF", function(shoppingBasket){
      var totalPrice = shoppingBasket.totalPrice()
      var hasItemWithCategory = shoppingBasket.hasItemOfCategory("Shoes")
      if(totalPrice > 75 && hasItemWithCategory){
        return 15;
      }else{
        //invalid
        return 0;
      }
    })
  })

  it('Can apply £5 off any order', function(){
    shoppingBasket.addItem(product)
    shoppingBasket.addDiscountVoucher(discountVoucher1)
    assert.equal(5, shoppingBasket.getVoucherDiscount())
  })

  it('Cannot go to a minus total with no items in basket', function(){

    shoppingBasket.addDiscountVoucher(discountVoucher1)
    assert.equal(0, shoppingBasket.getVoucherDiscount(shoppingBasket))
  })

  it('Can apply £10 off any order', function(){
    shoppingBasket.addItem(product)
    shoppingBasket.addItem(product2)
    shoppingBasket.addDiscountVoucher(discountVoucher2)
    assert.equal(10, shoppingBasket.getVoucherDiscount(shoppingBasket))
  })

  it('Cannot not apply £10 voucher when spent under £50', function(){
    shoppingBasket.addItem(product)
    shoppingBasket.addDiscountVoucher(discountVoucher2)
    assert.equal(0, shoppingBasket.getVoucherDiscount(shoppingBasket))
  })

  it('Can apply £15 off valid order', function(){
    shoppingBasket.addItem(product)
    shoppingBasket.addItem(product2)
    shoppingBasket.addDiscountVoucher(discountVoucher3)
    assert.equal(15, shoppingBasket.getVoucherDiscount(shoppingBasket))
  })

  it('Cannot get £15 off without shoes', function(){
    shoppingBasket.addItem(product)
    shoppingBasket.addItem(product)
    shoppingBasket.addItem(product)
    shoppingBasket.addItem(product)
    shoppingBasket.addDiscountVoucher(discountVoucher3)
    assert.equal(0, shoppingBasket.getVoucherDiscount(shoppingBasket))
  })

})