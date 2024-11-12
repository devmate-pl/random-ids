export default {
  saveConfig,
  loadConfig
}

function saveConfig(configuration) {
  const parsed = JSON.stringify(configuration)
  localStorage.setItem('random-ids-config', parsed)
}

function loadConfig() {
  try {
    if (localStorage.getItem('random-ids-config')) {
      return JSON.parse(localStorage.getItem('random-ids-config'))
    }
  } catch (e) {
    localStorage.removeItem('random-ids-config')
  }
  return null
}
