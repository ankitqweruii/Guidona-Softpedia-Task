const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'data', 'branches.db'));

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS branches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    branchCode TEXT NOT NULL,
    branchName TEXT NOT NULL,
    branchCity TEXT NOT NULL,
    branchState TEXT NOT NULL,
    branchAddress TEXT NOT NULL,
    latitude REAL,
    longitude REAL
  )`, (err) => {
    if (err) {
      console.error("Error creating table:", err);
      return;
    }

    db.get("SELECT COUNT(*) as count FROM branches", (err, row) => {
      if (err) {
        console.error("Error checking table:", err);
        db.close();
        return;
      }

      if (row.count === 0) {
        const branches = [
          { branchCode: 'BR001', branchName: 'Downtown Branch', branchCity: 'New York', branchState: 'NY', branchAddress: '123 Main St', latitude: 40.7128, longitude: -74.0060 },
          { branchCode: 'BR002', branchName: 'Westside Branch', branchCity: 'Los Angeles', branchState: 'CA', branchAddress: '456 Ocean Ave', latitude: 34.0522, longitude: -118.2437 },
          { branchCode: 'BR003', branchName: 'Lakefront Branch', branchCity: 'Chicago', branchState: 'IL', branchAddress: '789 Lake St', latitude: 41.8781, longitude: -87.6298 },
          { branchCode: 'BR004', branchName: 'Harbor Branch', branchCity: 'Seattle', branchState: 'WA', branchAddress: '101 Port Way', latitude: 47.6062, longitude: -122.3321 },
          { branchCode: 'BR005', branchName: 'Midtown Branch', branchCity: 'Atlanta', branchState: 'GA', branchAddress: '202 Peach St', latitude: 33.7490, longitude: -84.3880 },
          { branchCode: 'BR006', branchName: 'Downtown Branch', branchCity: 'Miami', branchState: 'FL', branchAddress: '303 Palm Ave', latitude: 25.7617, longitude: -80.1918 },
          { branchCode: 'BR007', branchName: 'Uptown Branch', branchCity: 'Dallas', branchState: 'TX', branchAddress: '404 Rodeo Dr', latitude: 32.7767, longitude: -96.7970 },
          { branchCode: 'BR008', branchName: 'Capital Branch', branchCity: 'Washington', branchState: 'DC', branchAddress: '505 Capitol St', latitude: 38.9072, longitude: -77.0369 },
          { branchCode: 'BR009', branchName: 'Bayside Branch', branchCity: 'San Francisco', branchState: 'CA', branchAddress: '606 Bay St', latitude: 37.7749, longitude: -122.4194 },
          { branchCode: 'BR010', branchName: 'Central Branch', branchCity: 'Denver', branchState: 'CO', branchAddress: '707 Mountain Rd', latitude: 39.7392, longitude: -104.9903 },
          { branchCode: 'BR011', branchName: 'Historic Branch', branchCity: 'Boston', branchState: 'MA', branchAddress: '808 Freedom Trail', latitude: 42.3601, longitude: -71.0589 },
          { branchCode: 'BR012', branchName: 'French Quarter Branch', branchCity: 'New Orleans', branchState: 'LA', branchAddress: '909 Canal St', latitude: 29.9511, longitude: -90.0715 }
        ];

        const stmt = db.prepare("INSERT INTO branches (branchCode, branchName, branchCity, branchState, branchAddress, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?)");
        
        let completed = 0;
        const total = branches.length;
        
        branches.forEach(branch => {
          stmt.run(branch.branchCode, branch.branchName, branch.branchCity, branch.branchState, branch.branchAddress, branch.latitude, branch.longitude, function(err) {
            completed++;
            
            if (err) {
              console.error("Error inserting data:", err);
            }
            
            if (completed === total) {
              stmt.finalize();
              console.log("Sample data inserted successfully");
              
              db.close((err) => {
                if (err) {
                  console.error("Error closing database:", err);
                } else {
                  console.log("Database initialization completed");
                }
              });
            }
          });
        });
      } else {
        console.log("Database already contains data, skipping insertion");
        db.close((err) => {
          if (err) {
            console.error("Error closing database:", err);
          } else {
            console.log("Database initialization completed");
          }
        });
      }
    });
  });
});