// 1. ELEMENTOS DO DOM
const inputTitulo = document.querySelector("#input-titulo");
const btnAdicionar = document.querySelector("#btn-adicionar");
const listaFilmes = document.querySelector("#lista-filmes");
const mensagem = document.querySelector("#mensagem");

// 2. ESTADO DA APLICAÇÃO
let filmes = [];

// 3. FUNÇÕES

function salvarFilmes() {
  localStorage.setItem("meus_filmes", JSON.stringify(filmes));
}

function carregarFilmes() {
  const dados = localStorage.getItem("meus_filmes");
  if (dados) {
    filmes = JSON.parse(dados);
  } else {
    filmes = [];
  }
}

function adicionarFilme() {
  const titulo = inputTitulo.value.trim();

  if (titulo === "") {
    mensagem.textContent = "Digite o título do filme.";
    mensagem.className = "mensagem erro";
    return;
  }

  const novoFilme = {
    id: Date.now(),
    titulo: titulo,
    assistido: false
  };

  filmes.push(novoFilme);
  inputTitulo.value = "";

  mensagem.textContent = `Filme "${titulo}" adicionado com sucesso!`;
  mensagem.className = "mensagem sucesso";

  salvarFilmes();
  renderizarFilmes();
}

function alternarAssistido(id) {
  const filme = filmes.find(function (f) {
    return f.id === id;
  });

  if (filme) {
    filme.assistido = !filme.assistido;
    salvarFilmes();
    renderizarFilmes();
  }
}

function excluirFilme(id) {
  filmes = filmes.filter(function (filme) {
    return filme.id !== id;
  });

  mensagem.textContent = "Filme excluído.";
  mensagem.className = "mensagem";

  salvarFilmes();
  renderizarFilmes();
}

function renderizarFilmes() {
  listaFilmes.innerHTML = "";

  filmes.forEach(function (filme) {
    const li = document.createElement("li");
    li.className = "filme";
    if (filme.assistido) {
      li.classList.add("assistido");
    }

    // Título
    const spanTitulo = document.createElement("span");
    spanTitulo.className = "titulo-filme";
    spanTitulo.textContent = filme.titulo;
    li.appendChild(spanTitulo);

    // Botão de status
    const btnStatus = document.createElement("button");
    btnStatus.className = "btn-status";
    btnStatus.textContent = filme.assistido ? "Assistido" : "Não assistido";
    btnStatus.addEventListener("click", function () {
      alternarAssistido(filme.id);
    });
    li.appendChild(btnStatus);

    // Botão excluir
    const btnExcluir = document.createElement("button");
    btnExcluir.className = "btn-excluir";
    btnExcluir.textContent = "Excluir";
    btnExcluir.addEventListener("click", function () {
      excluirFilme(filme.id);
    });
    li.appendChild(btnExcluir);

    listaFilmes.appendChild(li);
  });
}

// 4. EVENTOS
btnAdicionar.addEventListener("click", adicionarFilme);

// Também permite adicionar com a tecla Enter
inputTitulo.addEventListener("keydown", function (evento) {
  if (evento.key === "Enter") {
    adicionarFilme();
  }
});

// 5. INICIALIZAÇÃO
carregarFilmes();
renderizarFilmes();