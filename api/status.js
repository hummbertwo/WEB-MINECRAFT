export default async function handler(req, res) {
  const serverIP = "smpcremaserver.duckdns.org";
  const apiUrl = `https://api.mcsrvstat.us/2/${serverIP}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Evitamos que falle si no hay players
    if (!data.players) {
      data.players = { online: 0, max: 0, list: [] };
      data.online = false;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error en API externa:", error);
    res.status(200).json({
      online: false,
      players: { online: 0, max: 0, list: [] },
      error: "No se pudo consultar el servidor"
    });
  }
}
