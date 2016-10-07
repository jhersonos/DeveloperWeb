/*************************************************************************************************************
*																											 *
*	Google Maps js													 										 *
*                          																					 *
*************************************************************************************************************/
;(function (){
	google.maps.event.addDomListener(window,"load",()=>{

		class UserLocation{
			static get(callback){
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition((location)=>{
					callback({
						lat:location.coords.latitude,
						lng:location.coords.longitude
						})
					})
				}
				else{
					alert("No pudimos detectar el lugar en el que te encuentras ")
					
				}
			}
		}

		const my_place = {
					lat:-12.114186,
					lng:-77.044398
				}
		const map = new google.maps.Map(
			document.getElementById('map'),
			{
				center:my_place,
				zoom:15
			}
			)
		const marker = new google.maps.Marker({
			map:map,
			position:my_place,
			title:"Restaurante Facilito",
			visible: true
		})
		UserLocation.get((coords)=>{
			//calcular distancia del cliente y restaurant
			let origen = new google.maps.LatLng(coords.lat,coords.lng)	//LatLng
			let destino = new google.maps.LatLng(my_place.lat,my_place.lng)

			let service = new google.maps.DistanceMatrixService()

			service.getDistanceMatrix({
				origins:[origen],
				destinations: [destino],
				travelMode: google.maps.TravelMode.DRIVING
			},(response,status)=>{
				if (status == google.maps.DistanceMatrixStatus.OK) {
					const duration_element = response.rows[0].elements[0]
					//get value of duration in object response
					const duration_viaje = duration_element.duration.text
					//print message of time, home to restaurant
					document.querySelector("#message")
						.innerHTML	=	`
							Estás a ${duration_viaje} de una noche inolvidable en 
							<span class="dancing-script medium">Restaurante Facilito</span>
						`
					//show object and values response	
					//console.log(duration_element)
				}	
			})
		})
	})
})()