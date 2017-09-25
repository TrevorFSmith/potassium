import Component from './Component.js'
import DataCollection from './DataCollection.js'
import DataModel from './DataModel.js'
import DataObject from './DataObject.js'
import El from './El.js'
import Router from './Router.js'
import EventListener from './EventListener.js'
import EventMixin from './EventMixin.js'

let k = {}

k.Component = Component
k.DataCollection = DataCollection
k.DataModel = DataModel
k.el = El
k.Router = Router
k.EventListener = EventListener
k.EventMixin = EventMixin

window.k = k
