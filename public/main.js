const socket = io();
let user = ``;
socket.on("connect", () => {
    console.log("Connected " + socket.id);
});

$("#chatbox").hide();
$("#login").click(() => {
    user = $("#user").val();
    if (user) {
        socket.emit("login", {
            username: user
        });
        return;
    }
    console.log("Login unsuccessful");
});

socket.on("loggedin", () => {
    console.log("login Successful");
    $("#loginform").hide();
    $("#chatbox").show();
});

socket.on("chat_rec", data => {
    $("#chats").append($("<li>").text(`${data.username}: ${data.msg}`));
});
$("#send").click(() => {
    let message = $("#msg").val();
    if (message) {
        socket.emit("chat", {
            msg: message
        });
        $("#chats").append(`<li class='you'>${message}</li>`);
        $('.box').animate({
            scrollTop: $('.box').prop("scrollHeight")
        }, 500);
        $("#msg").val(``);

    }
});