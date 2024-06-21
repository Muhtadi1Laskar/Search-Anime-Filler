import {
    options
} from "./optionsData.js";

const input = document.getElementById("myInput");
const ul = document.getElementById("myDropdown");
const items = ul.getElementsByTagName("a");
const animeFillerCard = document.getElementById('anime-filler-card');
const mangaCannonCard = document.getElementById('manga-cannon-card');
const mixedCannonCard = document.getElementById('mixed-cannon-card');
const table = document.getElementById('table');
const outputCards = document.querySelector('.filler-section');
const outputTable = document.querySelector('.table-responsive');


const renderOptions = () => {
    options.forEach((elem, index) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.className = 'dropdown-item';

        a.innerText = elem;
        li.appendChild(a);
        ul.appendChild(li);
    });
}

const renderHTML = (value) => {
    getAnimeData(value).then(res => {
        console.log(res);
        renderCards(res['Anime-Filler'], animeFillerCard);
        renderCards(res['Manga-Cannon'], mangaCannonCard);
        renderCards(res['Mixed-Cannon-Filler'], mixedCannonCard);
        renderTableData(res['Filler Episodes']);
    });
    outputCards.style.display = 'flex';
    outputTable.style.display = 'block';
}

const renderCards = (value, htmlTag) => {
    htmlTag.innerHTML = value.length === 0 ?
        `<button type='button' class='btn btn-outline-primary btn-sm' style='height: 35px;'>Empty</button>` :
        value.map(elem => `<button type='button' class='btn btn-outline-primary btn-sm'>${elem}</button>`).join('');
}

const renderTableData = (value) => {
    table.innerHTML = value.length === 0 ?
        `<tr><h3>There are no filler episode in this anime</h3></tr>` :
        value.map((elem, index) => `<tr><td>${index+1}</td><td>${elem}</td></tr>`).join('');
}

const getAnimeData = async (value) => {
    const URL = `https://wistful-intriguing-havarti.glitch.me/anime/${value}`;
    const options = {
        method: 'GET',
        redirect: 'follow'
    };

    try {
        const response = await fetch(URL, options);
        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            console.error(`Error fetching data: ${response.status}`);
        }
    } catch (error) {
        return 'Error';
    }
}

function filterFunction() {
    const filter = input.value.toUpperCase();

    for (let i = 0; i < items.length; i++) {
        const txtValue = items[i].textContent || items[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            items[i].style.display = "";
        } else {
            items[i].style.display = "none";
        }
    }
}

renderOptions();
input.addEventListener('keyup', () => filterFunction());

document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', event => {
        const selectedValue = event.target.textContent;
        renderHTML(selectedValue);
    });
});