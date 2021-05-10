const Filter = require('bad-words');
const badWordListVi = require('../data/badWordList_vi');


const check = (content) => {
  var filter = new Filter({placeHolder: process.env.CENSOR_CHARACTER});
  var isBad = false;
  filter.addWords(...badWordListVi);

  const result = filter.clean(content);
  if(result.includes(process.env.CENSOR_CHARACTER)){
    isBad = true;
  }
  return {
      "isBad": isBad,
      "filter_result": result 
  };
}

module.exports = check;