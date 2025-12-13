const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ShopStream API",
      version: "1.0.0",
      description: "E-commerce REST API with OAuth authentication"
    },
    servers: [
      {
        url: "https://your-render-url.onrender.com",
        description: "Production server"
      },
      {
        url: "http://localhost:3000",
        description: "Local server"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ["./routes/*.js"]
};

module.exports = swaggerJsdoc(options);
