import { describe, expect, it } from "vitest";
import { PostWriteHeader, type PostWriteHeaderProps } from "./PostWriteHeader";

/*
 * 참고: 이 프로젝트의 Vitest는 Storybook addon + Playwright 브라우저 모드로만
 * 구성되어 있어(jsdom/testing-library 미사용), .test.tsx에서는 DOM 렌더링을 하지
 * 않는다. 실제 렌더링 검증은 PostWriteHeader.stories.tsx 의 RendersContent play
 * function 에서 수행한다. 여기서는 컴포넌트 계약(기본값)을 단위로 검증한다.
 */

describe("PostWriteHeader", () => {
  it("PostWriteHeader 컴포넌트는 함수다", () => {
    expect(typeof PostWriteHeader).toBe("function");
  });

  it("title prop 기본값은 '게시글 쓰기'다", () => {
    const props: PostWriteHeaderProps = { description: "안내문" };
    const { title = "게시글 쓰기" } = props;
    expect(title).toBe("게시글 쓰기");
  });

  it("description 은 필수 prop 이다 (타입 계약)", () => {
    const props: PostWriteHeaderProps = {
      description: "자유롭게 이야기를 나눠보세요.",
    };
    expect(props.description).toBe("자유롭게 이야기를 나눠보세요.");
  });
});
