const db = require("../config/FireBase");

const GetSolde = async (req, res) => {
  const SnapChat = await db.collection("soldes").get();
  if (SnapChat.empty) {
    return res.status(500).json({ message: "Aucun solde trouver" });
  }
  try {
    const table = [];
    SnapChat.forEach((items) => {
      table.push({ id: items.id, ...items.data() });
    });

    res.status(200).json(table);
  } catch (error) {
    console.log("Erreur detecter");
  }
};
module.exports = GetSolde;
