// data variables
let speakersList = [];
let committeeCountryLists = {
  "Test":["A","B","C","D","E","F","G"],
  "NATO": [],
  "UNCTAD": [],
  "Security Council":[],
  "UNHRC":[],
  "WHO":[],
  "ECOSOC":[],
  "US Space Force":[],
  "UN Women":[],
  "UNEP":[],
  "UNODC":[],
  "Arab League":[],
  "UK Parliament":[]
}
// addEventListeners function for close out icons
function addEventListenerClose(){
  $(".close-icon").off()
  $(".close-icon").click(function(){
    let speakerName = $(this).parent().find("p").html();
    for(let i = 0; i < speakersList.length; i++){
      if(speakersList[i]==speakerName){
        speakersList.splice(i,1);
        break;
      }
    }
    $(this).parent().remove()
  })
}
//update the html to reflect changes to the list
function updateHTML(list){
  if(list.length < 1){
    $(".speaker-current").html("No Speakers")
    $(".speaker-next").empty()
  }
  else if(list.length < 2){
    $(".speaker-current").html(list[0]);
    $(".speaker-next").empty()
  }
  else{
    $(".speaker-current").html(list[0]);
    $(".speakers-list").empty()
    $(".speaker-next").html(list[1]);
  }
  for(let i = 2; i < list.length; i++){
    $(".speakers-list").append(`<div class="speakers-list-queue"><i class="fas fa-user-minus close-icon"></i>
<p>${list[i]}</p>
</div>`)
  }
  addEventListenerClose()
}
// On click of next speaker button, update the list and remove the first person
$("#btn-next-speaker").click(function(){
  speakersList.shift()
  updateHTML(speakersList)
})

// Add New Country to DataList
$("#btn-add-new-speaker").click(function(){
  let input = $("#input-add-new-speaker").val().split(",")
  console.log(input)
  input.forEach(function(current){
    if(current != ""){
      console.log(current)
      $("#speaker-defaults").append(`<option value="${current}"></option>`)
    }
  })
  $("#input-add-new-speaker").val("")
})

// Choose Country from DataList
$("#btn-add-default").click(function(){
  let input = $("#input-add-default").val()
  if(input != ""){
    speakersList.push($("#input-add-default").val())
  }
  $("#input-add-default").val("")
  updateHTML(speakersList)
})
// Edit master list button
$("#btn-edit-master").click(function(){
  let masterList = ""
  speakersList.forEach(function(speaker, index){
    masterList += `${(index < speakersList.length-1) ? speaker +",":speaker}`
  })
  $("#master-list").html(masterList)
  $("#pop-up-master-list").show();
})
$("#btn-master-list").click(function(){
  speakersList = $("#master-list").html().split(",").filter(speaker => speaker !="")
  $("#pop-up-master-list").hide();
  updateHTML(speakersList)
})

// debugging function
function c(log="check"){
  console.log(log);
}
