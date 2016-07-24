describe("基本测试", function() {
  var a;
  it("toBe", function() {
    a = true;
    expect(a).toBe(true);
  });
  it("notToBe", function() {
    a = true;
    expect(a).not.toBe(false);
  });
  it("toBe", function() {
    a = null;
    expect(a).toBe(null);
  });
});