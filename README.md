# FRONT TESTE TÉCNICO

Este front foi desenvolvido para trabalhar junto com a api, criando um gerenciamento melhor das funcionalidades da api.

## Recursos Disponíveis

- Criar usuário.
- Listar usuários: Obtenha o perfil do usuário de forma rápida.
- Autenticação.

## Tecnologias usadas

**Linguagem:** Typescript

**Framework:** Next.js


## Instalação e Configuração

**Pré requisitos**

Antes de começar, certifique-se de ter instalado:

- Node.js (versão 20 ou superior)
- Typescript (versão 5.7.2 ou superior)
- npm ou yarn

Faça o donwload do repositório através do github usando o comando:

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Após entrar na pasta será necessário configurar variáveis de ambiente, para isso crie na raíz do projeto o arquivo `.env`
será necessário setar as seguintes variáveis:

`NEXTAUTH_SECRET` Hash para autenticação
`NEXTAUTH_URL` URL base de onde o servidor irá rodar.



Exemplo:
```bash
NEXTAUTH_SECRET="XnZiBszjpjcFf8BRRYwNT0wSj7ojf9UM/O0xT6+LAYQ=" 
NEXTAUTH_URL="http://localhost:3001"
```

Por padrão o next irá rodar na porta 3001

## Rodar Localmente

Para iniciar o projeto use:

Instalar dependências

```bash
  npm install
```

Iniciar o servidor

```bash
  npm run dev
```

O servidor ficará disponível na url `http://localhost:3001`

## Endpoints

