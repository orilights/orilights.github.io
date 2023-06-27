export function initAnalytics() {
  if (process.env.NODE_ENV !== 'production')
    return
  const el = document.createElement('script')
  el.async = true
  el.setAttribute('data-website-id', 'c2ca99a1-28d0-4303-b24b-7b3f21db02a8')
  el.src = 'https://analytics.amarea.cn/script.js'
  document.head.appendChild(el)
}
