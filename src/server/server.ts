import express from 'express';
import cors from 'cors';
import mongoose, { model } from 'mongoose';
import { DATASET } from './dataset';
import { PersonModel } from './models/person-model';

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
const uri = 'mongodb+srv://fabian:fabian@cluster0.vzn9y.mongodb.net/Fabian';
const port = process.env.PORT || 3005;

const start = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    server.listen(port, () => console.log(`port is running on ${port}`));
    console.log('connected to db');
  } catch (e) {
    console.log(e);
  }
};
start();

server.get('/dataset', async (request, response) => {
  response.json(DATASET);
});

server.get('/dataset/:name', (request, response) => {
  const { name } = request.params;
  const person = DATASET.filter((data) => data.toLowerCase().match(name));
  response.json(person);
});

server.post('/dataset-create', async (request, response) => {
  try {
    const { name } = request.body;
    const personInfo = await model('Persons', PersonModel);
    personInfo.create({
      name
    });
    response.json(personInfo);
    response.redirect('/');
  } catch (e) {
    console.log(e);
    return response.status(401).send(e);
  }
});
