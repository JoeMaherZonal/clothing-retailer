

var DiscountVoucher = function(code, calculateDiscount, discription){
  this.code = code
  this.calculateDiscount = calculateDiscount
  this.discription = discription
}

DiscountVoucher.prototype = {

}

module.exports = DiscountVoucher;