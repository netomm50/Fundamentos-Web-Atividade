const formProduto = document.querySelector("#form-produto");
const listaProdutos = document.querySelector("#lista-produtos");
const btnSubmit = document.querySelector("#btn-submit");
const contadorProdutos = document.querySelector("#contador-produtos");
const mensagemVazia = document.querySelector("#mensagem-vazia");

let itemEmEdicao = null;

function atualizarEstadoLista() {
  const totalItens = listaProdutos.querySelectorAll("li").length;

  contadorProdutos.textContent = `Produtos cadastrados: ${totalItens}`;

  if (totalItens === 0) {
    mensagemVazia.style.display = "block";
  } else {
    mensagemVazia.style.display = "none";
  }
}

atualizarEstadoLista();

formProduto.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nome = document.querySelector("#nome").value.trim();
  const preco = parseFloat(document.querySelector("#preco").value);
  const quantidade = parseInt(document.querySelector("#quantidade").value);

  if (quantidade <= 0) {
    alert("A quantidade deve ser maior que zero.");
    return;
  }

  const textoFormatado = `${nome} - R$ ${preco.toFixed(2)} (${quantidade} un.)`;

  if (itemEmEdicao) {
    const spanTexto = itemEmEdicao.querySelector(".info-produto");
    spanTexto.textContent = textoFormatado;

    itemEmEdicao.dataset.nome = nome;
    itemEmEdicao.dataset.preco = preco;
    itemEmEdicao.dataset.quantidade = quantidade;

    itemEmEdicao = null;
    btnSubmit.textContent = "Adicionar produto";
  } else {
    const item = document.createElement("li");

    item.dataset.nome = nome;
    item.dataset.preco = preco;
    item.dataset.quantidade = quantidade;

    const spanTexto = document.createElement("span");
    spanTexto.classList.add("info-produto");
    spanTexto.textContent = textoFormatado;

    const divAcoes = document.createElement("div");
    divAcoes.classList.add("acoes-item");

    const btnEditar = document.createElement("button");
    btnEditar.type = "button";
    btnEditar.textContent = "Editar";
    btnEditar.classList.add("btn-editar");
    btnEditar.addEventListener("click", function () {
      document.querySelector("#nome").value = item.dataset.nome;
      document.querySelector("#preco").value = item.dataset.preco;
      document.querySelector("#quantidade").value = item.dataset.quantidade;

      itemEmEdicao = item;
      btnSubmit.textContent = "Salvar alterações";
    });

    const btnRemover = document.createElement("button");
    btnRemover.type = "button";
    btnRemover.textContent = "Remover";
    btnRemover.classList.add("btn-remover");
    btnRemover.addEventListener("click", function () {
      if (itemEmEdicao === item) {
        itemEmEdicao = null;
        btnSubmit.textContent = "Adicionar produto";
        formProduto.reset();
      }

      item.remove();
      atualizarEstadoLista();
    });

    divAcoes.appendChild(btnEditar);
    divAcoes.appendChild(btnRemover);

    item.appendChild(spanTexto);
    item.appendChild(divAcoes);

    listaProdutos.appendChild(item);
  }

  formProduto.reset();
  atualizarEstadoLista();
});