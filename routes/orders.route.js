const express = require('express');
const router = express.Router();
const config = require('../connectors/mysql');
const util = require('util'); // node native promisify
const ValidateEmail = require('../hooks/hooks');
const query = util.promisify(config.query).bind(config);
try {
    router.post('/addOrder', async (req, res) => {
        let CustomerEmail = req.body.CustomerEmail;
        let email = ValidateEmail(CustomerEmail);
        if (email === false)

        {
            res.json({
                Result: `Info`,
                message: `You Have Send An Incorrect Email Address...`
            });
        } else {
            let RestaurentName = req.body.RestaurentName;
            let OrderItem = req.body.OrderItem;
            let OrderPrice = req.body.OrderPrice;

            let requestedRestaurent = `SELECT ID from tblrestaurents where Name='${RestaurentName}'`;
            let rows = await query(requestedRestaurent);
            if (Object.keys(rows).length === 0) {
                res.json({
                    Result: `Info`,
                    message: `Restaurant Not Found...`
                });

            } else {
                let RestaurentID = rows[0]["ID"];
                let Query = `Insert INTO tblorders (CustomerEmail,RestaurentID,OrderItem,OrderPrice,Created_At,Updated_At) VALUES (?,?,?,?,?,?)`;
                let Query_values = [CustomerEmail, RestaurentID, OrderItem, OrderPrice, new Date().toJSON().slice(0, 19).replace('T', ' '), new Date().toJSON().slice(0, 19).replace('T', ' ')];
                const result = await query(Query, Query_values);
                console.log("result", result);
                res.json({
                    Result: "OK",
                    "message": "Order Added Successfully..."
                });

            }
        }
    });
    // for delete Order
    router.delete('/deleteOrder/:id', async (req, res) => {
        let orderID = req.params.id;
        let RestaurentName = req.body.RestaurentName;
        let requestedRestaurent = `SELECT ID from tblrestaurents where Name='${RestaurentName}'`;
        let rows = await query(requestedRestaurent);
        console.log("ressss", rows);
        let requestedOrder = `SELECT ID from tblorders where ID='${orderID}'`;
        let rows_1 = await query(requestedOrder);
        if (Object.keys(rows).length === 0) {
            res.json({
                Result: `Info`,
                message: `Restaurant ID Not Found...`
            });

        } else if (Object.keys(rows_1).length === 0) {
            res.json({
                Result: `Info`,
                message: `Order ID Not Found...`
            });
        } else {

            let OrderID = rows_1[0]["ID"];
            let RestaurentID = rows[0]["ID"];
            let requestedOrder = `DELETE  from tblorders where ID='${OrderID}' AND RestaurentID=${RestaurentID}`;
            console.log(requestedOrder);
            let result = await query(requestedOrder);
            console.log("re", result.affectedRows);

            if (result.affectedRows > 0) {
                res.json({
                    Result: "Ok",
                    "message": "Record Deleted Successfully..."
                });
            } else {
                res.json({
                    Result: "Info",
                    "message": "Something Went Wrong Please check the Order ID And Restaurent Name..."
                });
            }

        }
    });

    // get order info


    router.get('/getOrderbyPk/:id', async function (req, res) {
        let orderID = req.params.id;
        let requestedOrderList = `SELECT ID,CustomerEmail,RestaurentID,OrderItem,OrderPrice,Created_AT from tblorders where ID='${orderID}'`;
        let rows = await query(requestedOrderList);
        if (Object.keys(rows).length > 0) {
            res.json({
                Result: `OK`,
                rows
            });
        } else {
            res.json({
                Result: `Info`,
                message: `No Record Found...`
            });
        }
    });

    router.put('/updateOrder/:id', async function (req, res) {
        let orderID = req.params.id;
        let CustomerEmail = req.body.CustomerEmail;
        let RestaurentName = req.body.RestaurentName;
        let OrderItem = req.body.OrderItem;
        let OrderPrice = req.body.OrderPrice;
        let requestedRestaurent = `SELECT ID from tblrestaurents where Name='${RestaurentName}'`;
        const rowss = await query(requestedRestaurent);

        if (Object.keys(rowss).length <= 0) {
            res.json({
                Result: `Info`,
                message: `Restaurant Not Found...`
            });

        } else {
            let RestaurentID = rowss[0]["ID"];
            let UpdatedData = `Update tblorders Set  CustomerEmail='${CustomerEmail}',RestaurentID='${RestaurentID}', OrderItem='${OrderItem}', OrderPrice='${OrderPrice}',Updated_at='${new Date().toJSON().slice(0, 19).replace('T', ' ')}'  where ID=${orderID}`;
            let rows = await query(UpdatedData);
            if (rows.affectedRows > 0) {
                res.json({
                    Result: `Ok`,
                    message: `Record Update Successfully...`
                });
            }
        }
    });
    router.get('/getOrderList/', async function (req, res) {
        let requestedOrderList = `SELECT ID,CustomerEmail,RestaurentID,OrderItem,OrderPrice,Created_AT from tblorders`;
        let rows = await query(requestedOrderList);
        if (Object.keys(rows).length > 0) {
            res.json({
                Result: `OK`,
                rows
            });
        } else {
            res.json({
                Result: `Info`,
                message: `No Record Found...`
            });
        }
    });
} catch (err) {
    console.log(`err : ${err}`);
}
module.exports = router;
