var express = require('express');
const axios = require("axios");
var router = express.Router();

/* GET users listing. */
router.post('/ticket', function(req, res, next) {
    const body = req.body;

    axios.post("http://127.0.0.1:58000/api/v1/ticket", {
        username: body.username,
        password: body.password
    }).then((response) => {
        console.log(response.data.response.serviceTicket);
        res.json(response.data)
    }).catch((error) => {
        console.log(error);
        res.status(500).json(error);
    });
});

module.exports = router;
