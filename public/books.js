const token = window.localStorage.getItem('token');

if (token === null) {
  window.location = '/login';
}

fetch('/api/users', {
  method: 'GET',
  headers: {
    'Authorization': token,
  }
})
  .then((response) => response.json())
  .then((data) => {
    data.results.forEach((user) => {
      document.body.innerHTML += `<div>${user.name}</div>`;  
    });
  });