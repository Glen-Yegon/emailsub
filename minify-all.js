const fs = require('fs');
const CleanCSS = require('clean-css');
const terser = require('terser');

// Minify CSS
const css = fs.readFileSync('styles.css', 'utf8');
const cssOutput = new CleanCSS().minify(css);
fs.writeFileSync('styles.min.css', cssOutput.styles);
console.log('✔ styles.css minified to styles.min.css');

// Minify JS
const js = fs.readFileSync('scripts.js', 'utf8');
terser.minify(js).then(result => {
  fs.writeFileSync('scripts.min.js', result.code);
  console.log('✔ scripts.js minified to scripts.min.js');
}).catch(error => {
  console.error('Error minifying JS:', error);
});
