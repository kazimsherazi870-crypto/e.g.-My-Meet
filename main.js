$(function () {
  // سال اپ ڈیٹ کرنا
  $("#year").text(new Date().getFullYear());

  // موبائل مینو ٹوگل
  $(".menu-toggle").on("click", function () {
    $(".navbar").toggleClass("open");
  });
  $(".navbar a").on("click", function () {
    $(".navbar").removeClass("open");
  });

  // تھیم سوئچ (Light / Dark)
  $(".theme-toggle").on("click", function () {
    $("body").toggleClass("light");
    localStorage.setItem(
      "portfolioTheme",
      $("body").hasClass("light") ? "light" : "dark"
    );
  });
  if (localStorage.getItem("portfolioTheme") === "light") {
    $("body").addClass("light");
  }

  // اسکرول پر سیکشن ریویل اور پروگریس بار
  function reveal() {
    $(".reveal").each(function () {
      if ($(this).get(0).getBoundingClientRect().top < window.innerHeight * 0.9) {
        $(this).addClass("visible");
      }
    });
  }
  reveal();
  $(window).on("scroll resize", function () {
    reveal();
    var doc = $(document).height() - $(window).height();
    $("#progress").css("width", (doc > 0 ? ($(window).scrollTop() / doc) * 100 : 0) + "%");
  });

  // 1. سادہ سلائیڈر (.slide)
  var slides = $(".slide");
  if (slides.length) {
    var dots = "";
    slides.each(function (i) {
      dots += '<span class="slide-dot ' + (i === 0 ? "active" : "") + '" data-i="' + i + '"></span>';
    });
    $(".slide-dots").html(dots);

    var currentSlide = 0;
    function showBasicSlide(i) {
      currentSlide = (i + slides.length) % slides.length;
      slides.removeClass("active").eq(currentSlide).addClass("active");
      $(".slide-dot").removeClass("active").eq(currentSlide).addClass("active");
    }

    $(document).on("click", ".slide-dot", function () {
      showBasicSlide(Number($(this).data("i")));
    });
    setInterval(function () {
      showBasicSlide(currentSlide + 1);
    }, 3500);
  }

  // 2. پورٹ فولیو سلائیڈر (#portfolioSlider) - فارم سے الگ اور محفوظ
  const slider = document.getElementById("portfolioSlider");
  if (slider) {
    const pSlides = slider.querySelectorAll(".portfolio-slide");
    const dotsContainer = slider.querySelector(".slider-dots");
    const prevBtn = slider.querySelector(".slider-prev");
    const nextBtn = slider.querySelector(".slider-next");
    const slideNumber = document.getElementById("slideNumber");
    const slideTitle = document.getElementById("slideTitle");

    const titles = [
      "Modern Web Design",
      "Responsive Websites",
      "Full-Stack Development",
      "Creative Digital Projects"
    ];

    let pCurrent = 0;
    let autoPlay;

    if (pSlides.length && dotsContainer) {
      pSlides.forEach(function (slide, index) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "slider-dot";
        dot.setAttribute("aria-label", "Show image " + (index + 1));
        dot.addEventListener("click", function () {
          showPortfolioSlide(index);
          startAutoPlay();
        });
        dotsContainer.appendChild(dot);
      });

      const dots = dotsContainer.querySelectorAll(".slider-dot");

      function showPortfolioSlide(index) {
        pSlides[pCurrent].classList.remove("active");
        if (dots[pCurrent]) dots[pCurrent].classList.remove("active");

        pCurrent = (index + pSlides.length) % pSlides.length;

        pSlides[pCurrent].classList.add("active");
        if (dots[pCurrent]) dots[pCurrent].classList.add("active");

        if (slideNumber) {
          slideNumber.textContent =
            String(pCurrent + 1).padStart(2, "0") +
            " / " +
            String(pSlides.length).padStart(2, "0");
        }
        if (slideTitle) {
          slideTitle.textContent = titles[pCurrent] || "Portfolio Project";
        }
      }

      function changeSlide(step) {
        showPortfolioSlide(pCurrent + step);
      }

      function startAutoPlay() {
        clearInterval(autoPlay);
        autoPlay = setInterval(function () {
          changeSlide(1);
        }, 3500);
      }

      if (prevBtn) {
        prevBtn.addEventListener("click", function () {
          changeSlide(-1);
          startAutoPlay();
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener("click", function () {
          changeSlide(1);
          startAutoPlay();
        });
      }

      slider.addEventListener("mouseenter", function () {
        clearInterval(autoPlay);
      });
      slider.addEventListener("mouseleave", startAutoPlay);
      slider.addEventListener("focusin", function () {
        clearInterval(autoPlay);
      });
      slider.addEventListener("focusout", function () {
        setTimeout(function () {
          if (!slider.contains(document.activeElement)) {
            startAutoPlay();
          }
        }, 0);
      });

      showPortfolioSlide(0);
      startAutoPlay();
    }
  }

  // 3. کانٹیکٹ فارم ویلیڈیشن
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();
    var name = $.trim($("#name").val());
    var email = $.trim($("#email").val());
    var message = $.trim($("#message").val());

    if (!name || !email || !message) {
      $("#formMsg").text("Please fill in all fields.").css("color", "#ff8d8d");
      return;
    }
    $("#formMsg")
      .text("Form validated successfully. Connect this form to your email/backend to receive messages.")
      .css("color", "#b9ff3f");
  });
});
  
