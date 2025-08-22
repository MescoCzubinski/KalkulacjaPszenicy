function mainContentLoad() {
  new CalculatorBlock(
    "#przychody-z-plonu",
    "przychody z plonu",
    [
      {
        id: "zakladany-plon",
        name: "Zakładany plon:",
        placeholder: "",
        unit: "t/ha",
      },
      { id: "cena-skupu", name: "Cena skupu:", placeholder: "", unit: "zł/t" },
    ],
    "Wartość plonu:",
    "zł/ha",
    "",
    "no-check",
    (a, b) => a * b
  );
  new CalculatorBlock(
    "#doplaty",
    "dopłaty*",
    [
      {
        id: "podst-wsp-doch",
        name: "Podstawowe wsparcie dochodów:",
        placeholder: "483.2",
        unit: "zł/ha",
      },
      {
        id: "redystr",
        name: "Płatność redystrybucyjna:",
        placeholder: "168.79",
        unit: "zł/ha",
      },
      {
        id: "stracz",
        name: "Płatność do strącz. na nasiona:",
        placeholder: "794.08",
        unit: "zł/ha",
      },
    ],
    "Razem dopłaty:",
    "zł/ha",
    "*domyślne wartości za rok 2024, wykasuj i wpisz aktualne. Kliknij + aby uwzględnić w kalkulacji",
    "all-check",
    (a, b, c) => a + b + c
  );
  new CalculatorBlock(
    "#ekoschematy",
    "ekoschematy*",
    [
      {
        id: "miedzyplony",
        name: "Międzyplony lub wsiewki:",
        placeholder: "435.10",
        unit: "zł/ha",
      },
      {
        id: "nawozenie-podst",
        name: "Plan nawożenia podst.:",
        placeholder: "87.02",
        unit: "zł/ha",
      },
      {
        id: "nawozenie-wapnow",
        name: "Plan nawożenia z wapnow.:",
        placeholder: "261.06",
        unit: "zł/ha",
      },
      {
        id: "struktura",
        name: "Zróżnicowana struktura upraw:",
        placeholder: "225.01",
        unit: "zł/ha",
      },
      {
        id: "systemy",
        name: "Zróżnicowana struktura upraw:",
        placeholder: "251.94",
        unit: "zł/ha",
      },
      {
        id: "sloma-gleba",
        name: "Wymieszanie słomy z glebą:",
        placeholder: "134.60",
        unit: "zł/ha",
      },
      {
        id: "integrowana",
        name: "Integrowana Produkcja Roślin:",
        placeholder: "818.92",
        unit: "zł/ha",
      },
      {
        id: "biologiczna",
        name: "Upr. biologiczna - ochrona:",
        placeholder: "300.06",
        unit: "zł/ha",
      },
      {
        id: "nawozenie",
        name: "Upr. biologiczna - nawożenie:",
        placeholder: "75.01",
        unit: "zł/ha",
      },
      {
        id: "kwalifik",
        name: "Kwalifik. mat. siewny:",
        placeholder: "",
        unit: "zł/ha",
      },
    ],
    "Razem ekoschematy:",
    "zł/ha",
    "*domyślne wartości za rok 2024, wykasuj i wpisz aktualne. Kliknij + aby uwzględnić w kalkulacji",
    "all-check",
    (a, b, c, d, e, f, g, h, i, j) => a + b + c + d + e + f + g + h + i + j
  );
  new CalculatorBlock(
    "#badanie-gleby",
    "badanie gleby",
    [
      {
        id: "cena-badania",
        name: "Cena badania:",
        placeholder: "koszt 1 próbki",
        unit: "zł/próbkę",
      },
      {
        id: "pow-badania",
        name: "Powierzch. badania:",
        placeholder: "pow. dla 1 próbki",
        unit: "ha",
      },
      {
        id: "czestosc",
        name: "Częstość:",
        placeholder: "co ile lat badanie",
        unit: "lat",
      },
    ],
    "Koszt badania:",
    "zł/ha/rok",
    "",
    "no-check",
    (a, b, c) => a / b / c
  );
  new CalculatorBlock(
    "#wapno",
    "wapno",
    [
      {
        id: "cena-wapna",
        name: "Cena wapna:",
        placeholder: "koszt 1 t wapna",
        unit: "zł/ha",
      },
      {
        id: "dawka-ha-wapna",
        name: "Dawka na ha:",
        placeholder: "dawka na 1 ha",
        unit: "zł/ha",
      },
      {
        id: "koszt-rozsiewu",
        name: "Koszt rozsiewu:",
        placeholder: "koszt rozsiewu na 1 ha",
        unit: "zł/ha",
      },
      {
        id: "koszt-zaladunku-wapno",
        name: "Koszt załadunku:",
        placeholder: "koszt załadunku 1 t",
        unit: "zł/t",
      },
      {
        id: "czestotliwosc-wapna",
        name: "Częstotliwość:",
        placeholder: "co ile lat",
        unit: "lat",
      },
    ],
    "Koszt wapnowania:",
    "zł/ha",
    "",
    "one-check",
    (a, b, c, d, e) => (a * b + c + d * b) / e
  );
  new CalculatorBlock(
    "#miedzyplon",
    "międzyplon",
    [
      {
        id: "cena-nasion",
        name: "Cena nasion:",
        placeholder: "za 1 kg nas. międzypl.",
        unit: "zł/kg",
      },
      {
        id: "dawka-ha-miedzyplon",
        name: "Dawka nasion na ha:",
        placeholder: "dawka nasion",
        unit: "kg/ha",
      },
      {
        id: "koszt-siewu",
        name: "Koszt siewu:",
        placeholder: "koszt siewnika na 1 ha",
        unit: "zł/ha",
      },
      {
        id: "czestotliwosc-miedzyplonu",
        name: "Częstotliwość:",
        placeholder: "co ile lat",
        unit: "lat",
      },
    ],
    "Koszt międzyplonu:",
    "zł/ha",
    "",
    "one-check",
    (a, b, c, d) => (a * b + c) / d
  );
  new CalculatorBlock(
    "#nawozy-naturlane",
    "nawozy naturalne",
    [
      {
        id: "cena-nawozu",
        name: "Cena nawozu:",
        placeholder: "cena 1 t naw. natur.",
        unit: "zł/t",
      },
      {
        id: "dawka-ha-nawozu",
        name: "Dawka na ha:",
        placeholder: "dawka naw. na 1 ha",
        unit: "t, m³/ha",
      },
      {
        id: "koszt-stosowania",
        name: "Koszt stosowania:",
        placeholder: "koszt rozrzuc./rozl.",
        unit: "zł/ha",
      },
      {
        id: "koszt-zaladunku",
        name: "Koszt załadunku:",
        placeholder: "koszt załad./pomp.",
        unit: "zł/t, m³",
      },
      {
        id: "czestotliowsc-nawozu",
        name: "Częstotliwość:",
        placeholder: "co ile lat",
        unit: "lat",
      },
    ],
    "Koszt naw. natur.:",
    "zł/ha",
    "",
    "one-check",
    (a, b, c, d, e) => (a * b + c + d * b) / e
  );
  new CalculatorBlock(
    "#zabiegi-jesienne",
    "uprawa jesienna",
    [
      {
        id: "uprawa-po-przedplonie",
        name: "Uprawa po przedplonie:",
        placeholder: "koszt upr. ściern.",
        unit: "zł/ha",
      },
      {
        id: "druga-oprawa",
        name: "Druga uprawa samosiewów:",
        placeholder: "koszt uprawy",
        unit: "zł/ha",
      },
      {
        id: "siew-miedzyplonu",
        name: "Koszt siewu międzyplonu:",
        placeholder: "koszt siewu",
        unit: "zł/ha",
      },
      {
        id: "uprawa-gleboka",
        name: "Uprawa głęboka:",
        placeholder: "koszt upr. głęb.",
        unit: "zł/ha",
      },
      {
        id: "mulczowanie",
        name: "Mulczowanie międzyplonu:",
        placeholder: "koszt mulczow.",
        unit: "zł/ha",
      },
      {
        id: "koszt-siewu-jesien",
        name: "Koszt siewu zboża:",
        placeholder: "koszt siewu",
        unit: "zł/ha",
      },
    ],
    "Koszt uprawy jesiennej",
    "zł/ha",
    "",
    "all-check",
    (a, b, c, d, e, f) => a + b + c + d + e + f
  );
  new CalculatorBlock(
    "#glifosat",
    "glifosat",
    [
      {
        id: "herbicyd-glifosan",
        name: "Herbicyd z glifosatem:",
        placeholder: "cena herb. z glif.",
        unit: "zł/l",
      },
      {
        id: "dawka-herbicydu",
        name: "Dawka herbicydu na ha:",
        placeholder: "dawka herb. z glif.",
        unit: "l/ha",
      },
      {
        id: "adiuwant-glifosan",
        name: "Adiuwant do glifosatu:",
        placeholder: "cena adiuwanta",
        unit: "l, kg/ha",
      },
      {
        id: "dawka-adiuwanta",
        name: "Dawka adiuwanta na ha:",
        placeholder: "dawka adiuwanta",
        unit: "l, kg/ha",
      },
    ],
    "Koszt glifosatu",
    "zł/ha",
    "",
    "one-check",
    (a, b, c, d) => a * b + c * d
  );
  new CalculatorBlock(
    "#material-siewny",
    "materiał siewny",
    [
      {
        id: "cena-nasion-material",
        name: "Cena nasion:",
        placeholder: "za 1 kg lub js.",
        unit: "zł/kg, js.",
      },
      {
        id: "dawka-nasion-na-ha",
        name: "Dawka nasion na ha:",
        placeholder: "dawka kg lub js. na ha",
        unit: "kg, js./ha",
      },
      {
        id: "Cena zaprawy nasiennej",
        name: "Cena zaprawy nasiennej:",
        placeholder: "cena zaprawy",
        unit: "zł/l, kg",
      },
      {
        id: "dawka-zaprawy",
        name: "Dawka zaprawy:",
        placeholder: "dawka zaprawy",
        unit: "l, kg/100 kg",
      },
    ],
    "Koszt nasion",
    "zł/ha",
    "",
    "one-check",
    (a, b, e, f) => a * b + (e * f * b) / 100
  );
  new CalculatorBlock(
    "#zbior",
    "zbiór",
    [
      {
        id: "cena-koszenia",
        name: "Cena koszenia:",
        placeholder: "koszt kombajnu na 1 ha",
        unit: "zł/ha",
      },
      {
        id: "koszt-kilometrowki",
        name: "Koszt kilometrówki:",
        placeholder: "stawka za km wewn. gosp.",
        unit: "zł/km",
      },
      {
        id: "dystans-transp",
        name: "Dystans transp. wewn.:",
        placeholder: "szacunkowy dystans",
        unit: "km",
      },
      {
        id: "cena-suszenia",
        name: "Cena suszenia:",
        placeholder: "koszt susz. tono-proc.",
        unit: "zł/t/%",
      },
      {
        id: "wilgt-zbior",
        name: "Wilgotność podczas zbioru:",
        placeholder: "",
        unit: "%",
      },
      {
        id: "wilgt-doc",
        name: "Wilgotność docelowa:",
        placeholder: "",
        unit: "%",
      },
    ],
    "Koszt zbioru",
    "zł/ha",
    "",
    "no-check",
    (a, b, c, d, e, f) => a + b * c + d * (e - f)
  );
  new CalculatorBlock(
    "#nawozenie-mineralne-zabieg",
    "zabieg nawożenia",
    [
      {
        id: "koszt-nawozenia",
        name: "Koszt zabiegu nawożenia:",
        placeholder: "koszt nawożenia na 1 ha",
        unit: "zł/ha",
      },
      {
        id: "czestotliwosc-nawozenia",
        name: "Częstotliwość zabiegu nawożenia:",
        placeholder: "ile razy na 1 ha",
        unit: "razy/ha",
      },
    ],
    "Koszt nawożenia",
    "zł/ha",
    "",
    "one-check",
    (a, b) => a * b
  );
  new CalculatorBlock(
    "#adiuwant-zabieg",
    "Zabieg opryskiwanie",
    [
      {
        id: "koszt-opryskiwania-ad",
        name: "Koszt zabiegu opryskiwania:",
        placeholder: "koszt oprysk. na 1 ha",
        unit: "zł/ha",
      },
      {
        id: "czestotliwosc-opryskiwania-ad",
        name: "Częstotliwość zabiegu opryskiwania:",
        placeholder: "ile razy na 1 ha",
        unit: "razy/ha",
      },
    ],
    "Koszt opryskiwania",
    "zł/ha",
    "",
    "one-check",
    (a, b) => a * b
  );
  new CalculatorBlock(
    "#biopreparat-zabieg",
    "Opryskiwanie biopreparatem",
    [
      {
        id: "koszt-opryskiwania-bio",
        name: "Koszt zabiegu opryskiwania:",
        placeholder: "koszt stosowania na 1 ha",
        unit: "zł/ha",
      },
      {
        id: "czestotliwosc-opryskiwania-bio",
        name: "Częstotliwość zabiegu opryskiwania:",
        placeholder: "ile razy na 1 ha",
        unit: "razy/ha",
      },
    ],
    "Koszt opryskiwania",
    "zł/ha",
    "",
    "one-check",
    (a, b) => a * b
  );
  document.querySelector("#podst-wsp-doch").value = "483.2";
  document.querySelector("#redystr").value = "168.79";
  document.querySelector("#stracz").value = "794.08";
  document.querySelector("#miedzyplony").value = "435.1";
  document.querySelector("#nawozenie-podst").value = "87.02";
  document.querySelector("#nawozenie-wapnow").value = "261.06";
  document.querySelector("#struktura").value = "225.01";
  document.querySelector("#systemy").value = "251.94";
  document.querySelector("#sloma-gleba").value = "134.6";
  document.querySelector("#integrowana").value = "818.92";
  document.querySelector("#biologiczna").value = "300.06";
  document.querySelector("#nawozenie").value = "75.01";

  new dynamicCalculatorBlock(
    "#nawozenie-mineralne",
    "Nawozy mineralne",
    [
      {
        id: "koszt-jednostkowy-nm",
        name: "Koszt jednostkowy:",
        placeholder: "koszt za 1 t",
        unit: "zł/t",
      },
      {
        id: "dawka-hektar-nm",
        name: "Dawka na hektar:",
        placeholder: "ile na 1 ha",
        unit: "kg/ha",
      },
    ],
    "nazwa nawozu",
    "Koszt:",
    "zł",
    (a, b) => a * b,
    1000
  );
  new dynamicCalculatorBlock(
    "#nawozenie-dolistne",
    "Nawozy dolistne",
    [
      {
        id: "koszt-jednostkowy-dl",
        name: "Koszt jednostkowy:",
        placeholder: "koszt za 1 l, kg:",
        unit: "zł/l, kg",
      },
      {
        id: "dawka-hektar-dl",
        name: "Dawka na hektar:",
        placeholder: "ile na 1 ha",
        unit: "l, kg/ha",
      },
    ],
    "nazwa nawozu",
    "Koszt:",
    "zł",
    (a, b) => a * b,
    1
  );
  new dynamicCalculatorBlock(
    "#adiuwant",
    "ŚOR i adiuwanty",
    [
      {
        id: "koszt-jednostkowy-ad",
        name: "Koszt jednostkowy:",
        placeholder: "koszt za l, kg:",
        unit: "zł/l, kg",
      },
      {
        id: "dawka-hektar-ad",
        name: "Dawka na hektar:",
        placeholder: "ile na 1 ha",
        unit: "l, kg/ha",
      },
    ],
    "nazwa środka",
    "Koszt:",
    "zł",
    (a, b) => a * b,
    1
  );
  new dynamicCalculatorBlock(
    "#biopreparat",
    "biopreparat",
    [
      {
        id: "koszt-jednostkowy-bio",
        name: "Koszt jednostkowy:",
        placeholder: "koszt za 1 l, kg:",
        unit: "zł/l, kg",
      },
      {
        id: "dawka-hektar-bio",
        name: "Dawka na hektar:",
        placeholder: "ile na 1 ha",
        unit: "l, kg/ha",
      },
    ],
    "nazwa biopreparatu",
    "Koszt:",
    "zł",
    (a, b) => a * b,
    1
  );
}
