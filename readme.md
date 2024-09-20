# Desafio Full Stack

Este projeto é uma aplicação Full Stack desenvolvida como parte de um teste técnico. A aplicação consiste em uma API construída em PHP e um frontend desenvolvido em NextJS.

## Link para Acesso

[Desafio Full Stack](https://desafio-full-stack-red.vercel.app/niveis)

**Observação:** O deploy foi realizado utilizando o freetier da plataforma Render, portanto, a primeira requisição pode levar até 50 segundos para ser processada.

## Instruções para Subir o Backend

1. Execute o comando para construir e subir os containers:
    ```bash
    docker-compose up --build -d
    ```

2. Crie um arquivo `.env` na pasta `backend` e insira as seguintes configurações:
    ```env
    APP_ENV=local
    DB_CONNECTION=pgsql
    DB_HOST=postgres
    DB_PORT=5432
    DB_DATABASE=desafio_fullstack
    DB_USERNAME=root
    DB_PASSWORD=root
    ```

3. Execute o seguinte comando para acessar o container do backend:
    ```bash
    docker exec -it desafio-fullstack-backend-1 bash
    ```

4. Dentro do container, execute as migrações e seeds do banco de dados:
    ```bash
    php artisan migrate --seed
    ```

Após esses passos, a API estará rodando e será possível acessar a documentação Swagger da aplicação em: `http://localhost:8000/api/documentation#/default`

## Instruções para Subir o Frontend

Após executar o comando `docker-compose up --build -d`, o frontend estará disponível em: `http://localhost:3000`

## Tecnologias Utilizadas

- **Backend:** PHP, Laravel, PostgreSQL
- **Frontend:** NextJS, React


