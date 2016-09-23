$.fn.formObject = function() {

  var form = {}
  $.each($(this).serializeArray(), (i, field)=> {
    form[field.name] = field.value || ""
  })

  return form
}