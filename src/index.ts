import express from 'express'
import route from './routes/index';
import { create } from 'express-handlebars';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import path from 'path';
const app = express()

//check connection to database
import checkconnect from './config/db.js'
checkconnect()

//body middleware
app.use(
    express.urlencoded({
        extended: true,
    }),
);

//method override
app.use(methodOverride('_method'));

//static file
app.use(express.static(path.join(__dirname, '/public')));

//route
route(app)


const port = 3000
app.listen(port, () => {
    console.log(`app listening on ${port} `);
});

