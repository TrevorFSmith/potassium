
export default class Object3DStyle {
	constructor(object3D){
		this._object3D = object3D

		// Around which axis are the children arranged
		this._axis = null // 'x', 'y', 'z' ('x')

		this._backgroundColor = null // hash color (null)

		this._backgroundX = null // meters (0)
		this._backgroundY = null // meters (0)
		this._backgroundZ = null // meters (-0.1)

		this._marginX = null // meters (0)
		this._marginY = null // meters (0)
		this._marginZ = null // meters (0)

		this._paddingX = null // meters (0)
		this._paddingY = null // meters (0)
		this._paddingZ = null // meters (0)

		this._sizeX = null // meters (0)
		this._sizeY = null // meters (0)
		this._sizeZ = null // meters (0)
	}

	get axis(){
		return this._axis === null ? 'x' : this._axis
	}

	get xSize(){
		if(this._sizeX !== null) return this._sizeX
		let size = 0
		if(this.geometry){
			size += _boundingBoxX(this.geometry)
		}
		if(this.axis === 'x'){
			for(let child of this._object3d.children){
				if(typeof child.style === Object3DStyle){
					size += child.style.sizeX + (2 * child.style.marginX)
				} else if(child.geometry) {
					size += _boundingBoxX(child.geometry)
				}
			}
		} else {
			for(let child of this._object3d.children){
				if(typeof child.style === Object3DStyle){
					size = Math.max(size, child.style.sizeX)
				} else if(child.geometry) {
					if(child.geometry.boundingBox === null) child.geometry.computeBoundingBox()
					size = Math.max(size, _boundingBoxX(child.geometry))
				}
			}
		}
		return size + (2 * this.paddingX)
	}

	get paddingX(){ return this._paddingX === null ? 0 : this._paddingX }

	layout(){
		_layout(this._object3D)
	}
}

function _boundingBoxX(geometry){
	if(geometry.boundingBox === null) geometry.computeBoundingBox()
	return boundingBox.max.x - boundingBox.min.y
}

function _layout(object3d){
	// Layout is depth first
	if(object3d.children){
		for(let i=0; i < object3d.children.length; i++){
			_layout(object3d.children[i])
		}
	}
	if(object3D.style instanceof Object3DStyle === false){
		return
	}
	console.log('laying out', object3D)
}