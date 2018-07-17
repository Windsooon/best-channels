function get_three_videos(data) {
    if (data[0]["playlist"].length < 3) {
        $(".slider-wrapper").css("display", "none");
    }
    else {
        var three_channels = new Array();
        three_channels[0] = data[0]["playlist"][0]["channel_id"];
        three_channels[1] = data[0]["playlist"][1]["channel_id"];
        three_channels[2] = data[0]["playlist"][2]["channel_id"];

        $.each(three_channels, function(k, v) {
            url = "https://www.googleapis.com/youtube/v3/search?type=video&key=AIzaSyBABK-dxkscLAibISE0-cgNW9Wk7wd5uEY&channelId=" + v + "&part=snippet&order=date&maxResults=1"
            $.ajax({ 
                url: url,
                type: "GET",
                dataType: "json",
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                success:function(data){
                    $("#newest-img-" + k).attr("src", data["items"][0]["snippet"]["thumbnails"]["high"]["url"]);
                }
            });
        });
    }
}

// get non empty channel by category
function get_channel(
    name, container, set_after=set_channel_block) {
    $.ajax({
		url: "/api/inner/?name=" + name,
		type: "GET",
		dataType: "json",
		success:function(data){
            get_three_videos(data.results);
            set_after(data.results, container);
        },
        error: function(){
        }
    }); 
}

// get non empty channel by category
function get_newest_channel(
    container, set_after=set_newest_channel_block) {
    $.ajax({
		url: "/api/playlist/?newest=True",
		type: "GET",
		dataType: "json",
		success:function(data){
            set_after(data.results, container);
        },
        error: function(){
        }
    }); 
}

function set_newest_channel_block(data, container) {
     if (data.length != 0) {
         get_channel_info(data, "placeholder", container, padding=false);
    }
}


function set_channel_block(data, container) {
     if (data[0].length != 0) {
         var $details_content = $("<div />", {
             "class": "details-content"
         });
         container.append($details_content);
         get_channel_info(
             data[0]["playlist"], data[0]["name"], $details_content, padding=true);
    }
}


function get_channel_info(data, type, container, padding=false) {
    $.each(data, function(k, v) {
        url = "https://www.googleapis.com/youtube/v3/channels?part=snippet, statistics&key=AIzaSyBABK-dxkscLAibISE0-cgNW9Wk7wd5uEY&id=" + v["channel_id"];
        $.ajax({
	    	url: url,
	    	type: "GET",
            cache: true,
            headers: {
                'Cache-Control': 'max-age=2000'
            },
	    	dataType: "json",
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
	    	success:function(data){
                if (data.items.length == 0) {
                    return
                }
                var title = data["items"][0]["snippet"]["title"];
                var description = data["items"][0]["snippet"]["description"];
                if (padding) {
                    var thumbnails = data["items"][0]["snippet"]["thumbnails"]["medium"]["url"];
                }
                else {
                    var thumbnails = data["items"][0]["snippet"]["thumbnails"]["default"]["url"];
                }
                var sub_count = data["items"][0]["statistics"]["subscriberCount"];

                 var $channel_div = $("<div />", {
                     "class": "channel-div columns"
                 });
                 var $channel_inside_a = $("<a />", {
                     "class": "channel-indide-a column is-8 is-offset-2",
                     "id": "channel-" + v["channel_id"],
                     "href": real_host + "/channel/" + v["channel_title"] + "/",
                 });
                 var $channel_inside_type = $("<input />", {
                     "class": "channel-indide-type",
                     "type": "hidden",
                     "value": type,
                 });
                 var $channel_inside_div = $("<div />", {
                     "class": "channel-indide-div columns is-mobile"
                 });
                 var $channel_clear = $("<div />", {
                     "class": "heclear"
                 });
                 var $channel_details = $("<div />", {
                     "class": "column is-9"
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
                     "class": "channel-thumbnail column is-3"
                 });
                 if(padding == true) {
                     padding_class = "channel-thumbnail-padding-true";
                 }
                 else {
                     padding_class = "channel-thumbnail-padding-false";
                 }
                 var $channel_thumbnail_inside = $("<div />", {
                     "class": padding_class
                 });
                 var $channel_name = $("<span />", {
                     "class": "channel-name",
                     "text": title
                 });
                 var $channel_sub_div = $("<div />", {
                     "class": "channel-sub-div",
                 });
                 var $channel_sub_span = $("<span />", {
                     "class": "channel-sub-span",
                     "text": readSub(sub_count)
                 });
                 var $channel_sub_img_span = $("<span />", {
                     "class": "channel-img-sub-span",
                 });
                 var $channel_sub_img = $("<img />", {
                     "class": "channel-sub-img",
                     "src": "../../../static/imgs/youtube_64.png"
                 });
                 var $channel_img = $("<img />", {
                     "class": "lazyload channel-img",
                     "data-src": thumbnails,
                 });
                 $channel_div.append($channel_inside_a);
                 $channel_div.append($channel_inside_type);
                 $channel_inside_a.append($channel_inside_div);
                 $channel_inside_div.append($channel_thumbnail);
                 $channel_details.append($channel_title);
                 $channel_details.append($channel_content);
                 $channel_inside_div.append($channel_details);
                 $channel_inside_div.append($channel_clear);
                 $channel_content.append($channel_content_span);
                 $channel_title.append($channel_name);
                 $channel_title.append($channel_sub_div);
                 $channel_sub_img_span.append($channel_sub_img);
                 $channel_sub_div.append($channel_sub_span);
                 $channel_sub_div.append($channel_sub_img_span);
                 $channel_thumbnail.append($channel_thumbnail_inside);
                 $channel_thumbnail_inside.append($channel_img);
                 container.append($channel_div);
                 $("img.lazyload").lazyload({
                    effect : "fadeIn"
                 });
            },
            error: function(){
            },
        }); 
    }); 
}
