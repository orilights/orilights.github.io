export function getSiteConfig() {
  return axios.get('/config.json')
}

export function getPlaylist(server: string, id: string) {
  return axios.get(`https://api.amarea.cn/meting/?server=${server}&type=playlist&id=${id}`)
}
