
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const login = document.querySelector('#login').value;
  const password = document.querySelector('#passwd').value;

  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ login, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      window.localStorage.setItem('token', data.results.token);
      window.location = '/books';
    });
});

