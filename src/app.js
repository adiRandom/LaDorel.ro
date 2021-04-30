import express from "express";
import path from "path";
import cors from "cors";
import authenticate, { getUser, updateUser } from "./services/auth.js";
import { addItemToCart, getCart, removeItemFromCart } from "./services/cart.js";
import cookieParser from "cookie-parser";
import { promises as fs } from "fs";

//ES Modules mode doesn't support built in __dirname
const __dirname = path.dirname(new URL(import.meta.url).pathname).substring(1);

const app = express();
// set the view engine to ejs
app.set("view engine", "ejs");

//set the public folder

app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use((req, res, next) => {
    // Check authentication on
    if (
        !["POST", "PUT", "DELETE"].find(
            (verb) => req.method.toUpperCase() === verb
        ) ||
        req.path === "/api/auth"
    ) {
        next();
        return;
    }
    const token = req.cookies?.session;
    if (!token || token === "") {
        res.sendStatus(403);
        return;
    }
    if (!getUser(token)) {
        const expDate = new Date();
        expDate.setFullYear(1971);
        // Invalidate the session
        res.cookie("session", "", { expires: expDate }).sendStatus(401);
        return;
    }

    next();
});

// View Routes
app.get("/", async (req, res) => {
    const file = await fs.readFile("./src/fixtures/trending.json", "UTF-8");
    const items = JSON.parse(file).objects;
    const user = getUser(req.cookies?.session) ?? null ?? null;
    const initialCart = getCart(user?.id) ?? null;
    res.render("pages/home/index", {
        item: items[0],
        initialCart: initialCart,
        user: user,
    });
});

app.get("/unelte", async (req, res) => {
    const file = await fs.readFile("./src/fixtures/unelte.json", "UTF-8");
    const items = JSON.parse(file).objects;
    const user = getUser(req.cookies?.session) ?? null;
    const initialCart = getCart(user?.id) ?? null;
    res.render("pages/products/objects", {
        initialCart,
        user,
        items,
        meta: {
            location: "unelte",
        },
    });
});

app.get("/unelte-de-putere", async (req, res) => {
    const file = await fs.readFile(
        "./src/fixtures/unelte_de_putere.json",
        "UTF-8"
    );
    const items = JSON.parse(file).objects;
    const user = getUser(req.cookies?.session) ?? null;
    const initialCart = getCart(user?.id) ?? null;
    res.render("pages/products/objects", {
        initialCart,
        user,
        items,
        meta: {
            location: "unelte de putere",
        },
    });
});

app.get("/masini", async (req, res) => {
    const file = await fs.readFile("./src/fixtures/masini.json", "UTF-8");
    const items = JSON.parse(file).objects;
    const user = getUser(req.cookies?.session) ?? null;
    const initialCart = getCart(user?.id) ?? null;
    res.render("pages/products/objects", {
        initialCart,
        user,
        items,
        meta: {
            location: "masini",
        },
    });
});

app.get("/auth", async (req, res) => {
    const user = getUser(req.cookies?.session) ?? null;
    if (user) {
        res.redirect("/user");
    } else {
        res.render("pages/user/auth", { user: null, initialCart: null });
    }
});

app.get("/user", async (req, res) => {
    const user = getUser(req.cookies?.session) ?? null;
    const initialCart = getCart(user?.id) ?? null;
    if (!user) {
        res.redirect("/auth");
    } else {
        res.render("pages/user/user", { user, initialCart });
    }
});

app.get("/oferte", async (req, res) => {
    const paths = [
        "./src/fixutres/trending.json",
        "./src/fixutres/unelte.json",
        "./src/fixutres/unelte_de_putere.json",
        "./src/fixtures/masini.json",
    ];
    const files = await Promise.all(
        paths.map((path) => fs.readFile(path, "utf-8"))
    );
    const items = files.map((file) => JSON.parse(file).objects).flat();
    const discountedItems = items.filter((item) => !!item.discount);
    const user = getUser(req.cookies?.session) ?? null;
    const initialCart = getCart(user?.id) ?? null;
    res.render("pages/products/discounted", {
        initialCart,
        user,
        items: discountedItems,
    });
});

app.get("/contact", async (req, res) => {
    const user = getUser(req.cookies?.session) ?? null;
    const initialCart = getCart(user?.id) ?? null;
    res.render("pages/contact/contact", {
        initialCart,
        user,
    });
});

//API routes

//GET the tools category
app.get("/api/unelte", async (req, res) => {
    const file = await fs.readFile("./src/fixtures/unelte.json", "UTF-8");
    const items = JSON.parse(file).objects;
    res.json(items);
});

app.get("/api/unelte/putere", async (req, res) => {
    const file = await fs.readFile(
        "./src/fixtures/unelte_de_putere.json",
        "UTF-8"
    );
    const items = JSON.parse(file).objects;
    res.json(items);
});
app.get("/api/masini", async (req, res) => {
    const file = await fs.readFile("./src/fixtures/masini.json", "UTF-8");
    const items = JSON.parse(file).objects;
    res.json(items);
});

//Authenticate a user

app.post("/api/auth", async (req, res) => {
    const { email, password } = req.body;
    const token = authenticate(email, password);
    if (token !== "") {
        //    Valid auth, respond with the token
        res.cookie("session", token).sendStatus(200);
    } else {
        res.status(401).json({ error: "Email sau parola gresita" });
    }
});

app.get("/api/cart", async (req, res) => {
    const user = getUser(req.cookies?.session);

    const items = getCart(user?.id ?? "");
    res.json({ objects: items });
});

app.put("/api/cart", async (req, res) => {
    const user = getUser(req.cookies?.session);
    const item = req.body;
    addItemToCart(user?.id ?? "", item);
    res.sendStatus(200);
});

app.delete("/api/cart", async (req, res) => {
    const user = getUser(req.cookies?.session);
    const { id } = req.body;
    removeItemFromCart(user?.id ?? "", id);
    res.sendStatus(200);
});

app.post("/api/user", (req, res) => {
    const { nume, prenume } = req.body;
    const token = req.cookies.session;
    updateUser(token, prenume, nume);
    res.redirect("/user");
});

app.get("/api/oferte", async (req, res) => {
    const file = await fs.readFile("./src/fixtures/trending.json", "UTF-8");
    const items = JSON.parse(file).objects.filter((item) => !!item.discount);
    res.json(items);
});

app.listen(3000);
console.log("Started");
