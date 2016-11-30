var client = new WebSocket("ws://localhost:3001/");

client.onopen = function () {
    /// ping with server
    window.setInterval(function () {
        client.send("ping");
    }, 1000);
};

/// reload on message
client.onmessage = function (event) {
    console.log(event);
    if (event.data == "reloading") {
        $(document.body).append(
                "<div id=\"reloader\" class=\"ui active inverted dimmer\">" +
                    "<div class=\"ui text loader\">Loading</div>" +
                "</div>");
    } else if (event.data == "reload") {
        location.reload();
    } else if (event.data == "reload-css") {
        $("#reloader").detach();
        $(document.body).append(
            "<link rel='stylesheet' href='./styles/main.css?" + Math.random() + "' />");
    }


};