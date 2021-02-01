import { fireEvent, render } from "@testing-library/react";

import FavoriteResourcesFAB from "../FavoriteResourceFAB";
import React from "react";
import { mockResources } from "../../data-mocks";

describe("<FavoriteResourcesFAB/>", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  const setup = (resourceId: string) => {
    return render(<FavoriteResourcesFAB resourceId={resourceId} />);
    /* return { getByText: null }; */
  };

  const getFromLocalStorage = () => {
    const value = window.localStorage.getItem("favoriteResources");
    return value ? JSON.parse(value) : null;
  };

  it("shows correct icon", () => {
    const { getByLabelText, queryByLabelText } = setup(
      mockResources[0].resourceId
    );

    // Starting state
    expect(getByLabelText("favorite")).toBeInTheDocument();
    expect(queryByLabelText("unfavorite")).toBeNull();

    // Click favorite icon
    fireEvent.click(getByLabelText("favorite"));
    expect(getByLabelText("unfavorite")).toBeInTheDocument();
    expect(queryByLabelText("favorite")).toBeNull();

    // Unfavorite
    fireEvent.click(getByLabelText("unfavorite"));
    expect(getByLabelText("favorite")).toBeInTheDocument();
    expect(queryByLabelText("unfavorite")).toBeNull();
  });

  it(`clicking favorite icon adds item to array in localStorage under "favoriteResources" key`, () => {
    const { resourceId } = mockResources[0];
    const { getByLabelText } = setup(resourceId);

    fireEvent.click(getByLabelText("favorite"));
    expect(getFromLocalStorage()).toEqual([resourceId]);
  });

  it(`clicking unfavorite icon removes item from array in localStorage under "favoriteResources" key`, () => {
    const resourceIds = mockResources.map(resource => resource.resourceId);
    window.localStorage.setItem(
      "favoriteResources",
      JSON.stringify(resourceIds)
    );

    const { resourceId } = mockResources[0];
    const { getByLabelText } = setup(resourceId);

    // resourceId is in localStorage
    let favoriteResources: Array<string> = getFromLocalStorage();
    expect(favoriteResources.includes(resourceId)).toBe(true);
    // Click unfavorite
    fireEvent.click(getByLabelText("unfavorite"));
    // resourceId is not in localStorage
    favoriteResources = getFromLocalStorage();
    expect(favoriteResources.includes(resourceId)).toBe(false);
  });

  it("alert is shown the first time user favorites a resource", () => {
    const { resourceId } = mockResources[0];
    const { getByText, queryByText, getByLabelText } = setup(resourceId);

    const alertText = /Favorites are only saved to this device/i;
    expect(queryByText(alertText)).toBeNull();
    fireEvent.click(getByLabelText("favorite"));
    expect(getByText(alertText)).toBeInTheDocument();
  });

  it("alert is not shown if user has favorited a resource before", () => {
    window.localStorage.setItem(
      "favoriteResources",
      JSON.stringify(["resourceId"])
    );

    const { resourceId } = mockResources[0];
    const { queryByText, getByLabelText } = setup(resourceId);

    const alertText = /Favorites are only saved to this device/i;
    fireEvent.click(getByLabelText("favorite"));
    expect(queryByText(alertText)).toBeNull();
  });
});
