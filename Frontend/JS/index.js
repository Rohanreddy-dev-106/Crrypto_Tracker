let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
const body = document.body;
const toggleBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const navbar = document.querySelector(".navbar");
const dropdownBtn = document.querySelector(".btn-group .btn");

// Toggle theme
toggleBtn.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-bs-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  body.setAttribute("data-bs-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  if (newTheme === "dark") {
    navbar.classList.replace("bg-light", "bg-dark");
    dropdownBtn.classList.replace("btn-light", "btn-dark");
    themeIcon.className = "bi bi-sun-fill";
    toggleBtn.classList.replace("btn-outline-dark", "btn-outline-light");
  } else {
    navbar.classList.replace("bg-dark", "bg-light");
    dropdownBtn.classList.replace("btn-dark", "btn-light");
    themeIcon.className = "bi bi-moon-fill";
    toggleBtn.classList.replace("btn-outline-light", "btn-outline-dark");
  }
});

// Load saved theme
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  body.setAttribute("data-bs-theme", savedTheme);

  if (savedTheme === "dark") {
    navbar.classList.replace("bg-light", "bg-dark");
    dropdownBtn.classList.replace("btn-light", "btn-dark");
    themeIcon.className = "bi bi-sun-fill";
    toggleBtn.classList.replace("btn-outline-dark", "btn-outline-light");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // ------- Search feature ----------
  const input = document.getElementsByTagName("input")[0];

  if (input) {
    input.addEventListener("input", (e) => {
      let searchItem = e.target.value.toLowerCase();
      let rows = document.querySelectorAll("tbody tr");

      rows.forEach((row) => {
        let coin = row.querySelector("td:nth-child(3)").textContent.toLowerCase();
        let price = row.querySelector("td:nth-child(4)").textContent.toLowerCase();
        let marketCap = row.querySelector("td:nth-child(6)").textContent.toLowerCase();

        if (
          coin.includes(searchItem) ||
          price.includes(searchItem) ||
          marketCap.includes(searchItem)
        ) {
          row.style.display = ""; // show row
        } else {
          row.style.display = "none"; // hide row
        }
      });
    });
  }

  // -------- Favorites feature --------
  const favBtns = document.querySelectorAll(".favorite-btn");
  if (favBtns.length > 0) {
    favBtns.forEach((btn) => {
      const row = btn.closest("tr");
      const coinName = row.cells[2].textContent.trim();

      //  On page load → set correct star state from localStorage
      const exists = favorites.find((fav) => fav.coin === coinName);
      if (exists) {
        btn.innerHTML = '<i class="bi bi-star-fill"></i>'; // filled star
      } else {
        btn.innerHTML = '<i class="bi bi-star"></i>'; // unfilled star
      }

      //  On click → toggle favorites
      btn.addEventListener("click", () => {
        favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        const coinData = {
          rank: row.cells[0].textContent.trim(),
          image: row.querySelector("img").src,
          coin: coinName,
          price: row.cells[3].textContent.trim(),
          change: row.cells[4].textContent.trim(),
          marketCap: row.cells[5].textContent.trim(),
        };

        const exists = favorites.find((fav) => fav.coin === coinData.coin);

        if (exists) {
          favorites = favorites.filter((fav) => fav.coin !== coinData.coin);
          btn.innerHTML = '<i class="bi bi-star"></i>'; // unfilled star
        } else {
          favorites.push(coinData);
          btn.innerHTML = '<i class="bi bi-star-fill"></i>'; // filled star
        }

        // update localStorage after every change
        localStorage.setItem("favorites", JSON.stringify(favorites));
      });
    });
  }
});
