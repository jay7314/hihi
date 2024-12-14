import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import BoardRouter from './routes/board/BoardRouter';


dotenv.config()

const app = express();
const PORT=process.env.PORT

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/board", BoardRouter);


app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})