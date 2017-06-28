function get_video(type, id, container) {
    url = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyBABK-dxkscLAibISE0-cgNW9Wk7wd5uEY&channelId=" + id + "&part=snippet,id&maxResults=3&order=" + type
    $.ajax({
		url: url,
		type: "GET",
		dataType: "json",
		success:function(data){
            $.each(data["items"], function(key, value) {
                var $hostest_block = $("<div />", {
                       "class": "pure-u-1 pure-u-md-1-3 hostest-block"
                   });
                var $hostest_outside = $("<div />", {
                       "class": "hostest-outside-div"
                   });
                var $hostest_header = $("<div />", {
                       "class": "hostest-header-div"
                   });
                var $hostest_header_img = $("<img />", {
                       "class": "hostest-header-img",
                        "src": value["snippet"]["thumbnails"]["high"]["url"]
                   });
                var $hostest_details = $("<div />", {
                       "class": "hostest-details-div"
                   });
                var $hostest_title = $("<div />", {
                       "class": "hostest-title-div"
                   });
                var $hostest_title_text = $("<span />", {
                       "class": "hostest-title-text",
                        "text": value["snippet"]["title"]
                   });

                var $hostest_content = $("<div />", {
                       "class": "hostest-content-div"
                   });
                var $hostest_view = $("<span />", {
                       "class": "hostest-view-span"
                   });
                var $hostest_time = $("<span />", {
                       "class": "hostest-time-span",
                        "text": value["snippet"]["publishedAt"]
                   });

                $hostest_block.append($hostest_outside);
                $hostest_outside.append($hostest_header);
                $hostest_outside.append($hostest_details);
                $hostest_header.append($hostest_header_img);
                $hostest_details.append($hostest_title);
                $hostest_details.append($hostest_content);
                $hostest_title.append($hostest_title_text);
                $hostest_content.append($hostest_view);
                $hostest_content.append($hostest_time);
                container.append($hostest_block);
            });
        }, 
        error: function(){
            alert("Can't find any match channel.");
        }
    }); 
}
