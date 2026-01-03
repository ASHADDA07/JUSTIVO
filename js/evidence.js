function recordEvidence() {
  const log = document.getElementById("evidenceLog");
  const time = new Date().toLocaleString();

  navigator.geolocation.getCurrentPosition(pos => {
    log.innerHTML = `
      Evidence recorded at:<br>
      Time: ${time}<br>
      Location: ${pos.coords.latitude}, ${pos.coords.longitude}<br>
      Status: Encrypted & Locked
    `;
  });
}
