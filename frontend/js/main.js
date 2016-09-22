;(function (){
	
	let sticky	=	false

	$(window).scroll(()=>{
		const inBottom = isInBottom()
	
		if (inBottom && !sticky) {
			sticky = true
			stickNavigation()
		}else if(!inBottom && sticky){
			sticky = false
			unstickNavigation()
		}
	})
	function stickNavigation(){
		$("#description").addClass("fixed").removeClass("absolute")
		$("#navigation").slideUp()
		$("#sticky-navigation").removeClass("hidden")
		$("#sticky-navigation").slideDown()
	}
	function unstickNavigation(){
		$("#description").removeClass("fixed").addClass("absolute")
		$("#navigation").slideDown()
		$("#sticky-navigation").slideUp("hidden")
	}

	function isInBottom(){
		const $description = $("#description")
		const descriptionHeight=$description.height()
		return $(window).scrollTop() > $(window).height()-descriptionHeight
	}
})()