const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 3000;
const dbPath = "./db.db";

app.use(cors());
app.use(express.json());
const db = new sqlite3.Database(dbPath);

// Read and execute SQL commands from the file
const sqlFile = "./sql.sql";
const sqlCommands = fs.readFileSync(sqlFile, "utf8");

db.serialize(() => {
  db.exec(sqlCommands, (err) => {
    if (err) {
      console.error("Error executing SQL commands:", err.message);
      return;
    }

    const defaultgroups = ["Team Resources", "To Do", "Doing", "Done", "Additional Questions"];
    const insertListQuery = db.prepare("INSERT INTO groups (title) VALUES (?)");

    defaultgroups.forEach((title) => {
      insertListQuery.run(title);
    });

    insertListQuery.finalize();

    console.log("Database setup complete.");
  });
});

db.close();

app.put("/groups/:id", (req, res) => {
  const db = new sqlite3.Database(dbPath);
  const { id } = req.params;
  const { title } = req.body;
  db.run("UPDATE groups SET title = ? WHERE id = ?", [title, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: `List with id ${id} updated successfully` });
    db.close();
  });
});

app.delete("/groups/:id", (req, res) => {
  const db = new sqlite3.Database(dbPath);
  const { id } = req.params;

  db.run("DELETE FROM groups WHERE id = ?", [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: `List with id ${id} deleted successfully` });
    db.close();
  });
});

app.post("/groups", (req, res) => {
  const db = new sqlite3.Database(dbPath);
  const title = req.body.title;

  db.run("INSERT INTO groups (title) VALUES (?)", [title], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, title: title });
    db.close();
  });
});

app.get("/groups", (req, res) => {
  const db = new sqlite3.Database(dbPath);
  db.all("SELECT * FROM groups", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
    db.close();
  });
});

//CARDS

app.post("/cards", (req, res) => {
  const db = new sqlite3.Database(dbPath);
  const { title, description, groupId } = req.body;

  db.run(
    "INSERT INTO cards (title, description, groupId) VALUES (?, ?, ?)",
    [title, description, groupId],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
      db.close();
    }
  );
});

app.get("/cards", (req, res) => {
  const db = new sqlite3.Database(dbPath);
  db.all("SELECT * FROM cards", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
    db.close();
  });
});

app.get("/cards/:groupId", (req, res) => {
  const db = new sqlite3.Database(dbPath);
  const { groupId } = req.params;

  db.all("SELECT * FROM cards WHERE groupId = ?", [groupId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
    db.close();
  });
});

app.put("/cards/:id", (req, res) => {
  const db = new sqlite3.Database(dbPath);
  const { title, description, groupId } = req.body;
  const { id } = req.params;

  db.run(
    "UPDATE cards SET title = ?, description = ?, groupId = ? WHERE id = ?",
    [title, description, groupId, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: `Card with id ${id} updated successfully` });
      db.close();
    }
  );
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
    db.close();
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
