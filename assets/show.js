const MINISTRY_KEY = 'MC-PL-2026-DOWOD-Fake';

const FAKE_QR_DATA = {
  id: 'DOC-PL-2026-076442',
  name: 'Jan',
  surname: 'Kowalski',
  sex: 'Mężczyzna',
  birthDate: '15.04.1988',
  pesel: '88041512345',
  photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
  city: 'Warszawa',
  address: 'ul. Marszałkowska 12/3',
  issuer: 'Ministerstwo Cyfryzacji',
  validUntil: '2036-05-15'
};

function buildFakeQrPayload() {
  const base = [
    'mc',
    MINISTRY_KEY,
    `id=${FAKE_QR_DATA.id}`,
    `name=${FAKE_QR_DATA.name}`,
    `surname=${FAKE_QR_DATA.surname}`,
    `sex=${FAKE_QR_DATA.sex}`,
    `birthDate=${FAKE_QR_DATA.birthDate}`,
    `pesel=${FAKE_QR_DATA.pesel}`,
    `city=${FAKE_QR_DATA.city}`,
    `address=${FAKE_QR_DATA.address}`,
    `issuer=${FAKE_QR_DATA.issuer}`,
    `validUntil=${FAKE_QR_DATA.validUntil}`,
    `photo=${FAKE_QR_DATA.photo}`
  ].join('|');

  return base;
}

function setFakeQrImage() {
  const qrImage = document.querySelector('.qr_image');
  if (!qrImage) return;

  const payload = buildFakeQrPayload();
  const encoded = encodeURIComponent(payload);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=700x700&data=${encoded}`;

  qrImage.src = qrUrl;
  qrImage.alt = 'Kod QR z danymi fikturynymi';
  qrImage.setAttribute('data-payload', payload);
}

setFakeQrImage();
