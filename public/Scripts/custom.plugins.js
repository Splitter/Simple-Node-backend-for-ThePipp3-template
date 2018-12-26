
/**
 * Portfolio Slider
 * @desc - expands navigation to cover full view size
 * @param {0bject} - object containing options to override defaults
 *
 * @return {0bject} - standard return of jQuery object created by selector intializer to allow chaining
 * 
**/

(function( $ ) {
    //check if jQuery is available
	if('undefined' === typeof $) {
		if('console' in window){ window.console.info('navExpander needs jQuery to run.'); }
		return;
	}
    

    $.fn.portfolioSlider = function( opts ){

        //define default options
        var defaults = {
            leftSelector  : '.portfolio-arrow-left',
            rightSelector : '.portfolio-arrow-right',
            portfolioItemSelector : '.portfolio-item'
        };
        //override defaults with options passed in
        opts = $.extend({}, defaults, opts);
        // declare variable in this scope to be available throughout plugin
        var page  = 1;
        var blocking = false;
        var $this = $(this);
        var portfolioItems = $this.children(opts.portfolioItemSelector);
        var maxPages = Math.ceil(portfolioItems.length/4);
        //Hide all items outside of first page
        for(i = 4; i < portfolioItems.length ; i++){
            if( typeof portfolioItems[i] != 'undefined' ){
                $(portfolioItems[i]).css({opacity:"0",transform:"translateY(-500px)",display:"none"});
            }
        }
        //attach events to navigation click events
        //right arrow
        $( opts.rightSelector ).click( function(event){
            event.preventDefault();  
            if( blocking == false && page != maxPages ){
                blocking = true;
                var nextPage = page + 1;
                var startPoint = (page-1) *4;
                for(i = startPoint; i < (startPoint+4); i++){
                    
                    if( typeof portfolioItems[i] != 'undefined' ){
                        if( i < (startPoint+3) ){
                            TweenMax.to( $(portfolioItems[i]), 0.5, 
                            {   css: {  
                                    opacity:"0",
                                    transform: "translateY(-500px)"
                                    },
                                    ease:Linear.easeNone,      
                                    onComplete : function(){ 
                                        $(this.target).css({display:"none"});
                                    }
                                }
                            );
                        }
                        else{
                            TweenMax.to( $(portfolioItems[i]), 0.5, 
                            {   css: {  
                                    opacity:"0",
                                    transform: "translateY(-500px)"
                                    },
                                    ease:Linear.easeNone,      
                                    onComplete : function(){ 
                                        $(this.target).css({display:"none"});
                                        var startPoint = (nextPage-1) * 4;
                                        for(j = startPoint; j < (startPoint+4); j++){
                                            
                                            if( typeof portfolioItems[j] == 'undefined' ){
                                                page = nextPage;
                                                blocking = false;
                                                break;
                                            }                                          

                                            if( j < (startPoint+3) ){
                                                if( typeof portfolioItems[j] != 'undefined' ){
                                                    $(portfolioItems[j]).css({display:"block"});
                                                    TweenMax.to($(portfolioItems[j]), 0.5, 
                                                    {   css: {  
                                                            opacity:"1",
                                                            transform: "translateY(0px)"
                                                            },
                                                            ease:Linear.easeNone                                      
                                                    });
                                                }
                                            }
                                            else{ 
                                                $(portfolioItems[j]).css({display:"block"});
                                                TweenMax.to($(portfolioItems[j]), 0.5, 
                                                {   css: {  
                                                        opacity:"1",
                                                        transform: "translateY(0px)"
                                                        },
                                                        ease:Linear.easeNone,                                     
                                                        onComplete : function(){
                                                            page = nextPage;
                                                            blocking = false;
                                                        }                                                        
                                                });

                                            }
                                        }
                                    }
                                }
                            );
                        }
                    }
                }        
            }
        });


        $( opts.leftSelector ).click( function(event){
            event.preventDefault();  
            if(blocking == false && page != 1){
                blocking = true;
                var nextPage = page -1;
                var startPoint = (page-1) *4;
                var endPoint = (startPoint+4);
                for(i = startPoint; i < (startPoint+4); i++){
                    if( typeof portfolioItems[i] === 'undefined' ){
                        endPoint = i;
                        break;
                    }
                }
                for(i = startPoint; i < endPoint; i++){
                    
                    if( typeof portfolioItems[i] != 'undefined' ){
                        if( i < endPoint-1 ){
                            TweenMax.to( $(portfolioItems[i]), 0.5, 
                            {   css: {  
                                    opacity:"0",
                                    transform: "translateY(-500px)"
                                    },
                                    ease:Linear.easeNone,      
                                    onComplete : function(){ 
                                        $(this.target).css({display:"none"});
                                    }
                                }
                            );
                        }
                        else{
                            TweenMax.to( $(portfolioItems[i]), 0.5, 
                            {   css: {  
                                    opacity:"0",
                                    transform: "translateY(-500px)"
                                    },
                                    ease:Linear.easeNone,      
                                    onComplete : function(){ 
                                        $(this.target).css({display:"none"});
                                        var startPoint = (nextPage-1) * 4;
                                        for(j = startPoint; j < (startPoint+4); j++){
                                            if( j < (startPoint+3) ){
                                                if( typeof portfolioItems[j] != 'undefined' ){
                                                    $(portfolioItems[j]).css({display:"block"});
                                                    TweenMax.to($(portfolioItems[j]), 0.5, 
                                                    {   css: {  
                                                            opacity:"1",
                                                            transform: "translateY(0px)"
                                                            },
                                                            ease:Linear.easeNone                                      
                                                    });
                                                }
                                            }
                                            else{ 
                                                $(portfolioItems[j]).css({display:"block"});
                                                TweenMax.to($(portfolioItems[j]), 0.5, 
                                                {   css: {  
                                                        opacity:"1",
                                                        transform: "translateY(0px)"
                                                        },
                                                        ease:Linear.easeNone,                                     
                                                        onComplete : function(){
                                                            page = nextPage;
                                                            blocking = false;
                                                        }                                                        
                                                });

                                            }
                                        }
                                    }
                                }
                            );
                        }
                    }
                }     
            }
        });

        return this;//return this to allow chaining
    };
})( jQuery );





/**
 * Navigation Expander
 * @desc - expands navigation to cover full view size
 * @param {0bject} - object containing options to override defaults
 *
 * @return {0bject} - standard return of jQuery object created by selector intializer to allow chaining
 * 
**/

(function( $ ) {
    //check if jQuery is available
	if('undefined' === typeof $) {
		if('console' in window){ window.console.info('navExpander needs jQuery to run.'); }
		return;
	}
    
    // export of code as jQuery plugin
    $.fn.navExpander = function( opts ){
        
        //define default options
        var defaults = {
            navListSelector : '.navbar-links',
            navOverlaySelector : '.nav-overlay',
            navOverlayWhiteSelector : '.nav-overlay-white',
            hamburgerSelector: '.hamburger',
            hamburgerLineSelector : '.hamburger-line',
            navLinkAnimationSpeed : 0.8,
            navOverlayAnimationSpeed : 0.2
        };
        //override defaults with options passed in
        opts = $.extend({}, defaults, opts);
        // declare variable in this scope to be available throughout plugin
        var state = "closed";

        $( opts.navListSelector+' li a' ).each( function(){
            $( this ).click( function ( event ) {
                //event.preventDefault();            
                closeNav();
                $( "html, body" ).animate( {
                    scrollTop: $( $( this ).attr( "href" ) ).offset().top-100
                }, 1500 );        
            });
        });

        //attach events to icon click event
        $( opts.hamburgerSelector ).click( function(){
            if( state == "closed" ){
                state = "blocked";
                //turn hamburger icon into X(close) icon
                $( opts.hamburgerLineSelector ).addClass( 'crossed' );

                //Animate nav links into view
                $( opts.navListSelector+' li' ).css({ display:"block"}); 
                TweenMax.to( $( opts.navListSelector ) , opts.navLinkAnimationSpeed,
                    {   css: {  
                            left:"50%",
                            top: '50%',
                            transform: "translateY(-50%)"
                        },
                        ease:Linear.easeNone,                                     
                        onComplete : function(){ 
                                state = "open";
                        } }) 
                TweenMax.to( $( opts.navListSelector+' li' ), opts.navLinkAnimationSpeed, 
                    {   css: {  
                            opacity:"1",
                            transform: 'rotate(0deg) translateX(-50%)',
                            fontSize: "1.6em"
                            }
                    });
                
                //Animate Nav Overlay to cover screen
                TweenMax.to( $( opts.navOverlaySelector ), opts.navOverlayAnimationSpeed, 
                    { 
                        css: { 
                            width: '100%'
                        }, 
                        ease:Linear.easeNone, 
                        overwrite: 'all' ,
                        onComplete : function(){ 
                            TweenMax.to( $( opts.navOverlayWhiteSelector ), opts.navOverlayAnimationSpeed, 
                                { 
                                    css: { 
                                        right: '-656px'
                                    }, 
                                    ease:Linear.easeNone
                                });
                        }
                    }
                );
            }//end (if state == closed)
            else if(state == "open"){                
                closeNav();                
            }//end (if state == open)
        });
        
        //Animate everything out of view when X or link is clicked
        function closeNav(){
            state = "blocked";
            //turn x(close) icon into hamburger icon
            $( opts.hamburgerLineSelector ).removeClass( 'crossed' );           
                
                //Animate nav links out of view 
                TweenMax.to( $( opts.navListSelector ), opts.navLinkAnimationSpeed,
                    {   css: {  
                            left:"0%",
                            top: '50px',
                            transform: "translateY(0%)"
                        },
                        ease:Linear.easeNone }) 
                TweenMax.to( $( opts.navListSelector+' li' ), opts.navLinkAnimationSpeed, 
                    {   css: {  
                            opacity:"0",
                            transform: 'rotate(-90deg) translateX(0)',
                            fontSize: "1em"
                            }
                    });

                //Animate Nav Overlay off screen
                TweenMax.to( $( opts.navOverlayWhiteSelector ), opts.navOverlayAnimationSpeed, 
                    { 
                        css: { 
                            right: '0px'
                        }, 
                        ease:Linear.easeNone, 
                        overwrite: 'all' ,
                        onComplete : function(){ 
                            TweenMax.to( $( opts.navOverlaySelector ), opts.navOverlayAnimationSpeed, 
                                { 
                                    css: { 
                                        width: '0%'
                                    }, 
                                    ease:Linear.easeNone,                                     
                                    onComplete : function(){ 
                                            state = "closed";
                                            $(opts.navOverlaySelector+' li').css({ display:"none"});
                                    }
                                });
                        }
                    }
                );
        }
        return this;//return this to allow chaining
    };
})( jQuery );

