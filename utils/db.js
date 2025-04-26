const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class Database {
  constructor() {
    this.db = new sqlite3.Database(path.join(__dirname, '..', 'data', 'branches.db'), (err) => {
      if (err) {
        console.error('Error connecting to the database:', err.message);
      } else {
        console.log('Connected to the SQLite database.');
      }
    });
  }

  query(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.error('Error running query:', err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) {
          console.error('Error running query:', err);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
}

module.exports = new Database();