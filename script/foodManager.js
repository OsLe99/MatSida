const foodDetails = document.getElementById("food-details");
const detailsContainer = document.getElementById("details-container");
let savedItems = JSON.parse(localStorage.getItem("minMat")) || [];

function renderFoodList() {
    foodDetails.innerHTML = "";
    if (savedItems.length === 0) {
        foodDetails.innerHTML = "<p>Inga sökresultat har lagts till ännu.</p>";
    } else {
        savedItems.forEach((food, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <strong>${food.namn}</strong> - Nummer: ${food.nummer}
                <button onclick="removeFromMinMat(${index})">Ta bort</button>
                <button onclick="showDetails(${food.nummer})">Visa detaljer</button>
            `;
            foodDetails.appendChild(listItem);
        });
    }
}

function removeFromMinMat(index) {
    savedItems.splice(index, 1);
    localStorage.setItem("minMat", JSON.stringify(savedItems));
    renderFoodList();
}

async function showDetails(number) {
    const apiUrl = `https://dataportal.livsmedelsverket.se/livsmedel/api/v1/livsmedel/${number}/naringsvarden?sprak=1`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Kunde inte hämta detaljer.");
        }
        const data = await response.json();
        renderDetails(data);
    } catch (error) {
        detailsContainer.innerHTML = `<p>${error.message}</p>`;
    }
}

function renderDetails(data) {
    detailsContainer.innerHTML = `
        <h3>Detaljer för ${data[0]?.matrisenhet || "okänd maträtt"}:</h3>
        <ul>
            ${data.map(item => `
                <li>
                    <strong>${item.namn}</strong>: ${item.varde} ${item.enhet} (${item.matrisenhet})
                </li>
            `).join("")}
        </ul>
    `;
}

renderFoodList();