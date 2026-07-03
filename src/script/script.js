//FONCTIONS
//Tâche 01
async function fetchJSON() {
    const data = await fetch('./src/script/profils.json');
    const dataTransformed = await data.json();
    return dataTransformed;
}

//Tâches 02 et 03
function cardHuman(object) {
    const article = document.createElement('article');
    const titre = document.createElement('h2');
    titre.textContent = object.name;    
    const image = document.createElement('img');
    image.src = object.avatar;
    image.alt = `Portrait de : ${object.name}`;
    const p = document.createElement('p');
    p.textContent = `${object.age} ans - ${object.email}`;
    article.appendChild(titre);
    article.appendChild(image);
    article.appendChild(p);
    article.classList.add('card');
    return article;
}

//Tâches 04 et 05
function cardPet(object) {
    const article = document.createElement('article');
    const titre = document.createElement('h2');
    titre.textContent = object.name;    
    const image = document.createElement('img');
    image.src = object.avatar;
    image.alt = `Portrait de : ${object.name}`;
    const p = document.createElement('p');
    p.textContent = `${object.age} ans - ${object.espece} - Propriétaire : ${object.propriétaire}`;
    article.appendChild(titre);
    article.appendChild(image);
    article.appendChild(p);
    article.classList.add('card');
    return article;
} 

//Tâches 06 et 07
function cardXeno(object) {
    const article = document.createElement('article');
    const titre = document.createElement('h2');
    titre.textContent = object.name;    
    const image = document.createElement('img');
    image.src = object.avatar;
    image.alt = `Portrait de : ${object.name}`;
    const p = document.createElement('p');
    p.textContent = `${object.age} ans - ${object.espece} - Menace : ${object.menace}`;
    article.appendChild(titre);
    article.appendChild(image);
    article.appendChild(p);
    article.classList.add('card');
    return article;
}  

//Tâches 08 a 11
function profil(tableau) {
    const cardList = [];

    tableau.forEach(object => {
        if (object.type === "humain") {
            cardList.push(cardHuman(object));
        } else if (object.type === "animal de compagnie") {
            cardList.push(cardPet(object)); 
        } else if (object.type === "Xeno") {
            cardList.push(cardXeno(object));
        } else {
            console.error("Type de Profil non Existant");
        }
    });
    return cardList;
}

//Tâches 12 a 14
function profilAll(tableau) {
    const profils = document.querySelector('.profils');
    const cardList = profil(tableau);
    cardList.forEach(card => {
        profils.appendChild(card);
    });
}

//LEAFLET

//LEAFLET - Tâche 1
const MAP = L.map('map').setView([43.604429, 1.443812], 14);

//LEAFLET - Tâche 2
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(MAP);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
}).addTo(MAP);

//LEAFLET - Tâche 3
async function launch(MAP) {
    const dataTransformed = await fetchJSON();
    profilAll(dataTransformed);
}

//LEAFLET - Tâche 4 (a et b)
async function launch(MAP) {
    const tabData = await fetchJSON();
    profilAll(tabData);
    tabData.forEach(objet => {
        const ICON = L.icon({
            iconUrl: objet.icon,
            iconSize: [50, 83],
            iconAnchor: [25, 83]
    });
    const marker = L.marker([objet.latitude, objet.longitude], { icon: ICON });
    marker.addTo(MAP);
    });
}

//LEAFLET - Tâche 5 
launch(MAP);

//FONCTION LAUNCH()