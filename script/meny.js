byggMeny();
// Skapar en meny med länkar till olika sidor

function byggMeny()
{
    let links = [
        ["Startsida", "index.html"],
        ["Ny måltid", "minmat.html"],
        ["Måltider", "måltider.html"]
    ]

    for(i = 0; i < links.length; i++)
    {
        let listItem = document.createElement("li");
        let link = document.createElement("a");
        link.href = links[i][1];
        let text = document.createTextNode(links[i][0]);
        link.appendChild(text);
        listItem.appendChild(link);
        document.getElementById("meny").appendChild(listItem);
    }
}