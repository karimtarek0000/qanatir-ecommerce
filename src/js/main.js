$(function () {
  // ALL VARIABLES
  const year = $("#year");
  const video = $("#video");
  const playVideo = $("#play-video");
  const coverVideo = $("#cover-video");
  const iconVideo = $("#icon-video");
  const cVwrapper = $("#control-video-wrapper");
  const closeBanar = $("#close-banar");
  const links = $("#links a");
  const navbar = $("#navbar");
  const header = $("#header");
  const heightNavbar = navbar.outerHeight();
  const heightHeader = header.outerHeight();
  const logoL = $("#logo-l img");
  const scrollToTop = $("#scroll-to-top");
  const closeSidebar = $("#close-sidebar");
  const closeSidebarShopCart = $("#close-sidebar-shop-cart");
  const sidebarNav = $("#sidebar-nav");
  const toggler = $("#toggler");
  const backDrop = $(".back-drop");
  const shoppingCart = $("#shopping-cart");
  const iconCart = $("#icon-cart");
  const deleteItemShopping = $(".delete-item");
  const cartEmpty = $("#cart-empty");
  const cartAction = $("#cart-actions");

  //
  $(window).scrollTop(0);

  /////////////////////////////////
  //// CLICK
  // VIDEO - PLAY AND PAUSE
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

  // CHANGE ACTIVE CLASS ON LINKS
  links.on("click", function () {
    $(this).addClass("text-como").siblings().removeClass("text-como");
    closeSidebarNav();
  });

  // CLOSE BANAR
  closeBanar.on("click", function () {
    $(this).parent().slideUp();
  });
  // SCROLL TO TOP SMOOTHLY
  scrollToTop.on("click", () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });

  /////////////////////////////////
  //// FUNCTIONS
  const _fixedNavbar = () => {
    if (!navbar.hasClass("specific")) {
      if ($(this).scrollTop() > heightNavbar) {
        navbar.removeClass("sm:absolute sm:bg-transparent");
        navbar.addClass("fixed sm:bg-plantation");
        logoL.css("max-height", "50px");
        return;
      }

      navbar.addClass("sm:absolute sm:bg-transparent");
      navbar.removeClass("fixed sm:bg-plantation");
      logoL.css("max-height", "100px");
    }
  };

  const showBtnScrollToTop = () => {
    if ($(this).scrollTop() > heightHeader) {
      scrollToTop.addClass("-translate-y-10");
      scrollToTop.removeClass("translate-y-48");
      return;
    }

    scrollToTop.addClass("translate-y-48");
    scrollToTop.removeClass("-translate-y-10");
  };

  // SCROLL WILL TRIGGER ONE MORE THAN FUNCTION
  $(window).on("scroll", function () {
    //
    _fixedNavbar();
    //
    showBtnScrollToTop();
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

  function openSidebarNav() {
    sidebarNav.toggleClass("translate-x-0 -translate-x-full");
    backDrop.toggleClass("block hidden");
    $("body, html").css("overflow-y", "hidden");
  }

  function closeSidebarNav() {
    sidebarNav.addClass("translate-x-0 -translate-x-full");
    backDrop.toggleClass("block hidden");
    $("body, html").css("overflow-y", "visible");
  }

  if ($(document).outerWidth() <= 640) {
    toggler.on("click", () => openSidebarNav());
    closeSidebar.on("click", () => closeSidebarNav());
  }

  /////////////////////////////////
  //// SHOPPING CART
  // TOGGLE SHOPPING CART
  iconCart.on("click", (e) => {
    e.stopPropagation();
    if ($(document).outerWidth() > 640) {
      return shoppingCart.slideToggle(200);
    }
    shoppingCart.toggleClass("-translate-x-full sm:hidden");
    backDrop.toggleClass("block hidden");
    $("body, html").css("overflow-y", "hidden");
  });

  // CLOSE SIDEBAR SHOP cart
  closeSidebarShopCart.on("click", (e) => {
    e.stopPropagation();
    shoppingCart.toggleClass("-translate-x-full");
    backDrop.toggleClass("block hidden");
    $("body, html").css("overflow-y", "visible");
  });

  // IF CLICKED ON SHOPPING CART WILL CLOSED
  shoppingCart.on("click", (e) => {
    if ($(document).outerWidth() <= 640) {
      closeSidebarShopCart.trigger("click");
    }
  });

  // DELETE ITEM FROM SHOPPING CART
  deleteItemShopping.on("click", function (e) {
    e.stopPropagation();
    //
    let cartWrapper = $("#cart-wrapper > div").length;

    // 1) - REMOVE ITEM FROM CART
    $(this).parent().remove();

    // 2) - CHECK IF THIS ELEMENT EQIAL 1 WILL ADD MESSAGE EMPTY
    if (cartWrapper === 1) {
      cartEmpty.toggleClass("hidden flex");
      cartAction.toggleClass("hidden");
    }
  });

  // GLOBAL - IF CLICKED ON WINDOW
  $(window).on("click", () => {
    if ($(document).outerWidth() > 640) {
      shoppingCart.slideUp(200);
    }
  });

  // ADD YAER
  year.text(new Date().getFullYear());
});
