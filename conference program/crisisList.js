// data variables
let crisisList = [];
// addEventListeners function for close out icons
function addEventListenerCrisisClose(){
  $(".close-icon-crisis").off()
  $(".close-icon-crisis").click(function(){
    let speakerName = $(this).parent().find("p").html();
    for(let i = 0; i < crisisList.length; i++){
      if(crisisList[i]==speakerName){
        crisisList.splice(i,1);
        break;
      }
    }
    $(this).parent().remove()
  })
}
//update the html to reflect changes to the list
function updateCrisisHTML(list){
  if(list.length < 1){
    $(".speaker-current-crisis").html("No Speakers")
    $(".speaker-next-crisis").empty()
  }
  else if(list.length < 2){
    $(".speaker-current-crisis").html(list[0]);
    $(".speaker-next-crisis").empty()
  }
  else{
    $(".speaker-current-crisis").html(list[0]);
    $(".speakers-list-crisis").empty()
    $(".speaker-next-crisis").html(list[1]);
  }
  for(let i = 2; i < list.length; i++){
    $(".speakers-list-crisis").append(`<div class="speakers-list-queue-crisis"><i class="fas fa-user-minus close-icon-crisis"></i>
<p>${list[i]}</p>
</div>`)
  }
  
  addEventListenerCrisisClose()
}
// On click of next speaker button, update the list and remove the first person
$("#btn-next-speaker-crisis").click(function(){
  crisisList.shift()
  updateCrisisHTML(crisisList)
})

// Add New Country to DataList
$("#btn-add-new-speaker-crisis").click(function(){
  let input = $("#input-add-new-speaker-crisis").val()
  if(input != ""){
    $("#speaker-defaults-crisis").append(`<option value="${input}"></option>`)
  }
  $("#input-add-new-speaker-crisis").val("")
})

// Choose Country from DataList
$("#btn-add-default-crisis").click(function(){
  let input = $("#input-add-default-crisis").val()
  if(input != ""){
    crisisList.push($("#input-add-default-crisis").val())
  }
  $("#input-add-default-crisis").val("")
  updateCrisisHTML(crisisList)
})
// Edit master list button
$("#btn-edit-master-crisis").click(function(){
  let masterList = ""
  crisisList.forEach(function(speaker, index){
    masterList += `${(index < crisisList.length-1) ? speaker +",":speaker}`
  })
  $("#master-list-crisis").html(masterList)
  $("#pop-up-master-list-crisis").show();
})
$("#btn-master-list-crisis").click(function(){
  crisisList = $("#master-list-crisis").html().split(",").filter(speaker => speaker !="")
  $("#pop-up-master-list-crisis").hide();
  updateCrisisHTML(crisisList)
})
