# 📋 **Descrição**
API em JavaScript dockerizada que extrai conteúdo RSS do portal IGN, armazena em um bucket AWS S3 e exibe as notícias em uma página HTML.

Essa aplicação foi desenvolvida em equipe.

# 🌟 **Funcionalidades**
- Extração e leitura do RSS do portal IGN (categoria Games)
- Armazenamento do conteúdo RSS em arquivo JSON no bucket S3
- Dockerização da API e deploy em instância EC2 da AWS

# 🛠️ **Tecnologias Utilizadas**
- **JavaScript**
- **HTML**
- **CSS**
- **Docker**
- **AWS EC2**
- **AWS S3**

# 📦 **Como utilizar o sistema**
1. Clone este repositório ou faça o download do projeto.
2. Na pasta **/API**, execute **npm install**.
3. Configure o arquivo *.env* com suas credenciais AWS e configurações necessárias:
    ````
    PORT=3000
    AWS_ACCESS_KEY_ID=[SUA_CHAVE]
    AWS_SECRET_ACCESS_KEY=[SUA_CHAVE_SECRETA]
    AWS_SESSION_TOKEN=[SEU_TOKEN]  # Se houver
    AWS_REGION=[SUA_REGIÃO_AWS]
    BUCKET_NAME=[NOME_DA_SUA_BUCKET_S3]
    ````

4. Na pasta **/API**, execute **docker-compose up --build**.
5. Abra o navegador em **http://localhost:3000** para acessar a página HTML.

# Acesso Remoto
- Requer IP público da instância EC2 e abertura das portas necessárias.
- Contate os responsáveis pela AWS para obter acesso.

## 📁**Estrutura do Projeto**
```

.
├── API/                                # Códigos da Aplicação
│   ├── Publics/                        # Arquivos públicos estáticos
│   │    ├── index.js                   # Lógica e interações da página (JavaScript)
│   │    ├── index.html                 # Estrutura da página web (HTML)
│   │    ├── styles.css                 # Estilização da página (CSS)
│   ├── .dockerignore
│   ├── api.js                          # Código principal da API
│   ├── docker-compose.yml              # Configuração do Docker Compose
│   ├── Dockerfile                      # Arquivo Docker para construir a imagem
│   ├── package.json                    # Dependências do Node.js
│   ├── package-lock.json               # Lockfile das dependências
├── README.md                           # Documentação do projeto

```


## 👥 Equipe

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/EmanuelleMeireles.png" width="100"><br>
      <strong>Emanuelle Meireles</strong><br>
      <a href="https://www.linkedin.com/in/emanuelle-meireles-a4b331317/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn Emanuelle"></a>
      <a href="https://github.com/EmanuelleMeireles"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Leonardo"></a>
    </td>
    <td align="center">
      <img src="https://github.com/lh2703.png" width="100"><br>
      <strong>Luis Henrique Trindade</strong><br>
      <a href="https://www.linkedin.com/in/luis-henrique-trindade-de-carvalho-2727922a1/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn Luis Henrique"></a> 
      <a href="https://github.com/lh2703"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Luis Henrique"></a>
    </td>
    <td align="center">
      <img src="https://github.com/eichfernandes.png" width="100"><br>
      <strong>Rafael Eich Fernandes</strong><br>
      <a href="https://www.linkedin.com/in/rafael-eich-fernandes-521623232/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn Rafael Eich"></a> 
      <a href="https://github.com/eichfernandes"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Rafael Eich"></a>
  </tr>
</table>
