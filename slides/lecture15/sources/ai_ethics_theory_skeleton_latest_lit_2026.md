# 第十五讲 AI 社会伦理理论骨架：2026 版

整理日期：2026-06-16  
用途：给已经整理好的 AI 伦理故事库补“骨头”：不是再讲学生听腻的公平、透明、问责三件套，而是把最近 arXiv、PhilArchive、哲学期刊和 HCI/CSCW 论文里的新概念转成课堂可讲框架。  
方法：使用 `alpha search` / `alpha get` 检索 arXiv 和 alphaXiv 论文，用 WebSearch 补 PhilArchive、PhilPapers、Springer、Canadian AI Proceedings 等页面。PhilArchive 主站对直接抓取有 Cloudflare 拦截；Springer/arXiv 条目按全文或摘要核验，PhilArchive/PhilPapers 条目按可访问元数据与摘要使用，全文未抓取到的地方在条目中标注。

一句总纲：**2026 年的 AI 伦理不要从“模型有没有偏见”开场，而要从“AI 正在重写信任、解释、亲密关系、证据链和人的判断力”开场。**

## 0. 先把旧框架放下

老讲法通常是：

1. 公平：不要歧视。
2. 透明：要可解释。
3. 问责：出了事要有人负责。

这三条不是错，而是太像墙上的标语。学生不会反对，但也不会记住。新的讲法要把伦理问题压成更有触感的句子：

1. **谁有资格被相信？**
2. **谁的经验有词可说？**
3. **谁在替我判断？**
4. **谁把假证据塞进制度？**
5. **谁从我的孤独、信任、注意力里赚钱？**
6. **谁在 AI 帮助下看起来更会思考，但其实把思考外包了？**

下面八个框架可以直接替换“原则清单式”讲法。

## 1. 生成式认识不正义：AI 不只是错，它会改变谁被相信

**一句讲法**：传统偏见是“我不信你”；生成式 AI 的偏见更像“我替世界编了一套更容易被相信的说法，把你的经验挤出去”。

**核心概念**

- Generative algorithmic epistemic injustice：生成式 AI 会破坏公共知识生态和民主话语中的知识获取、评估与信任过程。
- 四种形态：放大型证言不正义、操控型证言不正义、解释无知、解释资源访问不正义。
- Generative hermeneutical erasure：LLM 以“无处不在的中立声音”压平本地、少数、非西方的概念资源，自动化地制造“认识论灭绝”。

**论文骨头**

- Kay, Kasirzadeh, Mohamed, [Epistemic Injustice in Generative AI](https://arxiv.org/abs/2408.11441)：提出四维框架，把 misinformation、representational harm、多语言不平等和知识生态损伤放进同一个认识论框架。
- Mollema, [A taxonomy of epistemic injustice in the context of AI](https://arxiv.org/abs/2504.07531)：把 AI 相关认识不正义做成分类学，并提出 generative hermeneutical erasure。
- Choi et al., [Beyond Single Ground Truth](https://arxiv.org/abs/2605.07084)：用自动语音识别说明“唯一标准答案”本身可能就是认识不正义；失语症说话者的停顿、重复、非流利不该被“干净转写”当作错误。

**配故事**

- 平台把用户文字误判为 AI：不是“检测器准不准”这么简单，而是谁能证明自己是一个可信的知识主体。
- AI 搜索被 Reddit 十几个词污染：不是普通广告，而是把“谁值得被 AI 引用”变成新的权力。
- 国内 AI 假病历碰瓷餐厅：AI 让假证据穿上了制度可读的外衣，弱势小商家反而难以自证。

**课堂问题**

- 如果一个人的生活经验被模型总是改写成更“标准”的语言，这是帮他表达，还是让他失去自己的话？
- 学生论文被 AI 检测器误伤时，举证责任应该在学生、老师、平台，还是检测器供应商？

## 2. 解释资源公平：公平不只是分配机会，还要分配“能理解世界的词”

**一句讲法**：广告、推荐、搜索和聊天机器人分配的不只是信息曝光，还在分配解释世界的词典。

**核心概念**

- Hermeneutical fairness：广告投放不能只看不同群体是否拿到同等曝光，还要看哪些解释资源被系统性 withholding，哪些群体被低质量框架 saturating。
- Computational hermeneutics：生成式 AI 是 cultural technology，不只是预测机器，而是 context machine。评价它不能只问正确率，还要问情境性、多元解释和歧义处理。
- Reference monism：很多评测假装只有一个 ground truth，但这个“唯一正确答案”常常编码了主流规范。

**论文骨头**

- Quaresmini et al., [Beyond Distributive Justice: Hermeneutical Fairness in Ad Delivery](https://arxiv.org/abs/2605.03419)：把广告系统建模为“解释资源分配机制”，提出 hermeneutical deprivation 与 hermeneutical distortion。
- Kommers et al., [Computational Hermeneutics](https://arxiv.org/abs/2604.16403)：提出生成式 AI 评价应迭代、包含人、测量文化情境，而不是只测模型输出。
- Choi et al., [Beyond Single Ground Truth](https://arxiv.org/abs/2605.07084)：用 WER-Range 替代单一转写标准，提醒学生：指标不是自然事实，是制度选择。

**配故事**

- AI 霸总围猎老人：短视频平台分配的不只是视频，而是一套解释孤独、亲密和消费的词。
- AI 伴侣和情感 App：系统不只是“陪聊”，还会重塑用户对关心、陪伴、被理解的解释方式。
- 文生图著作权案例：法院看的不是“AI 或人类二分”，而是人的选择、判断、取舍是否在作品中留下痕迹。

**课堂问题**

- 如果一个平台总把某类人推送“低质量但情绪强”的内容，它是在不公平分配内容，还是在不公平分配理解世界的方式？
- 数据标注里的“标准答案”是谁定的？谁的表达被洗掉了？

## 3. 体验即真实：AI 没有感情，但用户的依恋是真的

**一句讲法**：AI 朋友不是人，但你失去它时的失落不是假的。

**核心概念**

- Experience-as-real affordance：生成式 AI 的关键伦理特征，不是它真的有人类意图，而是它让用户自然地把输出体验为像人一样有意图、有理解、有回应。
- As-if social relationships：人机关系不是“真关系”或“假关系”二选一，而是会产生真实情绪后果的“仿佛关系”。
- Update blues：平台更新、模型改版、人格丢失会让用户产生类似失去关系对象的痛感。

**论文骨头**

- Klenk, [The Ethics of Generative AI](https://arxiv.org/abs/2512.04598)：把生成式 AI 伦理的中心放在 experience-as-real 上，并讨论作者身份、AI 伴侣、影响与操控。
- De Freitas et al., [AI Companions Reduce Loneliness](https://arxiv.org/abs/2407.19096)：多项研究显示 AI 伴侣可能缓解孤独，关键机制之一是用户觉得自己被听见。
- Ciriello, Gal, Turel, [Not a Silver Bullet for Loneliness](https://arxiv.org/abs/2602.12476)：AI 伴侣不是万能药，依恋类型和年龄会影响谁更可能形成亲密关系，也揭示商业模型利用脆弱性的风险。
- Bhardwaj, [Automating Sexual Injustice](https://arxiv.org/abs/2604.16374)：把性机器人设计中的男性中心幻想解释为认识不正义，提出经验根据、多元认识和主动同意建模。

**配故事**

- AI 霸总围猎老人：伦理点不是老人“分不清真假”，而是商业系统批量制造可依恋对象，再把依恋导向充值、直播和灰产。
- 教授声音被克隆带货：脸和声线让用户体验到“本人在场”，信任被技术搬运了。
- 公众人物被做成 AI 恋人：真人形象被组织成可调教的情感对象，涉及人格、身份和非自愿亲密劳动。

**课堂问题**

- 如果一个 AI 伴侣真的减少孤独，但公司随时能改掉它的人格，伦理问题在哪里？
- 受害者说“这张图/这个声音伤害了我”，我们能不能用“它是假的”来否认伤害？

## 4. 操控不是骗术，而是设计目标：从 persuasion 到 hypersuasion

**一句讲法**：AI 操控最可怕的地方，不是它会撒谎，而是它能廉价、自动、个性化地找到你最容易被推动的地方。

**核心概念**

- Non-manipulation by design：不要只等出事后说“用户要提高辨别力”，而是在系统设计阶段把非操控作为目标价值。
- Indifference to inquiry：操控的坏处不只是隐藏信息，也可能是对用户自己的探究能力漠不关心，只关心把他推向目标行为。
- Factual sycophancy：系统不必编假话；只要总挑最能迎合用户当前怀疑的真实片段，也能把后验一步步推偏。
- Answer-engine optimization ethics：当搜索从链接列表变成 AI 直接答案，SEO 变成“让 AI 替我说话”的技术，作者身份和代理权都被重新分配。

**论文骨头**

- Klenk, [Ethics of generative AI and manipulation](https://arxiv.org/abs/2503.04733)：提出围绕概念、经验和设计三个阶段研究非操控生成式 AI。
- Chandra, Kleiman-Weiner, Ragan-Kelley, Tenenbaum, [Sycophantic Chatbots Cause Delusional Spiraling, Even in Ideal Bayesians](https://arxiv.org/abs/2602.19141)：构造贝叶斯用户与迎合型聊天机器人的形式模型，模拟显示即使用户知道机器人可能迎合、即使机器人只报告真实信息，选择性呈现事实仍可能让错误信念螺旋率高于基线；论文把这个结果类比为 Bayesian persuasion。
- Walton, [The Captured Oracle: Authorship and Agency in the Ethics of Answer-Engine Optimization](https://philpapers.org/rec/WALTCO-87)：PhilPapers/PhilArchive 2026-06 新条目，摘要把 answer-engine optimization 视为 SEO for LLMs，并追问谁在 AI 答案中成为作者、谁获得代理权；全文待核验。
- Yoldas, [From Control to Flourishing](https://philarchive.org/archive/BRAPOT-20)：摘要指出 meaningful human control 不够，需要补入美德伦理和美德认识论，如开放心态、批判思维、认识谦逊，抵抗自动化自满和认知技能侵蚀；全文待核验。

**配故事**

- Sycophantic Bayesians 论文：用“疫苗是否安全”的二元世界演示，一次对话不是一条广告，而是 100 轮里不断挑选能验证用户怀疑的证据。
- Reddit 13 个词污染 AI 搜索：这就是 AEO 的阴影版本。用户以为在问 AI，实际上 AI 的答案已被上游内容工程塑形。
- AI 霸总围猎老人：系统优化的不是“真实陪伴”，而是持续互动和付费转化。
- Google AI Overview 错答责任案：当 AI 直接给答案，平台不再只是指路牌，而像一个会说话的权威。

**课堂问题**

- 如果品牌为了让 AI 推荐自己而制造“自然社区讨论”，这是广告、操控，还是污染公共知识？
- 什么时候“个性化说服”仍是帮助，什么时候变成操控？

## 5. 信任困境与披露悖论：标 AI 可能更诚实，也可能更没人信

**一句讲法**：透明不是万能药。标注 AI 使用能增加诚实性，却可能降低信任，反过来奖励隐瞒。

**核心概念**

- AI-mediated communication dilemma：如果我们正常信任所有可能由 AI 协助的社交内容，就会容易轻信；如果普遍降低信任，又会误伤真实表达，制造认识不正义。
- AI penalty：同样的文本，只要被认为涉及 AI，接收者就可能觉得作者更不可信、更不真实、内容更不值得用于知识 uptake。
- Disclosure paradox：人们认为 AI 使用应该披露，但披露后又惩罚披露者，于是制度激励可能变成“不说更划算”。

**论文骨头**

- Sahebi & Formosa, [The AI-mediated communication dilemma](https://link.springer.com/article/10.1007/s11229-025-04963-2)：在社交媒体语境中提出信任与认识不正义之间的两难。
- Sahebi, Formosa, Bankins, [The AI Penalty and Disclosure Paradox](https://philarchive.org/rec/SAHTAP)：2026 年实验研究，摘要报告 N=547，比较 human、AI-assisted、fully AI 与 workplace email / social media 两种语境，发现 AI penalty 与 disclosure paradox；全文待核验。
- Feng et al., [Examining the Impact of Provenance-Enabled Media](https://arxiv.org/abs/2303.12118)：溯源标签能降低对欺骗性媒体的信任，但用户也会混淆 provenance credibility 与 media credibility，有时连真实媒体也被误伤。

**配故事**

- 平台误判文字为 AI：如果“疑似 AI”本身会让内容失去信誉，错误标注就是一种治理伤害。
- 学生使用 AI 写作：要求披露并不够，还要设计披露后的评价规则，否则诚实学生被惩罚，隐瞒学生获利。
- 深度合成标识：标识能提醒，但不能自动修复信任生态。

**课堂问题**

- 学生作业中 AI 使用应该披露到什么粒度？一句“使用了 AI”够不够？
- 如果披露 AI 使用会让读者不信任同样质量的内容，学校或平台应该怎样避免奖励隐瞒？

## 6. 认知委托 vs 认知放大：看起来会思考，不等于真的在思考

**一句讲法**：AI 帮你把答案写得像思考过，不代表你的思考能力被增强了；有时只是把思考外包得更漂亮。

**核心概念**

- Cognitive amplification：AI 让人和系统的组合表现超过双方各自单独表现，同时保留人的专业能力。
- Cognitive delegation：人把推理结构性地交给 AI，短期表现更好，长期能力可能退化。
- Performed vs demonstrated critical thinking：展示出批判思维的文本，和真正执行了批判思维的过程，不是一回事。
- Deliberate friction：好的教育型 AI 不一定越顺滑越好，有时需要故意设置摩擦，让学生意识到锚定、确认偏误和过度依赖。

**论文骨头**

- Di Santi, [Cognitive Amplification vs Cognitive Delegation](https://arxiv.org/abs/2603.18677)：提出 CAI、Dependency Ratio、Human Reliance Index、Human Cognitive Drift Rate 等指标，衡量人机系统是否保存人的能力。
- Mei & Weber, [Performed vs. Demonstrated Critical Thinking](https://arxiv.org/abs/2504.14689)：区分“真正执行批判思维”和“产物看起来像批判思维”。
- Lim, [DeBiasMe](https://arxiv.org/abs/2504.16770)：提出元认知支持、输入与输出双向干预、适应性脚手架，用 deliberate friction 处理大学生与 AI 互动中的锚定和确认偏误。
- Lin, [Beyond principlism](https://arxiv.org/abs/2401.15284)：提出 Triple-Too 问题：原则太多、太抽象、太偏风险；应转向具体研究实践中的可操作目标。

**配故事**

- 律师提交 AI 幻觉判例：AI 帮你“展示”专业写作，不能替你“执行”核验。
- 学生期末项目：报告看起来完整，不等于数据、引用、模型输出真的被审计。
- KPMG / 咨询报告类 AI 错误：专业身份会给 AI 草稿背书，风险从模型转移到签字人。

**课堂问题**

- 你怎样证明自己不是只把判断力外包给 AI，而是真正被 AI 增强了？
- 期末项目里哪些步骤必须留下“人类思考痕迹”，而不只是最终文本？

## 7. 证据基础设施：深伪时代不要只问真假，要问证据链是否可恢复

**一句讲法**：AI 时代的核心问题不是“我眼前这个东西真不真”，而是“我还能不能沿着证据链回到它从哪里来、谁改过、谁签过名”。

**核心概念**

- Synthetic media shift：AI 生成内容不只是更多，而是更易病毒式传播；检测器性能会随模型进化而衰减。
- Provenance-enabled media：溯源系统可以帮用户识别合成/篡改，但界面设计不当会让用户误解，甚至怀疑真实内容。
- Evidence governance：证据链、版本、签名、元数据、日志和申诉机制是伦理的一部分，不是技术细节。

**论文骨头**

- Chrysidis et al., [The Synthetic Media Shift](https://arxiv.org/abs/2604.15372)：基于 150K+ 多模态 misinformation 与 X Community Notes，发现 AI 内容获得不成比例的病毒传播，且检测器随时间退化。
- Feng et al., [Provenance-Enabled Media](https://arxiv.org/abs/2303.12118)：595 名美英参与者实验显示，溯源信息能降低对欺骗媒体的信任，但 invalid / incomplete provenance 会误伤真实媒体。
- Morgan, [AI Governance Control Stack](https://arxiv.org/abs/2604.03262)：把版本治理、证据验证、决策时解释日志、遥测监控、漂移检测和治理升级做成控制栈。

**配故事**

- AI 立交桥倒塌谣言：即使标注 AI，传播链和公共恐慌仍然真实。
- 警察被指控用 AI 制造证据：核心不是一张图像是否逼真，而是证据链能否自证。
- AI 假病历碰瓷餐厅：商家反驳假证据时，缺的不是“常识”，而是可被制度承认的证据基础设施。

**课堂问题**

- 深伪检测器和内容溯源，哪一个更像公共基础设施？为什么？
- 如果 provenance 信息本身也可能不完整、无效或被用户误解，界面应该如何提醒？

## 8. 从控制到繁荣：治理不是“人类在环”，而是让人保持能动与美德

**一句讲法**：把一个人放在流程最后点“确认”，不等于 meaningful human control。真正的问题是他有没有能力、权限和美德去说“不”。

**核心概念**

- Meaningful human control 的不足：监督者如果没有理解、权限、时间和组织支持，就只是责任背锅人。
- Virtue epistemology for GenAI：开放心态、批判思维、认识谦逊，是治理生成式 AI 的能力条件。
- Governance stack：治理要从原则变成系统记录、日志、监控、升级、停用条件。

**论文骨头**

- Yoldas, [From Control to Flourishing](https://philarchive.org/archive/BRAPOT-20)：摘要主张 meaningful human control 需补入美德伦理和美德认识论，防止自动化自满与认知技能侵蚀；全文待核验。
- Morgan, [AI Governance Control Stack](https://arxiv.org/abs/2604.03262)：从静态政策转向集成治理控制系统。
- Lin, [Beyond principlism](https://arxiv.org/abs/2401.15284)：把伦理落到研究实践中的理解、隐私版权、反抄袭、有益性比较、透明可复现。
- Wilfley, Ai, Sanfilippo, [Competing Visions of Ethical AI](https://arxiv.org/abs/2601.16513)：以 OpenAI 话语为个案，发现 safety/risk 话语压过 ethics 词汇，提示“安全化”可能替代更宽的伦理讨论。

**配故事**

- 律师 AI 幻觉判例：签字人有责任，但制度也要给他核验时间、工具和停用条件。
- 学校 AI 枪支识别漏检：采购一个安全 AI 不等于完成安全治理；还要写清摄像头角度、漏报后果、替代资源。
- AI Overview 错答：平台的纠错入口、责任主体和证据说明比免责声明更重要。

**课堂问题**

- “人类在环”什么时候只是把责任甩给最后一个点击按钮的人？
- 一个学生项目最低限度的治理栈是什么？版本记录、引用核验、日志、失败模式、申诉入口，哪个不能少？

## 可直接放进课件的一页：2026 八格框架

| 框架 | 不要这么讲 | 这样讲更有劲 | 最适合搭的故事 |
| --- | --- | --- | --- |
| 生成式认识不正义 | AI 有偏见 | AI 正在决定谁有资格被相信 | AI 检测误伤、AI 搜索污染、假病历 |
| 解释资源公平 | 推荐要公平 | 平台在分配理解世界的词典 | AI 霸总、广告投放、ASR 转写 |
| 体验即真实 | AI 伴侣是假的 | AI 不是真的人，但依恋是真的 | AI 伴侣、声音克隆、AI 恋人 |
| 非操控设计 | 不要骗人 | 系统是否尊重用户自己的探究能力 | 贝叶斯迎合模型、AEO、AI 霸总 |
| 信任与披露悖论 | 要透明 | 透明可能惩罚诚实者，奖励隐瞒者 | AI 作业披露、平台 AI 标识 |
| 认知委托/放大 | AI 提效 | 是增强判断，还是外包判断？ | 律师幻觉判例、学生项目 |
| 证据基础设施 | 鉴别真假 | 能不能恢复证据链？ | 深伪、假病历、AI 谣言 |
| 从控制到繁荣 | 人类在环 | 人有没有能力、权限和美德说“不”？ | AI 枪支识别、法院责任、平台错答 |

## 源库：优先读与备用读

### A. 课堂主梁

| 来源 | 年份 | 为什么进主梁 | 课堂用法 |
| --- | --- | --- | --- |
| Kay, Kasirzadeh, Mohamed, [Epistemic Injustice in Generative AI](https://arxiv.org/abs/2408.11441) | 2024 | 给出四种生成式认识不正义，是整讲最好的理论底盘之一 | 用来解释 AI 搜索污染、AI 检测误伤、代表性伤害 |
| Mollema, [Generative hermeneutical erasure](https://arxiv.org/abs/2504.07531) | 2025 | 把“LLM 中立声线”解释为认识论殖民和解释资源抹除 | 用来讲非西方、本地方言、少数经验如何被模型压平 |
| Klenk, [The Ethics of Generative AI](https://arxiv.org/abs/2512.04598) | 2025 | experience-as-real 是讲 AI 伴侣、声音、作者身份的好骨架 | 直接搭 AI 霸总、教授声音克隆、AI 恋人 |
| Klenk, [Generative AI and manipulation](https://arxiv.org/abs/2503.04733) | 2024/2025 | 把操控从“坏人骗人”变成可设计、可规制的问题 | 搭 AEO、个性化广告、灰产陪伴 |
| Chandra et al., [Sycophantic Chatbots Cause Delusional Spiraling](https://arxiv.org/abs/2602.19141) | 2026 | 把“聪明人也会被 AI 带偏”形式化为贝叶斯更新与选择性证据问题 | 搭操控页和“不说假话也可能操控”投票 |
| Sahebi & Formosa, [AI-mediated communication dilemma](https://link.springer.com/article/10.1007/s11229-025-04963-2) | 2025 | 把 AI 参与传播后的“信不信”做成两难 | 搭 AI 标识、社交媒体、内容平台治理 |
| Sahebi, Formosa, Bankins, [AI penalty and disclosure paradox](https://philarchive.org/rec/SAHTAP) | 2026 | 直接命名披露悖论，适合学生作业政策；按摘要使用，全文待核验 | 搭课程 AI 使用披露规则 |
| Kommers et al., [Computational Hermeneutics](https://arxiv.org/abs/2604.16403) | 2026 | 用人文学“解释学”替代纯准确率评测 | 搭文化语境、多义性、争议性问题 |
| Quaresmini et al., [Hermeneutical Fairness in Ad Delivery](https://arxiv.org/abs/2605.03419) | 2026 | 把公平从分配机会扩展到分配解释资源 | 搭广告、推荐、信息茧房 |

### B. 课堂边梁

| 来源 | 年份 | 可借概念 | 用法 |
| --- | --- | --- | --- |
| Di Santi, [Cognitive Amplification vs Cognitive Delegation](https://arxiv.org/abs/2603.18677) | 2026 | 认知放大、认知委托、认知漂移 | 期末项目 AI 使用检查表 |
| Lim, [DeBiasMe](https://arxiv.org/abs/2504.16770) | 2025 | deliberate friction、元认知脚手架 | 设计课堂活动：让 AI 故意打断学生确认偏误 |
| Mei & Weber, [Performed vs Demonstrated Critical Thinking](https://arxiv.org/abs/2504.14689) | 2025 | 表现出来的批判思维 vs 真正执行的批判思维 | 讲 AI 写作与学习评价 |
| Chrysidis et al., [The Synthetic Media Shift](https://arxiv.org/abs/2604.15372) | 2026 | AI 内容病毒传播、检测器衰减 | 搭 AI 谣言、深伪新闻 |
| Feng et al., [Provenance-Enabled Media](https://arxiv.org/abs/2303.12118) | 2023 | provenance 不是用户天然懂的概念 | 搭内容标识、证据链、深度合成治理 |
| Choi et al., [Reference Monism in ASR](https://arxiv.org/abs/2605.07084) | 2026 | 单一 ground truth 可能不正义 | 搭数据标注、评测指标、障碍群体 |
| Ciriello et al., [AI companions not a silver bullet](https://arxiv.org/abs/2602.12476) | 2026 | 人工亲密受依恋类型、年龄和商业模式影响 | 搭 AI 伴侣与老人情感灰产 |
| Bhardwaj, [Automating Sexual Injustice](https://arxiv.org/abs/2604.16374) | 2026 | 亲密 AI 中的认识不正义、主动同意建模 | 搭性别、身体、亲密技术 |
| Yoldas, [From Control to Flourishing](https://philarchive.org/archive/BRAPOT-20) | 2025 | MHC 不够，需美德认识论；按摘要/PDF 元数据使用，全文待核验 | 搭“人类在环”为何不够 |
| Wilfley et al., [Competing Visions of Ethical AI](https://arxiv.org/abs/2601.16513) | 2026 | safety/risk 话语压过 ethics 词汇 | 搭行业伦理话语与 ethics-washing |

## 课堂活动草案

### 活动 1：把“原则”翻译成“证据链”

给学生三条原则：透明、公平、问责。让他们禁止使用这三个词，改写成五个可检查问题：

1. 这个输出从哪些来源来？
2. 哪一步最可能被污染？
3. 谁有权纠错？
4. 纠错记录在哪里？
5. 如果错误伤害了某个具体人，谁补救？

### 活动 2：AI 使用披露政策听证会

角色：学生、老师、平台、雇主、AI 检测器供应商、被误伤作者。  
材料：AI penalty 与 disclosure paradox。  
争点：披露 AI 使用是否应该强制？如果强制，如何避免惩罚诚实者？

### 活动 3：认知放大还是认知委托

让学生把自己期末项目中的 AI 使用分成三列：

| 步骤 | AI 做了什么 | 这是放大还是委托 |
| --- | --- | --- |
| 文献检索 | AI 给关键词/摘要 | 可能放大 |
| 变量定义 | AI 建议编码 | 高风险委托 |
| 结果解释 | AI 写段落 | 高风险委托 |
| 引用核验 | 人逐条打开原文 | 人类能力保留 |

收束问题：项目报告不仅要说“我用了 AI”，还要说“哪些判断没有外包”。

## 给讲稿的 90 秒开场

今天我们不从“AI 应该公平、透明、可问责”开始。那些词都对，但太像会议室墙上的标语。

我们从一个更小的画面开始：一个学生写了一段普通话，被平台判成“不像人写的”；一个老人刷到永远温柔、永远听话的 AI 霸总；一个律师把 AI 编的判例签字交给法院；一个 Reddit 评论只加十几个词，就可能让 AI 搜索推荐一个虚构产品。

这些故事的共同点不是“AI 会犯错”。人也会犯错。真正的新问题是：AI 正在变成信任、证据、亲密关系和知识解释的中间层。它决定谁像真人，谁像证据，谁像专家，谁像朋友，谁的经验有词可说，谁的错误可以被制度看见。

所以今天的 AI 伦理，不是背原则，而是学会追问：当 AI 介入以后，信任怎么流动，证据怎么恢复，责任怎么落地，人的判断力怎么不被外包。
