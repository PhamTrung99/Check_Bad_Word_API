const express = require('express');
const {checkBadWord,addWord,RemoveWord} = require('../Functions/checkBadWord');

const router = express.Router();

router.get('/check/:content' ,function (req, res) {
    const result = checkBadWord(req.params.content);
   res.status(200).json(result);
})

router.get('/addword/:word', function (req, res) {
   const result = addWord(req.params.word);
   res.status(200).json(result);
})

router.get('/removeword/:word', function (req, res) {
    const result = RemoveWord(req.params.word);
    res.status(200).json(result);
 })

 module.exports = router;