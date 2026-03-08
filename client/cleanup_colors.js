const fs = require('fs');
const path = require('path');

const directory = 'e:\\com-connect\\client\\src';

function repairFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Cleanup duplicate classes or corrupted prefixes left over by the aggressive replace
  content = content.replace(/bg-white bg-white/g, 'bg-white');
  content = content.replace(/text-gray-900 text-gray-900/g, 'text-gray-900');
  content = content.replace(/text-lime-400 text-lime-400/g, 'text-gray-900'); // Catch lingering ones
  content = content.replace(/text-lime-[0-9]{3}/g, 'text-gray-600');
  
  // Fix weird spacing / corrupted selectors
  content = content.replace(/ :bg-/g, ' hover:bg-');
  content = content.replace(/ :text-/g, ' focus:text-');
  content = content.replace(/ \/50 /g, ' '); // Stray opacities
  content = content.replace(/text-gray-600 text-gray-500/g, 'text-gray-600');
  content = content.replace(/text-indigo-600 text-gray-500/g, 'text-gray-700');
  content = content.replace(/text-gray-900 bg-indigo-600/g, 'text-white bg-indigo-600');
  content = content.replace(/text-gray-900 bg-white/g, 'text-indigo-600 bg-white'); // Buttons
  
  // Fix specific hero gradients text
  content = content.replace(/text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500 text-gray-900/g, 'bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Repaired ${filePath}`);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      repairFile(fullPath);
    }
  }
}

processDirectory(directory);
