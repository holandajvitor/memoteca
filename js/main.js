import ui from "./ui.js"; // Importa o módulo ui que lida com a interface de usuário.
import api from "./api.js"; // Importa o módulo api que lida com as requisições à API.

document.addEventListener("DOMContentLoaded", () => {
  // Quando o DOM estiver totalmente carregado, renderiza os pensamentos existentes.
  ui.renderizarPensamentos();

  const formularioPensamento = document.getElementById("pensamento-form"); // Seleciona o formulário pelo ID.
  const botaoCancelar = document.getElementById("botao-cancelar"); // Seleciona o botão de cancelar pelo ID.

  // Adiciona o listener para submissão do formulário e o clique no botão cancelar.
  formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario);
  botaoCancelar.addEventListener("click", manipularCancelamento);
});

// Função que manipula a submissão do formulário de pensamento.
async function manipularSubmissaoFormulario(event) {
  event.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página).

  const id = document.getElementById("pensamento-id").value; // Captura o valor do campo de ID (se estiver preenchido).
  const conteudo = document.getElementById("pensamento-conteudo").value; // Captura o valor do campo de conteúdo do pensamento.
  const autoria = document.getElementById("pensamento-autoria").value; // Captura o valor do campo de autoria do pensamento.

  try {
    if (id) {
      await api.editarPensamento({ id, conteudo, autoria });
    } else {
      // Faz uma requisição para salvar o pensamento utilizando a API.
      await api.salvarPensamento({ conteudo, autoria });
    }

    ui.renderizarPensamentos(); // Após salvar, renderiza os pensamentos atualizados na tela.
  } catch {
    alert("Erro ao salvar pensamento"); // Exibe um alerta em caso de erro.
  }
}

// Função que manipula o clique no botão "Cancelar".
function manipularCancelamento() {
  ui.limparFormulario(); // Chama a função de limpar o formulário, resetando todos os campos.
}
