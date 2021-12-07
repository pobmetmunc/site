// data variables
let speakersList = [];
let committeeCountryLists = {
  "ASEAN": ['Vietnam', 'Philippines', 'Thailand', 'Brunei', 'Indonesia', 'Malaysia', 'Singapore', 'Laos', 'Myanmar', 'Cambodia', 'China', 'Japan', 'South Korea', 'North Korea (DPRK)', 'Taiwan', 'Bangladesh', 'Maldives', 'Mongolia', 'Russia', 'India', 'Pakistan', 'Afghanistan', 'Nepal', 'Kyrgyzstan', 'Hong Kong', 'Timor-Leste', 'Bhutan', 'Tajikistan', 'Turkmenistan', 'Armenia'],
  "Congress of Vienna":  ["Arthur Wellesley, 1st Duke of Wellington", "Joaquim Lobo Silveira, 7th Count of Oriola", "António de Saldanha da Gama, Count of Porto Santo", "Count Carl Löwenhielm", "Jean-Louis-Paul-François, 5th Duke of Noailles", "Klemens Wenzel, Prince von Metternich", "André Dupin", "Count Karl Robert Nesselrode", "Pedro de Sousa Holstein, 1st Count of Palmela", "Robert Stewart, Viscount Castlereagh", "Emmerich Joseph, Duke of Dalberg", "Baron Johann von Wessenberg", "Prince Andrey Kirillovich Razumovsky", "Charles Stewart, 1st Baron Stewart", "Pedro Gómez Labrador, Marquis of Labrador", "Richard Le Poer Trench, 2nd Earl of Clancarty", "Friedrich von Gentz", "Baron Wilhelm von Humboldt", "William Cathcart, 1st Earl Cathcart", "Prince Karl August von Hardenberg", "Charles Maurice de Talleyrand-Périgord", "Count Gustav Ernst von Stackelberg"],
  "ECOSOC":["Islamic Republic Government of Afghanistan", "Pakistan", "Iran", "Nigeria", "Uganda", "Zimbabwe", "United States of America", "United Kingdom", "China", "Australia", "France", "Russian Federation", "Italy", "Turkey", "India", "Japan", "Peru", "Germany", "Iraq", "Brazil", "New Zealand", "Moldova", "Botswana", "Lebanon", "Somalia", "Mauritania", "Kazakhstan", "Democratic Republic of the Congo", "Sweden", "Honduras"],
  "Interpol":["Russian Federation", "Georgia", "Albania", "Armenia", "Montenegro", "Serbia", "Greece", "Italy", "Mexico", "Israel", "Qatar", "Cambodia", "Thailand", "Japan", "Syria", "Iraq", "United States of America", "China", "Germany", "Hong Kong", "Libya", "Vietnam", "United Kingdom", "France", "Afghanistan", "Brazil", "Indonesia"],
  "NATO":["Belgium", "Canada", "Croatia", "Denmark", "France", "Germany", "Greece", "Hungary", "Iceland", "Italy", "Latvia", "Netherlands", "North Macedonia", "Norway", "Poland", "Romania", "Spain", "Turkey", "The United Kingdom", "The United States"],
  "Security Council":["Central African Republic", "Myanmar", "China", "France", "Russian Federation", "United Kingdom", "United States of America", "DPRK", "India", "Bangladesh", "Nigeria", "South Africa", "Chad", "Sudan", "Iran"],
  "Supreme Court":["Chief Justice John Roberts", "Justice Clarence Thomas", "Justice Samuel Alito", "Justice Neil Gorsuch", "Justice Brett Kavanaugh", "Justice Amy Coney Barret", "Justice Anthony Kennedy", "Justice Antonin Scalia", "Justice Roger Taney", "Justice Stephen Breyer", "Justice Sonia Sotomayor", "Justice Elena Kagan", "Justice Ruth Bader Ginsburg", "Justice Thurgood Marshall", "Justice Earl Warren"],
  "UNEP":["India", "China", "Bangladesh", "United States of America", "Vietnam", "Indonesia", "South Korea", "Canada", "Mexico", "Mongolia", "Botswana", "Pakistan", "Brunei", "Cambodia", "France", "Malaysia", "Myanmar", "Philippines", "Singapore", "Thailand", "Jordan", "Saudi Arabia", "Qatar", "Spain", "Kuwait", "Germany", "Laos"],
  "UNICEF": ["United States of America", "United Kingdom", "China", "Canada", "France", "Russian Federation", "Germany", "India", "North Korea", "Pakistan", "New Zealand", "Iraq", "Yemen", "Democratic Republic of Congo", "Zimbabwe", "Japan", "Brazil", "Italy", "Israel", "Australia", "Switzerland", "Haiti", "Ethiopia", "Mexico", "Spain", "Ukraine", "Ireland", "Thailand", "Egypt", "Sudan"],
  "UNODC": ["Brazil", "Bolivia", "United States of America", "United Kingdom", "UAE", "South Africa", "Senegal", "Colombia", "China", "Italy", "Mexico", "Nigeria", "Argentina", "Guatemala", "Ethiopia", "Egypt", "Central African Republic", "Russian Federation", "Afghanistan", "Austria", "Cambodia", "Germany", "The Gambia", "Guyana", "Peru", "Zimbabwe", "New Zealand", "Lebanon", "Kenya", "Iraq", "Indonesia"],
  "WHO": ["United States of America", "China", "United Kingdom", "Russian Federation", "France", "Kenya", "Egypt", "Myanmar", "Italy", "Panama", "Fiji", "India", "Japan", "Sweden", "Australia", "Israel", "Syria", "Mexico", "Peru", "Cuba", "Singapore", "South Korea", "North Korea", "Ethiopia", "Rwanda", "Pakistan", "Poland", "Turkey", "Germany", "Lebanon"],
  "DISEC": ["United States of America", "United Kingdom", "Russian Federation", "China", "France", "Italy", "Turkey", "Greece", "Iran", "Syria", "Israel", "Germany", "Egypt", "Algeria", "Ukraine", "Tunisia", "Morocco", "Libya", "India", "Pakistan", "Spain", "Ethiopia", "South Korea", "North Korea", "Kenya"],
  "UNESCO": ["United States of America", "Russian Federation", "United Kingdom", "France", "China", "North Korea", "Cuba", "Germany", "Spain", "South Africa", "Syria", "Namibia", "Papua New Guinea", "India", "Iraq", "Iran", "Israel", "Mexico", "Ethiopia", "Saudi Arabia", "Vietnam", "Czech Republic", "Brazil", "Democratic Republic of Congo", "Turkey", "Italy", "New Zealand", "Sudan", "Myanmar", "Tanzania", "Japan", "Yemen", "Peru", "Libya"],
  "UNCTAD": ["United States of America", "Venezuela", "China", "Russian Federation", "Mexico", "Egypt", "Syria", "France", "Greece", "Australia", "Germany", "Saudi Arabia", "Kenya", "Cambodia", "India", "Nigeria", "South Africa", "Canada", "Democratic Republic of the Congo", "Brazil", "Ethiopia", "United Kingdom", "Italy", "South Korea", "Japan", "North Korea", "Iran", "Indonesia", "Afghanistan", "Israel"]
}
let committee = ""
while (committee === ""){
  let input = prompt("Type in committee name exactly as one of the following (ASEAN, Congress of Vienna, ECOSOC, Interpol, NATO, Security Council, Supreme Court, UNEP, UNICEF):")
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
  $("#speaker-defaults-crisis").append(`<option value="${country}"></option>`)
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
