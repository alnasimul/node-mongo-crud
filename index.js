const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false}));

const dbPassword = "sadaf123";


const uri = "mongodb+srv://organicUser:sadaf123@cluster0.66naq.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html');
})



client.connect(err => {
  const productCollection = client.db("organicdb").collection("products");

  app.get('/products',(req,res) => {
    productCollection.find({}).limit(2)
    .toArray((err,documents) => {
      res.send(documents);
    })
  })
  app.post('/addProduct', (req,res) =>{
      const product = req.body;

      productCollection.insertOne(product)
      .then(result => {
        console.log('data added successfully');
        res.send('success');
      })
      console.log(product)
  })
 
  console.log('database connected')
});


app.listen(3000, () => console.log('listening to port 3000'));