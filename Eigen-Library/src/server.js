/* eslint-disable linebreak-style */
/* eslint-disable max-len */

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const {Book, Member} = require('./db');
const express = require('express');
const app = express();

app.use(express.json());

const borrowRouter = require('./router/borrow')(Member, Book);
const returnRouter = require('./router/return')(Member, Book);
const addRouter = require('./router/add')(Member, Book);
const checkRouter = require('./router/check')(Member, Book);

app.use('/api/borrow', borrowRouter);
app.use('/api/return', returnRouter);
app.use('/api/add', addRouter);
app.use('/api/check', checkRouter);

module.exports = app;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Eigen Library API',
      version: '1.0.0',
      description: 'API yang diperuntukan semacam perpustakaan',
    },
    servers: [
      {
        url: 'http://localhost:3003',
        description: 'Development server',
      },
      {
        url: 'soon',
        description: 'Production server',
      },
    ],
  },
  apis: ['./src/router/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  if (process.env.NODE_ENV === 'production') {
    const ip = require('ip');
    const address = ip.address();
    console.log(`Server running: http://${address}:${PORT}`);
  } else {
    console.log(`Server running: http://localhost:${PORT}`);
  }
});
