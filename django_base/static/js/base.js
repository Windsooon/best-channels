var real_host = "http://" + window.location.host;
$(document).ready(function() {
    var category_list=new Array();
    // 底部添加category
    var select_type = $('#select-add-type').selectize({
        valueField: "name",
        labelField: "name",
        searchField: "name",
        preload: true,
        placeholder: "Choose a category",
        options: [],
        closeAfterSelect: true,
        create: false,
        render: {
            item: function(item, escape) {
                return "<div>" +
                    ("<span class=" + "select-type" + ">" + item.name + "</span>") +
                "</div>";
            },
            option: function(item, escape) {
                return "<div>" +
                    ("<span class='search-name'>" + item.name + "</span>") +
                "</div>";
            },
        },
        onItemAdd: function (value, item) {
            $.ajax({
                url: "/api/inner/?category=" + value + "&limit=1000",
                type: "GET",
                dataType: "JSON",
                success: function(res) {
                    category_list = [];
                    $.each(res.results, function(k, v) {
                        category_list.push({"id": v.id, "name": v.name});
                    });
                    var selectize = select_category[0].selectize;
                    selectize.clear();
                    selectize.clearOptions();
                    selectize.load(function(callback) {
                        callback(category_list);
                    }); 
                }
            });
        },
        load: function(query, callback) {
            $.ajax({
                url: "/api/outer/?limit=1000",
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
    // 底部添加sub-category
    var select_category = $('#select-add-category').selectize({
        valueField: "name",
        labelField: "name",
        searchField: "name",
        preload: true,
        placeholder: "Choose a sub-category",
        options: [],
        closeAfterSelect: true,
        create: false,
        render: {
            item: function(item, escape) {
                return "<div>" +
                    ("<span val=" + item.id + " class=select-sub-category >" + item.name + "</span>") +
                "</div>";
            },
            option: function(item, escape) {
                return "<div>" +
                    ("<span class='search-name'>" + item.name + "</span>") +
                "</div>";
            },
        },
    });
    // 顶部搜索分类
    var select_cate =  $("#select-cate").selectize({
        valueField: "name",
        labelField: "name",
        searchField: "name",
        preload: true,
        placeholder: "Search",
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
            window.location = real_host + "/subcategory/" + replaceSpace(value) + "/";
            // window.location.replace(real_host + "/subcategory/" + replaceSpace(value) + "/");
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
        if (!$(".select-type").length || !$(".select-sub-category").length || 
            !$("#channel-id").val() || !$("#channel-email").val() || 
            !$("#channel-name").val()){
            alert("Please complete the form");
            return false;
        }
        data = {
            "inner": $(".select-sub-category").attr("val"),
            "channel_id": $("#channel-id").val(),
            "channel_title": $("#channel-name").val(),
            "channel_email": $("#channel-email").val(),
        }
        var csrftoken = getCookie("csrftoken");
        $.ajax({
            url: "/api/playlist/",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "JSON",
            data: JSON.stringify(data),
            beforeSend: function(xhr) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken)
                    $(".sub-btn").prop("disabled", true); 
                },
            error: function(xhr, status, error) {
                if (xhr.responseJSON.channel_id == "20001") {
                    alert("Please make sure the channel id is correct.")
                }
                else if (xhr.responseJSON.channel_id == "playlist with this channel id already exists."){
                    alert("Channel already exists."); 
                }
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
            },
            complete: function() {
                $(".sub-btn").prop("disabled", false); 
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

function get_channels_count() {
    $.ajax({
        url: "/api/playlist/",
        type: "GET",
        dataType: "JSON",
        success: function(data) {
            $("#youtube-count").text("We collect, classify " + data["count"] + " channels for you.");
        },
        error: function() {
        },
    });
}

function get_categories(container) {
    $.ajax({
        url: "/api/outer/",
        type: "GET",
        dataType: "JSON",
        success: function(data) {
            update_nav(container, data["results"]);
        },
        error: function() {
        },
    });
}

function update_nav(container, data) {
    // container
    $.each(data, function(k, v) {
        var $nav_item_a = $("<a />", {
            "class": "navbar-item",
            "href": real_host + "/category/" + v.name + "/",
            "text": v.name
        });
        container.append($nav_item_a);
    });
}

// bulma navbar
document.addEventListener('DOMContentLoaded', () => {
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
});
