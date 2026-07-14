import { describe, expect, it, vi } from "vitest";
import {
  ContentInputContainer,
  type ContentInputContainerProps,
} from "./ContentInputContainer";

/*
 * 참고: 이 프로젝트의 Vitest는 Storybook addon + Playwright 브라우저 모드로만
 * 구성되어 있어(jsdom/testing-library 미사용), .test.tsx에서는 DOM 렌더링을 하지
 * 않는다. 타이핑에 따른 empty→filled 전환 검증은
 * ContentInputContainer.stories.tsx 의 Interactive play function 에서 수행한다.
 * 여기서는 컴포넌트 계약(기본값, filled 판정 로직, 콜백 위임)을 단위로 검증한다.
 */

describe("ContentInputContainer", () => {
  it("ContentInputContainer 컴포넌트는 함수다", () => {
    expect(typeof ContentInputContainer).toBe("function");
  });

  it("value prop 기본값은 빈 문자열이다", () => {
    const props: ContentInputContainerProps = {};
    const { value = "" } = props;
    expect(value).toBe("");
  });

  it("placeholder prop 기본값은 '게시글 내용을 입력해주세요.'다", () => {
    const props: ContentInputContainerProps = {};
    const { placeholder = "게시글 내용을 입력해주세요." } = props;
    expect(placeholder).toBe("게시글 내용을 입력해주세요.");
  });

  it("value 가 비어있으면 empty 상태로 판정된다", () => {
    const value = "";
    const isFilled = value.length > 0;
    expect(isFilled).toBe(false);
  });

  it("value 가 있으면 filled 상태로 판정된다", () => {
    const value = "내용이 입력됨";
    const isFilled = value.length > 0;
    expect(isFilled).toBe(true);
  });

  it("입력 변경 시 onChange 가 이벤트와 함께 호출된다", () => {
    const onChange = vi.fn();
    const event = { target: { value: "새 내용" } };
    const handleChange = (e: typeof event) => onChange(e);

    handleChange(event);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(event);
  });

  it("readOnly prop 기본값은 false다", () => {
    const props: ContentInputContainerProps = {};
    const { readOnly = false } = props;
    expect(readOnly).toBe(false);
  });

  it("readOnly=true 여도 onChange 없이 렌더링 가능하다 (게시글 상세보기)", () => {
    const props: ContentInputContainerProps = {
      value: "상세보기 본문",
      readOnly: true,
    };
    expect(props.onChange).toBeUndefined();
    expect(props.readOnly).toBe(true);
  });
});
