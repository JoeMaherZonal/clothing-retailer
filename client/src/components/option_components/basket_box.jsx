var React = require('react')
var BasketList = require('./basket_list')
var TotalBox = require('./total_box')
var VoucherBox = require('./voucher_box')

var BasketBox = React.createClass({

  render: function(){
    return(
      <div className="row">
        <div className="col-12" id="basket-box-container">

        <div className="row">
          <div className="col-12">
          <BasketList removeItemFromBasket={this.props.removeItemFromBasket}shoppingItems = {this.props.shoppingBasket.items} />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
          <TotalBox shoppingBasket={this.props.shoppingBasket} />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
          <VoucherBox shoppingBasket={this.props.shoppingBasket} addVoucher={this.props.addVoucher} updateShoppingBasket={this.props.updateShoppingBasket} />
          </div>
        </div>

        </div>
      </div>
      )}
  })

module.exports = BasketBox;