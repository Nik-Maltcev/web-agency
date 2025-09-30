/**
 * Script to automatically add auth button to home screen
 * Run with: node scripts/add-auth-button.js
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pagePath = join(__dirname, '..', 'app', 'page.tsx');

console.log('🔧 Adding auth button to home screen...\n');

try {
  // Read the file
  let content = readFileSync(pagePath, 'utf8');
  
  // Check if already integrated
  if (content.includes('HomeScreenHeader')) {
    console.log('✅ Auth button already integrated!');
    process.exit(0);
  }
  
  // Add import if not exists
  if (!content.includes("import HomeScreenHeader from '@/components/HomeScreenHeader'")) {
    const importLine = "import HomeScreenHeader from '@/components/HomeScreenHeader';";
    const userButtonImport = "import UserButton from '@/components/auth/UserButton';";
    
    if (content.includes(userButtonImport)) {
      content = content.replace(
        userButtonImport,
        `${userButtonImport}\n${importLine}`
      );
      console.log('✅ Added HomeScreenHeader import');
    }
  }
  
  // Replace the GitHub button with HomeScreenHeader
  const oldHeader = `<div className="absolute top-0 left-0 right-0 z-20 px-6 py-4 flex items-center justify-between animate-[fadeIn_0.8s_ease-out]">
            <ThemeLogo />
            <a 
              href="https://github.com/mendableai/open-lovable" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#36322F] text-white px-3 py-2 rounded-[10px] text-sm font-medium [box-shadow:inset_0px_-2px_0px_0px_#171310,_0px_1px_6px_0px_rgba(58,_33,_8,_58%)] hover:translate-y-[1px] hover:scale-[0.98] hover:[box-shadow:inset_0px_-1px_0px_0px_#171310,_0px_1px_3px_0px_rgba(58,_33,_8,_40%)] active:translate-y-[2px] active:scale-[0.97] active:[box-shadow:inset_0px_1px_1px_0px_#171310,_0px_1px_2px_0px_rgba(58,_33,_8,_30%)] transition-all duration-200"
            >
              <FiGithub className="w-4 h-4" />
              <span>Использовать этот шаблон</span>
            </a>
          </div>`;
  
  const newHeader = `<HomeScreenHeader />`;
  
  if (content.includes('Использовать этот шаблон')) {
    // Try to replace
    const lines = content.split('\n');
    let inGitHubButton = false;
    let startLine = -1;
    let endLine = -1;
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('Использовать этот шаблон')) {
        // Find the start of the div
        for (let j = i; j >= 0; j--) {
          if (lines[j].includes('absolute top-0 left-0 right-0')) {
            startLine = j;
            break;
          }
        }
        // Find the end
        for (let j = i; j < lines.length; j++) {
          if (lines[j].trim() === '</div>' && j > i) {
            endLine = j;
            break;
          }
        }
        break;
      }
    }
    
    if (startLine !== -1 && endLine !== -1) {
      const indent = lines[startLine].match(/^(\s*)/)[1];
      lines.splice(startLine, endLine - startLine + 1, `${indent}<HomeScreenHeader />`);
      content = lines.join('\n');
      console.log('✅ Replaced GitHub button with HomeScreenHeader');
    } else {
      console.log('⚠️  Could not find exact location. Please edit manually.');
      console.log('   See INTEGRATION_GUIDE.md for instructions.');
      process.exit(1);
    }
  }
  
  // Write the file
  writeFileSync(pagePath, content, 'utf8');
  
  console.log('\n✅ Successfully integrated auth button!');
  console.log('\n📝 Next steps:');
  console.log('   1. Test the changes: npm run dev');
  console.log('   2. Commit: git add . && git commit -m "feat: Add auth button to home screen"');
  console.log('   3. Push: git push origin main');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  console.log('\n📚 Please follow manual instructions in INTEGRATION_GUIDE.md');
  process.exit(1);
}
