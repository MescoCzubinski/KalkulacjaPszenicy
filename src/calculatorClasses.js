class CalculatorBlock {
  constructor(
    containerId,
    containerName,
    inputs,
    resultText,
    resultUnit,
    backgroundInfo,
    checkMode,
    calculation
  ) {
    this.container = document.querySelector(containerId);
    this.containerId = containerId.toLowerCase();
    this.containerName = containerName;
    this.inputs = inputs;
    this.resultText = resultText;
    this.resultUnit = resultUnit;
    this.backgroundInfo = backgroundInfo;
    this.checkMode = checkMode;
    this.calculation = calculation;
    this.inputElements = [];

    this.render();
  }

  render() {
    let section = document.createElement("div");
    section.classList.add("w-80", "p-3", "flex", "flex-col", "justify-start");

    let inputsContainer = document.createElement("div");

    this.inputs.forEach((inputData) => {
      let inputWrapper = document.createElement("div");
      inputWrapper.classList.add("mb-5");

      let inputContainer = document.createElement("div");
      inputContainer.classList.add("flex");

      let inputName = document.createElement("div");
      inputName.classList.add("text-xl", "pb-2", "pl-2");
      inputName.textContent = inputData.name;

      if (this.checkMode === "all-check") {
        let checkboxInput = document.createElement("input");
        checkboxInput.type = "checkbox";
        checkboxInput.classList.add("mr-4");
        checkboxInput.id = `${inputData.id
          .toLowerCase()
          .replaceAll("#", "")
          .replaceAll(/\s+/g, "-")}-checkbox`;

        inputContainer.appendChild(checkboxInput);
      }

      let inputElement = document.createElement("input");
      inputElement.type = "text";
      inputElement.inputMode = "numeric";
      inputElement.pattern = "[0-9]*";
      inputElement.placeholder = inputData.placeholder;
      inputElement.id = inputData.id.toLowerCase();
      inputElement.classList.add(
        "w-24",
        "h-12",
        "pl-2",
        "text-xl",
        "border-2",
        "border-bg-info",
        "rounded-3xl",
        "flex-1",
        "hover:bg-bg-info/25"
      );

      let unitElement = document.createElement("div");
      unitElement.classList.add("ml-2", "text-xl", "flex", "items-center");
      unitElement.textContent = inputData.unit;

      inputContainer.appendChild(inputElement);
      inputContainer.appendChild(unitElement);

      inputWrapper.appendChild(inputName);
      inputWrapper.appendChild(inputContainer);
      inputsContainer.appendChild(inputWrapper);

      this.inputElements.push(inputElement);
    });

    if (this.backgroundInfo !== "") {
      let backgroundInfoContainer = document.createElement("div");
      backgroundInfoContainer.classList.add(
        "text-xl",
        "text-bg-info",
        "ml-2",
        "mb-5"
      );
      backgroundInfoContainer.textContent = this.backgroundInfo;
      inputsContainer.appendChild(backgroundInfoContainer);
    }

    section.appendChild(inputsContainer);

    let resultContainer = document.createElement("div");
    resultContainer.classList.add("flex", "pl-2", "pr-2", "justify-between");

    let resultText = document.createElement("div");
    resultText.classList.add("text-xl", "text-center");
    resultText.textContent = this.resultText;

    let resultValue = document.createElement("div");
    resultValue.classList.add("text-xl", "text-top-agrar-green", "text-center");
    resultValue.textContent = "podaj wartości";
    resultValue.id = `${this.containerId
      .replaceAll("#", "")
      .replaceAll(/\s+/g, "-")}-result`;

    resultContainer.appendChild(resultText);
    resultContainer.appendChild(resultValue);
    section.appendChild(resultContainer);

    if (this.checkMode === "one-check") {
      let checkboxContainer = document.createElement("div");
      checkboxContainer.classList.add(
        "flex",
        "flex-wrap",
        "h-fit",
        "items-center",
        "justify-between",
        "ml-2",
        "mt-4"
      );

      let checkboxText = document.createElement("div");
      checkboxText.classList.add("text-xl", "text-left");
      checkboxText.textContent = "Zatwierdź w kalkulacji:";

      let checkboxInput = document.createElement("input");
      checkboxInput.type = "checkbox";
      checkboxInput.id = `${this.containerId
        .replaceAll("#", "")
        .replaceAll(/\s+/g, "-")}-checkbox`;

      checkboxContainer.appendChild(checkboxText);
      checkboxContainer.appendChild(checkboxInput);
      section.appendChild(checkboxContainer);
    }

    let containerHeader = document.createElement("div");
    containerHeader.classList.add(
      "flex",
      "w-full",
      "sm:pl-14",
      "sm:pr-14",
      "justify-between",
      "p-3"
    );

    let headerName = document.createElement("div");
    headerName.classList.add("text-2xl", "font-bold", "pt-1");
    headerName.textContent = this.containerName.toUpperCase();

    let headerButton = document.createElement("button");
    headerButton.classList.add(
      "show-hide-button",
      "border-bg-info",
      "border-2",
      "rounded-2xl",
      "p-1",
      "text-lg"
    );
    headerButton.textContent = "Rozwiń";
    containerHeader.appendChild(headerName);
    containerHeader.appendChild(headerButton);

    let containerContent = document.createElement("div");
    containerContent.classList.add(
      "show-hide-content",
      "flex",
      "flex-wrap",
      "w-full",
      "justify-center"
    );
    containerContent.appendChild(section);

    this.container.appendChild(containerHeader);
    this.container.appendChild(containerContent);

    this.inputElements.forEach((input) => {
      input.addEventListener("input", () => {
        this.calculateResult();
      });

      let inputCheckboxElement = document.querySelector(
        "#" + input.id + "-checkbox"
      );
      if (inputCheckboxElement) {
        inputCheckboxElement.addEventListener("change", () => {
          this.calculateResult();
        });
      }
    });

    this.calculateResult = () => {
      let values = this.inputElements.map((input) => {
        let inputCheckboxElement = document.querySelector(
          "#" + input.id + "-checkbox"
        );

        if (inputCheckboxElement && inputCheckboxElement.checked) {
          return Number(input.value) || 0;
        } else if (!inputCheckboxElement) {
          return Number(input.value) || 0;
        }
        return 0;
      });

      let result = this.calculation(...values);
      if (result !== 0 && result !== Infinity && !isNaN(result)) {
        resultValue.textContent =
          result.toLocaleString("pl-PL", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }) + ` ${this.resultUnit}`;
      } else {
        resultValue.textContent = "podaj wartości";
      }
      recalculateSectionHeight();
    };
  }
}
class dynamicCalculatorBlock {
  constructor(
    containerId,
    containerName,
    inputs,
    sectionName,
    resultText,
    resultUnit,
    calculation,
    divider
  ) {
    this.container = document.querySelector(containerId);
    this.containerId = containerId.toLowerCase();
    this.containerName = containerName;
    this.inputs = inputs;
    this.sectionName = sectionName;
    this.resultText = resultText;
    this.resultUnit = resultUnit;
    this.calculation = calculation;
    this.divider = divider;
    this.sections = [];
    this.sectionsId = 0;
    this.inputElements = [];
    this.mainResult = 0;

    this.sectionRender();
    this.render();
  }
  sectionRender() {
    let section = document.createElement("div");
    section.classList.add("w-80", "p-3", "flex", "flex-col", "justify-start");
    section.dataset.sectionId = this.sectionsId;

    let inputsContainer = document.createElement("div");

    let sectionHeader = document.createElement("div");
    sectionHeader.classList.add("flex");
    let inputName = document.createElement("input");
    inputName.type = "text";
    inputName.id = this.containerName + "-" + this.sectionsId;
    inputName.placeholder = this.sectionName;
    inputName.classList.add(
      "w-full",
      "h-12",
      "pl-2",
      "mb-5",
      "text-xl",
      "border-2",
      "border-bg-info",
      "rounded-3xl",
      "hover:bg-bg-info/25",
      "textInput"
    );
    let buttonDelete = document.createElement("input");
    buttonDelete.type = "button";
    buttonDelete.value = "usuń";
    buttonDelete.classList.add(
      "w-20",
      "h-12",
      "mb-5",
      "ml-2",
      "text-xl",
      "text-bg-info",
      "border-2",
      "border-bg-info",
      "rounded-3xl",
      "hover:bg-bg-info/25",
      "remove-button"
    );
    sectionHeader.appendChild(inputName);
    sectionHeader.appendChild(buttonDelete);

    let sectionInputs = [];

    this.inputs.forEach((inputData) => {
      let inputWrapper = document.createElement("div");
      inputWrapper.classList.add("mb-5");

      let inputContainer = document.createElement("div");
      inputContainer.classList.add("flex");

      let inputLabel = document.createElement("div");
      inputLabel.classList.add("text-xl", "pb-2", "pl-2");
      inputLabel.textContent = inputData.name;

      let inputElement = document.createElement("input");
      inputElement.type = "text";
      inputElement.inputMode = "numeric";
      inputElement.pattern = "[0-9]*";
      inputElement.placeholder = inputData.placeholder;
      inputElement.id = inputData.id.toLowerCase() + "-" + this.sectionsId;
      inputElement.classList.add(
        "w-24",
        "h-12",
        "pl-2",
        "text-xl",
        "border-2",
        "border-bg-info",
        "rounded-3xl",
        "flex-1",
        "hover:bg-bg-info/25"
      );

      let unitElement = document.createElement("div");
      unitElement.classList.add("ml-2", "text-xl", "flex", "items-center");
      unitElement.textContent = inputData.unit;

      inputContainer.appendChild(inputElement);
      inputContainer.appendChild(unitElement);

      inputWrapper.appendChild(inputLabel);
      inputWrapper.appendChild(inputContainer);
      inputsContainer.appendChild(inputWrapper);

      sectionInputs.push(inputElement);
    });

    section.appendChild(sectionHeader);
    section.appendChild(inputsContainer);

    let resultContainer = document.createElement("div");
    resultContainer.classList.add("flex", "pl-2", "pr-2", "justify-between");

    let resultText = document.createElement("div");
    resultText.classList.add("text-xl", "text-center");
    resultText.textContent = this.resultText;

    let resultValue = document.createElement("div");
    resultValue.classList.add("text-xl", "text-top-agrar-green", "text-center");
    resultValue.textContent = "podaj wartości";
    resultValue.id = `${
      this.containerId.replaceAll("#", "").replaceAll(/\s+/g, "-") +
      "-" +
      this.sectionsId
    }-subResult`;

    resultContainer.appendChild(resultText);
    resultContainer.appendChild(resultValue);
    section.appendChild(resultContainer);

    this.sections.push(section);

    const calculateResult = () => {
      let values = sectionInputs.map((input) => Number(input.value) || 0);

      let result = (values[0] * values[1]) / this.divider;
      if (result !== 0 && result !== Infinity && !isNaN(result)) {
        resultValue.textContent =
          result.toLocaleString("pl-PL", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }) + ` ${this.resultUnit}`;
      } else {
        resultValue.textContent = "podaj wartości";
      }

      this.calculateMainResult();
    };

    sectionInputs.forEach((input) => {
      input.addEventListener("input", calculateResult);
    });

    section.querySelector(".remove-button").addEventListener("click", () => {
      if (this.sections.length > 1) {
        section.remove();
        this.sections = this.sections.filter((s) => s !== section);
        this.calculateMainResult();
        // recalculateSectionHeight();
      }
    });

    this.sectionsId += 1;
  }

  render() {
    let containerHeader = document.createElement("div");
    containerHeader.classList.add(
      "flex",
      "w-full",
      "sm:pl-14",
      "sm:pr-14",
      "justify-between",
      "p-3"
    );

    let headerName = document.createElement("div");
    headerName.classList.add("text-2xl", "font-bold", "pt-1");
    headerName.textContent = this.containerName.toUpperCase();

    let headerButton = document.createElement("button");
    headerButton.classList.add(
      "show-hide-button",
      "border-bg-info",
      "border-2",
      "rounded-2xl",
      "p-1",
      "text-lg"
    );
    headerButton.textContent = "Rozwiń";
    containerHeader.appendChild(headerName);
    containerHeader.appendChild(headerButton);

    let containerContent = document.createElement("div");
    containerContent.classList.add("show-hide-content");

    let containerSections = document.createElement("div");
    containerSections.classList.add(
      "flex",
      "flex-wrap",
      "w-full",
      "justify-center"
    );
    this.sections.forEach((section) => {
      containerSections.appendChild(section);
    });
    containerContent.appendChild(containerSections);

    let buttonAdd = document.createElement("input");
    buttonAdd.type = "button";
    buttonAdd.value = "dodaj kolejny";
    buttonAdd.classList.add(
      "flex",
      "justify-content",
      "w-48",
      "h-12",
      "mt-4",
      "ml-auto",
      "mr-auto",
      "text-xl",
      "text-bg-info",
      "border-2",
      "border-bg-info",
      "rounded-3xl",
      "hover:bg-bg-info/25",
      "add-button"
    );
    containerContent.appendChild(buttonAdd);

    let sectionResult = document.createElement("div");
    sectionResult.classList.add(
      "flex",
      "w-full",
      "justify-center",
      "text-2xl",
      "gap-2",
      "mt-4",
      "mb-4"
    );
    let sectionRenderText = document.createElement("div");
    sectionRenderText.textContent = this.resultText;
    let sectionRenderResult = document.createElement("div");
    sectionRenderResult.id = this.containerId.replace("#", "") + "-result";
    sectionRenderResult.classList.add("text-top-agrar-green");
    sectionRenderResult.textContent = "podaj wartości";
    sectionResult.appendChild(sectionRenderText);
    sectionResult.appendChild(sectionRenderResult);
    containerContent.appendChild(sectionResult);

    this.container.appendChild(containerHeader);
    this.container.appendChild(containerContent);

    this.container
      .querySelector(".add-button")
      .addEventListener("click", () => {
        this.sectionRender();
        let newSection = this.sections[this.sections.length - 1];
        this.container
          .querySelector(".show-hide-content > div")
          .appendChild(newSection);
        this.calculateMainResult();
        recalculateSectionHeight();
      });
  }

  calculateMainResult() {
    let total = 0;
    this.sections.forEach((section) => {
      let inputValues = this.inputs.map((inputData) => {
        let inputElement = section.querySelector(
          `#${inputData.id.toLowerCase()}-${section.dataset.sectionId}`
        );
        return inputElement ? Number(inputElement.value) || 0 : 0;
      });

      let subResult = this.calculation(...inputValues);
      if (!isNaN(subResult) && subResult !== Infinity) {
        total += subResult;
      }
    });

    total /= this.divider;
    let mainResultElement = document.getElementById(
      this.containerId.replace("#", "") + "-result"
    );
    if (total !== Infinity && !isNaN(total) && total !== 0) {
      mainResultElement.textContent =
        total.toLocaleString("pl-PL", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + ` ${this.resultUnit}`;
    } else {
      mainResultElement.textContent = "podaj wartości";
    }
  }
}
