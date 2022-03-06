const base_url = "https://api.apicommerce.tk";

let informacion = JSON.parse(localStorage.getItem("productos"));
let datos = informacion[informacion.length - 1];

const producto = datos.titulo;
//console.log(producto);
const cantidad = datos.cantidad;
//console.log(cantidad)
const precio = datos.precio * datos.cantidad;
//console.log(precio);

let newOrderButton = document.getElementById("procesar-compra");
newOrderButton.addEventListener("click", newOrders);
console.log("click nuevo botón");

function newOrders(e) {
  e.preventDefault();

  const ordenes_url = `${base_url}/ordenes/nuevas`;

  const data = { producto, cantidad, precio };
  console.log(data);

  fetch(ordenes_url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}
