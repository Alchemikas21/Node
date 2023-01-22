const inputAmount = document.querySelector("#amount-input");
const inputDescription = document.querySelector("#description-input");
const dataContainer = document.querySelector("#user-data-container");
let counter = 1;
const createdTableContainer = document.getElementById("#table-container");

document.querySelector("#add-button").addEventListener("click", (event) => {
  event.preventDefault();

  const ID = counter++;

  dataContainer.style.cssText =
    "display: grid;grid-template-columns: 1fr 1fr 1fr; text-align:center";

  const firstCreatedParagraph = document.createElement("div");
  dataContainer.appendChild(firstCreatedParagraph);
  firstCreatedParagraph.textContent = inputAmount.value;
  firstCreatedParagraph.style.display = "inline";

  const secondCreatedParagraph = document.createElement("div");
  dataContainer.appendChild(secondCreatedParagraph);
  secondCreatedParagraph.textContent = inputDescription.value;
  secondCreatedParagraph.style.display = "inline";

  const thirdCreatedParagraph = document.createElement("div");
  dataContainer.appendChild(thirdCreatedParagraph);
  thirdCreatedParagraph.textContent = ID;
  thirdCreatedParagraph.style.display = "inline";
});
