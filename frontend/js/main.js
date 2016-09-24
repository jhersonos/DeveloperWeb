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
	/*Otro archivo js*/
	const selector = "#contacto"
	$(".step:nth-child(1)").addClass("active")


	$(selector).find(".input").on("change",(ev)=>{
		let $input = $(ev.target)

		let $next_input = $input.next()

		enfocar_nuevo_paso($next_input)
	})
		//Helpers
	function validation_form(){

	}
	function is_valide(){

	}
	function enfocar_nuevo_paso($next_input){
		$next_input.focus()
	}

})()