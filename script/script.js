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


            card.appendChild(number);
            card.appendChild(title);
            mat.appendChild(card);
    })
}


fetch(url)
    .then(function (response) {
        return response.json();
    }).then(function (data) {
        allFood = data.livsmedel;
        searchFood(""); // Visa alla livsmedel vid första inläsning
        }).catch(function (error) {
            console.error("Error fetching data:", error);
        });