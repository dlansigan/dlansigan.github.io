$(document).ready(function(){
// $('#header').load('../header-ads.html');
//   $('#footer').load('../footer-ads.html');

  // Create attack type dropdown list
  var atkTypes;
  $.ajax({
    type: "GET",
    url: "https://raw.githubusercontent.com/dlansigan/dlansigan.github.io/master/ichooseyou/assets/data/offtypes.csv",
    dataType: "text",
    success: function(response)
    {
    atkTypes = $.csv.toArrays(response);
    atkTypes = atkTypes[0];
    var i;
    const numTypes = atkTypes.length;
    for (i = 0; i < numTypes; i++) {
      atkType = document.getElementById('atkType-select');
      if (atkTypes[i] != ' ') {
        atkType.options[atkType.options.length] = new Option(atkTypes[i], i)
      }
    }
    }
  });

  // $('#test').append('test');

});

function getDefResults() {

  $('#def-results').html("");
  var atkType = document.getElementById('atkType-select');
  var idx = atkType.options[atkType.selectedIndex].value;

  var pkmnList;
  $.ajax({
    type: "GET",
    url: "https://raw.githubusercontent.com/dlansigan/dlansigan.github.io/master/ichooseyou/assets/data/pokemon.csv",
    dataType: "text",
    success: function(response)
    {
    pkmnList = $.csv.toArrays(response);
    pkmnList = pkmnList[0];
    getDefResultsHelper(pkmnList, idx);
    }
  })
}

function getDefResultsHelper(pkmnList, idx){
  var data;
  response = $.get("http://dlansigan.github.io/ichooseyou/assets/data/defensedata.csv");
  $.ajax({
    type: "GET",
    url: "http://dlansigan.github.io/ichooseyou/assets/data/defensedata.csv",
    dataType: "text",
    success: function(response)
    {
    data = $.csv.toObjects(response);
    // generateHtmlTable(data);
    bestPkmn = data[idx].BestPokemon;
    bestPkmn = bestPkmn.replace('[', '').replace(']', '');
    bestPkmn = bestPkmn.split(', ')
    console.log(bestPkmn)

    var i;
    for(i = 0; i<bestPkmn.length; i++){
      $('#def-results').append(pkmnList[bestPkmn[i]]);
      $('#def-results').append('<BR>');
      }
    }
  });
}
