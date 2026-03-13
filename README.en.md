[简体中文](./README.md) | [繁體中文](./README.tw.md) | English | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Deutsch](./README.de.md) | [Русский](./README.ru.md) | [العربية](./README.ar.md)

> This README is synchronized from the Chinese version. If anything differs, `README.md` prevails.

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

A clean, self-hostable online toolbox with multilingual support and SEO routes for dev, text, time, image, encoding, and everyday generation tasks.

## Deploy First

| Method | Best for | Action |
| --- | --- | --- |
| Vercel | Fast zero-config launch | [![Deploy on Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Licoy/utils.fun) |
| Docker | Cloud server / NAS / self-hosting | See `docker run` below |
| Node.js | Existing Node.js 20 runtime | `npm install && npm run build && npm run start` |

### Docker

```bash
docker build -t utils-fun .
docker run -d \
  --name utils-fun \
  --restart unless-stopped \
  -p 3000:3000 \
  utils-fun
```

Open `http://localhost:3000`.

### Local Development

```bash
npm install
npm run dev
```

![Utils.fun](./docs/index.png)

## Highlights

- 55 tools across 8 categories, with homepage, search, favorites, and detail pages kept in sync.
- Browser-first processing for common text, encoding, time, image, and developer workflows whenever possible.
- 9 supported locales, unprefixed paths for normal browsing, and `/{locale}/{slug}` for SEO pages.
- Site title, description, footer, and logo alt can be configured per locale in `site.config.*`.
- Built with `Next.js 16`, `React 19`, `TypeScript`, and `Tailwind CSS v4`.

## Site Config

Branding and deployment settings are primarily maintained in:

- `site.config.default.ts`
- `site.config.dev.ts`
- `site.config.prod.ts`

The `i18n` field can override these values per locale:

- `title`
- `description`
- `footerHtml`
- `logoAlt`

Production also supports these global environment variable overrides:

`SITE_TITLE` `SITE_TITLE_SEPARATOR` `SITE_DESCRIPTION` `SITE_URL` `SITE_LOGO_SRC` `SITE_LOGO_ALT` `SITE_LOGO_WIDTH` `SITE_LOGO_HEIGHT` `SITE_LOGO_HIDDEN` `SITE_FOOTER_HTML` `SITE_GITHUB_URL`

## Checks

```bash
npm run lint
npm run build
```

## Add a Tool

1. Add tool metadata in `lib/tools/registry.ts` and `lib/tools/content/*`.
2. Register the icon in `components/tool-icon.tsx`.
3. Register the implementation in `components/tool-workbench.tsx`.
4. Run `npm run lint` and `npm run build`.

## License

[MIT](./LICENSE)
