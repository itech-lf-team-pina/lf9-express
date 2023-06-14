const express = require('express');
const axios = require("axios");
const router = express.Router();

/* GET users listing. */
router.post('/ticket', function (req, res, next) {
    const body = req.body;

    axios.post("http://127.0.0.1:58000/api/v1/ticket", {
        username: body.username,
        password: body.password
    }).then((response) => {
        res.json(response.data)
    }).catch((error) => {
        console.log(error);
        res.status(500).json(error);
    });
});

router.post('/ticket', function (req, res, next) {
    const body = req.body;

    axios.post("http://127.0.0.1:58000/api/v1/ticket", {
        username: body.username,
        password: body.password
    }).then((response) => {
        res.status(response.status).json(response.data)
    }).catch((error) => {
        console.log(error);
        res.status(500).json(error);
    });
});

router.get('/logout', function (req, res, next) {
    const token = req.cookies.token;

    axios.delete(`http://127.0.0.1:58000/api/v1/ticket/${token}`, {
        headers: {
            "X-Auth-Token": token
        },
        data: {}
    }).then((response) => {
        if (response.status === 200) {
            res.clearCookie("token");
            res.redirect("/user");
        }
    }).catch((error) => {
        console.log(error);
        res.status(500).json(error);
    });
});

router.delete('/credential/:credID', function (req, res, next) {
    const token = req.cookies.token;
    const credID = req.params.credID;

    axios.delete(`http://127.0.0.1:58000/api/v1/global-credential/${credID}`, {
        headers: {
            "X-Auth-Token": token
        },
        data: {}
    }).then((response) => {
        res.status(response.status).json(response.data)
    }).catch((error) => {
        console.log(error);
        res.status(500).json(error);
    });
});

router.post('/credential/', function (req, res, next) {
    const token = req.cookies.token;
    const body = req.body;

    axios.post(
        `http://127.0.0.1:58000/api/v1/global-credential/cli`,
        body,
        {
            headers: {
                "X-Auth-Token": token
            }
        })
        .then((response) => {
            res.status(response.status).json(response.data)

        })

        .catch((error) => {
            console.table(error.response.data);
            console.log(error.code);
            res.status(500).json(error);
        });
});

router.post('/discovery/', function (req, res, next) {
    const token = req.cookies.token;
    const body = req.body;

    axios.post(
        `http://127.0.0.1:58000/api/v1/discovery`,
        body,
        {
            headers: {
                "X-Auth-Token": token
            }
        })
        .then((response) => {
            res.status(response.status).json(response.data)
        })
        .catch((error) => {
            console.table(error.response.data);
            console.log(error.code);
            res.status(500).json(error);
        });
});


router.delete('/discovery/:discoveryID', function (req, res, next) {
    const token = req.cookies.token;
    const discoveryID = req.params.discoveryID;

    axios.delete(`http://127.0.0.1:58000/api/v1/discovery/${discoveryID}`, {
        headers: {
            "X-Auth-Token": token
        },
        data: {}
    }).then((response) => {
        res.status(response.status).json(response.data)
    }).catch((error) => {
        console.log(error);
        res.status(500).json(error);
    });
});


module.exports = router;
