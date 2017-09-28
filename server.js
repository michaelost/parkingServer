import express from 'express';
import bodyParser from 'body-parser';
import braintree from 'braintree';

require('dotenv').config()
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;
const router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.get('/key', function(req, res) {
    res.json({ message: 'key' });   
    res.end();
});

const { merchantId, publicKey, privateKey } = process.env;
const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId,
  publicKey,
  privateKey,
});

app.get("/client_token", function (req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken);
  });
});

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port' + port);
