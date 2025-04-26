const db = require("../config/FireBase");

const GetHistorique = async (req, res) => {
  const SnapChat = await db.collection("historique").get();
  if (SnapChat.empty) {
    return res.status(500).json({ message: "Aucun historique trouver" });
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
module.exports = GetHistorique;
