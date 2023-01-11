import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from '../js/fetchCountries';

refs = {
  DEBOUNCE_DELAY: 300,
  searchBoxEl: document.querySelector('input#search-box'),
  countryListEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.country-info'),
};

refs.searchBoxEl.addEventListener(
  'input',
  debounce(onSearch, refs.DEBOUNCE_DELAY)
);

function onSearch(e) {
  const name = refs.searchBoxEl.value.trim();

  if (name || name === '') {
    onClear();
  }

  if (name) {
    fetchCountries(name).then(data => selectionСountry(data));
  }
}

function selectionСountry(data) {
  if (data.length > 10) {
    Notiflix.Notify.success(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (data.length > 1 && data.length <= 10) {
    createCounryList(data);
  } else if (data.length === 1) {
    createCounryCard(data);
  }
}

function createCounryList(data) {
  const markupList = data
    .map(({ flags, name }) => {
      return `<li class="list-item" style="display: flex; align-items: center; margin-left: 20px ">
      <img src="${flags.png}" style="width: 40px; heigth: 25px"/>
      <p>${name.official}</p>
      </li>`;
    })
    .join('');

  refs.countryListEl.insertAdjacentHTML('beforeend', markupList);
}

function createCounryCard(data) {
  const markupCard = data
    .map(({ flags, name, capital, population, languages }) => {
      return `<div class="list-item" style="display: flex;">
    <img src="${flags.svg}" style="width: 80px";     />
    <p><strong>${name.official}</strong></p> </div>
    <p><strong>Capital:</strong> ${capital}</p>
    <p><strong>Population:</strong> ${population}</p>
    <p><strong>Languages:</strong> ${Object.values(languages).join(',')}</p>
   `;
    })
    .join('');

  refs.countryInfoEl.insertAdjacentHTML('beforeend', markupCard);
}

function onClear() {
  refs.countryListEl.innerHTML = '';
  refs.countryInfoEl.innerHTML = '';
}
