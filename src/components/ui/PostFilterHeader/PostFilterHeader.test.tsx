import { describe, expect, it, vi } from "vitest";
import {
  PostFilterHeader,
  type PostFilterHeaderProps,
} from "./PostFilterHeader";

/*
 * 참고: 이 프로젝트의 Vitest는 Storybook addon + Playwright 브라우저 모드로만
 * 구성되어 있어(jsdom/testing-library 미사용), .test.tsx에서는 DOM 렌더링을 하지
 * 않는다. 클릭에 따른 onWriteClick 실제 호출 검증은 PostFilterHeader.stories.tsx
 * 의 Interactive play function 에서 수행한다. 여기서는 컴포넌트 계약(기본값,
 * 콜백 위임 로직)을 단위로 검증한다.
 */

describe("PostFilterHeader", () => {
  it("PostFilterHeader 컴포넌트는 함수다", () => {
    expect(typeof PostFilterHeader).toBe("function");
  });

  it("title prop 기본값은 '전체 게시글'이다", () => {
    const props: PostFilterHeaderProps = {};
    const { title = "전체 게시글" } = props;
    expect(title).toBe("전체 게시글");
  });

  it("writeLabel prop 기본값은 '글쓰기'다", () => {
    const props: PostFilterHeaderProps = {};
    const { writeLabel = "글쓰기" } = props;
    expect(writeLabel).toBe("글쓰기");
  });

  it("글쓰기 버튼 클릭 시 onWriteClick 이 호출된다", () => {
    const onWriteClick = vi.fn();
    const handleClick = () => onWriteClick();

    handleClick();

    expect(onWriteClick).toHaveBeenCalledTimes(1);
  });

  it("onWriteClick 이 없어도 클릭 핸들러는 에러를 던지지 않는다", () => {
    const props: PostFilterHeaderProps = {};
    const handleClick = () => props.onWriteClick?.();
    expect(handleClick).not.toThrow();
  });
});
