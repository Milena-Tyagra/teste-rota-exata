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



function writeJson(dados) {
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
    writeJson(dataToSave)
    
    return res.send(200)
})


server.post('/login/', (req, res) => {
    console.log("req: " + req.body)
    let data = readJson()
    //let salt = bcrypt.genSaltSync(10)
    const dataToLogin = req.body
    console.log("banco: " + data)
    console.log("login: ")
    console.log(dataToLogin)
    for(var i=0; i < data.length; i++) {
        const verified = bcrypt.compareSync(dataToLogin.senha, data[i].senha)
        if (dataToLogin.cpf === data[i].cpf && verified) {
            res.send(200)        
        } 
    }


    res.status(302).send({
        sucess: false,
        message: "mensagem"
    })
})

server.listen(process.env.PORT || 5500, () => {
    console.log("O servidor está rodando na porta 5500!")
});
