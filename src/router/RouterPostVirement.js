const db = require("../config/FireBase");
//initialisation de la variable de la da

const now = new Date();
const formattedDate = `${now.getDate().toString().padStart(2, "0")}/${(
  now.getMonth() + 1
)
  .toString()
  .padStart(2, "0")}/${now.getFullYear()} ${now
  .getHours()
  .toString()
  .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

// initalisation Reference

const generateRandomId = (length = 10) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

const Reference = generateRandomId(12);
const PostVirement = async (req, res) => {
  //intitialisation des variable dont ont a besoins coter client
  const { montant, motif_p, motif_c, soldeId, beneficiaireId } = req.body;

  if (!soldeId || !beneficiaireId || montant <= 0) {
    return res
      .status(400)
      .json({ message: "champs manquant ou montant invalide" });
  }

  try {
    // recuperation des information du bénéficiaires

    const userSnapshort = await db
      .collection("beneficiaires")
      .doc(beneficiaireId)
      .get();

    if (!userSnapshort.exists) {
      return res.status(400).json({ message: "aucun bénéfiaires trouver" });
    }
    // recuperation des soldes a soustraire
    const soldeRef = await db.collection("soldes").doc(soldeId).get();
    const soldeSnapshort = soldeRef.data().amount;

    if (soldeSnapshort < montant) {
      return res.status(400).json({ message: "Solde inssuffisant !" });
    }

    // ajout des elements dans l'historique: Element
    // soustraction du solde choisir par id
    const nouveauSolde = soldeSnapshort - montant;
    await db.collection("soldes").doc(soldeId).update({ amount: nouveauSolde });

    const historique = await db.collection("historique").add({
      motif_principale: motif_p,
      motif_complementaire: motif_c,
      soldeId: soldeId,
      beneficiaireId: beneficiaireId,
      montant: montant,
      Beneficiaire: userSnapshort.data(),
      date: formattedDate,
      nouveauSolde: nouveauSolde,
      Reference: Reference,
      statut: "Effectuer",
    });

    // reponse du resultat de la transaction (succès)
    res
      .status(200)
      .json({ message: "Virement effetué avec succès", nouveauSolde });
  } catch (error) {
    // reponse du resultat de la transaction (Erreur)
    res.status(500).json({ message: "Erreur lors du virement:", error });
  }
};

module.exports = PostVirement;
