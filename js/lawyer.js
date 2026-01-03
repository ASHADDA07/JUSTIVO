const lawyers = [
  { name: "Adv. Rahul", type: "criminal" },
  { name: "Adv. Sneha", type: "civil" },
  { name: "Adv. Amit", type: "family" }
];

function filterLawyers() {
  const spec = document.getElementById("specialization").value;
  const list = document.getElementById("lawyerList");
  list.innerHTML = "";

  lawyers
    .filter(l => spec === "all" || l.type === spec)
    .forEach(l => {
      const li = document.createElement("li");
      li.innerText = `${l.name} (${l.type})`;
      list.appendChild(li);
    });
}

filterLawyers();
