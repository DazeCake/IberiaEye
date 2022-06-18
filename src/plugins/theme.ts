export function load() {
  const theme = localStorage.getItem('theme') || 'cmyk'
  document.documentElement.setAttribute('data-theme', theme)
}
export function set(name: string) {
  localStorage.setItem('theme', name)
  document.documentElement.setAttribute('data-theme', name)
}
export function get() {
  return localStorage.getItem('theme')
}
