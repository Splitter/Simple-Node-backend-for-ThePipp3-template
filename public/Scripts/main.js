$(document).ready(function () {


    //hide navbar when page loads(navbar initially visible so it degrades gracefully)
    $('.navbar-links li').css({
        opacity:0,
        display:"none"
    });
    //Navigation expansion to full view size on click
    $('.navbar').navExpander();
    //About Me link in intro section to scroll to about section
    $('a[href="#about"]').click(function (event) {
        //event.preventDefault();     
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top-100
        }, 500);        
    });

    //Lightbox for portfolio section
    $(".portfolio-item-link").featherlight();
    //Portfolio Slider
    $(".portfolio-items").portfolioSlider();
    //Animate on scroll
    AOS.init({once:true});
});




