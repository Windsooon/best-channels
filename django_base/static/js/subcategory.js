function subscribe_email_click(title) {
    $("#subscribe-email-btn").on("click", function() {
        var csrftoken = getCookie('csrftoken');
        if (!$("#subscribe-email").val()) {
            alert("Please submit a correct email address.");
            return false;
        }
        email = $("#subscribe-email").val();
        data = {
            "email": email,
            "category": title
        }
        $.ajax({
            url: '/api/sub/',
            type: 'POST',
            data: data,
            cache: true,
            beforeSend: function(xhr) {
                    xhr.setRequestHeader('X-CSRFToken', csrftoken)
                    $('#subscribe-email-btn').text('Waiting...')
                },
            error: function(xhr, status, error) {
                console.log(xhr.responseText);
            },
            success: function(res) {
            },
            complete: function() {
                $("#subscribe-email-btn").text("Got it!");
            }
            
        });
    });
}

function update_ad(title) {
    $.ajax({
        url: '/api/resource/' + '?inner=' + title,
        type: 'GET',
        cache: true,
        success: function(data) {
            $.each(data["results"], function(k, v) {
                $("#slider-rs-"+k).attr("src", "/static/imgs/resources/" + title + "/" + v["thumbnail"] + ".jpg");
                $("#slider-rs-a-"+k).attr("href", v["url"] + "?ref=channelshunt");
                $("#slider-rs-a-"+k).attr("target", "_blank");
            })
        },
        error: function(xhr, status, error) {
        } 
    });
}

function update_slider(title) {
    $.ajax({
        url: '/api/inner/' + '?related=' + title,
        type: 'GET',
        cache: true,
        success: function(data) {
            var related_subcategory = new Array();
            $.each(data["results"], function(k, v) {
               if (v["name"] != title){
                    related_subcategory.push(v["name"]);
               }
            });

            if (related_subcategory.length > 3){
                var related_subcategory = related_subcategory.sort(function() { return 0.5 - Math.random()});
                $('.slider-a').each(function(k, obj) {
                    $(obj).attr("href", real_host + "/subcategory/" + replaceSpace(related_subcategory[k]) + "/");
                });
                $('.slider-h2').each(function(k, obj) {
                    $(obj).text(related_subcategory[k]);
                });
            }
            else {
                $(".you-may-like").css("display", "none"); 
            }
        },
        error: function(xhr, status, error) {
        } 
    });
}
