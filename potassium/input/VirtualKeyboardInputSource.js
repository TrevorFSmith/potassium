import graph from '../Graph.js'
import InputSource from "../../action-input/input/InputSource.js"

/**
 *  VirtualKeyboardInputSource watches events on a Three.js based keyboard
 */
export default class VirtualKeyboardInputSource extends InputSource {
  constructor() {
    super()

    /** @type {Set<number>} */
    this._activeKeyCodes = new Set()

    this.keyboardGroup = graph.obj('./js/potassium/input/Kayboard.obj')

    // TODO listen to the virtual keyboard
  }

  /**
  @param partialPath {string} the relative semantic path for an input
  @return the value of the the input, or null if the path does not exist
  */
  queryInputPath(partialPath) {
    if (partialPath.startsWith("/0/key/") === false) return null
    let keycode = Number.parseInt(partialPath.substring(7), 10)
    if (Number.isNaN(keycode)) return null
    return this._activeKeyCodes.has(keycode)
  }
}
