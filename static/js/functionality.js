$(document).ready(function(){
  
  // Materialize Side Nav
  $(".button-collapse").sideNav();

  // Materialize Dropdown
  $('.dropdown-button').dropdown();

  // Portfolio
  function projects(){
  	$.getJSON('http://localhost/sites/latest_portfolio/static/js/info/projects.json', function(data){
  		$(data).each(function(i, val){
  			projectCreator(val);
  		});
  	});

  	function projectCreator(project){
  		var newProject = $('<div>').addClass('col s10 offset-s1');
  		var title = $('<h3>').text(project.title);
  		var description = $('<p>').text(project.description);
  		newProject.append(title).append(description);
  		$('#portfolio').append(newProject);
  	}
  }

  // FUNCTIONS CALLED ON LOAD
  projects();

});