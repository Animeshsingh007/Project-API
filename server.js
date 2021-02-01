const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = express();
const bodyParser = require('body-parser')
const { aggregate } = require("./model/User");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");


const dbName = "Wiki API";
const URL = `mongodb://localhost:27017/${dbName}`;

mongoose.connect(
  URL,
  { useNewUrlParser: true ,useUnifiedTopology: true },
  (error, result) => {
    if (error) {
      console.log("Error in Database Connection");
    } else console.log("Connected to database");
  }
);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));

app.use("/user", require("./routes/userRoute"));
app.listen(5000, () => console.log(`Server running on Port ${5000}`));

// ========== Swagger ==================
const swaggerDefinition = {
  info: {
    title: "Wiki Api",
    version: "1.0.0",
    description: "Swagger API Docs",
  },
  basePath: "/", 
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], 
};

const swaggerSpec = swaggerJSDoc(options);

app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
