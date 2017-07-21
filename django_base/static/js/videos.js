function get_newest_videos(data, container) {
    if (data[0]["playlist"].length != 0) {
        var requests = Array();
        $.each(data[0]["playlist"], function(k, v) {
            url = "https://www.googleapis.com/youtube/v3/search?type=video&key=AIzaSyBABK-dxkscLAibISE0-cgNW9Wk7wd5uEY&channelId=" + v["channel_id"] + "&part=snippet&order=date&maxResults=3"
            r = $.ajax({ 
                    url: url,
                    type: "GET",
                    dataType: "json",
                    cache: true,
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                    success:function(data){
                    }
                });
            requests.push(r);
        });
        var defer = $.when.apply($, requests);
        defer.done(function(){
            var id_time = Array();
            $.each(arguments, function(index, responseData){
                $.each(responseData[2]["responseJSON"]["items"], function(x, y){
                    r = {
                        "id": y["id"]["videoId"],
                        "date": y["snippet"]["publishedAt"]
                    }
                    id_time.push(r);
                });
            });
            id_time.sort(function(a, b) {
                return (a.date > b.date) ? -1 : ((a.date < b.date) ? 1 : 0);
            });
            // id_time looks like 
            // {
            //     date: "2017-07-21T10:03:29.000Z",
            //     id: "SYdg_zvvYwU"
            // }
            var top_50 = id_time.slice(0, 50);
            $.each(top_50, function(k, v) {
                url = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + v["id"] + "&key=AIzaSyBABK-dxkscLAibISE0-cgNW9Wk7wd5uEY"
                $.ajax({ 
                    url: url,
                    type: "GET",
                    dataType: "json",
                    cache: true,
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                    success:function(data){
                        set_videos_block(data["items"][0], container, name="video", type="new_videos")
                    }
                });

            });

        });
    }
}
