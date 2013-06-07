var dbpasGeoLoc = {
  config: {
		debug: false,                          //enable logging
		resultsLevel: 0,                       //google geocoder result item (lower=more specific location)
		enableHighAccuracy: false,             //geo location accuracy
		maximumAge: 60000,                     //geo location position cache
		timeout: 15000,                        //geo location timeout
		localStoreAge: 300000,                 //local storage position cache
		apiKey: ''                             //google maps api key
	},
	_complete: null,                         //geoloc event
	_location: {},                           //geoloc location data
		
	_extendObj: function(orig, ext) {
		for (var key in ext) {
			if (ext.hasOwnProperty(key)) {
				orig[key] = ext[key];
			}
		}
	},
		
	_setup: function(arg1, arg2) {
		if (arg1 && typeof arg1 === 'function') {      //callback w/ no config
			arg1();
		}else{
			if (arg1 && typeof arg1 === 'object') {      //config with possible callback
				this._extendObj(this.config, arg1);
				if (arg2 && typeof arg2 === 'function') {
					arg2();
				}
			}
		}
	},
	
	_log: function(notice) {
		if (this.config.debug) {
			console.log(notice);
		}
	},
		
	_createEvent: function() {
		this._complete = document.createEvent('Event');
		this._complete.initEvent('onDbpasGeoLoc', false, true);
		this._complete.detail = this._location;                  //make geoloc object available to event listener callback
		this._log('dbpasGeoLoc event created.');
	},
		
	_dispatchEvent: function() {
		this._log('dbpasGeoLoc event triggered.');
		document.dispatchEvent(this._complete);
	},
		
	_wrapUp: function(data) {
		this._localStoreData(this._location);                    //store our geoloc object in local storage
		this._log('Geo Location complete.');
		this._dispatchEvent();                                   //notify event process is finished
	},
		
	_localStoreData: function(data) {
		if (typeof Storage !== 'undefined') {
			localStorage.setItem('dbpasGeoLoc', JSON.stringify(data));
		}else{
			this._log('Local Storage not supported.');
		}
	},
		
	_getLocalStore: function() {
		if (typeof Storage !== 'undefined') {
			if (typeof localStorage.dbpasGeoLoc !== 'undefined') {
				this._location = JSON.parse(localStorage.dbpasGeoLoc);
			}else{
				this._log('No previous data in Local Storage.');
			}
		}else{
			this._log('Local Storage not supported.');
		}
	},
		
	_data: function(key, data) {
		this._location[key] = {
			'long_name': data.long_name,
			'short_name': data.short_name,
			'types': data.types
		};
	},
		
	_getData: function(that) {
		that._log('Geo Location started.');
		navigator.geolocation.getCurrentPosition(function(position) {                                //get html geolocation and pass it to google api
			var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
				geocoder = new google.maps.Geocoder();
			geocoder.geocode({'latLng':latLng}, function(results, status) {                            //process google reverse geocoding results
				if (status == google.maps.GeocoderStatus.OK) {
					//https://developers.google.com/maps/documentation/geocoding/#ReverseGeocoding
					//results go from specific to less specific
					results[that.config.resultsLevel].address_components.forEach(function(addressItem) {   //address item
						addressItem.types.forEach(function(detail) {                                         //get address item type so we can key the address item in our object
							if (detail != 'political') {                                                       //ignore political, not unique but can be referenced in our object's types array
								that._log(detail + ': ' + addressItem.long_name);
								that._data(detail, addressItem);                                                 //store data in our geoloc object
							}
						});
					});
					that._location.timestamp = new Date();                                                 //timestamp location data
					that._wrapUp();
				}else{
					that._log('Google Geocoder failed. (' + status + ')');
				}
			});
		}, function(e) {
			that._log('Geo Location failed. (' + e.message + ')');
		}, { //geo location parameters
			enableHighAccuracy: that.config.enableHighAccuracy,
			maximumAge: that.config.maximumAge,
			timeout: that.config.timeout
		});
	},
		
	_googleApi: function() {
		//using callback removes need for google loader or jquery loader by insuring the google is
		//complete before trying to use it
		var script = document.createElement('script'),
			src = 'http://maps.google.com/maps/api/js?key=' + this.config.apiKey + '&sensor=true&callback=dbpasGeoLoc.googleCallBack';
		script.src = src;
		document.getElementsByTagName('head')[0].appendChild(script);
	},
	
	googleCallBack: function() {
		this._getData(this);                                  //get data from google geocoder
	},
	
	init: function(arg1, arg2) {
		this._setup(arg1, arg2);                              //setup config and callback
		this._log('*dbpasGeoLoc*');
		if (navigator.geolocation) {                          //html5 geolocation enabled
			this._getLocalStore();
			this._createEvent();                                //create geoloc event to notify when process finished
			if (typeof this._location.timestamp === 'undefined' || (new Date - new Date(this._location.timestamp)) > this.config.localStoreAge) {
				this._googleApi();                                //add google maps api to document
			}else{
				this._log('Geo Location retrieved from Local Storage.');
				this._wrapUp();
			}
		}else{
			this._log('Geo Location not supported.');
		}
	}
		
};
