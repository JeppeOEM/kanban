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

const sqlFile = "./sql.sql";
const sqlCommands = fs.readFileSync(sqlFile, "utf8");

db.serialize(() => {
  db.run("PRAGMA foreign_keys = ON;", (err) => {
    if (err) {
      console.error("Error enabling foreign keys:", err.message);
      return;
    }
    db.exec(sqlCommands, (err) => {
      if (err) {
        console.error("Error executing SQL commands:", err.message);
        return;
      }

      const defaultgroups = ["Team Resources", "To Do", "Doing", "Done", "Questions"];
      const insertListQuery = db.prepare("INSERT INTO groups (title) VALUES (?)");

      defaultgroups.forEach((title) => {
        insertListQuery.run(title);
      });

      insertListQuery.finalize();

      console.log("Database setup complete.");
    });
  });
});

// GROUPS

app.put("/groups/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  db.run("UPDATE groups SET title = ? WHERE id = ?", [title, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: `Group with id ${id} updated successfully` });
  });
});

app.delete("/groups/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM groups WHERE id = ?", [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: `Group with id ${id} deleted successfully` });
  });
});

app.post("/groups", (req, res) => {
  const { title } = req.body;
  db.run("INSERT INTO groups (title) VALUES (?)", [title], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, title: title });
  });
});

app.get("/groups", (req, res) => {
  db.all("SELECT * FROM groups", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// CARDS

app.post("/cards", (req, res) => {
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
    }
  );
});

app.get("/cards", (req, res) => {
  db.all("SELECT * FROM cards", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get("/cards/:groupId", (req, res) => {
  const { groupId } = req.params;
  db.all("SELECT * FROM cards WHERE groupId = ?", [groupId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.put("/cards/:id", (req, res) => {
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
    }
  );
});

app.delete("/cards/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  db.run("DELETE FROM cards WHERE id = ?", [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: `Card with id ${id} deleted successfully` });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
