// script.js
const API_URL = "https://saurav.tech/NewsAPI/everything/cnn.json";
const newsContainer = document.getElementById("newsContainer");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

let articles = [];


async function fetchArticles() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    articles = data.articles;
    displayArticles(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
}


function displayArticles(articlesToDisplay) {
  newsContainer.innerHTML = "";
  articlesToDisplay.forEach((article) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
            
            <div class="card-content">
                <div class="card-title">${article.title}</div>
                <div class="card-date">${new Date(
                  article.publishedAt
                ).toLocaleDateString()}</div>
                <img src="${article.urlToImage}" alt="${article.title}">
                <div class="card-description">${article.description}</div>
                <button onclick="window.open('${
                  article.url
                }', '_blank')">Read More</button>
            </div>
        `;
    newsContainer.appendChild(card);
  });
}


function filterArticles() {
  const keyword = searchInput.value.toLowerCase();
  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(keyword) ||
      article.description.toLowerCase().includes(keyword)
  );
  displayArticles(filteredArticles);
}


searchButton.addEventListener("click", filterArticles);
searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    filterArticles();
  }
});


fetchArticles();
