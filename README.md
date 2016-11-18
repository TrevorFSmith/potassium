# PotassiumES

## Reactive elements for ES6

PotassiumES is a modern, reactive replacement for heavy weight or aging Javascript libraries for front end data modeling and user interface development. If you like React, Backbone, or Ember but don't care for all of the browser compatibility and build tool baggage that they bring with them, PotassiumES will be like a breath of fresh air.

PotassiumES takes advantage of the new code patterns of EcmaScript6 to eliminate unnecessary code bulk seen in libraries that need to be work with IE 6. Classes, default and spread parameters, promises, and other aspects of ES6 make PotassiumES lightweight, fast, and encourages devs to write code that is easy to maintain.

Unlike pretty much every other reactive library, PotassiumES has no external dependencies on other libraries like jQuery or build tools like webpack. Place potassium.js into any Javascript environment and go, confident that your code won't break every time a sub-dependency that you don't even directly call is broken in npm.

## Installation instructions

Copy potassium.js to your document root and include this in your head element:

	<script src="potassium.js"></script>

(yes, that's really all it takes)

## Code examples

### Manage data

	// create a new type of data model that has a custom attribute, countPlus4
	class MyModel extends k.DataModel {
		get countPlus4(){
			return this.get("count") + 4 
		}
	}

	// instantiate a MyModel and pass in initial data
	let model = new MyModel({
		id: 1,
		count: 20 
	})

	// listen to change events on the count field
	model.addListener(() => {

		// empty the target element
		let target = document.getElementById("target")
		target.innerHTML = ""

		// add divs to target with data from the model
		target.appendChild(k.el.div("id: " + model.get("id")))
		target.appendChild(k.el.div("count: " + model.get("count")))
		target.appendChild(k.el.div("count plus 4: " + model.countPlus4))

	}, "changed:count") // select only change events on count

	// when the button is clicked, increment the "count" field on the model
	let button = document.getElementById("increment-button")
	button.addEventListener("click", (domEvent) => {
		model.increment("count")
	})
[jsfiddle](https://jsfiddle.net/trevorfsmith/4ome2gdL/3/)

### Manage collections of data

	// create a new type of collection
	class MyCollection extends k.DataCollection {
		/* 
		Here we would normally define where to fetch the data and how to parse it, but for this demo it is not necessary.
		*/
	}

	// create a MyCollection instance with two items
	let collection = new MyCollection([
		{ id: 1, foo:"I am 1" }, 
		{ id: 2, foo:"I am 2" }, 
	])

	// get the first item in the collection, which is a k.DataModel
	let dataModel = collection.at(0)
	dataModel.get("id") // returns 1
	dataModel.get("foo") // returns "baz"

	// listen for collection events and display them in the "target" div
	collection.addListener((eventName, originator, ...params) => {
		let targetDiv = document.getElementById("target")
		targetDiv.appendChild(k.el.div(eventName, ": ", params[0].get("foo")))
	})

	// when the button is clicked, add a new item to the collection
	let currentId = 2
	let addButton = document.getElementById("add-button")
	addButton.addEventListener("click", (domEvent) => {
		currentId += 1

		// This triggers an "added" event, handled above
		collection.add({ id: currentId, foo:"I am " + currentId })
	})
[jsfiddle](https://jsfiddle.net/trevorfsmith/16y1gepc/1/)

### Create DOM elements

	// Create a div, give it a class attribute and some text
	let parent = k.el.div(
		{ class:"parent" }, 
		"Parent"
	)
	
	// parent is just a DOM element, so simply add it to the document
	document.getElementById("target").appendChild(parent)

	// Create a paragraph element with some sub-children and add it all to parent
	let child = k.el.p(
		"Child",
		k.el.a({ href:"#whatever" }, "Click me"),
		k.el.div("I like traffic lights")
	).appendTo(parent)
[jsfiddle](https://jsfiddle.net/trevorfsmith/apzc4fw9/)

### Create reactive components

	// define a PotassiumES reactive component to handle a simple dynamic behavior
	class CounterComponent extends k.Component {

		// use default parameters to pass a data model to the constructor 
		constructor(dataObject=new k.DataModel({ count: 0 }), options={}){
			super(dataObject, options)

			// add a class attribute to the root DOM element of this component, this.el
			this.el.addClass("counter-component")

			// create a div to display the count and add it to the root element
			this.countEl = k.el.div().appendTo(this.el)

			// bind the value of "count" in this.dataObject to this.countEl
			this.bindText("count", this.countEl)

			// add a button and when it is clicked, increase "count" in this.dataObject
			this.button = k.el.button("Add 1 to count").appendTo(this.el)
			this.listenTo("click", this.button, () => {
				this.dataObject.increment("count")
			})
		}
	}

	// create an instance of CounterComponent and add it to the "target" div
	let component = new CounterComponent()
	document.getElementById("target").appendChild(component.el)
	
	// when you're done with the component, call cleanup to disconnect all event listeners (data and DOM)
	component.cleanup()
[jsfiddle](https://jsfiddle.net/trevorfsmith/bnd376ve/)

### Route URLs to events so that components can react

	let router = new k.Router()

	// add a default route that will trigger the "home-loaded" event
	router.addRoute(/^$/, "home-loaded")

	// add a route for /#settings that will trigger "settings-loaded" and a few additional parameters
	router.addRoute(/^settings$/, "settings-loaded", "first param", "second param")

	// add a route that matches anything like /#profile/1234
	router.addRoute(/^profile\/([0-9]+)$/, "profile-loaded")

	// now add a callback to handle the events sent by the router
	router.addListener((eventName, target, ...params) => {
	
		// get and clear the div where we'll write the event info
		let targetDiv = document.getElementById("target")
		targetDiv.innerHTML = ""

		// add a couple of divs that display the event info
		targetDiv.appendChild(k.el.div("Event name: ", eventName))
		targetDiv.appendChild(k.el.div("Parameters: ", params.join(", ")))
	})

	// kick off the router so it looks for matches on page load
	router.start()
[jsfiddle](https://jsfiddle.net/trevorfsmith/2rbv11dy/3/)
