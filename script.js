function main() {

  var smlinks = document.getElementsByClassName("smlink");
  var counting = [];

  $(".smlink").click(function(){
    if (counting.includes(this)) {
      this.dataset.count = 0;
    } else {
      counting.push(this);
      var thisE = this;
      var thisElement = this.getElementsByClassName("smlastclick")[0];
      setInterval(function() {
        count = thisE.dataset.count;
        thisElement.innerHTML = timeConverter(count);
        thisE.dataset.count = Number(count) + 1;
      },1000);
    }
  });

  displayTime();
  setInterval(function() {
    displayTime();
  },1000);

}

function displayTime() {
  var currentDayTime = new Date();
  var days =  ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  document.getElementById("currenttime").innerHTML =
  "<span class='datespan'>" + days[currentDayTime.getDay()-1] + " " +
  (("0"+currentDayTime.getDate()).slice(-2)) + " " + (("0"+(currentDayTime.getMonth()+1)).slice(-2)) + " " + (currentDayTime.getFullYear()-2000) + "</span><br>" +
  "<span class='timespan'> " + (("0"+currentDayTime.getHours()).slice(-2)) + " " + (("0"+currentDayTime.getMinutes()).slice(-2)) +
  "<span class='secondspan'> " + (("0"+currentDayTime.getSeconds()).slice(-2)) + "</span></span>";
}

function timeConverter(count) {
  var hoursAgo = Math.floor(count/3600);
  var minutesAgo = (Math.floor(count/60)%60);
  var secondsAgo = count%60;
  hoursAgo = ("0" + hoursAgo).slice(-2);
  minutesAgo = ("0" + minutesAgo).slice(-2);
  secondsAgo = ("0" + secondsAgo).slice(-2);
  var returnString = hoursAgo + " <span>hrs</span><br> " + minutesAgo + " <span>min</span><br> " + secondsAgo + " <span>sec</span>";
  return returnString;
}

window.onload = function() {
  main();
}
