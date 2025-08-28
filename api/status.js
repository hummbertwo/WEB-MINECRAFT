import fetch from "node-fetch";

export default async function handler(req, res) {
  const serverIP = "smpcremaserver.duckdns.org";
  const apiUrl = `https://api.mcsrvstat.us/2/${serverIP}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`Error API externa: ${response.status}`);
    const data = await response.json();

    // Aseguramos que siempre haya players
    if (!data.players) {
      data.players = { online: 0, max: 0, list: [] };
      data.online = false;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error al consultar el servidor:", error.message);
    res.status(200).json({
      online: false,
      players: { online: 0, max: 0, list: [] },
      error: "No se pudo consultar el servidor"
    });
  }
}
