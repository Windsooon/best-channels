var host = "https://"+ window.location.hostname;
$(document).ready(function() {
    var select_cate =  $("#select-cate").selectize({
        valueField: "name",
        labelField: "name",
        searchField: "name",
        preload: true,
        placeholder: "Search subcategory",
        options: [],
        closeAfterSelect: true,
        create: false,
        render: {
            item: function(item, escape) {
                return "<div>" +
                    ("<span class=" + item.outer + ">" + item.name + "</span>") +
                "</div>";
            },
            option: function(item, escape) {
                return "<div>" +
                    ("<span class='search-name'>" + item.name + "</span>") +
                    ("<span>&nbsp;&nbsp;&nbsp;</span>") +
                    ("<span class='search-outer'>" + item.outer + "</span>") +
                "</div>";
            },
        },
        onItemAdd: function (value, item) {
            window.location = host + "/subcategory" + "/" + replaceSpace(value) + "/";
        },
        load: function(query, callback) {
            $.ajax({
                url: "/api/inner/?limit=1000",
                type: "GET",
                cache: true,
                dataType: "JSON",
                error: function() {
                    callback();
                },
                success: function(res) {
    			    callback(res.results);
                }
            });
        }
    });

    $(".sub-btn").on("click", function() {
        var csrftoken = getCookie("csrftoken");
        if (!$(".sub-email").val() || !$(".sub-text").val() 
            || !$(".sub-textarea").val()) {

            alert("Please complete this form");
            return false;
        }
        data = {
            "email": $(".sub-email").val(),
            "category": $(".sub-text").val(),
            "reason": $(".sub-textarea").val(),
        }
        $.ajax({
            url: "/api/recommend/",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "JSON",
            data: JSON.stringify(data),
            beforeSend: function(xhr) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken)
                },
            error: function() {
            },
            success: function(res) {
                $("#recommend-form").remove();
                var $thank_you_div = $("<div />", {
                    "class": "thank-you-div"
                });
                var $thank_you_text = $("<span />", {
                    "class": "thank-you-span",
                    "text": "Thank you !!"
                });

                $thank_you_div.append($thank_you_text);
                $(".sub-form").append($thank_you_div);
            }
        });
    });
});

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + "=")) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function readSub(number) {
    var s = [" ", "K", "M"]
    var e = Math.floor(Math.log(number) / Math.log(1000));
    return (number / Math.pow(1000, e)).toFixed(1) + " " + s[e];
}

function getAnchor(url) {
    var index = url.lastIndexOf("#");
    if (index != -1)
        return url.substring(index);
}

function replaceSpace(title) {
    return title.replace(/ /g, "-");
}
