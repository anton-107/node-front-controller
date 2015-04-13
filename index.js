var http = require('http');
var express = require('express');

var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});

var app = express();

app
    .route('/')
    .all(function (req, res, next) {
             proxy.web(req,
                       res,
                       {target: });
         });
app
    .route('/api*')
    .all(function (req, res, next) {
             // strip /api* part from the url:
             req.url = req.path = String(req.path).replace(/^\/api/, '');

             proxy.web(req,
                       res,
                       {target: });
         });

proxy.on('proxyReq', function(proxyReq, req, res, options) {
    proxyReq.setHeader('username', 'testuser');
});

http.createServer(app).listen(process.env.PORT || 3000, function () {
    console.log('Listening on port ' + (process.env.PORT || 3000));
});