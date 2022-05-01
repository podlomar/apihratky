import e from 'express';
import express from 'express';
import { users } from './users.js';

const server = express();

server.use(express.json());

server.use('/', express.static('public', {
  extensions: ['html'],
}));

server.post('/api/login', (req, resp) => {
  const { login, password } = req.body;
  
  const user = users.find((u) => u.login === login && u.password === password);

  if (user === undefined) {
    resp.status(401).send({
      status: 'error',
      message: 'Invalid user credentials',
    });
    return;
  }
  
  resp.send({
    status: 'success',
    results: {
      login: user.login,
      name: user.name,
      token: user.token,
    }
  });
});

server.use('/api', (req, resp, next) => {
  const token = req.headers.authorization;

  const user = users.find((u) => u.token === token);

  if (user === undefined) {
    resp.sendStatus(403);
    return;
  }

  next();
});

server.get('/api/users', (req, resp) => {
  resp.send({
    status: 'success',
    results: users,
  });
});

server.post('/api/users', (req, resp) => {
  const { login, name, password } = req.body;
  users.push({ login, name, password });
  resp.sendStatus(200);
});

server.get('/api/users/:id', (req, resp) => {
  const { id } = req.params;

  const user = users.find((u) => u.id === id);

  if (user === undefined) {
    resp.status(404).send({
      status: 'error',
      message: 'User not found',
    });
    return;
  }

  resp.send({
    status: 'success',
    results: user,
  });
});

server.post('/api/login', (req, resp) => {
  const { login, password } = req.body;
  
  const user = users.find((u) => u.login === login && u.password === password);

  if (user === undefined) {
    resp.status(401).send({
      status: 'error',
      message: 'Invalid user credentials',
    });
    return;
  }
  
  resp.send({
    status: 'success',
    results: {
      login: user.login,
      name: user.name,
      token: user.token,
    }
  });
});

server.listen(2000, () => {
  console.log('listening on 2000...');
});