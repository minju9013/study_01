---
name: icon-component
description: Icon 컴포넌트 구현 현황 — 19종 아이콘, SVG inline 방식, Figma node-id 781:5290
metadata:
  type: project
---

## 구현 위치

`src/components/ui/Icon/` (4파일 세트)

## 지원 아이콘 (19종)

iconview, arrow-left, arrow-right, user, ai, dog, eye-on, eye-off, design, menu, notification, close, search, message, heart-empty, heart-fill, check, pencil, google

## Props

- `name: IconName` (필수)
- `size?: number` (기본값: 16)
- `color?: string` (기본값: "currentColor")
- `className?: string`
- `aria-label?: string`
- `title?: string`

## 주요 결정 사항

- `heart-fill`만 fill 방식, 나머지는 stroke 방식
- `google` 아이콘: 원래 다색(4종 브랜드 컬러)이나 프로젝트 토큰에 노랑/초록이 없어 단색(color prop) 처리로 변경
- `iconview`는 점선 사각형(placeholder) 아이콘
- `arrow-right`는 `arrow-left`와 동일 viewBox + path를 수평 반전한 별도 path

**Why:** 프로젝트 토큰에 Google 브랜드 컬러(FFC107 노랑, 43A047 초록)가 없어 hex 하드코딩 불가.

**How to apply:** google 아이콘 사용 시 다색 표현이 필요하면 별도 토큰 추가 후 재작업 필요.
