[简体中文](./README.md) | [繁體中文](./README.tw.md) | [English](./README.en.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | Deutsch | [Русский](./README.ru.md) | [العربية](./README.ar.md)

> Dieses README wird aus der chinesischen Version synchronisiert. Bei Abweichungen gilt `README.md`.

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

Eine saubere, selbst hostbare Online-Toolbox mit Mehrsprachigkeit und SEO-Routen für Entwicklung, Text, Zeit, Bilder, Kodierung und typische Generierungsaufgaben.

## Sofort deployen

| Methode | Geeignet für | Aktion |
| --- | --- | --- |
| Vercel | Schneller Start ohne Konfiguration | [![Deploy on Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Licoy/utils.fun) |
| Docker | Cloud-Server / NAS / Self-Hosting | `docker run` unten ansehen |
| Node.js | Vorhandene Node.js-20-Umgebung | `npm install && npm run build && npm run start` |

### Docker

```bash
docker build -t utils-fun .
docker run -d \
  --name utils-fun \
  --restart unless-stopped \
  -p 3000:3000 \
  utils-fun
```

`http://localhost:3000` öffnen.

### Lokale Entwicklung

```bash
npm install
npm run dev
```

![Utils.fun](./docs/index.png)

## Highlights

- 55 Tools in 8 Kategorien, mit synchronen Start-, Such-, Favoriten- und Detailseiten.
- Browser-first-Verarbeitung für häufige Text-, Kodierungs-, Zeit-, Bild- und Entwickler-Workflows.
- Unterstützt 9 Sprachen, ungeprefxte Pfade für normales Browsing und `/{locale}/{slug}` für SEO-Seiten.
- Seitentitel, Beschreibung, Footer und Logo-Alt können pro Sprache in `site.config.*` konfiguriert werden.
- Gebaut mit `Next.js 16`, `React 19`, `TypeScript` und `Tailwind CSS v4`.

## Site-Konfiguration

Branding- und Deployment-Einstellungen werden hauptsächlich hier gepflegt:

- `site.config.default.ts`
- `site.config.dev.ts`
- `site.config.prod.ts`

Das Feld `i18n` kann pro Sprache diese Werte überschreiben:

- `title`
- `description`
- `footerHtml`
- `logoAlt`

In Produktion sind auch diese globalen Umgebungsvariablen möglich:

`SITE_TITLE` `SITE_TITLE_SEPARATOR` `SITE_DESCRIPTION` `SITE_URL` `SITE_LOGO_SRC` `SITE_LOGO_ALT` `SITE_LOGO_WIDTH` `SITE_LOGO_HEIGHT` `SITE_LOGO_HIDDEN` `SITE_FOOTER_HTML` `SITE_GITHUB_URL`

## Checks

```bash
npm run lint
npm run build
```

## Tool hinzufügen

1. Tool-Metadaten in `lib/tools/registry.ts` und `lib/tools/content/*` ergänzen.
2. Das Icon in `components/tool-icon.tsx` registrieren.
3. Die Implementierung in `components/tool-workbench.tsx` registrieren.
4. `npm run lint` und `npm run build` ausführen.

## License

[MIT](./LICENSE)
