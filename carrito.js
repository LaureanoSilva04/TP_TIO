/*

======================================================================
COMPORTAMIENTO DEL SISTEMA SEGÚN OPCIONES DEL SITIO (BACKEND)
======================================================================

Este archivo define las acciones del servidor para cada opción interactiva
de la página web de la panadería.

OPCIÓN 1: "AÑADIR AL CARRITO"
----------------------------------------------------------------------
* Comportamiento: 
  Al hacer clic, el sistema recibe el ID del producto y la cantidad. 
  Verifica en la base de datos si hay stock disponible. Si hay, guarda 
  temporalmente el producto en la sesión del usuario y actualiza el 
  monto total. Si no hay stock, devuelve un error al Frontend.

OPCIÓN 2: "CONFIRMAR PEDIDO / PAGAR"
----------------------------------------------------------------------
* Comportamiento:
  El sistema procesa la orden, resta los productos del stock real en 
  la base de datos y cambia el estado del pedido a "Pendiente de pago". 
  Una vez confirmado el pago, genera un número de factura y envía un 
  correo automático al cliente con el detalle de su compra.

OPCIÓN 3: "FILTRAR POR CATEGORÍA" (Panes, Facturas, Tortas)
----------------------------------------------------------------------
* Comportamiento:
  El servidor recibe la categoría seleccionada, realiza una consulta 
  (Query) a la base de datos filtrando solo los productos activos de 
  esa categoría y le envía la lista limpia al Frontend para que la muestre.

OPCIÓN 4: "CONTACTO / ENVIAR MENSAJE"
----------------------------------------------------------------------
* Comportamiento:
  Toma los datos del formulario (Nombre, Email, Mensaje), los valida 
  (que el email sea real y el texto no esté vacío) y los almacena en 
  la base de datos de "Consultas", notificando al administrador por mail.

*/



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
