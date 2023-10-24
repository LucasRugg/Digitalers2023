const userInicio = [
    {
      fullname: "Daniel Lee",
      email: "admin@admin.com",
      id: "6",
      password: "admin",
      role: "ROLE_ADMIN",
    },
    {
      fullname: "Samantha Davis",
      email: "samantha.davis@example.com",
      id: "7",
      password: "alfabeta",
      role: "ROLE_CLIENT",
    },
    {
      fullname: "James Moore",
      email: "james.moore@example.com",
      id: "8",
      password: "alfabeta",
      role: "ROLE_CLIENT",
    },
    {
      fullname: "Isabella Taylor",
      email: "isabella.taylor@example.com",
      id: "9",
      password: "alfabeta",
      role: "ROLE_CLIENT",
    },
  ];
   
const formUsuario = document.getElementById("formularioUsuario");
const tableBody = document.getElementById("table-body");
const inputFiltrar = document.getElementById("filtrar");
const btn = document.querySelector('button.btn[type="submit"]');
let idEditar;
let usuarios = JSON.parse(localStorage.getItem("users")) || userInicio;

if (JSON.parse(localStorage.getItem("usuarios")) === null) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  
}
console.log(usuarios)
pintarUsuarios(usuarios);

formUsuario.addEventListener('submit',(e) => {
    e.preventDefault();
    console.log(e)

    let id;

    if(idEditar) {
        id = idEditar
    } else {
        id = crypto.randomUUID()
    }
  console.log(formUsuario)

    const nuevoUsuario = {        
        fullname: formUsuario.elements.nombreCompleto.value,
        email: formUsuario.elements.email.value,
        id: id,
        role: formUsuario.elements.rol.value
    };
   

    if(idEditar) {
      
      const index = usuarios.findIndex(usuario => {
          return usuario.id === idEditar
      })  
 
      usuario[index] = nuevoUsuario;      
      idEditar = undefined;      
      btn.innerText = "Agregar usuario"
      btn.classList.remove("btn-success")
  } else {           
      usuarios.push(nuevoUsuario)
  }

   
    Swal.fire({
        icon: 'success',
        title: 'Usuario agregado/modificado correctamente',
        text: 'El usuario se actualizo o modifico correctamente!',
      })

    pintarUsuarios(usuarios);
    localStorage.setItem("usuarios",JSON.stringify(usuarios));
    formUsuario.reset();
})

inputFiltrar.addEventListener('keyup',(evt) => {
  console.log(evt.target.value)
  const usuarioBuscado = evt.target.value.toLowerCase();

  const resultado = usuarios.filter((usuario) => {
    const nombreCompleto = usuario.fullname.toLowerCase();
    if (nombreCompleto.includes(usuarioBuscado)) {
      return true;
    }
    return false;
  })
    pintarUsuarios(resultado);

})
function pintarUsuarios(usuarios){
    tableBody.innerHTML = "";

    usuarios.forEach(function(usuario) {
        tableBody.innerHTML+= `<tr>
       
        <td class="table-title">${usuario.fullname}</td>
        <td class="table-title">${usuario.email}</td>
        <td class="table-description">${usuario.role} </td>
        <td >
        <div class="d-flex gap-1">
            <button class="btn-delete btn btn-danger btn-sm" onclick="borrarUsuario('${usuario.id}')">
                <i class="fa-solid fa-trash"></i>
            </button>

        </div>
        
    </td>
    </tr>`
        
    });

}

  

function borrarUsuario(idRecibido){
 const indiceEncontrado = usuarios.findIndex((usuario) => {
  if(usuario.id === idRecibido){
    return true;
  }
  return false;
 })
 usuarios.splice(indiceEncontrado,1);
 pintarUsuarios(usuarios);
 localStorage.setItem("users",JSON.stringify(usuarios));
 Swal.fire('Borrado!', 'Usuario borrado correctamente', 'success');

}
