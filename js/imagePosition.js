const eventsMap = {
  desktop: { start: 'onmousedown', move: 'onmousemove', end: 'onmouseup' },
  mobile: { start: 'ontouchstart', move: 'ontouchmove', end: 'ontouchend' }
}

function eventsPerDevice () {
  return typeof window.orientation !== undefined ? eventsMap.mobile : eventsMap.desktop
}

function moveImg (evt) {
  const target = evt.target
  const diffX = evt.pageX - parseInt(target.style.marginLeft || 0, 10)
  const diffY = evt.pageY - parseInt(target.style.marginTop || 0, 10)

  return e => {
    e.preventDefault()
    target.style.marginLeft = `${e.pageX - diffX}px`
    target.style.marginTop = `${e.pageY - diffY}px`
  }
}

function imagePosition () {
  const events = eventsPerDevice()
  const img = document.querySelector('.zoom__box')
  img[events.start] = e => {
    if (e.target.nodeName !== 'IMG') return

    document[events.end] = () => { document[events.move] = null }
    document[events.move] = moveImg(e)
  }
}

export default imagePosition
