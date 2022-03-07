const base_url = "https://api.apicommerce.tk";

let form = document.getElementById("login_form");
form.addEventListener("submit", login_event);

function login_event(e) {
  // prevent the browser redirections
  e.preventDefault();

  let message = document.getElementById("message");
  message.textContent = "";

  /* Get all inputs from the form */
  let formData = new FormData(form);

  /* Convert data into json */
  let data = Object.fromEntries(formData);

  const url_login = `${base_url}/login`;

  fetch(url_login, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .then((data) => {
    form.reset();
    message.textContent = data.token;
  });
}
