export default function pad(value: string | number, size: number): string {
  let s = String(value)
  while (s.length < (size || 2)) {
    s = '0' + s
  }
  return s
}
