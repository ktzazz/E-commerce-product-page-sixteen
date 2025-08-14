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

  //main gallery
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

  //variable gallery data and responsive
  let currentImageIndex = 0;
  const isDesktop = window.matchMedia("(min-width: 780px)");

  // newIndex - the element that will be showing from the base data
  // type - 'main' main gallety, 'lightbox' lightbox gallery

  function updateGallery(newIndex, type) {
    if (newIndex >= mainImages.length) {
      newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = mainImages.length - 1;
    }
    currentImageIndex = newIndex;

    // ahi se está diciendo que, la funcion "updateGallery" contiene los parametros "newIndex" y "type",
    // y luego se dice que si "newIndex" tiene un valor mayor o igual al de la constante "mainImages",
    // "newIndex" va a volver a la posicion 0, pero si es menor su valor a 0 entonces el valor de "newIndex" será el valor de "mainImages" menos 1,
    // al concluir la funcion de la condición la variable "currentImageIndex" cambia su valor por el que tenga "newIndex".
    // Y en la constante "mainImages" se le pone la propiedad ".lenght" porque es una constante que contiene un grupo de imagenes
    // entonces estamos diciendo que es un array y que de ahi se seleccionará alguno de sus elementos.
    // en el else if; si el índice es negativo (cuando se intenta ir "hacia atrás" desde la primera imagen), el carrusel se mueve a la última imagen, haciendo el ciclo circular.

    // To update the image on the main gallery
    mainImages.forEach((img, index) => {
      //forEach(currentValue(el elemento actual siendo procesado por el array, el nombre que se elija es nombre temporal para cada elemento dentro del mainImages), index(la posición del elemento actual siendo procesado por el array))
      if (index === currentImageIndex) {
        img.classList.remove("inactive");
        img.classList.add("active");
      } else {
        img.classList.remove("active");
        img.classList.add("inactive");
      }
    });

    //se creó otra condicional en la función updateGallery, dice que,
    //  se va a revisar la imagen actual y su posición dentro de la constante "mainImages",
    // si el "index" tiene el mismo valor que la variable "currentImageIndex" se va a borrar la clase "inactive" y se agregará la clase "active",
    //  pero si tiene un valor diferente se hará lo contrario, se eliminará la clase "active" y se agregará "inactive" de la img.
    //EN RESUMEN: Para cada imagen, revisa su posición (index). Si su posición es la misma que la imagen que quiero mostrar (currentImageIndex),
    // entonces hazla visible. Si no, hazla invisible.

    // Updates the thumbnail on the main gallery, it's the same as the main Gallery
    mainThumbnails.forEach((thumbnail, index) => {
      if (index === currentImageIndex) {
        thumbnail.classList.add("thumbnail-active");
        //thumbnail.classList.add("thumbnail-overlay");
      } else {
        thumbnail.classList.remove("thumbnail-active");
        //thumbnail.classList.remove("thumbnail-overlay");
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
