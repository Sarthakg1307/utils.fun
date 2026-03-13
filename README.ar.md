[简体中文](./README.md) | [繁體中文](./README.tw.md) | [English](./README.en.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Deutsch](./README.de.md) | [Русский](./README.ru.md) | العربية

> هذا README متزامن مع النسخة الصينية، وإذا وُجد اختلاف فالأولوية لملف `README.md`.

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

مجموعة أدوات إلكترونية نظيفة وقابلة للاستضافة الذاتية، تدعم تعدد اللغات ومسارات SEO لسيناريوهات التطوير والنصوص والوقت والصور والترميز والتوليد اليومي.

## ابدأ بالنشر

| الطريقة | مناسب لـ | الإجراء |
| --- | --- | --- |
| Vercel | إطلاق سريع بدون إعدادات | [![Deploy on Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Licoy/utils.fun) |
| Docker | خادم سحابي / NAS / استضافة ذاتية | راجع `docker run` أدناه |
| Node.js | لديك بيئة Node.js 20 جاهزة | `npm install && npm run build && npm run start` |

### Docker

```bash
docker build -t utils-fun .
docker run -d \
  --name utils-fun \
  --restart unless-stopped \
  -p 3000:3000 \
  utils-fun
```

افتح `http://localhost:3000`.

### التطوير المحلي

```bash
npm install
npm run dev
```

![Utils.fun](./docs/index.png)

## أهم المزايا

- 55 أداة ضمن 8 فئات مع ترابط موحد بين الصفحة الرئيسية والبحث والمفضلة وصفحات التفاصيل.
- معالجة محلية داخل المتصفح قدر الإمكان لمهام النصوص والترميز والوقت والصور وأدوات المطور.
- يدعم 9 لغات، مع مسارات بلا بادئة للتصفح العادي و `/{locale}/{slug}` لصفحات SEO.
- يمكن ضبط عنوان الموقع والوصف والتذييل وبديل الشعار لكل لغة داخل `site.config.*`.
- مبني باستخدام `Next.js 16` و `React 19` و `TypeScript` و `Tailwind CSS v4`.

## إعدادات الموقع

تتم إدارة الهوية وإعدادات النشر أساسًا عبر الملفات التالية:

- `site.config.default.ts`
- `site.config.dev.ts`
- `site.config.prod.ts`

يمكن لحقل `i18n` تخصيص القيم التالية لكل لغة:

- `title`
- `description`
- `footerHtml`
- `logoAlt`

وفي الإنتاج يمكنك أيضًا استخدام متغيرات البيئة العامة التالية:

`SITE_TITLE` `SITE_TITLE_SEPARATOR` `SITE_DESCRIPTION` `SITE_URL` `SITE_LOGO_SRC` `SITE_LOGO_ALT` `SITE_LOGO_WIDTH` `SITE_LOGO_HEIGHT` `SITE_LOGO_HIDDEN` `SITE_FOOTER_HTML` `SITE_GITHUB_URL`

## الفحوصات

```bash
npm run lint
npm run build
```

## إضافة أداة

1. أضف بيانات الأداة في `lib/tools/registry.ts` و `lib/tools/content/*`.
2. سجّل الأيقونة في `components/tool-icon.tsx`.
3. سجّل التنفيذ في `components/tool-workbench.tsx`.
4. شغّل `npm run lint` و `npm run build`.

## License

[MIT](./LICENSE)
