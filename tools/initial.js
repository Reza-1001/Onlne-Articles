const fs = require('fs');
const path = require('path');


module.exports = (function () {
    (fs.existSync(path.join(__dirname, '../public/images')) || fs.mkdirSync(path.join(__dirname, '../public/images')))
    (fs.existSync(path.join(__dirname, '../public/images/avatar')) || fs.mkdirSync(path.join(__dirname, '../public/images/avatar')))
    (fs.existSync(path.join(__dirname, '../public/images/article')) || fs.mkdirSync(path.join(__dirname, '../public/images/article')))
    (fs.existSync(path.join(__dirname, '../public/articles')) || fs.mkdirSync(path.join(__dirname, '../public/articles')))
})