const express = require('express');
const expressHbs = require('express-handlebars');
require('dotenv').config();
const path = require('path');
const db = require('./src/config/db');
const PORT = process.env.PORT || 3000;
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const app = express();


const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const URI_MONGODB = process.env.URI_MONGODB;
const store = new MongoDBStore({
    uri: URI_MONGODB,
    collection: 'mySessions'
});

const route = require('./src/routes');



app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
}));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, './src/public')))

app.engine('hbs', expressHbs.engine({
    extname: ".hbs",
    layoutsDir: path.join(__dirname, './src/sources/views/layouts'),
    partialsDir: "./src/sources/views/partials",
    defaultLayout: "main",
    helpers: {
        sum: (a) => a + 1,


    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './src/sources/views'));

route(app);





db.connect();
app.listen(PORT, () => {
    console.log("path:", path.join(__dirname, './src/public'));
    console.log(`Server is running at http://localhost:${PORT}/user/sign-in`);
})









