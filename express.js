const cors = require('cors');
// Express
const access = (_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

module.exports = function setupExpress(app) {
  app.use(access);
  app.use(cors());

  app.get('/sad', (req, res) => res.status(200).send("Bro, I'm feeling so sad today 09/03/2019 :("));
};
