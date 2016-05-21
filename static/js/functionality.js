$(document).ready(function(){
  
  // Materialize Side Nav
  $(".button-collapse").sideNav();

  // Materialize Dropdown
  $('.dropdown-button').dropdown();

  // Portfolio
  function projects(){
  	$.getJSON('http://localhost/sites/latest_portfolio/static/js/info/projects.json', function(data){
  		$(data).each(function(i, val){
  			console.log(val);
  			projectCreator(val);
  		});
  	});

  	function projectCreator(project){
  		var newProject = $('<div>').addClass('col s10 offset-s1 card-panel hoverable');
  		var title = $('<h3>').text(project.title);
  		var description = $('<p>').text(project.description);
  		var pic = $('<img>').addClass('responsive-img').attr('src', project.picture_url);
  		newProject.append(title).append(pic).append(description);
  		$('#portfolio').append(newProject);
  	}
  }

  // FUNCTIONS CALLED ON LOAD
  projects();

});