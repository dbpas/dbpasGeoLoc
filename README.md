dbpasGeoLoc
===========

HTML5 Geolocation

###Overview
Retrieves user's location using HTML Geolocation and Google Maps Geocoder.

[Demo](http://dbpas.github.io/dbpasGeoLoc/)

###Install
```html
<head>
  ...
  <script src="javascripts/dbpas.geoloc.js"></script>
  <script>
    dbpasGeoLoc.init({options}, function() {
      document.addEventListener('onDbpasGeoLoc', function(e) {
        var location = e.detail;
        //do something with the location data
      }, false);
    });
  </script>
  ...
</head>
```

###Options
####Default
|Option               |Description                                                     |Type      |Default |
|---------------------|----------------------------------------------------------------|----------|--------|
|`debug`              |Enable console logging.                                         |`boolean` |false   |
|`resultsLevel`       |Google Geocoder results accuracy, lower=more specific location. |`int`     |0       |
|`enableHighAccuracy` |HTML Geolocation accuracy.                                      |`boolean` |false   |
|`maximumAge`         |HTML Geolocation cache age, in milliseconds.                    |`int`     |60000   |
|`timeout`            |HTML Geolocation timeout, in milliseconds.                      |`int`     |15000   |
|`localStoreAge`      |HTML Local Storage cache age, in milliseconds.                  |`int    ` |300000  |
|`apiKey`             |Google Maps API key.                                            |`string`  |        |

###Tips
