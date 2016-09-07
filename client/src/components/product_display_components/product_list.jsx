var React = require('react')
var ProductBox = require('./product_box')

var ProductList = React.createClass({
  render: function(){
    var productNodes = this.props.products().map(function(product, index){
      return (
        <ProductBox key={index} product={product}/>
        )
    })
    return(
      <div className="row">
        <div className="col-12" id='product-list'>
          {productNodes}
        </div>
      </div>
      )}

  })

module.exports = ProductList;