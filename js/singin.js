 const loginEmail = document.getElementById("loginEmail");
    const savedEmail = localStorage.getItem("newAccountEmail");
    const rememberedEmail = localStorage.getItem("rememberedEmail");

    loginEmail.value = rememberedEmail || savedEmail || "";

    document.getElementById("showPassword").addEventListener("click", () => {
      const password = document.getElementById("loginPassword");
      const icon = document.querySelector("#showPassword i");
      const hidden = password.type === "password";

      password.type = hidden ? "text" : "password";
      icon.className = hidden ? "bi bi-eye-slash" : "bi bi-eye";
    });

    document.getElementById("loginForm").addEventListener("submit", (event) => {
      event.preventDefault();

      const password = document.getElementById("loginPassword").value;
      const remember = document.getElementById("rememberMe").checked;
      const error = document.getElementById("loginError");

      if (password.length < 8) {
        error.textContent = "Enter a password with at least 8 characters.";
        return;
      }

      if (remember) {
        localStorage.setItem("rememberedEmail", loginEmail.value);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

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