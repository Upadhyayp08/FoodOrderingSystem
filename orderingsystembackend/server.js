const express = require("express");
const cors = require("cors");

// * FOR GLOBAL EXCEPTION HANDLING * //
var dbConn = require("./config/db.config");
process.on("uncaughtException", (err) => {
    console.error("An uncaught exception occurred:");
    console.error(err);

    dbConn.query(
        "call proc_ExceptionLog_Insert(?,?,?,?,?)",
        [err.message, "Workorders", "Workorders", err.stack, "E"],
        function (err, res) {
            if (err) {
                console.log("error");
                console.log(err);
            } else {
                console.log("success");
            }
        }
    );
});
// * END * //

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Ok");
});

const WorkordersRoutes = require("./src/routes/workorders.route.js");

app.use("/api/v1/workorders", WorkordersRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 3015;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
