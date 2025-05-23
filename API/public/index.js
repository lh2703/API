document.addEventListener("DOMContentLoaded", function () { 
    // funcão para carregar o arquivo JSON
    function carregarDados() {
        fetch('/data') // Agora buscando do servidor local
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na rede: ' + response.statusText); // Trata erros de rede
                }
                return response.json();
            })
            .then(dados => {
                mostrarDados(dados);  // Exibe os dados carregados
                configurarBusca(dados); // Ativa a busca
            })
            .catch(error => console.error('Erro ao carregar os dados:', error));
    }

    //  mostrar os dados na página
    function mostrarDados(lista) {
        const resultados = document.getElementById("resultados");
        resultados.innerHTML = ""; // Limpa a área de resultados

        lista.forEach(item => {
            const elemento = document.createElement("div");
            elemento.innerHTML = `
                <h2>${item.title}</h2>
                <p>${item.contentSnippet}</p>
                <a href="${item.link}" target="_blank">Leia mais</a>
                <hr>
            `;
            resultados.appendChild(elemento);
        });
    }

        //realizar busca
    function buscar(dados) {
        const termo = document.getElementById("search").value.toLowerCase();
        const filtrados = dados.filter(item => 
            item.title.toLowerCase().includes(termo) || 
            item.contentSnippet.toLowerCase().includes(termo)
        );
        mostrarDados(filtrados);
    }
        //realiza a busca conforme o usuario digita
        
    function configurarBusca(dados) {
        const inputSearch = document.getElementById("search");
        inputSearch.addEventListener("input", () => buscar(dados));  
    }

    carregarDados();
});
