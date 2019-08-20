const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const config = require('../connectors/mysql');
const util = require('util'); // node native promisify
const query = util.promisify(config.query).bind(config);
try {
    router.post('/addRestaurent', async (req, res) => {
        let restaurentName = req.body.restaurentname;
        if (restaurentName) {
            let requestedRestaurent = `SELECT ID from tblrestaurents where Name='${restaurentName}'`;
            //console.log(requestedResturent);
            const rows = await query(requestedRestaurent);
            //console.log(rows[0].id);
            if (Object.keys(rows).length === 0) {

                let Query = `Insert INTO tblrestaurents (Name,Created_At,Updated_At) VALUES (?,?,?)`;
                let Query_values = [restaurentName, new Date().toJSON().slice(0, 19).replace('T', ' '), new Date().toJSON().slice(0, 19).replace('T', ' ')];
                const result = await query(Query, Query_values);
                console.log("result", result);
                res.json({
                    Result: "OK",
                    "message": "Resturent Name Added Successfully..."
                });
            } else {
                res.json({
                    Result: "Info",
                    "message": "Resturent Name Already Exists..."
                });
            }
        } else {
            res.json({
                Result: "Info",
                "message": "Resturent Name Can't be Null..."
            });
        }
    });
     // for delete Resturent
    router.delete('/deleteRestaurent/:id', async (req, res) => {
        let restaurentID = req.params.id;
        console.log('restaurentID', restaurentID);
        let requestedRestaurent = `SELECT id from tblrestaurents where id='${restaurentID}'`;
        //console.log(requestedResturent);
        const rows = await query(requestedRestaurent);
        if (Object.keys(rows).length === 0) {
            res.json({
                Result: `Info`,
                message: `Resturent Not Found...`
            });
        } else {
            let requestedRestaurent = `DELETE  from tblrestaurents where id='${restaurentID}'`;
            let result = await query(requestedRestaurent);
            if(result)
            {
            res.json({
                Result: "Ok",
                "message": "Record Deleted Successfully..."
            });
            }
        }
    });





     router.get('/getRestaurentList/',async function (req, res) {
    let requestedOrderList = `SELECT ID,Name,Created_AT from tblrestaurents`;
    let rows = await query(requestedOrderList);
    if(Object.keys(rows).length > 0)
    {
        res.json({Result:`OK`,
        rows});
    }
    else
    {
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