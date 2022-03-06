const compra = new Carrito();
const listaCompra = document.querySelector("#lista-compra tbody");
const carrito = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');

cargarEventos();

function cargarEventos() {
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());

    //Eliminar productos del carrito
    carrito.addEventListener('click', (e) => { compra.eliminarProducto(e) });

    compra.calcularTotal();

    carrito.addEventListener('change', (e) => { compra.obtenerEvento(e) });
    carrito.addEventListener('keyup', (e) => { compra.obtenerEvento(e) });

}

function generarTabla(productosLS) {
    let div = document.createElement("div");

    let tabla = document.createElement("table");
    
    tabla.innerHTML += `<table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Sub total</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>`;

    const body = tabla.childNodes[3];

    // productosLS = compra.obtenerProductosLocalStorage();
    productosLS.forEach(producto => {
        const row = document.createElement("tr");
        row.innerHTML += `
                            <td>${producto.titulo}</td>
                            <td>${producto.precio}</td>
                            <td>${producto.cantidad}</td>
                            <td>${producto.precio * producto.cantidad}</td>
                        `;
        body.appendChild(row);
    });

    tabla.appendChild(body);
    div.appendChild(tabla);
    return div;
}
