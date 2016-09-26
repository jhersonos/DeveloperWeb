;(function (){
	
	let sticky	=	false
	let currentPosition = 0
	const imageCounter= parseInt($("[data-name='image-counter']").attr("content"))
	const correo = "jherson.o.s@hotmail.com"

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
	function sendForm($form){
		$.ajax({
		    url: $form.attr("action"), 
		    method: "POST",
		    data: $form.formObject(),
		    dataType: "json",
		    success:function(){
		    	alert("Todo salio bien")
		    }
		})
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

//function for swicht of input
	$(selector).find(".input").on("change",(ev)=>{
		let $input = $(ev.target)

		let $next_step = $input.parent().next(".step")
		//console.log($next_step)

		if ($next_step.length > 0) {
			enfocar_nuevo_paso($next_step)
		}else{
			console.log("holas")
			validation_form()
		}
	})
		//Helpers
	function validation_form(){
		if (is_valide()) {
			console.log("es valido!")
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
	}
/*************************************************************************************************************
*																											 *
*	Otro archivo js													 										 *
*                          																					 *
*************************************************************************************************************/
//Function for points the form
$('.path-step').on("click",(ev)=>{
	$(".path-step.active").removeClass("active")
	$(ev.target).addClass("active")
})

})()