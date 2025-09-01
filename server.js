const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
require("dotenv").config();

const GetSolde = require("./src/router/RouterGetSolde");
const GetHistorique = require("./src/router/RouterGetHistorique");
const GetBeneficiaire = require("./src/router/RouterGetBeneficiaire");
const PostBeneficiaire = require("./src/router/RouterPostBeneficiaire");
const PostVirement = require("./src/router/RouterPostVirement");

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://my-espace-account-client.surge.sh", // Ton frontend sur Surge
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Autoriser si pas d'origine (ex: Postman) ou si dans la liste
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

app.get("/test", (req, res) => {
  res.json({ status: "OK", message: "API is working" });
});
app.get("/TableSolde", GetSolde);
app.get("/TableHistorique", GetHistorique);
app.get("/TableBeneficiaire", GetBeneficiaire);

app.post("/ElementBenef", PostBeneficiaire);
app.post("/virementBenef", PostVirement);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
