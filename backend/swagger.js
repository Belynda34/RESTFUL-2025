const fs = require('fs');
const path = require('path');
const swaggerUi = require('swagger-ui-express');

module.exports = (app) => {
  const swaggerFilePath = path.join(__dirname, './src/swagger/swagger.json');
  const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf8'));

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
