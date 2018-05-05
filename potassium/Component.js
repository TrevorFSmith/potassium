import el from './El.js'
import graph from './Graph.js'
import EventMixin from './EventMixin.js'

/**
	Component contains the reactive logic for a responsive UI element.
	It supports all three display modes: flat, portal, and immersive.
	It reacts to DOM events as well as Actions
*/
let Component = EventMixin(
	class {
		constructor(dataObject=null, options={}){
			this.dataObject = dataObject // a DataModel or DataCollection
			this.options = options
			this.cleanedUp = false

			// Set up the DOM and 3D graph for the three display modes:

			// Flat display mode elements, including page type controls
			this._flatEl = this.options.flatEl || el.div()

			// Portal display mode overlay controls
			this._portalEl = this.options.overlayEl || el.div()
			// Portal display mode 3D graph
			this._portalGraph = this.options.portalGraph || graph.group()

			// Immersive display mode 3D graph
			this._immersiveGraph = this.options.immersiveGraph || graph.group()

			this.boundCallbacks = [] // { callback, dataObject } to be unbound during cleanup
			this.domEventCallbacks = [] // { callback, eventName, targetEl } to be unregistered during cleanup
		}

		cleanup(){
			if(this.cleanedUp) return
			this.cleanedUp = true
			this.clearListeners()
			for(let bindInfo of this.boundCallbacks){
				bindInfo.dataObject.removeListener(bindInfo.callback)
			}
			for(let domInfo of this.domEventCallbacks){
				domInfo.targetEl.removeEventListener(domInfo.eventName, domInfo.callback)
			}
		}

		get flatEl(){ return this._flatEl }
		get portalEl(){ return this._portalEl }
		get portalGraph() { return this._portalGraph }
		get immersiveGraph(){ return this._immersiveGraph }

		/*
			Listen to a DOM event.
			For example:
				this.buttonEl = el.button()
				this.listenToEl('click', this.buttonEl, this.handleClick)
		*/
		listenToEl(eventName, targetEl, callback, context=this){
			let boundCallback = context === null ? callback : callback.bind(context)
			let info = {
				eventName: eventName,
				targetEl: targetEl,
				originalCallback: callback,
				context: context,
				callback: boundCallback
			}
			targetEl.addEventListener(eventName, info.callback)
			this.domEventCallbacks.push(info)
		}
		/*
			Set the targetElement.innerText to the value of dataObject.get(fieldName) as it changes
			dataObject defaults to this.dataObject but can be any DataModel or DataCollection
			formatter defaults to the identity function but can be any function that accepts the value and returns a string
		*/
		bindTextEl(fieldName, targetElement, formatter=null, dataObject=this.dataObject){
			if(formatter === null){
				formatter = (value) => {
					if(value === null) return ''
					if(typeof value === 'string') return value
					return '' + value
				}
			}
			let callback = () => {
				let result = formatter(dataObject.get(fieldName))
				targetElement.innerText = typeof result === 'string' ? result : ''
			}
			dataObject.addListener(callback, `changed:${fieldName}`)
			callback()
			this.boundCallbacks.push({
				callback: callback,
				dataObject: dataObject
			})
		}
		/*
			Set the attributeName attribute of targetElement to the value of dataObject.get(fieldName) as it changes
			formatter defaults to the identity function but can be any function that accepts the value and returns a string
		*/
		bindAttributeEl(fieldName, targetElement, attributeName, formatter=null, dataObject=this.dataObject){
			if(formatter === null){
				formatter = (value) => {
					if(value === null) return ''
					if(typeof value === 'string') return value
					return '' + value
				}
			}
			let callback = () => {
				targetElement.setAttribute(attributeName, formatter(dataObject.get(fieldName)))
			}
			dataObject.addListener(callback, `changed:${fieldName}`)
			callback()
			this.boundCallbacks.push({
				callback: callback,
				dataObject: dataObject
			})
		}
	}
)

export default Component

