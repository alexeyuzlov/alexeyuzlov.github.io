describe("App", function () {
    it("should sum correct", function () {
        expect(sum(2, 3)).toBe(5);
    });

    it("should say hello", function () {
        expect(greeting('Alexey')).toContain('Alexey');
    });
});
