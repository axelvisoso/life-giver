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
                    var id = firebase.auth().currentUser.uid;

                    firebase.database().ref('users/' + id).set({
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
                    alert('Usuario registrado con exito.');
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
                alert("Bienvenido :)");
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

function getData(){
    var uid = localStorage.getItem('id');

    firebase.database().ref('users/' + uid).once('value').then(function (snapshot){
        var fname = snapshot.val().firstName;
        var lname = snapshot.val().lastName;
        var mail = snapshot.val().email;
        var phone = snapshot.val().phone;
        var type = snapshot.val().bloodType;
        var country = snapshot.val().country;
        var city = snapshot.val().city;
        var state = snapshot.val().state;

        document.getElementById("nombreP").innerHTML = fname + " " + lname;
        document.getElementById("mailP").innerHTML = mail;
        document.getElementById("telefonoP").innerHTML = phone;
        document.getElementById("tipoSangreP").innerHTML = type;
        document.getElementById("entidadP").innerHTML = city + "," + state + " " + country;
    });
}

function getDataUpdate(){
    var uid = localStorage.getItem('id');

    firebase.database().ref('users/' + uid).once('value').then(function (snapshot){
        var fname = snapshot.val().firstName;
        var lname = snapshot.val().lastName;
        var user = snapshot.val().userName;
        var phone = snapshot.val().phone;
        var type = snapshot.val().bloodType;
        var country = snapshot.val().country;
        var city = snapshot.val().city;
        var state = snapshot.val().state;
        var age = snapshot.val().age;
        localStorage.setItem('correoU', snapshot.val().email);
        localStorage.setItem('contraU', snapshot.val().password);
        localStorage.setItem('statusU', snapshot.val().status);

        document.getElementById("fisrtNameU").value = fname;
        document.getElementById("lastNameU").value = lname;
        document.getElementById("userU").value = user;
        document.getElementById("tipoSangreU").value = type;
        document.getElementById("paisU").value = country;
        document.getElementById("ciudadU").value = city;
        document.getElementById("estadoU").value = state;
        document.getElementById("telefonoU").value = phone;
        document.getElementById("edadU").value = age;
    });
}

function update(){
    window.location.replace("update.html");
}

function goBack(){
    window.location.replace("perfil.html");
}

function updateUser(){
    var uid = localStorage.getItem('id');
    const fnameU = $("#fisrtNameU").val();
    const lnameU = $("#lastNameU").val();
    const sangreU = $("#tipoSangreU").val();
    const paisU = $("#paisU").val();
    const estadoU = $("#estadoU").val();
    const ciudadU = $("#ciudadU").val();
    const telefonoU = $("#telefonoU").val();
    const usuarioU = $("#userU").val();
    const edadU = $("#edadU").val();
    var emailU = localStorage.getItem('correoU');
    var passU = localStorage.getItem('contraU');
    var statusU = localStorage.getItem('statusU');

    if (fnameU == null || fnameU == "", lnameU == null || lnameU == "", sangreU == null || sangreU == "", paisU == null || paisU == "", estadoU == null || estadoU == "", ciudadU == null || ciudadU == "", telefonoU == null || telefonoU == "", edadU == null || edadU == "", usuarioU == null || usuarioU == ""){
        alert('Complete todos los campos solicitados.');
    }else{
        const newData = {
            firstName:fnameU,
            lastName:lnameU,
            bloodType:sangreU,
            country:paisU,
            state:estadoU,
            city:ciudadU,
            phone:telefonoU,
            age:edadU,
            userName:usuarioU,
            email:emailU,
            password:passU,
            status:statusU
        }
        firebase.database().ref('users').child(uid).update(newData);

        alert('Se han actualizado los datos de usuario.');
        window.location.replace("perfil.html");
    }
}

function getTabla(){
    const database = firebase.database();
    const rootRef = database.ref().child('posts');

    rootRef.on("child_added", snap => {
        var name = snap.child("firstName").val();
        var lastname = snap.child("lastName").val();
        var blood = snap.child("bloodType").val();
        var desc = snap.child("description").val();

        $("#table_body").append("<tr><td>" + name + "</td><td>" + lastname + "</td><td>" + blood + "</td><td>" + desc + "</td></tr>");
    });
}