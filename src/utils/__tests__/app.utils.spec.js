import { appUtils } from "../app.utils";

describe(`commanumbers`, () => {
  it(`should commalize a number`, () => {
    expect(appUtils.commanumbers(5000)).toEqual("5,000");
  });
});

describe(`Intersect array`, () => {
  const stateData = [{ id: 1, name: "Awesome" }, { id: 2, name: "Awesome 2" }];
  const responseData = [
    { id: 2, name: "Awesome 2" },
    { id: 3, name: "Awesome 3" }
  ];
  it(`should return common items in an array`, () => {
    expect(
      appUtils.intersect(stateData, responseData, [
        elem => elem.id,
        elem => elem.id
      ])
    ).toEqual([{ id: 2, name: "Awesome 2" }]);
  });

  it(`should return uncommon items in an array`, () => {
    expect(
      appUtils.intersect(
        stateData,
        responseData,
        [elem => elem.id, elem => elem.id],
        true
      )
    ).toEqual([{ id: 1, name: "Awesome" }]);
  });
});
