import el from './El.js'
import graph from './Graph.js'
import Engine from './Engine.js'
import Router from './Router.js'
import Component from './Component.js'
import EventMixin from './EventMixin.js'
import {throttledConsoleLog} from './throttle.js'

import ActionMap from '../action-input/action/ActionMap.js'
import ClickFilter from '../action-input/filter/ClickFilter.js'
import MinMaxFilter from '../action-input/filter/MinMaxFilter.js'
import MouseInputSource from '../action-input/input/MouseInputSource.js'
import TouchInputSource from '../action-input/input/TouchInputSource.js'
import GamepadInputSource from '../action-input/input/GamepadInputSource.js'
import KeyboardInputSource from '../action-input/input/KeyboardInputSource.js'
import VirtualKeyboardInputSource from './input/VirtualKeyboardInputSource.js'

import TextInputFilter from './input/TextInputFilter.js'
import ActivePickFilter from './input/ActivePickFilter.js'
import PickingInputSource from './input/PickingInputSource.js'

import ActionManager from '../action-input/action/ActionManager.js'

/*
App contains the orchestration logic for the entirety of what is being displayed for a given app, including the app chrome and both 2D and 3D content.
App manages mode changes for mixed reality using WebXR, including changes of display, reality, and inputs.
It communicates these changes to Components via events so that they may react. 
*/
let App = EventMixin(
	class {
		constructor(){
			this._handlePortalTick = this._handlePortalTick.bind(this)
			this._handleImmersiveTick = this._handleImmersiveTick.bind(this)

			this._router = new Router()

			this._displayMode = App.FLAT

			this._virtualKeyboardInputSource = new VirtualKeyboardInputSource()
			this._virtualKeyboardInputSource.keyboardGroup.scale.set(0.5, 0.5, 0.5)
			this._virtualKeyboardInputSource.keyboardGroup.quaternion.setFromEuler(graph.euler(0, -45, 0))
			this._virtualKeyboardInputSource.keyboardGroup.position.set(0.8, 0, -0.8)
			
			this._pickingInputSource = new PickingInputSource()

			this._actionManager = new ActionManager(false)
			this._actionManager.addFilter("click", new ClickFilter(this._actionManager.queryInputPath))
			this._actionManager.addFilter("active-pick", new ActivePickFilter(this._actionManager.queryInputPath))
			this._actionManager.addFilter("text-input", new TextInputFilter())
			this._actionManager.addFilter("min-max", new MinMaxFilter())
			this._actionManager.addInputSource("picking", this._pickingInputSource)
			this._actionManager.addInputSource("mouse", new MouseInputSource())
			this._actionManager.addInputSource("touch", new TouchInputSource())
			this._actionManager.addInputSource("gamepad", new GamepadInputSource())
			this._actionManager.addInputSource("keyboard", new KeyboardInputSource())
			this._actionManager.addInputSource("virtual-keyboard", this._virtualKeyboardInputSource)

			this._actionManager.addActionMap('flat', new ActionMap([...this._actionManager.filters], '/input/flat-action-map.json'))
			this._actionManager.addActionMap('portal', new ActionMap([...this._actionManager.filters], '/input/portal-action-map.json'))
			this._actionManager.addActionMap('immersive', new ActionMap([...this._actionManager.filters], '/input/immersive-action-map.json'))
			this._actionManager.switchToActionMaps('flat')

			// Route activate actions to the target Component
			this._actionManager.addActionListener('/action/activate', (actionName, value, actionParameters) => {
				if(actionParameters !== null && actionParameters.targetComponent){
					actionParameters.targetComponent.handleAction(actionName, value, actionParameters)
				}
				if(value && actionParameters !== null && actionParameters.pointer === 'left'){
					this._virtualKeyboardInputSource.handleLeftActivate()
				}
				if(value && actionParameters !== null && actionParameters.pointer === 'right'){
					this._virtualKeyboardInputSource.handleRightActivate()
				}
			})

			this._actionManager.addActionListener('/action/activate-dom', (actionName, value, actionParameters) => {
				console.log('activate-dom', value, actionName, actionParameters)
				if(actionParameters !== null && actionParameters.targetComponent){
					actionParameters.targetComponent.handleAction('/action/activate', value, actionParameters)
				}
			})

			// Route text input actions to the Component that has text input focus
			this._actionManager.addActionListener('/action/text-input', (actionName, value, actionParameters) => {
				if(Component.TextInputFocus !== null){
					Component.TextInputFocus.handleAction(actionName, value, actionParameters)
				}
			})

			// The engines call back from their raf loops, but in flat mode the App uses window.requestAnimationFrame to call ActionManager.poll
			this._handleWindowAnimationFrame = this._handleWindowAnimationFrame.bind(this)

			/**
			The root DOM elmenent that will contain everything for every display mode
			Add this to your app's DOM
			*/
			this._el = el.div({ class: 'app' })

			/** Flat display mode DOM elements */
			this._flatEl = el.div({ class: 'flat-root' }).appendTo(this._el)

			/** Portal display mode overlay DOM and 3D scene */
			this._portalEl = el.div({ class: 'portal-root' }).appendTo(this._el)
			this._portalScene = graph.scene()
			this._portalCamera = graph.perspectiveCamera([45, 1, 0.5, 10000])
			this._portalEngine = graph.engine(this._portalScene, this._portalCamera, Engine.PORTAL, this._handlePortalTick)

			/** Immersive display mode 3D scene */
			this._immersiveEl = el.div({ class: 'immersive-root' }).appendTo(this._el)
			this._immersiveScene = graph.scene()
			this._immersiveCamera = graph.perspectiveCamera([45, 1, 0.5, 10000])
			this._immersiveEngine = graph.engine(this._immersiveScene, this._immersiveCamera, Engine.IMMERSIVE, this._handleImmersiveTick)

			/* Set up hands and pointers */
			this._leftHand = graph.group(this._makeHand(0x9999FF)).appendTo(this._immersiveScene)
			this._leftPointer = this._makePointer(0x99FF99)
			this._leftPointer.visible = false
			this._leftHand.add(this._leftPointer)
			this._rightHand = graph.group(this._makeHand(0xFF9999)).appendTo(this._immersiveScene)
			this._rightPointer = this._makePointer(0x99FF99)
			this._rightPointer.visible = false
			this._rightHand.add(this._rightPointer)
			/* Set up the virtual keyboard */
			this._immersiveScene.add(this._virtualKeyboardInputSource.keyboardGroup)

			// When the mode changes, notify all of the children Components
			this.addListener((eventName, mode) => {
				this._actionManager.switchToActionMaps(mode)

				// TODO use a better method than flatEl traversal
				const dive = (node) => {
					if(typeof node.component !== 'undefined' && typeof node.component.handleDisplayModeChange === 'function'){
						node.component.handleDisplayModeChange(mode)
					}
					for(let i=0; i < node.children.length; i++){
						dive(node.children[i])
					}
				}
				dive(this._flatEl)
			}, App.DisplayModeChangedEvent)

			this._updateClasses()
			window.requestAnimationFrame(this._handleWindowAnimationFrame)
		}

		get router(){ return this._router }
		get el(){ return this._el }
		get flatEl(){ return this._flatEl }
		get portalScene(){ return this._portalScene }
		get immersiveScene(){ return this._immersiveScene }
		get actionManager(){ return this._actionManager }
		
		/*
		appendComponent adds the childComponent's flatEl, portalEl, portalGraph, and immersiveGraph to this Component's equivalent attributes.
		*/
		appendComponent(childComponent){
			this._flatEl.appendChild(childComponent.flatEl)
			this._portalEl.appendChild(childComponent.portalEl)
			this._portalScene.add(childComponent.portalGraph)
			this._immersiveScene.add(childComponent.immersiveGraph)
		}
		/*
		removeComponent removes the childComponent's flatEl, portalEl, portalGraph, and immersiveGraph from this Component's equivalent attributes.
		*/
		removeComponent(childComponent){
			this._flatEl.removeChild(childComponent.flatEl)
			this._portalEl.removeChild(childComponent.portalEl)
			this._portalScene.remove(childComponent.portalGraph)
			this._immersiveScene.remove(childComponent.immersiveGraph)
		}

		get displayMode(){ return this._displayMode }
		setDisplayMode(value){
			if(this._displayMode === value) return new Promise((resolve, reject) => {
				resolve(this._displayMode)
			})
			if(value === App.FLAT){
				return new Promise((resolve, reject) => {
					this._portalEngine.stop()
					this._immersiveEngine.stop()
					this._displayMode = App.FLAT
					this._updateClasses()
					this.trigger(App.DisplayModeChangedEvent, App.FLAT)
					window.requestAnimationFrame(this._handleWindowAnimationFrame)
					resolve(App.FLAT)
				})
			}
			if(value === App.PORTAL){
				return new Promise((resolve, reject) => {
					this._immersiveEngine.stop()
					this._portalEngine.start().then(() => {
						this._displayMode = App.PORTAL
						this._updateClasses()
						this.trigger(App.DisplayModeChangedEvent, App.PORTAL)
						resolve(App.PORTAL)
					}).catch(err => {
						console.error('Error starting portal engine', err)
						reject(err)
					})
				})
			}
			if(value === App.IMMERSIVE){
				return new Promise((resolve, reject) => {
					this._portalEngine.stop()
					this._immersiveEngine.start().then(() => {
						this._displayMode = App.IMMERSIVE
						this._updateClasses()
						this.trigger(App.DisplayModeChangedEvent, App.IMMERSIVE)
						resolve(App.IMMERSIVE)
					}).catch(err => {
						console.error('Error starting immersive engine', err)
						reject(err)
					})
				})
			}
			throw new Error('Unhandled display mode', value)
		}

		_makeHand(color){
			return graph.obj('./js/potassium/input/Controller.obj', (group, obj) => {
				const body = group.getObjectByName('Body_Cylinder') // Magic string for temp OBJ
				if(!body){
					console.error('Did not find a hand group to color', group)
					return
				}
				body.material.color.set(color)
			}, (...params) => {
				console.error('Error loading hands', ...params)
			})
		}

		_makePointer(color){
			const material = graph.lineBasicMaterial({ color: color })
			const geometry = graph.geometry()
			geometry.vertices.push(
				graph.vector3(0, 0, 0),
				graph.vector3(0, 0, -1000)
			)
			const pointer = graph.line(geometry, material)
			pointer.name = 'pointer'
			return pointer
		}

		_handlePortalTick(){
			// Update picking
			this._pickingInputSource.clearIntersectObjects()
			const touchInput = this._actionManager.queryInputPath('/input/touch/normalized-position')
			if(touchInput !== null && touchInput[0] !== null) {
				this._pickingInputSource.touch = this._portalEngine.pickScreen(...touchInput[0])
			}

			this._actionManager.poll()
		}

		_handleImmersiveTick(){
			// Update hand poses, visibility, and pointers
			const leftPosition = this._actionManager.queryInputPath('/input/gamepad/left/position')[0]
			if(leftPosition){
				this._leftHand.position.set(...leftPosition)
			} else {
				this._leftHand.position.set(...App.DefaultLeftHandPosition)
			}
			const leftOrientation = this._actionManager.queryInputPath('/input/gamepad/left/orientation')[0]
			if(leftOrientation) {
				this._leftHand.quaternion.set(...leftOrientation)
				this._leftPointer.visible = this._actionManager.queryInputPath('/input/gamepad/left/button/0/touched')[0] || false
				this._leftHand.visible = true
			} else {
				// If it's not at least a 3dof controller, we don't show it
				this._leftHand.visible = false
			}
			const rightPosition = this._actionManager.queryInputPath('/input/gamepad/right/position')[0]
			if(rightPosition){
				this._rightHand.position.set(...rightPosition)
			} else {
				this._rightHand.position.set(...App.DefaultRightHandPosition)
			}
			const rightOrientation = this._actionManager.queryInputPath('/input/gamepad/right/orientation')[0]
			if(rightOrientation){
				this._rightHand.quaternion.set(...rightOrientation)
				this._rightPointer.visible = this._actionManager.queryInputPath('/input/gamepad/right/button/0/touched')[0] || false
				this._rightHand.visible = true
			} else {
				// If it's not at least a 3dof controller, we don't show it
				this._rightHand.visible = false
			}

			// Update picking
			this._pickingInputSource.clearIntersectObjects()
			if(this._leftHand.visible && this._leftPointer.visible){
				this._leftHand.visible = false
				this._pickingInputSource.left = this._immersiveEngine.pickPose(this._leftPointer)
				this._leftHand.visible = true
			} else {
				this._pickingInputSource.left = null
			}
			if(this._rightHand.visible && this._rightPointer.visible){
				this._rightHand.visible = false
				this._pickingInputSource.right = this._immersiveEngine.pickPose(this._rightPointer)
				this._rightHand.visible = true
			} else {
				this._pickingInputSource.right = null
			}
			this._virtualKeyboardInputSource.handlePick(
				this._pickingInputSource.left,
				this._pickingInputSource.right
			)
			this._actionManager.poll()
		}

		_handleWindowAnimationFrame(){
			if(this._displayMode !== App.FLAT) return
			window.requestAnimationFrame(this._handleWindowAnimationFrame)
			this._actionManager.poll()
		}

		_updateClasses(){
			this._el.removeClass('flat-mode')
			this._el.removeClass('portal-mode')
			this._el.removeClass('immersive-mode')
			this._el.addClass(this._displayMode + '-mode')
		}
	}
)

App.DefaultLeftHandPosition = [-0.1, -0.4, -0.2]
App.DefaultRightHandPosition = [0.1, -0.4, -0.2]

App.FLAT = 'flat'
App.PORTAL = 'portal'
App.IMMERSIVE = 'immersive'
App.DISPLAY_MODES = [App.FLAT, App.PORTAL, App.IMMERSIVE]

App.DisplayModeChangedEvent = 'display-mode-changed'

export default App