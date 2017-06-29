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
});
