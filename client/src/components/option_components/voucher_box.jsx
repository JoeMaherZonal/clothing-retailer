var React = require('react')

var VoucherBox = React.createClass({

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

  chechIfVoucherIsValid: function(){
    var shoppingBasket = this.props.shoppingBasket
    if(shoppingBasket.voucher && shoppingBasket.isVoucherValid()){
      console.log("valid voucher")
    }else{
      shoppingBasket.clearVoucher()
      this.props.updateShoppingBasket(shoppingBasket)
      console.log("invalid voucher removing")
    }
  },

  render: function(){
    return(
      <div className="row" id='voucher-box'>
        <div className="col-6">
          <input type="text" placeholder="voucher code" onChange={this.handleChange}/>
        </div>
        <div className="col-6">
          <button onClick={this.handleClick}>Apply</button>
        </div>

      </div>
      )}

  })

module.exports = VoucherBox;