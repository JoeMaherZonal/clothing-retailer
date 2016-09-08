var React = require('react')

var VoucherBox = React.createClass({

  getInitialState: function(){
    return {voucherCode: null}
  },

  handleChange: function(event){
    var newCode = event.target.value
    this.setState({voucherCode: newCode})
  },

  handleCLick: function(){
    this.props.applyVoucher(this.state.voucherCode)
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