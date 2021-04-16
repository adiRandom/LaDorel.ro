"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importStar(require("./services/auth"));
const cart_1 = require("./services/cart");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = express_1.default();
// set the view engine to ejs
app.set('view engine', 'ejs');
//set the public folder
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cookie_parser_1.default());
app.use(cors_1.default());
app.use((req, res, next) => {
    var _a;
    // Check authentication on
    if (!["POST", "PUT", "DELETE"].find(verb => req.method.toUpperCase() === verb) || req.path === "/api/auth") {
        next();
        return;
    }
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.session;
    if (!token || token === "") {
        res.status(403);
        return;
    }
    if (!auth_1.getUser(token)) {
        res.status(401);
        return;
    }
    next();
});
// View Routes
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const items = (yield Promise.resolve().then(() => __importStar(require("./fixtures/trending.json")))).objects;
    const user = (_c = (_b = auth_1.getUser((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.session)) !== null && _b !== void 0 ? _b : null) !== null && _c !== void 0 ? _c : null;
    const initialCart = (_d = cart_1.getCart(user === null || user === void 0 ? void 0 : user.id)) !== null && _d !== void 0 ? _d : null;
    res.render("pages/home/index", { item: items[0], initialCart: initialCart, user: user });
}));
app.get("/unelte", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g;
    const items = (yield Promise.resolve().then(() => __importStar(require("./fixtures/trending.json")))).objects;
    const user = (_f = auth_1.getUser((_e = req.cookies) === null || _e === void 0 ? void 0 : _e.session)) !== null && _f !== void 0 ? _f : null;
    const initialCart = (_g = cart_1.getCart(user === null || user === void 0 ? void 0 : user.id)) !== null && _g !== void 0 ? _g : null;
    res.render("pages/products/objects", {
        initialCart,
        user,
        items, meta: {
            location: "unelte"
        }
    });
}));
app.get("/unelte-de-putere", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h, _j, _k;
    const items = (yield Promise.resolve().then(() => __importStar(require("./fixtures/trending.json")))).objects;
    const user = (_j = auth_1.getUser((_h = req.cookies) === null || _h === void 0 ? void 0 : _h.session)) !== null && _j !== void 0 ? _j : null;
    const initialCart = (_k = cart_1.getCart(user === null || user === void 0 ? void 0 : user.id)) !== null && _k !== void 0 ? _k : null;
    res.render("pages/products/objects", {
        initialCart, user,
        items, meta: {
            location: "unelte de putere"
        }
    });
}));
app.get("/masini", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _l, _m, _o;
    const items = (yield Promise.resolve().then(() => __importStar(require("./fixtures/trending.json")))).objects;
    const user = (_m = auth_1.getUser((_l = req.cookies) === null || _l === void 0 ? void 0 : _l.session)) !== null && _m !== void 0 ? _m : null;
    const initialCart = (_o = cart_1.getCart(user === null || user === void 0 ? void 0 : user.id)) !== null && _o !== void 0 ? _o : null;
    res.render("pages/products/objects", {
        initialCart, user,
        items, meta: {
            location: "masini"
        }
    });
}));
app.get("/auth", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _p, _q;
    const user = (_q = auth_1.getUser((_p = req.cookies) === null || _p === void 0 ? void 0 : _p.session)) !== null && _q !== void 0 ? _q : null;
    if (user) {
        res.redirect("/user");
    }
    else {
        res.render("pages/user/auth", { user: null, initialCart: null });
    }
}));
app.get("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _r, _s, _t;
    const user = (_s = auth_1.getUser((_r = req.cookies) === null || _r === void 0 ? void 0 : _r.session)) !== null && _s !== void 0 ? _s : null;
    const initialCart = (_t = cart_1.getCart(user === null || user === void 0 ? void 0 : user.id)) !== null && _t !== void 0 ? _t : null;
    if (!user) {
        res.redirect("/auth");
    }
    else {
        res.render("pages/user/user", { user, initialCart });
    }
}));
//API routes
//GET the tools category
app.get("/api/unelte", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = (yield Promise.resolve().then(() => __importStar(require("./fixtures/trending.json")))).objects;
    res.json(items);
}));
//Authenticate a user
app.post("/api/auth", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const token = auth_1.default(email, password);
    console.log(token);
    if (token !== "") {
        //    Valid auth, respond with the token
        res.cookie("session", token).sendStatus(200);
    }
    else {
        res.status(401).json({ error: "Email sau parola gresita" });
    }
}));
app.get("/api/cart", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _u;
    const user = auth_1.getUser(req.cookies.token);
    const items = cart_1.getCart((_u = user === null || user === void 0 ? void 0 : user.id) !== null && _u !== void 0 ? _u : "");
    res.json({ objects: items });
}));
app.post("/api/cart", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _v;
    const user = auth_1.getUser(req.cookies.token);
    const item = req.body;
    cart_1.addItemToCart((_v = user === null || user === void 0 ? void 0 : user.id) !== null && _v !== void 0 ? _v : "", item);
}));
app.delete("/api/cart", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _w;
    const user = auth_1.getUser(req.cookies.token);
    const { id } = req.body;
    cart_1.removeItemFromCart((_w = user === null || user === void 0 ? void 0 : user.id) !== null && _w !== void 0 ? _w : "", id);
}));
app.post("/api/user", (req, res) => {
    const { nume, prenume } = req.body;
    const token = req.cookies.session;
    auth_1.updateUser(token, prenume, nume);
    res.redirect("/user");
});
app.listen(3000);
console.log("Started");
