var React = require('react')

var VoucherItem = React.createClass({

  handleClick: function(){
    this.props.removeItemFromBasket(this.props.voucher)
  },

  render: function(){
    return(
      <div className="row" id='basket-item'>
        <div className="col-11" id="basket-item-nodes">
          <p className="basket-node" id="voucher-discription">{this.props.voucher.discription}</p>
        </div>

        <div className="col-1">
          <button className="exitButton" onClick={this.handleClick}>X</button>
        </div>
      </div>
      )}

  })

module.exports = VoucherItem;