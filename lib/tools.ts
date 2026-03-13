export type Locale = "zh" | "en";

export type CategorySlug =
  | "generate"
  | "image"
  | "encrypt"
  | "time"
  | "convert"
  | "finance"
  | "text"
  | "dev";

export type ToolSlug =
  | "rand-password"
  | "qrcode"
  | "screen-record"
  | "random-number"
  | "guid"
  | "random-group"
  | "watermark"
  | "image-compress"
  | "qrcode-decode"
  | "barcode"
  | "md5"
  | "file-md5"
  | "hmac"
  | "sha"
  | "aes"
  | "rabbit"
  | "des"
  | "rc4"
  | "base64"
  | "unicode"
  | "url"
  | "timestamp"
  | "calculation"
  | "world"
  | "working-day"
  | "batch-timestamp"
  | "unit-converter"
  | "english-amount"
  | "sum-list"
  | "loan"
  | "rmb"
  | "text-dedupe"
  | "emoji-clean"
  | "id-card-cn"
  | "simplified-traditional"
  | "pinyin"
  | "pluralize"
  | "english-case"
  | "cn-en"
  | "trim"
  | "regex"
  | "md-html"
  | "json"
  | "json-to-types"
  | "css"
  | "js"
  | "html"
  | "sql"
  | "crontab"
  | "websocket"
  | "naming-converter"
  | "color-converter"
  | "go-struct-json"
  | "less2css"
  | "binary";

export type Category = {
  slug: CategorySlug;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
};

export type Tool = {
  slug: ToolSlug;
  category: CategorySlug;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  highlights: Record<Locale, string[]>;
};

export const categories: Category[] = [
  {
    slug: "generate",
    title: { zh: "在线生成", en: "Generate" },
    description: {
      zh: "偏创作与产出类的小工具，适合快速生成结果并立即下载或复制。",
      en: "Fast creation tools for generating assets you can use right away.",
    },
  },
  {
    slug: "image",
    title: { zh: "图片处理", en: "Image" },
    description: {
      zh: "围绕本地图片处理展开，尽量保持浏览器端完成，不上传文件。",
      en: "Image workflows that stay local in the browser whenever possible.",
    },
  },
  {
    slug: "encrypt",
    title: { zh: "加密编码", en: "Encrypt" },
    description: {
      zh: "涵盖哈希、编码和常见对称加解密场景。",
      en: "Hashing, encoding, and common symmetric encryption helpers.",
    },
  },
  {
    slug: "time",
    title: { zh: "日期时间", en: "Time" },
    description: {
      zh: "时间戳、日期计算和世界时区转换工具。",
      en: "Timestamp conversion, date arithmetic, and world time tools.",
    },
  },
  {
    slug: "convert",
    title: { zh: "单位换算", en: "Convert" },
    description: {
      zh: "集中处理常见单位、温度、字节和时间跨度之间的本地换算。",
      en: "Local conversion tools for common units, temperature, data sizes, and durations.",
    },
  },
  {
    slug: "finance",
    title: { zh: "财务计算", en: "Finance" },
    description: {
      zh: "围绕金额表达、列表汇总和贷款测算的轻量工作台。",
      en: "Practical helpers for amount wording, list totals, and loan estimates.",
    },
  },
  {
    slug: "text",
    title: { zh: "文本工具", en: "Text" },
    description: {
      zh: "适合编辑、转换、校验和排版优化的文本工作台。",
      en: "A practical text workbench for editing, converting, and validation.",
    },
  },
  {
    slug: "dev",
    title: { zh: "开发工具", en: "Dev" },
    description: {
      zh: "面向开发场景的格式化、转换和调试小工具集合。",
      en: "Formatting, conversion, and debugging helpers for developers.",
    },
  },
];

export const tools: Tool[] = [
  {
    slug: "rand-password",
    category: "generate",
    title: { zh: "随机密码生成", en: "Random Password" },
    description: {
      zh: "按长度和字符集生成高强度随机密码，并保留本地历史。",
      en: "Generate strong random passwords by length and character set with local history.",
    },
    highlights: {
      zh: ["自定义长度", "大小写/数字/符号", "本地历史记录"],
      en: ["Custom length", "Case, digits, symbols", "Local history"],
    },
  },
  {
    slug: "qrcode",
    category: "generate",
    title: { zh: "二维码生成", en: "QR Code" },
    description: {
      zh: "将文本或链接即时生成二维码，可调整尺寸与前景背景色。",
      en: "Turn text or URLs into QR codes with adjustable size and colors.",
    },
    highlights: {
      zh: ["尺寸控制", "颜色自定义", "图片下载"],
      en: ["Adjust size", "Customize colors", "Download image"],
    },
  },
  {
    slug: "screen-record",
    category: "generate",
    title: { zh: "屏幕录制", en: "Screen Record" },
    description: {
      zh: "调用浏览器录屏能力录制屏幕内容，并在本地导出视频。",
      en: "Record your screen with browser APIs and export the result locally.",
    },
    highlights: {
      zh: ["浏览器原生录屏", "即时预览", "本地下载"],
      en: ["Native browser capture", "Instant preview", "Local export"],
    },
  },
  {
    slug: "random-number",
    category: "generate",
    title: { zh: "区间随机数工坊", en: "Range Number Lab" },
    description: {
      zh: "围绕取值区间、精度和唯一性批量产出随机数字，更适合抽样和测试数据场景。",
      en: "Batch-generate random values by range, precision, and uniqueness for sampling or test data.",
    },
    highlights: {
      zh: ["范围与精度", "唯一值开关", "多行结果"],
      en: ["Range and precision", "Unique toggle", "Multi-line output"],
    },
  },
  {
    slug: "guid",
    category: "generate",
    title: { zh: "UUID 批量发生器", en: "UUID Batch Forge" },
    description: {
      zh: "在浏览器里一次生成多条 UUID，适合接口联调、测试样本和占位数据。",
      en: "Create multiple UUIDs in-browser for API testing, fixtures, and placeholder records.",
    },
    highlights: {
      zh: ["批量输出", "大小写切换", "文本导出"],
      en: ["Batch output", "Case toggle", "Text export"],
    },
  },
  {
    slug: "random-group",
    category: "generate",
    title: { zh: "随机分组与点名", en: "Random Grouping" },
    description: {
      zh: "把名单随机洗牌后按组数或每组人数切分，也可单独抽取一位幸运项。",
      en: "Shuffle a roster into random groups by group count or size, or pick a single winner.",
    },
    highlights: {
      zh: ["按组数或组员数", "单次点名", "固定分隔输入"],
      en: ["By group count or size", "Single pick mode", "Flexible separators"],
    },
  },
  {
    slug: "watermark",
    category: "image",
    title: { zh: "图片离线加水印", en: "Offline Watermark" },
    description: {
      zh: "对本地图片批量铺设文字水印，不走服务器。",
      en: "Apply repeated text watermarks to local images without uploading them.",
    },
    highlights: {
      zh: ["透明度/角度调节", "本地渲染", "导出结果"],
      en: ["Opacity and angle", "Local rendering", "Export result"],
    },
  },
  {
    slug: "image-compress",
    category: "image",
    title: { zh: "图片压缩", en: "Image Compress" },
    description: {
      zh: "在浏览器中压缩图片并对比前后体积与效果。",
      en: "Compress images in the browser and compare the before and after result.",
    },
    highlights: {
      zh: ["质量控制", "压缩前后对比", "文件下载"],
      en: ["Quality control", "Before/after compare", "Download file"],
    },
  },
  {
    slug: "qrcode-decode",
    category: "image",
    title: { zh: "扫码内容读取", en: "QR Content Reader" },
    description: {
      zh: "把本地二维码图片解析成可复制文本，适合核对链接、文案和 Wi-Fi 配置内容。",
      en: "Extract copyable text from a local QR image to inspect links, notes, or Wi-Fi payloads.",
    },
    highlights: {
      zh: ["离线识别", "图片预览", "复制结果"],
      en: ["Offline decode", "Image preview", "Copy result"],
    },
  },
  {
    slug: "barcode",
    category: "image",
    title: { zh: "条码画板", en: "Barcode Canvas" },
    description: {
      zh: "用多种编码标准绘制条码，并直接导出清晰的 SVG 结果。",
      en: "Draft barcodes with multiple standards and export crisp SVG artwork right away.",
    },
    highlights: {
      zh: ["编码标准切换", "颜色与尺寸", "SVG 下载"],
      en: ["Switch standards", "Color and size", "SVG download"],
    },
  },
  {
    slug: "md5",
    category: "encrypt",
    title: { zh: "文本 MD5 哈希", en: "Text MD5" },
    description: {
      zh: "计算文本 MD5 值，并展示大小写两种结果。",
      en: "Calculate text MD5 hashes and show lower/upper case variants.",
    },
    highlights: {
      zh: ["32 位输出", "大小写结果", "一键复制"],
      en: ["32-char output", "Upper/lower case", "Copy quickly"],
    },
  },
  {
    slug: "file-md5",
    category: "encrypt",
    title: { zh: "文件 MD5 哈希", en: "File MD5" },
    description: {
      zh: "对本地文件进行分片计算，适合大文件 MD5 校验。",
      en: "Hash local files in chunks for dependable MD5 verification.",
    },
    highlights: {
      zh: ["本地文件", "分片计算", "适合大文件"],
      en: ["Local files", "Chunked hashing", "Large-file friendly"],
    },
  },
  {
    slug: "hmac",
    category: "encrypt",
    title: { zh: "HMAC 哈希", en: "HMAC Hash" },
    description: {
      zh: "基于密钥计算 MD5、SHA 系列 HMAC 哈希。",
      en: "Calculate keyed HMAC hashes for MD5 and SHA variants.",
    },
    highlights: {
      zh: ["多算法", "密钥参与", "Hex 输出"],
      en: ["Multiple algorithms", "Keyed hash", "Hex output"],
    },
  },
  {
    slug: "sha",
    category: "encrypt",
    title: { zh: "SHA 哈希", en: "SHA Hash" },
    description: {
      zh: "快速计算 SHA1、SHA256、SHA512 等常见哈希。",
      en: "Compute SHA1, SHA256, SHA512, and related hash values.",
    },
    highlights: {
      zh: ["SHA1/224/256/384/512", "即时计算", "Hex 输出"],
      en: ["SHA variants", "Fast hashing", "Hex output"],
    },
  },
  {
    slug: "aes",
    category: "encrypt",
    title: { zh: "AES 加解密", en: "AES Cipher" },
    description: {
      zh: "支持常见模式和填充方式的 AES 加密与解密。",
      en: "Encrypt and decrypt with AES using common modes and padding options.",
    },
    highlights: {
      zh: ["ECB/CBC", "Hex/Base64", "自定义 IV"],
      en: ["ECB/CBC", "Hex or Base64", "Custom IV"],
    },
  },
  {
    slug: "rabbit",
    category: "encrypt",
    title: { zh: "Rabbit 加解密", en: "Rabbit Cipher" },
    description: {
      zh: "使用 Rabbit 流密码算法对文本进行加解密。",
      en: "Encrypt and decrypt text with the Rabbit stream cipher.",
    },
    highlights: {
      zh: ["轻量交互", "浏览器端处理", "快速复制"],
      en: ["Lightweight", "Browser-side", "Copy result"],
    },
  },
  {
    slug: "des",
    category: "encrypt",
    title: { zh: "DES/3DES", en: "DES / 3DES" },
    description: {
      zh: "处理 DES 与 3DES 的常见文本加密解密需求。",
      en: "Handle DES and TripleDES text encryption and decryption.",
    },
    highlights: {
      zh: ["DES 与 3DES", "文本加解密", "Base64 输出"],
      en: ["DES and 3DES", "Text encryption", "Base64 output"],
    },
  },
  {
    slug: "rc4",
    category: "encrypt",
    title: { zh: "RC4 加解密", en: "RC4 Cipher" },
    description: {
      zh: "对输入文本执行 RC4 加密或解密。",
      en: "Run RC4 encryption or decryption on input text.",
    },
    highlights: {
      zh: ["经典算法", "快速操作", "本地完成"],
      en: ["Classic cipher", "Fast actions", "Local only"],
    },
  },
  {
    slug: "base64",
    category: "encrypt",
    title: { zh: "Base64 编解码", en: "Base64" },
    description: {
      zh: "在文本与 Base64 编码之间快速切换。",
      en: "Convert between plain text and Base64 quickly.",
    },
    highlights: {
      zh: ["Unicode 兼容", "编码/解码", "复制结果"],
      en: ["Unicode-safe", "Encode/decode", "Copy result"],
    },
  },
  {
    slug: "unicode",
    category: "encrypt",
    title: { zh: "Unicode 与中文转换", en: "Unicode Convert" },
    description: {
      zh: "将中文转换为 Unicode 转义，或还原为可读文本。",
      en: "Convert text to Unicode escape sequences and back.",
    },
    highlights: {
      zh: ["转义输出", "中文还原", "本地处理"],
      en: ["Escape output", "Restore readable text", "Local processing"],
    },
  },
  {
    slug: "url",
    category: "encrypt",
    title: { zh: "URL 编解码", en: "URL Encode" },
    description: {
      zh: "对 URL 参数和值进行安全编码与解码。",
      en: "Encode and decode URL values safely for transport.",
    },
    highlights: {
      zh: ["参数安全", "编码/解码", "即时结果"],
      en: ["Safe for params", "Encode/decode", "Instant result"],
    },
  },
  {
    slug: "timestamp",
    category: "time",
    title: { zh: "时间戳与格式化", en: "Timestamp" },
    description: {
      zh: "显示当前时间戳，并支持时间字符串互转。",
      en: "Show the current timestamp and convert between time strings and timestamps.",
    },
    highlights: {
      zh: ["秒/毫秒", "实时刷新", "双向转换"],
      en: ["Seconds/ms", "Live clock", "Bidirectional conversion"],
    },
  },
  {
    slug: "calculation",
    category: "time",
    title: { zh: "日期加减与间隔", en: "Date Calculation" },
    description: {
      zh: "做日期加减和两个日期之间的间隔计算。",
      en: "Add or subtract time from a date and measure date intervals.",
    },
    highlights: {
      zh: ["加减天月年", "区间天数", "表单直观"],
      en: ["Add days/months/years", "Day interval", "Clear forms"],
    },
  },
  {
    slug: "world",
    category: "time",
    title: { zh: "世界时间转换", en: "World Time" },
    description: {
      zh: "基于选定时区查看各地当前或指定时间。",
      en: "View a given moment across a set of major world time zones.",
    },
    highlights: {
      zh: ["多城市时区", "统一对照", "时区基准选择"],
      en: ["Multiple cities", "Side-by-side table", "Choose base zone"],
    },
  },
  {
    slug: "working-day",
    category: "time",
    title: { zh: "工作日偏移器", en: "Business Day Offset" },
    description: {
      zh: "围绕排期与交付场景推算工作日偏移，并兼顾自定义假期与补班设置。",
      en: "Shift schedules by business days with optional holiday and makeup-workday overrides.",
    },
    highlights: {
      zh: ["排除周末", "自定义放假", "区间统计"],
      en: ["Skip weekends", "Custom holiday list", "Range counting"],
    },
  },
  {
    slug: "batch-timestamp",
    category: "time",
    title: { zh: "多行时间格式转换", en: "Multi-Line Time Converter" },
    description: {
      zh: "把日志里的多行时间内容统一换成日期或时间戳，适合排查与清洗数据。",
      en: "Normalize timestamp-heavy logs line by line into readable dates or raw Unix values.",
    },
    highlights: {
      zh: ["自动识别方向", "秒与毫秒", "整批导出"],
      en: ["Auto direction", "Seconds and ms", "Batch export"],
    },
  },
  {
    slug: "unit-converter",
    category: "convert",
    title: { zh: "多单位换算台", en: "Unit Switchboard" },
    description: {
      zh: "把常见工程与日常单位收进一个工作台里，适合连看多种换算结果。",
      en: "Keep common engineering and daily units in one place for quick side-by-side conversions.",
    },
    highlights: {
      zh: ["按单位组切换", "目标单位直达", "整组结果表"],
      en: ["Grouped switching", "Direct target unit", "Whole-group table"],
    },
  },
  {
    slug: "english-amount",
    category: "finance",
    title: { zh: "英文票据金额", en: "English Amount Draft" },
    description: {
      zh: "把数字金额整理成适合票据、合同和报价单的英文金额表达。",
      en: "Draft invoice-ready English amount wording from a numeric money value.",
    },
    highlights: {
      zh: ["标准写法", "大写写法", "票据场景"],
      en: ["Sentence case", "Uppercase style", "Invoice ready"],
    },
  },
  {
    slug: "sum-list",
    category: "finance",
    title: { zh: "数字清单汇总", en: "Number Sheet Summary" },
    description: {
      zh: "把零散数字清单整理成总和、均值与极值摘要，适合报销和预算草算。",
      en: "Turn loose numeric lists into sum, average, and min/max summaries for quick budgeting.",
    },
    highlights: {
      zh: ["混合分隔输入", "均值与极值", "异常项提示"],
      en: ["Mixed separators", "Average and extremes", "Invalid token hints"],
    },
  },
  {
    slug: "loan",
    category: "finance",
    title: { zh: "月供测算台", en: "Loan Payment Planner" },
    description: {
      zh: "围绕本金、利率和年限快速预估月供压力与整体利息成本。",
      en: "Estimate monthly burden and total interest from loan principal, rate, and term.",
    },
    highlights: {
      zh: ["月供预估", "总利息", "前 12 期预览"],
      en: ["Monthly estimate", "Total interest", "First 12 months"],
    },
  },
  {
    slug: "rmb",
    category: "text",
    title: { zh: "人民币大写转换", en: "RMB Uppercase" },
    description: {
      zh: "把数字金额转换为人民币大写格式。",
      en: "Convert numbers into uppercase Chinese RMB wording.",
    },
    highlights: {
      zh: ["财务书写", "整数与小数", "即时结果"],
      en: ["Financial wording", "Integers and decimals", "Instant result"],
    },
  },
  {
    slug: "text-dedupe",
    category: "text",
    title: { zh: "列表去重整理", en: "List Cleanup" },
    description: {
      zh: "把重复项、大小写差异和多余空格统一清掉，输出更干净的名单或词表。",
      en: "Clean repeated entries, case differences, and noisy spacing into a tidier list.",
    },
    highlights: {
      zh: ["按行/逗号/空白", "忽略大小写", "保留汇总"],
      en: ["Line, comma, or space", "Ignore case", "Summary kept"],
    },
  },
  {
    slug: "emoji-clean",
    category: "text",
    title: { zh: "Emoji 清理器", en: "Emoji Cleaner" },
    description: {
      zh: "从文案里快速剔除 Emoji 与表情符号，保留更适合正式场景的纯文本结果。",
      en: "Strip emoji and pictographic symbols from text for cleaner, formal plain-text output.",
    },
    highlights: {
      zh: ["保留纯文本", "统计移除数量", "适合表单文案"],
      en: ["Plain text output", "Removed count", "Form-friendly"],
    },
  },
  {
    slug: "id-card-cn",
    category: "text",
    title: { zh: "身份证核验卡", en: "CN ID Check" },
    description: {
      zh: "校验大陆 18 位身份证号的格式、生日、校验位，并提取年龄与性别信息。",
      en: "Validate Mainland China 18-digit ID numbers and extract birthday, age, and gender details.",
    },
    highlights: {
      zh: ["18 位校验", "生日与年龄", "地区前缀识别"],
      en: ["18-digit validation", "Birthday and age", "Region prefix"],
    },
  },
  {
    slug: "simplified-traditional",
    category: "text",
    title: { zh: "中文简繁切换", en: "Chinese Script Switch" },
    description: {
      zh: "在简体与繁体之间快速切换，更适合文稿整理和多地区版本对照。",
      en: "Switch quickly between Simplified and Traditional Chinese for copy cleanup and regional variants.",
    },
    highlights: {
      zh: ["双向切换", "离线字典", "长文本可用"],
      en: ["Two-way switch", "Offline dictionary", "Long-text friendly"],
    },
  },
  {
    slug: "pinyin",
    category: "text",
    title: { zh: "拼音转写台", en: "Pinyin Transcriber" },
    description: {
      zh: "把中文句子转写成拼音，并补出首字母缩写，适合索引、检索和资料整理。",
      en: "Transcribe Chinese text into pinyin and initials for indexing, search, or note organization.",
    },
    highlights: {
      zh: ["音调/无调/数字调", "首字母输出", "本地完成"],
      en: ["Marked, plain, or numeric", "Initials output", "Local-only"],
    },
  },
  {
    slug: "pluralize",
    category: "text",
    title: { zh: "英文单复数转换", en: "Pluralize" },
    description: {
      zh: "在英文单数与复数形式之间快速切换。",
      en: "Switch quickly between singular and plural English nouns.",
    },
    highlights: {
      zh: ["单数/复数", "常见词形", "简洁输入"],
      en: ["Singular/plural", "Common word forms", "Simple input"],
    },
  },
  {
    slug: "english-case",
    category: "text",
    title: { zh: "英文大小写转换", en: "English Case" },
    description: {
      zh: "统一转换为大写、小写、标题式或句首式。",
      en: "Convert text into upper, lower, title, or sentence case.",
    },
    highlights: {
      zh: ["多种大小写", "适合文案整理", "快速复制"],
      en: ["Several case styles", "Clean copy", "Copy quickly"],
    },
  },
  {
    slug: "cn-en",
    category: "text",
    title: { zh: "中英混排优化", en: "CN/EN Spacing" },
    description: {
      zh: "自动优化中英文、数字与符号之间的排版间距。",
      en: "Improve spacing between Chinese, English, and numbers automatically.",
    },
    highlights: {
      zh: ["混排优化", "提升可读性", "一键修正"],
      en: ["Better mixed spacing", "Improved readability", "One-click fix"],
    },
  },
  {
    slug: "trim",
    category: "text",
    title: { zh: "文本空格去除", en: "Trim Text" },
    description: {
      zh: "去除整段或逐行首尾空白字符。",
      en: "Trim whitespace from the whole text or line by line.",
    },
    highlights: {
      zh: ["整段 trim", "逐行 trim", "适合批量文本"],
      en: ["Full trim", "Line trim", "Batch-friendly"],
    },
  },
  {
    slug: "regex",
    category: "text",
    title: { zh: "正则表达式校验", en: "Regex Test" },
    description: {
      zh: "输入模式和文本，快速验证是否匹配。",
      en: "Test whether a string matches a regular expression pattern.",
    },
    highlights: {
      zh: ["支持 flags", "快速校验", "模板示例"],
      en: ["Flags supported", "Quick validation", "Template examples"],
    },
  },
  {
    slug: "md-html",
    category: "text",
    title: { zh: "Markdown 转 HTML", en: "Markdown to HTML" },
    description: {
      zh: "将 Markdown 渲染为 HTML，并可切换预览。",
      en: "Render Markdown into HTML and switch between code and preview.",
    },
    highlights: {
      zh: ["双栏模式", "HTML 输出", "预览切换"],
      en: ["Two-pane flow", "HTML output", "Live preview"],
    },
  },
  {
    slug: "json",
    category: "dev",
    title: { zh: "JSON 解析/格式化", en: "JSON Format" },
    description: {
      zh: "格式化、压缩并校验 JSON 内容。",
      en: "Format, minify, and validate JSON content.",
    },
    highlights: {
      zh: ["格式化", "压缩", "语法校验"],
      en: ["Pretty print", "Minify", "Validation"],
    },
  },
  {
    slug: "json-to-types",
    category: "dev",
    title: { zh: "JSON 类型草稿", en: "JSON Type Sketch" },
    description: {
      zh: "从样例 JSON 草拟 TypeScript 类型定义，方便再继续手工细修。",
      en: "Sketch TypeScript interfaces from sample JSON before refining them by hand.",
    },
    highlights: {
      zh: ["根类型可改名", "层级保留", "Monaco 双栏"],
      en: ["Rename root type", "Keeps nesting", "Monaco dual pane"],
    },
  },
  {
    slug: "css",
    category: "dev",
    title: { zh: "CSS 格式化/压缩", en: "CSS Format" },
    description: {
      zh: "对 CSS 代码进行格式化与基础压缩。",
      en: "Format CSS and apply lightweight compression.",
    },
    highlights: {
      zh: ["Prettier 格式化", "压缩输出", "代码编辑区"],
      en: ["Prettier format", "Minified output", "Code editor"],
    },
  },
  {
    slug: "js",
    category: "dev",
    title: { zh: "JavaScript 格式化/压缩", en: "JavaScript Format" },
    description: {
      zh: "处理 JavaScript 代码的排版与精简。",
      en: "Format or compact JavaScript snippets for quick cleanup.",
    },
    highlights: {
      zh: ["Prettier 格式化", "压缩输出", "复制结果"],
      en: ["Prettier format", "Minify output", "Copy result"],
    },
  },
  {
    slug: "html",
    category: "dev",
    title: { zh: "HTML 格式化/压缩", en: "HTML Format" },
    description: {
      zh: "整理 HTML 结构并输出更易读或更紧凑的版本。",
      en: "Beautify HTML or compress it into a tighter representation.",
    },
    highlights: {
      zh: ["结构清晰", "压缩输出", "适合片段处理"],
      en: ["Cleaner structure", "Minified output", "Snippet friendly"],
    },
  },
  {
    slug: "sql",
    category: "dev",
    title: { zh: "SQL 格式化/压缩", en: "SQL Format" },
    description: {
      zh: "快速整理 SQL 语句结构，便于阅读与复制。",
      en: "Format SQL statements for readability or compress them for transport.",
    },
    highlights: {
      zh: ["关键字大写", "压缩空格", "适合查询语句"],
      en: ["Uppercase keywords", "Compress spaces", "Query friendly"],
    },
  },
  {
    slug: "crontab",
    category: "dev",
    title: { zh: "Crontab 执行时间", en: "Cron Schedule" },
    description: {
      zh: "根据 cron 表达式预览接下来多次执行时间。",
      en: "Preview the next several execution times from a cron expression.",
    },
    highlights: {
      zh: ["未来 10 次", "表达式验证", "时间列表"],
      en: ["Next 10 runs", "Expression validation", "Time list"],
    },
  },
  {
    slug: "naming-converter",
    category: "dev",
    title: { zh: "变量命名换挡", en: "Naming Gearbox" },
    description: {
      zh: "把自然语言或旧变量名重新拆词后，切换到常用的代码命名风格。",
      en: "Split natural language or existing identifiers and shift them into common code naming styles.",
    },
    highlights: {
      zh: ["自动拆词", "6 种命名格式", "即时结果"],
      en: ["Auto word split", "6 naming styles", "Instant output"],
    },
  },
  {
    slug: "color-converter",
    category: "dev",
    title: { zh: "颜色格式桥", en: "Color Format Bridge" },
    description: {
      zh: "连接 HEX、RGB 和 HSL 三种表示法，并用实时色块帮助核对结果。",
      en: "Bridge HEX, RGB, and HSL formats with a live swatch for quick visual confirmation.",
    },
    highlights: {
      zh: ["三种格式互看", "颜色选择器", "实时预览"],
      en: ["Three formats", "Color picker", "Live preview"],
    },
  },
  {
    slug: "websocket",
    category: "dev",
    title: { zh: "WebSocket 在线测试", en: "WebSocket Test" },
    description: {
      zh: "连接 WebSocket 地址，发送消息并查看实时日志。",
      en: "Connect to a WebSocket endpoint, send messages, and inspect logs.",
    },
    highlights: {
      zh: ["连接/关闭", "消息日志", "心跳配置"],
      en: ["Connect/close", "Message log", "Heartbeat settings"],
    },
  },
  {
    slug: "go-struct-json",
    category: "dev",
    title: { zh: "Go 结构体 / JSON 转换", en: "Go Struct / JSON" },
    description: {
      zh: "在 Go struct 和 JSON 示例之间互相转换。",
      en: "Convert between Go structs and JSON skeletons.",
    },
    highlights: {
      zh: ["双向转换", "保留层级", "开发常用"],
      en: ["Two-way conversion", "Keeps nesting", "Developer utility"],
    },
  },
  {
    slug: "less2css",
    category: "dev",
    title: { zh: "Less 转 CSS", en: "Less to CSS" },
    description: {
      zh: "编译 Less 代码并输出生成后的 CSS。",
      en: "Compile Less snippets and output the generated CSS.",
    },
    highlights: {
      zh: ["浏览器端编译", "双栏查看", "复制结果"],
      en: ["In-browser compile", "Two columns", "Copy output"],
    },
  },
  {
    slug: "binary",
    category: "dev",
    title: { zh: "计算机进制转换", en: "Base Conversion" },
    description: {
      zh: "把数字在二进制、八进制、十进制、十六进制等之间转换。",
      en: "Convert numbers across binary, octal, decimal, hexadecimal, and more.",
    },
    highlights: {
      zh: ["2/8/10/16/32/36 进制", "即时表格", "开发常用"],
      en: ["2/8/10/16/32/36 bases", "Instant table", "Useful in development"],
    },
  },
];

export const toolMap = new Map<ToolSlug, Tool>(tools.map((tool) => [tool.slug, tool]));

export function getTool(slug: string) {
  return toolMap.get(slug as ToolSlug);
}

export function getToolsByCategory(category: CategorySlug) {
  return tools.filter((tool) => tool.category === category);
}
