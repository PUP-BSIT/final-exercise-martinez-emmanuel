// Script for countries.html
async function searchCountries() {
  const search_input = document.getElementById("search_input").value.trim();

  if (search_input === "") {
    alert("Please enter a keyword.");
    return;
  }

  try {
    // First request to get country details
    const countryDetailsResponse = await fetch(
      `https://restcountries.com/v3.1/name/${search_input}`
    );
    const countryDetailsData = await countryDetailsResponse.json();

    if (!countryDetailsData.length) {
      alert("No country found with the provided keyword.");
      return;
    }

    const country = countryDetailsData[0];
    const region = country.region;

    // Second request to get other countries in the same region
    const regionCountriesResponse = await fetch(
      `https://restcountries.com/v3.1/region/${region}`
    );
    const regionCountriesData = await regionCountriesResponse.json();

    displayCountryDetails(country, regionCountriesData);
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while fetching data.");
  }
}

function displayCountryDetails(country, region_countries) {
  const countryDetailsContainer = document.getElementById("country_details");
  const regionCountriesContainer = document.getElementById("region_countries");

  countryDetailsContainer.innerHTML = "";
  regionCountriesContainer.innerHTML = "";

  const quickFactsDescription = document.createElement("p");
  quickFactsDescription.textContent = `Here are some quick facts about ${country.name.common}:`;
  countryDetailsContainer.appendChild(quickFactsDescription);

  const detailsList = document.createElement("ul");

  const detailsToShow = [
    "capital",
    "population",
    "area",
    "languages",
    "currencies",
    "timezones",
    "flag",
    "status",
  ];
  detailsToShow.forEach((key) => {
    const detailItem = document.createElement("li");
    const detailName = document.createElement("span");

    // Apply CSS classes
    detailItem.classList.add("detail-item");
    detailName.classList.add("detail-name");

    detailName.textContent = key.charAt(0).toUpperCase() + key.slice(1) + ": ";
    detailItem.appendChild(detailName);

    const detailValue = document.createElement("span");
    if (key === "languages") {
      const languages = Object.values(country.languages).join(", ");
      detailValue.textContent = languages;
    } else if (key === "currencies") {
      const currencies = Object.values(country.currencies).map(
        (currency) =>
          `${currency.name.charAt(0).toUpperCase()}${currency.name.slice(1)}`
      );
      detailValue.textContent = currencies.join(", ");
    } else if (key === "population" || key === "area") {
      detailValue.textContent = country[key].toLocaleString();
      if (key === "area") {
        detailValue.textContent += " km²";
      }
    } else if (key === "status") {
      detailValue.textContent = country[key]
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    } else {
      detailValue.textContent = country[key];
    }

    detailItem.appendChild(detailValue);
    detailsList.appendChild(detailItem);
  });
  countryDetailsContainer.appendChild(detailsList);

  if (region_countries.length) {
    region_countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

    const regionDescriptionContainer = document.createElement("div");
    regionDescriptionContainer.classList.add("region-description-container");

    const regionDescription = document.createElement("p");
    regionDescription.innerHTML = `The country of ${country.name.common} is
      located in <strong>${country.region}</strong>.
      Here are the other countries in this region:`;
    regionDescription.classList.add("region-description");
    regionDescriptionContainer.appendChild(regionDescription);

    regionCountriesContainer.appendChild(regionDescriptionContainer);

    const regionCountriesList = document.createElement("div");
    regionCountriesList.classList.add("region-countries-list");

    region_countries.forEach((otherCountry) => {
      if (otherCountry.name.common !== country.name.common) {
        const otherCountryItem = document.createElement("div");
        otherCountryItem.classList.add("other-country-item");
        otherCountryItem.textContent = otherCountry.name.common;
        regionCountriesList.appendChild(otherCountryItem);
      }
    });

    regionCountriesContainer.appendChild(regionCountriesList);
  } else {
    regionCountriesContainer.classList.add("no-countries-message");
    regionCountriesContainer.textContent =
      "No other countries in the same region.";
  }
}
