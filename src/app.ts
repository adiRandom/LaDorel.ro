import express, {json, static as expressStatic} from 'express';
import path from 'path'
import {Item} from "./models/Item";

const app = express();
// set the view engine to ejs
app.set('view engine', 'ejs');

//set the public folder

app.use(expressStatic(path.join(__dirname, '../public')))


app.use(json())


// Routes
app.get('/', async (req, res) => {
    const item = await import("./fixtures/trending.json") as Item
    console.log(item)
    res.render("pages/home/index", {item})
})


app.listen(3000);
console.log("Started")