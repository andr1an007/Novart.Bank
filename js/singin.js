// Demo only: nothing is validated, sent or stored. The form just opens the demo dashboard.
document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  localStorage.setItem("activePage", "dashboard");
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
