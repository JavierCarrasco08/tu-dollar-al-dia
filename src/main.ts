const $form_convert = document.forms[0];
const $select_country = $form_convert.country as HTMLSelectElement;
const $input_from = $form_convert.from as HTMLInputElement;
const $input_to = $form_convert.to as HTMLInputElement;
const $moneda = document.getElementById("moneda")!;
const $error = document.getElementById("error")!;
const API_KEY: string = import.meta.env.VITE_API_KEY;
let objDivisas: Divisas = {};

type Currencies = {
  [name: string]: string;
};
type Divisas = {
  [key: string]: string;
};

type Rates = {
  rate_for_amount: string;
  rate: string;
  currency_name: string;
};
document.addEventListener("DOMContentLoaded", () => {
  getListCountry(API_KEY);
});

$input_from.addEventListener("input", () => {
  Validation();
});

$select_country.addEventListener("change", () => {
  $moneda.textContent =
    "Moneda " +
    $select_country.value +
    " - " +
    objDivisas[$select_country.value];
});

$form_convert.addEventListener("submit", async (e) => {
  e.preventDefault();
  let value: string = $input_from.value;
  if ($input_from.value[$input_from.value.length - 1] === ".") {
    value += "0";
  }
  convertDivisas(value, $select_country.value);
});

// ! Esta función es utilizada para crear los options
function createOptions(options: Currencies): Divisas {
  let AmericaSur = [
    "ARS",
    "COP",
    "BRL",
    "BOB",
    "CLP",
    "PEN",
    "VES",
    "PYG",
    "UYU",
  ].sort();
  let objCodesDivisa: Divisas = {};
  for (const [key, value] of Object.entries(options)) {
    if (AmericaSur.includes(key)) {
      objCodesDivisa[key] = value;
    }
  }

  const optionsHTML = AmericaSur.map((option) => {
    const $createOption = document.createElement("option") as HTMLOptionElement;
    $createOption.value = option;
    $createOption.insertAdjacentText("beforeend", option);

    return $createOption;
  });

  $select_country.append(...optionsHTML);

  $moneda.textContent =
    "Moneda " +
    $select_country.value +
    " - " +
    objCodesDivisa[$select_country.value];

  return objCodesDivisa;
}
// ! Esta función se utiliza para validar que el formulario no tenga un error.
function Validation(): void {
  if (/[^0-9.]/gi.test($input_from.value)) {
    $input_from.value = $input_from.value.slice(0, -1);
  }
  if (doubleCharacter(".") >= 2) {
    $input_from.value = $input_from.value.slice(0, -1);
  }
  if (
    $input_from.value[0] === "0" &&
    $input_from.value[1] !== "." &&
    $input_from.value[1]
  ) {
    $input_from.value = `${$input_from.value[0]}.${$input_from.value[1]}`;
  }
  if ($input_from.value[0] === ".") {
    $input_from.value = "0.";
  }
}
// ! Esta función se utiliza para poder obtener la lista de las monedas
async function getListCountry(api: string) {
  try {
    let result = await fetch(
        `https://api.getgeoapi.com/v2/currency/list?api_key=${api}&format=json`
      ),
      json: {
        status: string;
        currencies: Currencies;
      } = await result.json();
    if (json.status !== "success") {
      throw "Hay un error. Por favor intentar mas tarde.";
    }

    let currencies = json.currencies;
    objDivisas = createOptions(currencies);
  } catch (error: unknown | string) {
    if (typeof error === "string") {
      $error.textContent = error;
    }
  }
}
// ! Aquí se obtiene la conversion de las monedas.
async function convertDivisas(amount: string, to: string) {
  try {
    let res = await fetch(
        `https://api.getgeoapi.com/v2/currency/convert?api_key=${API_KEY}&from=USD&to=${to}&amount=${amount}&format=json`
      ),
      json = await res.json();
    if (json.status === "fail") {
      throw "Hay un error. Por favor intentar mas tarde";
    }
    let [{ rate_for_amount }]: Rates[] = Object.values(json.rates);
    let rate: string = parseFloat(rate_for_amount).toFixed(2);
    $input_to.value = rate;
  } catch (error: unknown | string) {
    if (typeof error === "string") {
      $error.textContent = error;
    }
  }
}
// ! Esta función es utilizada para saber cuantas veces se repita la coma, si hay mas de dos coma, borra una.
function doubleCharacter(char: string) {
  let count = 0;
  let index = $input_from.value.indexOf(char);
  while (index !== -1) {
    count++;
    index = $input_from.value.indexOf(char, index + 1);
  }
  return count;
}
