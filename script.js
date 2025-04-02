const countryInput = document.getElementById('country');
const countryList = document.getElementById('country-list');

countryInput.addEventListener('input', _.debounce(() => {
    const country = countryInput.value.trim();
    if(country.length < 2){
        alert('Add more letters!');
        return 
    } 
    renderCountry(country);
}, 300));

function renderCountry(country){
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then(response => {
            if(!response.ok){
                throw new Error('country does not exist')
            }
            return response.json()
        })
        .then(data => {
            countryList.innerHTML = '';

            if(data.length === 1){
                renderOneCountry(data[0])
            } else {
                const el = data.map(item => `<li>${item.name.common}</li>`)
                .join('');
                countryList.insertAdjacentHTML('beforeend', el);
            }
        })
        .catch(error => {
            console.log(error);
            countryList.innerHTML = '<li>Äbracadabra Error</li>'
        })
}

function renderOneCountry(country){
    const languages = Object.values(country.languages).join(', ');
    const markup = `
    <div class="country-card">
        <h2 class="country-name">${country.name.common}</h2>
        <div class="country-wrap">
            <ul class="list">
                <li class="country-item">Capital: ${country.capital}</li>
                <li class="country-item">Population: ${country.population}</li>
                <li class="country-item">Languages: ${languages}</li>
            </ul>
        <img src="${country.flag.png}" alt="${country.name.common}" class="country-flag">
        </div>

    </div>`;
    countryList.innerHTML = markup;
    
}