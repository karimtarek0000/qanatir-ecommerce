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
  const header = $("#start-scroll-top");
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
  const openModalProduct = ".open-modal-product";
  const closeModalProduct = $("#close-modal-product");
  const viewModalProduct = $("#view-modal-product");
  const modalProduct = $("#modal-product");
  const reviewPerParent = $(".review-per-parent");
  const categoryProducts = $("#category-products a");
  const aboutProduct = $("#about-product").outerHeight(true);
  const comments = $("#comments").outerHeight(true);
  const quickViewProduct = $("#quick-view-product");

  //
  $(window).scrollTop(0);
  /////////////////////////////////
  //// WOW
  new WOW().init();
  //
  $(".wow").each(function () {
    var wowHeight = 200;
    $(this).attr("data-wow-offset", wowHeight);
    $(this).attr("data-wow-duration", "2s");
  });

  /////////////////////////////////
  //// CLICK
  // VIDEO - PLAY AND PAUSE
  playVideo.on("click", function () {
    const getAttrIconVideo = iconVideo.attr("xlink:href");
    const srcIcon = getAttrIconVideo.split("#")[0];

    //
    if (!$(this).hasClass("play")) {
      coverVideo.addClass("opacity-0");
      cVwrapper.addClass("control-hover");
      $(this).addClass("play");
      iconVideo.attr("xlink:href", `${srcIcon}#icon-pause`);
      video[0].play();
      return;
    }
    //
    coverVideo.removeClass("opacity-0");
    cVwrapper.removeClass("control-hover");
    $(this).removeClass("play");
    iconVideo.attr("xlink:href", `${srcIcon}#icon-play-video`);
    video[0].pause();
  });

  // CHANGE ACTIVE CLASS ON LINKS
  links.on("click", function () {
    $(this).addClass("text-golden").siblings().removeClass("text-golden");
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

    //
    if ($(this).scrollTop() > heightNavbar) {
      navbar.removeClass("sm:bg-transparent sm:text-black");
      navbar.addClass("fixed sm:bg-plantation sm:text-white");
      logoL.css("max-height", "50px");
      return;
    }
    navbar.addClass("sm:bg-transparent sm:text-black");
    navbar.removeClass("fixed sm:bg-plantation sm:text-white");
    logoL.css("max-height", "100px");
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

  /////////////////////////////////
  //// SLIDERS
  $(".owl-carousel.our-story").owlCarousel({
    items: 1,
    animateOut: "fadeOut",
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    loop: true,
    nav: false,
  });
  //
  $(".owl-carousel.related-products").owlCarousel({
    items: 4,
    lazyLoad: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    loop: true,
    dots: false,
    nav: true,
    navText: ["<div class='prev-slide'></div>", "<div class='next-slide'></div>"],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  });

  function whenDragged() {
    const category = location.href.split("#")[1];
    $("#category-products")
      .find(`a[href="#${category}"]`)
      .addClass("shape-undeline")
      .siblings()
      .removeClass("shape-undeline");
  }

  // TOGGLE SIDEBAR NAV
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
  toggler.on("click", () => openSidebarNav());
  closeSidebar.on("click", () => closeSidebarNav());

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

  // CLOSE SIDEBAR SHOP CART
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

  /////////////////////////////////
  //// MODAL PRODUCT
  // OPEN MODAL
  $(document).on("click", openModalProduct, (e) => {
    e.stopPropagation();
    e.preventDefault();
    viewModalProduct.toggleClass("flex hidden");
    $("body, html").css("overflow-y", "hidden");
    setTimeout(() => modalProduct.removeClass("-translate-y-20 opacity-0"), 300);
  });
  // CLOSE MODAL
  closeModalProduct.on("click", () => {
    modalProduct.addClass("-translate-y-20 opacity-0");
    setTimeout(() => viewModalProduct.toggleClass("flex hidden"), 300);
    $("body, html").css("overflow-y", "visible");
  });

  /////////////////////////////////
  //// RATING AND REVIEWS
  const settingsRating = {
    totalStars: 5,
    starShape: "rounded",
    emptyColor: "#fefbf2",
    strokeWidth: 40,
    strokeColor: "#777777",
    hoverColor: "salmon",
    activeColor: "#777777",
    useGradient: false,
    readOnly: true,
  };
  $(".rating").starRating({
    starSize: 20,
    ...settingsRating,
  });
  $(".rating-review").starRating({
    starSize: 15,
    ...settingsRating,
  });
  const progressReview = () => {
    if ($(this).scrollTop() >= aboutProduct) {
      // RATINGS REVIEWS
      reviewPerParent.each((_, cur) => {
        const per = $(cur).children("span:first").attr("data-review-per");
        $(cur).parents(".review").find(".progress").css("width", `${per}%`);
      });
    }
  };

  /////////////////////////////////
  //// QUICK VIEW PRODUCT
  const toggleQuickProduct = () => {
    if ($(this).scrollTop() >= comments) {
      quickViewProduct.removeClass("translate-y-96");
      quickViewProduct.addClass("translate-y-0");
      return;
    }
    quickViewProduct.addClass("translate-y-96");
    quickViewProduct.removeClass("translate-y-0");
  };

  /////////////////////////////////
  //// CATEGORY PRODUCTS
  // CHANGE ACTIVE CLASS ON CATEGORY
  categoryProducts.on("click", function () {
    $(this).addClass("shape-undeline").siblings().removeClass("shape-undeline");
  });
  //
  $(".owl-carousel.products").owlCarousel({
    items: 1,
    lazyLoad: true,
    loop: false,
    nav: false,
    dots: false,
    autoplay: false,
    smartSpeed: 200,
    URLhashListener: true,
    autoplayHoverPause: true,
    startPosition: "URLHash",
    onChanged: whenDragged,
  });

  /////////////////////////////////
  //// GLOBAL
  //
  $(document).on("keydown", (e) => {
    if (e.key === "Escape") {
      closeModalProduct.trigger("click");
    }
  });
  // IF CLICKED ON WINDOW
  $(window).on("click", () => {
    if ($(document).outerWidth() > 640) {
      shoppingCart.slideUp(200);
    }
  });
  // SCROLL WILL TRIGGER ONE MORE THAN FUNCTION
  $(window).on("scroll", function () {
    _fixedNavbar();
    showBtnScrollToTop();
    toggleQuickProduct();
    progressReview();
    // TOGGLE PLAY VIDEO WHEN SCROLL
    $(".video-specific").each(function () {
      const playVideo = $(this).find("#play-video");
      const getAttrIconVideo = iconVideo.attr("xlink:href");
      const srcIcon = getAttrIconVideo.split("#")[0];
      const getHeightAndTop = $(this).outerHeight() + $(this).offset().top;
      //
      if (
        $(window).scrollTop() >= $(this).offset().top - 50 &&
        $(window).scrollTop() < getHeightAndTop - 200
      ) {
        //
        if (!$(playVideo).hasClass("play")) {
          coverVideo.addClass("opacity-0");
          cVwrapper.addClass("control-hover");
          $(playVideo).addClass("play");
          iconVideo.attr("xlink:href", `${srcIcon}#icon-pause`);
          video[0].play();
          return;
        }
      }

      if (
        $(window).scrollTop() < $(this).offset().top - 50 ||
        $(window).scrollTop() >= getHeightAndTop - 200
      ) {
        coverVideo.removeClass("opacity-0");
        cVwrapper.removeClass("control-hover");
        $(playVideo).removeClass("play");
        iconVideo.attr("xlink:href", `${srcIcon}#icon-play-video`);
        video[0].pause();
        return;
      }
    });
  });

  // RUN FUNCTIONS
  whenDragged();

  // ADD YAER
  year.text(new Date().getFullYear());
});
