import FavoriteResources from "../FavoriteResources";
import React from "react";
import { render } from "@testing-library/react";

jest.mock("../ResourceList", () => () => (
  <div data-test="TEST-resource-list" />
));
jest.mock("../PageBanner", () => () => "PageBanner");

describe("<FavoriteResources/>", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  const setup = () => {
    return render(<FavoriteResources />);
  };

  it("shows the alert text if the user has no favorites", () => {
    const { getByText } = setup();
    const alertText = /You haven't added any favorites yet!/i;
    expect(getByText(alertText)).toBeInTheDocument();
  });

  it("doesn't show the alert text if the user has favorites", () => {
    window.localStorage.setItem(
      "favoriteResources",
      JSON.stringify(["resourceId"])
    );

    const { queryByText } = setup();
    const alertText = /You haven't added any favorites yet!/i;
    expect(queryByText(alertText)).toBeNull();
  });

  it("shows the ResourceList if the user has favorited resources", () => {
    window.localStorage.setItem(
      "favoriteResources",
      JSON.stringify(["resourceId"])
    );

    const { getByTestId } = setup();
    expect(getByTestId("TEST-resource-list")).toBeInTheDocument();
  });
});
