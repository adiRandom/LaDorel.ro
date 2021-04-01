import express from 'express';
import path from 'path'
import {Item} from "./models/Item";
import cors from "cors"

const app = express();
// set the view engine to ejs
app.set('view engine', 'ejs');

//set the public folder

app.use(express.static(path.join(__dirname, '../public')))


app.use(express.json())
app.use(cors())


// View Routes
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

app.get("/unelte-de-putere", async (req, res) => {
    const items = (await import("./fixtures/trending.json")).objects as Item[]
    res.render("pages/products/objects", {
        items, meta: {
            location: "unelte de putere"
        }
    })
})

app.get("/masini", async (req, res) => {
    const items = (await import("./fixtures/trending.json")).objects as Item[]
    res.render("pages/products/objects", {
        items, meta: {
            location: "masini"
        }
    })
})

app.get("/auth",async (req,res)=>{
    res.render("pages/user/auth")
})

//API routes

//GET the tools category
app.get("/api/unelte", async(req, res) => {
    const items = (await import("./fixtures/trending.json")).objects as Item[]
    res.json(items);
})

//Authenticate a user

app.post("/api/auth",async(req,res)=>{
    const {email,password} = req.body;
})


app.listen(3000);
console.log("Started")