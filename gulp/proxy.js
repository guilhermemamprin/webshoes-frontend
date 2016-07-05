// node.js proxy server example for adding CORS headers to any existing http services.
// yes, i know this is super basic, that's why it's here. use this to help understand how http-proxy works with express if you need future routing capabilities

var express   = require('express'),
    proxy     = require('express-http-proxy'),
    url       = require('url');

var allowedHeaders = [
    'Accept',
    'Authorization',
    'AuthTicket',
    'Content-Type',
    'Origin',
    'Referer',
    'User-Agent',
    'X-Mindflash-SessionID',
    'X-Requested-With',

    // MW-CNova custom headers
    'X-Auth-CarrinhoToken',
    'X-Auth-ClienteId',
    'X-Auth-UsuarioToken'
  ].toString();

var allowCrossDomain = function(req, res, next) {

    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', allowedHeaders);

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    }
    else {
      next();
    }
};

function createProxy(port, proxyUrl) {

  var proxyParams = {
    forwardPath: function(req, res) {
      var parsedPath = url.parse(req.url).path;

      return parsedPath;
    },
    intercept: function(rsp, data, req, res, callback) {
       // rsp - original response from the target
       // data = JSON.parse(data.toString('utf8'));

       res.header('Access-Control-Allow-Origin', req.headers.origin);
       if (res._headers['set-cookie']) {
        for (var i = 0; i < res._headers['set-cookie'].length; i++) {
          res._headers['set-cookie'][i] = res._headers['set-cookie'][i].replace(/domain=\.?extra\.com\.br;?\s?/gi, '');
        }
       }
       callback(null, data);
    },
    decorateRequest: function(req) {
      var caseSensitive = [
        "X-Auth-UsuarioToken",
        "X-Auth-ClienteId",
        "X-Auth-CarrinhoToken"
      ];
      for (var i = 0; i < caseSensitive.length; i++) {
        if (req.headers[caseSensitive[i].toLowerCase()] != null) {
          req.headers[caseSensitive[i]] = req.headers[caseSensitive[i].toLowerCase()];
          delete req.headers[caseSensitive[i].toLowerCase()];
        }
      }
      return req;
    }
  }

  var middlewareProxy = express();
  middlewareProxy.use(allowCrossDomain);
  middlewareProxy.all('/*', proxy(proxyUrl, proxyParams));
  middlewareProxy.listen(port);
}

createProxy(5000, 'https://github.com')

/*
 * This is where you activate or not your proxy.
 *
 * The first line activate if and the second one ignored it
 */

// module.exports = [proxyMiddleware];
module.exports = function() {
  return [];
}
