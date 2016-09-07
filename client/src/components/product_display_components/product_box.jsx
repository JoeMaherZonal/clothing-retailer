var React = require('react')
var ProductList = require('./product_list')

var ProductBox = React.createClass({

  render: function(){
    return(
      <div className="row" id='product-box'>
        <div className="col-12">
          {this.props.product.name}
        </div>
      </div>
      )}

  })

module.exports = ProductBox;