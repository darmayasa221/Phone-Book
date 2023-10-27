import concatWhiteSpace from "../concatWhiteSpace";
describe("concatWhiteSpace", () => {
  it("should concat string and put the white space", () => {
    // arrange
    const result: string = "test test2";
    const strings: Array<string> = ["test", "test2"];
    // action
    const expected = concatWhiteSpace(...strings);
    // assert
    expect(expected).toEqual(result);
  });
});
