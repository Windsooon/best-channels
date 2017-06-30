$(document).ready(function() {
    var select_cate =  $('#select-cate').selectize({
        valueField: 'name',
        labelField: 'name',
        searchField: 'name',
        preload: true,
        options: [],
        create: false,
        render: {
            item: function(item, escape) {
                return '<div>' +
                    (item.name ? '<span class="email">' + item.name + '</span>' : '') +
                '</div>';
            },
            option: function(item, escape) {
                return '<div>' +
                    '<span class="label">' + escape(item.name) + '</span>'
                '</div>';
            }
        },
        onItemAdd: function (value, item) {
            var host = "http://"+ window.location.hostname + "/#";
            window.location = host + value;
        },
        load: function(query, callback) {
            $.ajax({
                url: '/api/outer/',
                type: 'GET',
                dataType: 'JSON',
                error: function() {
                    callback();
                },
                success: function(res) {
    			    callback(res.results.slice(0, 100));
                }
            });
        }
    });

    $(".sub-btn").on("click", function() {
        var csrftoken = getCookie('csrftoken');
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
            url: '/api/recommend/',
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(data),
            beforeSend: function(xhr) {
                    xhr.setRequestHeader('X-CSRFToken', csrftoken)
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
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


