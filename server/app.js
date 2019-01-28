import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/route';
import router2 from './routes/route2';
import UserDB from './models/users';

const { users } = UserDB;

const app = express();

app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

const createTable = async () => {
  await users();
};

createTable();

app.get('/', (req, res) => res.status(200).json({
  status: 200,
  message: 'Politico Xpress',
}));

// app.use('/api/v1', router);
app.use('/api/v1', router2);


app.listen(process.env.PORT || 8080, () => {
  console.log('Working');
});


export default app;
