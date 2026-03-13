[简体中文](./README.md) | [繁體中文](./README.tw.md) | [English](./README.en.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | Español | [Deutsch](./README.de.md) | [Русский](./README.ru.md) | [العربية](./README.ar.md)

> Este README se sincroniza desde la versión en chino. Si hay diferencias, prevalece `README.md`.

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

Una caja de herramientas online, autohospedable y multilingüe, para tareas de desarrollo, texto, tiempo, imagen, codificación y generación habitual.

## Despliega primero

| Método | Ideal para | Acción |
| --- | --- | --- |
| Vercel | Publicación rápida sin configuración | [![Deploy on Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Licoy/utils.fun) |
| Docker | Servidor en la nube / NAS / autohospedado | Consulta `docker run` abajo |
| Node.js | Entorno existente con Node.js 20 | `npm install && npm run build && npm run start` |

### Docker

```bash
docker build -t utils-fun .
docker run -d \
  --name utils-fun \
  --restart unless-stopped \
  -p 3000:3000 \
  utils-fun
```

Abre `http://localhost:3000`.

### Desarrollo local

```bash
npm install
npm run dev
```

![Utils.fun](./docs/index.png)

## Puntos clave

- 55 herramientas en 8 categorías, con inicio, búsqueda, favoritos y páginas de detalle conectados entre sí.
- Procesamiento local en el navegador para flujos comunes de texto, codificación, tiempo, imagen y desarrollo.
- Soporte para 9 idiomas, rutas sin prefijo para uso normal y `/{locale}/{slug}` para páginas SEO.
- El título, la descripción, el pie y el logo alt del sitio pueden configurarse por idioma en `site.config.*`.
- Construido con `Next.js 16`, `React 19`, `TypeScript` y `Tailwind CSS v4`.

## Configuración del sitio

La marca y la configuración de despliegue se mantienen principalmente en:

- `site.config.default.ts`
- `site.config.dev.ts`
- `site.config.prod.ts`

El campo `i18n` puede sobrescribir por idioma:

- `title`
- `description`
- `footerHtml`
- `logoAlt`

En producción también puedes sobrescribir con estas variables globales:

`SITE_TITLE` `SITE_TITLE_SEPARATOR` `SITE_DESCRIPTION` `SITE_URL` `SITE_LOGO_SRC` `SITE_LOGO_ALT` `SITE_LOGO_WIDTH` `SITE_LOGO_HEIGHT` `SITE_LOGO_HIDDEN` `SITE_FOOTER_HTML` `SITE_GITHUB_URL`

## Verificación

```bash
npm run lint
npm run build
```

## Añadir una herramienta

1. Añade los metadatos en `lib/tools/registry.ts` y `lib/tools/content/*`.
2. Registra el icono en `components/tool-icon.tsx`.
3. Registra la implementación en `components/tool-workbench.tsx`.
4. Ejecuta `npm run lint` y `npm run build`.

## License

[MIT](./LICENSE)
