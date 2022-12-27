const us = document.querySelector('.us');
const lang = document.getElementById('lang');
const arrow = document.querySelector('[data-type="arrow"]');

$(() => {
  $("#phone").mask("999  99  99");
});

// Define codes
async function getCountryCodes() {
  const res = await fetch('/country-codes.json');
  const codes = await res.json();
  return codes 
}

getCountryCodes().then(codes => {
  const codesList = document.getElementById('cods');
  for (let country of codes) {
    codesList.innerHTML += `
      <li>
        <span class="fi fi-${country.code.toLowerCase()}"></span>
        <a href="#" data-name="${country.name}">${country.name} (<span data-name="${country.name}">${country.dial_code}</span>)</a>
      </li>`
  }

  document.querySelector('.change_arrow').addEventListener('click', (event) => {
    const arrows = document.querySelector('[data-type="arrow"]');
    if (getComputedStyle(lang).display == 'none') {
      lang.style.display = 'block';
      arrows.classList.remove('fa-chevron-down');
      arrows.classList.add('fa-chevron-up');
    }
    else {
      lang.style.display = 'none';
      arrows.classList.add('fa-chevron-down');
      arrows.classList.remove('fa-chevron-up');
    }
  });

language = document.querySelectorAll('.card > #lang ul > li > a');
for (let item of language) {
  item.addEventListener('click', function(event) {
    event.preventDefault();
    const country = codes.filter(c => c.name === event.target.dataset.name);
    if (!country || country.length === 0) return false;
    const container = us.querySelector('.data');
    container.innerHTML = '';
    let span = document.createElement('span');
    span.setAttribute('class', `fi fi-${country[0].code.toLowerCase()}`);
    let spanCode = document.createElement('span');
    spanCode.innerText = country[0].dial_code;
    let arrow = document.createElement('i');
    arrow.setAttribute('class', 'fa fa-chevron-down');
    arrow.setAttribute('data-type', 'arrow');
    container.append(span);
    container.append(spanCode);
    container.append(arrow);
    lang.style.display = 'none';
    arrow.classList.add('fa-chevron-down');
    arrow.classList.remove('fa-chevron-up');
  });
}
let search = document.getElementById('search');
search.oninput = () => {
  if (search.value == '') {
    for (let item of language) {
      item.parentNode.style.display = 'block';
    }
  }
  for (let i = 0; i < search.value.length; i++) {
    for (let item of language) {
      if ((item.innerHTML[i].toLowerCase() == search.value[i]) || (item.innerHTML[i].toUpperCase() == search.value[i])) {
        item.parentNode.style.display = 'block';
      }
      else {
        item.parentNode.style.display = 'none';
      }
    }
  }
};
});

document.addEventListener('click', event => {
  let element = event.target;
  while (element.classList && !element.classList.contains('card')) {
    element = element.parentNode;
    if (element?.classList?.contains('card')) {
      return
    }
  } 
  lang.style.display = 'none';
});


