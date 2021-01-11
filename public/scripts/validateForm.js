function verifyGender() {
    if (document.getElementById("male").checked) return "Masculino"
    if (document.getElementById("female").checked) return "Feminino"
    if (document.getElementById("other").checked) return "Generx"
}

function verifySocialMedia() {
    if (document.getElementById("social-media1").checked) return "via LinkedIn"
    if (document.getElementById("social-media2").checked) return "via Facebook"
    if (document.getElementById("social-media3").checked) return "via Instagram"
    if (document.getElementById("social-media4").checked) return "por indicação de amigos"
}

function yourJob() {
    if (document.getElementById("adm").selected) return "Auxiliar administrativo"
    if (document.getElementById("dev").selected) return "Desenvolvedor de Front-End"
    if (document.getElementById("dev2").selected) return "Desenvolvedor de Back-End"
    if (document.getElementById("dev3").selected) return "Estágio"
}
function validateForm(){

    var name = document.getElementById("name").value;
    var cpf = document.getElementById("cpf").value;
    var password = document.getElementById("password");
    var message = document.getElementById("message").value;

    var gender = '';
    var socialMedia = '';
    var job = '';

    var male = document.getElementById("male");
    var female = document.getElementById("female");
    var other = document.getElementById("other");

    if(male.checked || female.checked || other.checked) {
        gender = true
    } else {
        gender = false
    }

    var linkedin = document.getElementById("social-media1");
    var facebook = document.getElementById("social-media2");
    var instagram = document.getElementById("social-media3");
    var friends = document.getElementById("social-media4");

    if(linkedin.checked || facebook.checked || instagram.checked || friends.checked) {
        socialMedia = true
    } else {
        socialMedia = false
    }
    
    var adm = document.getElementById("adm");
    var dev = document.getElementById("dev");
    var dev2 = document.getElementById("dev2");
    var dev3 = document.getElementById("dev3");

    if(adm.selected || dev.selected || dev2.selected || dev3.selected){
        job = true
    } else {
        job = false
    } 

    

    function weelcome(){
        if (document.getElementById("male").checked) return "bem-vindo!"
        if (document.getElementById("female").checked) return "bem-vinda!"
        if (document.getElementById("other").checked) return "bem-vindx!"
    }


    
    function finalMessage() {
        var textName = `Olá ${name} seja ${weelcome()} Que bacana que você que fazer parte do nosso time. Confira seus dados antes de continuarmos. `
        var textCPF = `Seu CPF é: ${cpf}. `
        var textGender = `Você é do sexo ${verifyGender()}. `
        var textSocialMedia = `Você nos conheceu ${verifySocialMedia()}. `
        var textJob = `Você gostaria de concorrer a nossa vaga de ${yourJob()}. `
        var textMessage = `E por fim você dejesa se juntar o nós pois ${message}.`
        return (
            textName + textCPF +  textGender + textSocialMedia + textJob + textMessage
        )
    }

   var modalMessage = document.getElementById("modalMessage")

   var incompleteForm = (name == "" || cpf == "" || password == "" || message == "" || gender == false ||socialMedia == false || job == false)

    if (incompleteForm) {
        modalMessage.innerHTML = "Por favor preencha todos os campos!"
    } else {
        modalMessage.innerHTML = finalMessage()
    }
    
}

function validateLogin(){
    console.log("Funciona")
	var usuario = JSON.stringify({
		CPF   : $("#cpf").val(),
		Senha     : $("#password").val(),
    });
    var cpf = document.getElementById("cpf").value;
    var password = document.getElementById("password");
    localStorage.setItem("./autenticacao.json", usuario);
     if(cpf == "" || password == ""){
         alert("Preencha seus dados")
     } else {
         alert("Login validado.")
     }
}

function getData() {
    axios({
        method: 'get',
        url: '/dados/'
    }).then(res => {
        console.log(res)
    })
}

function createUser() {
    axios({
        method: 'post',
        url: '/dados/',
        data: JSON.stringify(
            { 
                nome: $("#name").val(),
                cpf: $("#cpf").val(),
                senha: $("#password").val(),
                genero: verifyGender(),
                midia: verifySocialMedia(),
                vaga: yourJob(),
                mensagem: $('#message').val(),
            }
        ),
        headers: {'content-type': 'application/json'}
    }).then(res => {
        alert("Usuário criado")
        window.location = 'portal'
    }).err(err => {
        alert("Problemas ao criar seu usuário")
    })
}


function login() {
    axios({
        method: 'post',
        url: '/login/',
        data: JSON.stringify(
            {
                nome: $("#nome").val(),
                senha: $("#senha").val()
            }
        ),
        headers: {'content-type': 'application/json'}
    }).then(res => {
        console.log(res)
    })
}

function writeJson(dados) {
    fs.writeFile('autenticacao.json', JSON.stringify(dados), function (err) {
        if (err) {
            console.log("erro")
        }
        console.log("finalizou")
    })
}

function readJson() {
    let dadosJson = []
    return JSON.parse(fs.readFileSync('autenticacao.json'))
}