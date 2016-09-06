var React = require('react');
var ReactDOM = require('react-dom');
var Product = require('./models/product.js')

window.onload = function(){
  console.log("app started")
  
  ReactDOM.render(
    <h4>App started</h4>,
    document.getElementById('main-div')
  );
}