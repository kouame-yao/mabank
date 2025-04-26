const db = require("../config/FireBase");

const GetBeneficiaire = async (req, res) => {
  const SnapChat = await db.collection("beneficiaires").get();
  if (SnapChat.empty) {
    return res.status(500).json({ message: "Aucun bénéficiaires trouver" });
  }
  try {
    const table = [];
    SnapChat.forEach((items) => {
      table.push({ id: items.id, ...items.data() });
    });

    res.status(200).json({ message: "Element trouvé ", table });
  } catch (error) {
    console.log("Erreur detecter");
  }
};
module.exports = GetBeneficiaire;
