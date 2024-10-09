# Especifica a versão do node
FROM node:20.12.2

# Defini o diretório de trabalho
WORKDIR /blog-api

# Copia o package.json e package-lock.json
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Instala o netcat (nc)
RUN apt-get update && apt-get install -y netcat-openbsd

# Copia todo o código da aplicação
COPY . .

# Porta que a aplicação vai rodar
EXPOSE 3000

# Comando para rodar o servidor com o nodemon
CMD ["npx", "nodemon", "server.js"]
