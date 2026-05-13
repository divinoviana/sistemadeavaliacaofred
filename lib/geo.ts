// =====================================================================
// Utilitários de geolocalização para a frequência por GPS
// =====================================================================

export interface SchoolLocation {
  id: string;
  name: string;
  address?: string | null;
  latitude: number;
  longitude: number;
  radius_meters: number;
  updated_at?: string;
}

export interface CurrentPosition {
  latitude: number;
  longitude: number;
  accuracy_meters: number;
  timestamp: number;
}

/**
 * Calcula a distância (em metros) entre dois pontos usando a fórmula
 * de Haversine. Suficientemente preciso para distâncias até alguns km
 * (que é o caso de validação "está na escola").
 */
export function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000; // raio da Terra em metros
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Pede a posição atual do navegador. Retorna Promise que resolve
 * com a CurrentPosition ou rejeita com mensagem amigável em PT-BR.
 *
 * options:
 *   - highAccuracy: tenta usar GPS (mais lento, mais preciso). Default true.
 *   - timeoutMs: tempo máximo aguardando resposta. Default 15s.
 */
export function getCurrentPosition(options: { highAccuracy?: boolean; timeoutMs?: number } = {}): Promise<CurrentPosition> {
  const { highAccuracy = true, timeoutMs = 15000 } = options;
  return new Promise((resolve, reject) => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      reject(new Error('Seu navegador não suporta geolocalização.'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy_meters: pos.coords.accuracy,
          timestamp: pos.timestamp,
        });
      },
      (err) => {
        let msg = 'Não foi possível obter sua localização.';
        if (err.code === 1) msg = 'Permissão negada — autorize o uso da localização no seu navegador.';
        else if (err.code === 2) msg = 'Localização indisponível — verifique se o GPS/serviços de localização estão ligados.';
        else if (err.code === 3) msg = 'Tempo esgotado para detectar sua localização. Tente novamente.';
        reject(new Error(msg));
      },
      {
        enableHighAccuracy: highAccuracy,
        timeout: timeoutMs,
        maximumAge: 0,
      }
    );
  });
}

/** Formata uma distância em metros para "X m" ou "X.X km". */
export function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(2)} km`;
}

/**
 * Helper de UI: retorna uma classificação amigável da precisão GPS.
 *   < 30 m : excelente
 *   < 80 m : boa
 *   < 200 m: razoável
 *   resto  : baixa
 */
export function classifyAccuracy(accuracyMeters: number): { label: string; level: 'great' | 'good' | 'ok' | 'low' } {
  if (accuracyMeters < 30) return { label: 'Excelente', level: 'great' };
  if (accuracyMeters < 80) return { label: 'Boa', level: 'good' };
  if (accuracyMeters < 200) return { label: 'Razoável', level: 'ok' };
  return { label: 'Baixa', level: 'low' };
}
