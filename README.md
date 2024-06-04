# `Pass.in` API

Esse reposítório é o back-end do projeto `pass.in`.

A intenção principal desse projeto é o aprendizado, por isso por mais que não tenha muitas features, nem uma regra de negócio complexa e ideal, ele foi desenvolvido com conceitos e técnicas sólidas da programação.

## Índice

- [Funcionamento do App](#funcionamento-do-app)
- [Detalhes](#detalhes)
- [Especificações das Tecnologias](#especificações-das-tecnologias)
- [Requisitos funcionais](#requisitos-funcionais)
- [Regras de negócio](#regras-de-negócio)
- [Requisitos não-funcionais](#requisitos-não-funcionais)
- [Rotas da aplicação](#rotas-da-aplicação)
- [Iniciar a aplicação](#iniciar-a-aplicação)

## Funcionamento do App
`Pass.in` é uma aplicação de gestão de participantes em eventos presenciais.

A ferramenta permite que o organizador cadastre um evento e abra uma página pública de inscrição.

Os participantes inscritos podem emitir uma credencial para check-in no dia do evento.

O sistema fará um scan da credencial do participante para permitir a entrada no evento.

Na criação o organizador do evento pode definir o número máximos de participantes que ele deseja que o evento tenha.

Para o participante fazer o check-in ele deve escanear um qr code com o celular.

## Detalhes
Essa API foi desenvolvida para ser utilizada pelo o front-end que está disponível [nesse repositório](https://github.com/LucasLessaAnacleto/pass-in).

Esse app foi feito junto ao NLW 2024, um evento gratuito da [rockeatseat](https://www.youtube.com/@rocketseat).

O objetivo desse projeto é o aprendizado!

O banco de dados utilizado, foi o SQLite.

SQLite é um sistema de gerenciamento de banco de dados relacional que é autocontido, serverless e não requer configuração. Uma das principais características do SQLite é que ele armazena todo o banco de dados em um único arquivo, o que o torna simples de implantar e usar em aplicativos.

Isso é interessante, pois quando se usa prisma + SQLite, não precisa fazer muita coisa além de configurar o prisma para utilizar o SQLite, que já é possível utilizar o banco sem ter a necessidade de instalar um banco de dados, ter ela rodando no localhost da máquina e conectar devidamente com o banco, como no caso do MySQL, PostgreSQL, MongoDB e vários outros. 

Óbvio que o SQLite não é adequado para aplicativos de grande escala ou com muitas conexões simultâneas. Em comparação com os outros bancos citados acima ele possui suporte limitado para recursos avançados de banco de dados, como transações distribuídas e concorrência em larga escala.

Mas aqui como é utilizado apenas para desenvolvimento é muito conveniente.

## Especificações das Tecnologias

Node.js como ambiente de execução.
- **v20.6.1**

Typescript adicionando tipagem estática.
- **typescript@5.4.4**: biblioteca principal, o core do typescript. Com ele é possível detectar erros de tipo em tempo de compilação, melhorando a legibilidade do código e facilitando a manutenção.

- **tsx@4.7.2**: uma forma mais produtiva de utilizar o typescript em desenvolvimento, ele oculta todo o processo de transpilação fazendo tudo por baixo dos panos para que nos preocupamos apenas na execução do código

- **tsup@8.0.2**: Com o tsup, é possível transpilar e empacotar seus projetos TypeScript com apenas algumas configurações mínimas, acelerando o processo de desenvolvimento e produção.

- **@types/node@20.12.4**: fornece definições de tipos e interfaces nativos do Node.js, incluindo para módulos internos do Node.js, como fs, nts, stream e outros.

Fastify para criar o servidor HTTP e todas as rotas dos endpoints
- **fastify@4.26.2**: Com suporte para rotas, plugins, middlewares e validação de entrada integrada, ótimo para criação de APIs e é conhecido por sua velocidade e baixo consumo de recursos. 

- **@fastify/cors@9.0.1**: é um plugin para o Fastify que facilita a configuração e o uso do CORS (Cross-Origin Resource Sharing), permitindo que os desenvolvedores definam quais os domínios permitidos para fazer requisições, os métodos de solicitação e os cabeçalhos necessário para interagir com a api.

- **fastify-type-provider-zod@1.1.9**: é um plugin para o Fastify que facilita a validação e a transformação de dados de entrada em APIs usando esquemas definidos com a biblioteca Zod. 

Zod para validar os dados de entrada e saída do endpoint.
- **zod@3.22.4**: é uma biblioteca que deixa as validações de tipos primitivos, objetos, arrays, esquemas muito fácil e eficiente. Ele valida os dados em tempo de execução garantindo exatamente que cada variável esteja no formato correto.

Prisma como ORM (Object-Relational Mapping).
- **prisma@5.12.1**: fornecendo uma camada de abstração para interagir com o banco de dados. Ele oferece uma interface de consulta intuitiva e tipada. Possui integração com vários bancos PostgreSQL, MySQL, SQLite, MongoDB e outros, controla o versionamento do banco (migrations), e torna muito mais fácil e produtivo o acesso ao banco de dados.

- **@prisma/client@5.12.1**: é o cliente oficial do Prisma para interagir com bancos de dados em aplicativos Node.js. Ele fornece consultas tipadas, CRUD simplificado, suporte a relacionamentos de banco de dados e otimização de desempenho, tornando a manipulação de dados eficiente e segura.

## Requisitos funcionais
- O organizador deve poder cadastrar um novo evento;
- O organizador deve poder visualizar dados de um novo evento; 
- O organizador deve poder visualizar lista de participantes;
- O participante deve poder se inscrever em um evento;
- O participante deve poder visualizar seu crachá de inscrição;
- O participante deve poder realizar check-in no evento;

## Regras de negócio
- O slug do evento deve ser único;
- O participante só pode se inscrever em um evento uma única vez;
- O participante só pode se inscrever em eventos com vagas disponíveis;
- O participante só pode realizar check-in no mesmo evento uma única vez;

## Requisitos não-funcionais
- O check-in no evento será realizado através de um QRCode;
- O CORS da API deve estar configurada para apenas o domínio do front-end poder fazer requisições
- A comunicação entre o front-end e o back-end devem ser feitas em um servidor HTTP/1.1;
- O corpo, os parametros de rotas e os parametros de busca de cada requisição deve ser estritamente validado para que estejam no formato adequado. 

## Rotas da aplicação

<div style="width: fit-content">

<h3 style="text-align:left;font-size:25px;">
    events
</h3><hr><br>

<div style="background-color:#cfcfcf;padding: 5px; font-size: 18px;">
    <button style="padding:5px 20px;background-color: #49cc90;color: white; font-weight: 800; border: none; border-radius: 3px;letter-spacing: 0.5px;width:100">
        POST
    </button>
    <span style="padding-left:10px;font-style:italic;font-weight:500;color:#916e66">
        /
    </span>
    <span style="font-style:italic;font-weight:500;color: #916e66">
        events
    </span>
    <span style="padding-left:10px;font-size:13px;color:#3b4100;">
        Criando um evento
    </span>
</div><br>

Detalhes do endpoint:

<table border style="width: 100%;">  
<tr>
    <th style="text-align:center;" colspan="2">REQUEST</th>
</tr>
<tr>
    <th style="text-align:center;width: 40%;">parâmetros</th>
    <th style="text-align:center;">modelo</th>
</tr>
<tr>
<td style="text-align:center;"><v style="color: #61affe;">Request Body</v></td>
<td rowspan="2">
<code style="white-space:pre-wrap">{
    "title": "string",
    "details": "string",
    "maximumAttendees": 100
}</code>
</td>
</tr>   
<tr>
    <td style="text-align:center;">{ title, details, maximumAttendees } : Object</td>
</tr>  
</table>

#### *Corpo da requisição:*
- **title**: uma string, com o nome do título que deve ter no mínimo 3 caracteres. 
- **details**: uma string, com detalhes sobre o evento, é opcional.
- **maxAttendees**: um number, com o número máximo de participantes, é opcional.

<table border style="width: 100%;">
<tr>  
<th style="text-align:center;" colspan="2">RESPONSE</th> 
</tr>
<tr>
<th style="text-align:center;width: 20%;">status</th>
<th style="text-align:center;">modelo</th>
</tr>
<tr>
<td style="text-align:center;">201</td>
<td rowspan="2">
<code style="white-space:pre-wrap">{
    "eventId": "ecc8085d-25e5-4c05-a8c0-69713a07f1cf"
}</code>
</td>
</tr>
<tr>
<td style="text-align:center;">Created</td>
</tr>
</table>

#### *Resposta:*
- **eventId**: se a requisição ter sido bem sucessido, retornará o id do evento criado, com o código 201.

<br><hr><br> <!-- *************************************************************** -->

<div style="background-color:#cfcfcf;padding: 5px; font-size: 18px;">
    <button style="padding:5px 20px;background-color: #61affe;color: white; font-weight: 800; border: none; border-radius: 3px;letter-spacing: 0.5px;width:100">
        GET
    </button>
    <span style="padding-left:10px;font-style:italic;font-weight:500;color:#916e66">
        /
    </span>
    <span style="font-style:italic;font-weight:500;color: #916e66">
        events
    </span>
    <span style="font-style:italic;font-weight:500;color: #916e66">
        /
    </span>
    <span style="font-style:italic;font-weight:500;color: #916e66">
        { <span style="font-style:normal;color: #4f3934">eventId</span> }
    </span>
    <span style="padding-left:10px;font-size:13px;color:#3b4100;">
        Buscar um evento
    </span>
</div><br>

Detalhes do endpoint:

<table border style="width: 100%;">  
<tr>
    <th style="text-align:center;" colspan="2">REQUEST</th>
</tr>
<tr>
    <th style="text-align:center;width:21%;">parâmetros</th>
    <th style="text-align:center;">modelo</th>
</tr>
<tr>
<td style="text-align:center;"><v style="color: #61affe;">Search Parameter</v></td>
<td rowspan="2">
<pre>http://localhost:3333/events/ecc8085d-25e5-4c05-a8c0-69713a07f1cf</pre>
</td>
</tr>   
<tr>
    <td style="text-align:center;">eventId : String (uuid)</td>
</tr>  
</table>

#### *Paramêtro de rotas:*
- **eventId**: uma string, com o id de um evento. 

<table border style="width: 100%;">
<tr>  
<th style="text-align:center;" colspan="2">RESPONSE</th> 
</tr>
<tr>
<th style="text-align:center;width: 20%;">status</th>
<th style="text-align:center;">modelo</th>
</tr>
<tr>
<td style="text-align:center;">200</td>
<td rowspan="2">
<code style="white-space:pre-wrap">{
  "event": {
    "id": "ecc8085d-25e5-4c05-a8c0-69713a07f1cf",
    "title": "string",
    "details": "string",
    "slug": "string",
    "maximumAttendees": 200,
    "attendeesAmount": 0
  }
}</code>
</td>
</tr>
<tr>
<td style="text-align:center;">OK</td>
</tr>
</table>

#### *Resposta:*
- **event**: se a requisição ter sido bem sucessido, retornará o evento encontrado, com o código 200.
- **id**: string, uuid do evento.
- **title**: string, com o nome do evento.
- **details**: string ou null, com os detalhes do evento.
- **slug**: string, é o nome do evento porém formatado, sem espaços ou caracteres especiais, será utilizado na url.
- **maximumAttendees**: number ou null, o número máximo de participantes.
- **attendeesAmount**: number, o número de participantes inscritos no evento.

<br>
<h3 style="text-align:left;font-size:25px;">
    attendees
</h3><hr><br>

<div style="background-color:#cfcfcf;padding: 5px; font-size: 18px;">
    <button style="padding:5px 20px;background-color: #49cc90;color: white; font-weight: 800; border: none; border-radius: 3px;letter-spacing: 0.5px;width:100">
        POST
    </button>
    <span style="padding-left:10px;font-style:italic;font-weight:500;color:#916e66">
        /
    </span>
    <span style="font-style:italic;font-weight:500;color: #916e66">
        events
    </span>
    <span style="font-style:italic;font-weight:500;color: #916e66">
        /
    </span>
    <span style="font-style:italic;font-weight:500;color: #916e66">
        { <span style="font-style:normal;color: #4f3934">eventId</span> }
    </span>
    <span style="font-style:italic;font-weight:500;color: #916e66">
        /
    </span>
     <span style="font-style:italic;font-weight:500;color: #916e66">
        attendees
    </span>
    <span style="padding-left:10px;font-size:13px;color:#3b4100;">
        Registrando um participante
    </span>
</div><br>

Detalhes do endpoint:

<table border style="width: 100%;">  
<tr>
    <th style="text-align:center;" colspan="2">REQUEST</th>
</tr>
<tr>
    <th style="text-align:center;">parâmetros</th>
    <th style="text-align:center;">modelo</th>
</tr>
<tr>
<td style="text-align:center;"><v style="color: #61affe;">Request Body</v></td>
<td rowspan="2">
<code style="white-space:pre-wrap">{
    "name": "string",
    "email": "user@example.com"
}</code>
</td>
</tr>   
<tr>
    <td style="text-align:center;">{ name, email } : Object</td>
</tr>  
</table>

#### *Corpo da requisição:*
- **name**: uma string, com o nome do novo participante. 
- **email**: uma string, com o email do participante.

<table border style="width: 100%;">
<tr>  
<th style="text-align:center;" colspan="2">RESPONSE</th> 
</tr>
<tr>
<th style="text-align:center;width: 20%;">status</th>
<th style="text-align:center;">modelo</th>
</tr>
<tr>
<td style="text-align:center;">201</td>
<td rowspan="2">
<code style="white-space:pre-wrap">{
    "attendeeId": 9966
}</code>
</td>
</tr>
<tr>
<td style="text-align:center;">Created</td>
</tr>
</table>

#### *Resposta:*
- **attendeeId**: se a requisição ter sido bem sucessido, com o código 201, retornará o id do participante criado, que é um number gerado automaticamente com o auto_increment do banco de dados.

<br><hr><br> <!-- *************************************************************** -->

<div style="background-color:#cfcfcf;padding: 5px; font-size: 18px;">
    <button style="padding:5px 20px;background-color: #61affe;color: white; font-weight: 800; border: none; border-radius: 3px;letter-spacing: 0.5px;width:100">
        GET
    </button>
    <span style="padding-left:10px;font-style:italic;font-weight:500;color:#916e66">
        /
    </span>
    <span style="font-style:italic;font-weight:500;color: #916e66">
        events
    </span>
    <span style="font-style:italic;font-weight:500;color: #916e66">
        /
    </span>
    <span style="font-style:italic;font-weight:500;color: #916e66">
        { <span style="font-style:normal;color: #4f3934">eventId</span> }
    </span>
    <span style="font-style:italic;font-weight:500;color: #916e66">
        /
    </span>
    <span style="font-style:italic;font-weight:500;color: #916e66">
        attendees
    </span>
    <span style="padding-left:10px;font-size:13px;color:#3b4100;">
        Buscar os participantes de um evento
    </span>
</div><br>

Detalhes do endpoint:

<table border style="width: 100%;">  
<tr>
    <th style="text-align:center;" colspan="2">REQUEST</th>
</tr>
<tr>
    <th style="text-align:center;">parâmetros</th>
    <th style="text-align:center;">modelo</th>
</tr>
<tr>
<td style="text-align:center;"><v style="color: #61affe;">Path Parameter</v></td>
<td rowspan="5">
<pre>http://localhost:3333/events/ecc8085d-25e5-4c05-a8c0-69713a07f1cf?query=lucas&pageIndex=3</pre>
</td>
</tr>   
<tr>
    <td style="text-align:center;">eventId : String (uuid)</td>
</tr>
<tr>
    <td><v style="color: #61affe;">Search Parameter</v></td>
</tr> 
<tr>
    <td style="text-align:center;">query : String</td>
</tr> 
<tr>
    <td style="text-align:center;">pageIndex : String</td>
</tr> 
</table>

#### *Paramêtro de rotas:*
- **eventId**: uma string, com o id de um evento. 

#### *Paramêtro de busca:*
- **query**: uma string, para filtrar por nome de participantes, é opcional. 
- **pageIndex**: uma string representando o número da página de participantes buscada, se for nula, por padrão ele é 0. 
 
<table border style="width: 100%;">
<tr>  
<th style="text-align:center;" colspan="2">RESPONSE</th> 
</tr>
<tr>
<th style="text-align:center;width: 20%;">status</th>
<th style="text-align:center;">modelo</th>
</tr>
<tr>
<td style="text-align:center;">200</td>
<td rowspan="2">
<code style="white-space:pre-wrap">{
  "attendees": [
    {
      "id": 9967,
      "name": "string",
      "email": "user@example.com",
      "createdAt": "2024-04-07T20:20:41.602Z",
      "checkedInAt": null
    },
    {
      "id": 9966,
      "name": "string",
      "email": "user@example.com",
      "createdAt": "2024-04-07T20:20:41.602Z",
      "checkedInAt": null
    }
  ],
  "totalAttendees": 2
}</code>
</td>
</tr>
<tr>
<td style="text-align:center;">OK</td>
</tr>
</table>

#### *Resposta:*
- **attendees**: se a requisição ter sido bem sucessido, uma lista de participantes, com o código 200.
- **id**: string, uuid do evento.
- **name**: string, com o nome do participante.
- **email**: string, com o email do participante.
- **createdAt**: string, contém a data de registro do participante no formato ISO.
- **checkedInAt**: string ou null, a data de check-in do participante, se ele já fez.
- **totalAttendees**: number, o número total de participantes referentes a busca.

<br><hr><br> <!-- *************************************************************** -->

<div style="background-color:#cfcfcf;padding: 5px; font-size: 18px;">
    <button style="padding:5px 20px;background-color: #61affe;color: white; font-weight: 800; border: none; border-radius: 3px;letter-spacing: 0.5px;width:100">
        GET
    </button>
    <span style="padding-left:10px;font-style:italic;font-weight:500;color:#916e66">
        /
    </span>
    <span style="font-style:italic;font-weight:500;color: #916e66">
        attendees
    </span>
    <span style="font-style:italic;font-weight:500;color: #916e66">
        /
    </span>
    <span style="font-style:italic;font-weight:500;color: #916e66">
        { <span style="font-style:normal;color: #4f3934">attendeesId</span> }
    </span>
    <span style="font-style:italic;font-weight:500;color: #916e66">
        /
    </span>
    <span style="font-style:italic;font-weight:500;color: #916e66">
        badge
    </span>
    <span style="padding-left:10px;font-size:13px;color:#3b4100;">
        Busca o chachá do participante
    </span>
</div><br>

Detalhes do endpoint:

<table border style="width: 100%;">  
<tr>
    <th style="text-align:center;" colspan="2">REQUEST</th>
</tr>
<tr>
    <th style="text-align:center;">parâmetros</th>
    <th style="text-align:center;">modelo</th>
</tr>
<tr>
<td style="text-align:center;"><v style="color: #61affe;">Path Parameter</v></td>
<td rowspan="5">
<pre>http://localhost:3333/attendees/9827/badge</pre>
</td>
</tr>   
<tr>
    <td style="text-align:center;">attendeeId : Number</td>
</tr>
</table>

#### *Paramêtro de rotas:*
- **attendeeId**: um number, com o número do Id incremental do participante. 

<table border style="width: 100%;">
<tr>  
<th style="text-align:center;" colspan="2">RESPONSE</th> 
</tr>
<tr>
<th style="text-align:center;width: 20%;">status</th>
<th style="text-align:center;">modelo</th>
</tr>
<tr>
<td style="text-align:center;">200</td>
<td rowspan="2">
<code style="white-space:pre-wrap">{
  "badge": {
    "name": "string",
    "email": "user@example.com",
    "eventTitle": "string",
    "checkInURL": "http://localhost:3333/attendees/9827/check-in"
  }
}</code>
</td>
</tr>
<tr>
<td style="text-align:center;">OK</td>
</tr>
</table>

#### *Resposta:*
- **badge**: se a requisição ter sido bem sucessido, retorna o chachá do participante com código 200.
- **name**: string, nome do participante.
- **email**: string, email do participante.
- **eventTitle**: string, titulo do evento que o participante está registrado.
- **checkInURL**: string, com a URL para o frontend gerar o QRCode e o participante fazer o check-in.

<h3 style="text-align:left;font-size:25px;">
    check-ins   
</h3><hr><br>

<div style="background-color:#cfcfcf;padding: 5px; font-size: 18px;">
    <button style="padding:5px 20px;background-color: #49cc90;color: white; font-weight: 800; border: none; border-radius: 3px;letter-spacing: 0.5px;width:100">
        POST
    </button>
    <span style="padding-left:10px;font-style:italic;font-weight:500;color:#916e66">
        /
    </span>
    <span style="font-style:italic;font-weight:500;color: #916e66">
        attendees
    </span>
    <span style="padding-left:10px;font-style:italic;font-weight:500;color:#916e66">
        /
    </span>
    <span style="font-style:italic;font-weight:500;color: #916e66">
        { <span style="font-style:normal;color: #4f3934">attendeesId</span> }
    </span>
    <span style="font-style:italic;font-weight:500;color: #916e66">
        /
    </span>
    <span style="font-style:italic;font-weight:500;color: #916e66">
        check-in
    </span>
    <span style="padding-left:10px;font-size:13px;color:#3b4100;">
        Check-in em um participante
    </span>
</div><br>

Detalhes do endpoint:

<table border style="width: 100%;">  
<tr>
    <th style="text-align:center;" colspan="2">REQUEST</th>
</tr>
<tr>
    <th style="text-align:center;width: 40%;">parâmetros</th>
    <th style="text-align:center;">modelo</th>
</tr>
<tr>
<td style="text-align:center;"><v style="color: #61affe;">Path Parameter</v></td>
<td rowspan="2">
<pre>http://localhost:3333/attendees/9827/check-in</pre>
</td>
</tr>   
<tr>
    <td style="text-align:center;">attendeeId : Number</td>
</tr> 
</table>

#### *Parâtro de rotas:*
- **attendeeId**: um number, com o ID do participante. 

<table border style="width: 100%;">
<tr>  
<th style="text-align:center;" colspan="2">RESPONSE</th> 
</tr>
<tr>
<th style="text-align:center;width: 40%;">status</th>
<th style="text-align:center;">modelo</th>
</tr>
<tr>
<td style="text-align:center;">204</td>
<td rowspan="2" style="text-align:center">
undefined
</td>
</tr>
<tr>
<td style="text-align:center;">No Content</td>
</tr>
</table>

#### *Resposta:*
- se tudo der certo retornará o código 204 sem conteúdo.

</div><br>

## Iniciar a aplicação

Para iniciar este projeto, siga estas etapas simples:

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em seu sistema:

- Node.js (versão 20.X.X ou superior)
- npm (gerenciador de pacotes do Node.js)

### Passos

1. Clone este repositório para o seu ambiente local:
```bash
git clone https://github.com/LucasLessaAnacleto/pass.in-api.git
```
<br>

2. Dentro da pasta do projeto, instale as dependencias:
```bash
npm i
```
<br>

3. Crie um arquivo .env na raiz do projeto, e defina a variável de ambiente que será necessário para o prisma iniciar o banco de dados. 
```bash
DATABASE_URL="file:./dev.db" # só precisa ter a extensão .db
```
<br>

4. *Opcional*, execute o seed do banco de dados, ele alimenta o banco com alguns dados fictícios para não iniciar com o db vazio.
```bash
npm run db:seed
```
<br>

5. Rode o script de build.
```bash
npm run build
```
<br>

6. Execute a aplicação, iniciará na porta 3333.
```bash
npm start
```

[Voltar](#índice)