function set_videos_block(data, container) {
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
                r = {
                    "id": "111",
                    "date": responseData[2]["responseJSON"]["items"][2]["snippet"]["publishedAt"]
                }
                id_time.push(r);
            });
            id_time.sort(function(a, b) {
                return (a.date < b.date) ? -1 : ((a.date > b.date) ? 1 : 0);
            });
            console.log(id_time);
        });
    }
}
