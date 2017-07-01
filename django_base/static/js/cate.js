// get category by name, like Science
function get_category(url, container) {
	$.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		success:function(data){
            set_category_block(data.results, container);
        }
    });
};

// set category block
function set_category_block(data, container) {
     var $cate_block_pure = $("<div />", {
            "class": "pure-g cate-block-pure"
        });
     $.each(data, function(k, v) {
         var $cate_block = $("<div />", {
                "class": "pure-u-1 .pure-u-sm-1-1 pure-u-md-1-3 pure-u-lg-1-3 pure-u-xl-1-3 cate-block"
            });
         var $cate_block_a = $("<a />", {
                "class": "cate-block-a"
            });
         var $cate_block_outside = $("<div />", {
                "class": "cate-block-outside"
            });
         var $cate_block_inside = $("<div />", {
                "class": "cate-block-inside"
            });
         var $cate_title = $("<div />", {
                "class": "cate-title"
            });
         var $cate_img = $("<img />", {
                "class": "cate-img",
                "src": 'http://' + window.location.hostname + '/static/imgs/' + v["thumbnail"] + '.png'
            });
         var $cate_span = $("<span />", {
                "class": "cate-span",
                "text": v["name"]
            });
         container.append($cate_block_pure);
         $cate_block_pure.append($cate_block)
         $cate_block.append($cate_block_a);
         $cate_block_a.append($cate_block_outside);
         $cate_block_outside.append($cate_block_inside);
         $cate_block_inside.append($cate_title);
         $cate_title.append($cate_img);
         $cate_title.append($cate_span);
     });
}

// get non empty channel by category
function get_channel(category, container) {
    $.ajax({
		url: "/api/inner/?category=" + category,
		type: "GET",
		dataType: "json",
		success:function(data){
            set_channel_block(data.results, container);
        }, 
        error: function(){
        }
    }); 
}


function set_channel_block(data, container) {
     var $details_outside_div = $("<div />", {
         "class": "pure-g details-outside-div"
     });
     $.each(data, function(k, v) {
         // if the category have soem channel inside
         if (v["playlist"].length != 0) {
             var $details_div = $("<div />", {
                 "class": "pure-u-1 pure-u-md-1-1 pure-u-sm-1-1 details-div"
             });
             var $details_title = $("<div />", {
                 "class": "details-title"
             });
             var $details_title_div = $("<div />", {
                 "class": "details-title-div",
             });
             var $details_title_span = $("<span />", {
                 "class": "details-title-span",
                 "text": v["name"]
             });
             var $details_content = $("<div />", {
                 "class": "details-content"
             });

             $details_outside_div.append($details_div);
             $details_title.append($details_title_div);
             $details_title_div.append($details_title_span);
             $details_div.append($details_title);
             $details_div.append($details_content);
             get_channel_info(v["playlist"], $details_content);
         }
     });
     container.append($details_outside_div);
}


function get_channel_info(data, container) {
    $.each(data, function(k, v) {
        url = "https://www.googleapis.com/youtube/v3/channels?part=snippet, statistics&key=AIzaSyBABK-dxkscLAibISE0-cgNW9Wk7wd5uEY&id=" + v["channel_id"];
        $.ajax({
	    	url: url,
	    	type: "GET",
	    	dataType: "json",
	    	success:function(data){
                var title = data["items"][0]["snippet"]["title"];
                var description = data["items"][0]["snippet"]["description"];
                var thumbnails = data["items"][0]["snippet"]["thumbnails"]["high"]["url"];
                var sub_count = data["items"][0]["statistics"]["subscriberCount"];

                 var $channel_div = $("<div />", {
                     "class": "channel-div"
                 });
                 var $channel_inside_a = $("<a />", {
                     "class": "channel-indide-a pure-u-md-2-3 pure-u-sm-2-3",
                     "href": "http://" + window.location.hostname + "/channel/" + v["channel_title"] + "/"
                 });
                 var $channel_inside_div = $("<div />", {
                     "class": "channel-indide-div pure-u-g"
                 });
                 var $channel_clear = $("<div />", {
                     "class": "clear"
                 });
                 var $channel_details = $("<div />", {
                     "class": "channel-details pure-u-1 pure-u-md-5-6 pure-u-sm-4-6"
                 });
                 var $channel_details_inside = $("<div />", {
                     "class": "channel-details-inside"
                 });
                 var $channel_title = $("<div />", {
                     "class": "channel-title",
                 });
                 var $channel_content = $("<div />", {
                     "class": "channel-content"
                 });
                 var $channel_content_span = $("<span />", {
                     "class": "channel-content-span",
                     "text": description
                 });
                 var $channel_thumbnail = $("<div />", {
                     "class": "channel-thumbnail pure-u-1 pure-u-md-1-6 pure-u-sm-2-6"
                 });
                 var $channel_thumbnail_inside = $("<div />", {
                     "class": "channel-thumbnail_inside"
                 });
                 var $channel_name = $("<span />", {
                     "class": "channel-name",
                     "text": title
                 });
                 var $channel_img = $("<img />", {
                     "class": "channel-img",
                     "src": thumbnails
                 });
                 $channel_div.append($channel_inside_a);
                 $channel_inside_a.append($channel_inside_div);
                 $channel_inside_div.append($channel_thumbnail);
                 $channel_details.append($channel_details_inside);
                 $channel_details_inside.append($channel_title);
                 $channel_details_inside.append($channel_content);
                 $channel_inside_div.append($channel_details);
                 $channel_inside_div.append($channel_clear);
                 $channel_content.append($channel_content_span);
                 $channel_title.append($channel_name);
                 $channel_thumbnail.append($channel_thumbnail_inside);
                 $channel_thumbnail_inside.append($channel_img);
                 container.append($channel_div);
            },
            error: function(){
            },
        }); 
    }); 
}
