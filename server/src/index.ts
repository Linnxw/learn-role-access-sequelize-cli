import express,{Application} from 'express';
import dotenv from 'dotenv';
import routes from './routes/Route';
import cookieParser from "cookie-parser"

const app:Application = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser())

app.use(routes);

app.listen(process.env.APP_PORT,()=>{
  console.log(`${process.env.APP_NAME} runing in port ${process.env.APP_PORT}`)
});
