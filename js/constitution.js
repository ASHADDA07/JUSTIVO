function showArticle(type) {
  const content = document.getElementById("constitutionContent");

  const data = {
    equality: {
      title: "Right to Equality",
      text: "The Constitution ensures equality before law and equal protection of laws to all citizens."
    },
    freedom: {
      title: "Right to Freedom",
      text: "Citizens enjoy freedoms of speech, expression, movement, and profession, subject to law."
    },
    exploitation: {
      title: "Right Against Exploitation",
      text: "The Constitution prohibits human trafficking, forced labour, and child labour."
    },
    duties: {
      title: "Fundamental Duties",
      text: "Citizens are expected to respect the Constitution, national symbols, and promote harmony."
    }
  };

  content.innerHTML = `
    <h2>${data[type].title}</h2>
    <p>${data[type].text}</p>
    <p class="disclaimer">This information is for educational purposes only.</p>
  `;
}
