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
      //forEach(currentValue(el elemento actual siendo procesado por el array, el nombre que se elija es nombre temporal para cada elemento dentro del mainImages),
      // index(la posición del elemento actual siendo procesado por el array))
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
        thumbnail.parentElement.classList.add("thumbnail-active"); //La clase thumbnail-active está en el div.wrapper en el html y js.
      } else {
        thumbnail.parentElement.classList.remove("thumbnail-active");
      }
    });

    // Updates the main image on the lightbox if open
    if (type === "lightbox" || lightboxContainer.classList.contains("show")) {
      lightboxMainImage.src = mainImages[currentImageIndex].src;

      const lightboxThumbnails =
        lightboxThumbnailsContainer.querySelectorAll("img");
      lightboxThumbnails.forEach((thumb, index) => {
        if (index === currentImageIndex) {
          thumb.parentElement.classList.add("thumbnail-active");
        } else {
          thumb.parentElement.classList.remove("thumbnail-active");
        }
      });
      //si el parametro "type" tiene el mismo valor que "lightbox" o si la constante "lightboxContainer" contiene la clase "show",
      // entonces la fuente de la constante "lightboxMainImage" va a ser la misma fuente del actual "mainImage" o sea el "currentImageIndex".
      // Luego crea la constante lightboxThumbnails que es el bonche de imagenes que hay dentro de "lightboxThumbnailsContainer",
      // se crea un método forEach, el cual tiene una condicional que dice que si la posicion de la imagen de "lightboxThumbnails" es la misma que la de "currentImageIndex",
      // se va a agregar la clase "thumbnail-active" pero si es diferente entonces se va a eliminar esa clase.
      // En resumen si el lightbox se abre o si esta abierto se va a mostrar:
      // 1. la imagen de la galeria principal que esté actualmente seleccionada
      // 2. y se muestra la clase de esilo para las miniaturas activas en el lightbox!!
    }
  }

  // Function to open Lightbox
  function openLightbox() {
    lightboxContainer.classList.add("show");
    lightboxMainImage.src = mainImages[currentImageIndex].src;

    if (lightboxThumbnailsContainer.children.length === 0) {
      // esta condición evita que se dupliquen las miniaturas cada vez que se abre el lightbox.
      createLightboxThumbnails();
      //la función createLightboxThumbnails() se llama una vez al final del script, justo al cargar la página.
      //Esto es para que las miniaturas del lightbox estén listas desde el principio, incluso si el usuario no abre el lightbox de inmediato.
      // La llamada dentro de openLightbox actúa como una medida de seguridad.
      // Si por alguna razón la primera llamada fallara, el lightbox creará las miniaturas justo antes de mostrarse.
    }
    updateGallery(currentImageIndex, "lightbox");
  }
  //La función "openLightbox" va a: agregar a la constante "lightboxContainer" la clase "show",
  // y que la fuente de "lightboxMainImage" va a ser la misma que la que se seleccionó en el index de "currentImageIndex" dentro de la constante "mainImages"
  // la condicional dice: si ningún elemento dentro de la constante "lightboxThumbnailsContainer"
  // está seleccionado entonces se va a activar la funcion "createLightboxThumbnails"
  // y como último paso de la función "openLightbox" se va a activar la función "updateGallery",
  //  que evalua en que posicion se encuentra "currentImageIndex" dentro del lightbox

  // Function to close
  function closeLightbox() {
    lightboxContainer.classList.remove("show");
  }

  // Función para crear las miniaturas del lightbox (se llama una vez)
  // La llamada a createLightboxThumbnails() dentro de openLightbox() es una medida de seguridad.
  // Es un "por si acaso" que asegura que las miniaturas se creen justo antes de que el lightbox sea visible, en caso de que la primera llamada (o sea, la de hasta abajo) por alguna razón no haya funcionado.
  function createLightboxThumbnails() {
    mainThumbnails.forEach((thumbnail, index) => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("wrapper");

      const lightboxThumbnail = thumbnail.cloneNode(true);
      lightboxThumbnail.classList.add("lightbox-thumbnail-img");

      wrapper.addEventListener("click", () => updateGallery(index, "lightbox"));

      wrapper.appendChild(lightboxThumbnail);
      lightboxThumbnailsContainer.appendChild(wrapper);
    });
  }
  // el metodo "forEach" va a hacer que, cada elemento elemento actual seleccionado dentro del "mainThumbnails", va a:
  //1. crear un div llamado "wrapper" y va a agregar la clase "wrapper" a ese div,
  //2. crea la constante "lightboxThumbnail", que es le copia de todo lo que contenga el elemento "thumbnail" seleccionado dentro de "mainThumbnails"
  //3. se agrega al div "wrapper" el que al darle clic se activará la función "updateGallery", esta función no solo "muestra" el elemento,
  // sino que también sincroniza la imagen principal del lightbox con la miniatura en la que se hizo clic.
  //4. se va a agregar el elemento "lightboxThumbnail" al div "wrapper"
  //5. el elemento "wrapper" se va a agregar al div "lightboxThumbnailContainer"

  // Arrow navigation Main gallery
  prevArrowMain.addEventListener("click", () =>
    updateGallery(currentImageIndex - 1, "main")
  );
  nextArrowMain.addEventListener("click", () =>
    updateGallery(currentImageIndex + 1, "main")
  );

  // Thumbnail navigation Main gallery
  mainThumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => updateGallery(index, "main"));
  });

  // on click event to open lightbox when clicked the main image on desktop
  const mainImageContainer = document.querySelector(".main-image");
  mainImageContainer.addEventListener("click", () => {
    if (isDesktop.matches) {
      openLightbox();
    }
  });

  //to active the function when clicked
  closeLightboxBtn.addEventListener("click", closeLightbox);

  // Arrow navigation Lightbox
  prevArrowLightbox.addEventListener("click", () =>
    updateGallery(currentImageIndex - 1, "lightbox")
  );
  nextArrowLightbox.addEventListener("click", () =>
    updateGallery(currentImageIndex + 1, "lightbox")
  );

  // create thumbnails on lightbox
  createLightboxThumbnails();

  // puts the main gallery on the default set
  updateGallery(0, "main");

  //button quantity
  const plusButton = document.querySelector(".plus");
  const minusButton = document.querySelector(".minus");
  const items = document.querySelector(".quantity span");
  const addButton = document.querySelector(".add-to-cart");
  const cartItems = document.querySelector(".cart-quantity");

  let quantity = 0;
  items.textContent = quantity;
  cartItems.textContent = quantity;

  addButton.addEventListener("click", () => {
    cartItems.textContent = quantity;
    if (quantity === 0) {
      cartItems.classList.remove("active");
      cartItems.classList.add("inactive");
    } else {
      cartItems.classList.add("active");
      cartItems.classList.remove("inactive");
    }
  });

  plusButton.addEventListener("click", () => {
    quantity = quantity + 1;
    items.textContent = quantity;
  });

  minusButton.addEventListener("click", () => {
    if (quantity > 1) {
      quantity = quantity - 1;
    } else {
      quantity = 0;
    }
    items.textContent = quantity;
  });

  const cartButton = document.querySelector(".cart-button");
  const cartModal = document.querySelector(".div-cart-modal");
  const cartEmpty = document.querySelector(".div-empty");
  const cartPurchase = document.querySelector(".div-purchase");

  cartButton.addEventListener("click", () => {
    if (cartModal.classList.contains("inactive")) {
      cartModal.classList.remove("inactive");
      cartModal.classList.add("active");
    } else {
      cartModal.classList.remove("active");
      cartModal.classList.add("inactive");
    }
  });
});
