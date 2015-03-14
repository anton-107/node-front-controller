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
                       {target: 'http://' + process.env.REDISAPI_1_PORT_3000_TCP_ADDR + ':' + process.env.REDISAPI_1_PORT_3000_TCP_PORT});
         });
app
    .route('/api*')
    .all(function (req, res, next) {
             // string /api* part from the url:
             req.url = req.path = String(req.path).replace(/^\/api/, '');

             proxy.web(req,
                       res,
                       {target: 'http://' + process.env.MONGOAPI_1_PORT_3000_TCP_ADDR + ':' + process.env.MONGOAPI_1_PORT_3000_TCP_PORT});
         });

proxy.on('proxyReq', function(proxyReq, req, res, options) {
    proxyReq.setHeader('username', 'testuser');
});

http.createServer(app).listen(process.env.PORT || 3000, function () {
    console.log('Listening on port ' + (process.env.PORT || 3000));
});