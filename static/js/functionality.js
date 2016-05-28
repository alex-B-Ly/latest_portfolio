$(document).ready(function(){
  
  // Materialize Side Nav
  $(".button-collapse").sideNav({
    closeOnClick: true
  });

  // Materialize Dropdown
  $('.dropdown-button').dropdown();

  // Materialize Modal
  $('.modal-trigger').leanModal();

  // Skills
  $('.skill-trigger').on('click', function(){
    var skillType = $(this).attr('data-skill-type');
    var skillName = $(this).attr('data-skill-name');

    $.getJSON('http://localhost/sites/latest_portfolio/static/js/info/skills.v0.1.json', function(data){
      var skillData = data[skillType];
      for(var i=0, len=skillData.length; i<len; i++){
        if(skillData[i].skill === skillName){
          skillModal(skillData[i]);
        }
      }
    });

    // SKILL MODAL FUNCTION
    function skillModal(skillChosen){
      $('.skill-modal-title').text(skillChosen.skill);
      $('#skill-modal-itag').removeClass().addClass(skillChosen.itag_class);
      $('.skill-modal-description').text(skillChosen.description);
    }

  });

  // Portfolio
  function projects(){
  	$.getJSON('http://localhost/sites/latest_portfolio/static/js/info/projects.json', function(data){
  		$(data).each(function(i, val){
  			projectCreator(val);
  		});
  	});

  	function projectCreator(project){
  		var newProject = $('<div>').addClass('col s10 offset-s1 l6 card-panel hoverable center-align project').data(project);
  		var title = $('<h4>').text(project.title);
  		var pic = $('<img>').addClass('responsive-img').attr('src', project.picture_url);
  		newProject.append(pic).append(title);
  		$('#portfolio').append(newProject);
  	}
  }

  $(document).on('click', '.project', function(){
    // TODO Empty modal
    projectModalCreator($(this).data());

    $('#project-modal').openModal();
  	console.log($(this).data());
  });

  function projectModalCreator(data){
    var modalContent = $('#project-modal').find('.modal-content'),
    projectTitle = $('<h3>').text(data.title),
    projectDescription = $('<p>').text(data.description),
    projectYear = data.year,
    projectPic = $('<img>').attr('src', data.picture_url).addClass('img-responsive'),
    projectUrl = data.project_url,
    projectCode = data.project_code;

    modalContent.empty();
    modalContent.append(projectTitle).append(projectPic).append(projectDescription);

    // Project site and code
    if( projectUrl || projectCode){
      var projectSiteRow = $('<div>').addClass('row');

      if(projectUrl){
        projectSiteCreator(projectUrl, 'Visit the site');
      }

      if(projectCode){
        projectSiteCreator(projectCode, 'View the code');
      }

      function projectSiteCreator(projLink, projLinkText){
        var projectLink = $('<a>').attr({
          href: projLink,
          target: '_blank'
        }).text(projLinkText);
        projectSiteRow.append(projectLink);
      }

      modalContent.append(projectSiteRow);
    }

  }

  // FUNCTIONS CALLED ON LOAD
  projects();

});