$(document).ready(function(){
// $('#header').load('../header-ads.html');
//   $('#footer').load('../footer-ads.html');

  // Create attack type dropdown list
  var atkTypes;
  $.ajax({
    type: "GET",
    url: "https://raw.githubusercontent.com/dlansigan/dlansigan.github.io/master/pogostic/assets/data/offtypes.csv",
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

  // Create Pokemon type dropdown list
  var defTypes;
  $.ajax({
    type: "GET",
    url: "https://raw.githubusercontent.com/dlansigan/dlansigan.github.io/master/pogostic/assets/data/deftypes.csv",
    dataType: "text",
    success: function(response)
    {
    defTypes = $.csv.toArrays(response);
    defTypes = defTypes[0];
    var i;
    const numTypes = defTypes.length;
    for (i = 0; i < numTypes-2; i++) {
      defType = document.getElementById('defType-select');
      if (defTypes[i] != ' ') {
        defType.options[defType.options.length] = new Option(defTypes[i], i)
      }
    }
    }
  });
  // $('#test').append('test');

});

function getDefResults() {
  $('#best-pkmn-table').html("");
  $('#second-best-pkmn-table').html("");
  var atkType = document.getElementById('atkType-select');
  var idx = atkType.options[atkType.selectedIndex].value;

  var pkmnList;
  $.ajax({
    type: "GET",
    url: "https://raw.githubusercontent.com/dlansigan/dlansigan.github.io/master/pogostic/assets/data/pokemon.csv",
    dataType: "text",
    success: function(response)
    {
    pkmnList = $.csv.toArrays(response);
    pkmnList = pkmnList[0];
    var pkmnTypeList;
    $.ajax({
      type: "GET",
      url: "https://raw.githubusercontent.com/dlansigan/dlansigan.github.io/master/pogostic/assets/data/deftypes.csv",
      dataType: "text",
      success: function(response)
      {
      pkmnTypeList = $.csv.toArrays(response);
      pkmnTypeList = pkmnTypeList[0];
      getDefResultsHelper(pkmnList, pkmnTypeList, idx);
      }
    })
    }
  })
}

function getDefResultsHelper(pkmnList, pkmnTypeList, idx){
  var data;
  $.ajax({
    type: "GET",
    url: "http://dlansigan.github.io/pogostic/assets/data/defensedata.csv",
    dataType: "text",
    success: function(response)
    {
    data = $.csv.toObjects(response);

    bestPkmn = data[idx].BestPokemon;
    bestPkmn = parseCSVEntry(bestPkmn);

    bestPkmnType = data[idx].BestPokemonType;
    bestPkmnType = parseCSVEntry(bestPkmnType);

    secondBestPkmn = data[idx].SecondBestPokemon;
    secondBestPkmn = parseCSVEntry(secondBestPkmn);

    secondBestPkmnType = data[idx].SecondBestPokemonType;
    secondBestPkmnType = parseCSVEntry(secondBestPkmnType);

    fillDefTable('best-pkmn-table',pkmnList,pkmnTypeList,bestPkmn,bestPkmnType);
    fillDefTable('second-best-pkmn-table',pkmnList,pkmnTypeList,secondBestPkmn,secondBestPkmnType);
    }
  });
}

function getAtkResults() {
  $('#best-atk-table').html("");
  $('#second-best-atk-table').html("");
  var defType = document.getElementById('defType-select');
  var idx = defType.options[defType.selectedIndex].value;

  var atkTypeList;
  $.ajax({
    type: "GET",
    url: "https://raw.githubusercontent.com/dlansigan/dlansigan.github.io/master/pogostic/assets/data/offtypes.csv",
    dataType: "text",
    success: function(response)
    {
    atkTypeList = $.csv.toArrays(response);
    atkTypeList = atkTypeList[0];
    getAtkResultsHelper(atkTypeList, idx);
    }
  })
}

function getAtkResultsHelper(atkTypeList, idx){
  var data;
  $.ajax({
    type: "GET",
    url: "http://dlansigan.github.io/pogostic/assets/data/offensedata.csv",
    dataType: "text",
    success: function(response)
    {
    data = $.csv.toObjects(response);

    bestDamage = data[idx].BestDamage;
    bestDamage = parseCSVEntry(bestDamage);

    secondBestDamage = data[idx].SecondBestDamage;
    secondBestDamage = parseCSVEntry(secondBestDamage);

    fillAtkTable('best-atk-table',atkTypeList,bestDamage);
    fillAtkTable('second-best-atk-table',atkTypeList,secondBestDamage);
    }
  });
}

function fillDefTable(tableID,pkmnList,pkmnTypeList,bestPkmn,bestPkmnType){
  var table = document.getElementById(tableID);
  var i;
  for(i = 0; i<bestPkmn.length; i++){
    if (i%2){
      var cell = row.insertCell(1);
    }
    else {
      var row = table.insertRow(-1);
      var cell = row.insertCell(0);
    }

    cell.innerHTML = pkmnList[bestPkmn[i]]+'<BR>'+pkmnTypeList[bestPkmnType[i]];
    }
}

function fillAtkTable(tableID,atkTypeList,bestAtkType){
  var table = document.getElementById(tableID);
  var i;
  for(i = 0; i<bestAtkType.length; i++){
    if (i%2){
      var cell = row.insertCell(1);
    }
    else {
      var row = table.insertRow(-1);
      var cell = row.insertCell(0);
    }

    entry = atkTypeList[bestAtkType[i]];
    if (typeof entry =='undefined'){
      entry = 'none';
    }
    cell.innerHTML = entry;
    }
}

function parseCSVEntry(data){
  data = data.replace('[', '').replace(']', '');
  data = data.split(', ');

  return data;
}

function clearTables(tableID){
  $('#best-'+tableID+'-table').html("");
  $('#second-best-'+tableID+'-table').html("");
}
