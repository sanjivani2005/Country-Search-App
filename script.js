const apiURL = "https://restcountries.com/v3.1/all?fields=name,capital,flags,population";
const searchInput = document.getElementById("searchInput");
const countryContainer = document.getElementById("countryContainer");

let countriesData = []; // Store all countries here after fetch

// Fetch data from API
fetch(apiURL)
  .then(res => res.json())
  .then(data => {
    countriesData = data;
    displayCountries(countriesData);
  })
  .catch(err => {
    countryContainer.innerHTML = "<p>Failed to load country data.</p>";
    console.error("Error:", err);
  });

// Display country cards
function displayCountries(countries) {
  countryContainer.innerHTML = "";

  countries.map(country => {
    const card = document.createElement("div");
    card.className = "country-card";

    card.innerHTML = `
      <img src="${country.flags.png}" alt="Flag of ${country.name.common}" class="country-flag">
      <h3>${country.name.common}</h3>
      <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
    `;

    countryContainer.appendChild(card);
  });
}

// Filter countries by input
searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();

  const filtered = countriesData.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm)
  );

  displayCountries(filtered);
});
