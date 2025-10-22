import handler from "../../pages/api/randomuser/profile";

describe("/api/randomuser/profile", () => {
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            results: [{ name: { first: "Jane" } }],
          }),
      } as any)
    );
  });

  afterAll(() => {
    (global.fetch as jest.Mock).mockRestore();
  });

  it("returns one user profile", async () => {
    const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await handler({} as any, mockRes as any);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        results: expect.any(Array),
      })
    );
  });
});
