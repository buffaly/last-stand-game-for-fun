function sendAction(actionName) {
  const user_id = window.localStorage.getItem('user_id');
  socket.emit('user_action', { user_id: user_id, action: actionName });
}

function logout() {
  const user_id = window.localStorage.getItem('user_id');
  socket.emit('user_logout', {
    user_id: user_id,
  });
  window.localStorage.removeItem('user_id');
  window.localStorage.removeItem('username');

  window.location.reload();
}

function handleRegister() {
  $('#btn_submit_register').on('click', function() {
    $('.register-box').hide();
    const user_id = new Date().getTime();
    const username = $('#input_username').val();
    $('.username').html(username);
    socket.emit('init_user', {
      username: username,
      user_id: user_id,
    });
    window.localStorage.setItem('username', username);
    window.localStorage.setItem('user_id', user_id);
    $('.controller-box').css('display', 'flex');
    $('.logout').show();
  });
}

function initilzeUser() {
  const user_id = window.localStorage.getItem('user_id');
  if (!user_id) {
    $('.register-box').show();
    $('.logout').hide();
  } else {
    $('.logout').show();
    $('.controller-box').css('display', 'flex');
  }
}
