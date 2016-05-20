$(document).ready(function(){
  
  // Materialize Side Nav
  $(".button-collapse").sideNav();

  // Materialize Dropdown
  $('.dropdown-button').dropdown();

  // Portfolio
  $('#test').on('click', function(){
  	$.getJSON('http://localhost/sites/latest_portfolio/static/js/info/projects.json', function(data){
  		for(var i=0; i<data.length; i++){
  			console.log(data[i]);
  		}
  	});
  });
});