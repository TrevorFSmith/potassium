# Potassium

Reactive elements for ES6


## Create DOM elements

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

## Create Reactive components

	// define a Potassium reactive component to handle a simple dynamic behavior
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
[jsfiddle](https://jsfiddle.net/trevorfsmith/bnd376ve/)
