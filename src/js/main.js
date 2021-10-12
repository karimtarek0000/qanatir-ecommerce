$(function () {
  const year = $("#year");
  const video = $("#video");
  const playVideo = $("#play-video");
  const coverVideo = $("#cover-video");
  const iconVideo = $("#icon-video");
  const cVwrapper = $("#control-video-wrapper");
  const closeBanar = $("#close-banar");
  const links = $("#links a");
  const navbar = $("#navbar");
  const heightNavbar = navbar.outerHeight();
  const logoL = $("#logo-l img");

  $(window).scrollTop(0);

  // LINKS
  links.on("click", function () {
    $(this).addClass("text-como").siblings().removeClass("text-como");
  });

  // ADD YAER
  year.text(new Date().getFullYear());

  // VIDEO
  playVideo.on("click", function () {
    const getAttrIconVideo = iconVideo.attr("xlink:href");
    const srcIcon = getAttrIconVideo.split("#")[0];
    //
    coverVideo.toggleClass("opacity-0");
    cVwrapper.toggleClass("control-hover");

    //
    if (!$(this).hasClass("play")) {
      $(this).addClass("play");
      iconVideo.attr("xlink:href", `${srcIcon}#icon-pause`);
      video[0].play();
      return;
    }

    //
    $(this).removeClass("play");
    iconVideo.attr("xlink:href", `${srcIcon}#icon-play-video`);
    video[0].pause();
  });

  // SLIDER
  $(".owl-carousel").owlCarousel({
    items: 1,
    animateOut: "fadeOut",
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    loop: true,
  });

  // BANAR
  closeBanar.on("click", function () {
    $(this).parent().slideUp();
  });

  // FIXED NAVBAR WHEN SCROLL
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > heightNavbar) {
      navbar.removeClass("sm:absolute sm:bg-transparent");
      navbar.addClass("fixed sm:bg-plantation");
      logoL.css("max-height", "50px");
      return;
    }

    navbar.addClass("sm:absolute sm:bg-transparent");
    navbar.removeClass("fixed sm:bg-plantation");
    logoL.css("max-height", "100px");
  });
});
