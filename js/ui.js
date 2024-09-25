import api from "./api.js"; // Importa o módulo api para acessar as funções da API.

const ui = {
  async preencherFormulario(pensamentoId) {
    // Busca o pensamento pelo ID e preenche o formulário com os dados do pensamento.
    const pensamento = await api.buscarPensamentoPorId(pensamentoId);
    document.getElementById("pensamento-id").value = pensamento.id; // Preenche o campo de ID do formulário.
    document.getElementById("pensamento-conteudo").value = pensamento.conteudo; // Preenche o campo de conteúdo do formulário.
    document.getElementById("pensamento-autoria").value = pensamento.autoria; // Preenche o campo de autoria do formulário.
  },

  limparFormulario() {
    // A função reseta o formulário, limpando todos os campos.
    document.getElementById("pensamento-form").reset();
  },

  async renderizarPensamentos() {
    const listaPensamentos = document.getElementById("lista-pensamentos");
    const mensagemVazia = document.getElementById("mensagem-vazia");
    listaPensamentos.innerHTML = ""; // Limpa a lista de pensamentos atual.

    try {
      const pensamentos = await api.buscarPensamentos(); // Busca pensamentos da API.

      if (pensamentos.length === 0) {
        mensagemVazia.style.display = "block"; // Exibe a mensagem se a lista estiver vazia.
      } else {
        mensagemVazia.style.display = "none"; // Oculta a mensagem se houver pensamentos.
        pensamentos.forEach(ui.adicionarPensamentoNaLista); // Renderiza os pensamentos.
      }
    } catch {
      alert("Erro ao renderizar pensamentos"); // Exibe erro se houver falha.
    }
  },

  adicionarPensamentoNaLista(pensamento) {
    // Função responsável por criar e adicionar um pensamento na lista de pensamentos.
    const listaPensamentos = document.getElementById("lista-pensamentos"); // Seleciona o elemento <ul> da lista de pensamentos.
    const li = document.createElement("li"); // Cria um novo elemento <li> para cada pensamento.
    li.setAttribute("data-id", pensamento.id); // Define o atributo 'data-id' no <li> para armazenar o ID do pensamento.
    li.classList.add("li-pensamento"); // Adiciona uma classe para estilização do <li>.

    const iconeAspas = document.createElement("img"); // Cria um elemento <img> para as aspas azuis.
    iconeAspas.src = "assets/imagens/aspas-azuis.png"; // Define o caminho da imagem.
    iconeAspas.alt = "Aspas azuis"; // Define o texto alternativo da imagem.
    iconeAspas.classList.add("icone-aspas"); // Adiciona uma classe para estilização da imagem.

    const pensamentoConteudo = document.createElement("div"); // Cria um <div> para exibir o conteúdo do pensamento.
    pensamentoConteudo.textContent = pensamento.conteudo; // Define o texto do conteúdo com o valor do pensamento.
    pensamentoConteudo.classList.add("pensamento-conteudo"); // Adiciona uma classe para estilização do conteúdo.

    const pensamentoAutoria = document.createElement("div"); // Cria um <div> para exibir a autoria ou fonte do pensamento.
    pensamentoAutoria.textContent = pensamento.autoria; // Define o texto da autoria com o valor do pensamento.
    pensamentoAutoria.classList.add("pensamento-autoria"); // Adiciona uma classe para estilização da autoria.

    // Cria um botão de editar o pensamento.
    const botaoEditar = document.createElement("button");
    botaoEditar.classList.add("botao-editar");
    botaoEditar.onclick = () => ui.preencherFormulario(pensamento.id); // Define o evento de clique para preencher o formulário com os dados do pensamento selecionado.

    const iconeEditar = document.createElement("img"); // Cria um ícone para o botão de editar.
    iconeEditar.src = "assets/imagens/icone-editar.png"; // Define o caminho da imagem do ícone de editar.
    iconeEditar.alt = "Editar"; // Define o texto alternativo do ícone.
    botaoEditar.appendChild(iconeEditar); // Adiciona o ícone de editar ao botão de editar.

    // Cria um botão de excluir o pensamento.
    const botaoExcluir = document.createElement("button");
    botaoExcluir.classList.add("botao-excluir");
    botaoExcluir.onclick = async () => {
      // Define o evento de clique para excluir o pensamento.
      try {
        await api.excluirPensamento(pensamento.id); // Chama a função de exclusão da API com o ID do pensamento.
        ui.renderizarPensamentos(); // Após excluir, renderiza novamente a lista de pensamentos.
      } catch (error) {
        alert("Erro ao excluir pensamento"); // Exibe um alerta em caso de erro ao excluir o pensamento.
      }
    };

    const iconeExcluir = document.createElement("img"); // Cria um ícone para o botão de excluir.
    iconeExcluir.src = "assets/imagens/icone-excluir.png"; // Define o caminho da imagem do ícone de excluir.
    iconeExcluir.alt = "Excluir"; // Define o texto alternativo do ícone.
    botaoExcluir.appendChild(iconeExcluir); // Adiciona o ícone de excluir ao botão de excluir.

    const icones = document.createElement("div"); // Cria um <div> para armazenar os botões de editar e excluir.
    icones.classList.add("icones"); // Adiciona uma classe para estilização do contêiner de ícones.
    icones.appendChild(botaoEditar); // Adiciona o botão de editar ao <div>.
    icones.appendChild(botaoExcluir); // Adiciona o botão de excluir ao <div>.

    // Adiciona os elementos criados (imagem, conteúdo, autoria e ícones) como filhos do <li>.
    li.appendChild(iconeAspas); // Adiciona a imagem das aspas ao <li>.
    li.appendChild(pensamentoConteudo); // Adiciona o conteúdo do pensamento ao <li>.
    li.appendChild(pensamentoAutoria); // Adiciona a autoria do pensamento ao <li>.
    li.appendChild(icones); // Adiciona os ícones (editar e excluir) ao <li>.
    listaPensamentos.appendChild(li); // Adiciona o <li> criado à lista de pensamentos (<ul>).
  },
};

export default ui; // Exporta o objeto ui contendo a função de renderizar os pensamentos.
