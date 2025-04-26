//Mes dependance requises

const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
require("dotenv").config();

//
const GetSolde = require("./src/router/RouterGetSolde");
const GetHistorique = require("./src/router/RouterGetHistorique");
const GetBeneficiaire = require("./src/router/RouterGetBeneficiaire");
const PostBeneficiaire = require("./src/router/RouterPostBeneficiaire");
const PostVirement = require("./src/router/RouterPostVirement");

const app = express();
const port = 3000;

// Mes dependences utiliser
app.use(cors());
app.use(bodyParser.json());

// Mes Routes Gets
app.get("/TableSolde", GetSolde);
app.get("/TableHistorique", GetHistorique);
app.get("/TableBeneficiaire", GetBeneficiaire);

//Mes Routes Post

app.post("/ElementBenef", PostBeneficiaire);
app.post("/virementBenef", PostVirement);

// Lancement du server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
