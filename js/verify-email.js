// Demo only: no email is sent and the prefilled code is not checked.
let seconds = 600;
const countdown = document.getElementById("countdown");
const error = document.getElementById("verifyError");

function updateTimer() {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const remainingSeconds = String(seconds % 60).padStart(2, "0");
  countdown.textContent = `${minutes}:${remainingSeconds}`;

  if (seconds > 0) seconds -= 1;
}

updateTimer();
setInterval(updateTimer, 1000);

document.getElementById("resendCode").addEventListener("click", () => {
  seconds = 600;
  error.textContent = "Demo only: no email was sent.";
  error.style.color = "#16a34a";
});

document.getElementById("verifyEmailForm").addEventListener("submit", (event) => {
  event.preventDefault();
  localStorage.setItem("emailVerified", "true");
  window.location.href = "all-set.html";
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
