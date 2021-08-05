"use-strict";

//Getting Classes and Id's from HTML

const container = document.querySelector(".main-cont");
const countryFrom = document.querySelector("#country-from");
const countryTo = document.querySelector("#country-to");
const mainBtn = document.querySelector(".process-btn");

//Hitting the REST Countries API's end-points to get the countries data!

const renderCountries = function (data) {
  const [currency] = data.currencies;
  const html = `<div class="card" style="width: 18rem;">
    <img src=${data.flag} class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title fs-2">${data.name}</h5>
      <p class="card-text">Region : ${data.region}</p>
      <p class="card-text">Capital : ${data.capital}</p>
      <p class="card-text">Currency : ${currency.code}</p>
      
    </div>
  </div>`;
  container.insertAdjacentHTML("afterbegin", html);
};

const getCoutries = async function (country) {
  try {
    const res = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);
    const [data] = await res.json();
    console.log(data);
    renderCountries(data);
  } catch (err) {
    console.log(err);
  }
};

mainBtn.addEventListener("click", function (e) {
  getCoutries(countryTo.value);
  getCoutries(countryFrom.value);
  countryTo.value = "";
  countryFrom.value = "";
});
