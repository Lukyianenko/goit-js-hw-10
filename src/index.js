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
            Notify.info('Too many matches found. Please enter a more specific name.');
        } else 
        if (1 < data.length && data.length < 10) {
            createMurkup(data); 
        }

    });
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