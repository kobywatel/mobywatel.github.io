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
  return (Date.now().toString(36) + Math.random().toString(36).slice(2, 8)).toLowerCase();
}

function forwardToId(params) {
  const payload = Object.fromEntries(params);
  const shortId = generateShortId();
  localStorage.setItem(`mobywatel:${shortId}`, JSON.stringify(payload));
  location.href = `card.html?d=${shortId}`;
}
