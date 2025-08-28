const BACKEND_URL = "/api/status";

async function fetchServerStatus() {
  const statusDiv = document.getElementById("status");
  const playersDiv = document.getElementById("players");
  playersDiv.innerHTML = "";

  try {
    const res = await fetch(BACKEND_URL);
    const data = await res.json();

    if (!data.online) {
      statusDiv.innerHTML = "❌ Servidor Offline";
      statusDiv.style.color = "red";
      playersDiv.innerHTML = "<p>No hay jugadores conectados</p>";
      return;
    }

    statusDiv.innerHTML = `✅ Servidor Online - ${data.players.online}/${data.players.max} jugadores`;
    statusDiv.style.color = "lightgreen";

    if (data.players.list && data.players.list.length > 0) {
      data.players.list.forEach(player => {
        const card = document.createElement("div");
        card.className = "player-card";

        const avatar = document.createElement("img");
        avatar.src = `https://minotar.net/avatar/${player}/72`;

        const name = document.createElement("div");
        name.className = "player-name";
        name.textContent = player;

        card.appendChild(avatar);
        card.appendChild(name);
        playersDiv.appendChild(card);
      });
    } else {
      playersDiv.innerHTML = "<p>No hay jugadores conectados</p>";
    }

  } catch (err) {
    console.error("Error:", err);
    statusDiv.innerHTML = "⚠️ Error al consultar el servidor";
    statusDiv.style.color = "orange";
  }
}

fetchServerStatus();
setInterval(fetchServerStatus, 30000);
