// Update year automatically
function updateYear() {
  document.getElementById("year").textContent = new Date().getFullYear();
}

// Save form data to localStorage
function saveFormData(event) {
  event.preventDefault(); // prevent form from submitting normally
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name && email && message) {
    const formData = { name, email, message };
    localStorage.setItem("contactFormData", JSON.stringify(formData));
    alert(`Thanks for reaching out, ${name}! Your message has been saved.`);
    event.target.reset();
  } else {
    alert("Please fill in all fields.");
  }
}

// Load saved form data from localStorage
function loadFormData() {
  const savedData = localStorage.getItem("contactFormData");
  if (savedData) {
    const { name, email, message } = JSON.parse(savedData);
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    document.getElementById("message").value = message;
  }
}

// Example array of featured destinations and a function to display them dynamically
const destinations = [
  { name: "Yankari National Park", img: "https://images.unsplash.com/photo-1604654894610-df63bc53e14a?auto=format&fit=crop&w=800&q=60" },
  { name: "Abuja National Mosque", img: "https://images.unsplash.com/photo-1588269845818-5ec5f4e02d88?auto=format&fit=crop&w=800&q=60" },
  { name: "Lekki Conservation Centre", img: "https://images.unsplash.com/photo-1629292515478-e9739b6560fe?auto=format&fit=crop&w=800&q=60" }
];

// Function to render destinations dynamically using template literals
function renderDestinations() {
  const container = document.querySelector(".featured .grid");
  if (!container) return;

  container.innerHTML = destinations.map(dest => `
    <figure>
      <img loading="lazy" src="${dest.img}" alt="${dest.name}" />
      <figcaption>${dest.name}</figcaption>
    </figure>
  `).join('');
}

// Conditional logic example
function checkLocalStorageSupport() {
  if (typeof(Storage) !== "undefined") {
    console.log("localStorage is supported!");
  } else {
    console.log("localStorage is NOT supported on this browser.");
  }
}

// Initialization function that calls all setup functions
function init() {
  updateYear();
  renderDestinations();
  setupEventListeners();
  checkLocalStorageSupport();
}

document.addEventListener("DOMContentLoaded", init);

// Event listeners setup
function setupEventListeners() {
  const form = document.querySelector(".contact-form form");
  if (form) {
    form.addEventListener("submit", saveFormData);
    loadFormData(); // load saved data when page loads
  }
}
