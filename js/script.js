const base_url = "https://api.apicommerce.tk";

let form = document.getElementById("signUpForm");
form.addEventListener("submit", sign_upfunction);

function sign_upfunction(e) {
  //prevent the browser redirection
  e.preventDefault();

  let message = document.getElementById("message");
  message.textContent = "";

  //get all inputs from the form
  let formData = new FormData(form);

  //Convert data into json
  let data = Object.fromEntries(formData);

  const url_signUp = `${base_url}/sign-up`;

  fetch(url_signUp, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      form.reset();
      message.textContent = data.message;
    });
}
