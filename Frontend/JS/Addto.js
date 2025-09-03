document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".table-container");

  // Load from localStorage (always latest state)
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.length === 0) {
    container.innerHTML = `
      <div class="alert alert-warning text-center" role="alert">
         No favorites added yet.
      </div>
    `;
    return;
  }

  // Build table
  let tableHTML = `
    <div class="table-responsive">
      <table class="table table-hover table-bordered align-middle text-center shadow-sm rounded">
        <thead class="table-primary">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Coin</th>
            <th scope="col">Price</th>
            <th scope="col">Change</th>
            <th scope="col">Market Cap</th>
          </tr>
        </thead>
        <tbody>
  `;

  favorites.forEach((coin) => {
    tableHTML += `
      <tr>
        <td>${coin.rank}</td>
        <td><img src="${coin.image}" class="rounded-circle border" width="32" height="32"></td>
        <td class="fw-semibold">${coin.coin}</td>
        <td class="text-success">${coin.price}</td>
        <td class="${coin.change.includes('-') ? 'text-danger' : 'text-success'}">
          ${coin.change}
        </td>
        <td>${coin.marketCap}</td>
      </tr>
    `;
  });

  tableHTML += `
        </tbody>
      </table>
    </div>
  `;

  container.innerHTML = tableHTML;

  // Search functionality
  const input = document.querySelector(".search-input");

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
          row.style.display = ""; // Show row
        } else {
          row.style.display = "none"; // Hide row
        }
      });
    });
  }
});