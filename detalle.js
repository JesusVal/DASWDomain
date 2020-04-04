

let userdata = JSON.parse(localStorage.UserDetail);
console.log(userdata)

let user_card_template = document.createElement('div');
user_card_template.className = 'media col-8 mt-2';
user_card_template.innerHTML = `
            <div class="media-left align-self-center mr-3">
                <img class="rounded-circle" style="width: inherit;" src="https://randomuser.me/api/portraits/men/${Math.floor(Math.random()*10)}.jpg">
            </div>
            <div class="media-body">
                <h4>${userdata.nombre} ${userdata.apellido}</h4>
                <p>Correo: ${userdata.correo}</p>
                <p>Password: ${userdata.password}</p>
                <p>URL: ${userdata.url}</p>
                <p>Sexo: ${userdata.sexo}</p>
                <p>Fecha ${userdata.fecha}</p>
            </div>`;

document.getElementById('detail-container').appendChild(user_card_template);

