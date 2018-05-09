import el from './El.js'

import XRCoordinateSystem from '../webxr-polyfill/XRCoordinateSystem.js'

/*
Engine wraps up the THREE.Renderer and manages moving into and out of XRSessions
*/
let Engine = class {
	constructor(scene, camera, mode){
		if(Engine.MODES.indexOf(mode) === -1){
			throw new Error('Unknown engine mode', mode)
		}
		this._render = this._render.bind(this)
		this._mode = mode
		this._el = el.div({ class: 'engine' }) // This will contain the rendering canvas
		this._el.addClass(this._mode + '-engine')
		this._scene = scene
		this._camera = camera
		this._camera.name = mode + '-camera'
		this._scene.add(this._camera)

		this._glCanvas = el.canvas().appendTo(this._el)
		this._glContext = this._glCanvas.getContext('webgl')
		if(this._glContext === null){
			throw new Error('Could not create GL context')
		}
		this._renderer = new THREE.WebGLRenderer({
			canvas: this._glCanvas,
			context: this._glContext,
			antialias: false,
			alpha: false
		})
		//this._renderer.autoClear = true

		this._session = null // An XRSession
	}
	get el(){ return this._el }

	start(){
		return new Promise((resolve, reject) => {
			if(typeof navigator.XR === 'undefined'){
				reject('XR is not available, so portal and immersive are not supported')
				return
			}
			this._renderer.setPixelRatio(1)
			this._renderer.setClearColor('#000', 0)
			navigator.XR.getDisplays().then(displays => {
				if(displays.length == 0) {
					reject('No displays are available')
					return
				}
				if(this._mode === Engine.PORTAL){
					var sessionInitParamers = {
						exclusive: false,
						type: XRSession.AUGMENTATION
					}
				} else {
					var sessionInitParamers = {
						exclusive: true,
						type: XRSession.REALITY
					}
				}
				let display = null
				for(let disp of displays){
					if(disp.supportsSession(sessionInitParamers)){
						display = disp
						break
					}
				}
				if(display === null){
					reject('Could not find a display for this type of session')
					return
				}
				if(this._session !== null){
					this._session.end()
					this._session = null
				}
				display.requestSession(sessionInitParamers).then(session => {
					this._session = session
					// Set the session's base layer into which the app will render
					this._glCanvas.style.width = ''
					this._glCanvas.style.height = ''
					this._session.baseLayer = new XRWebGLLayer(this._session, this._glContext)
					this._session.requestFrame(this._render)
					resolve(this._mode)
					return
				}).catch(err => {
					console.error('Error requesting session', err)
					reject(err)
				})
			}).catch(err => {
				console.error('err', err)
				reject('Error getting XR displays', err)
				return
			})
		})
	}

	stop(){
		return new Promise((resolve, reject) => {
			if(this._session !== null){
				this._session.end()
				this._session = null
			}
			resolve(this._mode)
		})
	}
	_render(frame){
		if(this._session === null){
			return
		}
		this._session.requestFrame(this._render)
		if(typeof frame === 'number') return // This happens when switching from window.requestAnimationFrame to session.requestFrame
		const headPose = frame.getDisplayPose(frame.getCoordinateSystem(XRCoordinateSystem.HEAD_MODEL))
		this._renderer.autoClear = false
		this._renderer.setSize(this._session.baseLayer.framebufferWidth, this._session.baseLayer.framebufferHeight, false)
		this._renderer.clear()
		this._camera.matrixAutoUpdate = false
		// Render each view into this._session.baseLayer.context
		for(const view of frame.views){
			// Each XRView has its own projection matrix, so set the camera to use that
			this._camera.projectionMatrix.fromArray(view.projectionMatrix)
			this._camera.matrix.fromArray(headPose.poseModelMatrix)
			this._camera.updateMatrixWorld(true)
			// Set up the renderer to the XRView's viewport and then render
			this._renderer.clearDepth()
			const viewport = view.getViewport(this._session.baseLayer)
			this._renderer.setViewport(viewport.x, viewport.y, viewport.width, viewport.height)
			this._renderer.render(this._scene, this._camera)
		}
	}
}

Engine.PORTAL = 'portal'
Engine.IMMERSIVE = 'immersive'
Engine.MODES = [Engine.PORTAL, Engine.IMMERSIVE]

export default Engine
