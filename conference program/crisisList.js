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
// Committees
let committeeCountryListsCrisis = {
  "NATO": ['United States', 'Turkey', 'Greece', 'Ukraine', 'UK', 'France', 'Poland', 'Germany', 'Estonia', 'Latvia', 'Lithuania', 'North Macedonia', 'Bulgaria', 'Hungary', 'Romania', 'Spain', 'Italy', 'Canada', 'Denmark', 'Belgium', 'Netherlands', 'Portugal', 'Albania', 'Montenegro', 'Czech', 'Republic', 'Slovakia', 'Slovenia', 'Norway'],
  "UNCTAD":  ['Canada', 'Russia', 'United States', 'Venezuela', 'Egypt', 'China', 'UK', 'Bolivia', 'Norway', 'Saudi Arabia', 'DPRK', 'Panama', 'Nigeria', 'India', 'France', 'Denmark', 'Angola', 'Chile', 'Malaysia', 'Indonesia', 'Afghanistan', 'Australia', 'New Zealand', 'Brazil', 'Uganda', 'South Korea', 'Japan', 'Botswana', 'UAE'],
  "UNHRC":['Yemen', 'USA', 'Saudi Arabia', 'Syria', 'UK', 'Brazil', 'Venezuela', 'India', 'Nigeria', 'Philippines', 'France', 'Iran', 'Belgium', 'Italy', 'Sweden', 'Switzerland', 'Denmark', 'Germany', 'Afghanistan', 'Turkey', 'Pakistan', 'Ghana', 'Egypt', 'Bangladesh', 'Kenya', 'Japan', 'China', 'DPRK (North Korea)', 'South Korea'],
  "WHO":["India","Italy","South Korea","France","Vietnam","Australia","United Kingdom","Israel","Egypt","Czech Republic","Japan","China","United States","Ethiopia","Iran","Brazil"],
  "ECOSOC":["Argentina","Armenia","Australia","Bolivia","Botswana","Brazil","Canada","China","Colombia","DPRK","Egypt","Ethiopia","France","Germany","Iran (Islamic Republic Of)","Japan","Kenya","Mexico","Nigeria","Pakistan","Panama","Portugal","Republic of Korea","Russian Federation","Saudi Arabia","Switzerland","Urkraine","UK","USA","Zimbabwe"],
  "US Space Force":['Chief of Space Operations', 'Vice Chief of Space Operations', 'Chief Master Sergeant of the Space Force', 'Vice President of the United States', 'White House Chief of Staff', 'Director of the CIA', 'Director of Staff', 'Chief Human Capital Officer', 'Chief Operations Officer', 'Director of Intelligence, Surveillance, and Reconnaissance', 'U.S. Ambassador to the United Nations', 'United States Secretary of the Treasury', 'Administrator of NASA', 'Commander of the Space Operations Command: Peterson Air Force Base', 'Commander of the Space Operations Command West: Vandenberg Air Force Base', 'Chief Strategy and Resourcing Officer', 'Director of Plans and Programs', 'Chief Technology and Innovation Officer'],
  "UNEP":['US', 'Britain', 'China', 'Canada', 'France', 'Russia', 'Germany', 'Australia', 'North Korea', 'Pakistan', 'New Zealand', 'Iraq', 'Japan', 'Brazil', 'Italy', 'Israel', 'Sweden', 'Switzerland', 'Ukraine', 'Turkey', 'Mexico', 'Spain', 'Yemen', 'Portugal', 'Chile', 'Ireland', 'Argentina', 'Egypt', 'Greece'],
  "Arab League":["Algeriia","Bahrain","Comoros","Dijbouti","Egypt","Iraq","Jordan","Kuwait","Lebanon","Mauritania","Morocco","Oman","Qatar","Saudi Arabia","Somalia","Sudan","Syria","Tunisia","United Arab Emirates","Yemen"],
  "BHOC": ['Boris Johnson (Con)', 'Rishi Sunak (Con)', 'Dominic Raab (Con)', 'Priti Patel (Con)', 'Jacob Rees Mogg (Con)', 'David Davis (Con)', 'Keir Starmer (Lab)', 'Lisa Nandy (Lab)', 'Jeremy Corbyn (Lab)', 'Ian Blackford (SNP)', 'Edward Davey (LibDem)', 'Theresa May (Con)', 'Yvette Cooper (Lab)', 'Joy Morrissey (Con)', 'Angela Rayner (Lab)', 'Michael Gove (Con)', 'Colum Easwood (SDLP)', 'Damian Green (Con)', 'John McDonnell (Lab)', 'Ben Wallace (Con)', 'Christopher Chope (Con)', 'Anneliese Dodds (Lab)', 'Robert Buckland (Con)', 'Jeffrey Donaldson (DUP)', 'Johnny Mercer (Con)', 'Harriet Harman (Lab)', 'Kirsty Blackman (SNP)', 'Brandon Lewis (Con)', 'David Lammy (Lab)', 'Imran Ahmad Khan (Con)', 'Alister Jack (Con)', 'Mark Jenkinson (Con)', 'Paula Barker (Lab)', 'Dehenna Davison (Con)']
}
let committeeCrisis = $("committee-header").html()
committeeCountryListsCrisis[committeeCrisis].forEach(function(country){
  $("#speaker-defaults-crisis").append(`<option value="${country}"></option>`)
})
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
