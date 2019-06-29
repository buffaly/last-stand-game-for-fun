function handleActions() {
  $("#button-left").on("click", function() {
    socket.emit("user_action", { action: "left" });
  });

  $("#button-up").on("click", function() {
    socket.emit("user_action", { action: "up" });
  });

  $("#button-right").on("click", function() {
    socket.emit("user_action", { action: "right" });
  });
}

function handleRegister() {
  $("#btn_submit_register").on("click", function() {
    $(".register-box").attr("hidden", true);
    socket.emit("init_user", {
      username: $("#input_username").val(),
      user_id: new Date().getTime()
    });
  });
}

function initilzeUser() {
  const userId = window.localStorage.getItem("user_id");

  if (!userId) {
    return {
      user: null,
      isInit: false
    };
  }

  return {
    user: userId,
    isInit: true
  };
}
