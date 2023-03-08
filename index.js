
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
if (false) {
    User.register({
        username: 'x.x',
        name: 'Maanaim POA/RS',
        cnpj: '27.056.910/2398-70',
        phone: 5191853463,
        description: 'Maanaim fundado em 2016, estamos no coração do estado do Rio Grande do Sul, onde a Obra avança com firmeza nas promessas de Deus  ',
        verse: 'Daquele dia em diante, enquanto a metade dos meus homens fazia o trabalho, a outra metade permanecia armada de lanças, escudos, arcos e couraças. Os oficiais davam apoio a todo o povo de Judá que estava construindo o muro. Aqueles que transportavam material faziam o trabalho com uma mão e com a outra seguravam uma arma. Neemias 4:16,17',
        zipCode: '90650-070',
        adress: 'R. Plácido de Castro, 245 - Azenha, Porto Alegre - RS, 90650-070',
        websiteURL: 'https://www.igrejacristamaranata.org.br/',


    }, 'x.x', function (err, user) {
        if (err) {
            console.log(err);
            console.log('Ops! Algo deu errado, tente novamente mais tarde.')
        } else {
            console.log('Usuário cadastrado com sucesso!' + user)
        }
    });
}



// ---- Routes
app.get('/teste', (req, res) => {
    res.send('hi!')
});

app.listen(process.env.PORT || 4000, () => {
    console.log("O servidor está conectado");
});
