
document.addEventListener("DOMContentLoaded", async () => {
  // Load reusable HTML components
  const placeholders = document.querySelectorAll("[data-include]");

  await Promise.all(
    [...placeholders].map(async (element) => {
      const file = element.getAttribute("data-include");

      try {
        const response = await fetch(file);

        if (!response.ok) {
          throw new Error(`Could not load ${file}`);
        }

        element.innerHTML = await response.text();
      } catch (error) {
        console.error(error);
        element.textContent = "Component could not be loaded.";
      }
    })
  );

  // Mobile navigation
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Footer year
  const footerYear = document.getElementById("footerYear");

  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  // Cookie banner
  const cookieBanner = document.getElementById("cookieBanner");
  const acceptButton = document.getElementById("cookieAccept");
  const closeButton = document.getElementById("cookieClose");

  try {
    const choice = localStorage.getItem("dexo-cookie-choice");

    if (cookieBanner && !choice) {
      cookieBanner.hidden = false;
    }

    if (acceptButton) {
      acceptButton.addEventListener("click", () => {
        localStorage.setItem("dexo-cookie-choice", "accepted");
        cookieBanner.hidden = true;
      });
    }

    if (closeButton) {
      closeButton.addEventListener("click", () => {
        localStorage.setItem("dexo-cookie-choice", "closed");
        cookieBanner.hidden = true;
      });
    }
  } catch (error) {
    console.warn("Browser storage is unavailable.");
  }

  // Hide the component loading screen after includes finish
  const loadingScreen = document.getElementById("dexoLoading");

  if (loadingScreen) {
    loadingScreen.remove();
  }
});
