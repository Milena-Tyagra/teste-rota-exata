
function pageLanding(req, res) {
    return res.render("index.html")
}

function pageForm(req, res) {
    return res.render("formulario.html")
}

function pagePortal(req, res) {
    return res.render("portal.html")
}

function pageTable(req, res){
    return res.render("tabela.html")
}

module.exports = {
    pageLanding,
    pageForm,
    pagePortal,
    pageTable,
}