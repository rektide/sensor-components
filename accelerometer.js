"use strict"
var BaseSensor= require( "./base")

class AccelerometerComponent extends BaseSensor{
	static get observedAttributes(){ return super.observedAttributes.concat( "includeGravity")}
	constructor(){
		super( BaseSensor.sensorBuilder( Accelerometer))
	}
}

if(typeof customElements !== "undefined" && customElements.define){
	customElements.define("Accelerometer", AccelerometerComponent)
}
if(typeof module !== "undefined"){
	module.exports= AccelerometerComponent
	module.exports.default= AccelerometerComponent
	module.exports.AccelerometerComponent= AccelerometerComponent
}
