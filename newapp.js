"use strict";

let generateBtn = document.querySelector(".generate");
let autoBtn = document.querySelector(".auto");
let stopBtn = document.querySelector(".stop");
let author = document.querySelector(".author");
let category = document.querySelector(".category");
let quoteDiv = document.querySelector("#quote-display");
let quoteId = document.querySelector(".quote-id");
let separator = document.querySelector(".separator"); 

// ... SVG icons ...
let playSvgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 256 256">
<path fill="#52525b" d="M240 128a15.74 15.74 0 0 1-7.6 13.51L88.32 229.65a16 16 0 0 1-16.2.3A15.86 15.86 0 0 1 64 216.13V39.87a15.86 15.86 0 0 1 8.12-13.82a16 16 0 0 1 16.2.3l144.08 88.14A15.74 15.74 0 0 1 240 128" />
</svg>`;
let pauseSvgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24">
<path fill="#000" d="M6 19h4V5H6zm8-14v14h4V5z" />
</svg>`;

let intervalId;
let quotes = []; 
let isAutoGenerating = false; 


async function getQuotes() {
  if (quotes.length === 0) {
    try {
      const response = await fetch("data.json");
      quotes = await response.json();
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  }
  return quotes;
}

async function generateRandomQuote() {
  const quotes = await getQuotes();
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const singleQuote = quotes[randomIndex];
  quoteDiv.innerHTML = singleQuote.quote;
  quoteId.innerHTML = singleQuote.id;
  author.innerHTML = "Author: " + singleQuote.author;
  category.innerHTML = "Category: " + singleQuote.category;
  separator.classList.add("pt-0.5");
}

function autoGenerateBtn() {
  if (isAutoGenerating) {
    stopGenerateQuotesBtn(); 
    return; 
  }

  isAutoGenerating = true;
  generateBtn.disabled = true; 

  autoBtn.classList.add("bg-gradient-to-tr", "from-green-200", "to-green-500");
  autoBtn.classList.remove("bg-gray-400");
  autoBtn.innerHTML = `Auto ${pauseSvgIcon}`;
  stopBtn.classList.remove("bg-red-700/60");
  stopBtn.classList.add("bg-red-700/60");
  intervalId = setInterval(generateRandomQuote, 3000);
}

function stopGenerateQuotesBtn() {
  isAutoGenerating = false;
  generateBtn.disabled = false;
  clearInterval(intervalId);
  autoBtn.classList.remove("bg-gradient-to-tr", "from-green-200", "to-green-500");
  autoBtn.classList.add("bg-gray-400");
  stopBtn.classList.add("bg-red-700/60");
  stopBtn.classList.remove("bg-red-700/60");
  autoBtn.innerHTML = `Auto ${playSvgIcon}`;
}

generateBtn.onclick = generateRandomQuote;
autoBtn.addEventListener("click", autoGenerateBtn);
stopBtn.addEventListener("click", stopGenerateQuotesBtn);
