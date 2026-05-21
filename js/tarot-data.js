// 韦特塔罗牌 78张完整数据 — 中文正逆位解读
// Rider-Waite-Smith Tarot Deck — Chinese Data
const TAROT_CARDS = [
  // ==================== 大阿尔卡纳 (Major Arcana) ====================
  {
    id: 0, key: "m00", type: "major",
    name: "愚者", en: "The Fool",
    up_keywords: "新的开始、冒险、天真、自由、无限可能",
    rev_keywords: "鲁莽、犹豫不决、缺乏方向、轻率",
    up_meaning: "一段全新旅程的开始，带着纯真与勇气踏入未知领域。放下过往包袱，跟随直觉前行，宇宙将为你敞开大门。",
    rev_meaning: "你可能因害怕未知而裹足不前，或因过于冲动而忽略了潜在风险。建议暂停脚步，重新审视计划后再出发。"
  },
  {
    id: 1, key: "m01", type: "major",
    name: "魔术师", en: "The Magician",
    up_keywords: "创造力、技能、自信、资源整合、显化",
    rev_keywords: "欺骗、能力滥用、计划受阻、缺乏专注",
    up_meaning: "你拥有实现目标所需的一切资源与能力。运用智慧与技巧将想法化为现实，此刻正是行动的最佳时机。",
    rev_meaning: "注意是否有人在误导你，或你是否未能充分发挥自身潜力。需要检查手中的信息是否真实可靠。"
  },
  {
    id: 2, key: "m02", type: "major",
    name: "女祭司", en: "The High Priestess",
    up_keywords: "直觉、潜意识、智慧、神秘、内省",
    rev_keywords: "忽视直觉、秘密被揭露、情感封闭、浅薄",
    up_meaning: "静下心来倾听内心的声音，答案就在你的潜意识深处。保持耐心与沉静，有些秘密尚未到揭晓之时。",
    rev_meaning: "你可能过度理智化而忽略了直觉的提醒。是时候从过度分析中抽离，重新连接内在的智慧。"
  },
  {
    id: 3, key: "m03", type: "major",
    name: "女皇", en: "The Empress",
    up_keywords: "丰饶、母性、创造力、自然、滋养",
    rev_keywords: "依赖、创造力枯竭、情感窒息、过度保护",
    up_meaning: "丰盛与成长的季节已至，无论事业、感情或创作都将开花结果。拥抱生活中的美好，用爱与温暖滋养身边的人与事。",
    rev_meaning: "你是否在过度照顾他人中迷失了自我？提醒你注意平衡付出与自我关怀，避免创造力被日常琐事耗尽。"
  },
  {
    id: 4, key: "m04", type: "major",
    name: "皇帝", en: "The Emperor",
    up_keywords: "权威、秩序、稳定、领导力、结构",
    rev_keywords: "专制、失控、缺乏纪律、权威滥用",
    up_meaning: "建立清晰的规则与秩序，以稳健的领导力掌控全局。通过自律与责任感赢得尊重，奠定坚实的事业基础。",
    rev_meaning: "警惕权力的滥用或对权威的盲目反抗。你可能感到生活失控，需要重新建立内在的秩序感与边界。"
  },
  {
    id: 5, key: "m05", type: "major",
    name: "教皇", en: "The Hierophant",
    up_keywords: "传统、信仰、指导、教育、精神导师",
    rev_keywords: "挑战传统、教条主义、缺乏独立思考、叛逆",
    up_meaning: "寻求导师的指引或遵循既定的规则与仪式。在传统框架内寻找答案，通过正规学习或精神修行获得成长。",
    rev_meaning: "你正在质疑旧有的信念体系，渴望突破传统的束缚。用自己的方式探索真理，不必完全遵循他人的路径。"
  },
  {
    id: 6, key: "m06", type: "major",
    name: "恋人", en: "The Lovers",
    up_keywords: "爱情、选择、和谐、价值观契合、结合",
    rev_keywords: "分离、价值观冲突、错误选择、不忠",
    up_meaning: "面临重要的选择，需要听从内心的真实声音。无论是感情、合作还是人生方向，基于真诚与价值观的抉择将带来美好的结合。",
    rev_meaning: "可能面临价值观的冲突或关系中的裂痕。避免因一时冲动做出后悔的选择，给自己时间冷静思考。"
  },
  {
    id: 7, key: "m07", type: "major",
    name: "战车", en: "The Chariot",
    up_keywords: "胜利、意志力、掌控力、前进、克服障碍",
    rev_keywords: "失控、失败、方向错误、被情绪左右",
    up_meaning: "凭借强大的意志力与决心，你将战胜一切困难，向着目标全速前进。保持对对立力量的控制，胜利就在前方。",
    rev_meaning: "你正在失去对局势的控制，内心矛盾拉扯导致停滞不前。需暂停下来，重新掌控自己的情绪与方向。"
  },
  {
    id: 8, key: "m08", type: "major",
    name: "力量", en: "Strength",
    up_keywords: "勇气、内在力量、耐心、以柔克刚、信心",
    rev_keywords: "软弱、自我怀疑、失控、缺乏信心",
    up_meaning: "真正的力量来源于内心的坚韧与温柔。以耐心与同理心驯服困境，而非蛮力对抗。你比想象中更强大。",
    rev_meaning: "你正被恐惧和自我怀疑支配，感到力不从心。需要重新连接内在的力量源泉，相信自己的承受能力。"
  },
  {
    id: 9, key: "m09", type: "major",
    name: "隐士", en: "The Hermit",
    up_keywords: "内省、孤独、智慧、寻求真理、指引",
    rev_keywords: "孤立、逃避现实、拒绝建议、迷失",
    up_meaning: "暂时从喧嚣中抽离，向内探索心灵的答案。独处的时光将带来深刻的洞见与灵魂的成长。",
    rev_meaning: "过度的孤独正在变成逃避。注意不要因害怕受伤而彻底封闭自己，适当接受他人的帮助与建议。"
  },
  {
    id: 10, key: "m10", type: "major",
    name: "命运之轮", en: "Wheel of Fortune",
    up_keywords: "命运转折、机遇、周期循环、好运、因果",
    rev_keywords: "厄运、抗拒改变、周期中断、失控",
    up_meaning: "命运的齿轮正在转动，重大的转折点即将到来。顺应时势的变化，抓住机遇乘风而上。",
    rev_meaning: "你可能正经历一段低谷期，或对变化感到无力抗拒。记住周期的本质——低谷之后必然回升。"
  },
  {
    id: 11, key: "m11", type: "major",
    name: "正义", en: "Justice",
    up_keywords: "公平、因果报应、真理、法律、平衡",
    rev_keywords: "不公、偏见、逃避责任、因果失衡",
    up_meaning: "事件将迎来公正的裁决。你过去的行为将带来相应的结果——无论是奖励还是教训，一切皆因你所种之因。",
    rev_meaning: "可能遭遇不公正的对待，或正在逃避应承担的责任。诚实地面对自己，只有真相才能带来真正的解脱。"
  },
  {
    id: 12, key: "m12", type: "major",
    name: "倒吊人", en: "The Hanged Man",
    up_keywords: "牺牲、换个角度看问题、暂停、反思、放手",
    rev_keywords: "无谓牺牲、固执、拖延、拒绝放手",
    up_meaning: "以全新的视角看待眼前的困境，暂时的停顿是为了更深的领悟。学会放手，让宇宙以它自己的方式运作。",
    rev_meaning: "你正在抗拒必要的改变，或做出了无谓的牺牲。扪心自问：这份停顿是领悟还是逃避？"
  },
  {
    id: 13, key: "m13", type: "major",
    name: "死神", en: "Death",
    up_keywords: "结束、转变、重生、放下过去、蜕变",
    rev_keywords: "抗拒改变、停滞、恐惧转变、腐朽",
    up_meaning: "某个阶段或关系即将终结，但每一次结束都预示着新的开始。不破不立，坦然接受转变，你将迎来蜕变与重生。",
    rev_meaning: "你正在死死抓住已经不再适合的人或事物。对改变的恐惧使你陷入停滞，放下才有机会重生。"
  },
  {
    id: 14, key: "m14", type: "major",
    name: "节制", en: "Temperance",
    up_keywords: "平衡、调和、耐心、中庸、融合",
    rev_keywords: "失衡、极端、缺乏节制、冲突",
    up_meaning: "运用中庸之道，调和看似对立的元素。通过耐心与适度，找到生活的平衡点，一切将在和谐中稳步前行。",
    rev_meaning: "你的生活某方面已失去平衡——过度放纵或过度压抑。回归适度，避免走极端。"
  },
  {
    id: 15, key: "m15", type: "major",
    name: "恶魔", en: "The Devil",
    up_keywords: "束缚、欲望、物质主义、成瘾、阴影面",
    rev_keywords: "解脱、觉醒、打破束缚、直面阴影",
    up_meaning: "你被某种执念、关系或物质欲望所困。真正的牢笼来自内心，意识到束缚的存在是挣脱的第一步。",
    rev_meaning: "你正在摆脱不健康的依赖或成瘾行为。这是觉醒与解放的时刻，勇敢面对自己的阴影面。"
  },
  {
    id: 16, key: "m16", type: "major",
    name: "高塔", en: "The Tower",
    up_keywords: "剧变、崩塌、启示、真相揭露、解放",
    rev_keywords: "逃避崩溃、延缓改变、恐惧剧变",
    up_meaning: "看似稳固的结构将遭遇突如其来的冲击。旧有的虚假与不真实将被摧毁，虽然痛苦，但唯有如此真我才能浮现。",
    rev_meaning: "你在极力避免不可避免的改变。但逃避只会延长痛苦的过程，面对真相才能获得真正的重建。"
  },
  {
    id: 17, key: "m17", type: "major",
    name: "星星", en: "The Star",
    up_keywords: "希望、疗愈、灵感、信念、宁静",
    rev_keywords: "绝望、失去信心、疲惫、灵感枯竭",
    up_meaning: "经历了暴风雨的洗礼后，希望之光照亮前路。内心将得到治愈与平静，相信宇宙正以最好的方式引导你。",
    rev_meaning: "你可能正在失去信心或感到前途渺茫。请记住黑暗终将过去，重新寻找生活中那些微小的光亮。"
  },
  {
    id: 18, key: "m18", type: "major",
    name: "月亮", en: "The Moon",
    up_keywords: "潜意识、幻觉、恐惧、梦境、直觉",
    rev_keywords: "恐惧消散、真相浮现、澄清、克服不安",
    up_meaning: "前路笼罩在迷雾之中，潜意识中的恐惧与幻觉逐渐浮现。不要被表象所迷惑，依靠直觉穿越这片不确定的领域。",
    rev_meaning: "迷雾正在散去，真相逐渐浮出水面。一度困扰你的恐惧与迷惑即将被澄清。"
  },
  {
    id: 19, key: "m19", type: "major",
    name: "太阳", en: "The Sun",
    up_keywords: "快乐、成功、活力、自信、真相",
    rev_keywords: "挫败、快乐被遮蔽、缺乏信心、暂时延迟",
    up_meaning: "阳光普照，一切阴霾烟消云散。成功、喜悦与温暖充盈着你的生活。这是展现真实自我、享受生命中美好时光的时刻。",
    rev_meaning: "成功与喜悦可能略被延迟，但这并不改变阳光终将照耀的事实。保持童心与乐观，乌云只是暂时的。"
  },
  {
    id: 20, key: "m20", type: "major",
    name: "审判", en: "Judgement",
    up_keywords: "觉醒、重生、召唤、清算、释怀",
    rev_keywords: "自我批判、拒绝召唤、遗憾、无法释怀",
    up_meaning: "这是灵魂的觉醒时刻，过往的经历将被重新评估。聆听内在的召唤，勇敢迈向人生的新阶段，与过去和解。",
    rev_meaning: "你正在陷入过度的自我批判之中，无法放下过去的错误。学会原谅自己，回应内心真正的召唤。"
  },
  {
    id: 21, key: "m21", type: "major",
    name: "世界", en: "The World",
    up_keywords: "完成、圆满、整合、成就、旅程终点",
    rev_keywords: "未完成、延迟、不完整、缺乏闭环",
    up_meaning: "一段重要的旅程即将圆满结束，你已完成了成长的循环。享受这份成就感，同时准备迎接下一个更大周期的开始。",
    rev_meaning: "某个项目或阶段尚未真正画上句号。需要补完缺失的部分才能进入下一阶段，不要急于求成。"
  },

  // ==================== 权杖牌组 (Wands — 火元素) ====================
  { id: 22, key: "w01", type: "minor", suit: "权杖", num: "首牌", name: "权杖首牌", en: "Ace of Wands", up_keywords: "灵感、新开始、创造力、激情、潜力", rev_keywords: "延迟、缺乏动力、创意枯竭、方向不明", up_meaning: "一股强大的创意与激情正在迸发，抓住这个行动的信号，开启令人兴奋的新项目或人生方向。", rev_meaning: "新计划的启动遭遇阻碍或缺乏足够的激情支撑。等到时机与热情重新点燃再行动。" },
  { id: 23, key: "w02", type: "minor", suit: "权杖", num: "二", name: "权杖二", en: "Two of Wands", up_keywords: "规划、远见、抉择、探索、抱负", rev_keywords: "犹豫不决、缺乏远见、计划受阻、畏惧未知", up_meaning: "拥有远大抱负的你正站在抉择的十字路口。仔细规划未来的方向，你已经具备迈向更广阔天地的资本。", rev_meaning: "对未来的规划感到迷茫，或不敢迈出舒适区。需要重新审视目标，克服对未知的恐惧。" },
  { id: 24, key: "w03", type: "minor", suit: "权杖", num: "三", name: "权杖三", en: "Three of Wands", up_keywords: "扩展、远航、进步、贸易、先见之明", rev_keywords: "停滞、计划受挫、视野狭窄、退回", up_meaning: "前期的规划已经开始显现成果，现在是扩展视野、将事业推向更广阔舞台的时机。", rev_meaning: "扩展计划遭遇阻碍，可能需要退一步重新评估。切勿在准备不足时贸然推进。" },
  { id: 25, key: "w04", type: "minor", suit: "权杖", num: "四", name: "权杖四", en: "Four of Wands", up_keywords: "庆祝、和谐、家园、稳定、成就", rev_keywords: "不稳定、家庭冲突、庆祝延迟、缺乏归属感", up_meaning: "值得庆祝的时刻来临——可能是新居落成、婚礼或事业里程碑。在稳定与和谐中享受劳动成果。", rev_meaning: "家庭的稳定与和谐暂时被打破。庆祝可能延期，需要先处理好基础问题。" },
  { id: 26, key: "w05", type: "minor", suit: "权杖", num: "五", name: "权杖五", en: "Five of Wands", up_keywords: "竞争、冲突、挑战、辩论、成长磨练", rev_keywords: "避免冲突、和解、达成共识、逃避竞争", up_meaning: "激烈的竞争与观点碰撞正在发生。这些挑战本质上是一次磨练，用积极的心态参与其中，你将在竞争中成长。", rev_meaning: "冲突正在平息，或你选择退出一场无意义的竞争。和解与合作比对抗带来更多收获。" },
  { id: 27, key: "w06", type: "minor", suit: "权杖", num: "六", name: "权杖六", en: "Six of Wands", up_keywords: "胜利、认可、荣耀、自信、凯旋", rev_keywords: "失败、傲慢、不被认可、胜利短暂", up_meaning: "你的努力终于获得公众的认可与赞赏。带着自信迎接属于你的荣耀，但请保持谦逊。", rev_meaning: "可能遭遇挫败，或胜利只是昙花一现。自满和骄傲可能使你失去他人的支持。" },
  { id: 28, key: "w07", type: "minor", suit: "权杖", num: "七", name: "权杖七", en: "Seven of Wands", up_keywords: "坚守、抗争、勇气、防御、信念", rev_keywords: "投降、被压倒、自我怀疑、放弃抵抗", up_meaning: "虽面对多方压力与挑战，你仍坚守阵地。凭借勇气与毅力捍卫自己的立场，你终将赢得尊重。", rev_meaning: "你可能感到已经被压垮，是否该坚持值得重新评估。有时候战略性撤退也是一种智慧。" },
  { id: 29, key: "w08", type: "minor", suit: "权杖", num: "八", name: "权杖八", en: "Eight of Wands", up_keywords: "快速行动、消息、进展、势头、目标接近", rev_keywords: "延迟、停滞、混乱、方向错误、等待", up_meaning: "事情正在以极快的速度推进，好消息与突破即将涌入。节奏虽快，一切都在朝着正确方向发展。", rev_meaning: "进展的速度被意外因素拖慢。耐心等待时机，仓促行动反而会导致混乱。" },
  { id: 30, key: "w09", type: "minor", suit: "权杖", num: "九", name: "权杖九", en: "Nine of Wands", up_keywords: "韧性、坚持、最后的坚守、警惕、积累", rev_keywords: "疲惫、放弃、过度防御、偏执", up_meaning: "你已历经漫长的战斗，一身的伤痕却从不曾放弃。最后一程还需坚持，胜利近在咫尺。", rev_meaning: "精疲力竭之际，你感到无法再继续。是否需要放下过度防御的心态？适当示弱并非失败。" },
  { id: 31, key: "w10", type: "minor", suit: "权杖", num: "十", name: "权杖十", en: "Ten of Wands", up_keywords: "负担、责任、压力、过度承担、收尾", rev_keywords: "放下负担、拒绝、授权、过度压力", up_meaning: "你背负了太多本不属于你的重担。学会分配责任，减轻压在你肩上的重量，否则持续的负荷将拖垮你。", rev_meaning: "你开始意识到不需要一个人扛下所有。学会说不，并将任务分配给能够分担的人。" },
  { id: 32, key: "w11", type: "minor", suit: "权杖", num: "侍从", name: "权杖侍从", en: "Page of Wands", up_keywords: "探索、新消息、热情、自由、冒险", rev_keywords: "方向迷失、缺乏热情、坏消息、幼稚", up_meaning: "一个充满热情的探索者正带着好消息而来。新的灵感与冒险即将展开，保持好奇心去探索未知。", rev_meaning: "热情消退导致计划停滞。你收到的消息可能令人失望，或你正因不成熟而错过重要机遇。" },
  { id: 33, key: "w12", type: "minor", suit: "权杖", num: "骑士", name: "权杖骑士", en: "Knight of Wands", up_keywords: "行动、冒险、冲动、激情、速度", rev_keywords: "鲁莽、延误、冲动后悔、三分钟热度", up_meaning: "激情与行动力爆棚的时刻！虽然冒险精神可嘉，但需注意速度与方向同样重要。", rev_meaning: "冲动导致混乱，或行动因外部因素被延迟。你在冒进中可能遗漏了重要的细节。" },
  { id: 34, key: "w13", type: "minor", suit: "权杖", num: "王后", name: "权杖王后", en: "Queen of Wands", up_keywords: "自信、魅力、独立、热忱、创造力", rev_keywords: "嫉妒、自我怀疑、专横、缺乏自信", up_meaning: "以自信与魅力掌控全局，用热情感染身边的每一个人。你独立而富有吸引力，以温暖的方式实现目标。", rev_meaning: "自信正在转化为嫉妒或支配欲。你可能在用强势掩盖内心的不安与自我怀疑。" },
  { id: 35, key: "w14", type: "minor", suit: "权杖", num: "国王", name: "权杖国王", en: "King of Wands", up_keywords: "领导力、远见、创业精神、荣耀、魄力", rev_keywords: "专制、过高期望、缺乏执行力、暴政", up_meaning: "以强大的领导力与远见开创事业。天生的企业家精神使你能够激励他人并推动宏大愿景的实现。", rev_meaning: "过高的期望与专横的态度可能使你失去团队的支持。你的野心是否超出实际执行能力？" },

  // ==================== 圣杯牌组 (Cups — 水元素) ====================
  { id: 36, key: "c01", type: "minor", suit: "圣杯", num: "首牌", name: "圣杯首牌", en: "Ace of Cups", up_keywords: "新感情、直觉、喜悦、丰沛的爱、灵性", rev_keywords: "情感空虚、压抑情感、爱被拒绝、流失", up_meaning: "情感世界的新开始——新的恋情、友谊或灵性觉醒正在流淌。敞开心扉，让爱与喜悦涌入你的生命。", rev_meaning: "情感正在流失，你可能正在压抑真实的感受。学会重新打开心扉，允许自己感受爱与脆弱。" },
  { id: 37, key: "c02", type: "minor", suit: "圣杯", num: "二", name: "圣杯二", en: "Two of Cups", up_keywords: "结合、伴侣、深情、平等、互信", rev_keywords: "分离、信任破裂、不平等、分手", up_meaning: "一段基于平等与互相尊重的关系正在形成。无论是爱情、友谊还是合作，双方的深层连接令人欣喜。", rev_meaning: "关系中的裂痕正在扩大——信任缺失、付出不对等。需要坦诚沟通，否则分离将不可避免。" },
  { id: 38, key: "c03", type: "minor", suit: "圣杯", num: "三", name: "圣杯三", en: "Three of Cups", up_keywords: "欢庆、友谊、团聚、合作、快乐", rev_keywords: "孤立、过度放纵、友谊破裂、流言", up_meaning: "与亲朋好友欢聚的时刻，庆祝当下的幸福。团队合作与友谊的力量将带来意想不到的收获。", rev_meaning: "社交过度变为负担，或友情之中暗藏虚伪。注意适度享乐，有些聚会可能只是表面的热闹。" },
  { id: 39, key: "c04", type: "minor", suit: "圣杯", num: "四", name: "圣杯四", en: "Four of Cups", up_keywords: "沉思、不满、冷漠、错失机会、内省", rev_keywords: "觉醒、接受新机会、走出冷漠、重新投入", up_meaning: "你正沉浸在对现状的不满中，却忽视了身边正在提供的新机会。抬起头，看看那些被你无视的可能性。", rev_meaning: "从冷漠中觉醒，开始注意到生活中的新机遇。是时候从过度反思中走出来，重新投入世界。" },
  { id: 40, key: "c05", type: "minor", suit: "圣杯", num: "五", name: "圣杯五", en: "Five of Cups", up_keywords: "悲伤、失落、遗憾、聚焦失败、哀悼", rev_keywords: "接受、释怀、重拾希望、向前看", up_meaning: "沉浸在失去的痛苦中，眼中只有被打翻的杯子。但请转身看看——你身后仍有完好的希望等待被发现。", rev_meaning: "你正在从悲伤与遗憾中走出来。学会接受过去的损失，转身拥抱那些依然存在的资源与可能。" },
  { id: 41, key: "c06", type: "minor", suit: "圣杯", num: "六", name: "圣杯六", en: "Six of Cups", up_keywords: "怀旧、童年、回忆、单纯、善意", rev_keywords: "沉溺过去、无法成长、遗忘过去、拒绝童年", up_meaning: "温暖的回忆与童年的纯真悄然浮现。也许是故人重逢，也许是内心对单纯时光的怀念，感受这份善意。", rev_meaning: "过度沉溺于过去使你看不到当下。是时候放下往昔的旧梦，拥抱现实中的真实成长。" },
  { id: 42, key: "c07", type: "minor", suit: "圣杯", num: "七", name: "圣杯七", en: "Seven of Cups", up_keywords: "幻想、选择过多、白日梦、欲望、迷惑", rev_keywords: "清醒、做出选择、现实主义、聚焦目标", up_meaning: "众多诱人的选择摆在面前，但并非所有闪闪发光的东西都是真实的。分清幻想与现实，做出明智的抉择。", rev_meaning: "迷雾散去，你终于看清了真正想要的。从众多幻想中找到唯一值得追求的目标，集中精力去实现。" },
  { id: 43, key: "c08", type: "minor", suit: "圣杯", num: "八", name: "圣杯八", en: "Eight of Cups", up_keywords: "离开、放手、追求更高意义、舍弃", rev_keywords: "徘徊、恐惧改变、返回、放弃追求", up_meaning: "放下已经不再滋养你的人事物，独自走向更深远的精神追求。虽有不舍，离开是为了更高的成长。", rev_meaning: "你因恐惧或不舍而停留在已经枯竭的境地。是时候鼓起勇气，真正迈出那一步。" },
  { id: 44, key: "c09", type: "minor", suit: "圣杯", num: "九", name: "圣杯九", en: "Nine of Cups", up_keywords: "愿望成真、满足、幸福、享受、自得", rev_keywords: "不满足、愿望落空、过度自满、空虚", up_meaning: "心愿达成的喜悦溢于言表，这是你在物质与情感上都获得满足的美好时刻。享受这一切，这是你应得的。", rev_meaning: "表面的满足之下隐藏着空虚。你所追求的可能并非内心真正所需，重新审视愿望的根源。" },
  { id: 45, key: "c10", type: "minor", suit: "圣杯", num: "十", name: "圣杯十", en: "Ten of Cups", up_keywords: "家庭圆满、幸福、情感满足、和谐、归属感", rev_keywords: "家庭不谐、梦想破灭、情感疏离、离异", up_meaning: "情感与家庭层面的圆满达成——和谐的家人关系、灵魂深处的归属感，一切关于爱的梦想都在此刻成真。", rev_meaning: "理想中的家庭关系或情感状态受到挑战。现实与期望之间的落差让你感到失落。" },
  { id: 46, key: "c11", type: "minor", suit: "圣杯", num: "侍从", name: "圣杯侍从", en: "Page of Cups", up_keywords: "情感新消息、创意、直觉、浪漫、艺术灵感", rev_keywords: "情感幼稚、消息延迟、灵感流失、被拒", up_meaning: "一个关于情感或创意的温柔消息即将到来。可能是浪漫的表白、创意灵感或久违的问候。", rev_meaning: "情感相关的消息可能令人失望。你的表达方式可能过于幼稚或不成熟，需要更多的耐心与成熟度。" },
  { id: 47, key: "c12", type: "minor", suit: "圣杯", num: "骑士", name: "圣杯骑士", en: "Knight of Cups", up_keywords: "浪漫、魅力、追求理想、艺术气质、邀约", rev_keywords: "情绪化、失望、虚假承诺、不切实际", up_meaning: "一个充满浪漫与魅力的追求者（或机会）正向你走来。追随内心的美好憧憬，但保持一丝现实感。", rev_meaning: "期待中的浪漫邀约令人失望，或对方提出了不切实际的承诺。注意分辨真诚与花言巧语。" },
  { id: 48, key: "c13", type: "minor", suit: "圣杯", num: "王后", name: "圣杯王后", en: "Queen of Cups", up_keywords: "同理心、直觉、情感成熟、关怀、慈悲", rev_keywords: "情感依赖、情绪失控、过度敏感、不健康共情", up_meaning: "以深沉的同理心与直觉滋养他人。你拥有强大的情感智慧，用温柔与慈悲营造安全的港湾。", rev_meaning: "情感过度付出导致消耗。你可能因过度共情而失去边界，或被他人情绪所吞噬。" },
  { id: 49, key: "c14", type: "minor", suit: "圣杯", num: "国王", name: "圣杯国王", en: "King of Cups", up_keywords: "情感掌控、智慧、宽容、成熟领导力、治愈", rev_keywords: "情绪压抑、冷漠、操纵情感、失控", up_meaning: "以成熟稳重的姿态驾驭情绪之海。用智慧与同情心处理复杂的人际关系，成为他人情感的定海神针。", rev_meaning: "表面冷静之下隐藏着未被处理的情绪风暴。你正在压抑真实感受，或利用情感操控他人。" },

  // ==================== 宝剑牌组 (Swords — 风元素) ====================
  { id: 50, key: "s01", type: "minor", suit: "宝剑", num: "首牌", name: "宝剑首牌", en: "Ace of Swords", up_keywords: "清晰、真理、新思维、突破、公正", rev_keywords: "混乱、错误判断、暴力、思维模糊", up_meaning: "思维与真理的利刃划破迷雾，带来绝佳的清晰度与洞察力。新的思想与认知突破正在降临。", rev_meaning: "思维的混乱使你难以看清真相。你可能做出了错误的判断，或被偏见蒙蔽了双眼。" },
  { id: 51, key: "s02", type: "minor", suit: "宝剑", num: "二", name: "宝剑二", en: "Two of Swords", up_keywords: "抉择僵局、逃避、蒙眼、平衡、对峙", rev_keywords: "做出决定、打破僵局、信息过载、释放", up_meaning: "面对两难抉择，你选择闭目塞听以保持表面的平静。但逃避不会解决问题，摘下面纱吧。", rev_meaning: "僵局终于被打破，你做出了那个一直回避的决定。信息过载的状态正在缓解。" },
  { id: 52, key: "s03", type: "minor", suit: "宝剑", num: "三", name: "宝剑三", en: "Three of Swords", up_keywords: "心碎、悲伤、背叛、分离、痛苦真相", rev_keywords: "治愈、释怀、恢复、原谅、走出伤痛", up_meaning: "锥心的痛苦与情感创伤正在袭来——可能是背叛、分离或残酷的真相。允许自己感受这份悲伤，然后开始疗愈。", rev_meaning: "伤口正在愈合，痛苦逐渐消散。你已开始原谅并释怀那些曾让你心碎的人事物。" },
  { id: 53, key: "s04", type: "minor", suit: "宝剑", num: "四", name: "宝剑四", en: "Four of Swords", up_keywords: "休息、恢复、冥想、休整、反思", rev_keywords: "疲惫过度、无法休息、重新投入、躁动", up_meaning: "身心已到极限，是时候退一步休整。安静地冥想、睡眠，为接下来的挑战储备能量。", rev_meaning: "休息足够，准备重新投入战斗。或相反——你因过度疲惫而无法真正放松，身心俱疲。" },
  { id: 54, key: "s05", type: "minor", suit: "宝剑", num: "五", name: "宝剑五", en: "Five of Swords", up_keywords: "冲突、胜利但空虚、挑衅、不光彩", rev_keywords: "和解、放下冲突、悔恨、重建", up_meaning: "你赢得了争斗，但代价沉重——关系破裂或信任荡然无存。扪心自问，这场胜利是否真的值得？", rev_meaning: "冲突正在平息，你选择和解而非对抗。从过去的争斗中吸取教训，重建彼此间的桥梁。" },
  { id: 55, key: "s06", type: "minor", suit: "宝剑", num: "六", name: "宝剑六", en: "Six of Swords", up_keywords: "过渡、前行、疗愈之旅、离开困境", rev_keywords: "停滞、无法放手、回到困境、原地打转", up_meaning: "你正从困境中缓缓过渡到更平静的水域。虽然仍在恢复中，但前进的方向是正确的。", rev_meaning: "你不愿或无法离开当前的困境。可能存在着未解决的情感包袱拖慢了过渡的步伐。" },
  { id: 56, key: "s07", type: "minor", suit: "宝剑", num: "七", name: "宝剑七", en: "Seven of Swords", up_keywords: "策略、欺骗、隐秘行动、机智、独立", rev_keywords: "真相暴露、策略失败、回归诚实、被揭穿", up_meaning: "需要运用策略与机智来应对当前局面。但需注意手段的正当性，有些捷径可能带来意想不到的后果。", rev_meaning: "隐藏的行为或策略正在被曝光。诚实是最好的策略，欺骗终会被识破。" },
  { id: 57, key: "s08", type: "minor", suit: "宝剑", num: "八", name: "宝剑八", en: "Eight of Swords", up_keywords: "束缚、限制、自我禁锢、无助感、受限视角", rev_keywords: "解脱、突破、自由、新的视角、赋权", up_meaning: "你感到被困于无形的牢笼之中。但仔细审视——这些束缚大多来自你内心的恐惧与限制性信念。", rev_meaning: "你开始挣脱自我设限的枷锁，看到前所未有的自由与可能性。禁锢只是暂时的幻觉。" },
  { id: 58, key: "s09", type: "minor", suit: "宝剑", num: "九", name: "宝剑九", en: "Nine of Swords", up_keywords: "焦虑、噩梦、失眠、恐惧、内疚", rev_keywords: "焦虑缓解、希望、噩梦结束、寻求帮助", up_meaning: "深夜被焦虑与恐惧折磨，无法入眠。你需要正视内心的担忧，也许事情并没有你想象的那样糟糕。", rev_meaning: "焦虑与恐惧正在消退。你开始看到光明，或决定寻求外界的帮助与支持。" },
  { id: 59, key: "s10", type: "minor", suit: "宝剑", num: "十", name: "宝剑十", en: "Ten of Swords", up_keywords: "终结、低谷、无路可退、彻底的结束", rev_keywords: "触底反弹、恢复、幸存、教训已获", up_meaning: "情况已经跌至谷底，彻底终结。虽然画面残酷，但物极必反——最坏的时刻已经过去。", rev_meaning: "你已经从最深的创伤中幸存下来。触底之后唯有反弹，一切都在缓慢恢复之中。" },
  { id: 60, key: "s11", type: "minor", suit: "宝剑", num: "侍从", name: "宝剑侍从", en: "Page of Swords", up_keywords: "求知、警觉、新想法、沟通、敏捷思维", rev_keywords: "流言、缺乏思考、防御心态、精神分散", up_meaning: "旺盛的求知欲促使你探索新知识与真相。保持思维敏锐，但注意言辞的锋利不能伤人。", rev_meaning: "散播未经证实的消息将带来麻烦。你的无心之言可能成为伤害他人或自己的利刃。" },
  { id: 61, key: "s12", type: "minor", suit: "宝剑", num: "骑士", name: "宝剑骑士", en: "Knight of Swords", up_keywords: "果断、速度、野心、行动力、锐利", rev_keywords: "鲁莽、不顾后果、冲动、冒进、混乱", up_meaning: "以雷霆之势冲击目标，思维与行动力都处于巅峰。全速前进但别忽略沿途的细节与风险。", rev_meaning: "鲁莽的行动带来了混乱后果。放慢速度，在冲刺之前先看清楚前方的道路。" },
  { id: 62, key: "s13", type: "minor", suit: "宝剑", num: "王后", name: "宝剑王后", en: "Queen of Swords", up_keywords: "洞察力、独立、清晰判断、边界感、阅历", rev_keywords: "冷酷、怨恨、过度理性、封闭内心", up_meaning: "以犀利的洞察力与独立精神审视世间万物。你有着清晰的判断与坚定的边界，不轻易被情感左右。", rev_meaning: "理性变成了冷酷，独立变成了孤立。你的锋芒可能让他人不敢靠近，内心积累了太多怨怼。" },
  { id: 63, key: "s14", type: "minor", suit: "宝剑", num: "国王", name: "宝剑国王", en: "King of Swords", up_keywords: "权威、逻辑、专业、公正、严格标准", rev_keywords: "滥用权力、冷酷无情、判断失准、控制欲", up_meaning: "以无可辩驳的逻辑与专业权威做出公正的判断。你代表了最高的理性标准与法理正义。", rev_meaning: "权力可能正在被滥用，或以所谓"理性"之名行冷酷之实。注意你的判断力是否已经偏移。" },

  // ==================== 星币牌组 (Pentacles — 土元素) ====================
  { id: 64, key: "p01", type: "minor", suit: "星币", num: "首牌", name: "星币首牌", en: "Ace of Pentacles", up_keywords: "财富、新机遇、繁荣、务实、稳固开始", rev_keywords: "财务损失、错失机会、不稳定、贪婪", up_meaning: "一扇通往财富与物质安全的大门正在打开。新的事业机会、投资或收入来源即将显现，以务实的态度把握它。", rev_meaning: "财务上的新机遇可能从指尖溜走，或因贪婪而错失真正的价值。检查你的财务规划是否存在漏洞。" },
  { id: 65, key: "p02", type: "minor", suit: "星币", num: "二", name: "星币二", en: "Two of Pentacles", up_keywords: "平衡、灵活应变、多任务、适应、变通", rev_keywords: "失衡、不堪重负、混乱、财务困境", up_meaning: "在多重责任与资源之间寻找动态平衡。生活如戏法般忙碌，但你有能力灵活应对各种变化。", rev_meaning: "忙碌变成了应接不暇，平衡被打破后可能面临财务或时间管理上的危机。" },
  { id: 66, key: "p03", type: "minor", suit: "星币", num: "三", name: "星币三", en: "Three of Pentacles", up_keywords: "团队合作、技艺、规划、专业、精益求精", rev_keywords: "合作失败、偷工减料、缺乏技能、各自为政", up_meaning: "精湛的技艺与团队合作相得益彰。通过周密的规划与协作，你正在打造经得起时间考验的成果。", rev_meaning: "团队合作出现裂痕，或工作质量因偷工减料而下降。需重新审视每个环节的执行标准。" },
  { id: 67, key: "p04", type: "minor", suit: "星币", num: "四", name: "星币四", en: "Four of Pentacles", up_keywords: "节俭、守护、安全、控制、保守", rev_keywords: "过度吝啬、放手、财务失控、分享", up_meaning: "牢牢守护已有的财富与资源，追求稳定与安全。但适当的流动与分享才能为未来创造更大的价值。", rev_meaning: "过度紧抓财富反而可能造成流失。学会在安全感与给予之间找到健康的平衡点。" },
  { id: 68, key: "p05", type: "minor", suit: "星币", num: "五", name: "星币五", en: "Five of Pentacles", up_keywords: "贫困、孤立、艰难、信仰危机、物质匮乏", rev_keywords: "恢复、找到出路、重建、回归社区", up_meaning: "物质或精神上的匮乏感笼罩着你，感到被世界遗弃在冰雪之中。请留意身边愿意伸出援手的温暖存在。", rev_meaning: "最艰难的时期正在过去，物质与精神的匮乏即将得到缓解。你重新找到了归属感与出路。" },
  { id: 69, key: "p06", type: "minor", suit: "星币", num: "六", name: "星币六", en: "Six of Pentacles", up_keywords: "给予、接受、慷慨、平衡、资源共享", rev_keywords: "不平等、施舍、条件性的给予、滥用善心", up_meaning: "资源的给予与接受处于健康的平衡之中。无论是付出还是收获，这都是一个体现慷慨与公平的时刻。", rev_meaning: "给予与接受的关系出现不平等——可能是利用善心，或是附带了不该有的条件。" },
  { id: 70, key: "p07", type: "minor", suit: "星币", num: "七", name: "星币七", en: "Seven of Pentacles", up_keywords: "评估、等待、耐心、反思投入、成长", rev_keywords: "不耐烦、投资失败、浪费精力、过早放弃", up_meaning: "暂停下来评估过往的投入是否正在开花结果。耐心观察成长的进程，收获需要时间与持续的努力。", rev_meaning: "对等待失去耐心，或在即将收获之际选择放弃。投资可能未能达到预期回报。" },
  { id: 71, key: "p08", type: "minor", suit: "星币", num: "八", name: "星币八", en: "Eight of Pentacles", up_keywords: "精进、专注、手艺、学习、完善技能", rev_keywords: "倦怠、完美主义、缺乏动力、粗制滥造", up_meaning: "以专注与匠心打磨技艺，日复一日的练习终将铸就大师级的成果。享受精益求精的过程。", rev_meaning: "重复的劳动带来倦怠而非成长。是否陷入了完美主义的陷阱？或失去了精进技艺的初心。" },
  { id: 72, key: "p09", type: "minor", suit: "星币", num: "九", name: "星币九", en: "Nine of Pentacles", up_keywords: "独立、丰裕、享受成果、自律、优雅", rev_keywords: "依赖、财务问题、空虚、炫耀、失去独立", up_meaning: "享受自律与辛勤工作带来的物质丰收。独立而优雅的你拥有了真正属于自己的富足生活。", rev_meaning: "表面的富足可能掩盖着实际的依赖或财务隐患。独立只是一种假象，需要重新审视经济状况。" },
  { id: 73, key: "p10", type: "minor", suit: "星币", num: "十", name: "星币十", en: "Ten of Pentacles", up_keywords: "财富传承、家族、长期稳定、遗产、繁荣", rev_keywords: "家族纠纷、财务损失、遗产问题、不稳定", up_meaning: "物质财富与家族的繁荣达到了顶峰——代代传承的不仅是金钱，更是坚实的家族价值观与根基。", rev_meaning: "家族或长期的财务安排可能出现问题。遗产纠纷或长期投资的损失需要谨慎处理。" },
  { id: 74, key: "p11", type: "minor", suit: "星币", num: "侍从", name: "星币侍从", en: "Page of Pentacles", up_keywords: "学习、务实、新技能、踏实、进取心", rev_keywords: "缺乏动力、拖延、学习障碍、好高骛远", up_meaning: "以务实的态度开启学习新技能的旅程。脚踏实地，一步一个脚印，长期的积累将带来丰厚的回报。", rev_meaning: "学习的进展缓慢或动力不足，可能因为目标过于不切实际。重新设定短期可达成的小目标。" },
  { id: 75, key: "p12", type: "minor", suit: "星币", num: "骑士", name: "星币骑士", en: "Knight of Pentacles", up_keywords: "勤奋、稳重、责任、效率、可靠", rev_keywords: "停滞、懒惰、固执、缺乏进展、乏味", up_meaning: "以坚如磐石的勤奋与耐心推进每一个任务。虽不追求速度，但你无懈可击的可靠性终将带来成功。", rev_meaning: "稳重变成了停滞不前。你过于固守一成不变的方式，导致进展缓慢甚至完全卡住。" },
  { id: 76, key: "p13", type: "minor", suit: "星币", num: "王后", name: "星币王后", en: "Queen of Pentacles", up_keywords: "务实、滋养、富足、持家、安全感", rev_keywords: "忽视家庭、财务混乱、过度物质、缺乏温暖", up_meaning: "以务实而温暖的方式营造一个富足而安全的家园。你懂得如何将有限的资源变得丰裕而妥帖。", rev_meaning: "过度追求物质生活而忽略了家庭与情感的滋养。财务管理可能出现混乱。" },
  { id: 77, key: "p14", type: "minor", suit: "星币", num: "国王", name: "星币国王", en: "King of Pentacles", up_keywords: "财富、稳重、商业头脑、安全感、大师", rev_keywords: "贪婪、腐败、物质主义、财务失误、僵化", up_meaning: "凭借殷实的家底与过人的商业智慧坐拥江山。你是物质世界的大师，稳健中透出不可撼动的底气。", rev_meaning: "对财富的过度追求可能导致道德偏差。僵化的管理方式正在威胁你长久以来建立的稳定帝国。" }
];

// 图像 CDN — jsDelivr 加速的公开领域 RWS 塔罗牌图片
const IMAGE_BASE = "https://cdn.jsdelivr.net/gh/metabismuth/tarot-json@master/cards/";
function getCardImage(key) { return IMAGE_BASE + key + ".jpg"; }

// 三张牌阵位解读
const SPREAD_POSITIONS = [
  { label: "过去", desc: "影响当前局面的过往因素与根源" },
  { label: "现在", desc: "当前所处的状态与核心议题" },
  { label: "未来", desc: "即将到来的趋势与建议方向" }
];
