const ROUTES = {
  home: 'home.html',
  documents: 'documents.html',
  document: 'document.html',
  services: 'services.html',
  qr: 'qr.html',
  show: 'show.html',
  scan: 'scan.html',
  more: 'more.html',
  card: 'card.html',
  pesel: 'pesel.html',
  shortcuts: 'shortcuts.html',
  id: 'id.html'
};

const params = new URLSearchParams(window.location.search);
const bar = document.querySelectorAll('.bottom_element_grid');

const storedBottom = localStorage.getItem('bottom');

if (storedBottom) {
  bar.forEach((element) => {
    const image = element.querySelector('.bottom_element_image');
    const text = element.querySelector('.bottom_element_text');
    const send = element.getAttribute('send');

    if (send === storedBottom) {
      image.classList.add(`${storedBottom}_open`);
      text.classList.add('open');
    } else {
      image.classList.remove(`${send}_open`);
      image.classList.add(send);
      text.classList.remove('open');
    }
  });
}

function sendTo(key, top, bottom) {
  if (top) localStorage.setItem('top', top);
  if (bottom) localStorage.setItem('bottom', bottom);

  const rawKey = String(key ?? '');
  const file = ROUTES[rawKey] || (rawKey.endsWith('.html') ? rawKey : `${rawKey}.html`);
  const queryString = params.toString();

  window.location.href = file + (queryString ? `?${queryString}` : '');
}

bar.forEach((element) => {
  element.addEventListener('click', () => {
    localStorage.removeItem('top');
    localStorage.removeItem('bottom');
    sendTo(element.getAttribute('send'));
  });
});

function getMobileOperatingSystem() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/windows phone/i.test(userAgent)) return 1;
  if (/android/i.test(userAgent)) return 2;
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return 3;

  return 4;
}

if (getMobileOperatingSystem() === 2) {
  const bottomBar = document.querySelector('.bottom_bar');
  if (bottomBar) bottomBar.style.height = '70px';
}

function getRandom(min, max) {
  return parseInt(Math.random() * (max - min) + min, 10);
}

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
