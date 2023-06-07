const express = require('express');
const axios = require("axios");
const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Start - Netzwerk Verwaltung'});
});

router.get('/user', function (req, res, next) {
        res.render('user', {title: 'Anmeldung - Netzwerk Verwaltung', isLoggedOut: true});
});
//TODO: hab hier cookies für das ticket hinzugefügt, ticket wird allerdings bisher nur im localstorage gespeichert.
router.get('/inventory', function (req, res, next) {
    const token = req.cookies.token;
    const params = req.params;

    axios.get("http://127.0.0.1:58000/api/v1/network-device", {
        headers: {
            "X-Auth-Token": token
        },
        params: params
    })
        .then((response) => {
            if (response.data.response === null) {
                res.render('inventory', {title: 'Inventar - Netzwerk Verwaltung', ticket: req.cookies.ticket, inventory: []});
            }
            res.render('inventory', {title: 'Inventar - Netzwerk Verwaltung', ticket: req.cookies.ticket, inventory: response.data.response});
        }).catch((error) => {
        console.log(error);
        res.render('inventory', {title: 'Inventar - Netzwerk Verwaltung', ticket: req.cookies.ticket, inventory: []})
    });
});

router.get('/hosts', function (req, res, next) {
    const token = req.cookies.token;
    const params = req.params;

    axios.get("http://127.0.0.1:58000/api/v1/host", {
        headers: {
            "X-Auth-Token": token
        },
        params: params
    })
        .then((response) => {
            if (response.data.response === null) {
                res.render('hosts', {title: 'Hosts - Netzwerk Verwaltung', ticket: req.cookies.ticket, hosts: []});
            }
            res.render('hosts', {title: 'Hosts - Netzwerk Verwaltung', ticket: req.cookies.ticket, hosts: response.data.response});
        }).catch((error) => {
        console.log(error);
        res.render('hosts', {title: 'Hosts - Netzwerk Verwaltung', ticket: req.cookies.ticket, hosts: []})
    });
});

router.get('/discovery', function (req, res, next) {
    res.render('discovery', {title: 'Erkennung - Netzwerk Verwaltung', ticket: req.cookies.ticket});
});

router.get('/credentials', function (req, res, next) {
    res.render('credentials', {title: 'Anmeldedaten - Netzwerk Verwaltung', ticket: req.cookies.ticket});
});

module.exports = router;
