/*
A handy, chain oriented API for creating Three.js scenes
*/
import el from './El.js'
import Engine from './Engine.js'

let graph = {}
export default graph

/*
	if the first parameter in params is an array, the values of the array will be passed into the constructor of the instance
*/
graph.nodeFunction = function(clazz, ...params){

	let instance = null
	let consumedFirstParam = false
	if(Array.isArray(params[0])){
		consumedFirstParam = true
		instance = new THREE[clazz](...params[0])
	} else {
		instance = new THREE[clazz]()
	}

	// A convenience function to allow chaining like `let group = graph.group().appendTo(scene)`
	instance.appendTo = function(parent){
		parent.add(this)
		return this
	}

	// A convenience function to allow appending dictionaries of attributes, arrays of subchildren, or children
	instance.append = function(child=null){
		if(child === null){ return }
		if(typeof child === 'object' && typeof child.matrixWorld === 'undefined'){
			// If it's an object but not an Object3D, consider it a dictionary of attributes
			for(let key in child){
				if(child.hasOwnProperty(key) == false) continue
				this[key] = child[key]
			}
		} else {
			this.add(child)
		}
		return this
	}

	// Append the children parameters
	for(let i=0; i < params.length; i++){
		if(i == 0 && consumedFirstParam) continue
		instance.append(params[i])
	}
	return instance
}

graph.engine = (scene, camera, mode) => { return new Engine(scene, camera, mode) }

graph.obj = (path) => {
	let geometry = path.split('/')[path.split('/').length - 1]
	let baseURL = path.substring(0, path.length - geometry.length)
	let group = graph.group()
	loadObj(baseURL, geometry).then(obj => {
		group.add(obj)
	}).catch((...params) => {
		console.error('could not load obj', ...params)
	})
	return group
}

graph.gltf = (path) => {
	let group = graph.group()
	loadGLTF(path).then(gltf => {
		group.add(gltf.scene)
	}).catch((...params) =>{
		console.error('could not load gltf', ...params)
	})
	return group
}

graph.GRAPH_CLASSES = [
	{ class: 'Scene', name: 'scene' },
	{ class: 'Group', name: 'group' },
	{ class: 'AmbientLight', name: 'ambientLight' },
	{ class: 'PerspectiveCamera', name: 'perspectiveCamera' }
]

// This loop generates the element generating functions like el.div(...)
for(let graphClassInfo of graph.GRAPH_CLASSES){
	let innerClazz = graphClassInfo.class
	graph[graphClassInfo.name] = function(...params){
		return graph.nodeFunction(innerClazz, ...params)
	}
}

function loadGLTF(url){
	return new Promise((resolve, reject) => {
		let loader = new THREE.GLTFLoader()
		loader.load(url, (gltf) => {
			if(gltf === null){
				reject()
			}
			/*
			if(gltf.animations && gltf.animations.length){
				let mixer = new THREE.AnimationMixer(gltf.scene)
				for(let animation of gltf.animations){
					mixer.clipAction(animation).play()
				}
			}
			*/
			resolve(gltf)
		})
	})
}

function loadObj(baseURL, geometry){
	return new Promise(function(resolve, reject){
		const mtlLoader = new THREE.MTLLoader()
		mtlLoader.setPath(baseURL)
		const mtlName = geometry.split('.')[geometry.split(':').length - 1] + '.mtl'
		mtlLoader.load(mtlName, (materials) => {
			materials.preload()
			let objLoader = new THREE.OBJLoader()
			objLoader.setMaterials(materials)
			objLoader.setPath(baseURL)
			objLoader.load(geometry, (obj) => {
				resolve(obj)
			}, () => {} , (...params) => {
				console.error('Failed to load obj', ...params)
				reject(...params)
			})
		})
	})
}
