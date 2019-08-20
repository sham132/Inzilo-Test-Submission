const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const orders = require('./routes/orders.route');
const restaurent = require('./routes/restaurent.route');
const connection=require('./Connectors/mysql');
const swaggerUi =require('swagger-ui-express');
const swaggerDocument =require('./swagger.json');
connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... \n\n");
    } else {
        console.log("Failed connecting to database ... \n\n");
    }
});

const PORT = 4000;
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get('/test', function (req, res) {
    res.json({
        "message": `Server is running on port : ${PORT}`
    });
});

app.use('/order', orders);
app.use('/restaurent', restaurent);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(PORT, function () {
    console.log('Server is running on Port', PORT);
});