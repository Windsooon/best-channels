function get_video_playlist(order, id, container, name, type="video") {
    if (type == "playlist") {
        url = "https://www.googleapis.com/youtube/v3/search?type=playlist&key=AIzaSyBABK-dxkscLAibISE0-cgNW9Wk7wd5uEY&channelId=" + id + "&part=snippet,id&order=date&maxResults=12";
    }
    else {
        url = "https://www.googleapis.com/youtube/v3/search?type=video&key=AIzaSyBABK-dxkscLAibISE0-cgNW9Wk7wd5uEY&channelId=" + id + "&part=snippet,id&maxResults=6&order=" + order
    }
    $.ajax({ url: url,
		type: "GET",
		dataType: "json",
        cache: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
		success:function(data){
            $.each(data["items"], function(key, value) {
                set_videos_block(value, container, type="video")
            });
        }, 
        error: function(){
        }
    }); 
}

function set_videos_block(value, container, name="video", type="video") {
    var $video_block = $("<div />", {
           "class": "column is-4 is-12-mobile " + name + "-block"
       });
    if (type == "playlist") {
        video_href = "https://www.youtube.com/playlist?list=" + value["id"]["playlistId"]
    }
    else if (type== "new_videos") {
        video_href = "https://www.youtube.com/watch?v=" + value["id"]
    }
    else {
        video_href = "https://www.youtube.com/watch?v=" + value["id"]["videoId"]
    }
    var $video_outside_a = $("<a />", {
           "class": name + "-outside-a",
           "href": video_href,
           "target": "_blank"
       });
    var $video_outside = $("<div />", {
           "class": name + "-outside-div"
       });
    var $video_header = $("<div />", {
           "class": name + "-header-div"
       });
    var $video_header_img = $("<img />", {
           "class": name + "-header-img lazyload",
            "src": value["snippet"]["thumbnails"]["high"]["url"]
       });
    var $video_details = $("<div />", {
           "class": name + "-details-div"
       });
    var $video_title = $("<div />", {
           "class": name + "-title-div"
       });
    var $video_title_text = $("<span />", {
           "class": name + "-title-text",
            "text": value["snippet"]["title"]
       });
    var $video_des = $("<div />", {
           "class": name + "-des-div"
       });
    var $video_des_text = $("<span />", {
           "class": name + "-des-text",
            "text": value["snippet"]["description"]
       });

    var $video_content = $("<div />", {
           "class": name + "-content-div"
       });
    var $video_view = $("<span />", {
           "class": name + "-view-span"
       });

    var pub_time = moment(value["snippet"]["publishedAt"], moment.ISO_8601);
    var $video_time = $("<span />", {
           "class": name + "-time-span",
            "text": pub_time.fromNow()
       });
    $video_block.append($video_outside_a);
    $video_outside_a.append($video_outside);
    $video_outside.append($video_header);
    $video_outside.append($video_details);
    $video_header.append($video_header_img);
    $video_details.append($video_title);
    $video_details.append($video_content);
    $video_title.append($video_title_text);
    $video_des.append($video_des_text);
    $video_content.append($video_des);
    $video_content.append($video_view);
    $video_content.append($video_time);
    container.append($video_block);
    $("img.lazyload").lazyload({
       effect : "fadeIn"
    });
}

function get_channel_details(id) {
    url = "https://www.googleapis.com/youtube/v3/channels?part=snippet, statistics&key=AIzaSyBABK-dxkscLAibISE0-cgNW9Wk7wd5uEY&id=" + id;
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
            var thumbnails = data["items"][0]["snippet"]["thumbnails"]["medium"]["url"];
            var create_time = moment(data["items"][0]["snippet"]["publishedAt"], moment.ISO_8601);
            var sub_count = readSub(data["items"][0]["statistics"]["subscriberCount"]);
            $("#channel-header-text").text(title);
            $("#channel-header-content-span").text(description);
            $("#channel-src").attr("src", thumbnails);
            $("#channel-sub-text").text(sub_count);
        },
    });
}
