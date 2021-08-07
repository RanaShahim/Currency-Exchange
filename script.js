"use-strict";

//Getting Classes and Id's from HTML

const container = document.querySelector(".main-cont");
const countryFrom = document.querySelector("#country-from");
const countryTo = document.querySelector("#country-to");
const mainBtn = document.querySelector(".process-btn");
let amount = document.querySelector("#amount");

//Hitting the REST Countries API's end-points to get the countries data!
let html;
let html1;
// const renderCountries = async function (country) {
//   const res = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);
//   const [data] = await res.json();
//   const [mainCurrency] = data.currencies;

//   console.log(data);
//   const secondRes = await fetch(
//     `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${mainCurrency.code.toLowerCase()}.json`
//   );
//   let data1 = await secondRes.json();
//   console.log(data1);

//   if (filteredArr[0].id === "country-from") {
//     html = `<div class="card" style="width: 18rem;">
//           <img src=${data.flag} class="card-img-top" alt="...">
//           <div class="card-body">
//             <h5 class="card-title fs-2">${data.name}</h5>
//             <p class="card-text">Region : ${data.region}</p>
//             <p class="card-text">Capital : ${data.capital}</p>
//             <p class="card-text">Currency : ${mainCurrency.code}</p>
//             <p class="card-text">As per :  ${data1.date}</p>
//             <p class = "card-text">Amount from : ${mainCurrency.symbol} ${amount.value} </p>
//           </div>
//       </div>`;
//     container.insertAdjacentHTML("afterbegin", html);
//   }
//   if (filteredArr[1].id === "country-to") {
//     html = `<div class="card" style="width: 18rem;">
//           <img src=${data.flag} class="card-img-top" alt="...">
//           <div class="card-body">
//             <h5 class="card-title fs-2">${data.name}</h5>
//             <p class="card-text">Region : ${data.region}</p>
//             <p class="card-text">Capital : ${data.capital}</p>
//             <p class="card-text">Currency : ${mainCurrency.code}</p>
//           </div>
//       </div>`;
//   }
// };

mainBtn.addEventListener("click", async function (e) {
  const res = await fetch(
    `https://restcountries.eu/rest/v2/name/${countryTo.value}`
  );
  const [data] = await res.json();
  const [mainCurrency] = data.currencies;
  const country1Code = mainCurrency.code.toLowerCase();

  const secondRes = await fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${country1Code}.json`
  );
  let data1 = await secondRes.json();

  const res1 = await fetch(
    `https://restcountries.eu/rest/v2/name/${countryFrom.value}`
  );
  const [newData] = await res1.json();
  const [newMainCurrency] = newData.currencies;
  const country2Code = newMainCurrency.code.toLowerCase();
  const newSecondRes = await fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${country2Code}.json`
  );
  let wowData = await newSecondRes.json();

  html = `<div class="card" style="width: 18rem;">
          <img src=${data.flag} class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title fs-2 text-center">To</h5>
            <h6 class="card-title fs-2 text-center">${data.name}</h6>
            <p class="card-text">Region : ${data.region}</p>
            <p class="card-text">Capital : ${data.capital}</p>
            <p class="card-text">Currency : ${mainCurrency.code}</p>
            <p class="card-text">As per :  ${data1.date}</p>
            <p class = "card-text fs-4 text-center"">${mainCurrency.symbol}${(
    amount.value * wowData[country2Code][country1Code]
  ).toFixed(2)} </p>
          </div>
      </div>`;
  container.insertAdjacentHTML("afterbegin", html);

  html1 = `<div class="card" style="width: 18rem;">
  <img src=${newData.flag} class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title fs-2 text-center">From</h5>
    <h6 class="card-title fs-2 text-center">${newData.name}</h6>
    <p class="card-text">Region : ${newData.region}</p>
    <p class="card-text">Capital : ${newData.capital}</p>
    <p class="card-text">Currency : ${newMainCurrency.code}</p>
    <p class="card-text">As per :  ${wowData.date}</p>
    <p class = "card-text fs-4 text-center">${newMainCurrency.symbol}${amount.value} </p>
  </div>
</div>`;

  container.insertAdjacentHTML("afterbegin", html1);

  // renderCountries(countryTo.value);
  // renderCountries(countryFrom.value);

  // countryTo.value = "";
  // countryFrom.value = "";
});
