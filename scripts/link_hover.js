const animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
const animateIn = 'fadeIn';
const animateOut = 'fadeOut';
const $icon_desc = $("#icon_desc");
// const $body = $(document.body);
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

    // $body.css({
    //   'background-image': 'linear-gradient(50deg, #4285F4, #4285F4, #DB4437, #F4B400, #0F9D58)',
    //   'animation-duration': '5s',
    // });
  }, function() {
    removeAnimate($icon_desc);
    makeHidden = true;
    $icon_desc.addClass('animated ' + animateOut).one(animationEnd, function() {
      if(makeHidden) $icon_desc.css('visibility', 'hidden');
    });

    // $body.css({
    //   'background-image': 'linear-gradient(230deg, #00274c, #00274c, #b21f1f, #ffcb05)',
    //   'animation-duration': '30s',
    // });
  }
);
