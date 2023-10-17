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
 
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(userInicio));
  }

  const users = JSON.parse(localStorage.getItem("users"));

  const loginForm = document.getElementById("login");

  loginForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    
    const userExist = users.find(user =>{
        return (user.email === email);
    })

    if(!userExist || userExist.password !== password){
        Swal.fire(
            'Error!',
            'El usuario o contraseña no son correctos',
            'error'
        )
        return;
    }

    Swal.fire(
        `Bienvenido ${userExist?.fullname}`,
        'Sesión iniciada con éxito',
        'success'
    )
    delete userExist.password;
    localStorage.setItem("currentUser", JSON.stringify(userExist));
    
    setTimeout(function(){
        window.location.href = '/index.html';
    }, 2000)
  })


  