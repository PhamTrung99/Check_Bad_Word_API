const Filter = require('bad-words');
const fs = require('fs');
const path = require('path');
//const badWordListVi = require('../data/test.js');
const { removeVietnameseTones, compare2String } = require('./convertVie');

var rawdata = fs.readFileSync(path.join(__dirname, '../data/badWordList_Vi.json'));
var obj = JSON.parse(rawdata);
var badWordListVi = obj.badWordList_vi;

const check = (content) => {
  var filter = new Filter({ placeHolder: '*' });
  const _content = content;
  var isBad = false;
  filter.addWords(...badWordListVi);
  const result = filter.clean(removeVietnameseTones(content));
  if (result.includes('*')) {
    isBad = true;
  }
  console.log(_content);
  console.log(result);
  var bw_lists = compare2String(_content, result);
  return {
    "input_content": _content,
    "isBad": isBad,
    "total_bad_word": bw_lists.length,
    "list_of_bad_words": bw_lists,
  };
}

module.exports = check;