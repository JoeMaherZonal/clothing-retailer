var React = require('react')

var VoucherBox = React.createClass({

  voucherMessageClass: "invalid-voucher-message-hide",

  getInitialState: function(){
    return {voucherCode: null}
  },

  handleChange: function(event){
    var newCode = event.target.value
    this.setState({voucherCode: newCode})
  },

  handleClick: function(){
    console.log("button clicked")
    this.chechIfVoucherIsValid(this.state.voucherCode)

    this.props.addVoucher(this.state.voucherCode)
  },

  showInvalidVoucherMessage: function(){
    this.voucherMessageClass = "valid-voucher-message"
    this.forceUpdate()
    setTimeout(function(){
      this.voucherMessageClass = "invalid-voucher-message-hide"
      this.forceUpdate()
    }.bind(this), 2000)
  },

  chechIfVoucherIsValid: function(code){
    var productManager = this.props.productManager
    var shoppingBasket = this.props.shoppingBasket
    if(productManager.isVoucherValid(code)){
      console.log("valid voucher")
      shoppingBasket.addDiscountVoucher(productManager.getVoucher(code))
    }else{
      this.props.updateShoppingBasket(shoppingBasket)
      this.props.updateProductManager(productManager)
      console.log("invalid voucher")
      this.showInvalidVoucherMessage()
    }
  },

  render: function(){
    return(
      <div>
      
        <div className="row" id='voucher-box'>
          <div className="col-12">
            <input type="text" placeholder="voucher code" onChange={this.handleChange}/>
            <button className="voucher-button" onClick={this.handleClick}>Apply</button>
          </div>
        </div>

        <div className="row">
          <p className = {this.voucherMessageClass}>You entered an invalid voucher</p>
        </div>

      </div>
      )}

  })

module.exports = VoucherBox;