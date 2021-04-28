require('dotenv').config();
const app = require('./server.js');

app.listen(process.env.PORT, () => {
  console.log(`App is listening at http://${process.env.SERVER}:${process.env.PORT}`);
});