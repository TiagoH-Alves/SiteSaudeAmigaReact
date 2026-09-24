# SaúdeAmiga

Projeto front-end de cadastro para uma plataforma de saúde, desenvolvido com React e Vite. A aplicação apresenta uma landing page com formulário de inscrição, validações de dados, mensagens visuais e link para a política de privacidade.

## Visão geral

O objetivo deste projeto é oferecer uma interface moderna e acolhedora para que usuários possam realizar um cadastro de forma simples, clara e segura. O fluxo inclui:

- formulário com dados pessoais e de contato;
- validação de campos obrigatórios;
- máscaras automáticas para CPF, telefone e CEP;
- seleção de sexo e canal preferido para contato;
- página de política de privacidade;
- layout responsivo e visual consistente.

## Stack

- React 18
- Vite 5
- CSS puro

## Funcionalidades principais

- Cadastro com dados pessoais e endereço
- Validação de e-mail, CPF e CEP
- Máscaras de entrada em tempo real
- Mensagem de sucesso ou erro após envio
- Upload de documento de identificação
- Página de política de privacidade separada
- Design responsivo para desktop e mobile

## Estrutura do projeto

```bash
.
├── index.html
├── privacy.html
├── package.json
├── vite.config.js
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
└── README.md
```

## Como executar localmente

1. Instale as dependências:

```bash
npm install
```

2. Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

3. Abra o endereço exibido no terminal, normalmente:

```bash
http://localhost:5173
```

## Build para produção

Para gerar a versão otimizada do projeto:

```bash
npm run build
```

Para visualizar a build localmente:

```bash
npm run preview
```

## Scripts disponíveis

```bash
npm run dev     # inicia o projeto em modo de desenvolvimento
npm run build   # gera a build de produção
npm run preview # serve a build localmente
```

## Observações

- O formulário está implementado em React e usa estado local para controlar os dados do cadastro.
- A página de privacidade está em [privacy.html](privacy.html) e é aberta em nova aba a partir do formulário.
- O layout e os estilos principais ficam em [src/styles.css](src/styles.css).

## Autor

Projeto desenvolvido como estudo de front-end com foco em experiência de cadastro e UX para serviços de saúde.
