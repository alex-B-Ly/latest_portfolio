$(document).ready(function(){

 // MATERIALIZE FUNCTIONALITY

  // Materialize Side Nav
  $(".button-collapse").sideNav({
    closeOnClick: true
  });

  // Materialize Dropdown
  $('.dropdown-button').dropdown();

  // Materialize Modal
  $('.modal-trigger').leanModal();

  // END MATERIALIZE


// HEADER IMAGE FUNCTIONALITY
    // height fallback.
  function headerSizer(){
    $('.header-image').height(window.innerHeight);
  }

  $(window).resize(headerSizer);

// HEADER EVENT: full stack typing
  // Do not show cursor, makes title look cleaner
  function fullStackTyping(){
    var fullStack = new TypeWriting({
      targetElement: document.getElementsByClassName('job-title')[0],
      inputString: 'Full Stack Developer',
      typing_interval: 55,
      blink_interval: '0',
      cursor_color: '#fff'
    });
  }

// About Me section

  // SCROLL EVENT: whoami
  function whoamiCreator(){
    var typeWriting = new TypeWriting({
      targetElement: document.getElementsByClassName('whoami')[0],
      inputString: 'whoami',
      typing_interval: 190,
      blink_interval: '1.6s',
      cursor_color: '#000'
    });
    setTimeout(function(){
      if($('.job-title').text() !== 'Full Stack Developer'){
        $('.job-title').text('Full Stack Developer');
      }
    }, 1500);
  }

  // Nav color change
  function navColorRed(){
    $('nav').css('background', '#8A0E0E');
  }

  function navColorBlack(){
    $('nav').css('background', '#000');
  }

// Skills section
  $('.skill-trigger').on('click', function(){
    var skillType = $(this).attr('data-skill-type');
    var skillName = $(this).attr('data-skill-name');

    $.getJSON('http://www.alexly-webdev.com/static/js/info/skills.v1.json', function(data){
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

// Portfolio section

    // Gets project JSON and creates cards on load.
  function projects(){
  	$.getJSON('http://www.alexly-webdev.com/static/js/info/projects.json', function(data){
  		$(data).each(function(i, val){
  			projectCreator(val);
  		});
  	});

  	function projectCreator(project){
  		var newProject = $('<div>').addClass('col s10 offset-s1 l6 card-panel hoverable center-align project').data(project),
      titleRow = $('<div>').addClass('col s12'),
  		title = $('<h4>').text(project.title),
      picRow = $('<div>').addClass('col s12'),
  		pic = $('<img>').addClass('responsive-img').attr('src', project.picture_url);
      titleRow.append(title);
      picRow.append(pic);
  		newProject.append(picRow).append(titleRow);
  		$('#portfolio').append(newProject);
  	}
  }

    // Project modal functionality
  $(document).on('click', '.project', function(){
    projectModalCreator($(this).data());

    $('#project-modal').openModal();
  });

  function projectModalCreator(data){
    var modalContent = $('#project-modal').find('.modal-content'),
    projectDescTitle = $('<h4>').text('Description'),
    projectTechTitle = $('<h4>').text('Tech Used'),
    projectTitle = $('<h3>').text(data.title),
    projectDescription = $('<p>').text(data.description),
    projectTechs = data.techs,
    projectYear = data.year,
    projectPic = $('<img>').attr('src', data.picture_url).addClass('responsive-img'),
    projectUrl = data.project_url,
    projectCode = data.project_code;

    // Modal tech create
    function techCreator(techArr){
      var techDesc = techArr.map(function(index, elem) {
        if(elem === 0){
          return index;
        }else{
          return ' ' + index;
        }
      }),
      techDescString = techDesc.toString();
      techParagraph = $('<p>').addClass('project-modal-techs').text(techDescString);
      return techParagraph;
    }

    var techs = techCreator(projectTechs);

    // Empty modal and append all the info
    modalContent.empty();
    modalContent.append(projectTitle)
      .append(projectPic)
      .append(projectTechTitle)
      .append(techs)
      .append(projectDescTitle)
      .append(projectDescription);

    // Project site and code links in modal
    if( projectUrl || projectCode){
      var projectSiteRow = $('<div>').addClass('row');

      if(projectUrl){
        projectSiteCreator(projectUrl, 'Visit the site', 'project-site-url', 'fa fa-hand-o-right');
      }

      if(projectCode){
        projectSiteCreator(projectCode, 'View the code', 'project-code-url', 'fa fa-code');
      }

      // Create site and code links
      function projectSiteCreator(projLink, projLinkText, projLinkClass, projLinkITag){
        var projectLink = $('<a>')
          .attr({
            href: projLink,
            target: '_blank'
          })
          .text(projLinkText)
          .addClass(projLinkClass),
        projectITag = $('<i>').addClass(projLinkITag),
        projectLinkCol = $('<div>').addClass('col s12 l6 center-align proj-link-wrap');

        projectLinkCol.append(projectITag).append(projectLink);
        projectSiteRow.append(projectLinkCol);
      }

      modalContent.append(projectSiteRow);
    }

  }

// SMOOTH SCROLL
  // Source: css-tricks smooth scroll, modified to only act on a tags inside nav.
  $(function() {
    $('.lg-nav-links a[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1200);
          return false;
        }
      }
    });
  });


// SCROLLTOP FUNCTIONALITY
  // Note for future self: This function calls the scroller inner function, with target element, position from top of target elem for when the callback should fire, comp operator to have different scroll events, the callback, and remover to choose if eventListener should be removed
    // This function removes event listener if remover === true
  function scrollEventFire(){
  
    function scroller(elem, posChosen, comp, callback, remover){
      function scrollEvent(){
        if(comp === 'greater'){
          if($(window).scrollTop() >= $(elem).position().top - posChosen){
            callback();
            if(remover){
              $(document).off('scroll', scrollEvent);
            }
          }
        }else if('less'){
          if($(window).scrollTop() < $(elem).position().top - posChosen){
            callback();
            if(remover){
              $(document).off('scroll', scrollEvent);
            }
          }
        }        
      }
      $(document).on('scroll', scrollEvent);
    }

    // Scroll event binding
    scroller('#about_me', 125, 'greater' ,whoamiCreator, true);
    scroller('#about_me', 125, 'greater', navColorRed, false);
    scroller('.header-image', 1, 'less', navColorBlack, false);
  }

// MATERIAL MODAL SCROLL POSITION FIX
  $(document).on('click', '.project' ,function(){
    $('#project-modal').scrollTop(0)
  });

  $(document).on('click', '.skill-trigger' ,function(){
    $('#skill-modal').scrollTop(0)
  });

// FUNCTIONS CALLED ON LOAD
  fullStackTyping();
  scrollEventFire();
  headerSizer();
  projects();

});