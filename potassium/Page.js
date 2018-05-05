import el from './El.js'
import graph from './Graph.js'
import Engine from './Engine.js'
import Router from './Router.js'
import Component from './Component.js'
import EventMixin from './EventMixin.js'

/*
Page contains the orchestration logic for the entirety of what is being displayed for a given page, including the page chrome and both 2D and 3D content.
Page manages mode changes for mixed reality using WebXR, including changes of display, reality, and inputs.
It communicates these changes to Components via events so that they may react. 
*/
let Page = EventMixin(
	class {
		constructor(){
			this._router = new Router()

			this._displayMode = Page.FLAT

			/**
			The root DOM elmenent that will contain everything for every display mode
			Add this to your page's DOM
			*/
			this._el = el.div({ class: 'page' })

			/** Flat display mode DOM elements */
			this._flatEl = el.div({ class: 'flat-root' }).appendTo(this._el)

			/** Portal display mode overlay DOM and 3D scene */
			this._portalEl = el.div({ class: 'portal-root' }).appendTo(this._el)
			this._portalScene = graph.scene()					
			this._portalCamera = graph.perspectiveCamera([45, 1, 0.5, 10000]).appendTo(this._portalScene)
			this._portalEngine = graph.engine(this._portalScene, this._portalCamera, Engine.PORTAL)
			//this._portalEl.appendChild(this._portalEngine.el)

			/** Immersive display mode 3D scene */
			this._immersiveEl = el.div({ class: 'immersive-root' }).appendTo(this._el)
			this._immersiveScene = graph.scene()					
			this._immersiveCamera = graph.perspectiveCamera([45, 1, 0.5, 10000]).appendTo(this._immersiveScene)
			this._immersiveEngine = graph.engine(this._immersiveScene, this._immersiveCamera, Engine.IMMERSIVE)
			this._immersiveEl.appendChild(this._immersiveEngine.el)

			this._updateClasses()
		}

		get router(){ return this._router }
		get el(){ return this._el }
		get flatEl(){ return this._flatEl }
		get portalScene(){ return this._portalScene }
		get immersiveScene(){ return this._immersiveScene }

		get displayMode(){ return this._displayMode }
		setDisplayMode(value){
			if(this._displayMode === value) return new Promise((resolve, reject) => {
				resolve(this._displayMode)
			})
			if(value === Page.FLAT){
				return new Promise((resove, reject) => {
					this._portalEngine.stop()
					this._immersiveEngine.stop()
					this._displayMode = Page.FLAT
					this._updateClasses()
					this.trigger(Page.ModeChangedEvent, Page.FLAT)
				})
			}
			if(value === Page.PORTAL){
				return new Promise((resolve, reject) => {
					this._immersiveEngine.stop()
					this._portalEngine.start().then(() => {
						this._displayMode = Page.PORTAL
						this._updateClasses()
						this.trigger(Page.ModeChangedEvent, Page.PORTAL)
						resolve(Page.PORTAL)
					}).catch(err => {
						console.error('Error starting portal engine', err)
						reject(err)
					})
				})
			}
			if(value === Page.IMMERSIVE){
				return new Promise((resolve, reject) => {
					this._portalEngine.stop()
					this._immersiveEngine.start().then(() => {
						this._displayMode = Page.IMMERSIVE
						this._updateClasses()
						this.trigger(Page.DisplayModeChangedEvent, Page.IMMERSIVE)
						resolve(Page.IMMERSIVE)
					}).catch(err => {
						console.error('Error starting immersive engine', err)
						reject(err)
					})
				})
			}
			throw new Error('Unhandled display mode', value)
		}

		_updateClasses(){
			this._el.removeClass('flat-mode')
			this._el.removeClass('portal-mode')
			this._el.removeClass('immersive-mode')
			this._el.addClass(this._displayMode + '-mode')
		}
	}
)

Page.FLAT = 'flat'
Page.PORTAL = 'portal'
Page.IMMERSIVE = 'immersive'
Page.DISPLAY_MODES = [Page.FLAT, Page.PORTAL, Page.IMMERSIVE]

Page.DisplayModeChangedEvent = 'display-mode-changed'

export default Page