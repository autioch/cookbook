/** A Polish name as a URL path segment: "czerwona porzeczka" → "czerwona-porzeczka", "mięta" → "mieta". */
export function slug(name: string): string {
  return name
    .toLowerCase()
    .replaceAll('ł', 'l')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
