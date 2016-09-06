var React = require('react');
var ReactDOM = require('react-dom');

window.onload = function(){
  console.log("app started")
  ReactDOM.render(
    <h4>App started</h4>,
    document.getElementById('main-div')
  );
}