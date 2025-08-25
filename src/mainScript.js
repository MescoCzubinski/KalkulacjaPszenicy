function format(inputString) {
  return inputString
    .replace(/[^0-9.,]/g, "")
    .replace(/^0+(?=\d)/, "")
    .replace(/,/g, ".")
    .replace(/^\.($|[^0-9])/, "0.")
    .replace(/\.{2,}/g, ".")
    .replace(/(.*?\..*?)\./g, "$1")
    .replace(/(\d+\.\d{2})\d*/g, "$1")
    .replace(/[a-zA-Z]+/g, "");
}
document.addEventListener("input", (event) => {
  if (!event.target.classList.contains("textInput")) {
    const inputField = event.target;
    inputField.value = format(inputField.value);
  }
});
const visitedElements = document.querySelectorAll("input, select");
visitedElements.forEach((input) => {
  input.addEventListener("blur", function () {
    if (this.value) {
      this.classList.add("visited");
    } else {
      this.classList.remove("visited");
    }
  });
});
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("show-hide-button")) {
    let content = event.target.parentElement.nextElementSibling;
    content.style.height =
      content.style.height === "0px" || !content.style.height
        ? content.scrollHeight + "px"
        : "0px";
    event.target.textContent =
      content.style.height === "0px" ? "Rozwiń" : "Zwiń";
  }
});

function recalculateSectionHeight() {
  document.querySelectorAll(".show-hide-content").forEach((content) => {
    if (content.style.height !== "0px" && content.style.height) {
      content.style.height = content.scrollHeight + "px";
    }
  });
}

const exclusionMap = {
  "miedzyplony-checkbox": ["systemy-checkbox", "sloma-gleba-checkbox"],
  "nawozenie-podst-checkbox": [
    "integrowana-checkbox",
    "nawozenie-wapnow-checkbox",
  ],
  "nawozenie-wapnow-checkbox": [
    "integrowana-checkbox",
    "nawozenie-podst-checkbox",
  ],
  "struktura-checkbox": [""],
  "obornik-12-checkbox": [
    "naturalne-nierozbyrzgowo-checkbox",
    "systemy-checkbox",
    "sloma-gleba-checkbox",
  ],
  "naturalne-nierozbyrzgowo-checkbox": [
    "obornik-12-checkbox",
    "sloma-gleba-checkbox",
  ],
  "systemy-checkbox": [
    "miedzyplony-checkbox",
    "sloma-gleba-checkbox",
    "obornik-12-checkbox",
  ],
  "sloma-gleba-checkbox": [
    "miedzyplony-checkbox",
    "systemy-checkbox",
    "naturalne-nierozbyrzgowo-checkbox",
    "obornik-12-checkbox",
  ],
  "integrowana-checkbox": [
    "nawozenie-podst-checkbox",
    "nawozenie-wapnow-checkbox",
    "biologiczna-checkbox",
    "material-siewny-kwalifik-checkbox",
  ],
  "biologiczna-checkbox": ["integrowana-checkbox"],
  "nawozenie-checkbox": [""],
  "material-siewny-kwalifik-checkbox": ["integrowana-checkbox"],
};

document.addEventListener("change", (event) => {
  if (!event.target.matches('input[type="checkbox"]')) return;

  //wykluczenia
  let ekoschematy = document.querySelectorAll(
    "#miedzyplony-checkbox, #nawozenie-podst-checkbox, #nawozenie-wapnow-checkbox, #struktura-checkbox, #obornik-12-checkbox, #naturalne-nierozbyrzgowo-checkbox, #systemy-checkbox, #sloma-gleba-checkbox, #integrowana-checkbox, #biologiczna-checkbox, #nawozenie-checkbox, #material-siewny-kwalifik-checkbox"
  );
  ekoschematy.forEach((checkbox) => (checkbox.disabled = false));
  ekoschematy.forEach((checkbox) => {
    let excludedIds = exclusionMap[checkbox.id] || [];
    excludedIds.forEach((excludedId) => {
      if (!excludedId) return;
      let excludedCheckbox = document.querySelector(`#${excludedId}`);
      if (checkbox.checked && excludedCheckbox) {
        excludedCheckbox.disabled = true;
      }
    });
  });

  const checkedEkoschematy = Array.from(ekoschematy).filter((cb) => cb.checked);
  if (checkedEkoschematy.length === 2) {
    ekoschematy.forEach((checkbox) => {
      if (!checkbox.checked) {
        checkbox.disabled = true;
      }
    });
  }

  // wymagane do odblokowania
  let needToMaterialSiewny = document.querySelectorAll(
    "#miedzyplony-checkbox, #nawozenie-podst-checkbox, #nawozenie-wapnow-checkbox, #struktura-checkbox, #obornik-12-checkbox, #naturalne-nierozbyrzgowo-checkbox, #systemy-checkbox, #sloma-gleba-checkbox"
  );
  const anyChecked = Array.from(needToMaterialSiewny).some(
    (checkbox) => checkbox.checked
  );

  //odblokowanie
  const materialSiewnyCheckbox = document.querySelector(
    "#material-siewny-kwalifik-checkbox"
  );
  const integrowanaCheckbox = document.querySelector("#integrowana-checkbox");
  const biologicznaCheckbox = document.querySelector("#biologiczna-checkbox");
  if (!integrowanaCheckbox.checked && checkedEkoschematy.length < 2) {
    materialSiewnyCheckbox.disabled = !anyChecked;
  }

  if (materialSiewnyCheckbox.disabled) {
    materialSiewnyCheckbox.checked = false;
    if (biologicznaCheckbox.checked) {
      biologicznaCheckbox.checked = true;
    } else {
      if (checkedEkoschematy.length !== 2) {
        integrowanaCheckbox.disabled = false;
      }
    }
    document.dispatchEvent(new Event("recalculate"));
  }

  const deMinimisCheckbox = document.querySelector("#de-minimis-checkbox");
  if (deMinimisCheckbox.checked) {
    materialSiewnyCheckbox.checked = false;
    materialSiewnyCheckbox.disabled = true;
    document.dispatchEvent(new Event("recalculate"));
  }
});

document.querySelector("#reset").addEventListener("click", function () {
  document.querySelector("#przychody-z-plonu").innerHTML = "";
  document.querySelector("#doplaty").innerHTML = "";
  document.querySelector("#ekoschematy").innerHTML = "";
  document.querySelector("#badanie-gleby").innerHTML = "";
  document.querySelector("#wapno").innerHTML = "";
  document.querySelector("#miedzyplon").innerHTML = "";
  document.querySelector("#nawozy-naturlane").innerHTML = "";
  document.querySelector("#zabiegi-jesienne").innerHTML = "";
  document.querySelector("#glifosat").innerHTML = "";
  document.querySelector("#nawozenie-mineralne").innerHTML = "";
  document.querySelector("#nawozenie-dolistne").innerHTML = "";
  document.querySelector("#nawozenie-mineralne-zabieg").innerHTML = "";
  document.querySelector("#adiuwant-zabieg").innerHTML = "";
  document.querySelector("#biopreparat-zabieg").innerHTML = "";
  document.querySelector("#adiuwant").innerHTML = "";
  document.querySelector("#biopreparat").innerHTML = "";
  document.querySelector("#zbior").innerHTML = "";
  mainContentLoad();
});

function calculateSum() {
  let przychodElements = [
    "#przychody-z-plonu-result",
    "#doplaty-result",
    "#ekoschematy-result",
  ];

  let przychod = przychodElements.reduce((sum, selector) => {
    let el = document.querySelector(selector);
    if (!el) return sum;
    let value =
      parseFloat(
        el.textContent.replace("zł/ha", "").replace(",", ".").replace(/\s/g, "")
      ) || 0;
    return sum + value;
  }, 0);

  let kosztyElements = [
    "#badanie-gleby-result",
    "#wapno-result",
    "#miedzyplon-result",
    "#nawozy-naturlane-result",
    "#zabiegi-jesienne-result",
    "#glifosat-result",
    "#material-siewny-result",
    "#zabiegi-wiosenne-result",
    "#nawozenie-mineralne-result",
    "#nawozenie-mineralne-zabieg-result",
    "#nawozenie-dolistne-result",
    "#adiuwant-result",
    "#adiuwant-zabieg-result",
    "#biopreparat-result",
    "#biopreparat-zabieg-result",
    "#zbior-result",
  ];

  let koszt = kosztyElements.reduce((sum, selector) => {
    let el = document.querySelector(selector);
    if (!el) return sum;

    let value =
      parseFloat(
        el.textContent.replace("zł/ha", "").replace(",", ".").replace(/\s/g, "")
      ) || 0;

    let checkbox = document.querySelector(
      selector.replace("result", "checkbox")
    );

    if (!checkbox || checkbox.checked) {
      return sum + value;
    } else {
      return sum;
    }
  }, 0);

  if (!isNaN(przychod) && przychod !== 0 && przychod !== Infinity) {
    document.querySelector("#suma-przychodow").textContent =
      przychod.toLocaleString("pl-PL", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) + " zł/ha";
  } else {
    document.querySelector("#suma-przychodow").textContent = "podaj wartości";
  }

  if (!isNaN(koszt) && koszt !== 0 && koszt !== Infinity) {
    document.querySelector("#suma-kosztow").textContent =
      koszt.toLocaleString("pl-PL", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) + " zł/ha";
  } else {
    document.querySelector("#suma-kosztow").textContent = "podaj wartości";
  }

  let nadwyzka = przychod - koszt;
  if (!isNaN(nadwyzka) && nadwyzka !== 0 && nadwyzka !== Infinity) {
    document.querySelector("#nadwyzka").textContent =
      nadwyzka.toLocaleString("pl-PL", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) + " zł/ha";
  } else {
    document.querySelector("#nadwyzka").textContent = "podaj wartości";
  }
}

document.addEventListener("click", calculateSum);
document.addEventListener("input", calculateSum);
document.addEventListener("change", calculateSum);
mainContentLoad();
