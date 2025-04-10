const url = "https://dataportal.livsmedelsverket.se/livsmedel/api/v1/livsmedel?offset=0&limit=2532&sprak=1";
const mat = document.getElementById("mat");
let allFood = [];

function searchFood(foodSearch) 
{
    const textSearch = foodSearch.toLowerCase();
    mat.innerHTML = ""; // Rensa tidigare resultat
    const filteredData = allFood.filter(function (food) {
        return food.namn.toLowerCase().includes(textSearch);
    });
    
    filteredData.map(function (food) {
        let card = document.createElement("div");
        card.setAttribute("class", "card");

        let title = document.createElement("h3");
        title.innerHTML = food.namn;

        let number = document.createElement("h4");
        number.innerHTML = food.nummer;

        let button = document.createElement("button");
        button.innerHTML = "Lägg till";
        button.onclick = function () {
            addToMinMat(food);
        };

        card.appendChild(number);
        card.appendChild(title);
        card.appendChild(button);
        mat.appendChild(card);
    });
}

function addToMinMat(food) {
    let savedItems = JSON.parse(localStorage.getItem("minMat")) || [];
    savedItems.push(food);
    localStorage.setItem("minMat", JSON.stringify(savedItems));
    alert(`${food.namn} har lagts till i din lista!`);
}

fetch(url)
    .then(function (response) {
        return response.json();
    }).then(function (data) {
        allFood = data.livsmedel;
        searchFood(""); // Visa alla livsmedel i början
        }).catch(function (error) {
            console.error("Fel vid hämtning av data: ", error);
        });