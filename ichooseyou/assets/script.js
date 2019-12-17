$(document).ready(function(){
// $('#header').load('../header-ads.html');
//   $('#footer').load('../footer-ads.html');

  // Read attack type list
  var atkTypes;
  $.ajax({
    type: "GET",
    url: "data/deftypes.csv",
    dataType: "text",
    success: function(response)
    {
    atkTypes = $.csv.toArrays(response);
    var i;
    const numTypes = atkTypes.length;
    for (i = 0; i < numTypes; i++) {
      atkType = document.getElementById('atkType');
      atkType.options[atkType.options.length] = new Option(atkTypes[i], atkTypes[i])
    }
    }
  });



  var data;
  $.ajax({
    type: "GET",
    url: "http://dlansigan.github.io/ichooseyou/assets/data/defensedata.csv",
    dataType: "text",
    success: function(response)
    {
    data = $.csv.toObjects(response);
    // generateHtmlTable(data);
    $('#test').append(data[0].BestPokemon);
    },
    error: function(xhr, status, error) {
      var err = JSON.parse(xhr.responseText);
      alert(err.Message);
    }
  });

  $('#test').append('test');

});
