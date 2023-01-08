/** @babel */

export function getWrapGuides () {
  const wrapGuides = []
  for (const editor of atom.workspace.getTextEditors()) {
    const guide = editor.getElement().querySelector('.wrap-guide')
    if (guide) wrapGuides.push(guide)
  }
  return wrapGuides
}

export function getLeftPosition (element) {
  return parseInt(element.style.left)
}

export function getLeftPositions (elements) {
  return Array.prototype.map.call(elements, element => getLeftPosition(element))
}
