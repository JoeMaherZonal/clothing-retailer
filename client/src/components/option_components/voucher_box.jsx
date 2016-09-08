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
    this.props.addVoucher(this.state.voucherCode)
    this.chechIfVoucherIsValid()
  },

  showInvalidVoucherMessage: function(){
    this.voucherMessageClass = "valid-voucher-message"
    this.forceUpdate()
    setTimeout(function(){
      this.voucherMessageClass = "invalid-voucher-message-hide"
      this.forceUpdate()
    }.bind(this), 2000)
  },

  chechIfVoucherIsValid: function(){
    var shoppingBasket = this.props.shoppingBasket
    if(shoppingBasket.voucher && shoppingBasket.isVoucherValid()){
      console.log("valid voucher")
    }else{
      shoppingBasket.clearVoucher()
      this.props.updateShoppingBasket(shoppingBasket)
      console.log("invalid voucher removing")
      this.showInvalidVoucherMessage()
    }
  },

  render: function(){
    return(
      <div>
        <div className="row" id='voucher-box'>
          <div className="col-6">
            <input type="text" placeholder="voucher code" onChange={this.handleChange}/>
          </div>
          <div className="col-6">
            <button onClick={this.handleClick}>Apply</button>
          </div>

        </div>

        <div className="row">
          <p className = {this.voucherMessageClass}>You entered an invalid voucher</p>
        </div>

      </div>
      )}

  })

module.exports = VoucherBox;