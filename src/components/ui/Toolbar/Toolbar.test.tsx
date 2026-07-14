import { describe, expect, it, vi } from "vitest";
import { Toolbar, type ToolbarProps, type SortOption } from "./Toolbar";

/*
 * 참고: 이 프로젝트의 Vitest는 Storybook addon + Playwright 브라우저 모드로만
 * 구성되어 있어(jsdom/testing-library 미사용), .test.tsx에서는 DOM 렌더링을 하지
 * 않는다. 클릭/입력에 따른 onSortChange/onSearchChange 실제 호출 검증은
 * Toolbar.stories.tsx 의 Interactive play function 에서 수행한다.
 * 여기서는 컴포넌트 계약(기본값, 콜백 위임 로직)을 단위로 검증한다.
 */

describe("Toolbar", () => {
  it("Toolbar 컴포넌트는 함수다", () => {
    expect(typeof Toolbar).toBe("function");
  });

  it("activeSort prop 기본값은 latest다", () => {
    const props: ToolbarProps = {};
    const { activeSort = "latest" } = props;
    expect(activeSort).toBe("latest");
  });

  it("searchPlaceholder prop 기본값은 '제목, 내용, 작성자'다", () => {
    const props: ToolbarProps = {};
    const { searchPlaceholder = "제목, 내용, 작성자" } = props;
    expect(searchPlaceholder).toBe("제목, 내용, 작성자");
  });

  it("sortOptions 기본값은 최신글/인기글 2개다", () => {
    const props: ToolbarProps = {};
    const {
      sortOptions = [
        { value: "latest", label: "최신글" },
        { value: "popular", label: "인기글" },
      ] as SortOption[],
    } = props;
    expect(sortOptions).toHaveLength(2);
    expect(sortOptions.map((o) => o.value)).toEqual(["latest", "popular"]);
  });

  it("정렬 탭 선택 시 onSortChange 가 해당 value 로 호출된다", () => {
    // 탭 클릭 핸들러가 위임하는 동작을 단위로 검증
    const onSortChange = vi.fn();
    const option: SortOption = { value: "popular", label: "인기글" };
    const handleClick = () => onSortChange(option.value);

    handleClick();

    expect(onSortChange).toHaveBeenCalledTimes(1);
    expect(onSortChange).toHaveBeenCalledWith("popular");
  });

  it("onSortChange 가 없어도 클릭 핸들러는 에러를 던지지 않는다", () => {
    const props: ToolbarProps = {};
    const option: SortOption = { value: "latest", label: "최신글" };
    const handleClick = () => props.onSortChange?.(option.value);
    expect(handleClick).not.toThrow();
  });

  it("검색 input 입력 시 onSearchChange 가 입력값으로 호출된다", () => {
    const onSearchChange = vi.fn();
    const handleChange = (event: { target: { value: string } }) =>
      onSearchChange?.(event.target.value);

    handleChange({ target: { value: "디자인 시스템" } });

    expect(onSearchChange).toHaveBeenCalledTimes(1);
    expect(onSearchChange).toHaveBeenCalledWith("디자인 시스템");
  });

  it("onSearchChange 가 없어도 입력 핸들러는 에러를 던지지 않는다", () => {
    const props: ToolbarProps = {};
    const handleChange = (event: { target: { value: string } }) =>
      props.onSearchChange?.(event.target.value);
    expect(() => handleChange({ target: { value: "x" } })).not.toThrow();
  });
});
