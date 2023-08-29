/* 
// ---- Requires
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const passport = require("passport");
const flash = require("req-flash");

// ---- Mongo & Session Connections
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(
    session({
        cookie: process.env.DEVELOPMENT
            ? null
            : { secure: true, maxAge: 4 * 60 * 60000, sameSite: "none" },
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        store: process.env.PORT
            ? MongoStore.create(
                // pede onde criar e uma callback function
                {
                    mongoUrl: process.env.MONGO_URL,
                },
                function (err, resposta) {
                    //espaço para uma callback function
                    console.log(err, resposta);
                }
            )
            : null,
    })
);

// ---- Cors Connections
app.set("trust proxy", 1);

app.use(
    cors({
        origin: process.env.FRONT_URL,
        credentials: true,
    })
);

// ---- Several Configs
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);


// ---- Passport Cofigs

app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // ...

// collections imports
var Seminar = require("./models/Seminars")
var User = require("./models/Users");
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ---- Cadastro de Maanains

// ---- Testes 

async function getUsers(valorProcurado) {
    const Items = await User.find({ state: valorProcurado });
    return Items;
}

async function getSeminars() {
    const Items = await Seminar.find();
    return Items;
}

async function getTheSeminar(identificador) {
    const Item = await Seminar.findById(identificador)
}

app.get('/allUsers', (req, res) => {
    getUsers('RS').then(function (FoundItems) {

        res.send(FoundItems)

    });
})

app.get('/seminars', (req, res) => {
    getSeminars().then(function (FoundItems) {

        res.send(FoundItems)

    });
})
app.get('/theSeminar', (req, res) => {
    getSeminars(req.params.identificador).then(function (FoundItems) {
        console.log(`${req.query.identificador}-${FoundItems}`)
        res.send(FoundItems)

    });
})

// ---- Routes
app.get('/teste', (req, res) => {
    res.send('hi!')
});

app.listen(process.env.PORT || 4000, () => {
    console.log("O servidor está conectado");
});
 */
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const eventRoutes = require('./routes/events');
const saleRoutes = require('./routes/sales');
const bookRoutes = require('./routes/books');

const app = express();

// ---- Cors Connections
app.set("trust proxy", 1);

app.use(
    cors({
        origin: process.env.FRONT_URL,
        credentials: true,
    })
);

// ---- Several Configs
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);


// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.error('Error connecting to MongoDB:', error.message);
});

// Middleware
app.use(bodyParser.json());

// Rotas
app.use('/api/event', eventRoutes);
app.use('/api/sale', saleRoutes);
app.use('/api/book', bookRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
