// Password
let checkPass = prompt("Type in the password:")
if(checkPass === null || encryptPass(checkPass)!="302AED326AED305AED122AED125AED128AED131AED"){
    alert("Wrong password. Redirecting...")
    window.location.replace("https://pobmetmunc.github.io/site/index.html")
}



// Add Styling for button click
$(".program-button").click(function(){
  $(".program-button").removeClass("program-button-active");
  $(this).addClass("program-button-active")
})
// bootstrap "widget" divs class presets
let smallWidgetSize = "col-lg-3 col-md-12 col-sm-12 widget-container"
let normalWidgetSize = "col-lg-6 col-md-12 col-sm-12 widget-container"
let mediumWidgetSize = "col-lg-9 col-md-12 col-sm-12 widget-container"
let largeWidgetSize = "col-12 widget-container"
// hide upon page load
$("#container-moderated-caucus").hide()
$("#container-voting-procedure").hide()
$("#container-speaker-list-crisis").hide()
// switching between buttons
$("#btn-spk").click(function(){
  $(".widget-container").hide()
  $("#container-timer").show()
  $("#container-speaker-list").show()
  $("#container-timer").attr("class", normalWidgetSize)
  $(".section-header").html(`Speaker's List`)
})
$("#btn-mod").click(function(){
  $(".widget-container").hide()
  $("#container-timer").show()
  $("#container-timer").attr("class", mediumWidgetSize)
  $("#container-moderated-caucus").show()
  $(".section-header").html(`Moderated Caucus: <span contentEditable style="font-style: italic; color: black">Topic</span>`)
})
$("#btn-unmod").click(function(){
  $(".widget-container").hide()
  $("#container-timer").show()
  $("#container-timer").attr("class", largeWidgetSize)
  $(".section-header").html(`Unmoderated Caucus: <span contentEditable style="font-style: italic; color: black">Topic</span><br><br>`)
})
$("#btn-voting").click(function(){
  $(".widget-container").hide()
  $("#container-voting-procedure").show()
  $(".section-header").html(`Voting Procedure: <span contentEditable style="font-style: italic; color: black">Resolution _</span><br><br>`)
})
$("#btn-crisis").click(function(){
  $(".widget-container").hide()
  $("#container-timer").show()
  $("#container-timer").attr("class", normalWidgetSize)
  $("#container-speaker-list-crisis").show()
  $(".section-header").html(`<i style="color:#a1483a" class="fas fa-exclamation-triangle"></i> Crisis: <span contentEditable style="font-style: italic; color: black">!!!</span><br>`)
})

function encryptPass(e){
  let input = e.split("")
  let output = ""
  let qwep = 0;
  input.forEach(function(element){
    let num = element.charCodeAt(0)
    if(num < 10){
      output += element.charCodeAt(0) + 11
      qwep++
    }
    else if(num < 30){
      output += element.charCodeAt(0)*2
      qwep *= -1
    }
    else{
      output += element.charCodeAt(0)*3 - 25
      qwep = Math.floor(qwep/2)
    }
    if(qwep > 0){
      if(len(output) < 50){
        output += "LLC"
      }
      else{
        output += "LAC"
      }
    }
    else{
      output += "AED"
    }
  })
  return output
}
