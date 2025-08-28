export default async function handler(req, res) {
  const serverIP = "smpcremaserver.duckdns.org"; // cambia por tu IP/Dominio real
  const API_URL = `https://api.mcsrvstat.us/2/${serverIP}`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (!data.online) {
      return res.status(200).json({
        online: false,
        maxPlayers: 0,
        players: []
      });
    }

    return res.status(200).json({
      online: true,
      maxPlayers: data.players.max || 0,
      players: data.players.list || []
    });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      online: false,
      maxPlayers: 0,
      players: []
    });
  }
}
