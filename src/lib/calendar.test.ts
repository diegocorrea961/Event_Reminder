import { describe, expect, it } from "vitest";
import { getCalendarCells } from "./calendar";

describe("getCalendarCells", () => {
  it("sempre retorna uma grade fixa de 42 células (6 semanas)", () => {
    expect(getCalendarCells(2026, 8)).toHaveLength(42); // setembro, cabe em 5 semanas
    expect(getCalendarCells(2026, 7)).toHaveLength(42); // agosto, precisa de 6 semanas
  });

  it("monta setembro/2026 (começa numa terça, 30 dias)", () => {
    const cells = getCalendarCells(2026, 8); // mês 8 = setembro (0-indexed)

    // Setembro/2026 começa numa terça-feira (índice 2 no getDay: DOM=0, SEG=1, TER=2)
    expect(cells[0]).toBeNull();
    expect(cells[1]).toBeNull();
    expect(cells[2]).toBe(1);
    expect(cells[31]).toBe(30);
    expect(cells[32]).toBeNull();

    const days = cells.filter((c) => c !== null);
    expect(days).toHaveLength(30);
  });

  it("monta agosto/2026 (começa num sábado, precisa de 6 semanas)", () => {
    const cells = getCalendarCells(2026, 7);

    expect(cells[6]).toBe(1);
    expect(cells[36]).toBe(31);
    expect(cells[37]).toBeNull();

    const days = cells.filter((c) => c !== null);
    expect(days).toHaveLength(31);
  });

  it("considera fevereiro bissexto com 29 dias", () => {
    const cells = getCalendarCells(2028, 1); // 2028 é bissexto
    const days = cells.filter((c) => c !== null);
    expect(days).toHaveLength(29);
  });

  it("considera fevereiro não-bissexto com 28 dias", () => {
    const cells = getCalendarCells(2026, 1);
    const days = cells.filter((c) => c !== null);
    expect(days).toHaveLength(28);
  });
});
