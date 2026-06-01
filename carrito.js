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
// Función para dibujar el carrito en el HTML y calcular el total
function renderizarCarrito() {
    const contenedorCarrito = document.getElementById('lista-carrito');
    const contenedorTotal = document.getElementById('total-precio');
    
    if (!contenedorCarrito) return; 
    
    contenedorCarrito.innerHTML = ''; // Limpiamos la vista previa
    let total = 0; // Inicializamos el acumulador de dinero

    // Recorremos la memoria y creamos un elemento <li> por cada producto
    carrito.forEach(producto => {
        const li = document.createElement('li');
        li.className = 'item-carrito';
        
        // Calculamos el subtotal de este ítem (precio x cantidad)
        const subtotalItem = producto.precio * producto.cantidad;
        total += subtotalItem;

        li.innerHTML = `
            <div class="item-info">
                <strong>${producto.cantidad}x</strong> ${producto.nombre}
            </div>
            <div class="item-precio">
                $${subtotalItem}
            </div>
        `;
        contenedorCarrito.appendChild(li);
    });

    // Actualizamos el total en el HTML
    if (contenedorTotal) {
        contenedorTotal.textContent = total;
    }
}

// Aseguramos que el carrito se renderice si el usuario entra con productos guardados
document.addEventListener('DOMContentLoaded', renderizarCarrito);
