'use strict';

let qtdePop = 0;

const addPop = () => {
    // limita as populações
    // if (qtdePop >= 5) return;

    qtdePop++;
    const parent = document.getElementById("div-pop");
    parent.appendChild(criarNovaPopulacao());
}

const rmvPop = () => {
    // não executa se só tiver um elemento
    if (qtdePop <= 1) return;

    const ultimaPop = document.getElementById(`div-pop-${qtdePop}`);
    const parent = ultimaPop ? ultimaPop.parentNode : null;
    if (parent) {
        parent.removeChild(ultimaPop);
        qtdePop--;
    }
}

const criarNovaPopulacao = () => {
    // elementos
    let divPop = document.createElement("div");
    let labelNome = document.createElement("label");
    let brNome = document.createElement("br");
    let inputNome = document.createElement("input");
    let brDiv = document.createElement("br");
    let labelPop = document.createElement("label");
    let brPop = document.createElement("br");
    let inputPop = document.createElement("input");
    
    // atributos
    divPop.setAttribute("id", `div-pop-${qtdePop}`);

    // nome da população
    labelNome.setAttribute("for", `nome-${qtdePop}`);
    labelNome.innerText = `Informe o nome da população ${qtdePop}`;
    inputNome.setAttribute("type", "text");
    inputNome.setAttribute("id", `nome-${qtdePop}`);
    inputNome.setAttribute("placeholder", "Nome da população")

    // tamanho da população
    labelPop.setAttribute("for", `populacao-${qtdePop}`);
    labelPop.innerText = `Informe o tamanho da população ${qtdePop}`;
    inputPop.setAttribute("type", "number");
    inputPop.setAttribute("id", `populacao-${qtdePop}`);
    inputPop.setAttribute("placeholder", "Tamanho da população")
    inputPop.setAttribute("min", 1);

    // adiciona os elementos na div
    divPop.appendChild(labelNome);
    divPop.appendChild(brNome);
    divPop.appendChild(inputNome);
    divPop.appendChild(brDiv);
    divPop.appendChild(labelPop);
    divPop.appendChild(brPop);
    divPop.appendChild(inputPop);

    // retorna pra função e adiciona no html
    return divPop;
}

const calcular = () => {
    // valores da populção
    let populacoes = valoresPopulacao();
    // nomes das populações
    let nomes = nomesPopulacao();
    // Soma dos elementos do array população
    let somaPopulacao = populacoes.reduce((a, b) => a + b, 0);
    // valor da amostra
    let amostra = calcularAmostra(somaPopulacao);
    // porcentagem da amostra
    let porcentagem = (amostra/ somaPopulacao);

    // impede da tabela ser gerada caso nenhum valor esteja definido
    if (isNaN(porcentagem)) return;

    let tabela = document.getElementById("tabela");
    tabela.innerHTML = criarTabela(porcentagem, amostra, populacoes, nomes, somaPopulacao);

    // esconde as formulas
    formulas("none");
}

const nomesPopulacao = () => {
    let nomes = [];

    for (let index = 1; index <= qtdePop; index++) {
        let val_name = document.getElementById(`nome-${index}`).value;
        nomes.push(val_name);
    }

    return nomes;
}

const valoresPopulacao = () => {
    let populacoes = [];

    for (let index = 1; index <= qtdePop; index++) {
        let val_pop = Number(document.getElementById(`populacao-${index}`).value);
        populacoes.push(val_pop);
    }

    return populacoes;
}

const calcularAmostra = (somaPopulacao) => {
    let erroAmostral = Number(document.getElementById("erroAmostral").value);
    // Erro amostral não pode ser menor que 1 e maior que 100
    if (erroAmostral > 100) erroAmostral = 100;
    else if (erroAmostral < 1) erroAmostral = 1;

    // Erro amostral (%) em decimal
    let erroDecimal = erroAmostral/100;

    let tamanhoAmostra = Math.ceil(1/Math.pow(erroDecimal, 2));

    let amostra = Math.ceil((somaPopulacao * tamanhoAmostra)/(somaPopulacao + tamanhoAmostra));

    // valores das formulas
    document.getElementById("erroDecimal").value = erroDecimal;
    document.getElementById("tamanhoAmostra").value = tamanhoAmostra;
    document.getElementById("somaPopulacao").value = somaPopulacao;
    document.getElementById("amostra").value = amostra;

    return amostra;
}

const criarTabela = (porcentagemDecimal, amostra, populacoes, nomes, somaPopulacao) => {
    let porcentagem = porcentagemDecimal * 100;
    let tabela = `<table><tr> <th>Nome</th> <th>População</th> <th>Amostra de ${parseFloat(porcentagem.toFixed(2))}%</th></tr>`;

    for (let index = 0; index < populacoes.length; index++) {
        let populacao = populacoes[index];
        let tamanho = Math.round(populacao * porcentagemDecimal);
        let nome = (nomes[index].length > 0) ? nomes[index] : `População ${index + 1}`
        tabela += `<tr> <td>${nome}</td> <td>${populacao}</td> <td>${tamanho}</td>`;
    }
    tabela += `<tr> <td>Total</td> <td>${somaPopulacao}</td> <td>${amostra}</td></tr></table>`;

    return tabela;
}

const formulas = (estiloFormula) => {
    document.getElementById("divMostrarFormulasN0").style.display = estiloFormula;
    document.getElementById("divMostrarFormulasN").style.display = estiloFormula;
    document.getElementById("divBotaoEsconderFormulasId").style.display = estiloFormula;

    let estiloBotao = (estiloFormula == "block") ? "none" : "block";
    document.getElementById("divBotaoMostrarFormulasId").style.display = estiloBotao;

    // atribui valor ao campo de erro decimal
    document.getElementById("spanErroDecimal").innerHTML = document.getElementById("erroDecimal").value;

    // atribui valor aos campos de tamanho de amostra
    let spanTA = document.getElementsByClassName("spanTamanhoAmostra");
    for (let i = 0; i < spanTA.length; i++) 
        spanTA[i].innerHTML = document.getElementById("tamanhoAmostra").value;

    // atribui valor aos campos da população
    let spanP = document.getElementsByClassName("spanPopulacao");
    for (let i = 0; i < spanP.length; i++)
        spanP[i].innerHTML = document.getElementById("somaPopulacao").value;

    // atribui valor ao campo da amostra
    document.getElementById("spanAmostra").innerHTML = document.getElementById("amostra").value;
}
