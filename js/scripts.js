$(function() {

  $("form#get-zip").submit(function () {
  
    var title = $('input#title').val();
    var zip = $("input#zip").val();
    var state = $("input#state").val();
    var party = $("input#party").val();
    
    $("input#zip").val('');

    $.get("http://congress.api.sunlightfoundation.com/legislators/locate?apikey=47fbb2595169491eb7ef2af80e013a15&zip=" + zip, function(responseBody) {
      if (responseBody.results.length === 0) {
        alert("The truth is out there... with a valid query");
      } else { 
        responseBody.results.forEach(function(legislator) {
            
          $("ul#legislators").append(
            "<ul>" +
              "<li class='legislators'><span class='hoverhand'>" + legislator.first_name + " " + legislator.last_name + " (" + legislator.chamber + ")" + " " + legislator.state + " (" + legislator.party + ")" + "</span>"+
                "<ol class='hideToggle'>" +
                  "<li><a href=" + legislator.website + " " + "target='_blank'>" + legislator.website + "</a></li>" + 
                  "<li>" + "Birthday: " + legislator.birthday + "</li>" + 
                  "<li>" + "Senate Class: " + legislator.senate_class + "</li>" + 
                  "<li>" + "Bioguide ID" + legislator.bioguide_id + "</li>" +
                "</ol>" +
              "</li>" +
            "</ul>"
            );
          });
        }

      $("li.legislators").click(function() {
        $(this).children("ol.hideToggle").slideToggle();
      });
    }); 
    
    return false;                   
  });
});
    
// Below is the JQuery fo the Hearings functionality 

$(function() {
  $("form#get-info").submit(function () {

    var query = encodeURI($('input#hearing').val());
 
    $("input#hearing").val('');
    $("ul#result").empty();
    $.get("http://congress.api.sunlightfoundation.com/hearings?apikey=47fbb2595169491eb7ef2af80e013a15&query=" + query, function(responseBody) {
        if (responseBody.results.length === 0) {
          alert("The truth is out there... with a valid query");
        } else {
          responseBody.results.forEach(function(hearing) {
          $("ul#result").append(
            "<ul>" +
              "<li class='hearing-result'>" + hearing.room + " " + 
                "<ol class='hideToggle'>" +
                  "<li>" + hearing.description + "</li>" + 
                "</ol>" +
              "</li>" +
            "</ul>"
            );
          });
        }     
      });
      $(".hearing-result").click(function() {
        $(this).children(".hideToggle").slideToggle();
      });
    return false;  
  });                   
});

