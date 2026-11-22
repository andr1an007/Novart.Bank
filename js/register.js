// Demo only: nothing is validated or sent. Sample values are kept locally so the flow looks complete.
document.getElementById("registerForm").addEventListener("submit", (event) => {
  event.preventDefault();

  localStorage.setItem("newAccountName", "Demo User");
  localStorage.setItem("newAccountEmail", "demo@example.com");

  window.location.href = "verify-email.html";
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
