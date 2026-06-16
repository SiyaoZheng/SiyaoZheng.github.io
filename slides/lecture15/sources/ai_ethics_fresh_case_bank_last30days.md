# 第十五讲 AI 伦理新鲜案例库

检索日期：2026-06-16  
检索窗口：最近 30 天为主，辅以同窗口新闻与官方材料。  
方法：使用 `/last30days` 检索 Reddit、X、Hacker News、GitHub 等社区信号，并用 WebSearch 补充法院、学校、监管和媒体来源。  
原始抓取：`/Users/siyaozheng/Documents/Last30Days/ai-ethics-responsible-ai-classroom-cases-for-social-science-students-raw-v3.md`

这份不是“AI 伦理原则清单”，而是可直接放进课堂的案例卡。主线建议：**AI 伦理不是背原则，而是出事以后问三件事：谁受伤，谁核验，谁负责。**

## 一句话讲课主线

1. 从“好用”开始：AI 可以帮学生、律师、学校和平台提速。
2. 到“误用”转折：它会幻觉、伪造、放大垃圾信息、制造非自愿图像和假公共意见。
3. 到“谁负责”收束：真正的伦理问题不是“AI 有没有错”，而是机构是否设计了核验、申诉、审计、告知和补救机制。

## 可讲案例卡

### 1. 13 个词就能污染 AI 搜索

- 课堂钩子：如果一个 Reddit 评论只加十几个词，就能让 AI 搜索推荐一个虚构产品，学生还会相信“AI 查过很多资料”吗？
- 发生了什么：研究者测试发现，在被 AI 搜索/代理检索到的网页里加入短促的推广文本，可能让模型在回答中推荐虚构餐厅、约会 App 或服务。Reddit 上相关讨论在 r/technology 获得高关注，标题直指“短到 13 个词的用户生成文本也能操纵 AI agents”。
- 为什么有伦理含量：这不是传统 SEO，而是 answer engine optimization。信息生态从“影响搜索排名”变成“影响 AI 直接替用户下判断”。
- 怎么讲给社科学生：让学生把它和“问卷题目诱导”“舆论操纵”“平台把关”类比。AI 搜索不是中立窗口，而是一个会被上游语料投喂的社会系统。
- 讨论题：如果品牌雇人发 Reddit 帖让 AI 引用，这是广告、诈骗、公共关系，还是数据污染？
- 可放到期末项目检查表：项目若使用网络检索增强或 RAG，必须说明如何处理社区帖、广告帖、重复帖、低可信来源和恶意投喂。
- 来源链接：[Reddit 抓取条目](https://www.reddit.com/r/technology/comments/1u6i0je/it_is_trivially_easy_to_use_reddit_to_manipulate/)、[Tom's Guide](https://www.tomsguide.com/ai/a-13-word-reddit-comment-can-trick-ai-search-into-recommending-scams-researchers-find)、[Mashable](https://mashable.com/tech/ai-fueling-reddit-spam-problem)

### 2. Google AI Overview 错答：法院说这是 Google 自己的话

- 课堂钩子：搜索引擎给你一堆链接，和 AI 直接告诉你“答案是 X”，法律责任一样吗？
- 发生了什么：德国慕尼黑地区法院初步认定，Google 对 AI Overview 生成的错误陈述可能承担直接责任。案件中 AI Overview 错误地把两家出版公司同诈骗、订阅陷阱和不当商业行为联系起来。Reddit r/technology 上相关帖有近四万分热度。
- 为什么有伦理含量：AI 摘要把“链接到别人说的话”变成“平台自己生成一句权威答案”。责任边界从内容分发变成内容生产。
- 怎么讲给社科学生：这是讲平台责任的好案例。让学生比较三种界面：搜索结果链接、精选摘要、聊天机器人回答。三者的“信任暗示”不同。
- 讨论题：一个系统写着“可能出错，请核验”，是否足以免除平台责任？
- 可放到期末项目检查表：所有自动生成结论必须标注证据来源、置信边界和纠错入口；不能只在页面底部写一行免责声明。
- 来源链接：[The Decoder](https://the-decoder.com/landmark-german-ruling-declares-googles-ai-overviews-are-googles-own-words-and-makes-it-liable-for-false-answers)、[DW](https://www.dw.com/en/german-court-holds-google-liable-for-fake-ai-answers/a-77527661)、[Reuters](https://www.reuters.com/world/google-appeal-german-court-ruling-assigning-liability-ai-overviews-false-claims-2026-06-12)、[Reddit 抓取条目](https://www.reddit.com/r/technology/comments/1u2jt3g/landmark_german_ruling_declares_googles_ai/)

### 3. 律师用了 AI，法庭说：问题不是用了，而是你签字提交了

- 课堂钩子：如果 AI 编出不存在的判例，律师说“我只是用了工具”，这算借口吗？
- 发生了什么：2026-06-03，美国第九巡回法院在 Lnu v. Blanche 中因律师提交包含不存在判例、错误引文和严重误述的文件而制裁两名律师。法院强调，规则不是在“研究和起草”时被违反，而是在律师签字、提交未经核验的材料时被违反。
- 为什么有伦理含量：它把责任从“AI 有没有幻觉”拉回到专业制度：谁签名，谁核验，谁对客户和法院负责。
- 怎么讲给社科学生：让学生把律师换成研究者、记者、政策分析师、咨询公司。AI 可以参与草稿，但不能替代责任主体。
- 讨论题：学生项目里如果 AI 生成了一个假引用，责任在模型、学生、老师，还是课程规则？
- 可放到期末项目检查表：任何 AI 辅助生成的文献、数据、法规、案例，必须逐条人工核验；报告中要保留核验记录。
- 来源链接：[Ninth Circuit PDF](https://cdn.ca9.uscourts.gov/datastore/opinions/2026/06/03/24-4790.pdf)、[Workplace Privacy Report](https://www.workplaceprivacyreport.com/2026/05/articles/artificial-intelligence/ai-hallucinations-in-court-filings-continue-florida-supreme-court-responds-with-a-new-certification-requirement)、[Scientific American](https://www.scientificamerican.com/article/why-lawyers-keep-citing-fake-cases-invented-by-ai)

### 4. 双方律师都靠 AI，法官直接取消审判

- 课堂钩子：如果原告和被告两边都把 AI 幻觉带进法庭，审判还能继续吗？
- 发生了什么：404 Media 报道，一名法官发现案件双方律师都使用 AI 并提交问题材料后，取消审判并把律师移出案件。Hacker News 也抓到这条并形成讨论。
- 为什么有伦理含量：这不是单个坏苹果，而是制度性脆弱性。对抗式制度本来依赖双方相互纠错，但如果双方都把未核验 AI 输出带进来，纠错机制会同时失效。
- 怎么讲给社科学生：适合讲“人类在环”不是口号。人类如果只是在 AI 输出上盖章，系统反而更危险。
- 讨论题：在高风险场景里，AI 使用是否应该强制披露？披露给谁，披露到什么粒度？
- 可放到期末项目检查表：若项目用于高风险判断，不能只写“人工复核”；要说明复核者资质、抽查比例、错误责任和停用条件。
- 来源链接：[404 Media](https://www.404media.co/judge-learns-lawyers-on-both-sides-of-case-used-ai-cancels-trial-kicks-everyone-off-the-case/)、[Hacker News 抓取条目](https://news.ycombinator.com/item?id=48462428)

### 5. 学校 deepfake nude bullying：不是“学生调皮”，而是非自愿性图像伤害

- 课堂钩子：当一个学生用 App 制造同学的裸照，学校该按作弊、霸凌、性骚扰、隐私侵害，还是犯罪处理？
- 发生了什么：最近一个月内，PBS、WSJ、州级政策讨论和学校 AI 政策材料都在集中讨论 AI nudification、非自愿亲密图像和学校治理。Ohio 学校 AI 政策分析明确建议把合成亲密图像作为严重纪律问题，并联动执法和受害者支持。
- 为什么有伦理含量：生成式 AI 把“图像是否真实”变成次要问题。核心伤害是身份、性别、羞辱、传播和失控。
- 怎么讲给社科学生：适合连接性别研究、青少年保护、平台治理和校园制度。也可以让学生比较中美欧不同法律路径。
- 讨论题：如果图片是假的，为什么受害者受到的伤害仍然是真的？
- 可放到期末项目检查表：项目不得生成、上传、展示、二次传播真实人物的敏感合成图像；涉及人脸/声音/身体时需要同意、最小化和删除机制。
- 来源链接：[PBS NewsHour](https://www.pbs.org/video/ai-abuse-1780349345)、[WSJ](https://www.wsj.com/tech/ai-deepfake-nudes-bullying-school-d242b8d4)、[KJK Ohio school AI policy analysis](https://kjk.com/2026/06/12/ohios-july-1-2026-school-ai-policy-deadline-what-districts-educators-and-parents-need-to-know)

### 6. AI 枪支识别漏检：安全技术承诺与现实限制

- 课堂钩子：学校花钱买 AI 枪支识别系统，枪击发生时系统没有报警。那问题是模型错了，摄像头角度错了，还是营销话术错了？
- 发生了什么：Antioch High School 枪击幸存者起诉 AI gun detection 公司 Omnilert，称系统未能在枪击前识别武器，而营销材料暗示其可在开枪前发现枪支。报道指出争议集中在摄像头位置、距离、角度、光照和可见度等限制是否被充分披露。
- 为什么有伦理含量：AI 安全产品不只是准确率问题，还是风险转移问题。学校购买系统后，是否减少了对辅导员、社工、危机干预等其他资源的投入？
- 怎么讲给社科学生：让学生做“采购听证会”：公司、校长、家长、学生、安保专家、受害者律师分别发言。
- 讨论题：一个安全 AI 系统需要多高准确率才可以宣传为“预防悲剧”？
- 可放到期末项目检查表：涉及安全、医疗、教育、司法的系统必须写明失败模式、不可用场景、误报/漏报后果和替代方案。
- 来源链接：[Ars Technica](https://arstechnica.com/tech-policy/2026/06/school-shooting-survivor-sues-ai-gun-detection-firm-after-system-failed-to-spot-weapon)、[Action News 5](https://www.actionnews5.com/2026/05/21/antioch-high-school-shooting-survivor-sues-weapons-detection-company-over-systems-failure-detect-shooters-gun)、[Fox Nashville video](https://www.youtube.com/watch?v=091U9E5baA8)

### 7. 警察被指控用 AI “制造证据”

- 课堂钩子：如果证据可能是 AI 生成的，法院该先相信警察、相信文件，还是要求重新建立证据链？
- 发生了什么：BBC 报道，Derbyshire Police 一名警官因涉嫌使用 AI 系统“创造证据材料”而被刑事调查，并被调离一线岗位。检方表示正在同可能受影响案件的辩方和法院沟通。
- 为什么有伦理含量：这是 AI 与国家权力结合时最敏感的场景。证据链一旦被污染，受影响的不只是一个文档，而是司法信任。
- 怎么讲给社科学生：可以把它放在“AI 幻觉”之后讲，说明幻觉不仅是错别字或假引用，也可能进入强制权力系统。
- 讨论题：AI 生成或辅助生成的证据材料，最低限度需要哪些元数据和审计轨迹？
- 可放到期末项目检查表：任何面向治理/执法/纪律处分的 AI 项目，都必须保留输入、处理过程、模型版本、人工修改和责任人记录。
- 来源链接：[BBC](https://www.bbc.co.uk/news/articles/cy8wppwdxl6o)、[Yahoo/ITV](https://sg.news.yahoo.com/police-officer-investigated-over-alleged-075716155.html)、[Reddit 抓取条目](https://www.reddit.com/r/technology/comments/1u6sjsr/police_officer_accused_of_creating_ai_evidence/)

### 8. KPMG 的 AI 报告自己也幻觉了

- 课堂钩子：一家以审计和可信度为核心业务的咨询公司，发布 AI 报告却被指含有 AI 幻觉，这算不算最讽刺的 AI 伦理案例？
- 发生了什么：KPMG 撤下关于企业 AI 使用的报告，多家被引用机构称报告中的 AI 使用说法不准确或误导。Hacker News 抓到 The Register、CityAM、TechRadar、FT 等多源讨论。
- 为什么有伦理含量：它击中“权威外壳”。学生常常以为咨询报告、白皮书、行业报告比社交媒体可靠，但 AI 时代连“看起来很正式”的 PDF 也需要来源核验。
- 怎么讲给社科学生：把它作为“引用卫生”案例。让学生找出一份漂亮报告中的 claims、sources、evidence 三列是否对得上。
- 讨论题：如果报告本身就是关于 AI 的，是否应该更严格披露 AI 参与写作和核验流程？
- 可放到期末项目检查表：学生报告不能只引用二手摘要；每个关键事实至少回到原始来源或可信的一手文件。
- 来源链接：[The Register](https://www.theregister.com/ai-and-ml/2026/06/12/kpmgs-ai-report-turns-into-a-demo-of-ai-hallucinations/5255029)、[CityAM](https://www.cityam.com/kpmg-report-on-ai-found-riddled-with-ai-hallucinations/)、[TechRadar](https://www.techradar.com/pro/a-major-kpmg-report-on-ai-was-found-to-be-chock-full-of-ai-hallucinations)

### 9. 出版商诉 Meta：训练数据到底是学习、偷窃还是基础设施？

- 课堂钩子：如果一个模型读了几百万本书，它是在学习，还是在复制，还是在吃掉作者和出版社的未来收入？
- 发生了什么：Elsevier、Cengage、Hachette、Macmillan、McGraw Hill 以及作家 Scott Turow 等在 2026-05-05 对 Meta 提起版权诉讼，指控其使用大量受版权保护材料训练 Llama。Reddit r/technology 上相关帖有数千分热度。
- 为什么有伦理含量：版权争议不是技术细节，而是知识生产的政治经济问题。谁提供材料，谁获得收益，谁有选择退出权？
- 怎么讲给社科学生：让学生分组扮演作者、出版商、开源模型开发者、学生用户、公共图书馆、平台公司。
- 讨论题：如果训练不输出原文，是否仍然可能损害作者利益？
- 可放到期末项目检查表：数据来源要写清楚授权状态、许可协议、可再分发性和是否包含受版权保护文本。
- 来源链接：[Holland & Knight](https://www.hklaw.com/en/insights/publications/2026/05/major-publishers-challenge-ai-training-practices)、[UCL Copyright Queries](https://blogs.ucl.ac.uk/copyright/2026/05)、[Reddit 抓取条目](https://www.reddit.com/r/technology/comments/1u6dzgh/major_publishers_sue_meta_for_copyright/)

### 10. AI 影响行动：真实议题，假装普通人的声音

- 课堂钩子：如果一场关于数据中心电费和关税的争论里，发言者看起来像普通美国人，实际上是外国行动者用 ChatGPT 批量生成的，会怎样改变公共讨论？
- 发生了什么：OpenAI 2026-06-10 报告称，PRC-linked influence operations 试图使用 AI 内容影响美国关于 AI 数据中心、能源成本、关税和技术政策的辩论。OpenAI 认为相关行动没有获得真实突破式传播，但模式值得关注。
- 为什么有伦理含量：AI 宣传战不只是“假新闻”，而是把真实社会矛盾包装成虚假的公众声音，污染民主讨论的可信度。
- 怎么讲给社科学生：把它和舆论研究中的 astroturfing、bot farm、议题设置、框架竞争连接起来。
- 讨论题：平台应该删除虚假身份的 AI 内容，还是保留并标注？谁来判断“协调行动”？
- 可放到期末项目检查表：若项目分析社交媒体舆论，必须考虑 bot、协调行为、生成文本、重复模板和身份真实性。
- 来源链接：[OpenAI](https://openai.com/index/prc-linked-influence-operations-ai-debates/)、[Taipei Times](https://www.taipeitimes.com/News/biz/archives/2026/06/12/2003858938)、[Hacker News 抓取条目](https://news.ycombinator.com/item?id=48482043)

### 11. YouTube 自动标注 AI 生成视频：透明度能解决多少？

- 课堂钩子：如果视频平台自动给 AI 生成内容贴标签，用户真的会更会判断吗？
- 发生了什么：YouTube 宣布将自动改进/添加 AI-generated video labels，引发 Hacker News 高热讨论。这个案例适合放在深伪和 misinformation 之后，讨论“标注”作为治理工具的边界。
- 为什么有伦理含量：标注能降低误导，但也可能造成标签疲劳。更难的问题是：谁定义 AI 生成，混合编辑算不算，标签错误怎么办？
- 怎么讲给社科学生：让学生设计一个平台标签系统：图标、文字、弹窗、来源说明、申诉入口、误标纠正。
- 讨论题：如果一个视频 20% 是 AI 生成，80% 是真人拍摄，是否应该贴同样的标签？
- 可放到期末项目检查表：项目若展示生成内容，必须说明何处标注、如何标注、用户能否查看生成/编辑过程。
- 来源链接：[YouTube Blog](https://blog.youtube/news-and-events/improving-ai-labels-viewers-creators/)、[Hacker News 抓取条目](https://news.ycombinator.com/item?id=48299753)

### 12. “我厌倦了和 AI 说话”：AI slop 与日常信任疲劳

- 课堂钩子：不是所有 AI 风险都像法庭制裁或深伪裸照那样极端。有一种风险更日常：你打开网页、客服、搜索、邮件，到处都是“像答案但没有人负责的文本”。
- 发生了什么：Hacker News 上 “I'm Tired of Talking to AI” 获得高热讨论；同一窗口内，Ohio University 专家也在解释 AI slop，即大量低质量、为点击和传播而生成的内容。
- 为什么有伦理含量：这是信息环境层面的慢性污染。伤害不是一次事故，而是用户对文本、平台、客服和知识工作的持续不信任。
- 怎么讲给社科学生：用它做结尾最合适：AI 伦理不只是避免灾难，也是维护日常生活中“我知道谁在跟我说话”的基本信任。
- 讨论题：AI 内容太多以后，学生如何判断哪些文本值得读、值得引用、值得回应？
- 可放到期末项目检查表：项目输出不能只追求“看起来像答案”；要提供来源、限度、责任人和用户反馈机制。
- 来源链接：[HN 抓取条目](https://news.ycombinator.com/item?id=48292224)、[原文](https://orchidfiles.com/im-tired-of-ai-generated-answers/)、[Ohio University](https://www.ohio.edu/news/2026/05/what-ai-slop-ohio-ai-faculty-experts-explain)

## 可以直接放进 PPT 的三组课堂活动

### 活动 A：责任接力赛

把全班分成 6 组：模型开发者、平台、学校/机构、使用者、受害者、监管者。给每组一张案例卡，要求回答：

1. 你们这一方掌握什么信息？
2. 你们这一方能预防什么伤害？
3. 事故发生后，你们这一方应该承担什么补救义务？
4. 如果只能改一个制度设计，你们改什么？

适用案例：Google AI Overview、学校 deepfake、AI gun detection、律师假引用。

### 活动 B：把伦理原则翻译成项目检查表

让学生不要写“本项目遵守公平、透明、隐私”，而是写可检查句子：

1. 数据来自哪里？是否有授权？
2. 是否包含真人姓名、人脸、声音、身体、位置、联系方式？
3. 是否可能影响某人的成绩、就业、福利、医疗、司法、安全？
4. 如果模型错了，谁能发现，谁能申诉，谁负责修正？
5. 有没有记录版本、提示词、数据处理过程和人工修改？
6. 哪些结论不能说？哪些场景不能用？

适用案例：版权诉 Meta、警察 AI 证据、KPMG 报告、AI 搜索污染。

### 活动 C：一分钟伦理听证会

给学生 10 分钟准备，每组用 60 秒陈述一个立场，然后全班投票：

1. Google AI Overview 错答，责任主要在 Google 还是用户核验？
2. 学校 deepfake 事件，第一优先级是惩罚、下架、心理支持还是技术检测？
3. AI 枪支识别漏检，学校是否还应继续采购类似系统？
4. 出版商诉 Meta，训练语料是否需要 opt-in 授权？
5. 律师 AI 假引用，是否应该强制披露使用过哪些 AI 工具？

## 讲课排序建议

1. 开场用 AI search poisoning 或 Google AI Overview：学生马上能理解“AI 不是中立检索”。
2. 中段用律师假引用、KPMG 报告、警察 AI 证据：从个人使用过渡到专业责任。
3. 再用学校 deepfake 和 AI gun detection：进入真实伤害、青少年和安全治理。
4. 最后用版权诉 Meta、影响行动和 AI slop：把视野拉到知识生产、公共舆论和信息生态。

## 质量说明

- `/last30days` 本轮抓到 64 条证据，核心覆盖 Reddit、X、Hacker News、GitHub；YouTube/TikTok/Instagram 在引擎中返回 0 条可用结果，因此这里对视频和政策新闻做了 WebSearch 补强。
- Reddit public JSON 遇到 403，但 RSS/listing fallback 返回了候选，最终有 12 条 Reddit 项目进入原始文件。
- 本文件把排序分数低但课堂价值高的案例人工提升，因为 broad query 下引擎会把“非精确命中”的高价值新闻降权。
