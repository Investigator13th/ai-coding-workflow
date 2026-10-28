#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const skillRoot = path.resolve(__dirname, '..');
const templatesDir = path.join(skillRoot, 'templates');
const cwd = process.cwd();

console.log('🚀 初始化 AI Coding 项目规范骨架...');

// 1. 确保 Git 存在
if (!fs.existsSync(path.join(cwd, '.git'))) {
  console.log('⚠️ 当前目录未检测到 Git 仓库，请先运行 git init');
}

// 2. 创建 .ai 目录
const dirsToCreate = [
  path.join(cwd, '.ai'),
  path.join(cwd, '.ai', 'prds'),
  path.join(cwd, '.ai', 'plans'),
  path.join(cwd, '.ai', 'templates'),
];

for (const dir of dirsToCreate) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 创建目录: ${path.relative(cwd, dir)}`);
  }
}

// 3. 复制模板到 .ai/templates
const templates = ['prd.md.template', 'plan.md.template', 'AGENTS.md.template', 'DESIGN.md.template'];
for (const tmpl of templates) {
  const src = path.join(templatesDir, tmpl);
  const dest = path.join(cwd, '.ai', 'templates', tmpl);
  if (fs.existsSync(src) && !fs.existsSync(dest)) {
    fs.copyFileSync(src, dest);
    console.log(`📄 复制模板: .ai/templates/${tmpl}`);
  }
}

// 4. 根目录生成 AGENTS.md（若不存在）
const agentsPath = path.join(cwd, 'AGENTS.md');
if (!fs.existsSync(agentsPath)) {
  const tmpl = path.join(templatesDir, 'AGENTS.md.template');
  fs.copyFileSync(tmpl, agentsPath);
  console.log('✅ 生成根目录工程契约: AGENTS.md');
} else {
  console.log('ℹ️ 根目录已存在 AGENTS.md，跳过');
}

// 5. 根目录生成 DESIGN.md（若不存在）
const designPath = path.join(cwd, 'DESIGN.md');
if (!fs.existsSync(designPath)) {
  const tmpl = path.join(templatesDir, 'DESIGN.md.template');
  fs.copyFileSync(tmpl, designPath);
  console.log('✅ 生成根目录设计规范: DESIGN.md');
} else {
  console.log('ℹ️ 根目录已存在 DESIGN.md，跳过');
}

console.log('\n✨ 项目骨架初始化完成！');
console.log('💡 接下来建议：');
console.log('   1. 前往 https://github.com/voltagent/awesome-design-md 挑选设计规范填入 DESIGN.md；');
console.log('   2. 使用 `/plan-prd` 指令开始定义 MVP 需求。');
