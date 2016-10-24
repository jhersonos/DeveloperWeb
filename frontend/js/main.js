if (navigator.serviceWorker) {
	navigator.serviceWorker.register("sw.js")
}

;(function (){
	
	/*********menu responsive***********/
	$("#menu-opener").on("click",toggleNav)
	$("#menu-link").on("click",toggleNav)

	/***********************************/
	let sticky	=	false
	let currentPosition = 0
	const imageCounter= parseInt($("[data-name='image-counter']").attr("content"))
	const correo = "jherson.o.s@hotmail.com"
/*******inicialiti function onload*********/	
	checkScroll()
	isOpen()
/******************************/	
	$("#contacto").on("submit",function(ev){
		ev.preventDefault()

		sendForm($(this))

		return false
	})

	setInterval(()=>{
		if (currentPosition<imageCounter){
			currentPosition++
		}else{
			currentPosition=0
		}
		
		$("#gallery .inner").css({left:"-"+currentPosition*100+"%"})
	},4000)

	$(window).scroll(()=>{
		checkScroll()
	})
	function checkScroll(){
		const inBottom = isInBottom()
	
		if (inBottom && !sticky) {
			sticky = true
			stickNavigation()
		}else if(!inBottom && sticky){
			sticky = false
			unstickNavigation()
		}
	}
	function isOpen(){
		//reloj - 24 horas
		let date = new Date()
		const current_hour = date.getHours()
		if (current_hour < 17 || current_hour > 23) {
			$("#is-open .text").html("Cerrado ahora <br> abierto de 5pm a 11pm")
		}
	}

	function toggleNav(){
		$("#responsive-nav ul").toggleClass("active")
		$("#menu-opener").toggleClass("glyphicon-menu-hamburger")
	}
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

/*************************************************************************************************************
*																											 *
*	Otro archivo js													 										 *
*                          																					 *
*************************************************************************************************************/	
	
	const selector = "#contacto"
	//$(".step:nth-child(1)").addClass("active")
	//937810936 <- Patron
	//function for swicht of input
	$(selector).find(".input").on("change",(ev)=>{
		const $input = $(ev.target)

		const $next_step = $input.parent().next(".step")

		const is_form_valid = is_valide()
		if (!is_form_valid && $next_step.length > 0) {
			enfocar_nuevo_paso($next_step)
		}else{
			validation_form()
		}
		//console.log($next_step)

	})
	//listener text area
	$(".step textarea").on("keydown",(ev)=>{
		if (ev.keyCode == 13){
			ev.preventDefault()
			$(ev.target).blur()
			console.log("se ejecuto correctamente")
		}
	})
		//Helpers
	function validation_form(){
		if (is_valide()) {
			sendForm()
		}{
			let $field_invalido = $(selector).find(".input:invalid").first().parent()
			enfocar_nuevo_paso($field_invalido)
		}
	}
	function is_valide(){
		return document.querySelector(selector).checkValidity()
	}
	function enfocar_nuevo_paso($next_step){
		$('.step.active').removeClass('active')
		$next_step.addClass("active")
		$next_step.focus()
		// coordinar circle con los pasos
		const posicion = ($next_step.index(".step")) + 1
		$(".path-step.active").removeClass("active")
		const $circle = $(".path-step:nth-child("+posicion+")")
		focus_circle($circle)
	}
	function focus_circle($circle){
		$(".path-step.active").removeClass("active")
		$circle.addClass("active")
	}
/*************************************************************************************************************
*																											 *
*	Otro archivo js													 										 *
*                          																					 *
*************************************************************************************************************/
//send form
	function sendForm(){
		const $form = $(selector)
		$.ajax({
		    url: $form.attr("action"), 
		    method: "POST",
		    data: $form.formObject(),
		    dataType: "json",
		    success:function(){
		    	$form.slideUp()
		    	$("#info-contact").html("Enviamos tu mensaje, pronto nos pondremos en contacto contigo")
		    }
		})
	}

//Function for points the form
$('.path-step').on("click",(ev)=>{
	const $current_circle = $(ev.target)

	focus_circle($current_circle)

	const posicion = $current_circle.index(".path-step") + 1
	let $test=$(".step:nth-child("+posicion+")")
	//mostrar el index de current circle
	//console.log($current_circle.index(".path-step"))
	enfocar_nuevo_paso($test)
})


})()