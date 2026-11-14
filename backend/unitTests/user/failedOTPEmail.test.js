const ProcessMessages = require("../../authentication/processFailedOTPEmail/processMessages");
const EmailDB = require("../../utils/emailDB");

function mockDbService(item) {
  return {
    putItem: jest.fn().mockResolvedValue({}),
    getItem: jest.fn().mockResolvedValue({ Item: item }),
  };
}

const bounce = (bounceType, ...emails) => ({
  bounce: {
    bounceType,
    bouncedRecipients: emails.map((emailAddress) => ({ emailAddress })),
  },
});
const complaint = (...emails) => ({
  complaint: {
    complainedRecipients: emails.map((emailAddress) => ({ emailAddress })),
  },
});

describe("processFailedOTPEmail", () => {
  beforeEach(() => jest.spyOn(console, "log").mockImplementation(() => {}));
  afterEach(() => jest.restoreAllMocks());

  it("records a permanent bounce in its own item, never the user row", async () => {
    const db = mockDbService();
    await new ProcessMessages(new EmailDB(db)).process([
      bounce("Permanent", "a@example.com", "b@example.com"),
    ]);

    expect(db.putItem).toHaveBeenCalledTimes(2);
    for (const [row] of db.putItem.mock.calls) {
      expect(row.SK).toBe("emailStatus");
      expect(row.SK).not.toBe(row.PK);
      expect(row.failedReason).toBe("bounce-Permanent");
      expect(row.updatedAt).toEqual(expect.any(String));
    }
    expect(db.putItem.mock.calls.map(([row]) => row.PK)).toEqual([
      "a@example.com",
      "b@example.com",
    ]);
  });

  it.each(["Transient", "Undetermined"])(
    "doesn't block on a %s bounce",
    async (bounceType) => {
      const db = mockDbService();
      await new ProcessMessages(new EmailDB(db)).process([
        bounce(bounceType, "a@example.com"),
      ]);
      expect(db.putItem).not.toHaveBeenCalled();
    },
  );

  it("doesn't block on a complaint", async () => {
    const db = mockDbService();
    await new ProcessMessages(new EmailDB(db)).process([
      complaint("a@example.com"),
    ]);
    expect(db.putItem).not.toHaveBeenCalled();
  });

  it("rejects an unknown notification type", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    const db = mockDbService();
    await expect(
      new ProcessMessages(new EmailDB(db)).process([{ delivery: {} }]),
    ).rejects.toThrow();
  });
});

describe("EmailDB.verifyEmailAddress", () => {
  it("allows an address with no status item", async () => {
    const db = mockDbService(undefined);
    expect(await new EmailDB(db).verifyEmailAddress("a@example.com")).toBe(
      true,
    );
    expect(db.getItem).toHaveBeenCalledWith({
      PK: "a@example.com",
      SK: "emailStatus",
    });
  });

  it("blocks an address recorded as failed", async () => {
    const db = mockDbService({ failedReason: "bounce-Permanent" });
    expect(await new EmailDB(db).verifyEmailAddress("a@example.com")).toBe(
      false,
    );
  });
});
