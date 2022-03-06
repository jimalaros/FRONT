const base_url = "https://api.apicommerce.tk";

let ordersButton = document.getElementById("ordenesBtn");
ordersButton.addEventListener("click", orders);
console.log("click nuevo botón");

function orders(e) {
  e.preventDefault();

  const orders_url = `${base_url}/ordenes`;

  fetch(orders_url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((response) => response.json());
}
