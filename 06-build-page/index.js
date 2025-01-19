const fs = require('node:fs/promises');
const path = require('node:path');

const dirDist = path.join(__dirname, 'project-dist');

async function main() {
  await fs.mkdir(dirDist, { recursive: true });

  await buildHTML(
    path.join(__dirname, 'template.html'),
    path.join(dirDist, 'index.html'),
  );

  await copyFolderRecursive(
    path.join(__dirname, 'assets'),
    path.join(__dirname, 'project-dist', 'assets'),
  );

  await mergeFiles(
    path.join(__dirname, 'styles'),
    path.join(dirDist, 'style.css'),
  );
}

async function buildHTML(source, target) {
  const components = await fs.readdir(path.join(__dirname, 'components'));
  let htmlTemplate = await fs.readFile(source, {
    encoding: 'utf-8',
  });
  for (const component of components) {
    const name = component.split('.')[0];
    const regex = new RegExp('{{' + name + '}}', 'gi');
    while (htmlTemplate.includes(`{{${name}}}`)) {
      const componentPath = path.join(__dirname, 'components', `${name}.html`);
      const content = await fs.readFile(componentPath, {
        encoding: 'utf-8',
      });
      htmlTemplate = htmlTemplate.replace(regex, content);
    }
  }
  await fs.writeFile(target, htmlTemplate);
}

async function mergeFiles(source, target) {
  fs.writeFile(target, '', () => {});
  const files = await fs.readdir(source);

  for (const file of files) {
    const styles = await fs.readFile(path.join(source, file), {
      encoding: 'utf-8',
    });
    await fs.appendFile(target, styles, { encoding: 'utf-8' }, () => {});
  }
}

async function copyFolderRecursive(source, target) {
  await fs.mkdir(target, { recursive: true });

  const elements = await fs.readdir(source);

  for (const element of elements) {
    const sourcePath = path.join(source, element);
    const targetPath = path.join(target, element);
    const stat = await fs.lstat(sourcePath);
    if (stat.isFile()) {
      await fs.copyFile(sourcePath, targetPath);
    } else if (stat.isDirectory()) {
      await copyFolderRecursive(sourcePath, targetPath);
    }
  }
}

main();
