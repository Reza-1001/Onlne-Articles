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
    // fs.readFile(path.join(__dirname, filePath) , function (err,data){
    //     res.setHeader("Content-Type","application/pdf");
    //     res.setHeader("Content-Disposition",'attachment; filename=Reza-Ahmadnezhad-resume.pdf')
    //     res.send(data);
    // });

    let file=fs.createReadStream(path.join(__dirname,filePath));
    res.setHeader('Contetnt-Type','application/pdf');
    res.setHeader('Content-Disposition', 'attachment; fileNamme=Reza-Ahmadnezhad-resume.pdf');
    file.pipe(res);
})

module.exports = router; 