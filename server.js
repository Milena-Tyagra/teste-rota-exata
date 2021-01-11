var bcrypt = require ('bcrypt')

const fs = require('fs');
const express = require('express');
const server = express();
const bodyParser = require('body-parser');

const nunjucks = require("nunjucks")

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false}));

const { pageLanding, pageForm, pagePortal, pageTable } = require('./pages');

nunjucks.configure("src/views", {
    express: server,
    noCache: true,
})

server.use(express.static("public"));



server.get('/', (req, res) => {
    return pageLanding(req, res)
})

server.get('/formulario/', (req, res) => {
    return pageForm(req, res)
})

server.get('/portal/', (req, res) => {
    return pagePortal(req, res)
})

server.get('/tabela/', (req, res) => {
    return pageTable(req, res)
})

server.get('/dados/', (req, res) => {
    const dadosJ = readJson()
    res.status(200).send({
        sucess: true,
        message: "mensagem",
        dados: dadosJ
    })
})



function escreverJson(dados) {
    fs.writeFile('autenticacao.json', JSON.stringify(dados), function (err) {
        if (err) {
            console.log("erro")
        }
        console.log("finalizou")
    })
}

function readJson() {
    return JSON.parse(fs.readFileSync('autenticacao.json'))
}

server.post('/dados/', (req, res) => {
    let data = readJson()
    let dataToSave = []
    let receivedData = req.body
    console.log("a senha é: " + receivedData.senha)
    let salt = bcrypt.genSaltSync(10)
     receivedData.senha = bcrypt.hashSync(receivedData.senha, salt)


    if (data.length > 0) {
        dataToSave = [...data, receivedData]
    } else {
        dataToSave = [receivedData]
    }
    console.log(dados)
    escreverJson(dataToSave)
    
    return res.send(200)
})


server.post('/login/', (req, res) => {
    let data = readJson()
    let salt = bcrypt.genSaltSync(10)
    const dataToLogin = req.body
    console.log(data)
    console.log(dataToLogin)
    for(var i=0; i < dados.length; i++) {
        if (dataToLogin.cpf === data[i].cpf && bcrypt.hashSync(dataToLogin.senha, salt) === data[i].senha) {
            return res.send(200)        
        } 
    }

    
    return res.send(400)
})

server.listen(process.env.PORT || 5500, () => {
    console.log("O servidor está rodando na porta 5500!")
});
