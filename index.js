
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
var User = require("./models/Users");
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ---- Cadastro de Maanains

// ---- Testes 

async function getItems(valorProcurado){
    const Items = await User.find({state:valorProcurado});
    return Items;
  }

  getItems('RS').then(function(FoundItems){
    
  console.log(FoundItems)

  });

  getItems('RJ').then(function(FoundItems){
    
    console.log(FoundItems)
  
    });

// ---- Routes
app.get('/teste', (req, res) => {
    res.send('hi!')
});

app.listen(process.env.PORT || 4000, () => {
    console.log("O servidor está conectado");
});
