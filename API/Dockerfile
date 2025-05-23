# Usa uma imagem oficial do Node.js como base
FROM node:18

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos para dentro do contêiner
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código para o contêiner
COPY . .

# Expõe a porta usada pela API
EXPOSE 3000

# Comando para rodar a API
CMD ["node", "api.js"]