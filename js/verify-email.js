const email = localStorage.getItem("newAccountEmail") || "you@example.com";
    document.getElementById("verifyEmailAddress").textContent = email;

    const inputs = [...document.querySelectorAll(".code-input")];
    const error = document.getElementById("verifyError");

    inputs.forEach((input, index) => {
      input.addEventListener("input", () => {
        input.value = input.value.replace(/\D/g, "");

        if (input.value && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      });

      input.addEventListener("keydown", (event) => {
        if (event.key === "Backspace" && !input.value && index > 0) {
          inputs[index - 1].focus();
        }
      });

      input.addEventListener("paste", (event) => {
        event.preventDefault();

        const code = event.clipboardData
          .getData("text")
          .replace(/\D/g, "")
          .slice(0, 6);

        code.split("").forEach((number, numberIndex) => {
          if (inputs[numberIndex]) inputs[numberIndex].value = number;
        });

        inputs[Math.min(code.length, 5)].focus();
      });
    });

    let seconds = 600;
    const countdown = document.getElementById("countdown");

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
      error.textContent = "A new code has been sent.";
      error.style.color = "#16a34a";
    });

    document.getElementById("verifyEmailForm").addEventListener("submit", (event) => {
      event.preventDefault();

      const code = inputs.map((input) => input.value).join("");

      if (code.length !== 6) {
        error.textContent = "Enter the complete 6-digit code.";
        error.style.color = "#e13d47";
        
        return;
      }

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