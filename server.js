const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');const { application } = require('express');
;

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//turn on the routes
app.use(routes);

//turn on the connection to the db server
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
})