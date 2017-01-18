"use strict"

var
  Defer= require( "observable-defer"),
  privateState= new WeakMap()

class BaseSensorElement extends HTMLElement{
	static get observedAttributes(){ return [ "frequency"]}
	static optionsBuilder( el){
		var options= {}
		for(var i in this.attributes){
			var attr= this.attributes[ i]
			options[ attr.name]= attr.value
		}
		if( options.frequency){
			var hz= Number.parseFloat( options.frequency)
			if( hz){
				options.frequency= hz
			}
		}
		return options
	}
	static sensorBuilder( sensorConstructor){
		return function( el){
			return new sensorConstructor( BaseSensor.optionsBuilder( el))
		}
	}

	constructor( builder){
		super()
		var state= {
			builder,
			defer: Defer(),
			sensor: null,
			onchange: ( e)=> privateState.get( this).defer.next( e)
		}
		privateState.set( this, state)

		this.observable= state.defer.observable
		this.observable.onObserved= ()=> {
			var
			  state= privateState.get( this),
			  sensor= state.sensor
			if( sensor&& sensor.state=== "idle"){
				sensor.start()
			}
			state.observed= true
		}
	}
	attributeChangedCallback(){
		var
		  state= privateState.get( this),
		  sensor= this.sensor
		if( sensor){
			sensor.stop()
			if( sensor.onchanged== state.onchanged){
				sensor.onchanged= null
			}
		}
		sensor= this.sensor= state.builder( this, state)
		if( !sensor.onchange){
			sensor.onchange= state.onchange
		}
		if( state.observed){
			sensor.start()
		}
	}
	connectedCallback(){
		this.attributeChangedCallback()
	}
}

if( typeof module!== "undefined"){
	module.exports= BaseSensorElement
	module.exports.default= BaseSensorElement
	module.exports.BaseSensorElement= BaseSensorElement
}
