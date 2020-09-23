// Global Variables
let countTotal = 0;
let countFor = 0;
let countAgainst = 0;
let countAbstain = 0;
let emoji = "🌎";
let isSimple = false;
let isSuper = false;

$("#count-super-container").hide()
$("#count-simple-container").hide()
// Set Total Voters
$("#btn-set-total-voters").click(function(){
  countTotal = $("#input-set-total-voters").val()
  $("#count-total").html(countTotal)
  let simpleMajority = Math.ceil(parseInt(countTotal)/2)
  $("#count-simple").html(simpleMajority)
  let superMajority = Math.ceil(parseInt(countTotal)*2/3)
  $("#count-super").html(superMajority)
})

// toggle-votes
$("#toggle-votes").click(function(){
  let classList = $(this).attr("class")
  if(classList.includes("fa-toggle-on")){
    let isEmoji = $("#toggle-emoji").attr("class").includes("fa-toggle-on")
    $(".count").html( isEmoji ? emoji : "[?]");
  }
  else if(classList.includes("fa-toggle-off")){
     $("#count-for").html(countFor);
    $("#count-against").html(countAgainst);
    $("#count-abstain").html(countAbstain);
    $("#count-total").html(countTotal);
  }
})

// hide with emoji on click update
$("#toggle-emoji").click(function(){
  let classList = $(this).attr("class")
  let isVoteHidden = $("#toggle-votes").attr("class").includes("fa-toggle-on")
  if(classList.includes("fa-toggle-on") && isVoteHidden){
    $(".count").html(emoji)
  }
  else{
    if(isVoteHidden == true){
      $(".count").html("[?]")
    }
  }
})
// toggle simple and super majorities
$("#toggle-simple-majority").click(function(){
  if(isSimple==true){
    c()
    $("#count-simple-container").hide()
    isSimple=false;
  }
  else{
    let simpleMajority = Math.ceil(parseInt(countTotal)/2)
    $("#count-simple").html(simpleMajority)
    $("#count-simple-container").show()
    isSimple=true
  }
})
$("#toggle-super-majority").click(function(){
  if(isSuper==true){
    $("#count-super-container").hide()
    isSuper=false;
  }
  else{
    let superMajority = Math.ceil(parseInt(countTotal)*2/3)
    $("#count-super").html(superMajority)
    $("#count-super-container").show()
    isSuper=true;
  }
})
// vote buttons
$("#btn-for").click(function(){
  let isVoteHidden = $("#toggle-votes").attr("class").includes("fa-toggle-on")
  countFor++
  if(isVoteHidden == false){
    $("#count-for").html(countFor);
  }
})
$("#btn-abstain").click(function(){
  let isVoteHidden = $("#toggle-votes").attr("class").includes("fa-toggle-on")
  countAbstain++
  if(isVoteHidden == false){
    $("#count-abstain").html(countAbstain);
  }
})
$("#btn-against").click(function(){
  let isVoteHidden = $("#toggle-votes").attr("class").includes("fa-toggle-on")
  countAgainst++
  if(isVoteHidden == false){
    $("#count-against").html(countAgainst);
  }
})
$("#btn-reset").click(function(){
  let isVoteHidden = $("#toggle-votes").attr("class").includes("fa-toggle-on")
  countAgainst = 0;
  countFor = 0;
  countAbstain = 0;
  if(isVoteHidden == false){
    $("#count-against").html(countAgainst);
    $("#count-for").html(countFor);
    $("#count-abstain").html(countAbstain);
  }
})
// set a custom hider
$("#btn-set-custom-hider").click(function(){
  emoji = $("#input-set-custom-hider").val()
  $("#input-set-custom-hider").val("")
})
