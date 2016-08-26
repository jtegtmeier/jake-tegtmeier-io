/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
//const emailConfig = require('./emailConfig.json')

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 8989 : process.env.PORT;
const app = express();

if (isDeveloping) {
  const webpack = require('webpack');
  const config = require('./webpack.config.js');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/sendMail', function(req, res){
  var subject = req.body.subject;
  var email = req.body.email;
  var message = req.body.message;

  var mailer = nodemailer.createTransport('smtps://'+ process.env.EMAIL_NAME +':'+ process.env.EMAIL_PASS +'@smtp.gmail.com');
  var mailOptions = {
    from: '"Jake.Tegtmeier.io" <'+ process.env.EMAIL_FROM +'>', // sender address
    to: "" + process.env.EMAIL_TO, // list of receivers
    subject: subject, // Subject line
    text: "From:" + email + "----------->><br/>" + message, // plaintext body
  };

  mailer.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    }
    console.log('Message sent: ' + info.response)
  })
  res.end("yes");
})

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
