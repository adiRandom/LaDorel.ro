import express from 'express';
import path from 'path'
import {Item} from "./models/Item";
import cors from "cors"
import authenticate, {getUser} from "./services/auth";
import {addItemToCart, getCart, removeItemFromCart} from "./services/cart";

const app = express();
// set the view engine to ejs
app.set('view engine', 'ejs');

//set the public folder

app.use(express.static(path.join(__dirname, '../public')))


app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    // Check authentication on
    if (!["POST", "PUT", "DELETE"].find(verb => req.method.toUpperCase() === verb)) {
        next();
        return;
    }
    const token = req.cookies.token;
    if (!token || token === "") {
        res.status(403);
        return;
    }
    if (!getUser(token)) {
        res.status(401);
        return;
    }

    next();
})


// View Routes
app.get('/', async (req, res) => {
    const items = (await import("./fixtures/trending.json")).objects as Item[]
    res.render("pages/home/index", {item: items[0], initialCart: items})
})

app.get("/unelte", async (req, res) => {
    const items = (await import("./fixtures/trending.json")).objects as Item[]
    res.render("pages/products/objects", {
        initialCart: items,
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

app.get("/auth", async (req, res) => {
    res.render("pages/user/auth")
})

//API routes

//GET the tools category
app.get("/api/unelte", async (req, res) => {
    const items = (await import("./fixtures/trending.json")).objects as Item[]
    res.json(items);
})

//Authenticate a user

app.post("/api/auth", async (req, res) => {
    const {email, password} = req.body;
    const token = authenticate(email, password);
    if (token !== "") {
        //    Valid auth, respond with the token
        res.status(200).cookie("session", token)
    } else {
        res.status(401).json({error: "Email sau parola gresita"})
    }
})

app.get("/api/cart", async (req, res) => {
    const user = getUser(req.cookies.token);

    const items = getCart(user?.id ?? "")
    res.json({objects: items})
})

app.post("/api/cart", async (req, res) => {
    const user = getUser(req.cookies.token);
    const item = req.body;
    addItemToCart(user?.id ?? "", item)
})

app.delete("api/cart", async (req, res) => {
    const user = getUser(req.cookies.token);
    const {id} = req.body;
    removeItemFromCart(user?.id ?? "", id)
})


app.listen(3000);
console.log("Started")