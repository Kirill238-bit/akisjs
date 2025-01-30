const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 7070; 
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.static('../front/build'));

const db = new sqlite3.Database('db.sqlite', (err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err.message);
  } else {
    console.log('Подключено к базе данных SQLite.');
  }
});

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

// ------------------   Warehouses   --------------------

app.get('/api/warehouses', (req, res) => {
  const sql = 'SELECT * FROM Warehouses';
  db.all(sql, [], (err, rows) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      res.json(rows);
  });
});

app.post('/api/warehouses', (req, res) => {
  const { name } = req.body;
  const sql = 'INSERT INTO Warehouses (name) VALUES (?)';
  const params = [name];

  db.run(sql, params, function (err) {
      if (err) {
          res.status(400).json({ error: err.message });
          return;
      }
      res.json({ id: this.lastID });
  });
});


app.delete('/api/warehouses/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Warehouses WHERE id = ?';
    db.run(sql, id, function (err) {
      if (err) {
           res.status(400).json({ error: err.message });
           return;
       }
      res.json({ deletedID: id });
  });
});

// ------------------   Clients   --------------------

app.get('/api/clients', (req, res) => {
  const sql = 'SELECT * FROM Clients';
  db.all(sql, [], (err, rows) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      res.json(rows);
  });
});

app.post('/api/clients', (req, res) => {
const { name } = req.body;
const sql = 'INSERT INTO Clients (name) VALUES (?)';
const params = [name];
db.run(sql, params, function (err) {
  if (err) {
    res.status(400).json({ error: err.message });
    return;
  }
  res.json({ id: this.lastID });
});
});


app.delete('/api/clients/:id', (req, res) => {
const { id } = req.params;
  const sql = 'DELETE FROM Clients WHERE id = ?';
  db.run(sql, id, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
   res.json({ deletedID: id });
});
});

// ------------------   Employees   --------------------

app.get('/api/employees', (req, res) => {
  const sql = 'SELECT * FROM Employees';
  db.all(sql, [], (err, rows) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      res.json(rows);
  });
});

app.post('/api/employees', (req, res) => {
const { name, position, salary } = req.body;
const sql = 'INSERT INTO Employees (name, position, salary) VALUES (?, ?, ?)';
const params = [name, position, Number(salary)];

db.run(sql, params, function (err) {
  if (err) {
    res.status(400).json({ error: err.message });
    return;
  }
  res.json({ id: this.lastID });
});
});

app.delete('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Employees WHERE id = ?';
    db.run(sql, id, function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ deletedID: id });
    });
});

// ------------------   Materials   --------------------

app.get('/api/materials', (req, res) => {
  const sql = 'SELECT * FROM Materials';
  db.all(sql, [], (err, rows) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      res.json(rows);
  });
});

app.post('/api/materials', (req, res) => {
const { name, quantity, warehouse_id } = req.body;
if(!name || !quantity || !warehouse_id) return res.status(449).json({ error: err.message });
const sql = 'INSERT INTO Materials (name, quantity, warehouse_id) VALUES (?, ?, ?)';
  const params = [name, Number(quantity), Number(warehouse_id)];

  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
        return;
    }
      res.json({ id: this.lastID });
});
});

app.delete('/api/materials/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Materials WHERE id = ?';
    db.run(sql, id, function (err) {
    if (err) {
        res.status(400).json({ error: err.message });
        return;
    }
   res.json({ deletedID: id });
});
});

// ------------------   Services   --------------------

app.get('/api/services', (req, res) => {
  const sql = 'SELECT * FROM Services';
  db.all(sql, [], (err, rows) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      res.json(rows);
  });
});

app.post('/api/services', (req, res) => {
const { name, price } = req.body;
const sql = 'INSERT INTO Services (name, price) VALUES (?, ?)';
  const params = [name, Number(price)];
  db.run(sql, params, function(err) {
  if (err) {
      res.status(400).json({ error: err.message });
      return;
  }
      res.json({ id: this.lastID });
  });
});

app.delete('/api/services/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Services WHERE id = ?';
  db.run(sql, id, function (err) {
    if (err) {
        res.status(400).json({ error: err.message });
      return;
    }
      res.json({ deletedID: id });
});
});

// ------------------   Salary calculation  --------------------
app.get('/api/total_salary', (req, res) => {
  const sql = 'SELECT name, salary FROM Employees';
  db.all(sql, [], (err, rows) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
      }
      const totalSalary = rows.reduce((acc, employee) => acc + employee.salary, 0);
      res.json({ totalSalary: totalSalary });
  });
});




app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});