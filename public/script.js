const BACKEND_URL = "/api/status";

async function fetchServerStatus() {
  const statusDiv = document.getElementById("status");
  const playersDiv = document.getElementById("players");

  try {
    const res = await fetch(BACKEND_URL);
    const data = await res.json();

    playersDiv.innerHTML = "";

    if (!data.online || !data.players) {
      statusDiv.innerHTML = "❌ Servidor Offline";
      statusDiv.style.color = "red";
      playersDiv.innerHTML = "<p>No hay jugadores conectados</p>";
      return;
    }

    statusDiv.innerHTML = `✅ Online - Jugadores: ${data.players.online}/${data.players.max}`;
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
    console.error("Error al obtener estado del servidor:", err);
    statusDiv.innerHTML = "⚠️ Error al obtener el estado";
    statusDiv.style.color = "orange";
    playersDiv.innerHTML = "<p>No hay jugadores conectados</p>";
  }
}

// === MODAL HANDLER ===
const modal = document.getElementById("modal");
const joinBtn = document.getElementById("joinBtn");
const closeModal = document.getElementById("closeModal");
const copyBtn = document.getElementById("copyBtn");
const copyMsg = document.getElementById("copyMsg");

joinBtn.onclick = () => { modal.style.display = "flex"; };
closeModal.onclick = () => { modal.style.display = "none"; };
window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };

copyBtn.onclick = () => {
  navigator.clipboard.writeText("smpcremaserver.duckdns.org").then(() => {
    copyMsg.textContent = "✅ IP copiada al portapapeles";
    setTimeout(() => copyMsg.textContent = "", 2000);
  });
};

// === START ===
fetchServerStatus();
setInterval(fetchServerStatus, 30000); // refresca cada 30s
