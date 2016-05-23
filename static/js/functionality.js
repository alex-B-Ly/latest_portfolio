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
  		var newProject = $('<div>').addClass('col s10 offset-s1 l6 offset-l3 card-panel hoverable center-align project').data(project);
  		var title = $('<h3>').text(project.title);
  		var techTitle = $('<h5>').text('Tech Used:');
  		var descTitle = $('<h5>').text('Description:');
  		var description = $('<p>').text(project.description);
  		var pic = $('<img>').addClass('responsive-img').attr('src', project.picture_url);
  		newProject.append(pic).append(title).append(techTitle).append(descTitle).append(description);
  		$('#portfolio').append(newProject);
  	}
  }

  $(document).on('click', '.project', function(){
  	console.log($(this).data());
  });

  // FUNCTIONS CALLED ON LOAD
  projects();

});