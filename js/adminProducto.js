const productosPrimerInicio = [
    {
        id:"3b27db03-a9f6-49c5-948e-b6f880b5b19e",
      titulo: "Camiseta Oficial",
      precio: 50.99,
      nombreJugador: "Jayson Tatum",
      categoria: "Camisetas",
      descripcion: "Camiseta oficial de los Boston Celtics con el nombre de Jayson Tatum.",
      imagen: "https://images.footballfanatics.com/boston-celtics/mens-jordan-brand-jayson-tatum-black-boston-celtics-authentic-player-jersey-statement-edition_ss5_p-4765326+u-jynw2flqgbvgnikrpkpg+v-maumj3nufm9t048n2tlr.jpg?_hv=2&w=340"
    },
    {
        id:"ae3c26d7-d1af-4db1-a06a-31f9f5a1a706",
      titulo: "Camiseta Replica",
      precio: 39.99,
      nombreJugador: "Jaylen Brown",
      categoria: "Camisetas",
      descripcion: "Réplica de la camiseta de los Boston Celtics con el nombre de Jaylen Brown.",
      imagen: "https://images.footballfanatics.com/boston-celtics/mens-fanatics-branded-jaylen-brown-black-boston-celtics-fast-break-replica-player-jersey-statement-edition_pi4793000_ff_4793073-0690e3523f7accbb7bc7_full.jpg?_hv=2&w=340"
    },
    {
        id:"5516e7d7-9b96-4705-be3f-72837a6f3247",
      titulo: "Shorts Oficiales",
      precio: 34.99,
      nombreJugador: "Kemba Walker",
      categoria: "Shorts",
      descripcion: "Shorts oficiales de los Boston Celtics con el nombre de Kemba Walker.",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfHZqgHfx3hicTh4LJf2NeUvLokEbQXa81Ng&usqp=CAU"
    },
    {
      id:"b2a3726d-8f66-4f1c-855f-581b29f961b9",
      titulo: "Shorts de Entrenamiento",
      precio: 29.99,
      nombreJugador: "Marcus Smart",
      categoria: "Shorts",
      descripcion: "Shorts de entrenamiento de los Boston Celtics con el nombre de Marcus Smart.",
      imagen: "https://ejemplo.com/shorts-smart.jpg"
    },
    
  ];  
const formProducto = document.getElementById("formularioProducto");
const tableBody = document.getElementById("table-body");
const inputFiltrar = document.getElementById("filtrar");
const btn = document.querySelector('button.btn[type="submit"]');
let idEditar;
let productos = JSON.parse(localStorage.getItem("productos")) || productosPrimerInicio;

if (JSON.parse(localStorage.getItem("productos")) === null) {
  localStorage.setItem("productos", JSON.stringify(productos));
  
}

pintarProductos(productos);


formProducto.addEventListener('submit',(e) => {
    e.preventDefault();
   

    let id;

    if(idEditar) {
        id = idEditar
    } else {
        id = crypto.randomUUID()
    }
  

    const nuevoProducto = {
        id: id,
        titulo: formProducto.elements.tituloProducto.value,
        precio: formProducto.elements.precioProducto.value,
        nombreJugador:formProducto.elements.nombreJugador.value,
        categoria:formProducto.elements.categoria.value,
        descripcion:formProducto.elements.descripcion.value,
        imagen:formProducto.elements.imagen.value,
    };
   

    if(idEditar) {
      
      const index = productos.findIndex(producto => {
          return producto.id === idEditar
      })  
 
      productos[index] = nuevoProducto;      
      idEditar = undefined;      
      btn.innerText = "Agregar producto"
      btn.classList.remove("btn-success")
  } else {           
      productos.push(nuevoProducto)
  }

   
    Swal.fire({
        icon: 'success',
        title: 'Producto agregado/modificado correctamente',
        text: 'El producto se actualizo o modifico correctamente!',
      })

    pintarProductos(productos);
    localStorage.setItem("productos",JSON.stringify(productos));
    formProducto.reset();
})

inputFiltrar.addEventListener('keyup',(evt) => {
  console.log(evt.target.value)
  const prodBuscado = evt.target.value.toLowerCase();

  const resultado = productos.filter((producto) => {
    const titulo = producto.titulo.toLowerCase();
    if (titulo.includes(prodBuscado)) {
      return true;
    }
    return false;
  })
    pintarProductos(resultado);

})
function pintarProductos(productos){
    tableBody.innerHTML = "";

    productos.forEach(function(prod,indice) {
        tableBody.innerHTML+= `<tr>
        <td class="table-image">
                <img src="${prod.imagen}" alt="">
        </td>
        <td class="table-title">${prod.titulo}</td>
        <td class="table-title">${prod.nombreJugador}</td>
        <td class="table-description">${prod.descripcion} </td>
        <td class="table-price">${prod.precio}</td>
        <td class="table-category">${prod.categoria}</td>
        <td >
        <div class="d-flex gap-1">
            <button class="btn-delete btn btn-danger btn-sm" onclick="borrarProducto('${prod.id}')">
                <i class="fa-solid fa-trash"></i>
            </button>
            <button class="btn btn-success btn-sm" onclick="editarProducto('${prod.id}')" data-bs-toggle="modal" data-bs-target="#formModal">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
        </div>
        
    </td>
    </tr>`
        
    });

}
const editarProducto = function(idRecibido){
  const prodEditar = productos.find((prod) => {
    if (idRecibido === prod.id) {
      return true;
    }
  });
    if(!prodEditar) return; 
    

    idEditar = prodEditar.id;   
    console.log( "ID EDITAR: ",idEditar)
    console.log(prodEditar)

    const elements = formProducto.elements;
    

    elements.tituloProducto.value = prodEditar.titulo;
    elements.precioProducto.value = prodEditar.precio;
    elements.descripcion.value = prodEditar.descripcion;
    elements.categoria.value = prodEditar.categoria;
    elements.nombreJugador.value=prodEditar.nombreJugador;
    elements.imagen.value = prodEditar.imagen;
  
    btn.innerText = "Editar Producto"
    btn.classList.add("btn-success")

    
  }
  

function borrarProducto(idRecibido){
 const indiceEncontrado = productos.findIndex((prod) => {
  if(prod.id === idRecibido){
    return true;
  }
  return false;
 })
 productos.splice(indiceEncontrado,1);
 pintarProductos(productos);
 localStorage.setItem("productos",JSON.stringify(productos));
 Swal.fire('Borrado!', 'Producto borrado correctamente', 'success');

}
