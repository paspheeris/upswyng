import { act, renderHook } from "@testing-library/react-hooks";
import { mockResources } from "../../data-mocks";
import useLocalStorage from "../useLocalStorage";

describe("useLocalStorage", () => {
  it("returns null when nothing has been stored for key", () => {
    const { result } = renderHook(() => useLocalStorage("key"));
    const [value] = result.current;
    expect(value).toEqual(null);
  });

  it("stores and returns objects", () => {
    const { result } = renderHook(() => useLocalStorage("resource"));

    const resource = mockResources[0];

    expect(result.current[0]).toEqual(null);
    act(() => {
      // setValue()
      result.current[1](resource);
    });
    expect(result.current[0]).toEqual(resource);
  });
});
