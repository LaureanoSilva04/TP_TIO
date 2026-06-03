/**
 * carrito.test.js
 * Tests para carrito.js usando Jest + jsdom
 */

describe('Sistema de carrito', () => {
  let renderizarSpy;

  beforeEach(() => {
    // Limpiamos el DOM antes de cada test
    document.body.innerHTML = `
            <ul id="lista-carrito"></ul>
            <span id="total-precio"></span>
            <button id="btn-finalizar-compra"></button>
        `;

    // Mock de localStorage
    Storage.prototype.getItem = jest.fn(() => null);
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();

    // Mock de alert
    global.alert = jest.fn();

    // Reiniciamos el carrito global
    carrito = [];

    // Spy para verificar renderizados
    renderizarSpy = jest.spyOn(global, 'renderizarCarrito');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });


  // =========================
  // renderizarCarrito
  // =========================

  describe('renderizarCarrito', () => {

    test('debe renderizar productos en el DOM', () => {
      carrito = [
        {
          id: 1,
          nombre: 'Factura',
          precio: 100,
          cantidad: 2
        }
      ];

      renderizarCarrito();

      const items = document.querySelectorAll('.item-carrito');

      expect(items.length).toBe(1);

      expect(items[0].textContent).toContain('Factura');

      expect(items[0].textContent).toContain('2x');
    });

    test('debe calcular correctamente el total', () => {
      carrito = [
        {
          id: 1,
          nombre: 'Factura',
          precio: 100,
          cantidad: 2
        },
        {
          id: 2,
          nombre: 'Medialuna',
          precio: 50,
          cantidad: 1
        }
      ];

      renderizarCarrito();

      const total = document.getElementById('total-precio');

      expect(total.textContent).toBe('250');
    });

    test('no debe romper si no existe lista-carrito', () => {
      document.body.innerHTML = `
                <span id="total-precio"></span>
            `;

      expect(() => {
        renderizarCarrito();
      }).not.toThrow();
    });

    test('debe limpiar contenido previo antes de renderizar', () => {
      const lista = document.getElementById('lista-carrito');

      lista.innerHTML = '<li>Viejo</li>';

      carrito = [];

      renderizarCarrito();

      expect(lista.innerHTML).toBe('');
    });
  });


  // =========================
  // eliminarDelCarrito
  // =========================

  describe('eliminarDelCarrito', () => {

    test('debe eliminar el producto correcto', () => {
      carrito = [
        {
          id: 1,
          nombre: 'Factura',
          precio: 100,
          cantidad: 1
        },
        {
          id: 2,
          nombre: 'Medialuna',
          precio: 50,
          cantidad: 1
        }
      ];

      eliminarDelCarrito(1);

      expect(carrito.length).toBe(1);

      expect(carrito[0].id).toBe(2);
    });

    test('debe actualizar localStorage al eliminar', () => {
      carrito = [
        {
          id: 1,
          nombre: 'Factura',
          precio: 100,
          cantidad: 1
        }
      ];

      eliminarDelCarrito(1);

      expect(localStorage.setItem).toHaveBeenCalled();
    });

    test('no debe romper si el producto no existe', () => {
      carrito = [];

      expect(() => {
        eliminarDelCarrito(999);
      }).not.toThrow();
    });
  });


  // =========================
  // Finalizar compra
  // =========================

  describe('finalizar compra', () => {

    test('debe mostrar alerta si el carrito está vacío', () => {
      carrito = [];

      document
        .getElementById('btn-finalizar-compra')
        .click();

      expect(alert).toHaveBeenCalledWith(
        "El carrito está vacío. ¡Agregá algunas facturas primero!"
      );
    });

    test('debe confirmar compra y vaciar carrito', () => {
      carrito = [
        {
          id: 1,
          nombre: 'Factura',
          precio: 100,
          cantidad: 1
        }
      ];

      document
        .getElementById('btn-finalizar-compra')
        .click();

      expect(alert).toHaveBeenCalledWith(
        "¡Pedido confirmado! En breve prepararemos tu orden."
      );

      expect(carrito.length).toBe(0);

      expect(localStorage.removeItem).toHaveBeenCalledWith('carrito');
    });

    test('debe renderizar nuevamente luego de finalizar compra', () => {
      carrito = [
        {
          id: 1,
          nombre: 'Factura',
          precio: 100,
          cantidad: 1
        }
      ];

      document
        .getElementById('btn-finalizar-compra')
        .click();

      expect(renderizarSpy).toHaveBeenCalled();
    });
  });

  // =========================
  // agregarAlCarrito
  // =========================

  describe('agregarAlCarrito', () => {

    test('debe agregar un producto nuevo', () => {
      agregarAlCarrito(1, 'Factura', 100);

      expect(carrito.length).toBe(1);

      expect(carrito[0]).toEqual({
        id: 1,
        nombre: 'Factura',
        precio: 100,
        cantidad: 1
      });

      expect(localStorage.setItem).toHaveBeenCalled();

      expect(renderizarSpy).toHaveBeenCalled();
    });

    test('debe aumentar cantidad si el producto ya existe', () => {
      carrito = [
        {
          id: 1,
          nombre: 'Factura',
          precio: 100,
          cantidad: 1
        }
      ];

      agregarAlCarrito(1, 'Factura', 100);

      expect(carrito.length).toBe(1);

      expect(carrito[0].cantidad).toBe(2);
    });

    test('debe guardar el carrito actualizado en localStorage', () => {
      agregarAlCarrito(1, 'Factura', 100);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'carrito',
        JSON.stringify(carrito)
      );
    });

    //Posible bug, importante. 

    test('permite agregar productos con precio negativo (bug actual)', () => {
      agregarAlCarrito(1, 'Producto raro', -500);

      expect(carrito[0].precio).toBe(-500);
    });

    test('permite productoId undefined (bug actual)', () => {
      agregarAlCarrito(undefined, 'Sin ID', 100);

      expect(carrito[0].id).toBeUndefined();
    });
  });


});