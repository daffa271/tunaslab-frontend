// This service only creates an in-dashboard preview. Real delivery belongs on a secure backend.
export function createHarvestNotification(cycle, seed, triggeredAt) {
  return {
    id: `${cycle.startedAt}-${cycle.selectedSeedId}`,
    seedName: seed.name,
    triggeredAt,
    title: 'TunasLab — Pengingat Panen',
    message: `Halo! Tanaman ${seed.name} Anda telah mencapai estimasi waktu panen. Silakan periksa kondisi tanaman dan lakukan pemanenan secara manual apabila sudah siap.`,
  }
}
