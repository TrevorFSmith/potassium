import el from './El.js'
import graph from './Graph.js'
import Engine from './Engine.js'
import Router from './Router.js'
import Component from './Component.js'
import EventMixin from './EventMixin.js'

import ActionMap from '../action-input/action/ActionMap.js'
import MouseInputSource from '../action-input/input/MouseInputSource.js'
import KeyboardInputSource from '../action-input/input/KeyboardInputSource.js'
import VirtualKeyboardInputSource from './input/VirtualKeyboardInputSource.js'

import ClickFilter from './input/ClickFilter.js'
import TextInputFilter from './input/TextInputFilter.js'

import ActionManager from '../action-input/action/ActionManager.js'

/*
App contains the orchestration logic for the entirety of what is being displayed for a given app, including the app chrome and both 2D and 3D content.
App manages mode changes for mixed reality using WebXR, including changes of display, reality, and inputs.
It communicates these changes to Components via events so that they may react. 
*/
let App = EventMixin(
	class {
		constructor(){
			this._router = new Router()

			this._displayMode = App.FLAT

			this._virtualKeyboardInputSource = new VirtualKeyboardInputSource()
			this._virtualKeyboardInputSource.keyboardGroup.visible = false
			
			this._actionManager = new ActionManager(false)
			this._actionManager.addFilter("click", new ClickFilter())
			this._actionManager.addFilter("text-input", new TextInputFilter())
			this._actionManager.addInputSource("mouse", new MouseInputSource())
			this._actionManager.addInputSource("keyboard", new KeyboardInputSource())
			this._actionManager.addInputSource("virtual-keyboard", this._virtualKeyboardInputSource)
			this._actionManager.addActionMap('main', new ActionMap([...this._actionManager.filters], '/input/main-action-map.json'))

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
			this._portalEngine = graph.engine(this._portalScene, this._portalCamera, Engine.PORTAL, () => {
				this._actionManager.poll()
			})

			/** Immersive display mode 3D scene */
			this._immersiveEl = el.div({ class: 'immersive-root' }).appendTo(this._el)
			this._immersiveScene = graph.scene()
			this._immersiveScene.add(this._virtualKeyboardInputSource.keyboardGroup)
			this._immersiveCamera = graph.perspectiveCamera([45, 1, 0.5, 10000])
			this._immersiveEngine = graph.engine(this._immersiveScene, this._immersiveCamera, Engine.IMMERSIVE, () => {
				this._actionManager.poll()
			})

			// When the mode changes, notify all of the children Components
			this.addListener((eventName, mode) => {
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

App.FLAT = 'flat'
App.PORTAL = 'portal'
App.IMMERSIVE = 'immersive'
App.DISPLAY_MODES = [App.FLAT, App.PORTAL, App.IMMERSIVE]

App.DisplayModeChangedEvent = 'display-mode-changed'

export default App