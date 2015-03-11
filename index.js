var http = require('http');
var express = require('express');

var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});

var app = express();

console.log('FC: env keys', Object.keys(process.env));

app
    .route('/*')
    .all(function (req, res, next) {
             proxy.web(req,
                       res,
                       {target: 'http://' + process.env.API_1_PORT_3000_TCP_ADDR + ':' + process.env.API_1_PORT_3000_TCP_PORT});
         });

proxy.on('proxyReq', function(proxyReq, req, res, options) {
    proxyReq.setHeader('username', 'testuser');
});

http.createServer(app).listen(process.env.PORT || 3000, function () {
    console.log('Listening on port ' + (process.env.PORT || 3000));
});