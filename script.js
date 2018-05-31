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

  var refreshFeedButton = document.getElementById("refreshbutton");
  getLiveStreams();
  refreshFeedButton.onclick = function() {
    getLiveStreams();
  };



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

function getLiveStreams() {

  var feed = document.getElementById("feed");
  feed.innerHTML = "";

  $.ajax({
    type: 'GET',
    url: 'https://api.twitch.tv/kraken/users/tigrohh/follows/channels/',
    data: {
      limit: 100
    },
    headers: {
      'Client-ID': '7pgg8wka8nyy76fnn9wbpd9j2nv5p7'
    },
    success: function(data) {

      var channelNameArray = [];

      for (i = 0; i < data.follows.length; i++) {
        // getP.innerHTML += (data.follows[i].channel.name + "<br>");
        channelNameArray.push(data.follows[i].channel.name);
      }

      $.ajax({
        type: 'GET',
        url: 'https://api.twitch.tv/helix/streams',
        data: {
          user_login: channelNameArray
        },
        headers: {
          'Client-ID': '7pgg8wka8nyy76fnn9wbpd9j2nv5p7'
        },
        success: function(channels) {
          // console.log(channels);
          for (i = 0; i < channels.data.length; i++) {
            var el = document.createElement('div');
            var elA = document.createElement('a');
            var elP = document.createElement('p');
            var elImg = document.createElement('img');
            el.className = "twitchchannel";
            elA.className = "twitchchannellink";
            elP.className = "twitchchanneltext";
            elImg.className = "twitchchannelimg";
            var imgLink = channels.data[i].thumbnail_url;
            var userNamePart = imgLink.replace('https://static-cdn.jtvnw.net/previews-ttv/live_user_','');
            var userName = userNamePart.replace('-{width}x{height}.jpg','');
            var updatedLink = imgLink.replace('{width}x{height}','640x360');
            elImg.src = updatedLink;
            elA.href = "https://www.twitch.tv/" + userName;
            elP.innerHTML = "<span class='namespan'>" + userName + "</span><br>";
            elP.innerHTML += "<span class='titlespan'>" + channels.data[i].title.slice(0,30) + " ...</span><br>";
            elP.innerHTML += "<span class='viewersspan'>" + channels.data[i].viewer_count + " viewers</span>";
            elA.append(elImg)
            elA.append(elP);
            el.append(elA);
            feed.append(el);
          }
        }
      });

    }
  });
}

window.onload = function() {
  main();
}
