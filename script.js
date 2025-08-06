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

  // lightbox gallery
  const mainImagesContainer = document.querySelector(".main-image");
  const mainImages = document.querySelectorAll(".main-image img");
  const mainThumbnails = document.querySelectorAll(".thumbnail img");
  const lightboxThumbnailsContainer = document.querySelector(
    ".lightbox-thumbnails"
  );
  const lightboxContainer = document.querySelector("#lightbox-modal");
  const prevArrow = document.querySelector(".prev-arrow");
  const nextArrow = document.querySelector(".next-arrow");

  let currentImageIndex = 0;

  function updateGallery(newIndex) {
    if (newIndex >= mainImages.length) {
      newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = mainImages.length - 1;
    }
    currentImageIndex = newIndex;

    mainImages.forEach((img, index) => {
      if (index === currentImageIndex) {
        img.classList.remove("inactive");
        img.classList.add("active");
      } else {
        img.classList.remove("active");
        img.classList.add("inactive");
      }
    });

    mainThumbnails.forEach((thumbnail, index) => {
      if (index === currentImageIndex) {
        thumbnail.classList.add("thumbnail-active");
      } else {
        thumbnail.classList.remove("thumbnail-active");
      }
    });
  }

  prevArrow.addEventListener("click", () =>
    updateGallery(currentImageIndex - 1)
  );
  nextArrow.addEventListener("click", () =>
    updateGallery(currentImageIndex + 1)
  );

  mainThumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => updateGallery(index));
  });

  const onDesktop = window.matchMedia("(min-width: 768px)");

  if (onDesktop.matches) {
    lightboxContainer.style.display = "block";
  }

  mainThumbnails.forEach((thumbnail) => {
    //clones the thumbnail element so i don't copy/paste on the html
    const lightboxThumbnail = thumbnail.cloneNode(true);
    //adds the lighbox style class
    lightboxThumbnail.classList.add("lightbox-thumbnail-img");
  });
});
