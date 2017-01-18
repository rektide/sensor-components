"use strict"
var BaseSensor= require( "./base")

class MagnetometerComponent extends BaseSensor{
	constructor(){
		super( BaseSensor.sensorBuilder( Magnetometer))
	}
}

if(typeof customElements !== "undefined" && customElements.define){
	customElements.define("Magnetometer", MagnetometerComponent)
}
if(typeof module !== "undefined"){
	module.exports= MagnetometerComponent
	module.exports.default= MagnetometerComponent
	module.exports.MagnetometerComponent= MagnetometerComponent
}
