import express, {json, static as expressStatic} from 'express';
import path from 'path'

const app = express();
// app.use(json);


// set the view engine to ejs
app.set('view engine', 'ejs');

//set the public folder

app.use(expressStatic(path.join(__dirname, '../public')))


// Routes
app.get('/', (req, res) => {
    res.render("pages/home/index")
})


app.listen(3000);
console.log("Started")