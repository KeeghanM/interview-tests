const responseDelayMsByServiceId: Record<string, number> = {
  billing: 900,
  checkout: 500,
  search: 100,
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function simulateServiceLatency(
  serviceId: string,
): Promise<void> {
  await delay(responseDelayMsByServiceId[serviceId] ?? 100)
}
