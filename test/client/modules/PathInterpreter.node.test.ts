import { PathInterpreter } from "@/client/modules/PathInterpreter";
import { describe, expect, it } from "vitest";

describe("PathInterpreter", () => {
  it("type for github://... is github", () => {
    const url = "github://dummyOwner.dummyRepo/dummyPath";
    expect(new PathInterpreter(url).type).toBe("github");
  });

  it("type for http://... is plain", () => {
    const url = "http://test.domain/dummyPath";
    expect(new PathInterpreter(url).type).toBe("plain");
  });

  it("type for https://... is plain", () => {
    const url = "https://test.domain/dummyPath";
    expect(new PathInterpreter(url).type).toBe("plain");
  });

  it("type for /... is plain", () => {
    const url = "/dummyPath";
    expect(new PathInterpreter(url).type).toBe("plain");
  });

  it("path of result for http://... is as http://...", () => {
    const url = "http://test.domain/dummyPath";
    expect(new PathInterpreter(url).result.path).toBe(url);
  });

  it("path of result for https://... is as http://...", () => {
    const url = "https://test.domain/dummyPath";
    expect(new PathInterpreter(url).result.path).toBe(url);
  });

  it("path of result for /... is as http://...", () => {
    const url = "/dummyPath";
    expect(new PathInterpreter(url).result.path).toBe(url);
  });

  it("path of result for github://... is as path part", () => {
    const url = "github://dummyOwner.dummyRepo/dummyPath";
    expect(new PathInterpreter(url).result.path).toBe("dummyPath");
  });

  it("owner of result for github://... is correct", () => {
    const url = "github://dummyOwner.dummyRepo/dummyPath";
    expect(new PathInterpreter(url).result).toHaveProperty(
      "owner",
      "dummyOwner",
    );
  });

  it("repo of result for github://... is correct", () => {
    const url = "github://dummyOwner.dummyRepo/dummyPath";
    expect(new PathInterpreter(url).result).toHaveProperty("repo", "dummyRepo");
  });
});
