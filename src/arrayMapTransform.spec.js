import transform from "./";

describe("arrayMapTransform", () => {
  it("transform a one level array to a map", () => {
    const array = [{ id: 1 }, { id: 2 }];

    const result = transform(array);

    expect(result).toEqual({ 0: { id: 1 }, 1: { id: 2 } });
  });

  it("returns untransformable values", () => {
    const array = "2";

    const result = transform(array);

    expect(result).toEqual("2");
  });

  it("accepts option to use object value as map id", () => {
    const array = [{ id: 1 }, { id: 2 }];
    const option = { defaultKey: "id" };

    const result = transform(array, option);

    expect(result).toEqual({ 1: { id: 1 }, 2: { id: 2 } });
  });

  it("finds sub arrays and transforms them", () => {
    const array = [{ id: 1, sub: [{ id: "a1" }] }];

    const result = transform(array);

    expect(result).toEqual({
      0: { id: 1, sub: { 0: { id: "a1" } } }
    });
  });

  it("sub maps correctly handled", () => {
    const array = [{ id: 1, subMap: { mId: "mID" } }];

    const result = transform(array);

    expect(result).toEqual({ 0: { id: 1, subMap: { mId: "mID" } } });
  });

  it("sub arrays are not only handled when recursively is false", () => {
    const array = [{ id: 1, subArray: [{ mId: "mID" }] }];
    const option = { recursively: false };

    const result = transform(array, option);

    expect(result).toEqual({ 0: { id: 1, subArray: [{ mId: "mID" }] } });
  });

  it("id option can be given as a map with a default option", () => {
    const array = [{ id: 1, subArray: [{ mId: "mID" }] }];
    const option = { defaultKey: { default: "id" }, recursively: false };

    const result = transform(array, option);

    expect(result).toEqual({ 1: { id: 1, subArray: [{ mId: "mID" }] } });
  });

  it("id is set as the given value in id map", () => {
    const array = [{ id: 1, subArray: [{ mId: "testId" }] }];
    const option = { defaultKey: { default: "id", subArray: "mId" } };

    const result = transform(array, option);

    expect(result).toEqual({
      1: { id: 1, subArray: { testId: { mId: "testId" } } }
    });
  });

  it("accepts ignore pattern for keys to not be transformed", () => {
    const array = [{ id: 1, subArray: [{ mId: "testId" }] }];
    const option = { ignorePattern: "subArray" };

    const result = transform(array, option);

    expect(result).toEqual({
      0: { id: 1, subArray: [{ mId: "testId" }] }
    });
  });

  it("handles partial ignore pattern matching", () => {
    const array = [{ id: 1, subArray: [{ mId: "testId" }] }];
    const option = { ignorePattern: "Array" };

    const result = transform(array, option);

    expect(result).toEqual({
      0: { id: 1, subArray: [{ mId: "testId" }] }
    });
  });
});
