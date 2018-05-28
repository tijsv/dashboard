function main() {

  var smlinks = document.getElementsByClassName("smlink");

  for(i = 0; i < smlinks.length; i++) {
    smlinks[i].onclick = function(){
      counter(this.getElementsByClassName("smlastclick")[0]);
    }
  }

}

function counter(element) {
  var count = 0
  setInterval(function(){
    element.innerHTML = timeConverter(count);
    count++;
  },1000);
}

function timeConverter(count) {
  var hoursAgo = Math.floor(count/3600);
  var minutesAgo = Math.floor(count/60);
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
