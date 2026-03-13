[简体中文](./README.md) | [繁體中文](./README.tw.md) | [English](./README.en.md) | 日本語 | [한국어](./README.ko.md) | [Español](./README.es.md) | [Deutsch](./README.de.md) | [Русский](./README.ru.md) | [العربية](./README.ar.md)

> この README は中国語版を元に同期しています。差異がある場合は `README.md` を優先してください。

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

開発、テキスト、時間、画像、エンコード、日常的な生成作業をカバーする、多言語対応・自己ホスト可能なオンラインツール集です。

![Utils.fun](./docs/index.png)

## まずはデプロイ

| 方法 | 用途 | 操作 |
| --- | --- | --- |
| Vercel | 設定なしで素早く公開 | [![Deploy on Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Licoy/utils.fun) |
| Docker | クラウドサーバー / NAS / セルフホスト | 下の `docker pull` を参照 |
| Node.js | Node.js 20 環境がある場合 | `npm install && npm run build && npm run start` |

### Docker デプロイ

```bash
docker pull licoy/utils.fun:latest
docker run -d \
  --name utils-fun \
  --restart unless-stopped \
  -p 3000:3000 \
  licoy/utils.fun:latest
```

`http://localhost:3000` を開きます。

### ローカル開発

```bash
npm install
npm run dev
```

## 主な特徴

- 55 個のツールを 8 カテゴリで整理し、ホーム、検索、お気に入り、詳細ページを一貫して連動。
- テキスト、エンコード、時間、画像、開発系ツールの多くはブラウザ内で処理。
- 9 言語に対応し、通常閲覧はプレフィックスなし、SEO 用ページは `/{locale}/{slug}` を使用。
- サイトタイトル、説明、フッター、Logo Alt を `site.config.*` で言語別に設定可能。
- `Next.js 16`、`React 19`、`TypeScript`、`Tailwind CSS v4` で構築。

## サイト設定

ブランド設定とデプロイ設定は主に次のファイルで管理します。

- `site.config.default.ts`
- `site.config.dev.ts`
- `site.config.prod.ts`

`i18n` フィールドでは言語ごとに次を上書きできます。

- `title`
- `description`
- `footerHtml`
- `logoAlt`

本番環境では次のグローバル環境変数でも上書きできます。

`SITE_TITLE` `SITE_TITLE_SEPARATOR` `SITE_DESCRIPTION` `SITE_URL` `SITE_LOGO_SRC` `SITE_LOGO_ALT` `SITE_LOGO_WIDTH` `SITE_LOGO_HEIGHT` `SITE_LOGO_HIDDEN` `SITE_FOOTER_HTML` `SITE_GITHUB_URL`

## チェック

```bash
npm run lint
npm run build
```

## ツール追加

1. `lib/tools/registry.ts` と `lib/tools/content/*` にツールメタデータを追加する。
2. `components/tool-icon.tsx` にアイコンを追加する。
3. `components/tool-workbench.tsx` に実装を登録する。
4. `npm run lint` と `npm run build` を実行する。

## License

[MIT](./LICENSE)
