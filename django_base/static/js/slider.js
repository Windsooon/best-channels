function slick_init() {
    $('.responsive').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
    });
}

function get_weekly(container) {
    $.ajax({ 
        url: "/api/week/",
		type: "GET",
		dataType: "json",
        cache: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
		success:function(data){
        }, 
        error: function(){
        }
    });
}
