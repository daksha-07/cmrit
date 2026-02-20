const socket = io("http://localhost:3000");

function renderSlots(category, slots) {
  const container = document.getElementById(category);
  container.innerHTML = "";

  slots.forEach((status, index) => {
    const div = document.createElement("div");
    div.className = `slot ${status ? "occupied" : "free"}`;
    div.innerText = index + 1;

    div.onclick = () => {
      socket.emit("toggleSlot", { category, index });
    };

    container.appendChild(div);
  });
}

socket.on("update", (data) => {
  document.getElementById("totalVehicles").innerText =
    data.totalVehiclesToday;

  renderSlots("twoWheeler", data.parkingSlots.twoWheeler);
  renderSlots("fourWheeler", data.parkingSlots.fourWheeler);
  renderSlots("ev", data.parkingSlots.ev);
});

