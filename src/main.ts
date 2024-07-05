import './style.css'

const form = document.querySelector('form') as HTMLFormElement;

form.addEventListener('submit', async (e) => {
  showSpinner()
  e.preventDefault();
  const data = new FormData(form);

  const response = await fetch('http://localhost:8080/dream', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      prompt: data.get('prompt'),
    })
  });
  if (response.ok){
 const { image } = await response.json()
  const results = document.querySelector('#result');
  console.log(image);
  results!.innerHTML = `<img src="${image}" width="512" />`;
  } else{
    const error = await response.text();
    alert(error)
    console.log(error);
  }
  hideSpinner();
})

function showSpinner() {
  const button = document.querySelector('button')
  button!.disabled = true;
  button!.innerHTML = "Generationg... <span class='spinner'>😍</span>"
}
function hideSpinner() {
  const button = document.querySelector('button')
  button!.disabled = false;
  button!.innerHTML = "Generate"
}