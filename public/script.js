const serverIP = "smpcremaserver.duckdns.org"; // 🔴 Cambia por tu IP/Dominio real
const BACKEND_URL = "/api/status"; // cuando lo subas a Vercel, tu backend estará aquí

// === FETCH STATUS SERVER ===
async function fetchServerStatus() {
  try {
    const res = await fetch(BACKEND_URL);
    const data = await res.json();

    const statusDiv = document.getElementById("status");
    const playersDiv = document.getElementById("players");
    playersDiv.innerHTML = "";

    if (!data.online) {
      statusDiv.innerHTML = "❌ Servidor Offline";
      statusDiv.style.color = "red";
      return;
    }

    statusDiv.innerHTML = `✅ Online - Jugadores: ${data.players.length}/${data.maxPlayers}`;
    statusDiv.style.color = "lightgreen";

    if (data.players && data.players.length > 0) {
      data.players.forEach(player => {
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
    console.error(err);
    document.getElementById("status").innerHTML = "⚠️ Error al obtener el estado";
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
  navigator.clipboard.writeText(serverIP).then(() => {
    copyMsg.textContent = "✅ IP copiada al portapapeles";
    setTimeout(() => copyMsg.textContent = "", 2000);
  });
};

// === START ===
fetchServerStatus();
setInterval(fetchServerStatus, 30000); // refresca cada 30s
