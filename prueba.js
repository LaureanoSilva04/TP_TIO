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


});