const express = require('express');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  region: 'ap-south-1'
})

const {v4: uuidv4} = require('uuid');
//const cors = require('cors');

const app = express();

//app.use(cors());

app.get('/get-url', async(req,res) => {
  const response = await s3.createPresignedPost({
    Fields: {
      key: uuidv4(),
    },
    Expires: 30,
    Bucket: 'napafiles123'
  }, (err, signed) => {
    res.json(signed);
  });

  return res.json(response);
});


const port = 3000

app.get('/hi', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})