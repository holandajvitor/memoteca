const URL_BASE = "http://localhost:3000";

const api = {
  async buscarPensamentos() {
    try {
      // Realiza uma requisição GET para o endpoint "/pensamentos" na API local.
      const response = await axios.get(`${URL_BASE}/pensamentos`);
      // Converte a resposta da requisição em JSON e retorna os dados.
      return await response.data;
    } catch {
      // Exibe um alerta se houver um erro ao buscar os pensamentos.
      alert("Erro ao buscar pensamentos");
      // Lança o erro para ser tratado em outro lugar.
      throw error;
    }
  },

  async salvarPensamento(pensamento) {
    try {
      // Realiza uma requisição POST para o endpoint "/pensamentos" da API local.
      // Essa requisição é usada para adicionar um novo pensamento ao banco de dados.
      const response = await axios.post(`${URL_BASE}pensamentos`, pensamento);
      // Aguarda a resposta da API, converte a resposta para JSON e retorna os dados.
      return await response.data;
    } catch {
      // Exibe um alerta caso ocorra um erro durante o envio do pensamento.
      alert("Erro ao salvar pensamentos");
      throw error; // Lança o erro para ser tratado em outro lugar.
    }
  },

  async buscarPensamentoPorId(id) {
    // Função para buscar um pensamento específico baseado em seu ID
    try {
      const response = await axios.get(`${URL_BASE}/pensamentos/${id}`); // Realiza uma requisição GET para o endpoint "/pensamentos/{id}" da API local.

      return await response.data; // Converte a resposta da requisição em JSON e retorna o pensamento buscado.
    } catch {
      alert("Erro ao buscar pensamento");

      throw error;
    }
  },

  async editarPensamento(pensamento) {
    // Função para editar um pensamento existente
    try {
      // Realiza uma requisição PUT para o endpoint "/pensamentos/{id}" da API local.
      // A requisição PUT é usada para substituir os dados do pensamento existente pelo novo conteúdo enviado.
      const response = await axios.put(
        `${URL_BASE}/pensamentos/${pensamento.id}`,
        pensamento
      );

      return await response.data; // Aguarda a resposta da API, converte a resposta para JSON e retorna os dados.
    } catch {
      alert("Erro ao editar pensamento"); // Exibe um alerta caso ocorra um erro durante a edição do pensamento.
      throw error; // Lança o erro para ser tratado em outro lugar.
    }
  },

  async excluirPensamento(id) {
    //Função para excluir um pensamento
    try {
      // Realiza uma requisição DELETE para o endpoint "/pensamentos/{id}" da API local.
      // O método DELETE é usado para remover o pensamento que possui o ID fornecido.
      const response = await axios.delete(`${URL_BASE}/pensamentos/${id}`);
    } catch {
      alert("Erro ao excluir um pensamento");
      throw error;
    }
  },
};

export default api; // Exporta o objeto api, contendo a função para buscar pensamentos.
