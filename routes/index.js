let express = require('express');
const axios = require("axios");
let router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    axios.post("http://127.0.0.1:58000/api/v1/ticket", {
        username: "cisco",
        password: "cisco123!"
    }).then((response) => {
        console.log(response.data.response.serviceTicket);
        res.render('index', {title: 'Express'});
    }).catch((error) => {
        console.log(error);
    });


});

module.exports = router;
