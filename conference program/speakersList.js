// data variables
let speakersList = [];
let committeeCountryLists = {
  "NATO": ['United States', 'Turkey', 'Greece', 'Ukraine', 'UK', 'France', 'Poland', 'Germany', 'Estonia', 'Latvia', 'Lithuania', 'North Macedonia', 'Bulgaria', 'Hungary', 'Romania', 'Spain', 'Italy', 'Canada', 'Denmark', 'Belgium', 'Netherlands', 'Portugal', 'Albania', 'Montenegro', 'Czech', 'Republic', 'Slovakia', 'Slovenia', 'Norway'],
  "UNCTAD":  ['Canada', 'Russia', 'United States', 'Venezuela', 'Egypt', 'China', 'UK', 'Bolivia', 'Norway', 'Saudi Arabia', 'DPRK', 'Panama', 'Nigeria', 'India', 'France', 'Denmark', 'Angola', 'Chile', 'Malaysia', 'Indonesia', 'Afghanistan', 'Australia', 'New Zealand', 'Brazil', 'Uganda', 'South Korea', 'Japan', 'Botswana', 'UAE'],
  "UNHRC":['Yemen', 'USA', 'Saudi Arabia', 'Syria', 'UK', 'Brazil', 'Venezuela', 'India', 'Nigeria', 'Philippines', 'France', 'Iran', 'Belgium', 'Italy', 'Sweden', 'Switzerland', 'Denmark', 'Germany', 'Afghanistan', 'Turkey', 'Pakistan', 'Ghana', 'Egypt', 'Bangladesh', 'Kenya', 'Japan', 'China', 'DPRK (North Korea)', 'South Korea'],
  "WHO":[],
  "ECOSOC":["Argentina","Armenia","Australia","Bolivia","Botswana","Brazil","Canada","China","Colombia","DPRK","Egypt","Ethiopia","France","Germany","Iran (Islamic Republic Of)","Japan","Kenya","Mexico","Nigeria","Pakistan","Panama","Portugal","Republic of Korea","Russian Federation","Saudi Arabia","Switzerland","Urkraine","UK","USA","Zimbabwe"],
  "US Space Force":['Chief of Space Operations', 'Vice Chief of Space Operations', 'Chief Master Sergeant of the Space Force', 'Vice President of the United States', 'White House Chief of Staff', 'Director of the CIA', 'Director of Staff', 'Chief Human Capital Officer', 'Chief Operations Officer', 'Director of Intelligence, Surveillance, and Reconnaissance', 'U.S. Ambassador to the United Nations', 'United States Secretary of the Treasury', 'Administrator of NASA', 'Commander of the Space Operations Command: Peterson Air Force Base', 'Commander of the Space Operations Command West: Vandenberg Air Force Base', 'Chief Strategy and Resourcing Officer', 'Director of Plans and Programs', 'Chief Technology and Innovation Officer'],
  "UNEP":['US', 'Britain', 'China', 'Canada', 'France', 'Russia', 'Germany', 'Australia', 'North Korea', 'Pakistan', 'New Zealand', 'Iraq', 'Japan', 'Brazil', 'Italy', 'Israel', 'Sweden', 'Switzerland', 'Ukraine', 'Turkey', 'Mexico', 'Spain', 'Yemen', 'Portugal', 'Chile', 'Ireland', 'Argentina', 'Egypt', 'Greece'],
  "Arab League":["Algeriia","Bahrain","Comoros","Dijbouti","Egypt","Iraq","Jordan","Kuwait","Lebanon","Mauritania","Morocco","Oman","Qatar","Saudi Arabia","Somalia","Sudan","Syria","Tunisia","United Arab Emirates","Yemen"],
  "BHOC": ['Boris Johnson (Con)', 'Rishi Sunak (Con)', 'Dominic Raab (Con)', 'Priti Patel (Con)', 'Jacob Rees Mogg (Con)', 'David Davis (Con)', 'Keir Starmer (Lab)', 'Lisa Nandy (Lab)', 'Jeremy Corbyn (Lab)', 'Ian Blackford (SNP)', 'Edward Davey (LibDem)', 'Theresa May (Con)', 'Yvette Cooper (Lab)', 'Joy Morrissey (Con)', 'Angela Rayner (Lab)', 'Michael Gove (Con)', 'Colum Easwood (SDLP)', 'Damian Green (Con)', 'John McDonnell (Lab)', 'Ben Wallace (Con)', 'Christopher Chope (Con)', 'Anneliese Dodds (Lab)', 'Robert Buckland (Con)', 'Jeffrey Donaldson (DUP)', 'Johnny Mercer (Con)', 'Harriet Harman (Lab)', 'Kirsty Blackman (SNP)', 'Brandon Lewis (Con)', 'David Lammy (Lab)', 'Imran Ahmad Khan (Con)', 'Alister Jack (Con)', 'Mark Jenkinson (Con)', 'Paula Barker (Lab)', 'Dehenna Davison (Con)']
}
let committee = ""
while (committee === ""){
  let input = prompt("Type in committee name exactly as one of the following (NATO, UNCTAD, UNHRC, WHO, ECOSOC, US Space Force, UNEP, UNODC, Arab League, BHOC):")
  if (typeof(committeeCountryLists[input]) != 'undefined'){
    committee = input
    $("#committee-header").html(input)
  }
  else{
    alert("Committee not recognized. Try again.")
  }
}
committeeCountryLists[committee].forEach(function(country){
  $("#speaker-defaults").append(`<option value="${country}"></option>`)
})
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
