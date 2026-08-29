import { cp, mkdir, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const sourceRoot = resolve(dirname(fileURLToPath(import.meta.url)));
const outputRoot = join(sourceRoot, 'dist-pages');

const publicFiles = [
  'index.html',
  'styles.css',
  'app.js',
  'assets/audio/new1.mp3',
  'assets/audio/new2.mp3',
  'assets/audio/new3.mp3',
  'assets/img/grangia.jpg',
  'assets/vendor/gsap.min.js',
];

await rm(outputRoot, { recursive: true, force: true });

let totalBytes = 0;
for (const file of publicFiles) {
  const source = join(sourceRoot, file);
  const destination = join(outputRoot, file);
  await mkdir(dirname(destination), { recursive: true });
  await cp(source, destination);
  totalBytes += (await stat(source)).size;
}

await writeFile(join(outputRoot, '.nojekyll'), '');

console.log(`GitHub Pages artifact: ${publicFiles.length} file, ${(totalBytes / 1024 / 1024).toFixed(2)} MB`);
for (const file of publicFiles) {
  console.log(`- ${relative(sourceRoot, join(sourceRoot, file))}`);
}
