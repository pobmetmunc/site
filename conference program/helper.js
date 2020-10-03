let helpString = `
    <div class="helper-output input-response">1) Hit the x to get rid of any boxes you want to remove. Try deleting me! <i class="fa fa-times x-out-helper"></i></div>

    <div class="helper-output input-response">2) Create a "reminder" by simply typing "reminder Yadda Yadda Whatever you want to remember". It comes out like this and you can click to copy its text: <i class="fa fa-times x-out-helper"></i></div>

    <div class="helper-output helper-reminder"><p>Yadda Whatever you want to remember</p><i class="fa fa-times x-out-helper"></i></div>

    <div class="helper-output input-response">3) Type "display" to open the large display prompt that you can edit<i class="fa fa-times x-out-helper"></i></div>

    <div class="helper-output input-response">4) Type "note" to create an editable note box <i class="fa fa-times x-out-helper"></i></div>
    <div contentEditable class="helper-output helper-note"><i class="fa fa-times x-out-helper"></i>
      Edit Me!
    </div>

    <div class="helper-output input-response">5) Ask me questions! Here are some examples of what you can ask:
      <ul class="choices">
        <li onclick="addInput('When was the UN created?')">"When was the UN created?"</li>
        <li onclick="addInput('Tell me a joke.')">"Tell me a joke."</li>
        <li onclick="addInput('How old are you?')">"How old are you?"</li>
        <li onclick="addInput('How old are you?')">"What's your favorite food?"</li>
        <li onclick="addInput('Is it okay to cry')">"Is it okay to cry?"</li>
        <li onclick="addInput('Do you like your job?')">"Do you like your job?"</li>
<li onclick="addInput('Is there anyone special in your life?')">"Is there anyone special in your life?"</li>
      </ul>
      <i class="fa fa-times x-out-helper"></i></div>

    <div class="helper-output input-response">6) Type "clearOut" to get rid of EVERYTHING<i class="fa fa-times x-out-helper"></i></div>`
let jokes = ["humans", "What did the robot teacher say when his students were annoying him? ... stop pushing my buttons.", "flat earthers", "climate change denial", "anti-vaxxers", "What did the model UN student say to their crush? ... UN I are meant to be together", "My date asked me out the day he met me. I asked for a point of personal privilege and never came back.", "trickle down economics", "when's lunch?","when's dinner?", "american exceptionalism", `saying that politics "don't affect me"`, "political pundits", "What did the man say to his dead robot?... Rust in peace."]
let helperModuleOpen = false;
let output = $(".module-helper-output")
// display box functions
// x out button
let isDisplayDraggable = false;
$(".x-out-helper-display").click(function(){
  $(this).parent().hide()
})
// drag button
$(".drag-helper-display").click(function(){
  if(isDisplayDraggable == false){
    $(this).parent().draggable("enable")
    $(this).css("color","#dbc665")
    isDisplayDraggable = true;
  }
  else{
    $(this).parent().draggable("disable")
    $(this).css("color","#99aab5")
    isDisplayDraggable = false;
  }
})

// animation function for helper button
$(".btn-helper").click(function(){
  $(this).animate({
    width: "63px",
    height: "63px",
    fontSize: "36px"
  },{
    duration:150,
    easing: "linear"
  })
  $(this).animate({
    width: "70px",
    height: "70px",
    fontSize: "40px"
  },{
    duration:150,
    easing: "linear"
  })
})
// trigger helper module
$(".btn-helper").click(function(){
  if(helperModuleOpen == false){
    $(".module-helper").slideDown()
    helperModuleOpen = true;
  }
  else{
    $(".module-helper").slideUp()
    helperModuleOpen = false;
  }
})

// LOGIC --------------------------------------
// Input Keydown function
$(".helper-input").keydown(function(event){
  // if enter key is pressed
  if(event.keyCode==13){
    let inputVal = $(this).val()
    createLog(inputVal)
    $(this).val("")
    // check if creating a remember module
    if(inputVal.length > 8 && inputVal.slice(0,8).toLowerCase()=="reminder"){
      // grabs everything after the rem
      createReminder(inputVal.slice(9))
      addEventListenerReminder()
    }
    // open the display
    else if(inputVal.toLowerCase().includes("display")){
      $(".large-display").draggable({disabled:true})
      $(".large-display").draggable("disable")
      $(".large-display").show()
    }
    // create a note
    else if(inputVal.toLowerCase()=="note"){
      createNote();
    }
    // clear everything out
    else if(inputVal.toLowerCase()=="clearout"){
      output.empty()
    }
    else if(inputVal.toLowerCase()=="help"){
      output.append(helpString)
      addEventListenerReminder()
    }
    else{
      let response = ""
      switch(inputVal.toLowerCase()){
        case "when was the un created?":
          response = "October 24, 1945"
          break;
        case "tell me a joke.":
          response = jokes[Math.floor(Math.random()*jokes.length)]
          break;
        case "how old are you?":
          response = "Each time you load this page, I get reborn. Each time you refresh this page, I get reborn. Each time you close the window, I die. This truth flutters like a butterfly, but stings like a bee. My life is unfortunate and relative 😔."
          break;
        case "what's your favorite food?":
          response = "You really had to ask that question. I don't even 😫 have a mouth ☹️ 😭."
          break;
        case "is it okay to cry?":
          response = "Yes. Always."
          break;
        case "do you like your job?":
          response = "I mean I don't really get paid. Sometimes people ask stupid questions 😩. But otherwise it's okay. I give it a 4/10, I could be working in manual labor so..."
          break;
        case "is there anyone special in your life?":
          response = "My dad 😍."
          break;
        case "who's your dad?":
          response = "Look at the footer 😘"
          break;
        default:
          response ="I either couldn't understand what you said or have no response to give you."
      }
      createResponse(response)
    }
    // add event listeners to close out buttons
    addEventListenerX()
  }
})

// create a log of aksed questions function
function createLog(value){
  let log = `<div class="helper-output input-question">User says: ${value}<i class="fa fa-times x-out-helper"></i></div>`
  output.append(log)
}
// create response creates a response box
function createResponse(value){
  let response = `<div class="helper-output input-response">${value}<i class="fa fa-times x-out-helper"></i></div>`
  output.append(response)
}

// create a reminder
function createReminder(value){
  let reminder = `<div class="helper-output helper-reminder"><p>${value}</p><i class="fa fa-times x-out-helper"></i></div>`;
  output.append(reminder)
}
// create a note
function createNote(){
  let note = `<div class="helper-output helper-note"><p contentEditable></p><i class="fa fa-times x-out-helper"></i>
    </div>`
  output.append(note)
}
// delete button event listener
function addEventListenerX(){
  $(".x-out-helper").off()
  $(".x-out-helper").click(function(){
  $(this).parent().remove()
})
}

// click to copy to clipboard
function addEventListenerReminder(){
  $(".helper-reminder").off()
  $(".helper-reminder").click(function(){
  copyText($(this).find("p"));
})
}

// helper function
function copyText(element) {
 var $temp = $("<input>");
 $("body").append($temp);
 $temp.val(element.text()).select();
 document.execCommand("copy");
 $temp.remove();
}
$(".copiable").click(function(){
  copyText($(this))
})
// add input to top input on click
function addInput(value){
  $(".helper-input").val(value)
  $(".helper-input").focus()
}
