$(function(){
  $("#year").text(new Date().getFullYear());

  $(".menu-toggle").on("click", function(){
    $(".navbar").toggleClass("open");
  });
  $(".navbar a").on("click", function(){ $(".navbar").removeClass("open"); });

  $(".theme-toggle").on("click", function(){
    $("body").toggleClass("light");
    localStorage.setItem("portfolioTheme",$("body").hasClass("light")?"light":"dark");
  });
  if(localStorage.getItem("portfolioTheme")==="light") $("body").addClass("light");

  function reveal(){
    $(".reveal").each(function(){
      if($(this).get(0).getBoundingClientRect().top < window.innerHeight*.9) $(this).addClass("visible");
    });
  }
  reveal();
  $(window).on("scroll resize", function(){
    reveal();
    var doc=$(document).height()-$(window).height();
    $("#progress").css("width",(doc>0?($(window).scrollTop()/doc)*100:0)+"%");
  });

  var slides=$(".slide");
  if(slides.length){
    var dots="";
    slides.each(function(i){ dots+='<span class="slide-dot '+(i===0?"active":"")+'" data-i="'+i+'"></span>'; });
    $(".slide-dots").html(dots);
    var current=0;
    function showSlide(i){
      current=i;
      slides.removeClass("active").eq(i).addClass("active");
      $(".slide-dot").removeClass("active").eq(i).addClass("active");
    }
    $(document).on("click",".slide-dot",function(){showSlide(Number($(this).data("i")));});
    setInterval(function(){showSlide((current+1)%slides.length)},3500);
  }

  $("#contactForm").on("submit", function(e){
    e.preventDefault();
    var name=$.trim($("#name").val()), email=$.trim($("#email").val()), message=$.trim($("#message").val());
    if(!name || !email || !message){
      $("#formMsg").text("Please fill in all fields.").css("color","#ff8d8d");
      const slider = document.getElementById("portfolioSlider");

const slides = slider.querySelectorAll(".portfolio-slide");
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

let current = 0;
let autoPlay;

slides.forEach(function (slide, index) {
    const dot = document.createElement("button");

    dot.type = "button";
    dot.className = "slider-dot";
    dot.setAttribute("aria-label", "Show image " + (index + 1));

    dot.addEventListener("click", function () {
        showSlide(index);
        startAutoPlay();
    });

    dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll(".slider-dot");

function showSlide(index) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");

    current = (index + slides.length) % slides.length;

    slides[current].classList.add("active");
    dots[current].classList.add("active");

    slideNumber.textContent =
        String(current + 1).padStart(2, "0") +
        " / " +
        String(slides.length).padStart(2, "0");

    slideTitle.textContent = titles[current] || "Portfolio Project";
}

function changeSlide(step) {
    showSlide(current + step);
}

function startAutoPlay() {
    clearInterval(autoPlay);

    autoPlay = setInterval(function () {
        changeSlide(1);
    }, 3500);
}

prevBtn.addEventListener("click", function () {
    changeSlide(-1);
    startAutoPlay();
});

nextBtn.addEventListener("click", function () {
    changeSlide(1);
    startAutoPlay();
});

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

showSlide(0);
startAutoPlay();
      return;
    }
    $("#formMsg").text("Form validated successfully. Connect this form to your email/backend to receive messages.").css("color","#b9ff3f");
  });
});
