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

socket.on("loggedin", (data) => {
    $('.wel').remove()
    data.forEach(el => {
        add_listItem(el)
    });
    console.log("login Successful");
    $("#loginform").hide();
    $("#chatbox").show();

});

socket.on("chat_rec", data => {
    $("#chats").append($("<li>").text(`${data.name}: ${data.message}`));
});
$("#send").click(() => {
    let message = $("#msg").val();
    if (message) {
        socket.emit("chat", {
            username: user,
            msg: message
        });
        $("#chats").append(`<li class='you'>${message}</li>`);
        $('.box').animate({
            scrollTop: $('.box').prop("scrollHeight")
        }, 500);
        $("#msg").val(``);

    }
});

function add_listItem(data) {
    if (data.name == user) {
        $("#chats").append(`<li class='you'>${data.message}</li>`);
        return
    }
    $("#chats").append($("<li>").text(`${data.name}: ${data.message}`));
}