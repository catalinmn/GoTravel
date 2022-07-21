const winston = require("winston");
const express = require("express");
const app = express();

require("./startup/logging");
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));

//Testing logs
const config = require("config");
console.log("NODE_ENV: " + process.env.NODE_ENV);
console.log("Env private key: " + process.env.JWTPRIVATEKEY);
console.log("Config: " + config.get("jwtPrivateKey"));
