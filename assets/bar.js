var params = new URLSearchParams(window.location.search);

var bar = document.querySelectorAll(".bottom_element_grid");

var top = localStorage.getItem("top");
var bottom;

if (localStorage.getItem("bottom")) {
  bottom = localStorage.getItem("bottom");

  bar.forEach((element) => {
    var image = element.querySelector(".bottom_element_image");
    var text = element.querySelector(".bottom_element_text");
    var send = element.getAttribute("send");

    if (send === bottom) {
      image.classList.add(bottom + "_open");
      text.classList.add("open");
    } else {
      image.classList.remove(send + "_open");
      image.classList.add(send);
      text.classList.remove("open");
    }
  });
}

function sendTo(url, topName, bottomName) {
  if (topName) {
    localStorage.setItem("top", topName);
  }
  if (bottomName) {
    localStorage.setItem("bottom", bottomName);
  }

  var key = String(url || "home");
  var routeMap = {
    home: "home.html",
    documents: "documents.html",
    services: "services.html",
    qr: "qr.html",
    more: "more.html",
    card: "card.html",
    document: "document.html",
    id: "id.html",
    show: "show.html",
    scan: "scan.html",
    pesel: "pesel.html",
    shortcuts: "shortcuts.html"
  };

  var target = routeMap[key] || (key.endsWith(".html") ? key : key + ".html");
  var qs = params.toString();

  location.href = target + (qs ? "?" + qs : "");
}

bar.forEach((element) => {
  element.addEventListener("click", () => {
    localStorage.removeItem("top");
    localStorage.removeItem("bottom");
    sendTo(element.getAttribute("send"));
  });
});

function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/windows phone/i.test(userAgent)) return 1;
  if (/android/i.test(userAgent)) return 2;
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return 3;

  return 4;
}

if (getMobileOperatingSystem() == 2) {
  var bottomBar = document.querySelector(".bottom_bar");
  if (bottomBar) {
    bottomBar.style.height = "70px";
  }
}

function getRandom(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
