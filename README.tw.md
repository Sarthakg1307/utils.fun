[简体中文](./README.md) | 繁體中文 | [English](./README.en.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Deutsch](./README.de.md) | [Русский](./README.ru.md) | [العربية](./README.ar.md)

> 中文內容為準，其餘 README 為同步翻譯版本。

<p align="center">
  <a href="https://github.com/Licoy/utils.fun/stargazers"><img alt="GitHub Stars" src="https://img.shields.io/github/stars/Licoy/utils.fun?style=flat-square" /></a>
  <a href="https://github.com/Licoy/utils.fun/network/members"><img alt="GitHub Forks" src="https://img.shields.io/github/forks/Licoy/utils.fun?style=flat-square" /></a>
  <a href="./LICENSE"><img alt="License" src="https://img.shields.io/github/license/Licoy/utils.fun?style=flat-square" /></a>
  <img alt="Next.js 16" src="https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white" />
  <img alt="React 19" src="https://img.shields.io/badge/React-19-149eca?style=flat-square&logo=react&logoColor=white" />
  <img alt="TypeScript 5" src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img alt="55 tools" src="https://img.shields.io/badge/Tools-55-2F855A?style=flat-square" />
  <img alt="9 locales" src="https://img.shields.io/badge/I18N-9%20Locales-C05621?style=flat-square" />
</p>

# Utils.fun

一個簡潔、可自部署、支援多語言與 SEO 路由的線上工具站，涵蓋開發、文字、時間、圖片、編碼與常用生成場景。

## 立即部署

| 方式 | 適合場景 | 操作 |
| --- | --- | --- |
| Vercel | 零設定快速上線 | [![Deploy on Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Licoy/utils.fun) |
| Docker | 雲伺服器 / NAS / 自託管 | 見下方 `docker run` |
| Node.js | 已有 Node.js 20 環境 | `npm install && npm run build && npm run start` |

### Docker 部署

```bash
docker build -t utils-fun .
docker run -d \
  --name utils-fun \
  --restart unless-stopped \
  -p 3000:3000 \
  utils-fun
```

訪問 `http://localhost:3000`。

### 本地開發

```bash
npm install
npm run dev
```

![Utils.fun](./docs/index.png)

## 專案亮點

- 55 個工具、8 個分類，首頁、搜尋、收藏與詳情頁統一聯動。
- 瀏覽器本地優先，常見文字、編碼、時間、圖片與開發類工具盡量不會上傳使用者資料。
- 已支援 9 種語言，一般訪問走無前綴路徑，SEO 頁面支援 `/{locale}/{slug}`。
- 站點標題、描述、頁腳與 Logo Alt 可在 `site.config.*` 中按語言配置。
- 基於 `Next.js 16`、`React 19`、`TypeScript` 與 `Tailwind CSS v4` 構建。

## 站點配置

站點品牌與部署配置優先透過根目錄下列檔案維護：

- `site.config.default.ts`
- `site.config.dev.ts`
- `site.config.prod.ts`

其中 `i18n` 欄位可以按語言覆蓋：

- `title`
- `description`
- `footerHtml`
- `logoAlt`

生產環境也支援全域環境變數覆蓋：

`SITE_TITLE` `SITE_TITLE_SEPARATOR` `SITE_DESCRIPTION` `SITE_URL` `SITE_LOGO_SRC` `SITE_LOGO_ALT` `SITE_LOGO_WIDTH` `SITE_LOGO_HEIGHT` `SITE_LOGO_HIDDEN` `SITE_FOOTER_HTML` `SITE_GITHUB_URL`

## 開發檢查

```bash
npm run lint
npm run build
```

## 新增工具

1. 在 `lib/tools/registry.ts` 與 `lib/tools/content/*` 中補充工具中繼資料。
2. 在 `components/tool-icon.tsx` 中補上工具圖示。
3. 在 `components/tool-workbench.tsx` 中註冊工具實作。
4. 執行 `npm run lint` 與 `npm run build`。

## License

[MIT](./LICENSE)
