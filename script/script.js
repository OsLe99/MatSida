const url = "https://dataportal.livsmedelsverket.se/livsmedel/api/v1/livsmedel?offset=0&limit=2532&sprak=1";
const mat = document.getElementById("mat");


fetch(url)
    .then(function (response) {
        return response.json()
    }).then(function (data) {
        console.log(data);
        //Här ska vi bygga html kod som hämtar sin data från API:et
        //Hämtar livsmedel och skriver ut dem i en lista
        data.livsmedel.map(function (food) {
            console.log(food);
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
        
        

        
    }).catch(function (error) {
        console.log("Error: " + error);
    })