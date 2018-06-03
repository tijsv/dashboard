function main() {

  var linksArray = [
    ["google", "https://www.google.com/", "./images/logo_google.svg", "#f4c20d"],
    ["facebook", "https://www.facebook.com/", "./images/logo_fb.svg", "rgb(59,89,152)"],
    ["twitter", "https://twitter.com/", "./images/logo_twitter.svg", "rgb(29,161,242)"],
    ["reddit", "https://www.reddit.com/r/all/", "./images/logo_reddit.svg", "#ff4500"],
    ["youtube", "https://www.youtube.com/", "./images/logo_youtube.svg", "#ff0000"],
    ["outlook", "https://login.live.com/", "./images/logo_outlook.svg", "#0072C6"],
    ["twitch", "https://www.twitch.tv/directory/all", "./images/logo_twitch.svg", "#6441a5"],
    ["netflix", "https://www.netflix.com/", "./images/logo_netflix.svg", "#e50914"],
    ["vrtnws", "https://www.vrt.be/vrtnws/nl/", "./images/logo_vrt.svg", "#5dfc71"],
    ["sporza", "https://sporza.be/nl/", "./images/logo_sporza.svg", "#5dfc71"],
    ["imdb", "https://www.imdb.com/", "./images/logo_imdb.svg", "rgb(245,197,24)"]
  ];

  for (i = 0; i < linksArray.length; i++) {
    var smelement = document.createElement('div');
    var smlink = document.createElement('a');
    var smelementimg = document.createElement('img');
    var smelementp = document.createElement('p');

    smelement.className = "socialmediaelement";
    smelement.style.backgroundColor = "rgb(29,37,45)";
    smelement.style.transition = "0.4s all ease";
    smlink.className = "smlink";
    smelementimg.className = "smelementimg";
    smelementp.className = "smlastclick";

    smelement.dataset.sm = linksArray[i][0];
    smelement.dataset.color = linksArray[i][3];
    smlink.href = linksArray[i][1];
    smlink.target = "_blank";
    smlink.dataset.count = 0;
    smelementimg.src = linksArray[i][2];
    smelementp.innerHTML = "not<br> clicked<br> yet";

    smlink.append(smelementimg);
    smlink.append(smelementp);
    smelement.append(smlink);
    document.getElementById('dbsocialmedia').append(smelement);
  }

  var allSocialMediaElements = document.getElementsByClassName('socialmediaelement');

  for (i = 0; i < allSocialMediaElements.length; i++) {
    allSocialMediaElements[i].onmouseover = function() {
      this.style.backgroundColor = this.dataset.color;
      this.getElementsByClassName("smelementimg")[0].style.opacity = "1";
      this.getElementsByClassName("smelementimg")[0].style.transform = "scale(1.2)";
    }
    allSocialMediaElements[i].onmouseleave = function() {
      this.style.backgroundColor = "rgb(29,37,45)";
      this.getElementsByClassName("smelementimg")[0].style.opacity = "0.2";
      this.getElementsByClassName("smelementimg")[0].style.transform = "scale(1)";
    }
  }

  var smlinks = document.getElementsByClassName("smlink");
  var counting = [];

  $(".smlink").click(function(){
    if (counting.includes(this)) {
      this.dataset.count = 0;2
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
  var days =  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  document.getElementById("currenttime").innerHTML =
  "<span class='datespan'>" + days[currentDayTime.getDay()] + " " +
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
          if (channels.data.length == 0) {
            var el = document.createElement('div');
            var elA = document.createElement('a');
            var elP = document.createElement('p');
            el.className = "twitchchannel";
            el.style.backgroundColor = "rgb(29,37,45)";
            elA.className = "twitchchannellink";
            elP.className = "twitchchanneltext";
            elP.innerHTML = "<span class='namespan'>No streams online :'(</span><br>";
            elA.append(elP);
            el.append(elA);
            feed.append(el);
          } else {
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
              elA.target = "_blank";
              elP.innerHTML = "<span class='namespan'>" + userName + "</span><br>";
              elP.innerHTML += "<span class='titlespan'>" + channels.data[i].title.slice(0,30) + " ...</span><br>";
              elP.innerHTML += "<span class='viewersspan'>" + channels.data[i].viewer_count + " viewers</span>";
              elA.append(elImg)
              elA.append(elP);
              el.append(elA);
              feed.append(el);
            }
          }
        }
      });

    }
  });
}

window.onload = function() {
  main();
}
