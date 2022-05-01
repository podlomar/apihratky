fetch('/api/users')
  .then((response) => response.json())
  .then((data) => {
    data.results.forEach((user) => {
      document.body.innerHTML += `<div>${user.name}</div>`;  
    });
  });