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
            beforeSend: function(xhr) {
                    xhr.setRequestHeader('X-CSRFToken', csrftoken)
                },
            error: function() {
            },
            success: function(res) {
                $("#subscribe-email-btn").text("Got it!");
            },
        });
    });
}

function update_sub(title) {
    $("#sub-legend").text("Get Trending " + title + " channel weekly !");
}
