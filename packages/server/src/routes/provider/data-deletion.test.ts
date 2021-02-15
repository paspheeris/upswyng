import "@testing-library/jest-dom";
import DataDeletion from "./data-deletion.svelte";
import { render } from "@testing-library/svelte";

test("data deletion screen renders without crashing", () => {
  const { getByText } = render(DataDeletion);
  expect(getByText(/Requesting Data Deletion/i)).toBeInTheDocument();
});
