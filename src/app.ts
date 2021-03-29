import express from 'express';
import path from 'path'
import {Item} from "./models/Item";

const app = express();
// set the view engine to ejs
app.set('view engine', 'ejs');

//set the public folder

app.use(express.static(path.join(__dirname, '../public')))


app.use(express.json())


// Routes
app.get('/', async (req, res) => {
    const items = (await import("./fixtures/trending.json")).objects as Item[]
    res.render("pages/home/index", {item: items[0]})
})

app.get("/unelte", async (req, res) => {
    const items = (await import("./fixtures/trending.json")).objects as Item[]
    res.render("pages/products/objects", {
        items, meta: {
            location: "unelte"
        }
    })
})


app.listen(3000);
console.log("Started")