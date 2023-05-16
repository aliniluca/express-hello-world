const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');

const app = express();
const s3 = new AWS.S3();

app.use(cors());

app.get('/get-file', async (req, res) => {
  const { readingType, number } = req.query;

  const params = {
    Bucket: 'cyclic-calm-gold-millipede-tie-sa-east-1',
    Key: `${readingType}/${number}.txt`,
  };

  try {
    const data = await s3.getObject(params).promise();
    res.send(data.Body.toString());
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
