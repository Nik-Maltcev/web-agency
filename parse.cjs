const fs = require('fs');
const parser = require('@babel/parser');
const code = fs.readFileSync('app/page.tsx','utf8');
try {
  parser.parse(code, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx']
  });
  console.log('parse ok');
} catch (err) {
  console.error('parse error at', err.loc); 
  console.error(err.message);
}
