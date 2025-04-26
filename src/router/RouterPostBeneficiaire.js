const db = require("../config/FireBase");

const PostBeneficiaire = async (req, res) => {
  const { iban, bic, banque, nom_prenom } = req.body;

  if (!iban || !bic || !banque || !nom_prenom) {
    return res.json({ messsage: "veillez remplir tout les champs !" });
  }

  try {
    const elementAdd = {
      IBAN: iban,
      BIC: bic,
      BANQUE: banque,
      NAME: nom_prenom,
    };
    const SnapShoot = db.collection("beneficiaires").add(elementAdd);

    res.status(200).json({ message: "element ajouter :", elementAdd });
  } catch (error) {
    res.status(500).json({ messageError: "erreur:", error });
    console.log(error);
  }
};

module.exports = PostBeneficiaire;
