const express = require('express');
const axios = require("axios");
const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Start - Netzwerk Verwaltung'});
});

router.get('/user', function (req, res, next) {
    if (req.cookies.error) {
        res.render('user', {title: 'Anmeldung - Netzwerk Verwaltung', error: req.cookies.error});
    } else {
        res.render('user', {title: 'Anmeldung - Netzwerk Verwaltung'});
    }
});
//TODO: hab hier cookies für das ticket hinzugefügt, ticket wird allerdings bisher nur im localstorage gespeichert.
router.get('/inventory', function (req, res, next) {
    res.render('inventory', {title: 'Inventar - Netzwerk Verwaltung', ticket: req.cookies.ticket});
});

router.get('/hosts', function (req, res, next) {
    res.render('hosts', {title: 'Hosts - Netzwerk Verwaltung', ticket: req.cookies.ticket});
});

router.get('/discovery', function (req, res, next) {
    res.render('discovery', {title: 'Erkennung - Netzwerk Verwaltung', ticket: req.cookies.ticket});
});

router.get('/credentials', function (req, res, next) {
    res.render('credentials', {title: 'Anmeldedaten - Netzwerk Verwaltung', ticket: req.cookies.ticket});
});

module.exports = router;
