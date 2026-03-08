const fs = require('fs');
const path = require('path');

const directory = 'e:\\com-connect\\client\\src';

function applyDarkTheme(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // We are currently in a purely forced light theme state with classes like `bg-white`, `bg-gray-50`, `text-gray-900` 
  // since the dark mode prefixes were aggressively stripped out.
  // Instead of re-adding complex dark mode prefixes, we will just force the app into a beautiful Dark Theme.
  
  const replacements = {
    // Backgrounds 
    'bg-white': 'bg-slate-900',
    'bg-gray-50': 'bg-slate-950',
    'bg-gray-100': 'bg-slate-800',
    'bg-gray-200': 'bg-slate-800',
    'bg-indigo-50': 'bg-indigo-950/30',
    'bg-pink-50': 'bg-pink-950/30',
    'bg-emerald-50': 'bg-emerald-950/30',
    
    // Borders
    'border-gray-100': 'border-slate-800',
    'border-gray-200': 'border-slate-700',
    'border-gray-300': 'border-slate-700',
    
    // Text Primary/Grays
    'text-gray-900': 'text-white',
    'text-gray-800': 'text-gray-100',
    'text-gray-700': 'text-gray-300',
    'text-gray-600': 'text-gray-400',
    'text-gray-500': 'text-gray-400',
    'text-gray-400': 'text-gray-500',
    
    // Accents (keep them vibrant for contrast against dark)
    'text-indigo-600': 'text-indigo-400',
    'text-pink-600': 'text-pink-400',
    'text-emerald-600': 'text-emerald-400',
    'bg-indigo-600': 'bg-indigo-500',
    'hover:bg-indigo-700': 'hover:bg-indigo-600',
    
    // Shadows
    'shadow-sm': 'shadow-none',
    'shadow-md': 'shadow-none',
    'shadow-lg': 'shadow-none',
  };

  for (const [key, value] of Object.entries(replacements)) {
    // Only replace whole words/classes to avoid accidental partial matches
    const re = new RegExp(`(?<=[\\s"'\\\`])${key}(?=[\\s"'\\\`])`, 'g');
    content = content.replace(re, value);
  }
  
  // Custom fix for text inputs or specific text that might have inverted
  content = content.replace(/bg-slate-900/g, 'bg-slate-900 text-white');
  content = content.replace(/bg-slate-900 text-white text-white/g, 'bg-slate-900 text-white'); // Dedup

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated to Dark Theme: ${filePath}`);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      applyDarkTheme(fullPath);
    }
  }
}

processDirectory(directory);
