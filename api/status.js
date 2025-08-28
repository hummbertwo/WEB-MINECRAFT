export default async function handler(req, res) {
  const serverIP = "smpcremaserver.duckdns.org"; // tu dominio/IP
  const apiUrl = `https://api.mcsrvstat.us/2/${serverIP}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al consultar el estado del servidor" });
  }
}
