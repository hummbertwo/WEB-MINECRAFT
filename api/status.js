// api/status.js
import mc from "minecraft-server-util";

export default async function handler(req, res) {
  try {
    const options = {
      timeout: 1000 * 5,
      enableSRV: true
    };

    // Cambia IP y puerto por los de tu server
    const response = await mc.status("smpcremaserver.duckdns.org", 25565, options);

    res.status(200).json({
      online: true,
      players: response.players.sample ? response.players.sample.map(p => p.name) : [],
      maxPlayers: response.players.max
    });
  } catch (err) {
    console.error(err);
    res.status(200).json({
      online: false,
      players: [],
      maxPlayers: 0
    });
  }
}
