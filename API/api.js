// Importando o CORS para permitir requisições cross cross-origin (origens diferentes)
import cors from 'cors';
// Usando o Express para criar a porta de acesso da API
import express from 'express';
// Usando a biblioteca RSS Parser
import RSSParser from 'rss-parser';
// Usando a biblioteca AWS SDK para conectar ao Bucket
import AWS from 'aws-sdk';
// Importando o .env
import dotenv from 'dotenv';

// Configura as variáveis de ambiente
// Só carrega o .env se as variáveis não estiverem definidas
if (
  !process.env.AWS_ACCESS_KEY_ID ||
  !process.env.AWS_SECRET_ACCESS_KEY ||
  !process.env.AWS_REGION ||
  !process.env.BUCKET_NAME
) {
  dotenv.config(); // Carrega o .env se necessário
  console.log('\n> Variáveis de Ambiente em falta.\n> Usando dotenv.');
} else {
  console.log(`\n> Usando Variáveis de Ambiente.`);
}

// Configurando as variáveis do Express
const app = express();
const port = 3000;

// Habilita o CORS
app.use(cors());

// Servir arquivos estáticos da pasta "public"
app.use(express.static('public'));

// Criando o objeto do S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Declarando a URL do RSS IGN
const feedUrl = 'https://feeds.feedburner.com/ign/games-all';

// Nome do bucket e arquivo
const BUCKET_NAME = process.env.BUCKET_NAME;
const FILE_NAME = 'feedData.json';

// Rota para buscar os dados do S3 e retornar em JSON
app.get('/data', async (req, res) => {
  try {
    const params = { Bucket: BUCKET_NAME, Key: FILE_NAME };

    // Baixa o arquivo do S3
    const data = await s3.getObject(params).promise();
    const jsonData = JSON.parse(data.Body.toString());

    res.json(jsonData); // Retorna o JSON na resposta
  } catch (error) {
    console.error('Erro ao buscar dados do S3:', error);
    res.status(500).json({ error: 'Erro ao buscar dados do S3' });
  }
});

// Inicia o servidor Express
app.listen(port, () => {
  console.log(`\nAPI rodando na porta ${port}\n`);
});

// Função para salvar dados no S3
const saveToS3 = async (data) => {
  const params = {
    Bucket: BUCKET_NAME, // Nome do Bucket
    Key: FILE_NAME, // Nome do arquivo JSON com o conteúdo do Feed
    Body: JSON.stringify(data), // O conteúdo do arquivo em formato JSON
    ContentType: 'application/json', // Tipo de conteúdo
  };

  // Log da tentativa de salvamento no Bucket S3
  try {
    const result = await s3.upload(params).promise();
    console.log('Dados enviados para o S3:', result.Location);
  } catch (error) {
    console.error('Erro ao enviar para o S3:', error);
  }
};

// Define a função de processamento do feed
const parse = async (url) => {
  // A função parse é uma função assíncrona (indicado pelo async), o que significa que ela lida com operações que podem demorar, como acessar a URL do feed e pegar os dados.

  const feed = await new RSSParser().parseURL(url); // Lê o feed e retorna em um objeto JSON

  // Exibe uma mensagem no console dizendo que o processamento do feed começou
  console.log(`\nProcessando artigos de: "${feedUrl}"\n\n`);

  console.log('Título do Feed RSS: ' + feed.title + '\n\n'); // Exibe o título do feed

  const feedData = []; // Vetor para armazenar o conteúdo do feed

  feed.items.forEach((item) => {
    // Exibe cada item do feed, contendo título, link e um resuminho
    //console.log(`${item.title}\n${item.link}\n${item.contentSnippet}\n\n`); // Usado apenas para Debug
    // Insere o valor de cada item no feedData com um push (adição no final do vetor)
    feedData.push({
      title: item.title, // Título do item
      link: item.link, // Link do item
      contentSnippet: item.contentSnippet, // Resumo do item
    });
  });

  // Salvar os dados processados no S3
  await saveToS3(feedData);
  console.log(`\nJSON do RSS saindo em :${port}/data`);
};

// Chamando o processamento de feed na URL
parse(feedUrl);
