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

  // main Gallery
  const mainImages = document.querySelectorAll(".main-image img");
  const mainThumbnails = document.querySelectorAll(".thumbnail img");
  const prevArrowMain = document.querySelector(".product-gallery .prev-arrow");
  const nextArrowMain = document.querySelector(".product-gallery .next-arrow");

  // Lightbox
  const lightboxContainer = document.getElementById("lightbox-modal");
  const closeLightboxBtn = document.querySelector(".close-lightbox-btn");
  const lightboxMainImage = document.getElementById("lightbox-main-image");
  const lightboxThumbnailsContainer = document.querySelector(
    ".lightbox-thumbnails"
  );
  const prevArrowLightbox = document.querySelector(".lightbox-arrow-prev");
  const nextArrowLightbox = document.querySelector(".lightbox-arrow-next");

  // Variable of the gallery state and media quary of the lightbox
  let currentImageIndex = 0;
  const isDesktop = window.matchMedia("(min-width: 780px)");

  /**
   * Updates the main img and thumbnail
   * @param {number} newIndex - img index that will be showing
   * @param {string} type - 'main' for main gallery, 'lightbox' for lightbox.
   */

  function updateGallery(newIndex, type) {
    // Lógica para que el índice se mantenga dentro del rango del array (circular)
    if (newIndex >= mainImages.length) {
      newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = mainImages.length - 1;
    }
    currentImageIndex = newIndex;

    // Actualiza la imagen principal de la galería
    mainImages.forEach((img, index) => {
      if (index === currentImageIndex) {
        img.classList.remove("inactive");
        img.classList.add("active");
      } else {
        img.classList.remove("active");
        img.classList.add("inactive");
      }
    });

    // Actualiza las miniaturas de la galería
    mainThumbnails.forEach((thumbnail, index) => {
      if (index === currentImageIndex) {
        thumbnail.classList.add("thumbnail-active");
      } else {
        thumbnail.classList.remove("thumbnail-active");
      }
    });

    // Actualiza la imagen principal del lightbox si está abierto
    if (type === "lightbox" || lightboxContainer.classList.contains("show")) {
      lightboxMainImage.src = mainImages[currentImageIndex].src;
      // También actualizar la clase 'active' en las miniaturas del lightbox si las creas dinámicamente.
      const lightboxThumbnails =
        lightboxThumbnailsContainer.querySelectorAll("img");
      lightboxThumbnails.forEach((thumb, index) => {
        if (index === currentImageIndex) {
          thumb.classList.add("thumbnail-active");
        } else {
          thumb.classList.remove("thumbnail-active");
        }
      });
    }
  }

  // Función para abrir el lightbox
  function openLightbox() {
    lightboxContainer.classList.add("show");
    lightboxMainImage.src = mainImages[currentImageIndex].src;
    // Opcional: crea las miniaturas del lightbox aquí si aún no existen
    if (lightboxThumbnailsContainer.children.length === 0) {
      createLightboxThumbnails();
    }
    // Sincroniza la miniatura activa en el lightbox
    updateGallery(currentImageIndex, "lightbox");
  }

  // Función para cerrar el lightbox
  function closeLightbox() {
    lightboxContainer.classList.remove("show");
  }

  if (lightboxContainer) {
    // verifies if the lightbox.show exists
    lightboxContainer.addEventListener("click", function () {
      lightboxContainer.classList.remove("show");
    });
  }

  // Función para crear las miniaturas del lightbox (se llama una vez)
  function createLightboxThumbnails() {
    mainThumbnails.forEach((thumbnail, index) => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("wrapper"); // Agrega la clase wrapper si la necesitas

      const lightboxThumbnail = thumbnail.cloneNode(true);
      lightboxThumbnail.classList.add("lightbox-thumbnail-img");

      // Asigna un evento de clic a las miniaturas del lightbox
      wrapper.addEventListener("click", () => updateGallery(index, "lightbox"));

      wrapper.appendChild(lightboxThumbnail);
      lightboxThumbnailsContainer.appendChild(wrapper);
    });
  }

  // --- 4. Eventos de la galería principal (móvil y escritorio) ---
  // Navegación con flechas
  prevArrowMain.addEventListener("click", () =>
    updateGallery(currentImageIndex - 1, "main")
  );
  nextArrowMain.addEventListener("click", () =>
    updateGallery(currentImageIndex + 1, "main")
  );

  // Navegación con miniaturas
  mainThumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => updateGallery(index, "main"));
  });

  // Abrir lightbox solo en escritorio al hacer clic en la imagen principal
  const mainImageContainer = document.querySelector(".main-image");
  mainImageContainer.addEventListener("click", () => {
    if (isDesktop.matches) {
      openLightbox();
    }
  });

  // --- 5. Eventos del lightbox (solo escritorio) ---
  closeLightboxBtn.addEventListener("click", closeLightbox);

  prevArrowLightbox.addEventListener("click", () =>
    updateGallery(currentImageIndex - 1, "lightbox")
  );
  nextArrowLightbox.addEventListener("click", () =>
    updateGallery(currentImageIndex + 1, "lightbox")
  );

  // Llama a esta función al inicio para crear las miniaturas del lightbox
  createLightboxThumbnails();

  // Inicializa la galería
  updateGallery(0, "main");
});
