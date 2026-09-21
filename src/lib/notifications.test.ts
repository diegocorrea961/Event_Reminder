import { describe, expect, it } from "vitest";
import { resolveNotifications } from "./notifications";

describe("resolveNotifications", () => {
  it("não envia nem supera nada quando o evento já passou", () => {
    expect(resolveNotifications(-1, [])).toEqual({
      toSend: null,
      toSupersede: [],
    });
  });

  it("não envia nem supera nada quando faltam mais de 7 dias", () => {
    expect(resolveNotifications(10, [])).toEqual({
      toSend: null,
      toSupersede: [],
    });
  });

  it("envia só 7_dias quando faltam exatamente 7 dias, nada a superar", () => {
    expect(resolveNotifications(7, [])).toEqual({
      toSend: "7_dias",
      toSupersede: [],
    });
  });

  it("envia 1_dia e supera 7_dias quando falta 1 dia e nada foi enviado", () => {
    expect(resolveNotifications(1, [])).toEqual({
      toSend: "1_dia",
      toSupersede: ["7_dias"],
    });
  });

  it("envia no_dia e supera 7_dias e 1_dia quando o evento é hoje e nada foi enviado", () => {
    expect(resolveNotifications(0, [])).toEqual({
      toSend: "no_dia",
      toSupersede: ["7_dias", "1_dia"],
    });
  });

  it("exclui tipos já enviados da decisão", () => {
    const existing = [{ type: "1_dia", sent: true }];
    expect(resolveNotifications(0, existing)).toEqual({
      toSend: "no_dia",
      toSupersede: ["7_dias"],
    });
  });

  it("não exclui um tipo que existe mas ainda não foi enviado (retry)", () => {
    const existing = [{ type: "1_dia", sent: false }];
    expect(resolveNotifications(1, existing)).toEqual({
      toSend: "1_dia",
      toSupersede: ["7_dias"],
    });
  });

  it("caso do bug real: no_dia já enviado, não envia mais nada e apenas supera o que restou pendente", () => {
    const existing = [{ type: "no_dia", sent: true }];
    expect(resolveNotifications(0, existing)).toEqual({
      toSend: null,
      toSupersede: ["7_dias", "1_dia"],
    });
  });
});
