const message = require("../public/message.control");

module.exports = function(req, res, next){
    const apiKey = req.headers['api-key'];
    if(apiKey === process.env.API_KEY){
        next();
    }else{
        return res.status(401).json({
            message: message.apiKey_invalid
        })
    }
}