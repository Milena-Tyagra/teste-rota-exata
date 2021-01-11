
const listaProdutos = [
    {
    "nome": "Produto 1",
    "descricao": "Descrição do produto 1",
    "valor": 50,
    "opcionais": 
        [
        "Opcional 1",
        "Opcional 2",
        "Opcional 3"
        ]
    },
    {
    "nome": "Produto 2",
    "descricao": "Descrição do produto 2",
    "valor": 75,
    "opcionais": 
        [
        "Opcional 1",
        "Opcional 2",
        "Opcional 3",
        "Opcional 4"
        ]
    },
    {
    "nome": "Produto 3",
    "descricao": "Descrição do produto 3",
    "valor": 100,
    "opcionais": 
        [
        "Opcional 1",
        "Opcional 2"
        ]
        }
]

function Listar(){
    $("#tblListar").html("");
    $("#tblListar").html(
        "<thead>"+
        "   <tr>"+
        "   <th>Nome</th>"+
        "   <th>Descrição</th>"+
        "   <th>Valor</th>"+
        "   <th>Opcionais</th>"+
        "   </tr>"+
        "</thead>"+
        "<tbody>"+
        "</tbody>"
        );
    for(var p in listaProdutos){
        console.log(listaProdutos[p].opcionais);
        $("#tblListar tbody").append("<tr>");
        $("#tblListar tbody").append(`<td> ${listaProdutos[p].nome}</td>`);
        $("#tblListar tbody").append(`<td> ${listaProdutos[p].descricao}</td>`);
        $("#tblListar tbody").append(`<td> ${listaProdutos[p].valor}</td>`);
        $("#tblListar tbody").append(`<td>${obterListaDeOpcionais(listaProdutos[p].opcionais)}</td>`);
        $("#tblListar tbody").append("</tr>");
    }
}

function obterListaDeOpcionais(opcionais) {
    const itens = opcionais.map(item => `<li>${item}</li>`).join("")
    return `<ul>${itens}</ul>`
}


function ordenarLista() {
  const listaOrdenada = listaProdutos.reverse()
  $("#tblListar").html("");
    $("#tblListar").html(
        "<thead>"+
        "   <tr>"+
        "   <th>Nome</th>"+
        "   <th>Descrição</th>"+
        "   <th>Valor</th>"+
        "   <th>Opcionais</th>"+
        "   </tr>"+
        "</thead>"+
        "<tbody>"+
        "</tbody>"
        );
    for(var p in listaOrdenada){
        console.log(listaOrdenada[p].opcionais);
        $("#tblListar tbody").append("<tr>");
        $("#tblListar tbody").append(`<td> ${listaOrdenada[p].nome}</td>`);
        $("#tblListar tbody").append(`<td> ${listaOrdenada[p].descricao}</td>`);
        $("#tblListar tbody").append(`<td> ${listaOrdenada[p].valor}</td>`);
        $("#tblListar tbody").append(`<td>${obterListaDeOpcionais(listaOrdenada[p].opcionais)}</td>`);
        $("#tblListar tbody").append("</tr>");
    }
}
  
