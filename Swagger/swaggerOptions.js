// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: "CHECK BAD WORD API",
        version: "1.0.1",
        description: "CHECK BAD WORD API",
        servers: ["http://localhost:"+process.env.PORT]
      }
    },
    // ['.routes/*.js']
    apis: ["index.js"]
  };


module.exports = swaggerOptions;
