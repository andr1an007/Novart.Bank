document.getElementById("goToDashboard").addEventListener("click", () => {
      localStorage.setItem("activePage", "dashboard");
      window.location.href = "index.html";
    });

    document.getElementById("setUpWallet").addEventListener("click", (event) => {
      event.preventDefault();
      localStorage.setItem("activePage", "wallet");
      window.location.href = "index.html";
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