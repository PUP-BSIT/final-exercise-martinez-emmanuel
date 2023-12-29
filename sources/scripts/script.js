// script code to toggle between light and dark themes
document.addEventListener("DOMContentLoaded", function () {
  const root = document.documentElement;
  const currentTheme = localStorage.getItem("theme") || "light";

  root.setAttribute("data-theme", currentTheme);

  function toggleTheme() {
    const newTheme =
      root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  }

  const themeToggle = document.getElementById("theme_mode");
  themeToggle.checked = currentTheme === "dark";

  themeToggle.addEventListener("change", toggleTheme);
});

// Function to hide all sections and show the selected section
function showSection(sectionId) {
  document.querySelectorAll("section > div").forEach(function (section) {
    section.classList.add("hidden-section");
  });

  let selectedSection = document.getElementById(sectionId);
  if (selectedSection) {
    selectedSection.classList.remove("hidden-section");
  }
}

// Attach click event listeners to navigation links
document.querySelectorAll("nav a").forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default behavior of anchor tag
    let targetSectionId = this.getAttribute("href").substring(1); // Get the target section ID
    showSection(targetSectionId); // Show the selected section
  });
});
