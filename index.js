const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(cors());

app.use(bodyParser.json());

const dbPassword = "sadaf123";


const uri = "mongodb+srv://organicUser:sadaf123@cluster0.66naq.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/',(req,res) => {
    res.send('hello i am working');
})



client.connect(err => {
  const collection = client.db("organicdb").collection("products");
  // perform actions on the collection object
  console.log('database connected')
  client.close();
});


app.listen(3000, () => console.log('listening to port 3000'));