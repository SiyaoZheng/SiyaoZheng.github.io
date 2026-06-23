# 第十六讲资料库：Loop Engineering 与研究工作流

本资料库服务于《机器学习与自然语言处理》第十六讲。课堂目标不是重复 Agent、Prompt、Skill、Swarm/Team 的定义，而是把全课已经讲过的组件收束为一个可复核、可迭代、可交付的研究工作流。

## 核心资料

1. Addy Osmani, "Loop Engineering", 2026.
   - URL: https://addyosmani.com/blog/loop-engineering/
   - 课堂用途：解释为什么 2026 年的重点从一次性 prompt 转向系统层面的 loop。可提取五个关键词：automations, worktrees, skills, plugins/connectors, sub-agents。
   - 转译：不要把这篇文章讲成新名词介绍，而要讲成“prompt 被放进一个能持续运行的研究系统”。

2. LangChain, "The Art of Loop Engineering", 2026.
   - URL: https://www.langchain.com/blog/the-art-of-loop-engineering
   - 课堂用途：把 loop 拆成 agent loop、verification loop、event-driven loop、hill-climbing loop。
   - 转译：社科项目最缺的往往不是 agent loop，而是 verification loop 和停止条件。

3. OpenAI Cookbook, "Agent Improvement Loop".
   - URL: https://developers.openai.com/cookbook/examples/agents_sdk/agent_improvement_loop
   - 课堂用途：展示 trace -> feedback -> eval -> harness change -> Codex handoff 的改进闭环。
   - 转译：学生期末项目也可以照这个逻辑写：先保存运行记录，再用人工/模型评分找失败，再修改流程。

4. Anthropic, "Building effective agents".
   - URL: https://www.anthropic.com/engineering/building-effective-agents
   - 课堂用途：区分 workflow 和 agent，强调 augmented LLM、prompt chaining、routing、parallelization、orchestrator-workers、evaluator-optimizer 等模式。
   - 转译：不要所有任务都 agent 化；固定流程优先 workflow，开放任务才需要更自主的 agent。

5. Anthropic, "Coding agents and the future of social science research".
   - URL: https://www.anthropic.com/research/coding-agents-social-sciences
   - 课堂用途：给社科课堂的经验事实。Anthropic 调查 1,260 名社科研究者，81% 用过 AI chatbot，但只有 20% 每周使用 coding agents；采用存在性别、学校层级、职业阶段差异。
   - 转译：最后一讲要承认 coding agent 不是程序员小圈子的玩具，但也不能假装所有学生都会立刻变成工程师。重点是把自己的研究判断写进 loop。

6. Anthropic, "How we built our multi-agent research system".
   - URL: https://www.anthropic.com/engineering/multi-agent-research-system
   - 课堂用途：补充多 agent 的高阶工程经验：parallel search, lead agent, subagents, shared context, evaluation.
   - 转译：第十二讲已经讲过 Swarm/Team，本讲只用它说明“loop 需要状态、共享记忆和汇聚规则”。

## 理论底座

1. Yao et al., "ReAct: Synergizing Reasoning and Acting in Language Models", 2022.
   - URL: https://arxiv.org/abs/2210.03629
   - 用途：Agent loop 的基本形态：reasoning traces + actions.

2. Shinn et al., "Reflexion: Language Agents with Verbal Reinforcement Learning", 2023.
   - URL: https://arxiv.org/abs/2303.11366
   - 用途：反思与记忆如何改善后续尝试。

3. Madaan et al., "Self-Refine: Iterative Refinement with Self-Feedback", 2023.
   - URL: https://arxiv.org/abs/2303.17651
   - 用途：模型生成、反馈、修订的基本闭环。

4. Wang et al., "Voyager: An Open-Ended Embodied Agent with Large Language Models", 2023.
   - URL: https://arxiv.org/abs/2305.16291
   - 用途：自动课程、技能库、迭代探索。

5. Google DeepMind, "AlphaEvolve: A Gemini-powered coding agent for designing advanced algorithms", 2025.
   - URL: https://deepmind.google/discover/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/
   - 用途：说明高阶 loop 可以把生成、评估、选择、变异连成算法搜索系统。
   - 转译：课堂上不把它当作学生要实现的目标，而作为“loop 的极端形态”：当评估器明确，系统可以持续改进。

## 本课避免重复的内容

- 不再重复 ReAct 的“思考-行动-观察”定义；第五讲已经讲过。
- 不再重复 Prompt 六段骨架与 Prompt Chaining；第四讲已经讲过。
- 不再重复 Skill 文件结构；第九讲已经讲过。
- 不再重复 Swarm、Team、A2A 的概念；第十二讲已经讲过。
- 不再泛泛提醒“AI 会幻觉，所以要人工复核”；第八、十一、十二、十三、十四、十五讲都讲过。

## 本课新增核心

一句话定义：

> Loop Engineering 是把目标、状态、行动、检查、修正和交付物连成一个能重复运行、能留下证据、能接受评估的研究系统。

学生最终要带走的不是“用了 AI”，而是：

> 我把期末项目设计成了一个可检查的 AI 工作流：输入是什么，Agent 做什么，产物是什么，谁来检查，什么情况下重做，什么情况下停止。
