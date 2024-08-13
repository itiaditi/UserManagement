const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const { connection } = require('./dbConfig/connectToDb');

const app = express();
app.use(express.json());
app.use(cors());


app.use('/api/users', userRoutes);
const PORT =process.env.PORT||5000;
app.listen(PORT,async()=>{
    await connection
    console.log("connected to db");
    console.log(`Server is running at ${PORT}`)
})