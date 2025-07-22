// Simple postinstall script to init Tailwind and TypeScript builds
const { execSync } = require('child_process');

try {
  execSync('npx tailwindcss -i src/renderer/styles.css -o dist/styles.css', { stdio: 'inherit' });
  execSync('npx tsc', { stdio: 'inherit' });
} catch (err) {
  console.error(err);
}
