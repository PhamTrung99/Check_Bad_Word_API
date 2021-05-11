const Filter = require('bad-words');
const fs = require('fs');
const path = require('path');
const message = require('../public/message.control');
const jsonPathName = path.join(__dirname, '../data/badWordList_Vi.json');

var rawdata = fs.readFileSync(jsonPathName);
var obj = JSON.parse(rawdata);
var badWordListVi = obj.badWordList_vi;


const checkBadWord = (content) => {
    content = content.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    while (content.includes('  ')) {
        content = content.replace(/ + /g, " ");
        content = content.trim();
    }
    var filter = new Filter({ placeHolder: '*' });
    var isBad = false;
    var wordArr = content.split(' ');
    var listBW = [];
    wordArr.forEach((word) => {
        var wFiltered = filter.clean(word);
        if (badWordListVi.includes(word)) {
            let arr = Array.from(word);
            arr = arr.fill('*');
            wFiltered = arr.join('');
        }
        wordArr[wordArr.findIndex(element => element === word)] = wFiltered;
        if (word != wFiltered) {
            isBad = true;
            listBW.push(word);
        }
    });
    return {
        "is_bad": isBad,
        "total_bad_word": listBW.length,
        "list_of_bad_words": listBW
    }
}

const addWord = (newBadWord) => {
    let flag = false;
    if (obj.badWordList_vi.find(element => element == newBadWord) != newBadWord) {
        obj.badWordList_vi.push(newBadWord);
        let data = JSON.stringify(obj, null, 2);
        fs.writeFileSync(jsonPathName, data);
        flag = true;
    }

    return {
        "new_bad_word": flag ? (newBadWord) : "",
        "message": flag ? (message.add_success) : (message.add_fail)
    }
}

const RemoveWord = (ReWord) => {
    let flag = false;
    if (obj.badWordList_vi.find(element => element == ReWord) === ReWord) {
        obj.badWordList_vi.splice(obj.badWordList_vi.indexOf(ReWord), 1);
        let data = JSON.stringify(obj, null, 2);
        fs.writeFileSync(jsonPathName, data);
        flag = true;
    }

    return {
        "remove_word": flag ? (ReWord) : "",
        "message": flag ? (message.remove_success) : (message.remove_fail)
    }
}

module.exports = { checkBadWord, addWord, RemoveWord };