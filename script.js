feather.replace();

$(document).ready(function () {
  var list_clicks = 0;
  var play_pause = 0;
  var player = document.getElementById('player');

  let currentIndex = 0;
  let channelCount = channels.length;

  function nextChannel(){
    if(currentIndex < (channelCount - 1)){
      currentIndex++;
      startPlayer(channels[currentIndex].channelSRC, channels[currentIndex].channelType);
      console.log(currentIndex);
      setChannel(channels[currentIndex].channelName);
    }
  }

  function previousChannel(){
    if(currentIndex > 0){
      currentIndex--;
      startPlayer(channels[currentIndex].channelSRC, channels[currentIndex].channelType);
      setChannel(channels[currentIndex].channelName);
      console.log(currentIndex);
    }
  }

  function setChannel(channelName){
    $('#channelName').text(channelName);
  }


  function startPlayer(source, type){
    console.log(source);
    

    if(type == 'm3u8'){
      console.log('hsl audio')
      if(Hls.isSupported())
      {
          var hls = new Hls();
          hls.loadSource(source);
          hls.attachMedia(player);
          hls.on(Hls.Events.MANIFEST_PARSED,function()
          {
              player.play();
          });
      }

      }else{
        console.log('printed');
        console.log(source);
        player.removeAttribute("src");
        //document.getElementById("audio_source").src = source;
        //player.load();
        player.src = source;

        player.play();
      }
    }


  //start player
  startPlayer(channels[currentIndex].channelSRC, channels[currentIndex].channelType);
  setChannel(channels[currentIndex].channelName);
  
  // channels.forEach((value) => {
  //   console.log(value.channelName);
  // });


  function pause(){
    player.pause();
  }

  function play() {
    player.play();
  }

  $('#list').click(function(){
      if (list_clicks % 2 == 0) {
        $('.playlist-overlay').fadeIn();
        $(this).css('color', '#03A9F4');
      } else {
        $('.playlist-overlay').fadeOut();
        $(this).css('color', '#333');
      }
      ++list_clicks;
  });
  $('.playlist-overlay').click(function(){
    $(this).fadeOut();
    $('#list').css('color', '#333');
    ++list_clicks;
  });
  $('#play').click(function(){
    if (list_clicks % 2 == 0) {
      $("#play").html('<i data-feather="play"></i>');
      feather.replace();
      pause();
    } else {
      play();
      $("#play").html('<i data-feather="pause"></i>');
      feather.replace();
    }
    ++list_clicks;
  });

  $('#next').click(function(){
    nextChannel();
  })

  $('#prev').click(function(){
    previousChannel();
  })
});