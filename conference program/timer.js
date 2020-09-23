// Minor Options
let isSmooth = false;
$("#toggle-smooth").click(function(){
  if(isSmooth==true){
    isSmooth=false;
  }
  else{
    isSmooth=true;
  }
})

let isWarning = false;
$("#toggle-warning").click(function(){
  if(isWarning==true){
    isWarning=false;
  }
  else{
    isWarning=true;
  }
})

// Toggle Button Animation
$(".toggle").click(function(){
  if($(this).attr("class").includes("fa-toggle-off")){
    $(this).removeClass("fa-toggle-off");
    $(this).addClass("fa-toggle-on");
  }
  else if($(this).attr("class").includes("fa-toggle-on")){
    $(this).removeClass("fa-toggle-on");
    $(this).addClass("fa-toggle-off");
  }
})

// handling pause and play buttons
let isPaused = true;
$(".fa-pause").hide()
$(".icon").click(function(){
  if(isPaused){
    $(".fa-pause").show()
    $(".fa-play").hide()
    isPaused = false
    // add unpause
  }
  else{
    $(".fa-play").show()
    $(".fa-pause").hide()
    isPaused = true
    // add pause
  }
})


// set a default time
let totalSeconds = 30;
let maxBarSeconds = 30;

// Parse Time in mm:ss format. The ,10 sets the radix to 10
function getSeconds(timeStr) {
  minutes = parseInt(timeStr.split(":")[0], 10);
  seconds = parseInt(timeStr.split(":")[1], 10);
  return minutes*60 + seconds;
}

// On click of set time button, set time equal to the input value
$(".set-time-button").click(function(){
  totalSeconds = getSeconds($(".time-input").val())
  maxBarSeconds = totalSeconds
  updateTime(totalSeconds)
})

// When Play button clicked start the timer.
let timer;
$("#play-button").click(function(){
    timer = setInterval(function(){
      updateTime(totalSeconds);
      animateBar();
      totalSeconds--;
  }, 1000);
});

// update time display and seconds value function, and update the bar length
function updateTime(totalS){
  minutes = Math.floor(totalS/60);
  seconds = totalS%60;
  $(".time-display").html(`${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
  // stop timer when it runs out, and reset the bar + time to before
  if(minutes < 1 && seconds < 1){
    clearInterval(timer)
    setTimeout(function() {
      $(".bar-progress").css("background-color","#008DB9")
      $(".bar-progress").animate({width: "100%"}, 1000, "linear")
      minutes = Math.floor(maxBarSeconds/60)
      seconds = maxBarSeconds%60
      totalSeconds = maxBarSeconds
      $(".time-display").html(`${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`)
    }, 1300)
  }
}

// When Pause button clicked pause the timer
$("#pause-button").click(function(){
  clearInterval(timer)
})

// Animate the bar as total seconds drops, taking isSmooth and isWarning into account
function animateBar(){
  let percentageOfBar = (totalSeconds/maxBarSeconds)*100
  let isRed = $(".bar-progress").css("background-color").includes("red")
  if(isSmooth==true){
    $(".bar-progress").animate({width:percentageOfBar + "%"},{duration:1000, easing:"linear",queue:false})
    if(isWarning==true && !isRed && totalSeconds <=5){
      $(".bar-progress").animate({backgroundColor:"red"}, {duration:1000, easing:"linear",queue:false})
    }
    else{
      $(".bar-progress").animate({backgroundColor:"#008DB9"}, {duration:1000, easing:"linear",queue:false})
    }
  }
  else{
    $(".bar-progress").css("width", percentageOfBar + "%")
    if(isWarning==true && !isRed && totalSeconds <=5){
      $(".bar-progress").css("background-color","red")
    }
    else{
      $(".bar-progress").css("background-color","#008DB9")
    }
  }
}
