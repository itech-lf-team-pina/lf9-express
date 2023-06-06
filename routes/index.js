let express = require('express');
const axios = require("axios");
let router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Start - Netzwerk Verwaltung'});
});

router.get('/user', function (req, res, next) {
    res.render('user', {title: 'Anmeldung - Netzwerk Verwaltung'});
});

router.get('/inventory', function (req, res, next) {
    res.render('inventory', {title: 'Inventar - Netzwerk Verwaltung'});
});

router.get('/hosts', function (req, res, next) {
    res.render('hosts', {title: 'Hosts - Netzwerk Verwaltung'});
});

router.get('/discovery', function (req, res, next) {
    res.render('discovery', {title: 'Erkennung - Netzwerk Verwaltung'});
});

router.get('/credentials', function (req, res, next) {
    res.render('credentials', {title: 'Anmeldedaten - Netzwerk Verwaltung'});
});

module.exports = router;
