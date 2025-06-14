document.addEventListener("DOMContentLoaded", () => {
    const productosContainer = document.getElementById("productos");

    const productos = {
        harinas: [
            { nombre: "Harina 0000", precio: "$1000 por KG" },
            { nombre: "Harina integral", precio: "$1200 por KG" },
            { nombre: "Harina de almendra", precio: "$1500 por KG" }
        ],
        frutosSecos: [
            { nombre: "Almendras", precio: "$10000 por KG" },
            { nombre: "Maní Pelado", precio: "$3000 por KG" },
            { nombre: "Nuez", precio: "$8000 por KG" }
        ],
        almohaditas: [
            { nombre: "Sabor Limón", precio: "$7000 por KG" },
            { nombre: "Sabor Frutilla", precio: "$7000 por KG" },
            { nombre: "Sabor Chocolate", precio: "$7000 por KG" }
        ],
        legumbres: [
            { nombre: "Arvejas", precio: "$1300 por KG" },
            { nombre: "Garbanzos", precio: "$1800 por KG" }
        ]
    };

    const botones = document.querySelectorAll(".carddietetica");
    let categoriaVisible = null; // Para saber qué grupo está visible

    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            const categoria = boton.innerText.trim().toLowerCase();

            let clave = "";
            if (categoria.includes("harinas")) clave = "harinas";
            else if (categoria.includes("frutos")) clave = "frutosSecos";
            else if (categoria.includes("almohaditas")) clave = "almohaditas";
            else if (categoria.includes("legumbres")) clave = "legumbres";

            if (categoriaVisible === clave) {
                // Si se vuelve a apretar el mismo botón: ocultar productos
                productosContainer.innerHTML = "";
                categoriaVisible = null;
            } else {
                // Mostrar nuevos productos
                mostrarProductos(clave);
                categoriaVisible = clave;
            }
        });
    });

    function mostrarProductos(clave) {
        productosContainer.innerHTML = "";

        productos[clave].forEach(producto => {
            const card = document.createElement("div");
            card.classList.add("producto-card");
            card.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p>${producto.precio}</p>
            `;
            productosContainer.appendChild(card);
        });
    }
});
