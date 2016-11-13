"use strict";
/*
	Tests for PotassiumES (see potassium.js)
*/

var kTest = {}

// KTests to be run by k.tests.runKTests()
kTest.K_TESTS = []

/*
	A test object that holds state. Push these into kTest.K_TESTS and use kTest.run() to run them.
*/
kTest.Test = class {
	constructor(name, testFunction, setupFunction=null, teardownFunction=null){
		this.name = typeof name === undefined ? "Unnamed test" : name
		this.testFunction = testFunction
		this.setupFunction = setupFunction
		this.teardownFunction = teardownFunction
		this.assertionCount = 0
	}
	test() {
		if(typeof this.setupFunction == 'function'){
			try {
				this.setupFunction(this)
			} catch (e) {
				console.error("Setup error", e)
				return false
			}
		}
		try {
			this.testFunction(this)
			return true
		} catch (e) {
			console.error("Test error", e)
			return false
		} finally {
			if(typeof this.teardownFunction == 'function'){
				try {
					this.teardownFunction(this)
				} catch (e) {
					console.error("Teardown error", e)
				}
			}
		}
	}
	/*
		assert*(...) functions return nothing if the assertion is true and throw an Error if the assertion is false
	*/
	assertTrue(value){
		this.assertionCount += 1
		if(!value){
			throw new Error(`${value} is not true`)
		}
	}
	assertType(value, typeName){
		this.assertionCount += 1
		if(value == null){
			throw new Error(`${value} is null, so it not of type ${typeName}`)
		}
		if(typeof value !== typeName){
			throw new Error(`${value} is of type ${typeof value}, not ${typeName}`)
		}
	}
	assertInstanceOf(value, clazz){
		this.assertionCount += 1
		if(value instanceof clazz){
			return
		}
		throw new Error(`${value} is not an instance of ${clazz}`)
	}
	assertNull(value){
		this.assertionCount += 1
		if(value !== null){
			throw new Error(`${value} is not null`)
		}
	}
	assertEqual(val1, val2){
		this.assertionCount += 1
		if(val1 === null){
			if(val2 !== null){
				throw new Error(`${val1} != ${val2}`)
			}
		}
		if(val2 === null){
			if(val1 !== null){
				throw new Error(`${val1} != ${val2}`)
			}
		}
		if(val1 == null){
			return
		}
		if(typeof val1 == "undefined"){
			if(typeof val2 !== "undefined"){
				throw new Error(`${val1} != ${val2}`)
			}
		}
		if(typeof val2 == "undefined"){
			if(typeof val1 !== "undefined"){
				throw new Error(`${val1} != ${val2}`)
			}
		}
		if(typeof val1 == "undefined"){
			return
		}
		if(typeof val1.equals == "function"){
			if(val1.equals(val2) == false){
				throw new Error(`${val1} != ${val2}`)
			}
		}
		else if(val1 != val2){
			throw new Error(`${val1} != ${val2}`)
		}
		return
	}
	assertNotEqual(val1, val2){
		this.assertionCount += 1

	}
}

/*
	Run the tests in kTest.K_TESTS
*/
kTest.run = function(){
	let passedTests = []
	let failedTests = []
	let assertionCount = 0
	for(let test of kTest.K_TESTS){
		let passed = test.test()
		assertionCount += test.assertionCount
		if(passed){
			passedTests.push(test)
		} else {
			failedTests.push(test)
		}
	}
	return [passedTests, failedTests, assertionCount]
}

/*
	Run kTest.K_TESTS and print results to the console
*/
kTest.runAndLog = function(){
	var [passedTests, failedTests, assertionCount] = kTest.run()
	console.log(`assertions: ${assertionCount}  total: ${passedTests.length + failedTests.length}  passed: ${passedTests.length}  failed: ${failedTests.length}`)
}

/*
	SynchronousPromise sort of acts like a Promise but is not asynchronous
*/
kTest.SynchronousPromise = class {
	constructor(resolveFunction=null, rejectFunction=null){
		this.resolveFunction = resolveFunction
		this.rejectFunction = rejectFunction
	}
	then(func){
		let result = null
		if(this.resolveFunction){
			result = func(this.resolveFunction())
		}
		return new kTest.SynchronousPromise(()=> {
			return result
		})
	}
	catch(func){
		let result = null
		if(this.rejectFunction){
			result = func(this.rejectFunction())
		}
		return new kTest.SynchronousPromise(() => {
			return result
		})
	}
}

/*
	MockResponse sort of acts like the Response object returned from fetch
*/
kTest.MockResponse = class {
	constructor(responseData={}, status=200){
		this.responseData = responseData
		this.status = status
	}
	json(){
		return this.responseData
	}
}

// Load this up with <url string, { data: responseData, status: INT }> for synchronousFetch to use
kTest.SynchronousFetchMap = new Map()

// This is used in setup and teardown of kTest.Tests to replace window.fetch with a synchronous version that is easier to test
kTest.synchronousFetch = function(url){
	return new kTest.SynchronousPromise(() => {
		let info = kTest.SynchronousFetchMap.get(url)
		if(!info){
			return new kTest.MockResponse("Not found", 404)
		}
		return new kTest.MockResponse(info)
	})
}

/*
	Run the tests for Potassium itself, including testing k.DataModel and k.DataCollection
*/
kTest.testPotassium = function(){
	kTest.K_TESTS.push(new kTest.Test("Events test", (test) => {
		let model = new k.DataModel()
		let receivedEvents = []
		model.addListener((eventName, target, ...params) => { 
			receivedEvents.push({ eventName: eventName, target: target, params: params })
		})
		model.addListener((eventName, target, ...params) => { 
			receivedEvents.push({ eventName: eventName, target: target, params: params })
		}, "changed:foo")
		model.addListener((eventName, target, ...params) => { 
			receivedEvents.push({ eventName: eventName, target: target, params: params })
		}, "changed:not_foo")
		model.set("foo", "bar")
		test.assertEqual(receivedEvents.length, 3)
		test.assertEqual(receivedEvents[receivedEvents.length - 2].eventName, "changed:foo")
		test.assertEqual(receivedEvents[receivedEvents.length - 2].target, model)
		test.assertEqual(receivedEvents[receivedEvents.length - 2].params[0], "foo")

		var listener = (eventName, target, ...params) => {
			receivedEvents.push({ eventName: eventName, target: target, params: params })
		}
		model.addListener(listener, "changed:baz")
		receivedEvents.length = 0
		model.set("baz", 23)
		test.assertEqual(receivedEvents.length, 3)
		model.removeListener(listener, "changed:bogus") // Wrong eventName so should not be removed
		receivedEvents.length = 0
		model.set("baz", 100)
		test.assertEqual(receivedEvents.length, 3) // Should still be a listener
		model.removeListener(listener, "changed:baz")
		receivedEvents.length = 0
		model.set("baz", 43)
		test.assertEqual(receivedEvents.length, 2) // Should only match the k.ALL_EVENTS listener from above

		model.cleanup()
		receivedEvents.length = 0
		model.trigger("changed:foo", model, "foo")
		test.assertEqual(receivedEvents.length, 0)
	}))
	kTest.K_TESTS.push(new kTest.Test("DataModel", (test) => {
		class FlowersCollection extends k.DataCollection {}
		let model = new k.DataModel(null, {
			fieldDataObjects: { flowers: FlowersCollection }
		})
		let receivedEvents = []
		model.addListener((eventName, target, ...params) => { 
			receivedEvents.push({ eventName: eventName, target: target, params: params })
		})
		test.assertNull(model.get("bogus"))
		test.assertEqual(model.get("bogus", "moon"), "moon")
		model.set("moon", "unit")
		test.assertEqual(model.get("moon"), "unit")
		test.assertEqual(model.get("moon", "goon"), "unit")
		test.assertEqual(receivedEvents.length, 2)
		test.assertEqual(receivedEvents[0].eventName, "changed:moon")
		test.assertEqual(receivedEvents[1].eventName, "changed")
		model.setBatch({
			"dink": "donk",
			"pink": "punk"
		})
		test.assertEqual(model.get("dink"), "donk")
		test.assertEqual(model.get("pink"), "punk")
		test.assertEqual(receivedEvents.length, 5)
		test.assertEqual(receivedEvents[2].eventName, "changed:dink")
		test.assertEqual(receivedEvents[3].eventName, "changed:pink")
		test.assertEqual(receivedEvents[4].eventName, "changed")
		model.set("dink", "donk")
		test.assertEqual(receivedEvents.length, 5) // Set to same value, should trigger no events

		model.set("flowers", [{ petals: 5 }, { petals: 6 }])
		test.assertInstanceOf(model.get("flowers"), FlowersCollection)
		let flowerCount = 0
		for(let flower of model.get("flowers")){
			flowerCount++
		}
		test.assertEqual(flowerCount, 2)

		model.set("subModel", new k.DataModel({ mesmer: "scout" }))
		test.assertInstanceOf(model.get("subModel"), k.DataModel)
		test.assertEqual(model.get("subModel").get("mesmer"), "scout")
		model.set("subModel", { cheese: "tall" })
		test.assertInstanceOf(model.get("subModel"), k.DataModel)
		test.assertEqual(model.get("subModel").get("cheese"), "tall")
		test.assertEqual(model.get("subModel").get("mesmer"), null)

		receivedEvents.length = 0
		model.increment("pageCount") // Creates the field since it doesn't exist
		test.assertEqual(model.get("pageCount"), 1)
		test.assertEqual(receivedEvents.length, 2)
		test.assertEqual(receivedEvents[0].eventName, "changed:pageCount")
		receivedEvents.length = 0
		model.increment("pageCount", -2)
		test.assertEqual(model.get("pageCount"), -1)
		test.assertEqual(receivedEvents.length, 2)
		test.assertEqual(receivedEvents[0].eventName, "changed:pageCount")
		model.increment("pageCount", 10)
		test.assertEqual(model.get("pageCount"), 9)
	}))
	kTest.K_TESTS.push(new kTest.Test("DataCollection", (test) => {
		let col1 = new k.DataCollection()
		let receivedEvents = []
		col1.addListener((eventName, target, ...params) => { 
			receivedEvents.push({ eventName: eventName, target: target, params: params })
		})
		test.assertEqual(col1.length, 0)

		let model1 = new k.DataModel({ foo: "bar" })
		col1.add(model1)
		test.assertEqual(receivedEvents.length, 1)
		test.assertEqual(receivedEvents[0].eventName, "added")
		test.assertEqual(col1.length, 1)
		test.assertEqual(col1.at(0).get("foo"), "bar")

		receivedEvents.length = 0
		col1.remove(model1)
		test.assertEqual(receivedEvents.length, 1)
		test.assertEqual(receivedEvents[0].eventName, "removed")
		test.assertEqual(col1.length, 0)
		col1.remove(model1)
		test.assertEqual(receivedEvents.length, 1)
		test.assertEqual(col1.length, 0)

		receivedEvents.length = 0
		col1.addBatch([
			new k.DataModel({ id: 1 }),
			new k.DataModel({ id: 2 }),
			new k.DataModel({ id: 3 }),
			new k.DataModel({ id: 4 })
		])
		test.assertEqual(receivedEvents.length, 4)
		for(var event in receivedEvents){
			test.assertEqual(event.eventName, "removed")
		}

		receivedEvents.length = 0
		col1.reset([{ id:10 }, { id:11 }])
		test.assertEqual(receivedEvents[0].eventName, "removed")
		test.assertEqual(receivedEvents[1].eventName, "removed")
		test.assertEqual(receivedEvents[2].eventName, "removed")
		test.assertEqual(receivedEvents[3].eventName, "removed")
		test.assertEqual(receivedEvents[4].eventName, "added")
		test.assertEqual(receivedEvents[5].eventName, "added")
		test.assertEqual(receivedEvents[6].eventName, "reset")
	}))
	kTest.K_TESTS.push(new kTest.Test("SynchronousFetch", 
		(test) => {
			kTest.SynchronousFetchMap.set("foo", { foo:"bar"})
			var thenCount = 0
			fetch("foo").then(r => r.json()).then(data => {
				thenCount += 1
				test.assertEqual(data.status, 200)
				test.assertEqual(data.foo, "bar")
			}).catch(() => {
				throw new Error("Should not have caught on this promise.")
			})

			fetch("bogus").then(r => r.json()).then(data => {
				thenCount += 1
				test.assertEqual(data.status, 404)
			}).catch(() => {
				throw new Error("Should not have caught on this promise.")
			})
			test.assertEqual(thenCount, 2) // Make sure we reached the then functions
		},
		(test) => {
			this.originalFetch = window.fetch
			window.fetch = kTest.synchronousFetch
			kTest.SynchronousFetchMap.clear()
		},
		(test) => {
			window.fetch = this.originalFetch
		}
	))
	kTest.K_TESTS.push(new kTest.Test("DOM manipulation", (test) => {
		let el1 = k.el.div()

		// Add and remove classes
		test.assertType(el1.removeClass, "function")
		test.assertType(el1.addClass, "function")
		test.assertEqual(el1.addClass("foo").nodeType, 1)
		test.assertEqual(el1.getAttribute("class"), "foo")
		el1.addClass("bar")
		test.assertEqual(el1.getAttribute("class"), "foo bar")
		test.assertEqual(el1.removeClass("foo").nodeType, 1)
		test.assertEqual(el1.getAttribute("class"), "bar")
		el1.removeClass("bar")
		test.assertEqual(el1.getAttribute("class"), null) // Removing the last class removes the attribute

		el1.addClass("blinz")
		el1.addClass("batz")
		test.assertEqual(el1.getAttribute("class"), "blinz batz")
		el1.removeClass("batz")
		test.assertEqual(el1.getAttribute("class"), "blinz")

		let el2 = k.el.span().appendTo(el1)
		test.assertEqual(el1.children.length, 1)
		test.assertEqual(el1.children[0], el2)

		let el3 = k.el.div({ foo:"bar" }, "Howdy", k.el.span("Moo"))
		test.assertEqual(el3.childNodes[0].text, "Howdy")
		test.assertEqual(el3.getAttribute("foo"), "bar")
		test.assertEqual(el3.children[0].innerText, "Moo")
	}))
	kTest.K_TESTS.push(new kTest.Test("Component", (test) => {
		let component1 = new k.Component()
		component1.el = document.createElement("bogus")
		test.assertEqual(component1.el.tagName.toLowerCase(), "bogus")

		let fooSpan = k.el.span("Mooo", { foo:"bar" }, k.el.p({ blatz:"biz" }, "flowers")).appendTo(component1.el)
		component1.el.appendChild(fooSpan)
		test.assertEqual(fooSpan.getAttribute("foo"), "bar")
		test.assertNotEqual(fooSpan.innerHTML.indexOf("blatz=\"biz\""))

		component1 = k.el.div()
		component1.append("Foo")
		test.assertEqual(component1.innerHTML, "Foo")
		component1.append({ bling:"ring" })
		test.assertEqual(component1.getAttribute("bling"), "ring")

		class C1 extends k.Component {
			constructor(dataObject, options){
				super(dataObject, options)
				this.fooEl = k.el.div().appendTo(this.el)
				this.bindText("foo", this.fooEl)
				this.burfEl = k.el.div().appendTo(this.el)
				this.bindText("burf", this.burfEl, (value) => { 
					return (value ? value : "nothing") + " and more!"
				})
				this.bindAttribute("blart", this.el, "bluez")
			}
		}

		let model1 = new k.DataModel({ foo:"bar", blart:"binz" })
		let c2 = new C1(model1, { bibim:"bap" })
		test.assertEqual(c2.fooEl.innerHTML, "bar")
		test.assertEqual(c2.burfEl.innerHTML, "nothing and more!")
		test.assertEqual(c2.el.getAttribute("bluez"), "binz")

		model1.set("foo", "biz")
		test.assertEqual(c2.fooEl.innerHTML, "biz")
		model1.set("foo", null)
		test.assertEqual(c2.fooEl.innerHTML, "")
		model1.set("foo", 23)
		test.assertEqual(c2.fooEl.innerHTML, "23")

		model1.set("burf", "sugar")
		test.assertEqual(c2.burfEl.innerHTML, "sugar and more!")

		model1.set("blart", "floop")
		test.assertEqual(c2.el.getAttribute("bluez"), "floop")
		c2.cleanup()
	}))
	kTest.K_TESTS.push(new kTest.Test("Router", (test) => {
		let router = new k.Router()
		let receivedEvents = []
		router.addListener((eventName, target, ...params) => {
			receivedEvents.push({ eventName: eventName, target:target, params:params })
		})
		router.addRoute(/^$/, "splash", { foo: "bar" }, "tinkle")
		router.addRoute(/^tos$/, "terms-of-service")
		router.addRoute(/^blog\/([0-9]+)$/, "blog", { hello:"nurse" })
		router.addRoute(/^blog\/([0-9]+)\/post\/([0-9a-zA-Z]+)$/, "post")
		test.assertEqual(receivedEvents.length, 0)

		router.start()
		test.assertEqual(receivedEvents.length, 1)
		test.assertEqual(receivedEvents[0].eventName, "splash")
		test.assertEqual(receivedEvents[0].params[0].foo, "bar")

		receivedEvents.length = 0
		router._handleNewPath("bogus")
		test.assertEqual(receivedEvents.length, 1)
		test.assertEqual(receivedEvents[0].eventName, k.Router.UnknownRouteEvent)
		test.assertEqual(receivedEvents[0].params.length, 0)

		receivedEvents.length = 0
		router._handleNewPath("blog/23")
		test.assertEqual(receivedEvents.length, 1)
		test.assertEqual(receivedEvents[0].eventName, "blog")
		test.assertEqual(receivedEvents[0].params[0], "23")
		test.assertEqual(receivedEvents[0].params[1].hello, "nurse")

		receivedEvents.length = 0
		router._handleNewPath("blog/23/post/alphaZ")
		test.assertEqual(receivedEvents.length, 1)
		test.assertEqual(receivedEvents[0].eventName, "post")
		test.assertEqual(receivedEvents[0].params[0], "23")
		test.assertEqual(receivedEvents[0].params[1], "alphaZ")

		router.cleanup()
	},
	() => {
		document.location.hash = ""
	},
	() => {
		document.location.hash = ""
	}))

	kTest.runAndLog()
}

