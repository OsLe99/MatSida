const foodDetails = document.getElementById("food-details");
const detailsContainer = document.getElementById("details-container");
let savedItems = JSON.parse(localStorage.getItem("minMat")) || [];
let currentFilteredData = [];

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
    // Define a regex to match specific item names
    const regex = /Protein|Fett|Kolhydrater/i; // Example: Match "Protein", "Fett", or "Kolhydrater" (case-insensitive)

    // Filter the data array to include only items with matching names
    const filteredData = data.filter(item => regex.test(item.namn));
    currentFilteredData = filteredData; // Store the filtered data for later use

    // Render the filtered details
    detailsContainer.innerHTML = `
        <h3>Detaljer för ${data[0]?.matrisenhet || "okänd maträtt"}:</h3>
        <ul>
            ${filteredData.map(item => `
                <li>
                    <strong>${item.namn}</strong>: ${item.varde} ${item.enhet} (${item.matrisenhet})
                </li>
            `).join("")}
        </ul>
    `;
}

function updatePortionSize(value) {
    let portionSize = document.getElementById("portionSize").value;
    detailsContainer.innerHTML = `        <h3>Detaljer för ${currentFilteredData[0]?.matrisenhet || "okänd maträtt"}:</h3>
        <ul>
            ${currentFilteredData.map(item => `
                <li>
                    <strong>${item.namn}</strong>: ${Math.round(item.varde * (value / 100),2)} ${item.enhet} per ${value}${item.enhet}
                </li>
            `).join("")}
            <input type="button" value="Lägg till" onclick="addToMinMåltid"(${currentFilteredData[0].nummer, value})>
        </ul>`;
}

function addToMinMåltid(number, portionSize) {
    let savedItems = JSON.parse(localStorage.getItem("minMåltid")) || [];
    const foodItem = savedItems.find(item => item.nummer === number);
    if (foodItem) {
        foodItem.portionSize = portionSize;
    } else {
        alert("Livsmedlet finns inte i din lista.");
    }
    localStorage.setItem("minMåltid", JSON.stringify(savedItems));

    let minMåltid = document.getElementById("minMåltid");
    let foodTest = document.createElement("li");
    foodTest.innerHTML = `<strong>${currentFilteredData[0].namn}</strong> - Portion: ${portionSize} ${currentFilteredData[0].enhet}`;
    minMåltid.appendChild(foodTest);
}

function renderMinMåltid() {
    let savedItems = JSON.parse(localStorage.getItem("minMåltid")) || [];
    let minMåltid = document.getElementById("minMåltid");
    minMåltid.innerHTML = ""; // Clear the list before rendering

    if (savedItems.length === 0) {
        minMåltid.innerHTML = "<p>Inga måltider har lagts till ännu.</p>";
    } else {
        savedItems.forEach(item => {
            let listItem = document.createElement("li");
            listItem.innerHTML = `<strong>${item.namn}</strong> - Portion: ${item.portionSize} ${item.enhet}`;
            minMåltid.appendChild(listItem);
        });
    }
}
// Call renderMinMåltid when måltider.html loads
if (document.getElementById("minMåltid")) {
    renderMinMåltid();
}

renderFoodList();