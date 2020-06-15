var map;
var markers=[];
var infoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
        lat:9090,
        lng:898,
    },
    zoom: 7
  });

  infoWindow = new google.maps.InfoWindow();
  displayStores(cities);
  showPlaceMarker(cities);
}


function displayStores(cities){

  var selectedCity ='malaysia'
  var city=''
  cities.forEach((c)=>{
    console.log(c.name)
    if(selectedCity === c.name){
      city = c
      console.log(city)
    }  
  })

  // console.log(cities[2])
    var storesHtml=""
    // city=cities[0].paris
    // console.log(city)
    cityPlace = city.places
    console.log(cityPlace)
    cityPlace.forEach((place,index)=>{
      console.log(place)
         var name = place.name
      storesHtml += `
      <div class="store-container">
      <div class="store-container-background>
          <div class="store-info-container">
              <div class="store-address">
                 
                <span><i class="fa fa-map-marker" aria-hidden="true"></i>${name}</span>
                <h4><a target="_blank" href="https://www.google.com/maps/dir/?api=1&destination=${name}&travelmode=bicycling">${name}</a></h4>
              </div>
          
          </div>

          <div class="store-number-container">
              <div class="store-count">${index + 1}</div>
          </div>
          </div>
      </div> `
    })

    document.querySelector('.stores-list').innerHTML=storesHtml

  }

  function createMarker(latlng, name) {
    var html = "<b>" + name + "</b> <br/>" ;
    var marker = new google.maps.Marker({
      map: map,
      position: latlng
    });
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(html);
      infoWindow.open(map, marker);
    });
    markers.push(marker);
  }

  function showPlaceMarker(cities){
    var bounds = new google.maps.LatLngBounds()
  
    var selectedCity ='malaysia'
    var city=''
    cities.forEach((c)=>{
      console.log(c.name)
      if(selectedCity === c.name){
        city = c
        console.log(city)
      }  
    })

    cityPlace = city.places
    cityPlace.forEach((place,index)=>{
      var latlng = new google.maps.LatLng(
        place.coordinates.latitude,
        place.coordinates.longitude
        );
        var name = place.name 
        bounds.extend(latlng)
        createMarker(latlng,name)
    })
    map.fitBounds(bounds);
  }