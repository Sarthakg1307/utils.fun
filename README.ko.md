[简体中文](./README.md) | [繁體中文](./README.tw.md) | [English](./README.en.md) | [日本語](./README.ja.md) | 한국어 | [Español](./README.es.md) | [Deutsch](./README.de.md) | [Русский](./README.ru.md) | [العربية](./README.ar.md)

> 이 README는 중국어 버전을 기준으로 동기화됩니다. 차이가 있으면 `README.md`를 기준으로 해주세요.

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

개발, 텍스트, 시간, 이미지, 인코딩, 일상적인 생성 작업을 위한 다국어 지원 셀프호스팅 온라인 툴박스입니다.

![Utils.fun](./docs/index.png)

## 먼저 배포하기

| 방법 | 적합한 상황 | 실행 |
| --- | --- | --- |
| Vercel | 설정 없이 빠르게 배포 | [![Deploy on Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Licoy/utils.fun) |
| Docker | 클라우드 서버 / NAS / 셀프호스팅 | 아래 `docker pull` 참고 |
| Node.js | Node.js 20 환경이 이미 있는 경우 | `npm install && npm run build && npm run start` |

### Docker 배포

```bash
docker pull licoy/utils.fun:latest
docker run -d \
  --name utils-fun \
  --restart unless-stopped \
  -p 3000:3000 \
  licoy/utils.fun:latest
```

`http://localhost:3000` 에 접속하세요.

### 로컬 개발

```bash
npm install
npm run dev
```

## 핵심 특징

- 55개 도구를 8개 카테고리로 구성하고, 홈·검색·즐겨찾기·상세 페이지를 일관되게 연결합니다.
- 텍스트, 인코딩, 시간, 이미지, 개발 도구의 많은 작업을 브라우저 안에서 처리합니다.
- 9개 언어를 지원하며, 일반 브라우징은 무접두 경로, SEO 페이지는 `/{locale}/{slug}` 를 사용합니다.
- 사이트 제목, 설명, 푸터, 로고 Alt 를 `site.config.*` 에서 언어별로 설정할 수 있습니다.
- `Next.js 16`, `React 19`, `TypeScript`, `Tailwind CSS v4` 기반입니다.

## 사이트 설정

브랜드 및 배포 설정은 주로 다음 파일에서 관리합니다.

- `site.config.default.ts`
- `site.config.dev.ts`
- `site.config.prod.ts`

`i18n` 필드는 언어별로 다음 값을 덮어쓸 수 있습니다.

- `title`
- `description`
- `footerHtml`
- `logoAlt`

운영 환경에서는 다음 전역 환경 변수로도 덮어쓸 수 있습니다.

`SITE_TITLE` `SITE_TITLE_SEPARATOR` `SITE_DESCRIPTION` `SITE_URL` `SITE_LOGO_SRC` `SITE_LOGO_ALT` `SITE_LOGO_WIDTH` `SITE_LOGO_HEIGHT` `SITE_LOGO_HIDDEN` `SITE_FOOTER_HTML` `SITE_GITHUB_URL`

## 검사

```bash
npm run lint
npm run build
```

## 도구 추가

1. `lib/tools/registry.ts` 와 `lib/tools/content/*` 에 도구 메타데이터를 추가합니다.
2. `components/tool-icon.tsx` 에 아이콘을 등록합니다.
3. `components/tool-workbench.tsx` 에 구현을 등록합니다.
4. `npm run lint` 와 `npm run build` 를 실행합니다.

## License

[MIT](./LICENSE)
