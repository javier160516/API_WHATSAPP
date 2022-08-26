import express from 'express';
import sendMessageRouter from './routes/sendMessageRouter.js';
import bodyParser from 'body-parser';

const app = express();

const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/sendMessage', sendMessageRouter);

// app.use('/api/sendMessage', sendMessageRouter);


app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
})