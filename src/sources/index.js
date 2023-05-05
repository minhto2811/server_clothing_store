const express = require('express');
const expressHbs = require('express-handlebars');
require('dotenv').config();
const path = require('path');
const db = require('../config/db');
const PORT = process.env.PORT || 3000;
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const route = require('../routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname,'../public')))

app.engine('hbs', expressHbs.engine({
    extname: ".hbs",
    layoutsDir: path.join(__dirname,'views/layouts'),
    partialsDir: "./views/partials",
    defaultLayout: "main",
    helpers: {
        sum: (a) => a + 1,
      }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'views'));

route(app);

console.log("path:",path.join(__dirname,'../public'));




db.connect();
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/product/home`);
})









