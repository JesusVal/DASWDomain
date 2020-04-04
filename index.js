
// Crea y guarda el token por sesión

fetch('https://users-dasw.herokuapp.com/api/tokenDASW', {
    method: 'GET',
    headers: {
        'x-expediente': 703557
    },
    mode: 'cors',
    cache: 'default'
}).then( res => res.json())
.then( token => {
    localStorage.token = token.token
    console.log(localStorage.token);
});


//-------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//EventListener del formulario de registro
let registro = document.getElementById('SignInForm');

registro.addEventListener("change", function(e) {
    // console.log("Espacio fue modificado",e);
    // console.log(e.target.value);
    console.log(e.target.id);

    

    if(e.target.value.length > 0){
        // e.target.removeClass('invalid');
        e.target.classList.remove('invalid');
        
    }else{
        e.target.classList.add('invalid');
    }

    if(e.target.id.localeCompare('Pass1SignIn') == 0 ||
    e.target.id.localeCompare('Pass2SignIn') == 0){
        let pass1 = document.getElementById('Pass1SignIn');
        let pass2 = document.getElementById('Pass2SignIn');

        if(pass1.value.localeCompare(pass2.value) == 0){
            pass1.classList.remove('invalid');
            pass2.classList.remove('invalid');
        }else{
            pass1.classList.add('invalid');
            pass2.classList.add('invalid');
        }
    }

    let invalidList = document.querySelectorAll('.invalid');
    if(invalidList.length == 0){
        document.getElementById('submitRegistro').disabled = false;
        console.log("its zero");
    }else{
        document.getElementById('submitRegistro').disabled = true;
    }
    console.log(invalidList.length);

});

//-------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
//EventListener para registrar al submit
registro.addEventListener("submit", function (e) {
    e.preventDefault();
    let data = {
        nombre:     document.getElementById('NombreSignIn').value ,
        apellido:   document.getElementById('ApellidoSignIn').value,
        correo:     document.getElementById('EmailSignIn').value,
        password:   document.getElementById('Pass1SignIn').value,
        url:        document.getElementById('UrlSignIn').value,
        sexo:       document.getElementById('RadioMujer').checked ? 'M' : 'H',
        fecha:      document.getElementById('DateSignIn').value
    };

    fetch('https://users-dasw.herokuapp.com/api/users', {
        method: 'POST',
        headers: {
            'x-auth': localStorage.token,
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        if(res.status == 201)
            alert('Usuario creado');
        else
            alert('El usuario ya existe');

        return res.text();
    })
    .then( status => {
        console.log(status)
    });

    console.log(data);
});


// -- Login -- 
let login = document.getElementById('Loginbtn');

login.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('asd');
    let data = {
        correo:     document.getElementById('CorreoLogin').value,
        password:   document.getElementById('PasswordLogin').value
    };

    fetch('https://users-dasw.herokuapp.com/api/login', {
        method: 'POST',
        headers: {
            'x-auth': localStorage.token,
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then( res => {
        if( res.status != 401 ){
            return res.json();
        }
        return null;
    })
    .then( token => {
        // localStorage.token = token.token
        if( token === null){
            alert('El correo y contraseña no coinciden')
        }else{
            localStorage.tokenSesion = token.token
            window.location.href = './consulta.html';
        }

        // localStorage.tokenSesion = token.token
        // window.location.href = './consulta.html';
        // console.log(localStorage.token);
    });

});

for (var i=1; i <= localStorage.length; i++)  {
    console.log(localStorage.getItem(i))
 }
 console.log(Object.entries(localStorage));


/*
email: e@mail.com
pass: 123
*/