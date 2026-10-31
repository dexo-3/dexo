    const loadingScreen = document.getElementById("loading-screen");
    window.addEventListener("load", () => {
      loadingScreen.classList.add("hidden");
    });

    const menuButton = document.getElementById("menuButton");
    const navLinks = document.getElementById("navLinks");

    menuButton.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      menuButton.setAttribute(
        "aria-expanded",
        navLinks.classList.contains("open")
      );
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => navLinks.classList.remove("open"));
    });

    const themeButton = document.getElementById("themeButton");
    const savedTheme = localStorage.getItem("dexo3-theme");

    if (savedTheme === "light") {
      document.body.classList.add("light");
      themeButton.textContent = "☾";
    }

    themeButton.addEventListener("click", () => {
      document.body.classList.toggle("light");
      const isLight = document.body.classList.contains("light");
      localStorage.setItem("dexo3-theme", isLight ? "light" : "dark");
      themeButton.textContent = isLight ? "☾" : "☼";
    });

    document.getElementById("year").textContent = new Date().getFullYear();

    if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("service-worker.js").catch(() => {});
      });
    }
  