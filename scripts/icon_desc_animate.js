var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
var animateIn = 'fadeIn';
var animateOut = 'fadeOut';
var icon_desc = $("#icon_desc");
var makeHidden = true;

function removeAnimate() {
	icon_desc.removeClass('animated');
	icon_desc.removeClass(animateIn);
	icon_desc.removeClass(animateOut);
}

//On load
icon_desc.css('visibility', 'hidden');

//On link hovers
$( "a" ).hover(
  function() {
  	removeAnimate();
  	makeHidden = false;
  	icon_desc.text($(this)[0].getAttribute("aria-label"));
  	icon_desc.css('visibility', 'visible');
  	icon_desc.addClass('animated ' + animateIn);
  }, function() {
  	removeAnimate();
  	makeHidden = true;
  	icon_desc.addClass('animated ' + animateOut).one(animationEnd, function() {
  		if(makeHidden){
  			icon_desc.css('visibility', 'hidden');
  		}
    });
  }
);
