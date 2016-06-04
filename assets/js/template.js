$(".expand-button").click(
  function(){
    var activeDetails = $(this).attr("value");
    if( $(activeDetails).height() == 0 ){
      $(activeDetails).animate({ height: "40vh"}, 1000);
      $(".pic-button-text").css("font-size", "1em");
    }
    else{
      $(activeDetails).animate({ height: "0"}, 1000);
      $(".pic-button-text").css("font-size", "1.5em");
    }
    $(".details").not(activeDetails).animate({ height: "0"}, 1000);
  }
);