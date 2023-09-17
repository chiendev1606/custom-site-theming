const toggles = document.querySelectorAll('.toggle [type="checkbox"]')
const radios = document.querySelectorAll('.radio [type="radio"]')
const doc = document.documentElement
const soundCheck = document.getElementById('sound-check')
const soundToggle = document.getElementById('sound-toggle')

let playingSound

const defaultValue = [
  {
    name: 'sound',
    value: 'false'
  },
  {
    name: 'theme',
    value: 'system'
  },
  {
    name: 'motion',
    value: 'false'
  },
  {
    name: 'round',
    value: 'false'
  },
  {
    name: 'accent',
    value: 'primary'
  }
]

const updateSettingsUI = ({ value, name }) => {
  if (value === 'false' || value === 'true') {
    if (name === 'sound') playingSound = value === 'true' ? true : false
    return (document.querySelector(`[name="${name}"]`).checked = value === 'true' ? true : false)
  }
  return document.getElementById(`${value}`)?.setAttribute('checked', true)
}

window.addEventListener('DOMContentLoaded', () => {
  defaultValue.forEach((item) => {
    const value = localStorage.getItem(item.name) || item.value
    updateSettingsUI({ name: item.name, value })
  })
})

const playSound = (type) => {
  if (!playingSound) return
  if (type === 'radio') {
    soundCheck.play()
  } else {
    soundToggle.play()
  }
}

const updateSiteUi = ({ name, value }) => {
  if (name === 'sound') {
    playingSound = value
  }
  if (name === 'accent') {
    return doc.style.setProperty('--custom-color', `var(--${value})`)
  }
  doc.dataset[name] = value
}

toggles.forEach((toggle) => {
  toggle.addEventListener('change', (e) => {
    const { name, checked, type } = e.target
    updateSiteUi({ name, value: checked })
    playSound(type)
    localStorage.setItem(name, checked)
  })
})

radios.forEach((radio) => {
  radio.addEventListener('change', (e) => {
    const { id, name, type } = e.target
    updateSiteUi({ name, value: id })
    playSound(type)
    localStorage.setItem(name, id)
  })
})
