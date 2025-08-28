// server.js (CommonJS)
const express = require("express");
const cors = require("cors");
const { status } = require("minecraft-server-util");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const SERVER_IP = "smpcremaserver.duckdns.org";
const SERVER_QUERY_PORT = 25575;

app.get("/api/status", async (req, res) => {
  try {
    const result = await status(SERVER_IP, SERVER_QUERY_PORT);
    res.json({
      online: true,
      players: result.players.sample ? result.players.sample.map(p => p.name) : [],
      maxPlayers: result.players.max
    });
  } catch (err) {
    res.json({ online: false, players: [], maxPlayers: 0 });
  }
});

app.listen(PORT, () => console.log(`Backend corriendo en puerto ${PORT}`));
