document.addEventListener("DOMContentLoaded", function () {
  const openButton = document.querySelector(".hamburger-button");
  const closeButton = document.querySelector(".close-button");
  const mobileMenu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".overlay");

  openButton.addEventListener("click", function () {
    mobileMenu.classList.add("open");
    overlay.style.display = "block";
  });

  closeButton.addEventListener("click", function () {
    mobileMenu.classList.remove("open");
    overlay.style.display = "none";
  });

  if (overlay) {
    // verifies if the overlay exists
    overlay.addEventListener("click", function () {
      mobileMenu.classList.remove("open");
      overlay.style.display = "none";
    });
  }
});
