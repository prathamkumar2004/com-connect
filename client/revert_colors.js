const fs = require('fs');
const path = require('path');

const directory = 'e:\\com-connect\\client\\src';

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // A mapping to flip everything back to a standard indigo and white theme.
  // Because my previous script aggressively overwrote things with 'lime' and 'black',
  // we'll replace the lime/black tokens back with indigo/gray classes respectively.
  
  const replacements = {
    'bg-black': 'bg-white',
    'bg-\\[#0a0a0a\\]': 'bg-white',
    'bg-\\[#0f0f0f\\]': 'bg-gray-50',
    'bg-\\[#111111\\]': 'bg-gray-100',
    'text-lime-400': 'text-gray-900',
    'text-lime-500': 'text-indigo-600',
    'text-lime-600': 'text-gray-600',
    'text-lime-700': 'text-gray-500',
    'lime-500': 'indigo-600',
    'lime-600': 'indigo-700',
    'lime-400': 'indigo-500',
    'lime-300': 'indigo-400',
    'lime-900': 'indigo-100',
    'border-lime-900': 'border-gray-200',
    'border-lime-800': 'border-gray-300',
    'border-lime-700': 'border-gray-300',
  };

  let modified = content;

  // We completely remove any `dark:` prefixes from classes 
  // so the site forces the light mode rendering on all system settings.
  modified = modified.replace(/dark:[a-zA-Z0-9\[\]\-#]+/g, '');

  for (const [key, value] of Object.entries(replacements)) {
    const re = new RegExp(`(?<=[\\s"'\\\`])${key}(?=[\\s"'\\\`])`, 'g');
    modified = modified.replace(re, value);
  }

  if (content !== modified) {
    fs.writeFileSync(filePath, modified, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      replaceInFile(fullPath);
    }
  }
}

processDirectory(directory);
