import './css/styles.css';
import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const conteinerEl = document.querySelector('.country-info');

console.log(listEl);

let named = '';

inputEl.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry(evt) {
    named = evt.target.value.trim();

    fetchCountries(named).then(data => {
        console.log(data);
        if(data.length > 10) {
            conteinerEl.innerHTML = '';
            listEl.innerHTML = '';
            Notify.info('Too many matches found. Please enter a more specific name.');
        } else 
        if(1 < data.length && data.length < 10) {
            conteinerEl.innerHTML = '';
            createMurkup(data); 
        } else 
        if (data.length === 1) {
            listEl.innerHTML = '';
            createMurkupOneCountry(data);
        }

    })
    .catch(err => Notify.failure('Oops, there is no country with that name'));
}



function createMurkup(arr) {
    const murkup = arr.map((
        { flags: { svg: flagImg },
         name: { official: officialName } }
        ) =>
        `<li>
        <img src="${flagImg}" alt="${officialName}">
        <h2>${officialName}</h2>
      </li>
`).join('');

listEl.innerHTML = murkup;
}

function createMurkupOneCountry(arrey) {
    const { capital } = arrey;
    const { population } = arrey;
    const { languages } = arrey;
    const { name: { common } } = arrey;
    const { flags: { svg: iconFlag } } = arrey;

    console.log(capital);


 const murkupCountry = `<img src="${iconFlag}" class="icon" alt="${common}">
    <h2 class="title">${common}</h2>
    <h3 class="text"><span>Capital:</span>${capital}</h3>
    <h3 class="text"><span>Population:</span>${population}</h3>
    <h3 class="text"><span>Languages:</span>${languages}</h3>`;

    conteinerEl.innerHTML = murkupCountry;
}