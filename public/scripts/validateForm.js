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

function getData() {
    axios({
        method: 'get',
        url: '/dados/'
    }).then(res => {
        console.log(res)
    })
}
