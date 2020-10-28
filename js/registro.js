function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}     

function validar(){
    const fname = $("#fisrtName").val();
    const lname = $("#lastName").val();
    const sangre = $("#tipoSangre").val();
    const pais = $("#pais").val();
    const estado = $("#estado").val();
    const ciudad = $("#ciudad").val();
    const telefono = $("#telefono").val();
    const edad = $("#edad").val();
    const usuario = $("#user").val();
    const correo = $("#email").val();
    const password = $("#password").val();
    const estatus = "Activo";

    if (validateEmail(correo)) {
        const database = firebase.database();
        const rootRef = database.ref('users');

        if(password.length>5){
            if (fname == null || fname == "", lname == null || lname == "", sangre == null || sangre == "", pais == null || pais == "", estado == null || estado == "", ciudad == null || ciudad == "", telefono == null || telefono == "", edad == null || edad == "", usuario == null || usuario == ""){
                alert('Complete todos los campos solicitados.');
            }else{
                firebase.auth().createUserWithEmailAndPassword(correo, password).then(function(){
                    const autoId = rootRef.push().key;

                    rootRef.child(autoId).set({
                        firstName:fname,
                        lastName:lname,
                        bloodType:sangre,
                        country:pais,
                        state:estado,
                        city:ciudad,
                        phone:telefono,
                        age:edad,
                        userName:usuario,
                        email:correo,
                        password:password,
                        status:estatus
                    });

                    alert('Usuario registrado con exito');
                    window.location.replace("index.html");
                }).catch(function(error){
                    var errorcode = error.code;
                    var errormsg = error.message;
                    alert('Error al registrar nuevo usuario.');
                });
            }
        }else{
            alert('Contraseña invalida, debe contener almenos 6 caracteres.');
        }
    } else {
        alert('Correo invalido.');
    }
    return false;
}

function regresar(){
    window.location.replace("index.html");
}

function loginUser(){
    var mail = $("#mail").val();
    var pass = $("#pass").val();

    if (validateEmail(mail)) {  
        if(pass.length>5){
            firebase.auth().signInWithEmailAndPassword(mail, pass).then(function(){
                var id = firebase.auth().currentUser.uid;
                window.location.replace("home.html");
                localStorage.setItem('id',id);
            }).catch(function(error){
                var errorcode = error.code;
                var errormsg = error.message;
                alert('Usuario o contrasena incorrectos.');
            });
        }else{
            alert('Contraseña invalida, debe contener almenos 6 caracteres.');
        }
    } else {
        alert('Correo invalido.');
    }
    return false;
}