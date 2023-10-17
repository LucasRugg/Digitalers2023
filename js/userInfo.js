const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const userNameHeader = document.getElementById('userHeaderName');
 const userAction = document.getElementById('userAction');

 userNameHeader.innerText = currentUser ? currentUser.fullname : "";
 if (currentUser) {
    userAction.innerHTML = '<button class="btn btn-danger" onclick="logout()">Logout</button>'
  } else{
        userAction.innerHTML = `<a class="btn btn-dark" href="http://127.0.0.1:5500/pages/login/login.html">LOGIN</a>`
    }
 
    function logout(){
        localStorage.removeItem("currentUser");
        setTimeout(function(){
            window.location.href='/index.html';
        },2000)
    }