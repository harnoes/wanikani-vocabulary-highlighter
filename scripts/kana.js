const separateRomaji = input => {
	let finalArray = [];
	let word = "";

	for (let i = 0; i < input.length; i++) {
		const c = input.charAt(i);
		word += c;
		// if it is hiragana/katakana/punctuation, or a value, or the last char
		if (c.match(/[\u3000-\u30ff]/) || i == input.length-1) {
			finalArray.push(word);
			word = "";
		}
			
	}
		
	return finalArray;
}

const convertToKana = text => {
	let finalValue = "";
	const vowels = ["a", "i", "u", "e", "o", "A", "I", "U", "E", "O"];
	const split = separateRomaji(text);
	for (const word of split) {
		let kanaValue = kana[word];
		// handle situations like 'kanji' -> 'kannji'
		if (!kanaValue && word.length > 1 && word.charAt(0) == "n" && !vowels.includes(word.charAt(1)) && word.charAt(1) !== 'y')
			kanaValue = kana[/[a-z]/.test(word.charAt(0)) ? 'nn' : 'NN']+word.charAt(1);
		// handle situations like 'kko' -> 'っこ' and 'shussha' -> 'しゅっしゃ'
		else if (!kanaValue && word.length >=3 && word.charAt(0) === word.charAt(1) && vowels.includes(word.charAt(word.length-1)))
			kanaValue = kana[/[a-z]/.test(word.charAt(0)) ? 'll' : 'LL']+kana[word.slice(1)];
		finalValue += kanaValue ? kanaValue : word;
	}
	return finalValue == undefined ? '' : finalValue;
}

const isAllKana = text => {
	// TODO
}

const isAllKanji = text => {
	// TODO
}

const hasNonJapaneseCharacters = text => {
	// TODO
}

const kana = {
	"a": "あ",
	"i": "い",
	"u": "う",
	"e": "え",
	"o": "お",
	"ka": "か",
	"ki": "き",
	"ku": "く",
	"ke": "け",
	"ko": "こ",
	"ga": "が",
	"gi": "ぎ",
	"gu": "ぐ",
	"ge": "げ",
	"go": "ご",
	"sa": "さ",
	"shi": "し",
	"si": "し",
	"su": "す",
	"se": "せ",
	"so": "そ",
	"za": "ざ",
	"ji": "じ",
	"zu": "ず",
	"ze": "ぜ",
	"zo": "ぞ",
	"ta": "た",
	"chi": "ち",
	"ti": "ち",
	"tsu": "つ",
	"tu": "つ",
	"te": "て",
	"to": "と",
	"da": "だ",
	"di": "ぢ",
	"du": "づ",
	"de": "で",
	"do": "ど",
	"na": "な",
	"ni": "に",
	"nu": "ぬ",
	"ne": "ね",
	"no": "の",
	"ha": "は",
	"hi": "ひ",
	"hu": "ふ",
	"fu": "ふ",
	"he": "へ",
	"ho": "ほ",
	"ba": "ば",
	"bi": "び",
	"bu": "ぶ",
	"be": "べ",
	"bo": "ぼ",
	"pa": "ぱ",
	"pi": "ぴ",
	"pu": "ぷ",
	"pe": "ぺ",
	"po": "ぽ",
	"ma": "ま",
	"mi": "み",
	"mu": "む",
	"me": "め",
	"mo": "も",
	"ra": "ら",
	"ri": "り",
	"ru": "る",
	"re": "れ",
	"ro": "ろ",
	"ya": "や",
	"yu": "ゆ",
	"ye": "いぇ",
	"yo": "よ",
	"wa": "わ",
	"wi": "うぃ",
	"we": "うぇ",
	"wo": "を",
	"nn": "ん",
	"ca": "か",
	"ci": "し",
	"cu": "く",
	"ce": "せ",
	"co": "こ",
	"qa": "くぁ",
	"qi": "くぃ",
	"qu": "く",
	"qe": "くぇ",
	"qo": "くぉ",
	"fa": "ふぁ",
	"fi": "ふぃ",
	"fe": "ふぇ",
	"fo": "ふぉ",
	"la": "ぁ",
	"li": "ぃ",
	"lu": "ぅ",
	"le": "ぇ",
	"lo": "ぉ",
	"xa": "ぁ",
	"xi": "ぃ",
	"xu": "ぅ",
	"xe": "ぇ",
	"xo": "ぉ",
	"va": "ゔぁ",
	"vi": "ゔぃ",
	"vu": "ゔ",
	"ve": "ゔぇ",
	"vo": "ゔぉ",
	"-": "ー",
	",": "、",
	".": "。",
	"ll": "っ",
	"xx": "っ",
	"kya": "きゃ",
	"kyi": "きぃ",
	"kyu": "きゅ",
	"kye": "きぇ",
	"kyo": "きょ",
	"gya": "ぎゃ",
	"gyi": "ぎぃ",
	"gyu": "ぎゅ",
	"gye": "ぎぇ",
	"gyo": "ぎょ",
	"sha": "しゃ",
	"sya": "しゃ",
	"syi": "しぃ",
	"shu": "しゅ",
	"syu": "しゅ",
	"she": "しぇ",
	"sye": "しぇ",
	"sho": "しょ",
	"syo": "しょ",
	"ja": "じゃ",
	"jya": "じゃ",
	"zya": "じゃ",
	"jyi": "じぃ",
	"zyi": "じぃ",
	"ju": "じゅ",
	"jyu": "じゅ",
	"zyu": "じゅ",
	"je": "じぇ",
	"jye": "じぇ",
	"zye": "じぇ",
	"jo": "じょ",
	"jyo": "じょ",
	"zyo": "じょ",
	"cha": "ちゃ",
	"tya": "ちゃ",
	"tyi": "ちぃ",
	"chu": "ちゅ",
	"tyu": "ちゅ",
	"che": "ちぇ",
	"tye": "ちぇ",
	"cho": "ちょ",
	"tyo": "ちょ",
	"dya": "ぢゃ",
	"dyi": "ぢぃ",
	"dyu": "ぢゅ",
	"dye": "ぢぇ",
	"dyo": "ぢょ",
	"hya": "ひゃ",
	"hyi": "ひぃ",
	"hyu": "ひゅ",
	"hye": "ひぇ",
	"hyo": "ひょ",
	"bya": "びゃ",
	"byi": "びぃ",
	"byu": "びゅ",
	"bye": "びぇ",
	"byo": "びょ",
	"pya": "ぴゃ",
	"pyi": "ぴぃ",
	"pyu": "ぴゅ",
	"pye": "ぴぇ",
	"pyo": "ぴょ",
	"fya": "ふゃ",
	"fyu": "ふゅ",
	"fyo": "ふょ",
	"mya": "みゃ",
	"myi": "みぃ",
	"myu": "みゅ",
	"mye": "みぇ",
	"myo": "みょ",
	"nya": "にゃ",
	"nyi": "にぃ",
	"nyu": "にゅ",
	"nye": "にぇ",
	"nyo": "にょ",
	"rya": "りゃ",
	"ryi": "りぃ",
	"ryu": "りゅ",
	"rye": "りぇ",
	"ryo": "りょ",
	"cya": "ちゃ",
	"cyi": "ちぃ",
	"cyu": "ちゅ",
	"cye": "ちぇ",
	"cyo": "ちょ",
	"lya": "ゃ",
	"lyi": "ぃ",
	"lyu": "ゅ",
	"lye": "ぇ",
	"lyo": "ょ",
	"xya": "ゃ",
	"xyi": "ぃ",
	"xyu": "ゅ",
	"xye": "ぇ",
	"xyo": "ょ",
	"vya": "ゔゃ",
	"vyi": "ゔぃ",
	"vyu": "ゔゅ",
	"vye": "ゔぇ",
	"vyo": "ゔょ",
	"A": "ア",
	"I": "イ",
	"U": "ウ",
	"E": "エ",
	"O": "オ",
	"KA": "カ",
	"KI": "キ",
	"KU": "ク",
	"KE": "ケ",
	"KO": "コ",
	"GA": "ガ",
	"GI": "ギ",
	"GU": "グ",
	"GE": "ゲ",
	"GO": "ゴ",
	"SA": "サ",
	"SHI": "シ",
	"SI": "シ",
	"SU": "ス",
	"SE": "セ",
	"SO": "ソ",
	"ZA": "ザ",
	"JI": "ジ",
	"ZU": "ズ",
	"ZE": "ゼ",
	"ZO": "ゾ",
	"TA": "タ",
	"CHI": "チ",
	"TI": "チ",
	"TSU": "ツ",
	"TU": "ツ",
	"TE": "テ",
	"TO": "ト",
	"DA": "ダ",
	"DI": "ヂ",
	"DU": "ヅ",
	"DE": "デ",
	"DO": "ド",
	"NA": "ナ",
	"NI": "ニ",
	"NU": "ヌ",
	"NE": "ネ",
	"NO": "ノ",
	"HA": "ハ",
	"HI": "ヒ",
	"HU": "フ",
	"FU": "フ",
	"HE": "ヘ",
	"HO": "ホ",
	"BA": "バ",
	"BI": "ビ",
	"BU": "ブ",
	"BE": "ベ",
	"BO": "ボ",
	"PA": "パ",
	"PI": "ピ",
	"PU": "プ",
	"PE": "ペ",
	"PO": "ポ",
	"MA": "マ",
	"MI": "ミ",
	"MU": "ム",
	"ME": "メ",
	"MO": "モ",
	"RA": "ラ",
	"RI": "リ",
	"RU": "ル",
	"RE": "レ",
	"RO": "ロ",
	"YA": "ヤ",
	"YU": "ユ",
	"YE": "イェ",
	"YO": "ヨ",
	"WA": "ワ",
	"WI": "ウィ",
	"WE": "ウェ",
	"WO": "ヲ",
	"NN": "ン",
	"LL": "ッ",
	"XX": "ッ",
	"CA": "カ",
	"CI": "シ",
	"CU": "ク",
	"CE": "セ",
	"CO": "コ",
	"QA": "クァ",
	"QI": "クィ",
	"QU": "ク",
	"QE": "クェ",
	"QO": "クォ",
	"FA": "ファ",
	"FI": "フィ",
	"FE": "フェ",
	"FO": "フォ",
	"LA": "ァ",
	"LI": "ィ",
	"LU": "ゥ",
	"LE": "ェ",
	"LO": "ォ",
	"XA": "ァ",
	"XI": "ィ",
	"XU": "ゥ",
	"XE": "ェ",
	"XO": "ォ",
	"VA": "ヴァ",
	"VI": "ヴィ",
	"VU": "ヴ",
	"VE": "ヴェ",
	"VO": "ヴォ",
	"KYA": "キャ",
	"KYI": "キィ",
	"KYU": "キュ",
	"KYE": "キェ",
	"KYO": "キョ",
	"GYA": "ギャ",
	"GYI": "ギィ",
	"GYU": "ギュ",
	"GYE": "ギェ",
	"GYO": "ギョ",
	"SHA": "シャ",
	"SYA": "シャ",
	"SYI": "シィ",
	"SHU": "シュ",
	"SYU": "シュ",
	"SHE": "シェ",
	"SYE": "シェ",
	"SHO": "ショ",
	"SYO": "ショ",
	"JA": "ジャ",
	"JYA": "ジャ",
	"ZYA": "ジャ",
	"JYI": "ジィ",
	"ZYI": "ジィ",
	"JU": "ジュ",
	"JYU": "ジュ",
	"ZYU": "ジュ",
	"JE": "ジェ",
	"JYE": "ジェ",
	"ZYE": "ジェ",
	"JO": "ジョ",
	"JYO": "ジョ",
	"ZYO": "ジョ",
	"CHA": "チャ",
	"TYA": "チャ",
	"TYI": "チィ",
	"CHU": "チュ",
	"TYU": "チュ",
	"CHE": "チェ",
	"TYE": "チェ",
	"CHO": "チョ",
	"TYO": "チョ",
	"DYA": "ヂャ",
	"DYI": "ヂィ",
	"DYU": "ヂュ",
	"DYE": "ヂェ",
	"DYO": "ヂョ",
	"HYA": "ヒャ",
	"HYI": "ヒィ",
	"HYU": "ヒュ",
	"HYE": "ヒェ",
	"HYO": "ヒョ",
	"BYA": "ビャ",
	"BYI": "ビィ",
	"BYU": "ビュ",
	"BYE": "ビェ",
	"BYO": "ビョ",
	"PYA": "ピャ",
	"PYI": "ピィ",
	"PYU": "ピュ",
	"PYE": "ピェ",
	"PYO": "ピョ",
	"FYA": "フャ",
	"FYU": "フュ",
	"FYO": "フョ",
	"MYA": "ミャ",
	"MYI": "ミィ",
	"MYU": "ミュ",
	"MYE": "ミェ",
	"MYO": "ミョ",
	"NYA": "ニャ",
	"NYI": "ニィ",
	"NYU": "ニュ",
	"NYE": "ニェ",
	"NYO": "ニョ",
	"RYA": "リャ",
	"RYI": "リィ",
	"RYU": "リュ",
	"RYE": "リェ",
	"RYO": "リョ",
	"CYA": "チャ",
	"CYI": "チィ",
	"CYU": "チュ",
	"CYE": "チェ",
	"CYO": "チョ",
	"LYA": "ャ",
	"LYI": "ィ",
	"LYU": "ュ",
	"LYE": "ェ",
	"LYO": "ョ",
	"XYA": "ャ",
	"XYI": "ィ",
	"XYU": "ュ",
	"XYE": "ェ",
	"XYO": "ョ",
	"VYA": "ヴャ",
	"VYI": "ヴィ",
	"VYU": "ヴュ",
	"VYE": "ヴェ",
	"VYO": "ヴョ",
}
const jlpt = {
	n5: [
		"書",
		"外",
		"読",
		"長",
		"木",
		"聞",
		"話",
		"間",
		"高",
		"南",
		"東",
		"千",
		"午",
		"四",
		"月",
		"男",
		"語",
		"一",
		"七",
		"万",
		"三",
		"上",
		"下",
		"中",
		"九",
		"二",
		"五",
		"人",
		"今",
		"休",
		"何",
		"先",
		"入",
		"八",
		"六",
		"円",
		"出",
		"前",
		"北",
		"十",
		"半",
		"友",
		"右",
		"名",
		"国",
		"土",
		"大",
		"天",
		"女",
		"子",
		"学",
		"小",
		"山",
		"川",
		"左",
		"年",
		"後",
		"日",
		"時",
		"本",
		"来",
		"校",
		"母",
		"毎",
		"気",
		"水",
		"火",
		"父",
		"生",
		"白",
		"百",
		"行",
		"西",
		"見",
		"車",
		"金",
		"雨",
		"電",
		"食"
	],
	n4: [
		"借",
		"勉",
		"動",
		"品",
		"員",
		"問",
		"堂",
		"帰",
		"建",
		"待",
		"急",
		"悪",
		"料",
		"旅",
		"族",
		"映",
		"春",
		"昼",
		"曜",
		"真",
		"着",
		"秋",
		"英",
		"計",
		"貸",
		"質",
		"野",
		"銀",
		"題",
		"飯",
		"館",
		"駅",
		"意",
		"特",
		"使",
		"別",
		"持",
		"注",
		"習",
		"転",
		"味",
		"夕",
		"多",
		"業",
		"歌",
		"研",
		"弟",
		"新",
		"画",
		"者",
		"試",
		"元",
		"地",
		"場",
		"楽",
		"洋",
		"終",
		"起",
		"送",
		"兄",
		"去",
		"夏",
		"度",
		"明",
		"知",
		"親",
		"言",
		"買",
		"重",
		"開",
		"集",
		"黒",
		"仕",
		"冬",
		"医",
		"台",
		"売",
		"夜",
		"歩",
		"町",
		"病",
		"発",
		"空",
		"答",
		"週",
		"運",
		"風",
		"事",
		"住",
		"公",
		"始",
		"屋",
		"方",
		"服",
		"朝",
		"漢",
		"物",
		"用",
		"界",
		"社",
		"考",
		"道",
		"院",
		"飲",
		"験",
		"不",
		"世",
		"主",
		"京",
		"代",
		"以",
		"会",
		"体",
		"作",
		"写",
		"切",
		"力",
		"口",
		"古",
		"同",
		"図",
		"妹",
		"姉",
		"字",
		"安",
		"室",
		"家",
		"少",
		"工",
		"広",
		"店",
		"強",
		"心",
		"思",
		"手",
		"教",
		"文",
		"早",
		"有",
		"止",
		"正",
		"死",
		"海",
		"牛",
		"犬",
		"理",
		"田",
		"目",
		"私",
		"究",
		"立",
		"紙",
		"肉",
		"自",
		"色",
		"花",
		"茶",
		"赤",
		"走",
		"足",
		"近",
		"通",
		"青",
		"音",
		"魚",
		"鳥"
	],
	n3: [
		"与",
		"互",
		"件",
		"任",
		"似",
		"余",
		"例",
		"供",
		"係",
		"信",
		"倒",
		"候",
		"値",
		"偉",
		"側",
		"偶",
		"備",
		"優",
		"冷",
		"処",
		"列",
		"判",
		"到",
		"制",
		"刻",
		"割",
		"加",
		"務",
		"勤",
		"単",
		"危",
		"原",
		"参",
		"収",
		"取",
		"合",
		"否",
		"吸",
		"吹",
		"告",
		"呼",
		"命",
		"商",
		"喜",
		"因",
		"困",
		"園",
		"在",
		"報",
		"増",
		"変",
		"夢",
		"夫",
		"妻",
		"娘",
		"婚",
		"婦",
		"存",
		"宅",
		"守",
		"完",
		"官",
		"害",
		"容",
		"宿",
		"寄",
		"富",
		"寒",
		"寝",
		"察",
		"居",
		"差",
		"師",
		"席",
		"常",
		"幸",
		"幾",
		"座",
		"庭",
		"式",
		"彼",
		"徒",
		"得",
		"御",
		"忘",
		"忙",
		"念",
		"怒",
		"怖",
		"性",
		"恐",
		"恥",
		"息",
		"悲",
		"情",
		"想",
		"愛",
		"感",
		"慣",
		"戻",
		"払",
		"折",
		"抜",
		"抱",
		"押",
		"招",
		"捕",
		"掛",
		"探",
		"政",
		"敗",
		"散",
		"断",
		"易",
		"昨",
		"晩",
		"景",
		"晴",
		"暗",
		"暮",
		"更",
		"望",
		"期",
		"束",
		"杯",
		"果",
		"格",
		"構",
		"様",
		"権",
		"機",
		"欲",
		"歯",
		"歳",
		"残",
		"段",
		"殺",
		"治",
		"法",
		"洗",
		"流",
		"浮",
		"消",
		"深",
		"済",
		"渡",
		"港",
		"満",
		"演",
		"然",
		"煙",
		"熱",
		"犯",
		"状",
		"猫",
		"現",
		"球",
		"産",
		"留",
		"疑",
		"疲",
		"痛",
		"登",
		"皆",
		"盗",
		"眠",
		"破",
		"確",
		"示",
		"祖",
		"福",
		"程",
		"種",
		"積",
		"突",
		"窓",
		"笑",
		"等",
		"箱",
		"精",
		"約",
		"経",
		"給",
		"絶",
		"続",
		"緒",
		"罪",
		"置",
		"職",
		"背",
		"能",
		"腹",
		"舞",
		"若",
		"薬",
		"術",
		"規",
		"覚",
		"観",
		"解",
		"訪",
		"許",
		"認",
		"誤",
		"説",
		"論",
		"識",
		"警",
		"議",
		"財",
		"貧",
		"責",
		"費",
		"資",
		"賛",
		"越",
		"辞",
		"込",
		"迎",
		"迷",
		"退",
		"逃",
		"途",
		"連",
		"遅",
		"遊",
		"過",
		"達",
		"違",
		"遠",
		"適",
		"選",
		"都",
		"閉",
		"関",
		"降",
		"限",
		"除",
		"険",
		"陽",
		"際",
		"雑",
		"難",
		"静",
		"非",
		"面",
		"靴",
		"頂",
		"頼",
		"願",
		"類",
		"飛",
		"髪",
		"共",
		"成",
		"戦",
		"昔",
		"神",
		"育",
		"良",
		"追",
		"初",
		"利",
		"指",
		"美",
		"争",
		"位",
		"便",
		"働",
		"相",
		"苦",
		"落",
		"談",
		"速",
		"受",
		"君",
		"客",
		"形",
		"路",
		"配",
		"鳴",
		"労",
		"実",
		"放",
		"最",
		"泳",
		"老",
		"表",
		"負",
		"努",
		"太",
		"好",
		"平",
		"横",
		"次",
		"求",
		"組",
		"絵",
		"草",
		"葉",
		"部",
		"具",
		"助",
		"勝",
		"反",
		"失",
		"定",
		"必",
		"支",
		"由",
		"酒",
		"顔",
		"馬",
		"予",
		"付",
		"伝",
		"和",
		"局",
		"数",
		"未",
		"米",
		"調",
		"返",
		"雪",
		"首",
		"乗",
		"対",
		"所",
		"投",
		"民",
		"決",
		"番",
		"船",
		"要",
		"記",
		"進",
		"頭",
		"両",
		"亡",
		"交",
		"他",
		"光",
		"全",
		"内",
		"化",
		"号",
		"向",
		"回",
		"声",
		"市",
		"引",
		"当",
		"役",
		"才",
		"打",
		"曲",
		"末",
		"欠",
		"活",
		"点",
		"王",
		"申",
		"直",
		"石",
		"礼",
		"科",
		"耳"
	],
	n2: [
		"並",
		"久",
		"乱",
		"乳",
		"乾",
		"介",
		"仏",
		"令",
		"伸",
		"伺",
		"依",
		"個",
		"倍",
		"停",
		"傾",
		"像",
		"億",
		"兆",
		"児",
		"党",
		"兵",
		"冊",
		"再",
		"凍",
		"刊",
		"刷",
		"券",
		"刺",
		"則",
		"副",
		"劇",
		"効",
		"勇",
		"募",
		"勢",
		"包",
		"匹",
		"区",
		"卒",
		"協",
		"占",
		"印",
		"卵",
		"厚",
		"双",
		"叫",
		"召",
		"史",
		"各",
		"含",
		"周",
		"咲",
		"喫",
		"営",
		"団",
		"囲",
		"固",
		"圧",
		"坂",
		"均",
		"型",
		"埋",
		"城",
		"域",
		"塔",
		"塗",
		"塩",
		"境",
		"奥",
		"姓",
		"委",
		"季",
		"孫",
		"宇",
		"寺",
		"封",
		"専",
		"将",
		"尊",
		"導",
		"届",
		"層",
		"岩",
		"島",
		"巨",
		"巻",
		"布",
		"希",
		"帯",
		"帽",
		"幅",
		"干",
		"幼",
		"庁",
		"床",
		"底",
		"府",
		"庫",
		"延",
		"律",
		"復",
		"快",
		"恋",
		"患",
		"悩",
		"憎",
		"承",
		"技",
		"担",
		"拝",
		"挟",
		"捜",
		"捨",
		"掃",
		"掘",
		"採",
		"接",
		"換",
		"損",
		"改",
		"敬",
		"旧",
		"昇",
		"普",
		"暴",
		"曇",
		"替",
		"机",
		"材",
		"板",
		"枚",
		"枝",
		"枯",
		"柔",
		"柱",
		"査",
		"栄",
		"根",
		"械",
		"棒",
		"植",
		"極",
		"橋",
		"欧",
		"武",
		"歴",
		"殿",
		"毒",
		"比",
		"永",
		"汗",
		"汚",
		"沈",
		"河",
		"沸",
		"油",
		"況",
		"泉",
		"泊",
		"泥",
		"浅",
		"浴",
		"涙",
		"液",
		"涼",
		"混",
		"清",
		"減",
		"温",
		"測",
		"湖",
		"湯",
		"湾",
		"湿",
		"準",
		"溶",
		"滴",
		"漁",
		"濃",
		"濯",
		"灯",
		"灰",
		"炭",
		"焼",
		"照",
		"燃",
		"燥",
		"爆",
		"片",
		"版",
		"珍",
		"瓶",
		"甘",
		"畜",
		"略",
		"畳",
		"療",
		"省",
		"短",
		"砂",
		"硬",
		"磨",
		"祈",
		"祝",
		"祭",
		"禁",
		"移",
		"税",
		"章",
		"童",
		"符",
		"筆",
		"筒",
		"管",
		"築",
		"簡",
		"籍",
		"粉",
		"粒",
		"紅",
		"純",
		"細",
		"紹",
		"絡",
		"綿",
		"総",
		"緑",
		"編",
		"練",
		"績",
		"缶",
		"署",
		"群",
		"翌",
		"耕",
		"肌",
		"肩",
		"肯",
		"胃",
		"胸",
		"脂",
		"脳",
		"腕",
		"腰",
		"膚",
		"臓",
		"臣",
		"舟",
		"航",
		"般",
		"芸",
		"荒",
		"荷",
		"菓",
		"菜",
		"著",
		"蒸",
		"蔵",
		"薄",
		"衣",
		"袋",
		"被",
		"装",
		"裏",
		"補",
		"複",
		"触",
		"訓",
		"設",
		"詞",
		"詰",
		"誌",
		"課",
		"諸",
		"講",
		"豊",
		"象",
		"貨",
		"販",
		"貯",
		"貿",
		"賞",
		"賢",
		"贈",
		"超",
		"跡",
		"踊",
		"軍",
		"軒",
		"軟",
		"輪",
		"輸",
		"辛",
		"述",
		"逆",
		"造",
		"郊",
		"郵",
		"量",
		"針",
		"鈍",
		"鉱",
		"銅",
		"鋭",
		"録",
		"門",
		"防",
		"陸",
		"隅",
		"階",
		"隻",
		"雇",
		"零",
		"震",
		"革",
		"順",
		"預",
		"領",
		"額",
		"香",
		"駐",
		"骨",
		"鼻",
		"齢",
		"波",
		"秒",
		"競",
		"拾",
		"池",
		"軽",
		"低",
		"央",
		"岸",
		"算",
		"弱",
		"仲",
		"羽",
		"農",
		"宝",
		"星",
		"村",
		"辺",
		"鉄",
		"雲",
		"麦",
		"札",
		"皮",
		"線",
		"戸",
		"氷",
		"県",
		"竹",
		"血",
		"黄",
		"丸",
		"了",
		"州",
		"林",
		"森",
		"毛",
		"玉",
		"皿",
		"糸",
		"虫",
		"角",
		"谷",
		"貝"
	],
	n1: [
		"且",
		"丘",
		"丹",
		"乃",
		"之",
		"乏",
		"乙",
		"也",
		"亀",
		"井",
		"亜",
		"享",
		"亭",
		"亮",
		"仁",
		"仙",
		"仰",
		"企",
		"伊",
		"伎",
		"伏",
		"伐",
		"伯",
		"伴",
		"佐",
		"佳",
		"併",
		"侍",
		"価",
		"侮",
		"侵",
		"促",
		"俊",
		"俗",
		"修",
		"俳",
		"俵",
		"俸",
		"倉",
		"倫",
		"倹",
		"偏",
		"健",
		"偵",
		"偽",
		"傍",
		"傑",
		"傘",
		"催",
		"債",
		"傷",
		"僕",
		"僚",
		"僧",
		"儀",
		"償",
		"充",
		"克",
		"免",
		"典",
		"兼",
		"冒",
		"冗",
		"冠",
		"准",
		"凌",
		"凝",
		"凡",
		"凶",
		"凸",
		"凹",
		"刃",
		"刈",
		"刑",
		"削",
		"剖",
		"剛",
		"剣",
		"剤",
		"剰",
		"創",
		"劣",
		"励",
		"劾",
		"勘",
		"勧",
		"勲",
		"匠",
		"匿",
		"升",
		"卑",
		"卓",
		"博",
		"即",
		"却",
		"卸",
		"厄",
		"厳",
		"及",
		"叔",
		"叙",
		"句",
		"司",
		"吉",
		"后",
		"吐",
		"吟",
		"呂",
		"呈",
		"呉",
		"哀",
		"哉",
		"哲",
		"唄",
		"唆",
		"唇",
		"唯",
		"唱",
		"啓",
		"善",
		"喚",
		"喝",
		"喪",
		"嘆",
		"嘉",
		"嘱",
		"器",
		"噴",
		"囚",
		"圏",
		"坑",
		"坪",
		"垂",
		"垣",
		"執",
		"培",
		"基",
		"堀",
		"堅",
		"堕",
		"堤",
		"堪",
		"塀",
		"塁",
		"塊",
		"塚",
		"塾",
		"墓",
		"墜",
		"墨",
		"墳",
		"壁",
		"壇",
		"壊",
		"壌",
		"士",
		"壮",
		"奇",
		"奈",
		"奉",
		"奏",
		"契",
		"奔",
		"奨",
		"奪",
		"奮",
		"奴",
		"如",
		"妃",
		"妄",
		"妊",
		"妙",
		"妥",
		"妨",
		"姫",
		"姻",
		"姿",
		"威",
		"娠",
		"娯",
		"婆",
		"婿",
		"媒",
		"媛",
		"嫁",
		"嫌",
		"嬉",
		"嬢",
		"孔",
		"孤",
		"宗",
		"宙",
		"宜",
		"宣",
		"宮",
		"宰",
		"宴",
		"寂",
		"密",
		"寛",
		"寡",
		"寧",
		"審",
		"寮",
		"寸",
		"射",
		"尉",
		"尋",
		"尚",
		"就",
		"尺",
		"尼",
		"尽",
		"尾",
		"尿",
		"屈",
		"展",
		"属",
		"履",
		"屯",
		"岐",
		"岬",
		"岳",
		"峠",
		"峡",
		"峰",
		"崇",
		"崎",
		"崩",
		"嵐",
		"巡",
		"巣",
		"巧",
		"己",
		"帆",
		"帝",
		"帥",
		"帳",
		"幕",
		"幣",
		"幹",
		"幻",
		"幽",
		"庄",
		"序",
		"庶",
		"康",
		"庸",
		"廃",
		"廉",
		"廊",
		"廷",
		"弁",
		"弊",
		"弓",
		"弔",
		"弥",
		"弦",
		"弧",
		"張",
		"弾",
		"彩",
		"彫",
		"彰",
		"影",
		"往",
		"征",
		"径",
		"徐",
		"従",
		"循",
		"微",
		"徳",
		"徴",
		"徹",
		"忌",
		"忍",
		"志",
		"応",
		"忠",
		"怠",
		"怪",
		"恒",
		"恨",
		"恩",
		"恭",
		"恵",
		"悔",
		"悟",
		"悠",
		"悦",
		"悼",
		"惑",
		"惜",
		"惨",
		"惰",
		"愉",
		"愚",
		"慈",
		"態",
		"慎",
		"慕",
		"慢",
		"慨",
		"慮",
		"慰",
		"慶",
		"憂",
		"憤",
		"憧",
		"憩",
		"憲",
		"憶",
		"憾",
		"懇",
		"懐",
		"懲",
		"懸",
		"我",
		"戒",
		"戯",
		"房",
		"扇",
		"扉",
		"扱",
		"扶",
		"批",
		"把",
		"抑",
		"抗",
		"択",
		"披",
		"抵",
		"抹",
		"抽",
		"拍",
		"拐",
		"拒",
		"拓",
		"拘",
		"拙",
		"拠",
		"拡",
		"括",
		"拳",
		"拷",
		"挑",
		"挙",
		"振",
		"挿",
		"据",
		"授",
		"掌",
		"排",
		"控",
		"推",
		"措",
		"掲",
		"描",
		"提",
		"揚",
		"握",
		"揮",
		"援",
		"揺",
		"搬",
		"搭",
		"携",
		"搾",
		"摂",
		"摘",
		"摩",
		"撃",
		"撤",
		"撮",
		"撲",
		"擁",
		"操",
		"擦",
		"擬",
		"攻",
		"故",
		"敏",
		"救",
		"敢",
		"整",
		"敵",
		"敷",
		"斉",
		"斎",
		"斐",
		"斗",
		"斜",
		"施",
		"旋",
		"旗",
		"既",
		"旦",
		"旨",
		"旬",
		"昆",
		"昌",
		"昭",
		"是",
		"晶",
		"智",
		"暁",
		"暇",
		"暑",
		"暖",
		"暦",
		"暫",
		"曙",
		"曹",
		"朗",
		"朱",
		"朴",
		"朽",
		"杉",
		"杏",
		"条",
		"松",
		"析",
		"枠",
		"枢",
		"架",
		"柄",
		"某",
		"染",
		"柳",
		"栓",
		"栞",
		"株",
		"核",
		"栽",
		"桃",
		"案",
		"桑",
		"桜",
		"桟",
		"梅",
		"梓",
		"梨",
		"棄",
		"棋",
		"棚",
		"棟",
		"椎",
		"検",
		"楓",
		"概",
		"槽",
		"標",
		"模",
		"樹",
		"欄",
		"欺",
		"款",
		"歓",
		"殉",
		"殊",
		"殖",
		"殴",
		"殻",
		"汁",
		"江",
		"汰",
		"汽",
		"沖",
		"沙",
		"没",
		"沢",
		"沼",
		"沿",
		"泌",
		"泡",
		"泣",
		"泰",
		"洞",
		"津",
		"洪",
		"派",
		"浄",
		"浜",
		"浦",
		"浪",
		"浸",
		"涯",
		"淑",
		"淡",
		"添",
		"渇",
		"渉",
		"渋",
		"渓",
		"渦",
		"湧",
		"源",
		"溝",
		"滅",
		"滋",
		"滑",
		"滝",
		"滞",
		"漂",
		"漆",
		"漏",
		"漠",
		"漫",
		"漬",
		"漸",
		"潔",
		"潜",
		"潟",
		"潤",
		"潮",
		"澄",
		"激",
		"濁",
		"瀬",
		"災",
		"炉",
		"炊",
		"炎",
		"為",
		"烈",
		"焦",
		"煩",
		"煮",
		"熊",
		"熟",
		"爽",
		"牧",
		"牲",
		"犠",
		"狂",
		"狩",
		"独",
		"狭",
		"猛",
		"猟",
		"献",
		"猶",
		"猿",
		"獄",
		"獣",
		"獲",
		"玄",
		"率",
		"珠",
		"班",
		"琴",
		"瑛",
		"瑞",
		"瑠",
		"璃",
		"環",
		"甚",
		"甲",
		"畔",
		"異",
		"疎",
		"疫",
		"疾",
		"症",
		"痢",
		"痴",
		"癒",
		"癖",
		"皇",
		"盆",
		"益",
		"盛",
		"盟",
		"監",
		"盤",
		"盲",
		"盾",
		"眉",
		"看",
		"眺",
		"眼",
		"睡",
		"督",
		"睦",
		"瞬",
		"瞭",
		"瞳",
		"矛",
		"矯",
		"砕",
		"砲",
		"硫",
		"碁",
		"碑",
		"磁",
		"礁",
		"礎",
		"祉",
		"祥",
		"票",
		"禅",
		"禍",
		"秀",
		"秘",
		"租",
		"秩",
		"称",
		"稚",
		"稲",
		"稼",
		"稿",
		"穀",
		"穂",
		"穏",
		"穫",
		"穴",
		"窃",
		"窒",
		"窮",
		"竜",
		"端",
		"笛",
		"第",
		"筋",
		"策",
		"節",
		"範",
		"篤",
		"簿",
		"粋",
		"粗",
		"粘",
		"粛",
		"糖",
		"糧",
		"系",
		"糾",
		"紀",
		"紋",
		"納",
		"紛",
		"素",
		"紡",
		"索",
		"紫",
		"累",
		"紳",
		"紺",
		"結",
		"絞",
		"統",
		"絹",
		"継",
		"維",
		"綱",
		"網",
		"綺",
		"綾",
		"緊",
		"緋",
		"締",
		"緩",
		"緯",
		"縁",
		"縄",
		"縛",
		"縦",
		"縫",
		"縮",
		"繁",
		"繊",
		"織",
		"繰",
		"罰",
		"罷",
		"羅",
		"義",
		"翔",
		"翻",
		"翼",
		"耐",
		"聖",
		"聡",
		"聴",
		"肖",
		"肝",
		"肥",
		"肪",
		"肺",
		"胆",
		"胎",
		"胞",
		"胡",
		"胴",
		"脅",
		"脈",
		"脚",
		"脱",
		"腐",
		"腸",
		"膜",
		"膨",
		"臨",
		"臭",
		"至",
		"致",
		"興",
		"舌",
		"舎",
		"舗",
		"舶",
		"艇",
		"艦",
		"芋",
		"芝",
		"芳",
		"芽",
		"苗",
		"茂",
		"茎",
		"茜",
		"荘",
		"莉",
		"菊",
		"菌",
		"華",
		"萌",
		"葬",
		"葵",
		"蒼",
		"蓄",
		"蓮",
		"薦",
		"藍",
		"藤",
		"藩",
		"藻",
		"虎",
		"虐",
		"虚",
		"虜",
		"虹",
		"蚊",
		"蛇",
		"蛍",
		"蛮",
		"蝶",
		"融",
		"衆",
		"街",
		"衛",
		"衝",
		"衡",
		"衰",
		"裁",
		"裂",
		"裕",
		"裸",
		"製",
		"褒",
		"襟",
		"襲",
		"覆",
		"覇",
		"視",
		"覧",
		"訂",
		"討",
		"託",
		"訟",
		"訳",
		"訴",
		"診",
		"証",
		"詐",
		"評",
		"詠",
		"詩",
		"該",
		"詳",
		"誇",
		"誉",
		"誓",
		"誕",
		"誘",
		"誠",
		"請",
		"諒",
		"諭",
		"諮",
		"諾",
		"謀",
		"謙",
		"謝",
		"謡",
		"謹",
		"譜",
		"譲",
		"護",
		"豆",
		"豚",
		"豪",
		"貞",
		"貢",
		"貫",
		"貴",
		"賀",
		"賃",
		"賄",
		"賊",
		"賓",
		"賠",
		"購",
		"赦",
		"赴",
		"趣",
		"距",
		"跳",
		"践",
		"踏",
		"躍",
		"軌",
		"軸",
		"較",
		"載",
		"輔",
		"輝",
		"輩",
		"轄",
		"辱",
		"迅",
		"迫",
		"迭",
		"透",
		"逝",
		"逮",
		"逸",
		"遂",
		"遇",
		"遍",
		"遣",
		"遥",
		"遭",
		"遮",
		"遷",
		"遺",
		"遼",
		"避",
		"還",
		"那",
		"邦",
		"邪",
		"邸",
		"郎",
		"郡",
		"郭",
		"郷",
		"酌",
		"酔",
		"酢",
		"酪",
		"酬",
		"酵",
		"酷",
		"酸",
		"醜",
		"醸",
		"釈",
		"釣",
		"鈴",
		"鉛",
		"鉢",
		"銃",
		"銘",
		"銭",
		"鋳",
		"鋼",
		"錠",
		"錦",
		"錬",
		"錯",
		"鍛",
		"鎌",
		"鎖",
		"鎮",
		"鏡",
		"鐘",
		"鑑",
		"閑",
		"閣",
		"閥",
		"閲",
		"闘",
		"阻",
		"阿",
		"陛",
		"陣",
		"陥",
		"陪",
		"陰",
		"陳",
		"陵",
		"陶",
		"隆",
		"隊",
		"随",
		"隔",
		"障",
		"隠",
		"隣",
		"隷",
		"隼",
		"雄",
		"雅",
		"雌",
		"離",
		"雰",
		"雷",
		"需",
		"霊",
		"霜",
		"霧",
		"露",
		"靖",
		"響",
		"項",
		"須",
		"頑",
		"頻",
		"顕",
		"顧",
		"颯",
		"飢",
		"飼",
		"飽",
		"飾",
		"養",
		"餓",
		"駄",
		"駆",
		"駒",
		"駿",
		"騎",
		"騒",
		"騰",
		"驚",
		"髄",
		"鬼",
		"魂",
		"魅",
		"魔",
		"鮮",
		"鯉",
		"鯨",
		"鳩",
		"鶏",
		"鶴",
		"鹿",
		"麗",
		"麻",
		"黙",
		"鼓",
		"級",
		"功",
		"又",
		"氏",
		"仮",
		"保",
		"丁",
		"刀",
		"斤",
		"矢",
		"羊"
	]
}

const joyo = {
	g1: [
		"夕",
		"草",
		"木",
		"村",
		"町",
		"空",
		"千",
		"四",
		"月",
		"男",
		"竹",
		"一",
		"七",
		"三",
		"上",
		"下",
		"中",
		"九",
		"二",
		"五",
		"人",
		"休",
		"先",
		"入",
		"八",
		"六",
		"円",
		"出",
		"力",
		"十",
		"口",
		"右",
		"名",
		"土",
		"大",
		"天",
		"女",
		"子",
		"字",
		"学",
		"小",
		"山",
		"川",
		"左",
		"年",
		"手",
		"文",
		"日",
		"早",
		"本",
		"林",
		"校",
		"森",
		"正",
		"気",
		"水",
		"火",
		"犬",
		"玉",
		"王",
		"生",
		"田",
		"白",
		"百",
		"目",
		"石",
		"立",
		"糸",
		"耳",
		"花",
		"虫",
		"見",
		"貝",
		"赤",
		"足",
		"車",
		"金",
		"雨",
		"青",
		"音"
	],
	g2: [
		"原",
		"合",
		"園",
		"寺",
		"岩",
		"帰",
		"弓",
		"春",
		"昼",
		"晴",
		"曜",
		"書",
		"汽",
		"秋",
		"細",
		"計",
		"遠",
		"野",
		"門",
		"池",
		"多",
		"形",
		"歌",
		"算",
		"鳴",
		"弟",
		"弱",
		"新",
		"画",
		"元",
		"地",
		"場",
		"外",
		"太",
		"楽",
		"組",
		"絵",
		"羽",
		"読",
		"長",
		"兄",
		"夏",
		"明",
		"星",
		"知",
		"聞",
		"親",
		"言",
		"話",
		"買",
		"間",
		"雲",
		"顔",
		"馬",
		"高",
		"麦",
		"黒",
		"冬",
		"南",
		"台",
		"売",
		"夜",
		"数",
		"東",
		"歩",
		"答",
		"米",
		"線",
		"週",
		"雪",
		"風",
		"首",
		"公",
		"午",
		"戸",
		"方",
		"朝",
		"用",
		"番",
		"社",
		"考",
		"船",
		"記",
		"語",
		"道",
		"里",
		"頭",
		"黄",
		"万",
		"丸",
		"交",
		"京",
		"今",
		"会",
		"体",
		"何",
		"作",
		"光",
		"内",
		"刀",
		"分",
		"切",
		"前",
		"北",
		"半",
		"友",
		"古",
		"同",
		"回",
		"図",
		"国",
		"声",
		"妹",
		"姉",
		"室",
		"家",
		"少",
		"工",
		"市",
		"広",
		"店",
		"引",
		"強",
		"当",
		"後",
		"心",
		"思",
		"才",
		"教",
		"時",
		"来",
		"止",
		"母",
		"毎",
		"毛",
		"活",
		"海",
		"点",
		"父",
		"牛",
		"理",
		"直",
		"矢",
		"科",
		"紙",
		"肉",
		"自",
		"色",
		"茶",
		"行",
		"西",
		"角",
		"谷",
		"走",
		"近",
		"通",
		"電",
		"食",
		"魚",
		"鳥"
	],
	g3: [
		"係",
		"倍",
		"列",
		"勉",
		"動",
		"区",
		"取",
		"命",
		"品",
		"員",
		"商",
		"問",
		"坂",
		"委",
		"守",
		"宮",
		"宿",
		"寒",
		"島",
		"帳",
		"幸",
		"庫",
		"庭",
		"式",
		"待",
		"急",
		"息",
		"悪",
		"悲",
		"想",
		"感",
		"整",
		"旅",
		"族",
		"昭",
		"暑",
		"暗",
		"期",
		"板",
		"柱",
		"根",
		"植",
		"様",
		"橋",
		"歯",
		"油",
		"流",
		"消",
		"深",
		"温",
		"港",
		"湖",
		"湯",
		"炭",
		"球",
		"畑",
		"登",
		"真",
		"着",
		"短",
		"祭",
		"福",
		"章",
		"童",
		"笛",
		"第",
		"筆",
		"等",
		"箱",
		"緑",
		"練",
		"荷",
		"薬",
		"詩",
		"豆",
		"遊",
		"都",
		"銀",
		"陽",
		"階",
		"面",
		"題",
		"館",
		"駅",
		"鼻",
		"意",
		"昔",
		"波",
		"神",
		"秒",
		"級",
		"育",
		"追",
		"指",
		"美",
		"使",
		"拾",
		"持",
		"注",
		"相",
		"習",
		"苦",
		"落",
		"談",
		"転",
		"軽",
		"速",
		"受",
		"君",
		"味",
		"央",
		"客",
		"岸",
		"業",
		"研",
		"路",
		"配",
		"実",
		"放",
		"泳",
		"者",
		"表",
		"負",
		"平",
		"横",
		"次",
		"洋",
		"終",
		"葉",
		"起",
		"農",
		"送",
		"部",
		"具",
		"助",
		"勝",
		"去",
		"反",
		"定",
		"度",
		"由",
		"酒",
		"重",
		"鉄",
		"開",
		"集",
		"予",
		"仕",
		"医",
		"和",
		"局",
		"病",
		"発",
		"皮",
		"調",
		"身",
		"返",
		"運",
		"乗",
		"事",
		"住",
		"始",
		"対",
		"屋",
		"所",
		"投",
		"服",
		"氷",
		"決",
		"漢",
		"物",
		"界",
		"県",
		"血",
		"進",
		"院",
		"飲",
		"丁",
		"世",
		"両",
		"主",
		"他",
		"代",
		"全",
		"写",
		"化",
		"号",
		"向",
		"安",
		"州",
		"役",
		"打",
		"曲",
		"有",
		"死",
		"申",
		"皿",
		"礼",
		"究",
		"羊"
	],
	g4: [
		"令",
		"例",
		"信",
		"倉",
		"候",
		"借",
		"停",
		"健",
		"側",
		"億",
		"兆",
		"児",
		"兵",
		"典",
		"冷",
		"刷",
		"副",
		"加",
		"勇",
		"包",
		"卒",
		"協",
		"単",
		"博",
		"印",
		"参",
		"史",
		"司",
		"各",
		"告",
		"周",
		"唱",
		"喜",
		"器",
		"囲",
		"固",
		"型",
		"堂",
		"塩",
		"士",
		"変",
		"夫",
		"季",
		"孫",
		"完",
		"官",
		"害",
		"察",
		"巣",
		"差",
		"希",
		"席",
		"帯",
		"底",
		"府",
		"康",
		"建",
		"径",
		"徒",
		"得",
		"念",
		"愛",
		"折",
		"挙",
		"改",
		"救",
		"敗",
		"散",
		"料",
		"旗",
		"昨",
		"景",
		"望",
		"材",
		"束",
		"松",
		"果",
		"栄",
		"案",
		"梅",
		"械",
		"極",
		"標",
		"機",
		"歴",
		"残",
		"殺",
		"毒",
		"治",
		"法",
		"泣",
		"浅",
		"浴",
		"清",
		"満",
		"漁",
		"灯",
		"無",
		"然",
		"焼",
		"照",
		"熱",
		"牧",
		"産",
		"的",
		"省",
		"祝",
		"票",
		"種",
		"積",
		"笑",
		"管",
		"節",
		"粉",
		"紀",
		"約",
		"結",
		"給",
		"続",
		"置",
		"胃",
		"脈",
		"腸",
		"臣",
		"航",
		"芸",
		"芽",
		"英",
		"菜",
		"街",
		"衣",
		"覚",
		"観",
		"訓",
		"説",
		"課",
		"議",
		"象",
		"貨",
		"貯",
		"費",
		"賞",
		"軍",
		"輪",
		"辞",
		"連",
		"達",
		"選",
		"郡",
		"量",
		"録",
		"鏡",
		"関",
		"陸",
		"隊",
		"静",
		"順",
		"願",
		"類",
		"飛",
		"飯",
		"養",
		"共",
		"成",
		"戦",
		"競",
		"良",
		"初",
		"利",
		"特",
		"争",
		"位",
		"便",
		"働",
		"別",
		"功",
		"低",
		"労",
		"最",
		"老",
		"試",
		"仲",
		"努",
		"好",
		"求",
		"失",
		"必",
		"氏",
		"辺",
		"付",
		"伝",
		"未",
		"札",
		"民",
		"要",
		"験",
		"不",
		"以",
		"末",
		"欠"
	],
	g5: [
		"久",
		"仏",
		"件",
		"任",
		"似",
		"余",
		"価",
		"修",
		"俵",
		"個",
		"備",
		"像",
		"再",
		"刊",
		"判",
		"制",
		"券",
		"則",
		"効",
		"務",
		"勢",
		"厚",
		"句",
		"可",
		"営",
		"因",
		"団",
		"圧",
		"在",
		"均",
		"基",
		"報",
		"境",
		"墓",
		"増",
		"夢",
		"妻",
		"婦",
		"容",
		"寄",
		"富",
		"導",
		"居",
		"属",
		"布",
		"師",
		"常",
		"幹",
		"序",
		"弁",
		"張",
		"往",
		"復",
		"徳",
		"志",
		"応",
		"快",
		"性",
		"恩",
		"情",
		"態",
		"慣",
		"承",
		"技",
		"招",
		"授",
		"採",
		"接",
		"提",
		"損",
		"政",
		"故",
		"敵",
		"断",
		"旧",
		"易",
		"暴",
		"条",
		"枝",
		"査",
		"格",
		"桜",
		"検",
		"構",
		"武",
		"比",
		"永",
		"河",
		"液",
		"混",
		"減",
		"測",
		"準",
		"演",
		"潔",
		"災",
		"燃",
		"版",
		"犯",
		"状",
		"独",
		"率",
		"現",
		"留",
		"略",
		"益",
		"眼",
		"破",
		"確",
		"示",
		"祖",
		"禁",
		"移",
		"程",
		"税",
		"築",
		"精",
		"素",
		"経",
		"統",
		"絶",
		"綿",
		"総",
		"編",
		"績",
		"織",
		"罪",
		"群",
		"義",
		"耕",
		"職",
		"肥",
		"能",
		"興",
		"舌",
		"舎",
		"術",
		"衛",
		"製",
		"複",
		"規",
		"解",
		"設",
		"許",
		"証",
		"評",
		"講",
		"謝",
		"識",
		"護",
		"豊",
		"財",
		"貧",
		"責",
		"貸",
		"貿",
		"賀",
		"資",
		"賛",
		"質",
		"輸",
		"述",
		"迷",
		"退",
		"逆",
		"造",
		"過",
		"適",
		"酸",
		"鉱",
		"銅",
		"銭",
		"防",
		"限",
		"険",
		"際",
		"雑",
		"非",
		"預",
		"領",
		"額",
		"飼",
		"支",
		"仮",
		"保"
	],
	g6: [
		"並",
		"乱",
		"乳",
		"仁",
		"供",
		"俳",
		"値",
		"傷",
		"優",
		"党",
		"冊",
		"処",
		"刻",
		"割",
		"創",
		"劇",
		"勤",
		"危",
		"卵",
		"厳",
		"収",
		"后",
		"否",
		"吸",
		"呼",
		"善",
		"困",
		"垂",
		"城",
		"域",
		"奏",
		"奮",
		"姿",
		"存",
		"孝",
		"宅",
		"宇",
		"宗",
		"宙",
		"宣",
		"密",
		"寸",
		"専",
		"射",
		"将",
		"尊",
		"就",
		"尺",
		"届",
		"展",
		"層",
		"己",
		"巻",
		"幕",
		"干",
		"幼",
		"庁",
		"座",
		"延",
		"律",
		"従",
		"忘",
		"忠",
		"憲",
		"我",
		"批",
		"担",
		"拝",
		"拡",
		"捨",
		"探",
		"推",
		"揮",
		"操",
		"敬",
		"映",
		"晩",
		"暖",
		"暮",
		"朗",
		"机",
		"枚",
		"染",
		"株",
		"棒",
		"模",
		"権",
		"樹",
		"欲",
		"段",
		"沿",
		"泉",
		"洗",
		"派",
		"済",
		"源",
		"潮",
		"激",
		"灰",
		"熟",
		"片",
		"班",
		"異",
		"疑",
		"痛",
		"皇",
		"盛",
		"盟",
		"看",
		"砂",
		"磁",
		"秘",
		"穀",
		"穴",
		"窓",
		"筋",
		"策",
		"簡",
		"糖",
		"系",
		"紅",
		"納",
		"純",
		"絹",
		"縦",
		"縮",
		"署",
		"翌",
		"聖",
		"肺",
		"背",
		"胸",
		"脳",
		"腹",
		"臓",
		"臨",
		"至",
		"若",
		"著",
		"蒸",
		"蔵",
		"衆",
		"裁",
		"装",
		"裏",
		"補",
		"視",
		"覧",
		"討",
		"訪",
		"訳",
		"詞",
		"誌",
		"認",
		"誕",
		"誠",
		"誤",
		"論",
		"諸",
		"警",
		"貴",
		"賃",
		"遺",
		"郵",
		"郷",
		"針",
		"鋼",
		"閉",
		"閣",
		"降",
		"陛",
		"除",
		"障",
		"難",
		"革",
		"頂",
		"骨",
		"宝",
		"亡",
		"私"
	],
	g9: [
		"丈",
		"与",
		"且",
		"丘",
		"串",
		"丹",
		"丼",
		"乏",
		"乙",
		"乾",
		"亀",
		"互",
		"井",
		"亜",
		"享",
		"亭",
		"介",
		"仙",
		"仰",
		"企",
		"伎",
		"伏",
		"伐",
		"伯",
		"伴",
		"伸",
		"伺",
		"佐",
		"佳",
		"併",
		"侍",
		"依",
		"侮",
		"侵",
		"促",
		"俊",
		"俗",
		"俸",
		"俺",
		"倒",
		"倫",
		"倹",
		"偉",
		"偏",
		"偵",
		"偶",
		"偽",
		"傍",
		"傑",
		"傘",
		"催",
		"傲",
		"債",
		"傾",
		"僕",
		"僚",
		"僧",
		"儀",
		"償",
		"充",
		"克",
		"免",
		"兼",
		"冒",
		"冗",
		"冠",
		"冥",
		"凄",
		"准",
		"凍",
		"凝",
		"凡",
		"凶",
		"凸",
		"凹",
		"刃",
		"刈",
		"刑",
		"到",
		"刺",
		"削",
		"剖",
		"剛",
		"剣",
		"剤",
		"剰",
		"劣",
		"励",
		"劾",
		"勘",
		"募",
		"勧",
		"勲",
		"匂",
		"匠",
		"匹",
		"匿",
		"升",
		"卑",
		"卓",
		"占",
		"即",
		"却",
		"卸",
		"厄",
		"及",
		"双",
		"叔",
		"叙",
		"叫",
		"召",
		"叱",
		"吉",
		"吐",
		"吟",
		"含",
		"吹",
		"呂",
		"呈",
		"呉",
		"呪",
		"咲",
		"哀",
		"哲",
		"哺",
		"唄",
		"唆",
		"唇",
		"唐",
		"唯",
		"啓",
		"喉",
		"喚",
		"喝",
		"喪",
		"喫",
		"嘆",
		"嘱",
		"噴",
		"囚",
		"圏",
		"坊",
		"坑",
		"坪",
		"垣",
		"埋",
		"執",
		"培",
		"埼",
		"堀",
		"堅",
		"堕",
		"堤",
		"堪",
		"塀",
		"塁",
		"塊",
		"塔",
		"塗",
		"塚",
		"塾",
		"墜",
		"墨",
		"墳",
		"壁",
		"壇",
		"壊",
		"壌",
		"壮",
		"奇",
		"奈",
		"奉",
		"契",
		"奔",
		"奥",
		"奨",
		"奪",
		"奴",
		"如",
		"妃",
		"妄",
		"妊",
		"妖",
		"妙",
		"妥",
		"妨",
		"姓",
		"姫",
		"姻",
		"威",
		"娘",
		"娠",
		"娯",
		"婆",
		"婚",
		"婿",
		"媒",
		"媛",
		"嫁",
		"嫌",
		"嬢",
		"孔",
		"孤",
		"宛",
		"宜",
		"宰",
		"宴",
		"寂",
		"寛",
		"寝",
		"寡",
		"寧",
		"審",
		"寮",
		"寿",
		"封",
		"尉",
		"尋",
		"尚",
		"尻",
		"尼",
		"尽",
		"尾",
		"尿",
		"屈",
		"履",
		"屯",
		"岐",
		"岡",
		"岬",
		"岳",
		"峠",
		"峡",
		"峰",
		"崇",
		"崎",
		"崖",
		"崩",
		"嵐",
		"巡",
		"巧",
		"巨",
		"巾",
		"帆",
		"帝",
		"帥",
		"帽",
		"幅",
		"幣",
		"幻",
		"幽",
		"幾",
		"床",
		"庶",
		"庸",
		"廃",
		"廉",
		"廊",
		"廷",
		"弊",
		"弔",
		"弥",
		"弦",
		"弧",
		"弾",
		"彩",
		"彫",
		"彰",
		"影",
		"彼",
		"征",
		"徐",
		"御",
		"循",
		"微",
		"徴",
		"徹",
		"忌",
		"忍",
		"忙",
		"怒",
		"怖",
		"怠",
		"怪",
		"恋",
		"恐",
		"恒",
		"恥",
		"恨",
		"恭",
		"恵",
		"悔",
		"悟",
		"悠",
		"患",
		"悦",
		"悩",
		"悼",
		"惑",
		"惜",
		"惨",
		"惰",
		"愉",
		"愚",
		"慈",
		"慌",
		"慎",
		"慕",
		"慢",
		"慨",
		"慮",
		"慰",
		"慶",
		"憂",
		"憎",
		"憤",
		"憧",
		"憩",
		"憶",
		"憾",
		"懇",
		"懐",
		"懲",
		"懸",
		"戒",
		"戚",
		"戯",
		"戴",
		"戻",
		"房",
		"扇",
		"扉",
		"払",
		"扱",
		"扶",
		"把",
		"抑",
		"抗",
		"抜",
		"択",
		"披",
		"抱",
		"抵",
		"抹",
		"押",
		"抽",
		"拉",
		"拍",
		"拐",
		"拒",
		"拓",
		"拘",
		"拙",
		"拠",
		"括",
		"拳",
		"拶",
		"拷",
		"挑",
		"挟",
		"挨",
		"振",
		"挿",
		"捉",
		"捕",
		"捜",
		"据",
		"掃",
		"掌",
		"排",
		"掘",
		"掛",
		"控",
		"措",
		"掲",
		"描",
		"揚",
		"換",
		"握",
		"援",
		"揺",
		"搬",
		"搭",
		"携",
		"搾",
		"摂",
		"摘",
		"摩",
		"撃",
		"撤",
		"撮",
		"撲",
		"擁",
		"擦",
		"擬",
		"攻",
		"敏",
		"敢",
		"敷",
		"斉",
		"斎",
		"斗",
		"斜",
		"斬",
		"施",
		"旋",
		"既",
		"旦",
		"旨",
		"旬",
		"昆",
		"昇",
		"是",
		"普",
		"晶",
		"暁",
		"暇",
		"暦",
		"暫",
		"曇",
		"更",
		"曹",
		"替",
		"朱",
		"朴",
		"朽",
		"杉",
		"杯",
		"析",
		"枕",
		"枠",
		"枢",
		"枯",
		"架",
		"柄",
		"某",
		"柔",
		"柳",
		"柵",
		"栃",
		"栓",
		"核",
		"栽",
		"桃",
		"桑",
		"桟",
		"梨",
		"棄",
		"棋",
		"棚",
		"棟",
		"椅",
		"椎",
		"概",
		"槽",
		"欄",
		"欧",
		"欺",
		"款",
		"歓",
		"歳",
		"殉",
		"殊",
		"殖",
		"殴",
		"殻",
		"殿",
		"汁",
		"汗",
		"汚",
		"江",
		"汰",
		"沈",
		"沖",
		"沙",
		"没",
		"沢",
		"沸",
		"沼",
		"況",
		"泊",
		"泌",
		"泡",
		"泥",
		"泰",
		"洞",
		"津",
		"洪",
		"浄",
		"浜",
		"浦",
		"浪",
		"浮",
		"浸",
		"涙",
		"涯",
		"涼",
		"淑",
		"淡",
		"添",
		"渇",
		"渉",
		"渋",
		"渓",
		"渡",
		"渦",
		"湧",
		"湾",
		"湿",
		"溝",
		"溶",
		"滅",
		"滋",
		"滑",
		"滝",
		"滞",
		"滴",
		"漂",
		"漆",
		"漏",
		"漠",
		"漫",
		"漬",
		"漸",
		"潜",
		"潟",
		"潤",
		"澄",
		"濁",
		"濃",
		"濯",
		"瀬",
		"炉",
		"炊",
		"炎",
		"為",
		"烈",
		"焦",
		"煎",
		"煙",
		"煩",
		"煮",
		"熊",
		"燥",
		"爆",
		"爪",
		"爽",
		"牙",
		"牲",
		"犠",
		"狂",
		"狙",
		"狩",
		"狭",
		"猛",
		"猟",
		"猫",
		"献",
		"猶",
		"猿",
		"獄",
		"獣",
		"獲",
		"玄",
		"珍",
		"珠",
		"琴",
		"瑠",
		"璃",
		"璧",
		"環",
		"瓶",
		"甘",
		"甚",
		"甲",
		"畔",
		"畜",
		"畳",
		"疎",
		"疫",
		"疲",
		"疾",
		"症",
		"痢",
		"痩",
		"痴",
		"療",
		"癒",
		"癖",
		"皆",
		"盆",
		"盗",
		"監",
		"盤",
		"盲",
		"盾",
		"眉",
		"眠",
		"眺",
		"睡",
		"督",
		"睦",
		"瞬",
		"瞭",
		"瞳",
		"矛",
		"矯",
		"砕",
		"砲",
		"硫",
		"硬",
		"碁",
		"碑",
		"磨",
		"礁",
		"礎",
		"祈",
		"祉",
		"祥",
		"禅",
		"禍",
		"秀",
		"租",
		"秩",
		"称",
		"稚",
		"稲",
		"稼",
		"稿",
		"穂",
		"穏",
		"穫",
		"突",
		"窃",
		"窒",
		"窮",
		"竜",
		"端",
		"符",
		"筒",
		"箸",
		"範",
		"篤",
		"簿",
		"籍",
		"粋",
		"粒",
		"粗",
		"粘",
		"粛",
		"粧",
		"糧",
		"糾",
		"紋",
		"紛",
		"紡",
		"索",
		"紫",
		"累",
		"紳",
		"紹",
		"紺",
		"絞",
		"絡",
		"継",
		"維",
		"綱",
		"網",
		"緊",
		"緒",
		"締",
		"緩",
		"緯",
		"縁",
		"縄",
		"縛",
		"縫",
		"繁",
		"繊",
		"繰",
		"缶",
		"罰",
		"罷",
		"羅",
		"羨",
		"翻",
		"翼",
		"耐",
		"聴",
		"肌",
		"肖",
		"肝",
		"股",
		"肩",
		"肪",
		"肯",
		"胆",
		"胎",
		"胞",
		"胴",
		"脂",
		"脅",
		"脇",
		"脊",
		"脚",
		"脱",
		"腐",
		"腕",
		"腰",
		"膚",
		"膜",
		"膝",
		"膨",
		"臭",
		"致",
		"舗",
		"舞",
		"舟",
		"般",
		"舶",
		"艇",
		"艦",
		"芋",
		"芝",
		"芯",
		"芳",
		"苗",
		"苛",
		"茂",
		"茎",
		"茨",
		"荒",
		"荘",
		"菊",
		"菌",
		"菓",
		"華",
		"葬",
		"蓄",
		"蔑",
		"薄",
		"薦",
		"藍",
		"藤",
		"藩",
		"藻",
		"虎",
		"虐",
		"虚",
		"虜",
		"虹",
		"蚊",
		"蛇",
		"蛍",
		"蛮",
		"蜂",
		"蜜",
		"融",
		"衝",
		"衡",
		"衰",
		"袋",
		"袖",
		"被",
		"裂",
		"裕",
		"裸",
		"褒",
		"襟",
		"襲",
		"覆",
		"覇",
		"触",
		"訂",
		"託",
		"訟",
		"訴",
		"診",
		"詐",
		"詠",
		"詰",
		"該",
		"詳",
		"誇",
		"誉",
		"誓",
		"誘",
		"誰",
		"請",
		"諦",
		"諭",
		"諮",
		"諾",
		"謀",
		"謎",
		"謙",
		"謡",
		"謹",
		"譜",
		"譲",
		"豚",
		"豪",
		"貞",
		"貢",
		"販",
		"貫",
		"貼",
		"賂",
		"賄",
		"賊",
		"賓",
		"賠",
		"賢",
		"賭",
		"購",
		"贈",
		"赦",
		"赴",
		"超",
		"越",
		"趣",
		"距",
		"跡",
		"跳",
		"践",
		"踊",
		"踏",
		"蹴",
		"躍",
		"軌",
		"軒",
		"軟",
		"軸",
		"較",
		"載",
		"輝",
		"輩",
		"轄",
		"辛",
		"辱",
		"込",
		"迅",
		"迎",
		"迫",
		"迭",
		"逃",
		"透",
		"途",
		"逝",
		"逮",
		"逸",
		"遂",
		"遅",
		"遇",
		"遍",
		"違",
		"遜",
		"遣",
		"遭",
		"遮",
		"遷",
		"避",
		"還",
		"那",
		"邦",
		"邪",
		"邸",
		"郊",
		"郎",
		"郭",
		"酌",
		"酎",
		"酔",
		"酢",
		"酪",
		"酬",
		"酵",
		"酷",
		"醜",
		"醸",
		"釈",
		"釣",
		"鈍",
		"鈴",
		"鉛",
		"鉢",
		"銃",
		"銘",
		"鋭",
		"鋳",
		"錠",
		"錦",
		"錬",
		"錯",
		"鍋",
		"鍛",
		"鍵",
		"鎌",
		"鎖",
		"鎮",
		"鐘",
		"鑑",
		"閑",
		"閥",
		"閲",
		"闇",
		"闘",
		"阜",
		"阪",
		"阻",
		"陣",
		"陥",
		"陪",
		"陰",
		"陳",
		"陵",
		"陶",
		"隅",
		"隆",
		"随",
		"隔",
		"隙",
		"隠",
		"隣",
		"隷",
		"隻",
		"雄",
		"雅",
		"雇",
		"雌",
		"離",
		"雰",
		"零",
		"雷",
		"需",
		"震",
		"霊",
		"霜",
		"霧",
		"露",
		"靴",
		"韓",
		"響",
		"頃",
		"項",
		"須",
		"頑",
		"頻",
		"頼",
		"顕",
		"顧",
		"飢",
		"飽",
		"飾",
		"餅",
		"餓",
		"香",
		"駄",
		"駆",
		"駐",
		"駒",
		"騎",
		"騒",
		"騰",
		"驚",
		"髄",
		"髪",
		"鬱",
		"鬼",
		"魂",
		"魅",
		"魔",
		"鮮",
		"鯨",
		"鶏",
		"鶴",
		"鹿",
		"麗",
		"麺",
		"麻",
		"黙",
		"鼓",
		"齢",
		"又",
		"了",
		"斤"
	]
}