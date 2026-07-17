import fs from "fs";
import path from "path";

// Mapa de dependências conhecidas -> { label, badge (cor/logo do shields.io) }
const TECH_MAP = {
  next: { label: "Next.js", color: "000000", logo: "next.js" },
  react: { label: "React", color: "61DAFB", logo: "react" },
  vue: { label: "Vue.js", color: "4FC08D", logo: "vue.js" },
  vite: { label: "Vite", color: "646CFF", logo: "vite" },
  typescript: { label: "TypeScript", color: "3178C6", logo: "typescript" },
  tailwindcss: { label: "Tailwind CSS", color: "06B6D4", logo: "tailwindcss" },
  express: { label: "Express", color: "000000", logo: "express" },
  fastify: { label: "Fastify", color: "000000", logo: "fastify" },
  prisma: { label: "Prisma", color: "2D3748", logo: "prisma" },
  mongoose: { label: "MongoDB", color: "47A248", logo: "mongodb" },
  sequelize: { label: "Sequelize", color: "52B0E7", logo: "sequelize" },
  jest: { label: "Jest", color: "C21325", logo: "jest" },
  vitest: { label: "Vitest", color: "6E9F18", logo: "vitest" },
  cypress: { label: "Cypress", color: "17202C", logo: "cypress" },
  playwright: { label: "Playwright", color: "2EAD33", logo: "playwright" },
  eslint: { label: "ESLint", color: "4B32C3", logo: "eslint" },
  "styled-components": { label: "Styled Components", color: "DB7093", logo: "styledcomponents" },
  redux: { label: "Redux", color: "764ABC", logo: "redux" },
  zustand: { label: "Zustand", color: "433E38", logo: "react" },
  graphql: { label: "GraphQL", color: "E10098", logo: "graphql" },
  "socket.io": { label: "Socket.io", color: "010101", logo: "socket.io" },
  mongodb: { label: "MongoDB", color: "47A248", logo: "mongodb" },
  hardhat: { label: "Hardhat", color: "FFF100", logo: "ethereum" },
  ethers: { label: "Ethers.js", color: "2535A0", logo: "ethereum" },
  web3: { label: "Web3.js", color: "F16822", logo: "web3.js" },
};

export function readPackageJson(projectPath) {
  const pkgPath = path.join(projectPath, "package.json");
  if (!fs.existsSync(pkgPath)) return null;
  return JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
}

export function detectStack(pkg) {
  const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
  const found = [];

  for (const key of Object.keys(TECH_MAP)) {
    if (deps[key]) found.push(TECH_MAP[key]);
  }

  return found;
}

export function detectExtras(projectPath) {
  return {
    hasDocker: fs.existsSync(path.join(projectPath, "Dockerfile")),
    hasEnvExample:
      fs.existsSync(path.join(projectPath, ".env.example")) ||
      fs.existsSync(path.join(projectPath, "env.example")),
    hasTests: fs.existsSync(path.join(projectPath, "tests")) ||
      fs.existsSync(path.join(projectPath, "__tests__")),
    hasCI: fs.existsSync(path.join(projectPath, ".github", "workflows")),
  };
}

export function detectStructure(projectPath) {
  const IGNORE = new Set([
    "node_modules", ".git", ".next", "dist", "build", ".turbo", ".vercel",
  ]);

  const KNOWN_FOLDERS = {
    src: "Código-fonte principal",
    app: "Rotas e páginas (App Router)",
    pages: "Rotas e páginas",
    components: "Componentes reutilizáveis",
    public: "Arquivos estáticos (imagens, ícones)",
    lib: "Funções utilitárias e helpers",
    hooks: "React hooks customizados",
    styles: "Arquivos de estilo",
    api: "Rotas de API",
    tests: "Testes automatizados",
    __tests__: "Testes automatizados",
    contracts: "Smart contracts",
    prisma: "Schema e migrations do banco de dados",
    docs: "Documentação adicional",
  };

  if (!fs.existsSync(projectPath)) return [];

  return fs
    .readdirSync(projectPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !IGNORE.has(entry.name) && !entry.name.startsWith("."))
    .map((entry) => ({
      name: entry.name,
      description: KNOWN_FOLDERS[entry.name] || null,
    }));
}
