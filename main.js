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
      return;
    }
    $("#formMsg").text("Form validated successfully. Connect this form to your email/backend to receive messages.").css("color","#b9ff3f");
  });
});