var express = require('express');

var router = express.Router();
var fs = require('fs');
var exec = require('exec');

var uuid = require('node-uuid');
var base58 = require('bs58');
var bitcoin = require('bitcoinjs-lib');
var ecurve = require('ecurve');
var BigInteger = require('bigi');
var Buffer = require('buffer');
var bitcoinMessage = require('bitcoinjs-message')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.get('/crowdsale', function(req, res, next) {
    res.render('crowdsale', {
        title: 'Express'
    });
});

router.get('/faq', function(req, res, next) {
    res.render('faq', {
        title: 'Express'
    });
});


router.get('/buy', function(req, res, next) {
    res.render('buy', {
        title: 'Express'
    });
});
module.exports = router;
