// scripts/link-vector-fonts.js
const fs = require('fs');
const path = require('path');

const source = path.resolve(__dirname, '../node_modules/react-native-vector-icons/Fonts');
const destination = path.resolve(__dirname, '../assets/fonts');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination, { recursive: true });
}

fs.readdirSync(source).forEach(file => {
  const src = path.join(source, file);
  const dest = path.join(destination, file);
  fs.copyFileSync(src, dest);
  console.log(`✔ Copied ${file}`);
});
