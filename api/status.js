export default async function handler(req, res) {
  const serverIP = "smpcremaserver.duckdns.org";
  const apiUrl = `https://api.mcsrvstat.us/2/${serverIP}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Aseguramos que players exista
    if (!data.players) data.players = { online: 0, max: 0, list: [] };

    res.status(200).json(data);
  } catch (error) {
    console.error(error); // Para depuración en Vercel
    res.status(500).json({ online: false, players: { online: 0, max: 0, list: [] }, error: "Error al consultar el estado del servidor" });
  }
}
