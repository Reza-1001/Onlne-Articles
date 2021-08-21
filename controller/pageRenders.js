const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public/pages/home.html'));
})
router.get('/contact-us', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public/pages/contact-us.html'));
})
router.get('/about-us', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public/pages/about.html'));
})

// Downloading Resume from About us Page
router.get('/resume', (req, res, next) => {
    let filePath = "../public/assets/Reza_AhmadNezhad_Resume_2021-8.pdf";
    fs.readFile(path.join(__dirname, filePath) , function (err,data){
        res.contentType("application/pdf");
        res.send(data);
    });
})

module.exports = router;