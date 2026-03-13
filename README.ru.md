[简体中文](./README.md) | [繁體中文](./README.tw.md) | [English](./README.en.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Deutsch](./README.de.md) | Русский | [العربية](./README.ar.md)

> Этот README синхронизируется с китайской версией. Если есть расхождения, приоритет у `README.md`.

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

Аккуратный самохостируемый онлайн-набор инструментов с мультиязычностью и SEO-маршрутами для разработки, текста, времени, изображений, кодирования и повседневной генерации.

![Utils.fun](./docs/index.png)

## Разверните сразу

| Способ | Подходит для | Действие |
| --- | --- | --- |
| Vercel | Быстрый запуск без настройки | [![Deploy on Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Licoy/utils.fun) |
| Docker | Облачный сервер / NAS / self-hosted | См. `docker pull` ниже |
| Node.js | Уже есть Node.js 20 | `npm install && npm run build && npm run start` |

### Docker

```bash
docker pull licoy/utils.fun:latest
docker run -d \
  --name utils-fun \
  --restart unless-stopped \
  -p 3000:3000 \
  licoy/utils.fun:latest
```

Откройте `http://localhost:3000`.

### Локальная разработка

```bash
npm install
npm run dev
```

## Ключевые возможности

- 55 инструментов в 8 категориях, единая связка главной, поиска, избранного и страниц деталей.
- Приоритет локальной обработке в браузере для типичных задач с текстом, кодированием, временем, изображениями и разработкой.
- Поддержка 9 языков, обычные маршруты без префикса и `/{locale}/{slug}` для SEO-страниц.
- Название сайта, описание, футер и alt для логотипа можно настраивать по языкам в `site.config.*`.
- Построено на `Next.js 16`, `React 19`, `TypeScript` и `Tailwind CSS v4`.

## Конфигурация сайта

Брендинг и настройки развертывания в первую очередь поддерживаются в:

- `site.config.default.ts`
- `site.config.dev.ts`
- `site.config.prod.ts`

Поле `i18n` может переопределять по языкам:

- `title`
- `description`
- `footerHtml`
- `logoAlt`

В production также поддерживаются глобальные переменные окружения:

`SITE_TITLE` `SITE_TITLE_SEPARATOR` `SITE_DESCRIPTION` `SITE_URL` `SITE_LOGO_SRC` `SITE_LOGO_ALT` `SITE_LOGO_WIDTH` `SITE_LOGO_HEIGHT` `SITE_LOGO_HIDDEN` `SITE_FOOTER_HTML` `SITE_GITHUB_URL`

## Проверка

```bash
npm run lint
npm run build
```

## Добавление инструмента

1. Добавьте метаданные в `lib/tools/registry.ts` и `lib/tools/content/*`.
2. Зарегистрируйте иконку в `components/tool-icon.tsx`.
3. Зарегистрируйте реализацию в `components/tool-workbench.tsx`.
4. Запустите `npm run lint` и `npm run build`.

## License

[MIT](./LICENSE)
