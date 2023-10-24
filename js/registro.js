let usuarios = JSON.parse(localStorage.getItem('users'));

console.log(usuarios)
const formRegistro = document.getElementById('formRegistro');

formRegistro.addEventListener('submit',(e)=>{
    e.preventDefault();
    const nuevoRegistro = {
        id : crypto.randomUUID(),
        fullname: formRegistro.elements.fullname.value,
        email: formRegistro.elements.email.value,
        password: formRegistro.elements.password.value,
        passwordRepetida: formRegistro.elements.repeatPassword.value,
        role : "ROLE_CLIENT"

    };
   if(nuevoRegistro.password !== nuevoRegistro.passwordRepetida){
    Swal.fire(
        'Error!',
        'Las contraseñas no coinciden',
        'error'
    )
    return;
   }
if(formRegistro.checkValidity()){
    usuarios.push(nuevoRegistro);
    localStorage.setItem("users",JSON.stringify(usuarios));
    Swal.fire(
        'Exito!',
        'Se ha registrado correctamente. En breve sera redireccionado',
        'success'
    )
    setTimeout(function(){
        window.location.href = '/index.html';
    }, 2000)
}
console.log(usuarios)
})
