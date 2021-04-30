const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

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
    productCollection.find({}).limit(4)
    .toArray((err,documents) => {
      res.send(documents);
    })
  })

  app.get('/product/:id', (req,res) => {
         productCollection.find({_id: ObjectId(req.params.id)})
         .toArray((err,documents) => {
          res.send(documents[0])
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
  app.patch('/update/:id',(req,res) => {
      productCollection.updateOne({_id : ObjectId(req.params.id)},{
        $set : {name: req.body.name, price : req.body.price, quantity: req.body.quantity }
      })
      .then(result => {
          console.log(result)
        })
     
  })
  app.delete('/delete/:id',(req,res) => {
    productCollection.deleteOne({_id : ObjectId(req.params.id)})
    .then(result =>{
      console.log(result);
    })
  })
 
  console.log('database connected')
});


app.listen(3000, () => console.log('listening to port 3000'));