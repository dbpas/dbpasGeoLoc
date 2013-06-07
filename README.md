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
|Option               |Description                                                     |Type      |Default |
|---------------------|----------------------------------------------------------------|----------|--------|
|`debug`              |Enable console logging.                                         |`boolean` |false   |
|`resultsLevel`       |Google Geocoder results accuracy, lower=more specific location. |`int`     |0       |
|`enableHighAccuracy` |HTML Geolocation accuracy.                                      |`boolean` |false   |
|`maximumAge`         |HTML Geolocation cache age, in milliseconds.                    |`int`     |60000   |
|`timeout`            |HTML Geolocation timeout, in milliseconds.                      |`int`     |15000   |
|`localStoreAge`      |HTML Local Storage cache age, in milliseconds.                  |`int    ` |300000  |
|`apiKey`             |Google Maps API key.                                            |`string`  |        |

###Results
When results (JSON) object is returned from Google Maps Geocoder, it could contain any of the items listed below. If the item is available, it has three components. They are `short_name`, `long_name` and `types[]`.
```javascript
dbpasGeoLoc.init({options}, function() {
  document.addEventListener('onDbpasGeoLoc', function(e) {
    var location = e.detail;
    console.log(location.locality.long_name + ' ' + location.administrative_area_level_1.short_name + ' ' + location.country.short_name);
  }, false);
});
```
- `post_box` indicates a specific postal box.
- `street_number` indicates the precise street number.
- `floor` indicates the floor of a building address.
- `room` indicates the room of a building address.
- `street_address` indicates a precise street address.
- `route` indicates a named route (such as "US 101").
- `intersection` indicates a major intersection, usually of two major roads.
- `political` indicates a political entity. Usually, this type indicates a polygon of some civil administration.
- `country` indicates the national political entity, and is typically the highest order type returned by the Geocoder.
- `administrative_area_level_1` indicates a first-order civil entity below the country level. Within the United States, these administrative levels are states. Not all nations exhibit these administrative levels.
- `administrative_area_level_2` indicates a second-order civil entity below the country level. Within the United States, these administrative levels are counties. Not all nations exhibit these administrative levels.
- `administrative_area_level_3` indicates a third-order civil entity below the country level. This type indicates a minor civil division. Not all nations exhibit these administrative levels.
- `colloquial_area` indicates a commonly-used alternative name for the entity.
- `locality` indicates an incorporated city or town political entity.
- `sublocality` indicates a first-order civil entity below a locality. For some locations may receive one of the additional types: sublocality_level_1 through to sublocality_level_5. Each sublocality level is a civil entity. Larger numbers indicate a smaller geographic area.
- `neighborhood` indicates a named neighborhood
- `premise` indicates a named location, usually a building or collection of buildings with a common name
- `subpremise` indicates a first-order entity below a named location, usually a singular building within a collection of buildings with a common name
- `postal_code` indicates a postal code as used to address postal mail within the country.
- `natural_feature` indicates a prominent natural feature.
- `airport` indicates an airport.
- `park` indicates a named park.
- `point_of_interest` indicates a named point of interest. Typically, these "POI"s are prominent local entities that don't easily fit in another category such as "Empire State Building" or "Statue of Liberty."

###Tips
