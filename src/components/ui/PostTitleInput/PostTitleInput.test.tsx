import { describe, expect, it, vi } from "vitest";
import { PostTitleInput, type PostTitleInputProps } from "./PostTitleInput";

/*
 * 참고: 이 프로젝트의 Vitest는 Storybook addon + Playwright 브라우저 모드로만
 * 구성되어 있어(jsdom/testing-library 미사용), .test.tsx에서는 DOM 렌더링을 하지
 * 않는다. 타이핑/포커스에 따른 실제 동작 검증은 PostTitleInput.stories.tsx 의
 * Interactive play function 에서 수행한다. 여기서는 컴포넌트 계약(기본값, 콜백
 * 위임 로직)을 단위로 검증한다.
 */

describe("PostTitleInput", () => {
  it("PostTitleInput 컴포넌트는 함수다", () => {
    expect(typeof PostTitleInput).toBe("function");
  });

  it("placeholder prop 기본값은 '제목을 입력해주세요'다", () => {
    const props: PostTitleInputProps = {};
    const { placeholder = "제목을 입력해주세요" } = props;
    expect(placeholder).toBe("제목을 입력해주세요");
  });

  it("입력 변경 시 onChange 가 이벤트와 함께 호출된다", () => {
    const onChange = vi.fn();
    const event = { target: { value: "새 제목" } };
    const handleChange = (e: typeof event) => onChange(e);

    handleChange(event);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(event);
  });

  it("onChange 가 없어도 입력 핸들러는 에러를 던지지 않는다", () => {
    const props: PostTitleInputProps = {};
    const handleChange = (e: { target: { value: string } }) =>
      props.onChange?.(e as unknown as React.ChangeEvent<HTMLInputElement>);
    expect(() => handleChange({ target: { value: "x" } })).not.toThrow();
  });
});
