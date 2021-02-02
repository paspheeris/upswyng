// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
// import { goto, stores } from "@sapper/app";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/svelte";
import Comp from "./[_id].svelte";

// jest.mock("@sapper/app", () => ({
//   goto: jest.fn(),
//   stores: jest.fn(),
// }));

test("shows proper heading when rendered", () => {
  // const { getByText } = render(Comp, {
  //   draftResource: null,
  //   existingResource: null,
  //   isAdmin: false,
  // });

  const foo = render(Comp, {
    draftResource: null,
    existingResource: null,
    isAdmin: false,
  });
  console.log({ foo });
  const { getByText } = foo;

  expect(1).toBe(2);
  // expect(getByText('Hello World!')).toBeInTheDocument()
});

// Note: This is as an async test as we are using `fireEvent`
test("changes button text on click", async () => {
  const { getByText } = render(Comp, { name: "World" });
  const button = getByText("Button");

  // Using await when firing events is unique to the svelte testing library because
  // we have to wait for the next `tick` so that Svelte flushes all pending state changes.
  await fireEvent.click(button);

  // expect(button).toHaveTextContent('Button Clicked')
});
