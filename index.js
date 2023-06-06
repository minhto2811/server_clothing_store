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

const channels = {};

io.on('connection', (socket) => {
    socket.on('join', (channel) => {
        // Thêm client vào kênh chat
        if (!channels[channel]) {
            channels[channel] = [];
        }
        channels[channel].push(socket);

        // Gửi thông báo cho các client khác trong cùng kênh chat
        socket.broadcast.emit('user joined', channel);

        // Gửi danh sách các kênh chat cho client
        io.emit('channel list', Object.keys(channels));
    });

    socket.on('leave', (channel) => {
        // Xóa client khỏi kênh chat
        if (channels[channel]) {
            const index = channels[channel].indexOf(socket);
            if (index !== -1) {
                channels[channel].splice(index, 1);
            }
            if (channels[channel].length === 0) {
                delete channels[channel];
            }
        }

        // Gửi thông báo cho các client khác trong cùng kênh chat
        socket.broadcast.emit('user left', channel);

        // Gửi danh sách các kênh chat cho client
        io.emit('channel list', Object.keys(channels));
    });

    socket.on('message', (data) => {
        const { channel, message } = data;

        // Gửi tin nhắn cho tất cả các client trong cùng kênh chat
        if (channels[channel]) {
            channels[channel].forEach((client) => {
                client.emit('message', message);
            });
        }
    });

    socket.on('disconnect', () => {
        // Xóa client khỏi tất cả các kênh chat khi client ngắt kết nối
        for (const channel in channels) {
            const index = channels[channel].indexOf(socket);
            if (index !== -1) {
                channels[channel].splice(index, 1);
            }
            if (channels[channel].length === 0) {
                delete channels[channel];
            }
        }

        // Gửi danh sách các kênh chat cho client
        io.emit('channel list', Object.keys(channels));
    });
});




db.connect();
http.listen(PORT, () => {
    console.log("path:", path.join(__dirname, './src/public'));
    console.log(`Server is running at http://localhost:${PORT}/user/sign-in`);
})









