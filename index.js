const productos = [
    // Celulares
    {
        id: "cel-1",
        titulo: "Celular 01",
        imagen: "./fotos/cel1.jpg",
        categoria: {
            nombre: "Celulares",
            id: "celulares"
        },
        precio: 300
    },

    {
        id: "cel-2",
        titulo: "Celular 02",
        imagen: "./fotos/cel2.png",
        categoria: {
            nombre: "Celulares",
            id: "celulares"
        },
        precio: 350
    },

    {
        id: "cel-3",
        titulo: "Celular 03",
        imagen: "./fotos/cel3.png",
        categoria: {
            nombre: "Celulares",
            id: "celulares"
        },
        precio: 380
    },

    {
        id: "cel-4",
        titulo: "Celular 04",
        imagen: "./fotos/cel4.jpg",
        categoria: {
            nombre: "Celulares",
            id: "celulares"
        },
        precio: 500
    },

    {
        id: "cel-5",
        titulo: "Celular 05",
        imagen: "./fotos/cel5.jpg",
        categoria: {
            nombre: "Celulares",
            id: "celulares"
        },
        precio: 700
    },

    // PC

    {
        id: "pc-1",
        titulo: "PC 01",
        imagen: "./fotos/pc1.jpg",
        categoria: {
            nombre: "Computadoras",
            id: "computadoras"
        },
        precio: 1000
    },

    {
        id: "pc-2",
        titulo: "PC 02",
        imagen: "./fotos/pc2.jpg",
        categoria: {
            nombre: "Computadoras",
            id: "computadoras"
        },
        precio: 1300
    },

    {
        id: "pc-3",
        titulo: "PC 03",
        imagen: "./fotos/pc3.png",
        categoria: {
            nombre: "Computadoras",
            id: "computadoras"
        },
        precio: 1500
    },

    {
        id: "pc-4",
        titulo: "PC 04",
        imagen: "./fotos/pc4.jpg",
        categoria: {
            nombre: "Computadoras",
            id: "computadoras"
        },
        precio: 1100
    },

    {
        id: "pc-5",
        titulo: "PC 05",
        imagen: "./fotos/pc5.jpg",
        categoria: {
            nombre: "Computadoras",
            id: "computadoras"
        },
        precio: 1350
    },

    // Consolas

    {
        id: "consola-1",
        titulo: "PS4",
        imagen: "./fotos/ps4.jpeg",
        categoria: {
            nombre: "Consolas",
            id: "consolas"
        },
        precio: 1450
    },

    {
        id: "consola-2",
        titulo: "PS5",
        imagen: "./fotos/ps5.jpg",
        categoria: {
            nombre: "Consolas",
            id: "consolas"
        },
        precio: 1650
    },

    {
        id: "consola-3",
        titulo: "Switch",
        imagen: "./fotos/switch.jpeg",
        categoria: {
            nombre: "Consolas",
            id: "consolas"
        },
        precio: 1650
    },

    {
        id: "consola-4",
        titulo: "Xbox",
        imagen: "./fotos/xbox.jpeg",
        categoria: {
            nombre: "Consolas",
            id: "consolas"
        },
        precio: 1650
    },

    // Tablet
    
    {
        id: "tablet-1",
        titulo: "Tablet 01",
        imagen: "./fotos/tablet1.jpg",
        categoria: {
            nombre: "Tablets",
            id: "tablets"
        },
        precio: 850
    },

    {
        id: "tablet-2",
        titulo: "Tablet 02",
        imagen: "./fotos/tablet2.jpg",
        categoria: {
            nombre: "Tablets",
            id: "tablets"
        },
        precio: 750
    },

    {
        id: "tablet-3",
        titulo: "Tablet 03",
        imagen: "./fotos/tablet3.png",
        categoria: {
            nombre: "Tablets",
            id: "tablets"
        },
        precio: 750
    },
    

]

const contenedorProductos = document.querySelector("#contenedor-productos")
const botonesCategorias = document.querySelectorAll(".boton-categorias")
const tituloPrincipal = document.querySelector("#titulo-principal")
let botonesAgregar = document.querySelectorAll(".producto-agregar")
const numerito = document.querySelector("#numerito")

function cargarProductos(productosElegidos){

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

            const div = document.createElement("div");
            div.classList.add("productos");
            div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
            `;

            contenedorProductos.append(div);
        })

        actualizarBotonesAgregar();
}

cargarProductos(productos);


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"))

        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos"){

            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            console.log(tituloPrincipal)

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id)
            cargarProductos(productosBoton);

        }else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos)
        }
    })


})

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar")

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
    })
}

    let productosEnCarrito;

    let productosEnCarritoLS = localStorage.getItem("productos-en-carrito")



    if (productosEnCarritoLS){
        productosEnCarrito = JSON.parse(productosEnCarritoLS);
        actualizarNumerito()
    }else{

        productosEnCarrito = [];
    }


    function agregarAlCarrito(e) {

        const idBoton = e.currentTarget.id
        const productoAgregado = productos.find(producto => producto.id === idBoton)

        if(productosEnCarrito.some(producto => producto.id === idBoton)) {
            const index = productosEnCarrito.findIndex(prducto => prducto.id === idBoton)
            productosEnCarrito[index].cantidad++


        } else{
            productoAgregado.cantidad =1
            productosEnCarrito.push(productoAgregado);
        }

        actualizarNumerito();

        localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito))
    }


    function actualizarNumerito() {

    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito
    }