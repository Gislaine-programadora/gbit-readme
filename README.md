   <img width="599" height="162" alt="image" src="https://github.com/user-attachments/assets/1a145b8c-ae42-4b2b-af81-28661d02689f" />







<div align="center">

![gbit-readme](./assets/logo.png)

![version](https://img.shields.io/badge/VERSION-1.0.0-0078D4?style=for-the-badge)
![node](https://img.shields.io/badge/NODE.JS-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![license](https://img.shields.io/badge/LICENSE-MIT-4CAF50?style=for-the-badge)

# 📝 gbit-readme

**Analisa qualquer projeto e gera um README.md profissional, automaticamente.**

Sem preencher formulário, sem escrever do zero — o CLI lê seu `package.json` e sua estrutura de pastas, e entrega um README pronto pra revisar e enviar pro GitHub.

📦 [Pacote no NPM](https://www.npmjs.com/package/gbit-readme) · 💻 [Repositório no GitHub](https://github.com/Gislaine-programadora)

</div>

---

## 🚀 Uso

Dentro da pasta de qualquer projeto (que tenha um `package.json`):

```bash
npx gbit-readme
```

Se o seu projeto tiver várias partes separadas (backend, frontend, contracts), rode o comando uma vez em cada pasta:

```bash
gbit-readme backend
gbit-readme frontend
gbit-readme contracts
```

Cada execução gera um `README.md` próprio, dentro da pasta indicada.

Se já existir um `README.md` no projeto, o CLI pergunta antes de sobrescrever — e guarda uma cópia do antigo como `README.old.md`, pra você nunca perder nada.

## ✨ O que ele detecta sozinho

| Detecta | Como usa |
|---|---|
| **Stack do projeto** | Reconhece mais de 20 tecnologias (Next.js, React, Vite, Tailwind, TypeScript, Prisma, Express, Hardhat/Ethers, e mais) e gera badges coloridos automaticamente |
| **Scripts do `package.json`** | Monta uma tabela com cada comando (`dev`, `build`, `test`, `lint`...) e uma descrição do que ele faz |
| **Estrutura de pastas** | Reconhece pastas comuns (`src`, `components`, `contracts`, `prisma`, `hooks`...) e adiciona uma descrição pra cada uma |
| **Docker** | Se encontrar um `Dockerfile`, adiciona a seção de instruções de build/run |
| **Variáveis de ambiente** | Se encontrar `.env.example`, adiciona instruções de configuração |
| **Testes** | Se encontrar pasta `tests` ou `__tests__`, adiciona a seção de como rodar os testes |
| **CI/CD** | Se encontrar `.github/workflows`, menciona que o projeto já tem automação configurada |

## 📋 O que ele NÃO faz (por escolha, não por limitação)

- **Não inventa a descrição do projeto.** Se o campo `description` do seu `package.json` estiver vazio, ele deixa um texto de placeholder claro, esperando você preencher — em vez de arriscar um texto genérico ou impreciso.
- **Não reescreve um README já existente sem perguntar.** Sempre confirma antes, e nunca apaga o conteúdo anterior sem fazer backup.

## 📦 Instalação

```bash
npx gbit-readme
```

Ou, se preferir instalar globalmente:

```bash
npm install -g gbit-readme
gbit-readme
```

## 🛠️ Tecnologias usadas na construção do CLI

- Node.js
- [chalk](https://www.npmjs.com/package/chalk) — cores no terminal
- [ora](https://www.npmjs.com/package/ora) — spinners de carregamento
- [inquirer](https://www.npmjs.com/package/inquirer) — confirmação antes de sobrescrever
- [figlet](https://www.npmjs.com/package/figlet) + [gradient-string](https://www.npmjs.com/package/gradient-string) — logo ASCII colorido

## 🗺️ Roadmap

- [ ] Detecção automática de linguagem (Python, Go, Rust) além do ecossistema Node
- [ ] Geração de badge de cobertura de testes
- [ ] Modo interativo para editar seções antes de salvar

## 🤝 Ecossistema Gbit

| Ferramenta | Descrição |
|---|---|
| [`gbit-next`](https://github.com/Gislaine-programadora) | Cria projetos Next.js prontos, com templates completos |
| [`gbit-start`](https://github.com/Gislaine-programadora) | Abre ou clona qualquer projeto existente e o deixa rodando |
| [`gbit-readme`](https://github.com/Gislaine-programadora) | Este CLI — gera README profissional automaticamente |
| [`create-gbit-app`](https://github.com/Gislaine-programadora) | Projetos fullstack completos (Backend + Frontend Vite/TS + Smart Contracts) |

## 📄 Licença

MIT © [Gislaine Cristina Lopes](https://github.com/Gislaine-programadora)
