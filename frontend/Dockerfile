# Use uma imagem base adequada para o frontend, por exemplo, Node.js 18
FROM node:18

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie o package.json e package-lock.json
COPY package.json package-lock.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Construa a aplicação para produção
RUN npm run build

# Exponha a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para rodar a aplicação Next.js
CMD ["npm", "start"]