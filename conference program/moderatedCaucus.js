let firstWordClicked = false;
let lastWordClicked = false;
//auto expand with of proposer name Input
$("#input-mod").keydown(function(){
  let input = $(this).val()
  if(input.length > 8){
    if(input.length > 15){
      $(this).css("font-size", "16px")
    }
    else{
      $(this).css("width", (150+25*(input.length-8))+"px")
      $(this).css("font-size", "30px")
    }
  }
  else{
    $(this).css("width","150px")
  }
})
// when the first word is clicked
$("#first-word").click(function(){
  if(firstWordClicked==false){
    // if it has not been clicked
    firstWordClicked=true
    $(this).animate({
    backgroundColor:"#008DB9",
    color: "white",
    borderColor: "white"
  },400)

    if(lastWordClicked==true){
    $("#last-word").animate({
    backgroundColor:"white",
    color: "black",
    borderColor: "black"
  },400)
  }
  }
  else{
    // if it has been clicked
    firstWordClicked=false
    $(this).animate({
    backgroundColor:"white",
    color: "black",
    borderColor: "black"
  },400)

  }
})

$("#last-word").click(function(){
  if(lastWordClicked==false){
    // if it has not been clicked
    lastWordClicked=true
    $(this).animate({
    backgroundColor:"#008DB9",
    color: "white",
    borderColor: "white"
  },400)
    if(firstWordClicked==true){
    $("#first-word").animate({
    backgroundColor:"white",
    color: "black",
    borderColor: "black"
  },400)
  }
  }
  else{
    // if it has been clicked
    lastWordClicked=false
    $(this).animate({
    backgroundColor:"white",
    color: "black",
    borderColor: "black"
  },400)

  }
})
