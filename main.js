const productosContainer = document.getElementById("productos");
const botones = document.querySelectorAll(".carddietetica");
let categoriaVisible = null;
let todosLosProductos = [];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

fetch("https://6866bbaf89803950dbb3b93e.mockapi.io/ecolife/dietetica")
  .then(res => res.json())
  .then(data => {
    todosLosProductos = data;

    botones.forEach(boton => {
      boton.addEventListener("click", () => {
        const categoriaTexto = boton.innerText.trim().toLowerCase();
        let clave = "";

        switch (true) {
          case categoriaTexto.includes("harinas"):
            clave = "Harina";
            break;
          case categoriaTexto.includes("frutos"):
            clave = "Fruto seco";
            break;
          case categoriaTexto.includes("almohaditas"):
            clave = "Saborizante";
            break;
          case categoriaTexto.includes("legumbres"):
            clave = "Legumbre";
            break;
          default:
            clave = "";
        }

        if (categoriaVisible === clave) {
          productosContainer.innerHTML = "";
          categoriaVisible = null;
        } else {
          mostrarProductos(clave);
          categoriaVisible = clave;
        }
      });
    });
  })
  .catch(error => {
    console.error("Error al cargar productos desde la API:", error);
  });

function mostrarProductos(categoria) {
  productosContainer.innerHTML = "";

  const productosFiltrados = todosLosProductos.filter(p => p.categoria === categoria);

  productosFiltrados.forEach(producto => {
    const card = document.createElement("div");
    card.classList.add("producto-card");

    const rutaImagen = `../img/${producto.imagen}`;

    card.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p><strong>Precio:</strong> $${producto.precio} por KG</p>
      <img src="${rutaImagen}" alt="${producto.nombre}" width="150">
      <input type="number" class="input-cantidad" value="1" min="1" step="1">
      <button class="agregar-carrito">Agregar al carrito</button>
    `;

    const botonAgregar = card.querySelector(".agregar-carrito");
    const inputCantidad = card.querySelector(".input-cantidad");

    botonAgregar.addEventListener("click", () => {
      const cantidad = parseInt(inputCantidad.value);
      if (cantidad > 0) {
        agregarAlCarrito(producto, cantidad);
      }
    });

    productosContainer.appendChild(card);
  });
}

function agregarAlCarrito(producto, cantidad) {
  const existente = carrito.find(item => item.id === producto.id);
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ ...producto, cantidad });
  }
  guardarCarrito();
  mostrarCarrito();
  actualizarContadorCarrito();

  const carritoDiv = document.getElementById("carritoLateral");
  carritoDiv.classList.add("destacar");
  setTimeout(() => carritoDiv.classList.remove("destacar"), 1000);

  const imagenOriginal = document.querySelector(`img[alt='${producto.nombre}']`);
  if (imagenOriginal) {
    const imagenClon = imagenOriginal.cloneNode(true);
    const rect = imagenOriginal.getBoundingClientRect();
    const carritoRect = carritoDiv.getBoundingClientRect();

    imagenClon.style.position = "fixed";
    imagenClon.style.left = `${rect.left}px`;
    imagenClon.style.top = `${rect.top}px`;
    imagenClon.style.width = `${rect.width}px`;
    imagenClon.style.height = `${rect.height}px`;
    imagenClon.style.zIndex = "2000";
    imagenClon.style.transition = "all 0.8s ease";

    document.body.appendChild(imagenClon);

    setTimeout(() => {
      imagenClon.style.left = `${carritoRect.left + 20}px`;
      imagenClon.style.top = `${carritoRect.top + 20}px`;
      imagenClon.style.opacity = "0";
      imagenClon.style.transform = "scale(0.3)";
    }, 50);

    setTimeout(() => {
      document.body.removeChild(imagenClon);
    }, 900);
  }

  Swal.fire({
    icon: "success",
    title: "Producto agregado al carrito",
    timer: 1000,
    showConfirmButton: false
  });
}

function mostrarCarrito() {
  const contenedor = document.getElementById("carritoContainer");
  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>El carrito está vacío.</p>";
    return;
  }

  carrito.forEach((item, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${item.nombre} - ${item.cantidad} KG - $${(item.precio * item.cantidad).toFixed(2)}</p>
      <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;
    contenedor.appendChild(div);
  });

const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
contenedor.innerHTML += `<p><strong>Total: $${total.toFixed(2)}</strong></p>`;
contenedor.innerHTML += `<button class="fincompra" onclick="mostrarFormulario()">Finalizar compra</button>`;
 }
function eliminarDelCarrito(index) {
  Swal.fire({
    title: '¿Eliminar producto del carrito?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      carrito.splice(index, 1);
      guardarCarrito();
      mostrarCarrito();
      actualizarContadorCarrito();

      Swal.fire({
        icon: "success",
        title: "Eliminado",
        text: "Producto eliminado del carrito",
        timer: 1500,
        showConfirmButton: false
      });
    }
  });
}

function mostrarFormulario() {
  const contenedor = document.getElementById("carritoContainer");
  contenedor.innerHTML = `
    <h3>Datos del comprador</h3>
    <label>Nombre:</label>
    <input type="text" id="nombreCliente" placeholder="Nombre" required>
    <label>Celular o Email:</label>
    <input type="text" id="contactoCliente" placeholder="Celular o Email" required>
    <div>
      <label><input type="checkbox" id="checkboxEnvio"> Envío</label>
      <label><input type="checkbox" id="checkboxRetiro"> Retiro en local</label>
    </div>
    <div id="direccionContainer" style="display: none;">
      <label>Dirección de envío:</label>
      <input type="text" id="direccionCliente" placeholder="Dirección">
    </div>
    <button onclick="finalizarCompra()">Confirmar compra</button>
<button onclick="mostrarCarrito()">Volver al carrito</button>

  `;

  const cbEnvio = document.getElementById("checkboxEnvio");
  const cbRetiro = document.getElementById("checkboxRetiro");
  const direccionDiv = document.getElementById("direccionContainer");

  cbEnvio.addEventListener("change", () => {
    cbRetiro.checked = false;
    direccionDiv.style.display = cbEnvio.checked ? "block" : "none";
  });

  cbRetiro.addEventListener("change", () => {
    cbEnvio.checked = false;
    direccionDiv.style.display = "none";
  });
}

function finalizarCompra() {
  const nombre = document.getElementById("nombreCliente").value.trim();
  const contacto = document.getElementById("contactoCliente").value.trim();
  const envio = document.getElementById("checkboxEnvio").checked;
  const retiro = document.getElementById("checkboxRetiro").checked;
  const direccion = envio ? document.getElementById("direccionCliente").value.trim() : "";

  if (!nombre || !contacto || (!envio && !retiro)) {
    Swal.fire({
      icon: "warning",
      title: "Faltan datos",
      text: "Por favor completá todos los campos obligatorios y elegí una forma de entrega",
      confirmButtonText: "Ok"
    });
    return;
  }

  if (envio && !direccion) {
    Swal.fire({
      icon: "warning",
      title: "Dirección requerida",
      text: "Si elegís envío, debés completar la dirección",
      confirmButtonText: "Ok"
    });
    return;
  }

  const datosCompra = {
    cliente: {
      nombre,
      contacto,
      metodoEntrega: envio ? "Envío" : "Retiro en local",
      direccion: envio ? direccion : "No aplica"
    },
    productos: carrito,
    total: carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0),
    fecha: new Date().toLocaleString()
  };

  console.log("Compra realizada:", datosCompra);

  Swal.fire({
    icon: "success",
    title: "¡Compra finalizada!",
    text: "Gracias por tu pedido.",
    confirmButtonText: "Aceptar"
  });

  carrito = [];
  guardarCarrito();
  mostrarCarrito();
  actualizarContadorCarrito();
}

document.getElementById("toggleCarrito").addEventListener("click", () => {
  const carritoDiv = document.getElementById("carritoLateral");
  carritoDiv.style.transform =
    carritoDiv.style.transform === "translateX(0%)" ? "translateX(100%)" : "translateX(0%)";
});

function actualizarContadorCarrito() {
  const contador = document.getElementById("contadorCarrito");
  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  contador.textContent = totalItems;
}
document.getElementById("cerrarCarrito").addEventListener("click", () => {
  document.getElementById("carritoLateral").style.transform = "translateX(100%)";
});

mostrarCarrito();
actualizarContadorCarrito();
