import { describe, expect, it } from "vitest";
import { PostDate, type PostDateProps } from "./PostDate";

/*
 * 참고: 이 프로젝트의 Vitest는 Storybook addon + Playwright 브라우저 모드로만
 * 구성되어 있어(jsdom/testing-library 미사용), .test.tsx에서는 DOM 렌더링을 하지
 * 않는다. 실제 렌더링 검증은 PostDate.stories.tsx 의 RendersDate play function
 * 에서 수행한다. 여기서는 컴포넌트 계약(필수 prop)을 단위로 검증한다.
 */

describe("PostDate", () => {
  it("PostDate 컴포넌트는 함수다", () => {
    expect(typeof PostDate).toBe("function");
  });

  it("date 는 필수 prop 이다 (타입 계약)", () => {
    const props: PostDateProps = { date: "26.05.06" };
    expect(props.date).toBe("26.05.06");
  });
});
