import { describe, it } from "mocha";
import { expect } from "chai";
import { PathInterpreter } from "../../../src/client/modules/PathInterpreter";

describe("PathInterpreter", () => {
  it("type for github://... is github", () => {
    const url = "github://dummyOwner.dummyRepo/dummyPath";
    expect(new PathInterpreter(url).type).to.equals("github");
  });

  it("type for http://... is plain", () => {
    const url = "http://test.domain/dummyPath";
    expect(new PathInterpreter(url).type).to.equals("plain");
  });

  it("type for https://... is plain", () => {
    const url = "https://test.domain/dummyPath";
    expect(new PathInterpreter(url).type).to.equals("plain");
  });

  it("type for /... is plain", () => {
    const url = "/dummyPath";
    expect(new PathInterpreter(url).type).to.equals("plain");
  });

  it("path of result for http://... is as http://...", () => {
    const url = "http://test.domain/dummyPath";
    expect(new PathInterpreter(url).result.path).to.equals(url);
  });

  it("path of result for https://... is as http://...", () => {
    const url = "https://test.domain/dummyPath";
    expect(new PathInterpreter(url).result.path).to.equals(url);
  });

  it("path of result for /... is as http://...", () => {
    const url = "/dummyPath";
    expect(new PathInterpreter(url).result.path).to.equals(url);
  });

  it("path of result for github://... is as path part", () => {
    const url = "github://dummyOwner.dummyRepo/dummyPath";
    expect(new PathInterpreter(url).result.path).to.equals("dummyPath");
  });

  it("owner of result for github://... is correct", () => {
    const url = "github://dummyOwner.dummyRepo/dummyPath";
    expect(new PathInterpreter(url).result.owner).to.equals("dummyOwner");
  });

  it("repo of result for github://... is correct", () => {
    const url = "github://dummyOwner.dummyRepo/dummyPath";
    expect(new PathInterpreter(url).result.repo).to.equals("dummyRepo");
  });
});
