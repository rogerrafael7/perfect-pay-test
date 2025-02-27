## Getting Started

### Instalação

```bash
$ docker-compose up -d
```

**O servidor irá rodar na porta 8085**

- Collection do Postman com todos os endpoints:
[Link para a coleção Postman](https://github.com/rogerrafael7/perfect-pay-test/tree/master/docs/PerfectPay.postman_collection.json)
- API Swagger: [API Local Swagger](http://localhost:8085/api-docs)

## Fluxo de consumo (Endpoints disponíveis na collection do Postman)

Deve-se seguir essa ordem abaixo para consumir os endpoints da API:
1. **Login ADMIN**: Isso irá gerar um token de autenticação para o usuário admin. No Postman esse token está sendo automaticamente registrado na env _ADMIN_TOKEN_
2. **Create User**: Para criar um novo usuário/customer
3. **Login Customer**: Isso irá gerar um token de autenticação para o usuário customer. No Postman esse token está sendo automaticamente registrado na env _CUSTOMER_TOKEN_
4. **Create Billing**: Para criar uma nova cobrança. A cobrança é feita automaticamente para o usuário logado(customer logado no passo anterior, item 3)
5. **Get Payment/Billing Status**: Para verificar o status da cobrança criada no passo anterior (item 4)

Obs.: Após ser criado uma cobrança em Sandbox, é necessário manualmente ir até o painel da ASAAS para simular que o pagamento da cobrança foi feito. O link para o painel é: [Painel Sandbox ASAAS](https://sandbox.asaas.com/)

### Para rodar os testes unitários:

> A aplicação está usando a versão **node 20.18.0**

Para gerar o arquivo .env, execute o comando abaixo:
```bash
$ cp .env.example .env
```
> após comando acima, mude a env para **MYSQL_DATABASE_HOST=0.0.0.0** no arquivo **.env**

Agora rode os comandos abaixo para preparar o ambiente e para rodar os testes:
```bash
$ npm i -g pnpm
$ pnpm i
$ pnpm run test
```

## Estrutura do projeto

O projeto está feito seguindo o conceito de arquitetura hexagonal, onde temos a divisão de camadas de acordo com suas responsabilidades.
Abaixo a estrutura do projeto:

```
perfect-pay-test
├── src
│   ├── application
│   │   ├── decorator
│   │   │── filter
│   │   │── guard
│   │   │── factory
│   │   │── module
│   │   │── presentation
│   │   │   │── http
│   │   │── usecase
│   │── domain
│   │   │── model
│   │   │── gateway
│   │   │── mapper
│   │   │── repo
│   │   │── usecase
│   │── infra
│   │   │── data
│   │   │── shared
│   │   │── gateway
```

Segue abaixo a descrição das principais camadas do projeto:

- **Presentation**: Camada responsável por conter os entrypoints da aplicação, nesse caso do teste, apenas os controllers Rest.


- **Domain**: Camada responsável por conter as regras de negócio, entidades, repositórios e mappers. Nessa camada teremos os contratos principais agnósticos de tecnologia, ou seja, as interfaces que serão implementadas em outras camadas.
  - **Usecase**: Camada responsável por conter os contratos dos casos de uso da aplicação.
  - **Gateway**: Camada responsável por conter os contratos dos gateways da aplicação.
  - **Model**: Camada responsável por conter as entidades da aplicação.
  - **Mapper**: Camada responsável por conter os mappers de entidades.
  - **Repo**: Camada responsável por conter os contratos de repositórios da aplicação.


- **Infra**: Camada responsável por conter as implementações de repositórios, serviços externos, etc.
  - **Shared**: Camada responsável por conter classes que são compartilhadas entre as camadas.
  - **Data**: Camada responsável por conter as implementações definidas nos contratos dos repositórios da domain.
  - **Gateway**: Camada responsável por conter as implementações definidas nos contratos dos gateways da domain. No exemplo da aplicação será a camada que representará o **ASAAS**.

## Tecnologias utilizadas

- **NestJS**: Framework principal
- **Node.js**
- **Typescript**
- **Docker**
- **Swagger**
- **JWT**
- **TypeORM**: como camada de ORM
- **Jest**: Framework de testes
