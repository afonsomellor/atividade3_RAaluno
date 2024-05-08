//simula um banco de dados em memória
var alunos = []

//guarda o objeto que está sendo alterado
var alunoAlterado = null

function adicionar(){
    //libera para digitar o RA
    document.getElementById("RA").disabled = false
    alunoAlterado = null
    mostrarModal()
    limparForm()
}
function alterar(RA){

    //procurar o aluno que tem o RA clicado no alterar
    for(let i = 0; i < alunos.length; i++){
        let aluno = alunos[i]
        if (aluno.RA == RA){
            //achou o aluno, entao preenche o form
            document.getElementById("RA").value = aluno.RA
            document.getElementById("nome").value = aluno.nome
            document.getElementById("Cidade").value = aluno.Cidade
            document.getElementById("Estado").value = aluno.Estado
            document.getElementById("Curso").value = aluno.Curso
            alunoAlterado = aluno
        }
    }
    //bloquear o RA para nao permitir alterá-lo
    document.getElementById("RA").disabled = true
    mostrarModal()
}
function excluir(RA){
    if (confirm("Você deseja realmente excluir?")){
        for(let i=0; i < alunos.length; i++){
            let aluno = alunos[i]
            if (aluno.RA == RA){
                //remove o elemento encontrado na posição "i"
                alunos.splice(i, 1) 
            }
        }
        exibirDados()
    }
}
function mostrarModal(){
    let containerModal = document.getElementById("container-modal")
    containerModal.style.display = "flex"
}
function ocultarModal(){
    let containerModal = document.getElementById("container-modal")
    containerModal.style.display = "none"
}
function cancelar(){
    ocultarModal()
    limparForm()
}
function salvar(){
    let RA = document.getElementById("RA").value
    let nome = document.getElementById("nome").value
    let Cidade = document.getElementById("Cidade").value
    let Estado = document.getElementById("Estado").value
    let Curso = document.getElementById("Curso").value

    //se não estiver alterando ninguém, adiciona no vetor
    if (alunoAlterado == null){
        let aluno = {
            "RA": RA,
            "nome": nome,
            "Cidade": Cidade,
            "Estado": Estado,
            "Curso": Curso

        }
        //adiciona o objeto aluno no vetor de alunos
        alunos.push(aluno)
    }else{
        alunoAlterado.RA = RA
        alunoAlterado.nome = nome
        alunoAlterado.Cidade = Cidade
        alunoAlterado.Estado = Estado
        alunoAlterado.Curso = Curso
        
    }

    alunoAlterado = null

    //limpa o form
    limparForm()

    ocultarModal()

    exibirDados()
}

function exibirDados(){

    let tbody = document.querySelector("#table-customers tbody")

    //antes de listar os alunos, limpa todas as linhas
    tbody.innerHTML = ""

    for(let i = 0; i < alunos.length; i++){
        let linha = `
        <tr>
            <td>${alunos[i].RA}</td>
            <td>${alunos[i].nome}</td>
            <td>${alunos[i].Cidade}</td>
            <td>${alunos[i].Estado}</td>
            <td>${alunos[i].Curso}</td>
            <td>
                <button onclick="alterar('${alunos[i].RA}')">Alterar</button>
                <button onclick="excluir('${alunos[i].RA}')" class= "botao-excluir">Excluir</button>
            </td>
        </tr>`
        
        let tr = document.createElement("tr")
        tr.innerHTML = linha

        tbody.appendChild(tr)
    }

}
function limparForm(){
    document.getElementById("RA").value = ""
    document.getElementById("nome").value = ""
    document.getElementById("Cidade").value = ""
    document.getElementById("Estado").value = ""
    document.getElementById("Curso").value = ""

}