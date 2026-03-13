简体中文 | [繁體中文](./README.tw.md) | [English](./README.en.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Deutsch](./README.de.md) | [Русский](./README.ru.md) | [العربية](./README.ar.md)

> 中文内容为准，其余 README 为同步翻译版本。

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

一个简洁、可自部署、支持多语言与 SEO 路由的在线工具站，覆盖开发、文本、时间、图片、编码与常用生成场景。

## 立即部署

| 方式 | 适合场景 | 操作 |
| --- | --- | --- |
| Vercel | 零配置快速上线 | [![Deploy on Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Licoy/utils.fun) |
| Docker | 云服务器 / NAS / 自托管 | 见下方 `docker run` |
| Node.js | 已有 Node.js 20 环境 | `npm install && npm run build && npm run start` |

### Docker 部署

```bash
docker build -t utils-fun .
docker run -d \
  --name utils-fun \
  --restart unless-stopped \
  -p 3000:3000 \
  utils-fun
```

访问 `http://localhost:3000`。

### 本地开发

```bash
npm install
npm run dev
```

![Utils.fun](./docs/index.png)

## 项目亮点

- 55 个工具，8 个分类，首页、搜索、收藏、详情页统一联动。
- 浏览器本地优先，常见文本、编码、时间、图片与开发类工具尽量不上传用户数据。
- 已支持 9 种语言，普通访问走无前缀路径，SEO 页面支持 `/{locale}/{slug}`。
- 站点标题、描述、页脚、Logo Alt 支持在 `site.config.*` 里按语言配置。
- 基于 `Next.js 16`、`React 19`、`TypeScript` 与 `Tailwind CSS v4` 构建。

## 站点配置

站点品牌与部署配置优先通过根目录下列文件维护：

- `site.config.default.ts`
- `site.config.dev.ts`
- `site.config.prod.ts`

其中 `i18n` 字段可以按语言覆盖：

- `title`
- `description`
- `footerHtml`
- `logoAlt`

生产环境还支持全局环境变量覆盖：

`SITE_TITLE` `SITE_TITLE_SEPARATOR` `SITE_DESCRIPTION` `SITE_URL` `SITE_LOGO_SRC` `SITE_LOGO_ALT` `SITE_LOGO_WIDTH` `SITE_LOGO_HEIGHT` `SITE_LOGO_HIDDEN` `SITE_FOOTER_HTML` `SITE_GITHUB_URL`

## 开发检查

```bash
npm run lint
npm run build
```

## 新增工具

1. 在 `lib/tools/registry.ts` 和 `lib/tools/content/*` 中补充工具元信息。
2. 在 `components/tool-icon.tsx` 中补充工具图标。
3. 在 `components/tool-workbench.tsx` 中注册工具实现。
4. 执行 `npm run lint` 与 `npm run build`。

## License

[MIT](./LICENSE)
