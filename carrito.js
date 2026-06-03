// Inicialización de la memoria del carrito
// Intentamos recuperar datos del localStorage; si no hay, creamos un arreglo vacío.
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función principal para agregar productos a la memoria
function agregarAlCarrito(productoId, nombre, precio) {
    // Verificamos si el producto ya existe en el carrito
    const productoExistente = carrito.find(item => item.id === productoId);

    if (productoExistente) {
        // Si existe, solo sumamos 1 a la cantidad
        productoExistente.cantidad++;
    } else {
        // Si no existe, lo empujamos al arreglo
        carrito.push({
            id: productoId,
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }

    // Guardamos el arreglo actualizado en la memoria del navegador
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Llamamos a la función que actualizará la pantalla
    renderizarCarrito();
}

// Función base para dibujar el carrito en el HTML (Se expandirá en el próximo commit)
function renderizarCarrito() {
    const contenedorCarrito = document.getElementById('lista-carrito');

    // Evita errores por consola si el QA aún no unió este archivo con el index.html
    if (!contenedorCarrito) return;

    contenedorCarrito.innerHTML = ''; // Limpiamos la vista previa

    console.log("Estado actual de la memoria del carrito:", carrito);
    // TODO: En el próximo commit agregaremos el bucle para dibujar los <li>
}

// Aseguramos que el carrito se renderice si el usuario entra con productos guardados
document.addEventListener('DOMContentLoaded', renderizarCarrito);
