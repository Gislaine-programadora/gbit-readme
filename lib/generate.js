import fs from "fs";
import path from "path";
import chalk from "chalk";
import ora from "ora";
import inquirer from "inquirer";
import { readPackageJson, detectStack, detectExtras, detectStructure } from "./detect.js";
import { buildReadme } from "./build.js";

export default async function generateReadme() {
  const arg = process.argv[2];
  const projectPath = arg ? path.resolve(arg) : process.cwd();

  console.log(chalk.gray(`  Pasta: ${projectPath}`));
  console.log("");

  const spinner = ora("Analisando o projeto...").start();

  const pkg = readPackageJson(projectPath);

  if (!pkg) {
    spinner.fail("Nenhum package.json encontrado nessa pasta.");
    console.log(chalk.gray("  Uso: gbit-readme [pasta-do-projeto]"));
    return;
  }

  const stack = detectStack(pkg);
  const extras = detectExtras(projectPath);
  const structure = detectStructure(projectPath);

  spinner.succeed("Projeto analisado!");

  console.log("");
  console.log(chalk.cyan(`  Nome: ${pkg.name || "não definido"}`));
  console.log(chalk.cyan(`  Stack detectada: ${stack.length > 0 ? stack.map((s) => s.label).join(", ") : "nenhuma reconhecida"}`));
  console.log("");

  const readmePath = path.join(projectPath, "README.md");

  if (fs.existsSync(readmePath)) {
    const { overwrite } = await inquirer.prompt([
      {
        type: "confirm",
        name: "overwrite",
        message: "Já existe um README.md nesse projeto. Sobrescrever (o antigo é salvo como README.old.md)?",
        default: false,
      },
    ]);

    if (!overwrite) {
      console.log(chalk.yellow("Operação cancelada. Nenhum arquivo foi alterado."));
      return;
    }

    fs.copyFileSync(readmePath, path.join(projectPath, "README.old.md"));
    console.log(chalk.gray("  (README anterior salvo como README.old.md)"));
  }

  const content = buildReadme({ pkg, stack, extras, structure });
  fs.writeFileSync(readmePath, content, "utf-8");

  console.log("");
  console.log(chalk.green("✔ README.md gerado com sucesso!"));
  console.log(chalk.gray(`  ${readmePath}`));
  console.log("");
  console.log(chalk.cyan("→ Revise o conteúdo e ajuste a descrição do projeto antes de enviar pro GitHub."));
  console.log("");
}
