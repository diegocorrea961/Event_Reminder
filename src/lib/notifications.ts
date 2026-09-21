export const NOTIFICATION_THRESHOLDS: { type: string; maxDays: number }[] = [
  { type: "7_dias", maxDays: 7 },
  { type: "1_dia", maxDays: 1 },
  { type: "no_dia", maxDays: 0 },
];

export function resolveNotifications(
  daysRemaining: number,
  existingNotifications: { type: string; sent: boolean }[],
): { toSend: string | null; toSupersede: string[] } {
  if (daysRemaining < 0) return { toSend: null, toSupersede: [] };

  const sentMaxDays = NOTIFICATION_THRESHOLDS.filter(({ type }) =>
    existingNotifications.some((n) => n.type === type && n.sent),
  ).map(({ maxDays }) => maxDays);
  const minHandled = sentMaxDays.length > 0 ? Math.min(...sentMaxDays) : Infinity;

  const eligibleUnsent = NOTIFICATION_THRESHOLDS.filter(
    ({ maxDays }) => daysRemaining <= maxDays,
  ).filter(({ type }) => {
    const existing = existingNotifications.find((n) => n.type === type);
    return !existing?.sent;
  });

  const stillRelevant = eligibleUnsent.filter(
    ({ maxDays }) => maxDays < minHandled,
  );

  const toSend =
    stillRelevant.length > 0
      ? stillRelevant.reduce((a, b) => (a.maxDays < b.maxDays ? a : b)).type
      : null;

  const toSupersede = eligibleUnsent
    .filter((t) => t.type !== toSend)
    .map((t) => t.type);

  return { toSend, toSupersede };
}
