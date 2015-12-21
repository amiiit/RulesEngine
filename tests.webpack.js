// tests.webpack.js
var context = require.context('./src', true, /.+\.spec\.js?$/);

require('core-js/es5');

console.log("context.keys()", context.keys())

context.keys().forEach(context);
module.exports = context;