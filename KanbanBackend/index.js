const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 3000;
const dbPath = "./mydb.db";

//enable all cors for testing
app.use(cors());
app.use(express.json());

if (!fs.existsSync(dbPath)) {
  const db = new sqlite3.Database(dbPath);

  // Create the groups table
  db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY, title VARCHAR)");
    db.run(
      "CREATE TABLE IF NOT EXISTS cards (id INTEGER PRIMARY KEY, title VARCHAR, description TEXT, groupId INTEGER, FOREIGN KEY(groupId) REFERENCES groups(id) ON DELETE CASCADE)"
    );

    // Insert default groups
    const defaultgroups = ["Team Resources", "To Do", "Doing", "Done", "Additional Questions"];
    const insertListQuery = db.prepare("INSERT INTO groups (title) VALUES (?)");

    defaultgroups.forEach((title) => {
      insertListQuery.run(title);
    });

    insertListQuery.finalize();
  });

  db.close();
}

app.put("/groups/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const db = new sqlite3.Database(dbPath);
  db.run("UPDATE groups SET title = ? WHERE id = ?", [title, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: `List with id ${id} updated successfully` });
  });
  db.close();
});

app.delete("/groups/:id", (req, res) => {
  const { id } = req.params;
  const db = new sqlite3.Database(dbPath);
  db.run("DELETE FROM groups WHERE id = ?", [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: `List with id ${id} deleted successfully` });
  });
  db.close();
});

app.post("/groups", (req, res) => {
  const title = req.body.title;
  const db = new sqlite3.Database(dbPath);
  db.run("INSERT INTO groups (title) VALUES (?)", [title], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, title: title });
  });
  db.close();
});

app.get("/groups", (req, res) => {
  const db = new sqlite3.Database(dbPath);
  db.all("SELECT * FROM groups", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
  db.close();
});

//CARDS

app.post("/cards", (req, res) => {
  const { title, description, groupId } = req.body;
  const db = new sqlite3.Database(dbPath);
  db.run(
    "INSERT INTO cards (title, description, groupId) VALUES (?, ?, ?)",
    [title, description, groupId],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
  db.close();
});

app.get("/cards", (req, res) => {
  const db = new sqlite3.Database(dbPath);
  db.all("SELECT * FROM cards", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
  db.close();
});

app.get("/cards/:groupId", (req, res) => {
  const { groupId } = req.params;
  const db = new sqlite3.Database(dbPath);
  db.all("SELECT * FROM cards WHERE groupId = ?", [groupId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
  db.close();
});

app.put("/cards/:id", (req, res) => {
  const { title, description, groupId } = req.body;
  const { id } = req.params;
  const db = new sqlite3.Database(dbPath);
  db.run(
    "UPDATE cards SET title = ?, description = ?, groupId = ? WHERE id = ?",
    [title, description, groupId, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: `Card with id ${id} updated successfully` });
    }
  );
  db.close();
});

app.delete("/cards/:id", (req, res) => {
  const { id } = req.params;
  const db = new sqlite3.Database(dbPath);
  db.run("DELETE FROM cards WHERE id = ?", [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: `Card with id ${id} deleted successfully` });
  });
  db.close();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
