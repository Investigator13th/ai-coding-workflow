# ai-coding-workflow

标准化 AI 敏捷协作与工程交付工作流 Skill（AI Agile Delivery Spec）。

它是一个可安装的 Agent Skill：通过 `/init`、`/plan-prd`、`/plan`、`/demo`、`/tdd`、`/review`、`/ship` 七个阶段指令，规范 AI 与人类从 0 到 1 结对开发的全流程，以**阶段门禁（Quality Gates）**对抗 AI 的过度设计、盲目改码与风格漂移。

## 安装

将本仓库的 `SKILL.md` 复制到你的 Agent 运行时技能目录。以 DSH 为例：

```sh
# Windows PowerShell
New-Item -ItemType Directory -Force -Path "$HOME\.dsh\skills\ai-coding-workflow"
Copy-Item SKILL.md "$HOME\.dsh\skills\ai-coding-workflow\SKILL.md"
```

Claude Code 用户复制到 `~/.claude/skills/ai-coding-workflow/` 即可，格式兼容。

## 命令一览

| 指令 | 阶段 | 交付物 |
| :--- | :--- | :--- |
| `/init` | 0. 基础设施 | Git 仓库 + `.ai/` 目录 + `AGENTS.md` / `DESIGN.md` 骨架 |
| `/plan-prd` | 1. 需求定义 | `.ai/prds/{feature}.prd.md`（强制做减法，只答 What/Why） |
| `/plan` | 2. 方案规划 | `.ai/plans/{feature}.plan.md` + **硬门禁：未批准严禁动码** |
| `/demo` | 3. 视觉原型（可选） | 依 `DESIGN.md` 生成的 Mock 交互页面 |
| `/tdd` | 4. 编码实现 | RED → GREEN → REFACTOR，原子 Commit |
| `/review` | 5. 审查与安全 | 代码质量审计 + 安全专项（鉴权/凭证/注入） |
| `/ship` | 6. 收尾交付 | 构建零报错、测试全绿、PR / Release Notes |

## 目录结构

```
ai-coding-workflow/
├── SKILL.md              # 技能主文件（加载即生效）
├── templates/            # /init 阶段生成的规范模板
│   ├── AGENTS.md.template
│   ├── DESIGN.md.template
│   ├── prd.md.template
│   └── plan.md.template
├── scripts/              # 初始化辅助脚本
│   ├── init.mjs
│   └── init-project.mjs
└── evals/                # 技能行为评测用例
    └── evals.json
```

## PRD 写作规范（Microsoft Style）

自 v1.1.0 起，`/plan-prd` 产出的 PRD 对齐 [Microsoft Writing Style Guide](https://learn.microsoft.com/style-guide/) 的核心规则。动机：PRD 是**人机双向阅读**的文档——既供 AI 消费执行，也供人类评审拍板；而技术方案（plan）纯供 AI 阅读，不套用人类文档风格规范。

PRD 文档强制规则（完整清单见 `SKILL.md` Stage 1）：

- **语气**：面向读者用第二人称，主动语态，现在时。
- **简洁**：短句短段，删除冗词（`in order to` → `to`）；每个句子只承载一个信息点。
- **一致**：同一概念全篇只用一个词；不使用无法判定的状态措辞（「待定」「以后再说」）。
- **行动导向**：用户流程步骤用动词开头；模糊词（「点击某按钮」）改为具体交互动作。
- **格式**：标题句首大写（sentence case）；加粗仅用于强调结构性信号，不用于整段强调。

## 版本历史

| 版本 | 日期 | 变更 |
| :--- | :--- | :--- |
| v1.1.0 | 2026-10-28 | `/plan-prd` 新增 PRD Microsoft Style 写作规范（语气/简洁/一致/行动导向/格式五维），`prd.md.template` 同步内置规范自查段 |
| v1.0.0 | 2026-10-28 | 首个公开发布版本：七阶段工作流 + 硬门禁 + 模板与评测用例 |

## License

MIT
