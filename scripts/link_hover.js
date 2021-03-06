const animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
const animateIn = 'fadeIn';
const animateOut = 'fadeOut';
const $icon_desc = $("#icon_desc");
var makeHidden = true;

function removeAnimate($obj) {
  $obj.removeClass('animated');
  $obj.removeClass(animateIn);
  $obj.removeClass(animateOut);
}

//On link hovers
$("a").hover(
  function() {
    removeAnimate($icon_desc);
    makeHidden = false;
    $icon_desc.text($(this)[0].getAttribute("aria-label"));
    $icon_desc.css('visibility', 'visible');
    $icon_desc.addClass('animated ' + animateIn);
  }, function() {
    removeAnimate($icon_desc);
    makeHidden = true;
    $icon_desc.addClass('animated ' + animateOut).one(animationEnd, function() {
      if(makeHidden) $icon_desc.css('visibility', 'hidden');
    });
  }
);
