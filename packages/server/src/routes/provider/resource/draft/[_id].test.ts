import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/svelte";
import Comp from "./[_id].svelte";

jest.mock("@sapper/app", () => ({
  goto: jest.fn(),
  stores: () => ({ session: null }),
}));

// jest.mock("stores", () => ( {
//   session: null,
// } ))

test("shows proper heading when rendered", () => {
  // const { getByText } = render(Comp, {
  //   draftResource: null,
  //   existingResource: null,
  //   isAdmin: false,
  // });

  const { getByText } = render(Comp, {
    draftResource: {},
    existingResource: null,
    isAdmin: false,
  });

  expect(getByText("Hello World!")).toBeInTheDocument();
  expect(getByText("Hello World!")).toBeInTheDocument();
});
