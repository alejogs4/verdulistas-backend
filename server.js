const app = require('./app');

app.listen(process.env.APP_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Application running at http://localhost:${process.env.APP_PORT}`);
});
