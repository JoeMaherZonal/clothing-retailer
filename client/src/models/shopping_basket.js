var _ = require('lodash')

var ShoppingBasket = function(){
  this.items = [],
  this.voucher = null
}

ShoppingBasket.prototype = {

  addItem: function(product){
    if(product.quantity > 0){
      this.items.push(product)
    }
  },

  removeItem: function(product){
    if(this.items.length === 0){return}
    var index = this.items.indexOf(product)
    this.items.splice(index, 1)
  },

  emptyBasket: function(){
    this.items = []
  },

  totalPrice: function(){
    if(this.voucher){
      return this.totalOfItems() - this.getDiscount()
    }
    return this.totalOfItems()
  },

  totalOfItems: function(){
    var total = 0;
    for(var item of this.items){
      total += item.price
      total -= item.discount
    }
    return parseFloat(total)
  },

  hasItemOfCategory: function(category){
    var results = this.items.filter(function(item){
      return item.category === category 
    })
    return results.length > 0
  },

  addDiscountVoucher: function(voucher){
    this.voucher = voucher
  },

  getDiscountOfItems: function(){
    var total = 0
    for(var item of this.items){
        total += item.discount
      }
    return total
  },

  getDiscount: function(voucher){
    var discount = this.getDiscountOfItems()
    if(this.voucher){
    discount += this.voucher.calculateDiscount(this.items)
    }
    if(discount === 0){
      return null
    }
    return discount
  },

  clearVoucher: function(){
    this.voucher = null;
  }

}

module.exports = ShoppingBasket;