document.querySelectorAll(".password-toggle").forEach((button) => {
      button.addEventListener("click", () => {
        const input = document.getElementById(button.dataset.password);
        const icon = button.querySelector("i");
        const isHidden = input.type === "password";

        input.type = isHidden ? "text" : "password";
        icon.className = isHidden ? "bi bi-eye-slash" : "bi bi-eye";
      });
    });

    document.getElementById("registerForm").addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("registerName").value.trim();
      const email = document.getElementById("registerEmail").value.trim();
      const password = document.getElementById("registerPassword").value;
      const confirmPassword = document.getElementById("registerConfirmPassword").value;
      const terms = document.getElementById("registerTerms").checked;
      const error = document.getElementById("registerError");

      if (password !== confirmPassword) {
        error.textContent = "Passwords do not match.";
        error.classList.add("show");
        return;
      }

      if (!terms) {
        error.textContent = "Please accept the Terms of Service.";
        error.classList.add("show");
        return;
      }

      error.classList.remove("show");

      localStorage.setItem("newAccountName", name);
      localStorage.setItem("newAccountEmail", email);

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



