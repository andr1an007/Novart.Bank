const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebarOverlay");
const menuButton = document.getElementById("mobileMenuToggle");
const pageTitle = document.getElementById("pageTitle");
const pageTitles = {
  English: {
    dashboard: "Dashboard",
    wallet: "Wallet",
    analytics: "Analytics",
    archive: "Archive",
    reporting: "Reporting",
    settings: "Settings"
  },

  Українська: {
    dashboard: "Панель керування",
    wallet: "Гаманець",
    analytics: "Аналітика",
    archive: "Архів",
    reporting: "Звіти",
    settings: "Налаштування"
  },
};

function updatePageTitle() {
  const activeButton = document.querySelector(".nav-item.active[data-page]");
  const page = activeButton?.dataset.page;
  const language = localStorage.getItem("siteLanguage") || "English";

  if (pageTitles[language]?.[page]) {
    pageTitle.textContent = pageTitles[language][page];
  }
}

function closeMobileMenu() {
  sidebar.classList.remove("is-open");
  overlay.classList.remove("is-visible");
}

menuButton.addEventListener("click", () => {
  sidebar.classList.add("is-open");
  overlay.classList.add("is-visible");
});

overlay.addEventListener("click", closeMobileMenu);

document.querySelectorAll(".nav-item[data-page]").forEach((button) => {
  button.addEventListener("click", () => {
    const pageId = button.dataset.page;
    const pageName = button.querySelector("span").textContent;

    document.querySelectorAll(".nav-item[data-page]").forEach((item) => {
      item.classList.remove("active");
    });

    document.querySelectorAll(".page").forEach((page) => {
      page.classList.remove("active");
    });

    button.classList.add("active");
    document.getElementById(pageId).classList.add("active");
    pageTitle.textContent = pageName;

    closeMobileMenu();
  });
});











(() => {
  const dateGreeting = document.getElementById("greetingText");
  const dateCurrent = document.getElementById("currentDate");
  const languageSelect = document.getElementById("preferredLanguage");

  if (!dateGreeting || !dateCurrent || !languageSelect) return;

  const languages = {
    "English": {
      locale: "en-GB",
      morning: "Good morning",
      afternoon: "Good afternoon",
      evening: "Good evening"
    },
    "Українська": {
      locale: "uk-UA",
      morning: "Доброго ранку",
      afternoon: "Добрий день",
      evening: "Добрий вечір"
    }
  };

  function refreshDateAndGreeting() {
    const selected = languageSelect.value;
    const language = languages[selected] || languages["English"];
    const now = new Date();
    const hour = now.getHours();

    let greeting = language.evening;

    if (hour < 12) {
      greeting = language.morning;
    } else if (hour < 18) {
      greeting = language.afternoon;
    }

    dateGreeting.textContent = `${greeting}, Andrian! 👋🏻`;

    const formattedDate = new Intl.DateTimeFormat(language.locale, {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric"
    }).format(now);

    dateCurrent.textContent =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  const savedLanguage = localStorage.getItem("siteLanguage") || "English";

  languageSelect.value = savedLanguage;

  languageSelect.addEventListener("change", () => {
    localStorage.setItem("siteLanguage", languageSelect.value);
    refreshDateAndGreeting();
  });

  refreshDateAndGreeting();
})();











function createStatistics(multiplier) {
  return {
    "1D": {
      labels: ["09:00", "12:00", "15:00", "18:00", "21:00"],
      values: [2100, 4400, 3100, 6200, 5300].map((value) =>
        Math.round(value * multiplier)
      ),
    },

    "1W": {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      values: [4200, 7000, 5100, 9800, 7400, 11200, 9300].map((value) =>
        Math.round(value * multiplier)
      ),
    },

    "1M": {
      labels: [
        "08/04", "09/04", "10/04", "11/04",
        "12/04", "13/04", "14/04", "15/04"
      ],
      values: [0, 11500, 5000, 21000, 10000, 34000, 7200, 20000].map(
        (value) => Math.round(value * multiplier)
      ),
    },

    "6M": {
      labels: ["Mar", "Apr", "May", "Jun", "Jul", "Aug"],
      values: [8400, 12500, 9100, 18200, 15100, 24900].map((value) =>
        Math.round(value * multiplier)
      ),
    },

    "1Y": {
      labels: ["Jan", "Mar", "May", "Jul", "Sep", "Nov"],
      values: [12000, 18000, 9600, 24000, 20500, 31000].map((value) =>
        Math.round(value * multiplier)
      ),
    },
  };
}













const cards = [
  {
    type: "VISA",
    number: "5782 4160 8526 3149",
    balance: "$14,528.00",
    balanceValue: 14528,
    currency: "US Dollar",
    currencyCode: "USD",
    monthNet: 1200,
    design: "card-purple",
    deactivated: false,
    pin: "1234",
    cvv: "482",
    expiry: "07/30",

    income: "$974.99",
    incomeChange: "7.85%",
    expense: "$425.30",
    expenseChange: "22.30%",
    savings: "$549.61",
    savingsChange: "9.50%",

    statistics: createStatistics(1),
  },
  {
    type: "Mastercard",
    number: "5218 9026 4410 7738",
    balance: "€8,340.50",
    balanceValue: 8340.5,
    currency: "Euro",
    currencyCode: "EUR",
    monthNet: 420,
    design: "card-blue",
    deactivated: false,
    pin: "5678",
    cvv: "917",
    expiry: "11/29",

    income: "€1,245.00",
    incomeChange: "12.40%",
    expense: "€560.80",
    expenseChange: "4.90%",
    savings: "€684.20",
    savingsChange: "15.10%",

    statistics: createStatistics(0.65),
  },
  {
    type: "VISA",
    number: "4459 7281 9602 1780",
    balance: "₴125,780.00",
    balanceValue: 125780,
    currency: "Ukrainian Hryvnia",
    currencyCode: "UAH",
    monthNet: 7600,
    design: "card-gold",
    deactivated: false,
    pin: "1111",
    cvv: "205",
    expiry: "04/31",

    income: "₴5,300.00",
    incomeChange: "9.40%",
    expense: "₴736.80",
    expenseChange: "6.85%",
    savings: "₴124.20",
    savingsChange: "18.14%",

    statistics: createStatistics(1.45),
  },
  {
    type: "Mastercard",
    number: "5401 0938 7762 2104",
    balance: "£2,940.00",
    balanceValue: 2940,
    currency: "Pound Sterling",
    currencyCode: "GBP",
    monthNet: -180,
    design: "card-dark",
    deactivated: false,
    pin: "9999",
    cvv: "786",
    expiry: "12/28",

    income: "£4,843.00",
    incomeChange: "7.40%",
    expense: "£621.80",
    expenseChange: "5.50%",
    savings: "£375.00",
    savingsChange: "19.99%",

    statistics: createStatistics(0.85),
  },
];




const currencyLabels = {
  English: {
    USD: "US Dollar",
    EUR: "Euro",
    UAH: "Ukrainian hryvnia",
    GBP: "Pound sterling"
  },

  Українська: {
    USD: "Долар США",
    EUR: "Євро",
    UAH: "Українська гривня",
    GBP: "Британський фунт"
  }
};


const cardCounterLabels = {
  English: "Cards",
  Українська: "Картки"
};


let currentCard = 0;
let isCardAnimating = false;

const widget = document.getElementById("walletWidget");
const bankCard = document.getElementById("bankCard");
const walletInfo = document.getElementById("walletInfo");

const cardType = document.getElementById("cardType");
const cardTypeBack = document.getElementById("cardTypeBack");
const cardNumber = document.getElementById("cardNumber");
const cardBalance = document.getElementById("cardBalance");
const cardCurrency = document.getElementById("cardCurrency");
const cardCounter = document.getElementById("cardCounter");
const cardCvv = document.getElementById("cardCvv");
const cardExpiry = document.getElementById("cardExpiry");

const deactivateCard = document.getElementById("deactivateCard");
const deactivateModal = document.getElementById("deactivateModal");

const pinModal = document.getElementById("pinModal");
const pinInput = document.getElementById("pinInput");
const pinError = document.getElementById("pinError");

const totalIncome = document.getElementById("totalIncome");
const totalExpense = document.getElementById("totalExpense");
const totalSavings = document.getElementById("totalSavings");

const incomeChange = document.getElementById("incomeChange");
const expenseChange = document.getElementById("expenseChange");
const savingsChange = document.getElementById("savingsChange");


function renderCard() {
  const card = cards[currentCard];

  totalIncome.textContent = card.income;
  totalExpense.textContent = card.expense;
  totalSavings.textContent = card.savings;

  incomeChange.innerHTML = `
  <i class="bi bi-arrow-up-right"></i> ${card.incomeChange}
`;

  expenseChange.innerHTML = `
  <i class="bi bi-arrow-down-left"></i> ${card.expenseChange}
`;

  savingsChange.innerHTML = `
  <i class="bi bi-arrow-up-right"></i> ${card.savingsChange}
`;

  cardType.textContent = card.type;
  cardTypeBack.textContent = card.type;
  cardNumber.textContent = card.number;
  cardBalance.textContent = card.balance;




  const selectedLanguage =
    localStorage.getItem("siteLanguage") || "English";

  cardCurrency.textContent =
    currencyLabels[selectedLanguage][card.currencyCode] || card.currency;







  cardCvv.textContent = card.cvv;
  cardExpiry.textContent = card.expiry;





  cardCounter.textContent =
    `${cardCounterLabels[selectedLanguage]} | ${currentCard + 1} ${selectedLanguage === "Українська" ? "з" : "out of"
    } ${cards.length}`;





  incomeChange.innerHTML = `<i class="bi bi-arrow-up-right"></i> ${card.incomeChange}`;
  expenseChange.innerHTML = `<i class="bi bi-arrow-down-left"></i> ${card.expenseChange}`;
  savingsChange.innerHTML = `<i class="bi bi-arrow-up-right"></i> ${card.savingsChange}`;



  bankCard.classList.remove(
    "card-purple",
    "card-blue",
    "card-gold",
    "card-dark",
    "is-flipped"
  );

  bankCard.classList.add(card.design);

  deactivateCard.checked = card.deactivated;
  widget.classList.toggle("is-deactivated", card.deactivated);

  renderStatistics();
}


function changeCard(direction) {
  if (isCardAnimating) return;

  isCardAnimating = true;

  bankCard.classList.add("card-leaving");
  walletInfo.classList.add("info-leaving");

  setTimeout(() => {
    currentCard = (currentCard + direction + cards.length) % cards.length;

    renderCard();

    bankCard.classList.remove("card-leaving");
    walletInfo.classList.remove("info-leaving");

    bankCard.classList.add("card-entering");
    walletInfo.classList.add("info-entering");

    setTimeout(() => {
      bankCard.classList.remove("card-entering");
      walletInfo.classList.remove("info-entering");
      isCardAnimating = false;
    }, 380);
  }, 220);
}

document.getElementById("previousCard").addEventListener("click", () => {
  changeCard(-1);
});

document.getElementById("nextCard").addEventListener("click", () => {
  changeCard(1);
});

bankCard.addEventListener("click", () => {
  const card = cards[currentCard];

  if (card.deactivated) return;

  if (bankCard.classList.contains("is-flipped")) {
    bankCard.classList.remove("is-flipped");
    return;
  }

  pinInput.value = "";
  pinError.textContent = "";
  pinModal.classList.add("show");

  setTimeout(() => pinInput.focus(), 200);
});

function closePinModal() {
  pinModal.classList.remove("show");
  pinInput.value = "";
  pinError.textContent = "";
}


function getPinErrorMessage() {
  const language = localStorage.getItem("siteLanguage") || "English";

  const messages = {
    English: "Incorrect PIN. Please try again.",
    en: "Incorrect PIN. Please try again.",

    Українська: "Неправильний PIN-код. Спробуйте ще раз.",
    uk: "Неправильний PIN-код. Спробуйте ще раз."
  };

  return messages[language] || messages.English;
}



function checkPin() {
  if (pinInput.value === cards[currentCard].pin) {
    closePinModal();
    bankCard.classList.add("is-flipped");
  } else {
    pinError.textContent = getPinErrorMessage();;
    pinInput.value = "";
    pinInput.focus();
  }
}

document.getElementById("confirmPin").addEventListener("click", checkPin);

document.getElementById("cancelPin").addEventListener("click", closePinModal);

pinInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") checkPin();
});

pinModal.addEventListener("click", (event) => {
  if (event.target === pinModal) closePinModal();
});

deactivateCard.addEventListener("change", () => {
  if (deactivateCard.checked && !cards[currentCard].deactivated) {
    deactivateCard.checked = false;
    deactivateModal.classList.add("show");
  } else {
    cards[currentCard].deactivated = false;
    renderCard();
  }
});

document.getElementById("cancelDeactivate").addEventListener("click", () => {
  deactivateModal.classList.remove("show");
});

document.getElementById("confirmDeactivate").addEventListener("click", () => {
  cards[currentCard].deactivated = true;
  deactivateModal.classList.remove("show");
  renderCard();
});

deactivateModal.addEventListener("click", (event) => {
  if (event.target === deactivateModal) {
    deactivateModal.classList.remove("show");
  }
});

















let selectedPeriod = "1M";

const statisticsChart = document.getElementById("statisticsChart");
const periodTabs = document.getElementById("periodTabs");

function formatChartMoney(value) {
  if (value >= 1000) {
    return `$${Math.round(value / 1000)}K`;
  }

  return `$${value}`;
}








const statisticsLanguageData = {
  English: {
    income: "Money income",
    state: "Current state",
    labels: {
      "1D": ["09:00", "12:00", "15:00", "18:00", "21:00"],
      "1W": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      "1M": ["08/04", "09/04", "10/04", "11/04", "12/04", "13/04", "14/04", "15/04"],
      "6M": ["Mar", "Apr", "May", "Jun", "Jul", "Aug"],
      "1Y": ["Jan", "Mar", "May", "Jul", "Sep", "Nov"]
    }
  },

  Українська: {
    income: "Надходження",
    state: "Поточний стан",
    labels: {
      "1D": ["09:00", "12:00", "15:00", "18:00", "21:00"],
      "1W": ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"],
      "1M": ["08.04", "09.04", "10.04", "11.04", "12.04", "13.04", "14.04", "15.04"],
      "6M": ["Бер", "Кві", "Тра", "Чер", "Лип", "Сер"],
      "1Y": ["Січ", "Бер", "Тра", "Лип", "Вер", "Лис"]
    }
  }
};







function renderStatistics() {
  const data = cards[currentCard].statistics[selectedPeriod];
  const values = data.values;





  const selectedLanguage =
    localStorage.getItem("siteLanguage") || "English";

  const labels =
    statisticsLanguageData[selectedLanguage].labels[selectedPeriod] || data.labels;

  document.getElementById("legendIncome").textContent =
    statisticsLanguageData[selectedLanguage].income;

  document.getElementById("legendCurrent").textContent =
    statisticsLanguageData[selectedLanguage].state;







  const isMobile = window.innerWidth <= 700;
  const width = isMobile ? 650 : 900;
  const height = isMobile ? 180 : 260;
  const left = isMobile ? 38 : 42;
  const right = 10;
  const top = isMobile ? 10 : 18;
  const bottom = isMobile ? 28 : 38;


  const chartWidth = width - left - right;
  const chartHeight = height - top - bottom;
  const maxValue = Math.ceil(Math.max(...values) / 10000) * 10000 || 10000;

  const points = values.map((value, index) => {
    const x = left + (index * chartWidth) / (values.length - 1);
    const y = top + chartHeight - (value / maxValue) * chartHeight;

    return { x, y, value };
  });

  const line = points.map((point) => `${point.x},${point.y}`).join(" ");
  const area = `${left},${top + chartHeight} ${line} ${points[points.length - 1].x
    },${top + chartHeight}`;

  const selectedIndex = Math.floor(points.length / 2);
  const selectedPoint = points[selectedIndex];

  let grid = "";

  for (let index = 0; index <= 4; index += 1) {
    const value = (maxValue / 4) * index;
    const y = top + chartHeight - (value / maxValue) * chartHeight;

    grid += `
      <line
        class="chart-grid-line"
        x1="${left}"
        y1="${y}"
        x2="${width - right}"
        y2="${y}"
      />
      <text class="chart-axis-label" x="0" y="${y + 4}">
        ${formatChartMoney(value)}
      </text>
    `;
  }

  const xLabels = labels
    .map((label, index) => {
      const pointIndex = Math.round(
        (index * (points.length - 1)) / (labels.length - 1)
      );

      return `
        <text
          class="chart-x-label ${pointIndex === selectedIndex ? "is-selected" : ""}"
          x="${points[pointIndex].x}"
          y="${height - 10}"
          text-anchor="middle"
        >
          ${label}
        </text>
      `;
    })
    .join("");

  const tooltipWidth = 72;
  const tooltipX = Math.max(
    left,
    Math.min(selectedPoint.x - tooltipWidth / 2, width - right - tooltipWidth)
  );

  statisticsChart.innerHTML = `
    <svg
      class="statistics-chart"
      viewBox="0 0 ${width} ${height}"
       preserveAspectRatio="none"
      role="img"
      aria-label="Card financial statistics"
    >
      <defs>
        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#5911db" stop-opacity="0.16" />
          <stop offset="100%" stop-color="#5911db" stop-opacity="0" />
        </linearGradient>
      </defs>

      ${grid}

      <polygon class="chart-area" points="${area}" />
      <polyline class="chart-line" points="${line}" />

      <line
        class="chart-point-line"
        x1="${selectedPoint.x}"
        y1="${selectedPoint.y}"
        x2="${selectedPoint.x}"
        y2="${top + chartHeight}"
      />

      <circle
        class="chart-point-outer"
        cx="${selectedPoint.x}"
        cy="${selectedPoint.y}"
        r="7"
      />

      <circle
        class="chart-point-inner"
        cx="${selectedPoint.x}"
        cy="${selectedPoint.y}"
        r="3"
      />

      <rect
        class="chart-tooltip"
        x="${tooltipX}"
        y="${selectedPoint.y - 58}"
        width="${tooltipWidth}"
        height="34"
        rx="5"
      />

      <text
        class="chart-tooltip-text"
        x="${selectedPoint.x}"
        y="${selectedPoint.y - 36}"
        text-anchor="middle"
      >
        ${formatChartMoney(selectedPoint.value)}
      </text>

      ${xLabels}
    </svg>
  `;
}

periodTabs.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-period]");

  if (!button) return;

  selectedPeriod = button.dataset.period;

  periodTabs.querySelectorAll("button").forEach((item) => {
    item.classList.remove("active");
  });

  button.classList.add("active");
  renderStatistics();
});


renderCard();




















const viewAllTransactions = document.getElementById("viewAllTransactions");
const transactionsModal = document.getElementById("transactionsModal");
const closeTransactionsModal = document.getElementById("closeTransactionsModal");

function closeTransactions() {
  transactionsModal.classList.remove("show");
  transactionsModal.setAttribute("aria-hidden", "true");
}

viewAllTransactions.addEventListener("click", () => {
  transactionsModal.classList.add("show");
  transactionsModal.setAttribute("aria-hidden", "false");
});

closeTransactionsModal.addEventListener("click", closeTransactions);

transactionsModal.addEventListener("click", (event) => {
  if (event.target === transactionsModal) {
    closeTransactions();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeTransactions();
  }
});














const walletCurrencies = ["USD", "EUR", "UAH", "GBP"];

const ratesToUsd = {
  USD: 1,
  EUR: 1.09,
  UAH: 0.024,
  GBP: 1.28,
};

let walletCurrencyIndex = 0;

function getWalletCurrency() {
  return walletCurrencies[walletCurrencyIndex];
}

function toUsd(value, currencyCode) {
  return value * ratesToUsd[currencyCode];
}

function fromUsd(value, currencyCode) {
  return value / ratesToUsd[currencyCode];
}

function formatWalletMoney(value, currencyCode) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 2,
  }).format(value);
}



function getCardsCountText(count) {
  const language = localStorage.getItem("siteLanguage") || "English";

  if (language === "Українська") {
    if (count === 1) return `На ${count} картці`;
    if (count >= 2 && count <= 4) return `На ${count} картках`;
    return `На ${count} картках`;
  }

  return `Across ${count} card${count === 1 ? "" : "s"}`;
}







function renderWalletSummary() {
  const currency = getWalletCurrency();

  const totalUsd = cards.reduce((sum, card) => {
    return sum + toUsd(card.balanceValue, card.currencyCode);
  }, 0);

  // Доступні гроші: лише активні картки
  const availableUsd = cards
    .filter((card) => !card.deactivated)
    .reduce((sum, card) => {
      return sum + toUsd(card.balanceValue, card.currencyCode);
    }, 0);

  const monthUsd = cards.reduce((sum, card) => {
    return sum + toUsd(card.monthNet, card.currencyCode);
  }, 0);

  document.getElementById("walletTotalBalance").textContent =
    formatWalletMoney(fromUsd(totalUsd, currency), currency);

  document.getElementById("walletAvailableFunds").textContent =
    formatWalletMoney(fromUsd(availableUsd, currency), currency);

  const monthElement = document.getElementById("walletThisMonth");
  monthElement.textContent =
    `${monthUsd >= 0 ? "+" : ""}${formatWalletMoney(
      fromUsd(monthUsd, currency),
      currency
    )}`;

  monthElement.classList.toggle("is-positive", monthUsd >= 0);
  monthElement.classList.toggle("is-negative", monthUsd < 0);

  document.getElementById("walletCardsCount").textContent =
    getCardsCountText(cards.length);

  document.querySelectorAll(".selected-currency").forEach((element) => {
    element.textContent = currency;
  });
}

document.querySelectorAll(".currency-prev").forEach((button) => {
  button.addEventListener("click", () => {
    walletCurrencyIndex =
      (walletCurrencyIndex - 1 + walletCurrencies.length) %
      walletCurrencies.length;

    renderWalletSummary();
  });
});

document.querySelectorAll(".currency-next").forEach((button) => {
  button.addEventListener("click", () => {
    walletCurrencyIndex =
      (walletCurrencyIndex + 1) % walletCurrencies.length;

    renderWalletSummary();
  });
});

renderWalletSummary();

















const walletPageWidget = document.getElementById("walletPageWidget");

if (walletPageWidget) {
  let walletPageAnimating = false;
  let walletPagePinOpen = false;

  const walletPageCard = walletPageWidget.querySelector("#bankCard");
  const walletPageInfo = walletPageWidget.querySelector("#walletInfo");
  const walletPageDeactivate = walletPageWidget.querySelector("#deactivateCard");

  function renderWalletPageCopy() {
    const card = cards[currentCard];

    const selectedLanguage =
      localStorage.getItem("siteLanguage") || "English";

    walletPageWidget.querySelector("#cardType").textContent = card.type;
    walletPageWidget.querySelector("#cardTypeBack").textContent = card.type;
    walletPageWidget.querySelector("#cardNumber").textContent = card.number;
    walletPageWidget.querySelector("#cardBalance").textContent = card.balance;



    walletPageWidget.querySelector("#cardCurrency").textContent =
      currencyLabels[selectedLanguage][card.currencyCode] || card.currency;


    walletPageWidget.querySelector("#cardCvv").textContent = card.cvv;
    walletPageWidget.querySelector("#cardExpiry").textContent = card.expiry;

    walletPageWidget.querySelector("#cardCounter").textContent =
      `${cardCounterLabels[selectedLanguage]} | ${currentCard + 1} ${selectedLanguage === "Українська" ? "з" : "out of"
      } ${cards.length}`;

    walletPageCard.classList.remove(
      "card-purple",
      "card-blue",
      "card-gold",
      "card-dark",
      "is-flipped"
    );

    walletPageCard.classList.add(card.design);

    walletPageDeactivate.checked = card.deactivated;
    walletPageWidget.classList.toggle("is-deactivated", card.deactivated);
  }

  function changeWalletPageCard(direction) {
    if (walletPageAnimating) return;

    walletPageAnimating = true;

    walletPageCard.classList.add("card-leaving");
    walletPageInfo.classList.add("info-leaving");

    setTimeout(() => {
      currentCard = (currentCard + direction + cards.length) % cards.length;

      // Оновлює картку на Dashboard
      renderCard();

      // Оновлює скопійовану картку у Wallet
      renderWalletPageCopy();

      walletPageCard.classList.remove("card-leaving");
      walletPageInfo.classList.remove("info-leaving");

      void walletPageCard.offsetWidth;

      walletPageCard.classList.add("card-entering");
      walletPageInfo.classList.add("info-entering");

      setTimeout(() => {
        walletPageCard.classList.remove("card-entering");
        walletPageInfo.classList.remove("info-entering");
        walletPageAnimating = false;
      }, 380);
    }, 220);
  }

  walletPageWidget
    .querySelector("#previousCard")
    .addEventListener("click", () => changeWalletPageCard(-1));

  walletPageWidget
    .querySelector("#nextCard")
    .addEventListener("click", () => changeWalletPageCard(1));

  // Відкриття PIN при натисканні на картку
  walletPageCard.addEventListener("click", () => {
    const card = cards[currentCard];

    if (card.deactivated) return;

    if (walletPageCard.classList.contains("is-flipped")) {
      walletPageCard.classList.remove("is-flipped");
      return;
    }

    walletPagePinOpen = true;

    pinInput.value = "";
    pinError.textContent = "";
    pinModal.classList.add("show");

    setTimeout(() => pinInput.focus(), 200);
  });




  function checkWalletPagePin() {
    if (pinInput.value.trim() === cards[currentCard].pin) {
      walletPagePinOpen = false;
      pinModal.classList.remove("show");
      walletPageCard.classList.add("is-flipped");
    } else {
      const language = localStorage.getItem("siteLanguage");

      const errorMessages = {
        English: "Incorrect PIN. Please try again.",
        en: "Incorrect PIN. Please try again.",

        Українська: "Неправильний PIN-код. Спробуйте ще раз.",
        uk: "Неправильний PIN-код. Спробуйте ще раз."
      };

      pinError.textContent =
        errorMessages[language] || errorMessages.English;

      pinInput.value = "";
      pinInput.focus();
    }
  }





  // Цей listener працює тільки для картки у Wallet
  confirmPin.addEventListener(
    "click",
    (event) => {
      if (!walletPagePinOpen) return;

      event.stopImmediatePropagation();
      checkWalletPagePin();
    },
    true
  );

  pinInput.addEventListener(
    "keydown",
    (event) => {
      if (!walletPagePinOpen || event.key !== "Enter") return;

      event.preventDefault();
      event.stopImmediatePropagation();
      checkWalletPagePin();
    },
    true
  );

  cancelPin.addEventListener("click", () => {
    walletPagePinOpen = false;
  });

  // Deactivate для скопійованої картки
  walletPageDeactivate.addEventListener("change", () => {
    const card = cards[currentCard];

    if (walletPageDeactivate.checked && !card.deactivated) {
      walletPageDeactivate.checked = false;
      deactivateModal.classList.add("show");
      return;
    }

    card.deactivated = false;
    renderCard();
    renderWalletPageCopy();
  });

  // Після підтвердження в модальному вікні оновлюємо Wallet-картку
  confirmDeactivate.addEventListener("click", () => {
    setTimeout(renderWalletPageCopy, 0);
  });

  renderWalletPageCopy();
}























// Запам'ятовує вкладку, на яку натиснув користувач
document.querySelectorAll(".nav-item[data-page]").forEach((button) => {
  button.addEventListener("click", () => {
    localStorage.setItem("activePage", button.dataset.page);
  });
});

// Після оновлення відкриває останню вкладку
window.addEventListener("load", () => {
  const savedPage = localStorage.getItem("activePage");

  if (!savedPage) return;

  const savedButton = document.querySelector(
    `.nav-item[data-page="${savedPage}"]`
  );

  savedButton?.click();
});















const addCardButton = document.getElementById("addCardButton");
const addCardModal = document.getElementById("addCardModal");
const addCardForm = document.getElementById("addCardForm");

let selectedNetwork = "VISA";

function closeAddCardModal() {
  addCardModal.classList.remove("show");
  addCardForm.reset();
  selectedNetwork = "VISA";

  document.querySelectorAll(".add-method").forEach((item, index) => {
    item.classList.toggle("active", index === 0);
  });

  document.querySelectorAll(".network-option").forEach((item) => {
    item.classList.toggle("active", item.dataset.network === "VISA");
  });
}

addCardButton.addEventListener("click", () => {
  addCardModal.classList.add("show");
});

document.getElementById("closeAddCardModal").addEventListener("click", closeAddCardModal);
document.getElementById("cancelAddCard").addEventListener("click", closeAddCardModal);

document.querySelectorAll(".add-method").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".add-method").forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    document.getElementById("newCardType").value =
      button.dataset.method === "virtual" ? "Virtual card" : "Debit card";
  });
});

document.querySelectorAll(".network-option").forEach((button) => {
  button.addEventListener("click", () => {
    selectedNetwork = button.dataset.network;

    document.querySelectorAll(".network-option").forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");
  });
});

addCardModal.addEventListener("click", (event) => {
  if (event.target === addCardModal) closeAddCardModal();
});

function generateCardNumber() {
  return Array.from({ length: 4 }, () =>
    String(Math.floor(1000 + Math.random() * 9000))
  ).join(" ");
}

addCardForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const currencyCode = document.getElementById("newCardCurrency").value;
  const cardName = document.getElementById("newCardName").value.trim();

  const currencyNames = {
    USD: "US Dollar",
    EUR: "Euro",
    UAH: "Ukrainian Hryvnia",
    GBP: "Pound Sterling",
  };

  const newCard = {
    type: selectedNetwork,
    name: cardName,
    number: generateCardNumber(),
    balance: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).format(0),
    balanceValue: 0,
    currency: currencyNames[currencyCode],
    currencyCode,
    monthNet: 0,
    design: selectedNetwork === "VISA" ? "card-purple" : "card-dark",
    deactivated: false,
    pin: "1234",
    cvv: String(Math.floor(100 + Math.random() * 900)),
    expiry: "08/31",
    income: "$0.00",
    incomeChange: "0%",
    expense: "$0.00",
    expenseChange: "0%",
    savings: "$0.00",
    savingsChange: "0%",
    statistics: createStatistics(0.2),
  };

  cards.push(newCard);
  currentCard = cards.length - 1;

  renderCard();

  if (typeof renderWalletSummary === "function") {
    renderWalletSummary();
  }

  closeAddCardModal();
});
















const viewCalendarButton = document.getElementById("viewCalendarButton");
const paymentCalendarModal = document.getElementById("paymentCalendarModal");
const calendarGrid = document.getElementById("paymentCalendarGrid");
const calendarMonthTitle = document.getElementById("calendarMonthTitle");
const calendarDetails = document.getElementById("calendarDetails");

const payments = [
  { date: "2026-09-03", name: "Netflix", amount: "$15.49", icon: "N", className: "netflix" },
  { date: "2026-09-14", name: "Spotify", amount: "$10.99", icon: "bi-spotify", className: "spotify" },
  { date: "2026-09-18", name: "Adobe", amount: "$54.99", icon: "bi-bezier2", className: "adobe" },
  { date: "2026-09-25", name: "Electricity", amount: "$86.40", icon: "bi-lightning-charge-fill", className: "electricity" },
];

let calendarDate = new Date(2026, 8, 1);
let selectedCalendarDate = "2026-09-14";

function formatDateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}




function getCalendarLanguage() {
  const language = localStorage.getItem("siteLanguage") || "English";

  return language === "Українська" || language === "uk"
    ? "uk-UA"
    : "en-US";
}

function getCalendarTexts() {
  const language = localStorage.getItem("siteLanguage") || "English";
  const isUkrainian = language === "Українська" || language === "uk";

  return isUkrainian
    ? {
      scheduled: "Заплановано",
      noPayments: "На цю дату немає запланованих платежів.",
      addPayment: "Додати платіж"
    }
    : {
      scheduled: "Scheduled",
      noPayments: "No scheduled payments for this date.",
      addPayment: "Add payment"
    };
}


function capitalizeFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function renderCalendarDetails() {
  const payment = payments.find((item) => item.date === selectedCalendarDate);
  const selectedDate = new Date(`${selectedCalendarDate}T12:00:00`);

  const calendarLanguage = getCalendarLanguage();
  const calendarTexts = getCalendarTexts();

  let dateTitle = new Intl.DateTimeFormat(calendarLanguage, {
  month: "long",
  day: "numeric",
}).format(selectedDate);

dateTitle = dateTitle.replace(
  /([а-яіїєґ]+)$/i,
  (month) => capitalizeFirstLetter(month)
);

  calendarDetails.innerHTML = `
    <h3>${dateTitle}</h3>

    <h4>${calendarTexts.scheduled}</h4>

    ${payment
      ? `
          <div class="calendar-payment-detail">
            <span class="calendar-payment-detail__logo payment-logo ${payment.className}">
              ${payment.icon.startsWith("bi-")
        ? `<i class="bi ${payment.icon}"></i>`
        : payment.icon
      }
            </span>

            <div class="calendar-payment-detail__info">
              <strong>${payment.name}</strong>
              <small><i class="bi bi-clock"></i> 10:00</small>
            </div>

            <strong>${payment.amount}</strong>
          </div>
        `
      : `<p style="color:#85858d">${calendarTexts.noPayments}</p>`
    }

    <button class="calendar-add-payment" type="button">
      <i class="bi bi-plus-lg"></i>
      ${calendarTexts.addPayment}
    </button>
  `;
}

function renderPaymentCalendar() {
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();

  calendarMonthTitle.textContent = capitalizeFirstLetter(
  new Intl.DateTimeFormat(getCalendarLanguage(), {
    month: "long",
    year: "numeric",
  }).format(calendarDate)
);

  const firstDay = new Date(year, month, 1);
  const mondayOffset = (firstDay.getDay() + 6) % 7;
  const startDate = new Date(year, month, 1 - mondayOffset);

  calendarGrid.innerHTML = "";

  for (let index = 0; index < 35; index += 1) {
    const date = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + index
    );

    const dateKey = formatDateKey(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    const payment = payments.find((item) => item.date === dateKey);
    const isCurrentMonth = date.getMonth() === month;
    const isSelected = dateKey === selectedCalendarDate;

    const button = document.createElement("button");
    button.type = "button";
    button.className = `calendar-day ${!isCurrentMonth ? "is-other-month" : ""} ${isSelected ? "is-selected" : ""
      }`;

    button.innerHTML = `
      <span class="calendar-day__number">${date.getDate()}</span>
      ${payment
        ? `
            <i class="calendar-payment-dot"></i>
            <span class="calendar-payment-name">${payment.name}</span>
          `
        : ""
      }
    `;

    button.addEventListener("click", () => {
      selectedCalendarDate = dateKey;
      renderPaymentCalendar();
      renderCalendarDetails();
    });

    calendarGrid.appendChild(button);
  }

  renderCalendarDetails();
}

function closePaymentCalendar() {
  paymentCalendarModal.classList.remove("show");
}

viewCalendarButton.addEventListener("click", () => {
  paymentCalendarModal.classList.add("show");
  renderPaymentCalendar();
});

document
  .getElementById("closeCalendarModal")
  .addEventListener("click", closePaymentCalendar);

document.getElementById("calendarPreviousMonth").addEventListener("click", () => {
  calendarDate = new Date(
    calendarDate.getFullYear(),
    calendarDate.getMonth() - 1,
    1
  );

  renderPaymentCalendar();
});

document.getElementById("calendarNextMonth").addEventListener("click", () => {
  calendarDate = new Date(
    calendarDate.getFullYear(),
    calendarDate.getMonth() + 1,
    1
  );

  renderPaymentCalendar();
});

paymentCalendarModal.addEventListener("click", (event) => {
  if (event.target === paymentCalendarModal) closePaymentCalendar();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePaymentCalendar();
});

































const transferAction = document.getElementById("transferAction");
const transferModal = document.getElementById("transferModal");
const closeTransferModal = document.getElementById("closeTransferModal");
const cancelTransfer = document.getElementById("cancelTransfer");
const transferForm = document.getElementById("transferForm");
const transferRecipient = document.getElementById("transferRecipient");
const transferAmount = document.getElementById("transferAmount");

function openTransferModal() {
  transferModal.classList.add("show");
  document.body.style.overflow = "hidden";
  transferRecipient.focus();
}

function closeTransfer() {
  transferModal.classList.remove("show");
  document.body.style.overflow = "";
}

transferAction.addEventListener("click", openTransferModal);
closeTransferModal.addEventListener("click", closeTransfer);
cancelTransfer.addEventListener("click", closeTransfer);

transferModal.addEventListener("click", (event) => {
  if (event.target === transferModal) closeTransfer();
});

document.querySelectorAll(".transfer-recipient").forEach((person) => {
  person.addEventListener("click", () => {
    document
      .querySelectorAll(".transfer-recipient")
      .forEach((item) => item.classList.remove("selected"));

    person.classList.add("selected");
    transferRecipient.value = person.dataset.recipient;
  });
});


function getTransferTexts() {
  const language = localStorage.getItem("siteLanguage") || "English";
  const isUkrainian = language === "Українська" || language === "uk";

  return isUkrainian
    ? {
        invalid: "Введіть одержувача та коректну суму.",
        ready: (amount, recipient) =>
          `Переказ на суму ${amount.toFixed(2)} готовий для ${recipient}.`
      }
    : {
        invalid: "Enter a recipient and a valid amount.",
        ready: (amount, recipient) =>
          `Transfer of ${amount.toFixed(2)} is ready for ${recipient}.`
      };
}


transferForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const recipient = transferRecipient.value.trim();
  const amount = Number(transferAmount.value);
  const transferTexts = getTransferTexts();

  if (!recipient || !amount || amount <= 0) {
    alert(transferTexts.invalid);
    return;
  }

  alert(transferTexts.ready(amount, recipient));
  closeTransfer();
  transferForm.reset();
  document
    .querySelectorAll(".transfer-recipient")
    .forEach((item) => item.classList.remove("selected"));
});



const transferCurrency = document.getElementById("transferCurrency");
const transferCurrencySymbol = document.getElementById(
  "transferCurrencySymbol"
);

const currencySymbols = {
  USD: "$",
  EUR: "€",
  UAH: "₴",
  GBP: "£",
};

transferCurrency.addEventListener("change", () => {
  transferCurrencySymbol.textContent =
    currencySymbols[transferCurrency.value] || "$";
});

















const topUpAction = document.getElementById("topUpAction");
const topUpModal = document.getElementById("topUpModal");
const closeTopUpModal = document.getElementById("closeTopUpModal");
const cancelTopUp = document.getElementById("cancelTopUp");
const topUpForm = document.getElementById("topUpForm");
const topUpAmount = document.getElementById("topUpAmount");
const topUpCurrency = document.getElementById("topUpCurrency");
const topUpCurrencySymbol = document.getElementById("topUpCurrencySymbol");
const topUpButtonAmount = document.getElementById("topUpButtonAmount");

const topUpSymbols = {
  USD: "$",
  EUR: "€",
  UAH: "₴",
  GBP: "£",
};

function updateTopUpButton() {
  const symbol = topUpSymbols[topUpCurrency.value];
  const amount = Number(topUpAmount.value) || 0;

  topUpCurrencySymbol.textContent = symbol;
  topUpButtonAmount.textContent = `${symbol}${amount.toFixed(2)}`;
}

function closeTopUp() {
  topUpModal.classList.remove("show");
  document.body.style.overflow = "";
}

topUpAction.addEventListener("click", () => {
  topUpModal.classList.add("show");
  document.body.style.overflow = "hidden";
  updateTopUpButton();
});

closeTopUpModal.addEventListener("click", closeTopUp);
cancelTopUp.addEventListener("click", closeTopUp);

topUpModal.addEventListener("click", (event) => {
  if (event.target === topUpModal) closeTopUp();
});

topUpAmount.addEventListener("input", updateTopUpButton);
topUpCurrency.addEventListener("change", updateTopUpButton);

document.querySelectorAll(".topup-presets button").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".topup-presets button")
      .forEach((item) => item.classList.remove("active"));

    button.classList.add("active");

    if (button.dataset.amount) {
      topUpAmount.value = button.dataset.amount;
      updateTopUpButton();
    } else {
      topUpAmount.value = "";
      topUpAmount.focus();
      updateTopUpButton();
    }
  });
});


function getTopUpTexts() {
  const language = localStorage.getItem("siteLanguage") || "English";
  const isUkrainian = language === "Українська" || language === "uk";

  return isUkrainian
    ? {
        invalidAmount: "Введіть коректну суму поповнення.",
        success: (amount) => `Ваш баланс поповнено на ${amount}.`
      }
    : {
        invalidAmount: "Enter a valid top up amount.",
        success: (amount) => `Your balance was topped up by ${amount}.`
      };
}



topUpForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const amount = Number(topUpAmount.value);
  const topUpTexts = getTopUpTexts();

  if (!amount || amount <= 0) {
    alert(topUpTexts.invalidAmount);
    return;
  }

  alert(topUpTexts.success(topUpButtonAmount.textContent));
  closeTopUp();
});










const topUpCardSelect = document.getElementById("topUpCardSelect");
const topUpCardPicker = document.getElementById("topUpCardPicker");
const topUpCardLogo = document.getElementById("topUpCardLogo");
const topUpCardName = document.getElementById("topUpCardName");
const topUpCardBalance = document.getElementById("topUpCardBalance");

function updateTopUpBalancesLanguage() {
  const language = localStorage.getItem("siteLanguage") || "English";
  const isUkrainian = language === "Українська" || language === "uk";

  // €8,340.50 current balance
  const currentAmount = topUpCardBalance.textContent
    .replace(/\s*(current balance|поточний баланс)\s*/i, "")
    .trim();

  topUpCardBalance.textContent = isUkrainian
    ? `${currentAmount} поточний баланс`
    : `${currentAmount} current balance`;

  // Available balance: £2,940.00
  const availableAmount = paymentMethodBalance.textContent
    .replace(/^(Available balance:|Доступний баланс:)\s*/i, "")
    .trim();

  paymentMethodBalance.textContent = isUkrainian
    ? `Доступний баланс: ${availableAmount}`
    : `Available balance: ${availableAmount}`;
}


topUpCardPicker.addEventListener("click", () => {
  const isOpen = topUpCardSelect.classList.toggle("open");

  topUpCardPicker.setAttribute("aria-expanded", isOpen);
});

document.querySelectorAll(".topup-card-option").forEach((card) => {
  card.addEventListener("click", () => {
    topUpCardLogo.textContent = card.dataset.brand;
    topUpCardName.textContent = card.dataset.name;
    topUpCardBalance.textContent = card.dataset.balance;

    updateTopUpBalancesLanguage();

    topUpCardLogo.classList.toggle(
      "topup-card-picker__logo--mastercard",
      card.dataset.brand === "MC"
    );

    document
      .querySelectorAll(".topup-card-option")
      .forEach((item) => item.classList.remove("active"));

    card.classList.add("active");
    topUpCardSelect.classList.remove("open");
    topUpCardPicker.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("click", (event) => {
  if (!topUpCardSelect.contains(event.target)) {
    topUpCardSelect.classList.remove("open");
    topUpCardPicker.setAttribute("aria-expanded", "false");
  }
});












const paymentMethodSelect = document.getElementById("paymentMethodSelect");
const paymentMethodPicker = document.getElementById("paymentMethodPicker");
const paymentMethodLogo = document.getElementById("paymentMethodLogo");
const paymentMethodName = document.getElementById("paymentMethodName");
const paymentMethodBalance = document.getElementById("paymentMethodBalance");

paymentMethodPicker.addEventListener("click", () => {
  const isOpen = paymentMethodSelect.classList.toggle("open");

  paymentMethodPicker.setAttribute("aria-expanded", isOpen);
});

document.querySelectorAll(".payment-method-option").forEach((card) => {
  card.addEventListener("click", () => {
    paymentMethodName.textContent = card.dataset.name;
    paymentMethodBalance.textContent = card.dataset.balance;

    updateTopUpBalancesLanguage();

    paymentMethodLogo.className = "topup-card-picker__logo";

    if (card.dataset.brand === "mastercard") {
      paymentMethodLogo.classList.add("topup-card-picker__logo--mastercard");
      paymentMethodLogo.textContent = "";
    } else {
      paymentMethodLogo.textContent = "VISA";
    }

    document
      .querySelectorAll(".payment-method-option")
      .forEach((item) => item.classList.remove("active"));

    card.classList.add("active");
    paymentMethodSelect.classList.remove("open");
    paymentMethodPicker.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("click", (event) => {
  if (!paymentMethodSelect.contains(event.target)) {
    paymentMethodSelect.classList.remove("open");
    paymentMethodPicker.setAttribute("aria-expanded", "false");
  }
});












const transferCardSelect = document.getElementById("transferCardSelect");
const transferCardPicker = document.getElementById("transferCardPicker");
const transferCardLogo = document.getElementById("transferCardLogo");
const transferCardName = document.getElementById("transferCardName");
const transferCardBalance = document.getElementById("transferCardBalance");

function updateTransferLanguage() {
  const language = localStorage.getItem("siteLanguage") || "English";
  const isUkrainian = language === "Українська" || language === "uk";

  // Name, phone, or account number
  transferRecipient.placeholder = isUkrainian
    ? "Ім’я, телефон або номер рахунку"
    : "Name, phone, or account number";

  // What's this for?
  const transferNote = document.getElementById("transferNote");

  if (transferNote) {
    transferNote.placeholder = isUkrainian
      ? "Призначення платежу"
      : "What's this for?";
  }

  // Available $14,528.00 / Доступно $14,528.00
  const balanceAmount = transferCardBalance.textContent.replace(
    /^(Available|Доступно)\s*/i,
    ""
  );

  transferCardBalance.textContent = isUkrainian
    ? `Доступно ${balanceAmount}`
    : `Available ${balanceAmount}`;
}



transferCardPicker.addEventListener("click", () => {
  const isOpen = transferCardSelect.classList.toggle("open");
  transferCardPicker.setAttribute("aria-expanded", isOpen);
});

document.querySelectorAll(".transfer-card-option").forEach((card) => {
  card.addEventListener("click", () => {
    transferCardName.textContent = card.dataset.name;
    transferCardBalance.textContent = card.dataset.balance;

    updateTransferLanguage();

    transferCardLogo.className = "topup-card-picker__logo";

    if (card.dataset.brand === "mastercard") {
      transferCardLogo.classList.add("topup-card-picker__logo--mastercard");
      transferCardLogo.textContent = "";
    } else {
      transferCardLogo.textContent = "VISA";
    }

    document
      .querySelectorAll(".transfer-card-option")
      .forEach((item) => item.classList.remove("active"));

    card.classList.add("active");
    transferCardSelect.classList.remove("open");
    transferCardPicker.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("click", (event) => {
  if (!transferCardSelect.contains(event.target)) {
    transferCardSelect.classList.remove("open");
    transferCardPicker.setAttribute("aria-expanded", "false");
  }
});





















const changeProfilePhoto = document.getElementById("changeProfilePhoto");
const profilePhotoInput = document.getElementById("profilePhotoInput");
const profileAvatar = document.getElementById("profileAvatar");

changeProfilePhoto.addEventListener("click", () => {
  profilePhotoInput.click();
});

profilePhotoInput.addEventListener("change", () => {
  const file = profilePhotoInput.files[0];

  if (!file) return;

  const imageUrl = URL.createObjectURL(file);

  profileAvatar.src = imageUrl;
  document.getElementById("headerProfileAvatar").src = imageUrl;
});






document.getElementById("saveSettingsButton").addEventListener("click", () => {
  const language = localStorage.getItem("siteLanguage") || "English";

  const message =
    language === "Українська" || language === "uk"
      ? "Налаштування успішно збережено!"
      : "Settings saved successfully!";

  alert(message);
});

















const deleteAccountButton = document.getElementById("deleteAccountButton");
const deleteAccountModal = document.getElementById("deleteAccountModal");
const closeDeleteModal = document.getElementById("closeDeleteModal");
const cancelDeleteAccount = document.getElementById("cancelDeleteAccount");
const confirmDeleteAccount = document.getElementById("confirmDeleteAccount");

function closeAccountDeleteModal() {
  deleteAccountModal.classList.remove("show");
}

deleteAccountButton.addEventListener("click", () => {
  deleteAccountModal.classList.add("show");
});

closeDeleteModal.addEventListener("click", closeAccountDeleteModal);
cancelDeleteAccount.addEventListener("click", closeAccountDeleteModal);

deleteAccountModal.addEventListener("click", (event) => {
  if (event.target === deleteAccountModal) {
    closeAccountDeleteModal();
  }
});

confirmDeleteAccount.addEventListener("click", () => {
  window.location.href = "register.html";
});












const headerAccount = document.getElementById("headerAccount");
const headerAccountButton = document.getElementById("headerAccountButton");
const createNewAccount = document.getElementById("createNewAccount");

headerAccountButton.addEventListener("click", () => {
  headerAccount.classList.toggle("open");
});

createNewAccount.addEventListener("click", () => {
  window.location.href = "register.html";
});

document.addEventListener("click", (event) => {
  if (!headerAccount.contains(event.target)) {
    headerAccount.classList.remove("open");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    headerAccount.classList.remove("open");
  }
});












const darkModeToggle = document.getElementById("darkModeToggle");

function setDarkMode(isDark) {
  document.documentElement.classList.toggle("dark-mode", isDark);
  localStorage.setItem("darkMode", isDark ? "on" : "off");

  if (darkModeToggle) {
    darkModeToggle.checked = isDark;
  }
}

/* Відновлює тему після перезавантаження */
setDarkMode(localStorage.getItem("darkMode") === "on");

darkModeToggle?.addEventListener("change", () => {
  setDarkMode(darkModeToggle.checked);
});





const preferredLanguage = document.getElementById("preferredLanguage");
const savedLanguage = localStorage.getItem("siteLanguage") || "English";

if (preferredLanguage) {
  preferredLanguage.value = savedLanguage;

  setLanguage(savedLanguage);
  updateNewCardNamePlaceholder();

  if (typeof updateTopUpBalancesLanguage === "function") {
  updateTopUpBalancesLanguage();
}

  if (typeof updateTransferLanguage === "function") {
  updateTransferLanguage();
}

  preferredLanguage.addEventListener("change", () => {
    const language = preferredLanguage.value;

    setLanguage(language);
    updateNewCardNamePlaceholder();

    if (typeof updateTopUpBalancesLanguage === "function") {
  updateTopUpBalancesLanguage();
}

    if (typeof updateTransferLanguage === "function") {
  updateTransferLanguage();
}

    if (typeof renderPaymentCalendar === "function") {
      renderPaymentCalendar();
    }

    if (typeof renderCard === "function") {
      renderCard();
    }

    if (typeof renderWalletPageCopy === "function") {
      renderWalletPageCopy();
    }

    if (typeof renderStatistics === "function") {
      renderStatistics();
    }

    if (typeof renderWalletSummary === "function") {
      renderWalletSummary();
    }

    if (typeof updatePageTitle === "function") {
      updatePageTitle();
    }
  });
}

if (typeof renderWalletSummary === "function") {
  renderWalletSummary();
}

if (typeof updatePageTitle === "function") {
  updatePageTitle();
}



confirmDeleteAccount.addEventListener("click", () => {
  window.close();

  setTimeout(() => {
    window.location.href = "register.html";
  }, 100);
});



document.getElementById("myButton").addEventListener("click", () => {
  window.location.href = "signin.html";
});
