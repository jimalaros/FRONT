const base_url = "https://api.apicommerce.tk";

let payment_btn = document.getElementById("mercadopago_btn");
payment_btn.addEventListener("click", get_preference_id);

let vector = [];
let informacion = JSON.parse(localStorage.getItem("productos"));
let datos = informacion[informacion.length - 1];

const title = datos.titulo;
//console.log(title);
const quantity = datos.cantidad;
//console.log(quantity);
const unit_price = datos.precio * datos.cantidad;
//console.log(unit_price);

const product = { title, unit_price, quantity };

vector.push(product);

function get_preference_id(e) {
  // paso 1. Preparar el pago (ir al backend y obtener un preference_id)
  // paso 2. Crear un botón que abre la ventana de MercadoPago.
  e.preventDefault();
  console.log("click");

  const payment_url = `${base_url}/mercadopago/pago`;
  //let MERCADOPAGO_PUBLIC_KEY = 'TEST-19a131dc-b914-4f5f-843b-87384f2ae4e4'

  console.log(vector);
  const data = { items: vector };

  fetch(payment_url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const preference_id = data.preference_id;
      const url = data.url;
      const redirect = true; // change this to have different views

      if (redirect) {
        // use the URL if you want to redirect
        console.log(`Redireccionar a la url: ${url}`);
        window.location.href = url;
      } else {
        // Use preference_id to show a modal
        const mp = new MercadoPago(
          "APP_USR-02085a26-e9bb-479f-89a2-a7982c8e6e3d",
          {
            locale: "es-AR",
          }
        );

        // Inicializa el checkout
        mp.checkout({
          preference: {
            id: preference_id,
          },
          render: {
            container: ".cho-container", // Indica el nombre de la clase donde se mostrará el botón de pago
            label: "Pagar", // Cambia el texto del botón de pago (opcional)
          },
        });
      }
    });
}

let payment_btn2 = document.getElementById("paypal_btn");
payment_btn2.addEventListener("click", get_preference_paypal);

function get_preference_paypal(e) {
  // paso 1. Preparar el pago (ir al backend y obtener un preference_id)
  // paso 2. Crear un botón que abre la ventana de MercadoPago.
  e.preventDefault();
  console.log("click");

  const payment_url = `${base_url}/paypal/pago`;

  const data = { currency_code: "USD", value: unit_price };

  fetch(payment_url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const url = data.href;
    window.location.href = url;
  });
}
