/* eslint-disable */

var GReduce = function(){
	var ACCEL_THRES = 10;

	var D_THROWING = 1;
	var D_RETREATING = 0;

	var T_ASC = 1;
	var T_DSC = 0;

	var currentDirection; // 1 throw + 1 retreat => 1 score
	var currentTrend; // 1 up of ACCEL_THRES + 1 down of ACCEL_THRES in acceleration => 1 throw OR 1 punch
	var currentAccel;
	var count;
	var track; // recorded track
	setDefaultValues();

	var callback = function(){};

	function tFlip(){
		if(currentTrend == T_ASC){ // if currentTrend is ascending and it goes decending, nothing special
			currentTrend = T_DSC;
		} else { // if currentTrend is decending and it goes ascending, it is a change between D_THROWING and D_RETREATING
			currentTrend = T_ASC;
			dFlip();
		}
	}

	function dFlip(){
		if(currentDirection == D_THROWING){ // from throwing back to retreating results in 1 score
			currentDirection = D_RETREATING;
			count++;
			callback(null, count, currentAccel);
		} else {
			currentDirection = D_THROWING;
		}
	}

	function setDefaultValues(){
		currentDirection = D_THROWING;
		currentTrend     = T_ASC;
		currentAccel     = 0;
		count            = 0;
		track            = [];
	}


	// ---------------
	//     Exports
	// ---------------

	this.reset = setDefaultValues;

	this.getCount = function(){
		return count;
	}

	this.getTrack = function(){
		return track;
	}

	this.setCallback = function(fn){
		callback = fn;
	}

	this.setAccelThres = function(accelThres){
		ACCEL_THRES = accelThres;
	}

	this.digest = function(data){
		var _x, _y, _z;

		if(Array.isArray(data)){
			_x = data[0];
			_y = data[1];
			_z = data[2];
		} else { // gyronorm data object
			_x = data.dm.x;
			_y = data.dm.y;
			_z = data.dm.z;
		}

		track.push([_x, _y, _z]);

		var netAccel = Math.sqrt(_x * _x + _y * _y + _z * _z);
		var accelDelta = netAccel - currentAccel;
		if((currentTrend == T_ASC && accelDelta > 0) || (currentTrend == T_DSC && accelDelta < 0)){ // still following the trend
			currentAccel = netAccel;
			return;
		}
		if((currentTrend == T_ASC && accelDelta < -ACCEL_THRES) || (currentTrend == T_DSC && accelDelta > ACCEL_THRES)){
			currentAccel = netAccel;
			tFlip();
			return;
		}
	}
}

if(typeof module !== 'undefined') module.exports = GReduce;
