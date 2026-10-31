alert("Do użycia w celach edukacyjnych");
// zmienne globalne
let sex = "m"; // domyślnie mężczyzna

// zdjęcie

const upload = document.querySelector(".upload");
const imageInput = document.createElement("input");

imageInput.type = "file";
imageInput.accept = "image/jpeg,image/png,image/gif,image/webp";

upload.addEventListener("click", () => {
  imageInput.click();
  upload.classList.remove("error_shown");
});

imageInput.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    upload.classList.add("error_shown");
    alert("Wybierz poprawny plik graficzny.");
    return;
  }

  upload.classList.remove("upload_loaded", "error_shown");
  upload.classList.add("upload_loading");

  try {
    const imageDataUrl = await readFileAsDataUrl(file);

    upload.setAttribute("selected", imageDataUrl);
    upload.querySelector(".upload_uploaded").src = imageDataUrl;

    upload.classList.add("upload_loaded");
    upload.classList.remove("upload_loading");

    console.log("Zdjęcie wgrane lokalnie:", imageDataUrl.slice(0, 80));
  } catch (error) {
    console.error("Błąd odczytu zdjęcia:", error);
    upload.classList.remove("upload_loading");
    upload.classList.add("error_shown");
    alert("Nie udało się odczytać zdjęcia. Spróbuj ponownie.");
  }
});

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Błąd odczytu pliku"));
    reader.readAsDataURL(file);
  });
}

// wybór płci
const selectorBox = document.querySelector(".selector_box");
const selectedGrid = selectorBox.querySelector(".selected_grid");
const selectedText = selectorBox.querySelector(".selected_text");

selectedGrid.addEventListener("click", (e) => {
  e.stopPropagation();
  selectorBox.classList.toggle("selector_open");
});

document.querySelectorAll(".selector_option").forEach((option) => {
  option.addEventListener("click", () => {
    sex = option.id;
    selectedText.textContent = option.textContent;
    selectorBox.classList.remove("selector_open");
  });
});

document.addEventListener("click", (e) => {
  if (!selectorBox.contains(e.target)) {
    selectorBox.classList.remove("selector_open");
  }
});

const guideHolder = document.querySelector(".guide_holder");
const guideTop = guideHolder.querySelector(".top_holder");

guideTop.addEventListener("click", () => {
  guideHolder.classList.toggle("unfolded");
});

// przycisk wejdź

document.querySelector(".go").addEventListener("click", () => {
  var empty = [];
  var params = new URLSearchParams();

  params.set("sex", sex);

  if (!upload.hasAttribute("selected")) {
    empty.push(upload);
    upload.classList.add("error_shown");
  } else {
    params.set("image", upload.getAttribute("selected"));
  }

  const day = document.getElementById("day");
  const month = document.getElementById("month");
  const year = document.getElementById("year");

  if (!day.value || !month.value || !year.value) {
    empty.push(document.querySelector(".date"));
    document.querySelector(".date").classList.add("error_shown");
  } else {
    params.set("day", day.value);
    params.set("month", month.value);
    params.set("year", year.value);
  }

  document.querySelectorAll(".input_holder").forEach((element) => {
    var input = element.querySelector(".input");

    if (element.classList.contains("optional")) {
      if (input.value.trim() !== "") {
        params.set(input.id, input.value);
      }
      return;
    }

    if (isEmpty(input.value)) {
      empty.push(element);
      element.classList.add("error_shown");
    } else {
      params.set(input.id, input.value);
    }
  });

  if (empty.length > 0) {
    empty[0].scrollIntoView({ behavior: "smooth" });
  } else {
    forwardToId(params);
  }
});

// funkcje

function isEmpty(value) {
  let pattern = /^\s*$/;
  return pattern.test(value);
}

function generateShortId() {
  const now = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 10);
  return (now + random).slice(-12).toLowerCase();
}

function buildShortUrl(shortId) {
  const current = new URL(window.location.href);
  const base = current.origin + current.pathname.replace(/\/index\.html$/, "").replace(/\/$/, "");
  return `${base}/${shortId}`;
}

function forwardToId(params) {
  const payload = Object.fromEntries(params);
  const shortId = generateShortId();

  localStorage.setItem(`mobywatel:${shortId}`, JSON.stringify(payload));
  window.location.href = buildShortUrl(shortId);
}
