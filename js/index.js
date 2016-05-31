//storing variables to be used later
var arrResults = [];
var html = '';

// Adding the title and snippet from wiki api into an array
function Result(title, snippet) {
  this.title = title;
  this.snippet = snippet;
}

function search() {
  // found this online. Still dont understand how this fully works
  $.ajax({
    url: 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + $('#search').val(),
    dataType: 'jsonp',
    type: 'POST',
    headers: {
      'Api-User-Agent': 'Example/1.0'
    },
    success: function(data) {

      // Empty the results to make sure it can do a fresh search
      $('.results').empty();

      arrResults.length = 0;

      var tempArr = data.query.search;

      //reading off each result in tempArr and pushing a new result to the results array. Then wrapping each result in html tags
      for (var result in tempArr) {
        arrResults.push(new Result(tempArr[result].title, tempArr[result].snippet));
        html = '<div id="articles" class="well"><a href="https://en.wikipedia.org/wiki/' + tempArr[result].title + '"target="_blank"><h3>' + tempArr[result].title + '</h3></a><p>' + tempArr[result].snippet + '</p></div>';

        // add html list with .append using .html only adds one article
        $('.results').append(html);
      }
    }
  });

  // auto search cause I dont have a button
  $('#search').unbind('keyup');
  $('#search').keyup(function() {
    search();
  });
}

$('#search').keyup(function() {
  search();
});