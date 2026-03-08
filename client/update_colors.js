const fs = require('fs');
const path = require('path');

const directory = 'e:\\com-connect\\client\\src';

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // The user wants black background and neon green color.
  // Neon green in Tailwind is best approximated by `lime-400` or `green-400` or custom `neon-green`.
  // Let's replace:
  // indigo-500 -> lime-500
  // indigo-600 -> lime-500
  // indigo-700 -> lime-600
  // pink-500 -> lime-400
  // pink-600 -> lime-500
  // emerald-500 -> lime-500
  // bg-white -> bg-black
  // bg-slate-900 -> bg-black
  // bg-slate-800 -> bg-[#0a0a0a]
  // bg-gray-50 -> bg-black
  // text-gray-900 -> text-lime-400
  // text-gray-800 -> text-lime-400
  // text-gray-600 -> text-lime-500
  // text-white -> text-lime-400
  // bg-indigo-50 -> bg-[#051005]
  
  const replacements = {
    'indigo-600': 'lime-500',
    'indigo-700': 'lime-600',
    'indigo-500': 'lime-500',
    'indigo-400': 'lime-400',
    'indigo-300': 'lime-300',
    'indigo-100': 'lime-900',
    'indigo-50': 'black',
    'pink-500': 'lime-400',
    'pink-600': 'lime-500',
    'emerald-500': 'lime-500',
    'bg-white': 'bg-black',
    'text-gray-900': 'text-lime-400',
    'text-gray-800': 'text-lime-500',
    'text-gray-700': 'text-lime-500',
    'text-gray-600': 'text-lime-600',
    'text-gray-500': 'text-lime-600',
    'text-gray-400': 'text-lime-700',
    'text-gray-300': 'text-lime-700',
    'bg-gray-50': 'bg-black',
    'bg-gray-100': 'bg-[#0a0a0a]',
    'bg-gray-200': 'bg-[#111111]',
    'border-gray-100': 'border-lime-900',
    'border-gray-200': 'border-lime-800',
    'border-gray-300': 'border-lime-700',
    'text-white': 'text-lime-400',
    'dark:bg-slate-900': 'bg-black',
    'dark:bg-slate-800': 'bg-[#0a0a0a]',
    'dark:bg-slate-700': 'bg-[#0f0f0f]',
    'dark:border-slate-800': 'border-lime-900',
    'dark:border-slate-700': 'border-lime-800',
    'dark:border-slate-600': 'border-lime-700',
    'dark:text-white': 'text-lime-400',
    'dark:text-gray-200': 'text-lime-400',
    'dark:text-gray-300': 'text-lime-500',
    'dark:text-gray-400': 'text-lime-600',
  };

  let modified = content;
  for (const [key, value] of Object.entries(replacements)) {
    // Regex to match exact tailwind class
    const re = new RegExp(`(?<=[\\s"'\\\`])${key}(?=[\\s"'\\\`])`, 'g');
    modified = modified.replace(re, value);
    // Also handle dark:key
    const reDark = new RegExp(`(?<=[\\s"'\\\`])dark:${key}(?=[\\s"'\\\`])`, 'g');
    modified = modified.replace(reDark, value); // just convert dark classes to standard lime classes too since we want 2 colors
  }

  // A couple of specific gradients in the Home / Login pages
  modified = modified.replace(/bg-gradient-to-r from-lime-500 to-lime-400/g, 'bg-none text-lime-400');
  modified = modified.replace(/from-indigo-50 via-white to-pink-50/g, 'bg-black');
  modified = modified.replace(/bg-clip-text text-transparent/g, 'text-lime-400');
  modified = modified.replace(/bg-white\/90/g, 'bg-black/90');
  
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
