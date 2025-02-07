const contenedor = document.getElementById("contenedor-imagenes");
const ventanaModal = document.querySelector(".ventana-modal")
const imagenModal = document.querySelector(".imagen-modal");
const botonCerrarModal = document.querySelector(".boton-cerrar");
const imagenDescripcion = document.querySelector(".descripcion-imagen");
const buttonCategoria = document.querySelectorAll("nav ul li button");

// Para mostrar las imagenes
const mostrarImagenes = (imagenes = []) => {
  imagenes.map((imagen) => {
    contenedor.innerHTML += `<img id="${imagen.id}" class="imagen" src="${imagen.src}" alt="${imagen.alt}">`
  })
}
mostrarImagenes(imagenes);

// Filtrar las imagenes
const filtrarImagenes = (imagenes = [], categoria) => {
  const imagenesFiltradas = imagenes.filter(imagen => imagen.categorias.some(c => c.toLowerCase() === categoria.toLowerCase()));
  mostrarImagenes(imagenesFiltradas);
}

// Acceder a los botones de las categorias de las imagenes
buttonCategoria.forEach(button => {
  button.addEventListener("click", () => {
    contenedor.innerHTML = "";
    if (button.textContent === "Todos") {
      mostrarImagenes(imagenes)
    } else {
      filtrarImagenes(imagenes, button.textContent);
    }
    mostrarVentanaModal()
  })
})

// Asignar una descripción a la imagen en la ventana modal
const asignarDescripcionImagenModal = (idImagen) => {
  imagenes.map(({ id, descripcion }) => {
    if (id === idImagen) {
      imagenDescripcion.textContent = descripcion;
    }
  })
}

// Mostrar la ventana modal
const mostrarVentanaModal = () => {
  const todasImagenes = document.querySelectorAll(".imagen");
  // console.log(todasImagenes)

  todasImagenes.forEach((imagen) => {
    // console.log(imagen);
    imagen.addEventListener("click", () => {
  
      const src = imagen.getAttribute("src");
      const id = imagen.getAttribute("id");
      imagenModal.setAttribute("id", id);
      imagenModal.setAttribute("src", src);
      ventanaModal.classList.add("activo")
      document.body.style.overflow = "hidden";
  
      asignarDescripcionImagenModal(parseInt(id))
  
    })  
  })
}
mostrarVentanaModal()

// Botón para cerrar la ventana modal
botonCerrarModal.addEventListener("click", () => {
  imagenModal.id = "";
  imagenModal.src = "";
  ventanaModal.classList.remove("activo")
  document.body.style.overflow = "auto";
  ventanaModal.style.display = "";
})