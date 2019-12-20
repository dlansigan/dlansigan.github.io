$(document).ready(function(){

  // Set default button
  document.getElementById('best-def-button').style.background='rgba(255, 255, 255, 0.65)';
  document.getElementById('best-atk-button').style.background='rgba(255, 255, 255, 0.3)';

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
    url: "https://raw.githubusercontent.com/dlansigan/dlansigan.github.io/master/pogostic/assets/data/offtypes.csv",
    dataType: "text",
    success: function(response)
    {
    defTypes = $.csv.toArrays(response);
    defTypes = defTypes[0];
    var i;
    const numTypes = defTypes.length;
    for (i = 0; i < numTypes; i++) {
      defType1 = document.getElementById('defType-select-1');
      defType2 = document.getElementById('defType-select-2');
      if (i==0) {
        defType2.options[defType2.options.length] = new Option('none', 'none');
      }
      if (atkTypes[i] != ' ') {
        defType1.options[defType1.options.length] = new Option(defTypes[i], defTypes[i]);
        defType2.options[defType2.options.length] = new Option(defTypes[i], defTypes[i]);
      }
      // } else{
      //   defType2.options[defType2.options.length] = new Option('none', 'none');
      // }

    }
    }
  });

  $('.nav-button').hover(function(){
    $(this).css('border-color', 'rgba(255, 255, 255, .5)');
    $(this).css('color', 'rgba(255, 255, 255, .5)');
  }, function(){
    $(this).css('border-color', 'rgba(0, 0, 0, 1)');
    $(this).css('color', 'rgba(0, 0, 0, 1)');
  })

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
  var defType1 = document.getElementById('defType-select-1');
  var defType2 = document.getElementById('defType-select-2');
  var type1 = defType1.options[defType1.selectedIndex].value;
  var type2 = defType2.options[defType2.selectedIndex].value;

  type1 = type1.replace(' ','');
  type2 = type2.replace(' ','');

  if (type1 == 'none') {
    var type = type2;
  } else if (type2 == 'none') {
    var type = type1;
  } else if (type1 == type2) {
    var type = type1;
  } else {
    var type = [type1, type2];
    type.sort();
    type = type.join('/');
  }

  var atkTypeList;
  $.ajax({
    type: "GET",
    url: "https://raw.githubusercontent.com/dlansigan/dlansigan.github.io/master/pogostic/assets/data/offtypes.csv",
    dataType: "text",
    success: function(response)
    {
    atkTypeList = $.csv.toArrays(response);
    atkTypeList = atkTypeList[0];
    getAtkResultsHelper(atkTypeList, type);
    }
  })
}

function getAtkResultsHelper(atkTypeList, type){
  var data;
  $.ajax({
    type: "GET",
    url: "http://dlansigan.github.io/pogostic/assets/data/offensedata.csv",
    dataType: "text",
    success: function(response)
    {
    data = $.csv.toObjects(response);

    finalizeAtkResults(type, data, atkTypeList);
    }
  });
}

function finalizeAtkResults(type, data, atkTypeList){
  var defTypes;
  $.ajax({
    type: "GET",
    url: "https://raw.githubusercontent.com/dlansigan/dlansigan.github.io/master/pogostic/assets/data/deftypes.csv",
    dataType: "text",
    success: function(response)
    {
    defTypes = $.csv.toArrays(response);
    defTypes = defTypes[0];
    defTypes = defTypes.map(str => str.replace(/\s/g, ''));
    var idx = defTypes.findIndex(t => t == type);

    bestDamage = data[idx].BestDamage;
    bestDamage = parseCSVEntry(bestDamage);

    secondBestDamage = data[idx].SecondBestDamage;
    secondBestDamage = parseCSVEntry(secondBestDamage);

    fillAtkTable('best-atk-table',atkTypeList,bestDamage);
    fillAtkTable('second-best-atk-table',atkTypeList,secondBestDamage);
    // var i;
    // const numTypes = defTypes.length;
    // for (i = 0; i < numTypes; i++) {
    //   atkType = document.getElementById('atkType-select');
    //   if (atkTypes[i] != ' ') {
    //     atkType.options[atkType.options.length] = new Option(atkTypes[i], i)
    //   }
    // }
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

    entry_pkmn = pkmnList[bestPkmn[i]];
    entry_type = pkmnTypeList[bestPkmnType[i]];
    if (typeof entry_pkmn =='undefined'){
      entry_pkmn = 'none';
      entry_type = '';
    }
    cell.innerHTML = entry_pkmn+'<BR><i>'+entry_type+'</i>';
    }
}

function fillAtkTable(tableID,atkTypeList,bestAtkType){
  var table = document.getElementById(tableID);
  var i;
  for(i = 0; i<bestAtkType.length; i++){
      var row = table.insertRow(-1);
      var cell = row.insertCell(0);
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

function showTab(divID){
  if (divID=='atk'){
    document.getElementById('best-atk-div').style.display='block';
    document.getElementById('best-def-div').style.display='none';
    document.getElementById('best-atk-button').style.background='rgba(255, 255, 255, 0.65)';
    document.getElementById('best-def-button').style.background='rgba(255, 255, 255, 0.3)';
  }
  else if (divID=='def') {
    document.getElementById('best-def-div').style.display='block';
    document.getElementById('best-atk-div').style.display='none';
    document.getElementById('best-def-button').style.background='rgba(255, 255, 255, 0.65)';
    document.getElementById('best-atk-button').style.background='rgba(255, 255, 255, 0.3)';
  }

}
