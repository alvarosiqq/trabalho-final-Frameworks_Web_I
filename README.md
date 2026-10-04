# Arquivo de Hogwarts

Aplicação web feita com React e Vite para consultar personagens de Harry Potter. Usa a API pública [HP-API](https://hp-api.onrender.com/) para listar personagens e consultar informações detalhadas.

## Integrante

- Álvaro Siqueira

## Como executar

Pré-requisito: Node.js 22.12 ou superior (ou Node.js 20.19 ou superior) e npm.

1. Baixe o repositório e abra a pasta do projeto no VS Code.
2. No terminal dessa pasta, execute:

```bash
npm install
npm run dev
```

3. Abra o endereço mostrado no terminal, normalmente `http://localhost:5173`.

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

## Funcionalidades

- Listagem em páginas de 12 personagens.
- Busca por nome em tempo real.
- Filtros de casa e vínculo, combinados com a busca.
- Página de detalhes na rota `/personagem/:id`.
- Mensagens de carregamento, erro e resultado vazio.
- Botão para tentar novamente após erro na API.
- Layout responsivo e alternativa visual para imagens ausentes ou indisponíveis.

A HP-API retorna a lista completa de personagens. Por isso, a paginação é feita no React, depois de aplicar os filtros. Os filtros e a página ficam na URL, permitindo restaurá-los com o botão Voltar do navegador.

## Tecnologias e organização

React, Vite, axios, react-router-dom e Styled Components.

- `src/components`: cabeçalho, cards, imagem, filtros, paginação e mensagens reutilizáveis.
- `src/pages`: catálogo e detalhes.
- `src/services/api.js`: requisições com axios.
- `src/styles.js`: estilos globais e elementos compartilhados.
- `src/App.jsx`: rotas da aplicação.

O `useState` guarda os dados e os estados de carregamento e erro. O `useEffect` realiza as requisições e cancela chamadas ao sair da página. Os componentes recebem dados e funções por props.

## API utilizada

- Lista: `https://hp-api.onrender.com/api/characters`
- Detalhes: `https://hp-api.onrender.com/api/character/:id`

É necessário acesso à internet. A API pode levar alguns segundos para responder; uma chamada que ultrapassar 30 segundos exibe uma mensagem com opção de tentar novamente. Alguns campos da API vêm em inglês ou não estão preenchidos.

## Entrega

Nome do repositório público: `trabalho-final-Frameworks_Web_I`.

Entregar o nome do integrante, o link do repositório e o link do vídeo de apresentação (até 7 minutos).
