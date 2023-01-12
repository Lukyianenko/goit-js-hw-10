

export default function fetchCountries(name) {
    fetch(`https://restcountries.com/v3.1/name/spain`).then(resp => console.log(resp));
}

