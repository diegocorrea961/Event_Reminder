import { describe, expect, it } from "vitest";
import { daysUntil, isSameUTCMonth } from "./dates";

describe("daysUntil", () => {
  it("retorna 0 quando o evento é hoje", () => {
    const now = new Date("2026-09-20T15:00:00.000Z");
    const event = new Date("2026-09-20T00:00:00.000Z");
    expect(daysUntil(event, now)).toBe(0);
  });

  it("retorna 1 quando o evento é amanhã", () => {
    const now = new Date("2026-09-20T00:00:00.000Z");
    const event = new Date("2026-09-21T00:00:00.000Z");
    expect(daysUntil(event, now)).toBe(1);
  });

  it("retorna negativo quando o evento já passou", () => {
    const now = new Date("2026-09-20T00:00:00.000Z");
    const event = new Date("2026-09-18T00:00:00.000Z");
    expect(daysUntil(event, now)).toBe(-2);
  });

  it("calcula corretamente na virada de ano", () => {
    const now = new Date("2026-12-31T00:00:00.000Z");
    const event = new Date("2027-01-01T00:00:00.000Z");
    expect(daysUntil(event, now)).toBe(1);
  });

  it("ignora o horário, considerando só o dia em UTC", () => {
    const now = new Date("2026-09-20T23:59:00.000Z");
    const event = new Date("2026-09-21T00:01:00.000Z");
    expect(daysUntil(event, now)).toBe(1);
  });
});

describe("isSameUTCMonth", () => {
  it("retorna true quando ano e mês batem", () => {
    const event = new Date("2026-09-15T00:00:00.000Z");
    expect(isSameUTCMonth(event, 2026, 8)).toBe(true);
  });

  it("retorna false quando o mês é diferente", () => {
    const event = new Date("2026-09-15T00:00:00.000Z");
    expect(isSameUTCMonth(event, 2026, 9)).toBe(false);
  });

  it("retorna false quando o ano é diferente", () => {
    const event = new Date("2026-09-15T00:00:00.000Z");
    expect(isSameUTCMonth(event, 2027, 8)).toBe(false);
  });
});
