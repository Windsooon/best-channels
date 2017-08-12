function slick_init(big=3, scroll=3, container=$(".responsive")) {
    container.slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: big,
        slidesToScroll: scroll,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: big,
              slidesToScroll: scroll,
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
        url: "/api/weekly/",
		type: "GET",
		dataType: "json",
        cache: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
		success:function(data){
            set_weekly(data["results"]);
        }, 
        error: function(){
        }
    });
}

function set_weekly(data) {
    $.each(data, function(k, v){
        url = "https://www.googleapis.com/youtube/v3/channels?part=snippet, statistics&key=AIzaSyBABK-dxkscLAibISE0-cgNW9Wk7wd5uEY&id=" + v["channel_id"];
        $.ajax({
	    	url: url,
	    	type: "GET",
	    	dataType: "json",
            cache: true,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
	    	success:function(data){
                var title = data["items"][0]["snippet"]["title"];
                var description = data["items"][0]["snippet"]["description"];
                var thumbnails = data["items"][0]["snippet"]["thumbnails"]["high"]["url"];
                var sub_count = data["items"][0]["statistics"]["subscriberCount"];
                $("#weekly-name-" + k).text(title);
                $("#weekly-content-" + k).text(description);
                $("#weekly-img-" + k).attr("src", thumbnails);
                $("#weekly-a-" + k).attr("href", host + "/channel/" + title + "/");
            },
        });
    });
}
