# Controle de Estoque - Perfumaria

Frontend desenvolvido em Angular 19 para gerenciar o estoque de uma perfumaria, integrado a uma API própria em Spring Boot.

## Funcionalidades

- Login simulado com validação de e-mail e senha obrigatória.
- Listagem, cadastro, edição e exclusão de produtos pela API.
- Seleção de categorias e fornecedores cadastrados no backend.
- Validação dos campos do formulário.
- Modal de confirmação de exclusão com MDB-Angular.
- Notificações de sucesso e erro com SweetAlert2.
- Tratamento de falhas de conexão com a API.
- Navegação com rotas filhas e proteção de acesso no frontend.

O login é demonstrativo: aceita qualquer e-mail válido e uma senha não vazia. Não realiza autenticação no backend.

Os produtos são persistidos pelo backend no banco de dados, sem utilização de localStorage para o CRUD.

## Tecnologias

- Angular 19 e TypeScript
- Angular Router e Reactive Forms
- HttpClient e RxJS
- MDB-Angular UI Kit 8
- SweetAlert2

## Requisitos

Ambiente utilizado no desenvolvimento:

- Node.js 22.23.2
- npm 11.6.0
- Backend em execução em http://localhost:8080

Repositório do backend:
https://github.com/NurAssaf/controle-estoque-perfumaria

O backend utiliza Java 17 e MySQL. Configure o banco e as variáveis necessárias conforme as instruções desse repositório antes de iniciá-lo.

## Como executar

1. Clone o frontend:

   ```bash
   git clone https://github.com/NurAssaf/controle-estoque-frontend.git
   cd controle-estoque-frontend
   ```

2. Instale as dependências:

   ```bash
   npm ci
   ```

3. Inicie o backend na porta 8080.

4. Inicie o frontend:

   ```bash
   npm start
   ```

5. Acesse:

   http://localhost:4200

Para testar o login, utilize um e-mail válido, como `teste@exemplo.com`, e uma senha não vazia.

## Integração com a API

Os serviços utilizam a URL base `http://localhost:8080`.

| Recurso | Operações utilizadas |
| --- | --- |
| Produtos | GET, POST, PUT e DELETE |
| Categorias | GET |
| Fornecedores | GET |

O backend deve permitir a origem `http://localhost:4200` na configuração de CORS.

## Organização do código

```text
src/app/
├── components/    # Layout e modal de confirmação
├── guards/        # Proteção das rotas
├── models/        # Interfaces das entidades
├── pages/         # Login, listagem e formulário de produtos
└── services/      # Comunicação com a API e notificações
```

Produtos, categorias e fornecedores possuem modelos e serviços separados. Cada serviço de API se comunica com o controller correspondente no backend.

## Build e testes

Gerar a versão de produção:

```bash
npm run build
```

Executar os testes automatizados:

```bash
npm test -- --watch=false
```

Na validação realizada, o build concluiu com avisos e os 3 testes automatizados passaram.

Também foram verificados manualmente os fluxos de cadastro, edição, exclusão, cancelamento no modal e tratamento de indisponibilidade da API.

## Pendências conhecidas

- Avisos de build relacionados ao Sass do MDB, seletores CSS, tamanho do pacote inicial e formato do módulo SweetAlert2.
- A última auditoria de dependências apontou 33 vulnerabilidades: 2 baixas, 15 moderadas, 15 altas e 1 crítica.
- A execução de `npm audit fix --force=false` não reduziu essas ocorrências. Algumas correções sugeridas pelo npm exigem mudanças de versão incompatíveis com a exigência de Angular 19.

## Repositórios

- Frontend: https://github.com/NurAssaf/controle-estoque-frontend
- Backend: https://github.com/NurAssaf/controle-estoque-perfumaria