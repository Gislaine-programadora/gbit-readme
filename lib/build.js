const SCRIPT_DESCRIPTIONS = {
  dev: "Inicia o projeto em modo de desenvolvimento",
  start: "Inicia o projeto em modo de produção",
  build: "Gera a build de produção",
  test: "Roda os testes automatizados",
  lint: "Verifica o código com o linter",
  format: "Formata o código automaticamente",
  deploy: "Publica o projeto",
};

function badgesMarkdown(stack) {
  return stack
    .map(
      (t) =>
        `![${t.label}](https://img.shields.io/badge/${encodeURIComponent(
          t.label
        )}-${t.color}?style=for-the-badge&logo=${t.logo}&logoColor=white)`
    )
    .join(" ");
}

function scriptsMarkdown(scripts) {
  const entries = Object.entries(scripts || {});
  if (entries.length === 0) return "_Nenhum script encontrado no package.json._";

  return entries
    .map(([name, cmd]) => {
      const desc = SCRIPT_DESCRIPTIONS[name] || `Roda: \`${cmd}\``;
      return `| \`npm run ${name}\` | ${desc} |`;
    })
    .join("\n");
}

function structureMarkdown(structure) {
  if (structure.length === 0) return "_Estrutura de pastas não detectada._";

  return structure
    .map((s) => `- \`${s.name}/\`${s.description ? ` — ${s.description}` : ""}`)
    .join("\n");
}

export function buildReadme({ pkg, stack, extras, structure }) {
  const name = pkg.name || "meu-projeto";
  const description = pkg.description || "Adicione aqui uma breve descrição do que este projeto faz.";
  const license = pkg.license || "Não especificada";
  const author =
    typeof pkg.author === "string"
      ? pkg.author
      : pkg.author?.name || "Não especificado";

  const hasDevScript = pkg.scripts?.dev;
  const hasStartScript = pkg.scripts?.start;
  const runCmd = hasDevScript ? "npm run dev" : hasStartScript ? "npm start" : "npm run <script>";

  let md = `# ${name}\n\n`;

  if (stack.length > 0) {
    md += `${badgesMarkdown(stack)}\n\n`;
  }

  md += `${description}\n\n`;

  md += `## 🚀 Instalação\n\n\`\`\`bash\nnpm install\n\`\`\`\n\n`;

  md += `## ▶️ Como rodar\n\n\`\`\`bash\n${runCmd}\n\`\`\`\n\n`;

  if (pkg.scripts && Object.keys(pkg.scripts).length > 0) {
    md += `## 📜 Scripts disponíveis\n\n| Comando | Descrição |\n|---|---|\n${scriptsMarkdown(pkg.scripts)}\n\n`;
  }

  if (stack.length > 0) {
    md += `## 🛠️ Tecnologias\n\n${stack.map((t) => `- ${t.label}`).join("\n")}\n\n`;
  }

  if (structure.length > 0) {
    md += `## 📁 Estrutura do projeto\n\n${structureMarkdown(structure)}\n\n`;
  }

  if (extras.hasEnvExample) {
    md += `## ⚙️ Variáveis de ambiente\n\nCopie o arquivo de exemplo e preencha com suas próprias chaves:\n\n\`\`\`bash\ncp .env.example .env\n\`\`\`\n\n`;
  }

  if (extras.hasDocker) {
    md += `## 🐳 Docker\n\nEste projeto inclui um \`Dockerfile\`. Para rodar em container:\n\n\`\`\`bash\ndocker build -t ${name} .\ndocker run -p 3000:3000 ${name}\n\`\`\`\n\n`;
  }

  if (extras.hasTests) {
    md += `## 🧪 Testes\n\n\`\`\`bash\nnpm test\n\`\`\`\n\n`;
  }

  if (extras.hasCI) {
    md += `## ⚡ CI/CD\n\nEste projeto tem workflows configurados em \`.github/workflows\`.\n\n`;
  }

  md += `## 📄 Licença\n\n${license} © ${author}\n`;

  return md;
}
