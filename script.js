function main() {

  var smlinks = document.getElementsByClassName("smlink");
  var counting = [];

  $(".smlink").click(function(){
    var countingBool = false;
    for (i = 0; i < counting.length; i++) {
      if (counting[i] == this) {
        this.dataset.count = 0;
        countingBool = true;
      }
    }
    if (countingBool == false) {
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
