
console.log(localStorage.token + ' holi');
console.log(localStorage.tokenSesion);




fetch('https://users-dasw.herokuapp.com/api/users', {
        method: 'GET',
        headers: {
            'x-auth': localStorage.token,
            'x-user-token': localStorage.tokenSesion,
            'content-type': 'application/json'
        }
    })
    .then( res => res.json())
    .then( users => {
        showUsers(users);
        console.log(users);
    });


//Esta función despliaga la información de los usuarios en tarjetas de bootstrap
function showUsers(usersdata){ 

    usersdata.forEach( user => {

        let user_card_template = document.createElement('div');
        user_card_template.className = 'media col-8 mt-2';
        user_card_template.innerHTML = `
            <div class="media-left align-self-center mr-3">
                <img class="rounded-circle" style="width: inherit;" src="https://randomuser.me/api/portraits/men/${Math.floor(Math.random()*10)}.jpg">
            </div>
            <div class="media-body">
                <h4>${user.nombre} ${user.apellido}</h4>
                <p>Correo: ${user.correo}</p>
            </div>
            <div class="media-right align-self-center">
                <div class="row">
                    <a href="#" class="btn btn-primary edit"  onclick="verDetalle('${user.correo}')"><i class="fas fa-search edit  "></i></a></div>
                <div class="row">
                    <a href="#" class="btn btn-primary mt-2" data-toggle="modal" data-target="#editar" onclick="verDetalleFormulario('${user.correo}')"><i class="fas fa-pencil-alt edit  "></i></a></div>
                <div class="row">
                    <a href="#" class="btn btn-primary mt-2" data-toggle="modal" data-target="#modalEliminar" onclick="prepararEliminar('${user.correo}')"><i class="fas fa-trash-alt  remove "></i></i></a></div>
            </div>`;
        document.getElementById('lista').appendChild(user_card_template);
    });
    

}

function verDetalle(correo){
    // console.log(correo);
    fetch('https://users-dasw.herokuapp.com/api/users/'+ correo + '', {
        method: 'GET',
        headers: {
            'x-auth': localStorage.token,
            'x-user-token': localStorage.tokenSesion,
            'content-type': 'application/json'
        }
    })
    .then( res => res.json())
    .then( userdata => {
        window.localStorage.UserDetail = JSON.stringify(userdata);
        window.location.href = './detalle.html';
        // console.log(window.localStorage.UserDetail);
    });
}

function verDetalleFormulario(correo){
    fetch('https://users-dasw.herokuapp.com/api/users/'+ correo + '', {
        method: 'GET',
        headers: {
            'x-auth': localStorage.token,
            'x-user-token': localStorage.tokenSesion,
            'content-type': 'application/json'
        }
    })
    .then( res => res.json())
    .then( userdata => {
        rellenarFormularioEditar(userdata);
        console.log(userdata);
    });
}

function rellenarFormularioEditar(userdata){

    document.getElementById('NombreEdit').value     = userdata.nombre;
    document.getElementById('ApellidoEdit').value   = userdata.apellido;
    document.getElementById('EmailEdit').value      = userdata.correo;
    document.getElementById('Pass1Edit').value      = userdata.password;
    document.getElementById('UrlEdit').value        = userdata.url;
    // document.getElementById('RadioMujerEdit').checked = ? 'M' : 'H',
    document.getElementById('DateEdit').value       = userdata.fecha;

    console.log(userdata.sexo);
    if( userdata.sexo == 'H' ){
        document.getElementById('RadioHombreEdit').checked = true;
    }else{
        document.getElementById('RadioMujerEdit').checked = true;
    }

}

document.getElementById('EditForm').addEventListener('submit', function(e){
    e.preventDefault();
    let data = {
        nombre:     document.getElementById('NombreEdit').value  ,
        apellido:   document.getElementById('ApellidoEdit').value,
        correo:     document.getElementById('EmailEdit').value,
        password:   document.getElementById('Pass1Edit').value,
        url:        document.getElementById('UrlEdit').value,
        sexo:       document.getElementById('RadioMujerEdit').checked ? 'M' : 'H',
        fecha:      document.getElementById('DateEdit').value
    };
    console.log('EditButton');

    fetch('https://users-dasw.herokuapp.com/api/users/'+ data.correo +'', {
        method: 'PUT',
        headers: {
            'x-auth': localStorage.token,
            'x-user-token': localStorage.tokenSesion,
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        if(res.status == 200)
            alert('Usuario modificado');
        else
            alert('Hubo un error, no se actualizo');

        return res.text();
    })
    .then( status => {
        console.log(status)
    });
});


// Eliminar usuario
let correo_a_borrar = 0;

function prepararEliminar(correo){
    correo_a_borrar = correo;
    console.log(correo_a_borrar + ' este se va a borrar');
}

document.getElementById('eliminarBtn').addEventListener('click' , function(e) {
    fetch('https://users-dasw.herokuapp.com/api/users/'+ correo_a_borrar +'', {
        method: 'DELETE',
        headers: {
            'x-auth': localStorage.token,
            'x-user-token': localStorage.tokenSesion,
            'content-type': 'application/json'
        }
    })
    .then(res => {
        // if(res.status == 200)
        //     alert('Usuario modificado');
        // else
        //     alert('Hubo un error, no se actualizo');
        console.log(res.status);

        return res.text();
    })
    .then( status => {
        console.log(status)
    });
});






// let user_card_template = document.createElement('div');
// user_card_template.className = 'media col-8 mt-2';
// user_card_template.innerHTML = `
//     <div class="media-left align-self-center mr-3"></div>
//     <div class="media-body"></div>
//     <div class="media-right align-self-center">
//         <div class="row">
//             <a href="#" class="btn btn-primary edit"><i class="fas fa-search edit  "></i></a></div>
//         <div class="row">
//             <a href="#" class="btn btn-primary mt-2"><i class="fas fa-pencil-alt edit  "></i></a></div>
//         <div class="row">
//             <a href="#" class="btn btn-primary mt-2"><i class="fas fa-trash-alt  remove "></i></i></a></div>
//     </div>`;
// console.log(user_card_template);

