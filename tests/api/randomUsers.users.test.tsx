import handler from "../../pages/api/randomuser/users";

describe("/api/randomuser/users", () => {
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            results: [
              { login: { uuid: "123" }, name: { first: "A", last: "B" } },
            ],
          }),
      } as any)
    );
  });

  afterAll(() => {
    (global.fetch as jest.Mock).mockRestore();
  });

  it("returns list of users", async () => {
    const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await handler({ query: {} } as any, mockRes as any);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        results: expect.any(Array),
      })
    );
  });
});
