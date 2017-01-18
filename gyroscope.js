"use strict"
var BaseSensor= require( "./base")

class GyroscopeObservable extends BaseSensor{
	constructor(){
		super( BaseSensor.sensorBuilder( Gyroscope))
	}
}

if(typeof customElements !== "undefined" && customElements.define){
	customElements.define("Gyroscope", GyroscopeComponent)
}
if(typeof module !== "undefined"){
	module.exports= GyroscopeComponent
	module.exports.default= GyroscopeComponent
	module.exports.GyroscopeComponent= GyroscopeComponent
}
