"use strict";$.fn.formObject=function(){var i={};return $.each($(this).serializeArray(),function(n,e){i[e.name]=e.value||""}),i};
