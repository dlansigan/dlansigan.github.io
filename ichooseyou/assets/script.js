$(document).ready(function(){
// $('#header').load('../header-ads.html');
//   $('#footer').load('../footer-ads.html');

  var data;
  // $.get("http://dlansigan.github.io/ichooseyou/assets/data/defensedata.csv");
  $.ajax({
    type: "GET",
    url: "http://dlansigan.github.io/ichooseyou/assets/data/defensedata.csv",
    dataType: "text",
    success: function(response)
    {
    data = $.csv.toObjects(response);
    $('#test').append(data[0].SecondBestPokemon[1]);
    // generateHtmlTable(data);
    },
    error: function(xhr, status, error) {
      var err = JSON.parse(xhr.responseText);
      alert(err.Message);
    }
  });

  $('#test').append('test');
  // document.write('test');

  function generateHtmlTable(data) {
    var html = '<table  class="table table-condensed table-hover table-striped">';

      if(typeof(data[0]) === 'undefined') {
        return null;
      } else {
    $.each(data, function( index, row ) {
      //bind header
      if(index == 0) {
      html += '<thead>';
      html += '<tr>';
      $.each(row, function( index, colData ) {
        html += '<th>';
        html += colData;
        html += '</th>';
      });
      html += '</tr>';
      html += '</thead>';
      html += '<tbody>';
      } else {
      html += '<tr>';
      $.each(row, function( index, colData ) {
        html += '<td>';
        html += colData;
        html += '</td>';
      });
      html += '</tr>';
      }
    });
    html += '</tbody>';
    html += '</table>';

    $('#csv-display').append(html);
    }
  }
});


// document.open();
//
// document.write("Test");
// // document.write(dData[0].BestPokemon)
//
// document.close();