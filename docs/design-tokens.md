# 디자인 토큰 매핑 테이블

> Figma 변수명 ↔ CSS custom property 매핑.
> Claude Code가 Figma 디자인 구현 시 이 문서를 참조합니다.
> 토큰 추가/변경 시 이 문서도 업데이트하세요.
>
> Source: Figma file `3i6GHDeSBITVpdPtoNtTh3`
> Last synced: 2026-06-24

## 네이밍 규칙

Figma `/` → CSS `-` 변환. 예: `color/bg/primary` → `--color-bg-primary`

CSS 파일 위치:

- `src/tokens/colors.css` — 색상 (Primitive + Semantic)
- `src/tokens/spacing.css` — 스페이싱, 반경, 타이포그래피

---

## 색상 (Primitive — Blue)

| Figma 변수명 | CSS Property          | 값      |
| ------------ | --------------------- | ------- |
| blue/20      | --primitive-blue-20   | #f7faff |
| blue/50      | --primitive-blue-50   | #eff6ff |
| blue/100     | --primitive-blue-100  | #f1f8fe |
| blue/120     | --primitive-blue-120  | #dbeafe |
| blue/200     | --primitive-blue-200  | #b8dcfc |
| blue/280     | --primitive-blue-280  | #93c5fd |
| blue/300     | --primitive-blue-300  | #91caff |
| blue/400     | --primitive-blue-400  | #69b1ff |
| blue/440     | --primitive-blue-440  | #63a3fb |
| blue/500     | --primitive-blue-500  | #4096ff |
| blue/540     | --primitive-blue-540  | #3b82f6 |
| blue/600     | --primitive-blue-600  | #1289f6 |
| blue/680     | --primitive-blue-680  | #1d4ed8 |
| blue/700     | --primitive-blue-700  | #0958d9 |
| blue/800     | --primitive-blue-800  | #003eb3 |
| blue/900     | --primitive-blue-900  | #002c8c |
| blue/1000    | --primitive-blue-1000 | #001d66 |

## 색상 (Primitive — Gray)

| Figma 변수명 | CSS Property          | 값      |
| ------------ | --------------------- | ------- |
| gray/100     | --primitive-gray-100  | #ffffff |
| gray/300     | --primitive-gray-300  | #f5f7fa |
| gray/305     | --primitive-gray-305  | #f1f5f9 |
| gray/340     | --primitive-gray-340  | #e2e8f0 |
| gray/360     | --primitive-gray-360  | #e5e7eb |
| gray/400     | --primitive-gray-400  | #d1d5db |
| gray/490     | --primitive-gray-490  | #94a3b8 |
| gray/500     | --primitive-gray-500  | #9ca3af |
| gray/540     | --primitive-gray-540  | #7c8484 |
| gray/600     | --primitive-gray-600  | #6b7280 |
| gray/610     | --primitive-gray-610  | #64748b |
| gray/700     | --primitive-gray-700  | #4b5563 |
| gray/800     | --primitive-gray-800  | #374151 |
| gray/850     | --primitive-gray-850  | #2c3030 |
| gray/900     | --primitive-gray-900  | #262626 |
| gray/1000    | --primitive-gray-1000 | #161c1c |
| gray/1050    | --primitive-gray-1050 | #0f172a |
| Gray/100     | --primitive-Gray-100  | #f9fafb |
| Gray/200     | --primitive-Gray-200  | #f3f4f6 |

## 색상 (Primitive — Red)

| Figma 변수명 | CSS Property         | 값      |
| ------------ | -------------------- | ------- |
| red/100      | --primitive-red-100  | #fffbfc |
| red/200      | --primitive-red-200  | #fff2f5 |
| red/300      | --primitive-red-300  | #ffccc7 |
| red/400      | --primitive-red-400  | #ffa39e |
| red/500      | --primitive-red-500  | #ff4d4f |
| red/600      | --primitive-red-600  | #fc2a55 |
| red/700      | --primitive-red-700  | #cf1322 |
| red/800      | --primitive-red-800  | #a8071a |
| red/900      | --primitive-red-900  | #820014 |
| red/1000     | --primitive-red-1000 | #5c0011 |

## 색상 (Semantic — Text)

| Figma 변수명   | CSS Property     | 참조                       | 값      | 용도                  |
| -------------- | ---------------- | -------------------------- | ------- | --------------------- |
| text/primary   | --text-primary   | var(--primitive-gray-1000) | #161c1c | 주요 텍스트           |
| text/secondary | --text-secondary | var(--primitive-gray-600)  | #6b7280 | 보조 텍스트           |
| text/tertiary  | --text-tertiary  | var(--primitive-gray-500)  | #9ca3af | 3차 텍스트            |
| text/disabled  | --text-disabled  | var(--primitive-gray-400)  | #d1d5db | 비활성 텍스트         |
| text/onbrand   | --text-onbrand   | var(--primitive-gray-100)  | #ffffff | 브랜드 배경 위 텍스트 |
| text/Danger    | --text-danger    | var(--primitive-red-600)   | #fc2a55 | 오류/위험 텍스트      |

## 색상 (Semantic — Background)

| Figma 변수명            | CSS Property              | 참조                      | 값      | 용도             |
| ----------------------- | ------------------------- | ------------------------- | ------- | ---------------- |
| background/default      | --background-default      | var(--primitive-gray-100) | #ffffff | 기본 배경        |
| background/Subtle       | --background-subtle       | —                         | #fafafa | 약한 배경        |
| background/muted        | --background-muted        | var(--primitive-gray-300) | #f5f7fa | 뮤트 배경        |
| background/brand        | --background-brand        | var(--primitive-blue-600) | #1289f6 | 브랜드 배경      |
| background/brandsubtle  | --background-brandsubtle  | var(--primitive-blue-100) | #f1f8fe | 브랜드 약한 배경 |
| background/danger       | --background-danger       | var(--primitive-red-200)  | #fff2f5 | 위험 배경        |
| background/dangersubtle | --background-dangersubtle | var(--primitive-red-100)  | #fffbfc | 위험 약한 배경   |

## 색상 (Semantic — Border)

| Figma 변수명   | CSS Property     | 참조                      | 값      | 용도        |
| -------------- | ---------------- | ------------------------- | ------- | ----------- |
| border/default | --border-default | var(--primitive-gray-400) | #d1d5db | 기본 보더   |
| border/strong  | --border-strong  | var(--primitive-gray-700) | #4b5563 | 강조 보더   |
| border/brand   | --border-brand   | var(--primitive-blue-600) | #1289f6 | 브랜드 보더 |
| border/danger  | --border-danger  | var(--primitive-red-600)  | #fc2a55 | 위험 보더   |

## 색상 (Semantic — Interactive)

| Figma 변수명                 | CSS Property                   | 참조                      | 값      | 용도             |
| ---------------------------- | ------------------------------ | ------------------------- | ------- | ---------------- |
| interactive/primary          | --interactive-primary          | var(--primitive-blue-600) | #1289f6 | 기본 인터랙티브  |
| interactive/primaryhover     | --interactive-primaryhover     | var(--primitive-blue-700) | #0958d9 | 기본 호버        |
| interactive/destructive      | --interactive-destructive      | var(--primitive-red-600)  | #fc2a55 | 파괴적 액션      |
| interactive/destructivehover | --interactive-destructivehover | var(--primitive-red-700)  | #cf1322 | 파괴적 액션 호버 |

## 색상 (Semantic — Content)

| Figma 변수명    | CSS Property      | 참조                      | 값      | 용도        |
| --------------- | ----------------- | ------------------------- | ------- | ----------- |
| content/strong  | --content-strong  | var(--primitive-gray-900) | #262626 | 강조 콘텐츠 |
| content/default | --content-default | var(--primitive-gray-800) | #374151 | 기본 콘텐츠 |
| content/muted   | --content-muted   | var(--primitive-gray-700) | #4b5563 | 뮤트 콘텐츠 |

---

## 스페이싱

| Figma 변수명 | CSS Property | 값   |
| ------------ | ------------ | ---- |
| spacing/0    | --spacing-0  | 0px  |
| spacing/2    | --spacing-2  | 2px  |
| spacing/4    | --spacing-4  | 4px  |
| spacing/8    | --spacing-8  | 8px  |
| spacing/12   | --spacing-12 | 12px |
| spacing/16   | --spacing-16 | 16px |
| spacing/24   | --spacing-24 | 24px |
| spacing/32   | --spacing-32 | 32px |
| spacing/40   | --spacing-40 | 40px |
| spacing/48   | --spacing-48 | 48px |
| spacing/64   | --spacing-64 | 64px |

## 보더 반경 (Border Radius)

| Figma 변수명  | CSS Property    | 값     |
| ------------- | --------------- | ------ |
| radius/none   | --radius-none   | 0px    |
| radius/xs     | --radius-xs     | 2px    |
| radius/sm     | --radius-sm     | 4px    |
| radius/md     | --radius-md     | 8px    |
| radius/lg     | --radius-lg     | 12px   |
| radius/xl     | --radius-xl     | 16px   |
| radius/2xl    | --radius-2xl    | 24px   |
| radius/3xl    | --radius-3xl    | 32px   |
| radius/circle | --radius-circle | 9999px |

## 타이포그래피 — 폰트 크기

| Figma 변수명       | CSS Property   | 값   |
| ------------------ | -------------- | ---- |
| typography/size/12 | --font-size-12 | 12px |
| typography/size/13 | --font-size-13 | 13px |
| typography/size/14 | --font-size-14 | 14px |
| typography/size/16 | --font-size-16 | 16px |
| typography/size/18 | --font-size-18 | 18px |
| typography/size/20 | --font-size-20 | 20px |
| typography/size/24 | --font-size-24 | 24px |
| typography/size/32 | --font-size-32 | 32px |

## 타이포그래피 — 라인 높이

| Figma 변수명              | CSS Property     | 값   |
| ------------------------- | ---------------- | ---- |
| typography/line height/18 | --line-height-18 | 18px |
| typography/line height/20 | --line-height-20 | 20px |
| typography/line height/21 | --line-height-21 | 21px |
| typography/line height/24 | --line-height-24 | 24px |
| typography/line height/27 | --line-height-27 | 27px |
| typography/line height/30 | --line-height-30 | 30px |
| typography/line height/36 | --line-height-36 | 36px |
| typography/line height/48 | --line-height-48 | 48px |

## 타이포그래피 — 폰트 굵기

| Figma 변수명                   | CSS Property          | 값  |
| ------------------------------ | --------------------- | --- |
| typography/font weight/regular | --font-weight-regular | 400 |
| typography/font weight/medium  | --font-weight-medium  | 500 |
| typography/font weight/bold    | --font-weight-bold    | 700 |

## 타이포그래피 — 폰트 패밀리

| Figma 변수명                       | CSS Property       | 값                       |
| ---------------------------------- | ------------------ | ------------------------ |
| typography/font family/font family | --font-family-base | "Pretendard", sans-serif |

## 타이포그래피 — 시맨틱 크기 단축키

| Figma 변수명 | CSS Property   | 참조                | 값   | 용도             |
| ------------ | -------------- | ------------------- | ---- | ---------------- |
| size/caption | --size-caption | var(--font-size-13) | 13px | 캡션 대표 크기   |
| size/title   | --size-title   | var(--font-size-18) | 18px | 타이틀 대표 크기 |

## 타이포그래피 — 컴포지트 토큰

Figma에 정의된 복합 폰트 토큰입니다. CSS `font` 단축 속성으로 표현됩니다.
사용법: `font: var(--display-lg-bold);`

| Figma 변수명       | CSS Property         | size | weight | line-height |
| ------------------ | -------------------- | ---- | ------ | ----------- |
| display/lg/bold    | --display-lg-bold    | 32px | 700    | 48px        |
| display/lg/regular | --display-lg-regular | 32px | 400    | 48px        |
| display/sm/bold    | --display-sm-bold    | 24px | 700    | 36px        |
| display/sm/regular | --display-sm-regular | 24px | 400    | 36px        |
| title/lg/bold      | --title-lg-bold      | 20px | 700    | 30px        |
| title/lg/regular   | --title-lg-regular   | 20px | 400    | 30px        |
| title/sm/bold      | --title-sm-bold      | 18px | 700    | 27px        |
| title/sm/regular   | --title-sm-regular   | 18px | 400    | 27px        |
| body/lg/bold       | --body-lg-bold       | 16px | 700    | 24px        |
| body/lg/regular    | --body-lg-regular    | 16px | 400    | 24px        |
| body/sm/bold       | --body-sm-bold       | 14px | 700    | 21px        |
| body/sm/regular    | --body-sm-regular    | 14px | 400    | 21px        |
| caption/lg/bold    | --caption-lg-bold    | 13px | 700    | 20px        |
| caption/lg/medium  | --caption-lg-medium  | 13px | 500    | 20px        |
| caption/lg/regular | --caption-lg-regular | 13px | 400    | 20px        |
| caption/sm/bold    | --caption-sm-bold    | 12px | 700    | 18px        |
| caption/sm/medium  | --caption-sm-medium  | 12px | 500    | 18px        |
| caption/sm/regular | --caption-sm-regular | 12px | 400    | 18px        |

---

## Claude용 규칙

1. Figma MCP가 hex 색상 반환 → 이 테이블에서 찾아서 Semantic 토큰 우선 사용 (`var(--text-*)` / `var(--background-*)` / `var(--border-*)` 등)
2. Primitive 토큰(`var(--primitive-*)`)은 Semantic 토큰이 없을 때만 직접 사용
3. Figma가 스페이싱 숫자 반환 → `var(--spacing-*)` 매핑 (예: 16 → `var(--spacing-16)`)
4. 보더 반경은 `var(--radius-*)` 사용
5. 타이포그래피는 `var(--font-size-*)`, `var(--line-height-*)`, `var(--font-weight-*)` 조합
6. 테이블에 없는 값 → 새 변수 만들지 말고 `/* TODO: 누락된 토큰 */` 플래그
