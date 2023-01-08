/** @babel */

const buildMouseEvent = (type, target, options = {}) => {
  const event = new MouseEvent(type, {bubbles: true, cancelable: true})

  const defineProperty = (name, value) => {
    if (value != null) {
      Object.defineProperty(event, name, { get: () => value })
    }
  }

  defineProperty('button', options.button)
  defineProperty('which', options.which)
  defineProperty('ctrlKey', options.ctrlKey)
  defineProperty('relatedTarget', options.relatedTarget)

  defineProperty('target', target)
  defineProperty('srcObject', target)

  spyOn(event, 'preventDefault')
  return event
}

export const triggerMouseEvent = (type, target, {which, ctrlKey} = {}) => {
  const event = buildMouseEvent(type, target, {which, ctrlKey})
  target.dispatchEvent(event)
  return event
}

export const triggerClickEvent = (target, options) => {
  const events = {
    mousedown: buildMouseEvent('mousedown', target, options),
    mouseup: buildMouseEvent('mouseup', target, options),
    click: buildMouseEvent('click', target, options)
  }

  target.dispatchEvent(events.mousedown)
  target.dispatchEvent(events.mouseup)
  target.dispatchEvent(events.click)

  return events
}

export const buildDragEvents = (dragged, dropTarget) => {
  const dataTransfer = {
    data: {},
    setData (key, value) {
      this.data[key] = `${value}` // Drag events stringify data values
    },
    getData (key) {
      return this.data[key]
    },
    clearData (key) {
      if (key) {
        delete this.data[key]
      } else {
        this.data = {}
      }
    }
  }

  Object.defineProperty(dataTransfer, 'items', {
    get: () => Object.keys(dataTransfer.data).map(key => ({type: key}))
  })

  const dragStartEvent = buildMouseEvent('dragstart', dragged)
  Object.defineProperty(dragStartEvent, 'dataTransfer', {
    get: () => dataTransfer
  })

  const dropEvent = buildMouseEvent('drop', dropTarget)
  Object.defineProperty(dropEvent, 'dataTransfer', {
    get: () => dataTransfer
  })

  return [dragStartEvent, dropEvent]
}

export const buildDragEnterLeaveEvents = (enterRelatedTarget, leaveRelatedTarget) => {
  const dataTransfer = {
    data: {},
    setData (key, value) {
      this.data[key] = `${value}` // Drag events stringify data values
    },
    getData (key) {
      return this.data[key]
    },
    clearData (key) {
      if (key) {
        delete this.data[key]
      } else {
        this.data = {}
      }
    }
  }

  Object.defineProperty( dataTransfer, 'items', {
    get: () => Object.keys(dataTransfer.data).map(key => ({type: key}))
  })

  const dragEnterEvent = buildMouseEvent('dragenter', null, {relatedTarget: enterRelatedTarget})
  Object.defineProperty(dragEnterEvent, 'dataTransfer', {
    get: () => dataTransfer
  })
  dragEnterEvent.dataTransfer.setData('atom-tab-event', 'true')

  const dragLeaveEvent = buildMouseEvent('dragleave', null, {relatedTarget: leaveRelatedTarget})
  Object.defineProperty(dragLeaveEvent, 'dataTransfer', {
    get: () => dataTransfer
  })
  dragLeaveEvent.dataTransfer.setData('atom-tab-event', 'true')

  return [dragEnterEvent, dragLeaveEvent]
}

export const buildWheelEvent = delta =>
  new WheelEvent('mousewheel', {wheelDeltaY: delta})

export const buildWheelPlusShiftEvent = delta =>
  new WheelEvent('mousewheel', {wheelDeltaY: delta, shiftKey: true})
