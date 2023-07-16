const db = require('../db/database');
const fs = require('fs');

exports.getComments = async (req, res) => {
  const sql = 'SELECT * FROM COMMENT';

  try {
    const [results, fields] = await db.query(sql);
    
    // Convert FILEDATA from Blob to Buffer
    results.forEach(comment => {
      if (comment.FILEDATA) {
        comment.FILEDATA = Buffer.from(comment.FILEDATA);
      }
    });
    
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'An error occurred', error: err.message });
  }
};


exports.createComment = async (req, res) => {
  const { COMMENT, TASKID, EMAIL, DATE } = req.body;
  let FILENAME = null;
  let FILEDATA = null;

  // Check if a file was uploaded
  if (req.file) {
    const file = req.file;

    // Read the file data
    FILEDATA = fs.readFileSync(file.path);

    // Assign the original name of the file
    FILENAME = file.originalname;

    // Remove the file from disk
    fs.unlinkSync(file.path);
  }

  try {
    const sql = `
      INSERT INTO COMMENT (COMMENT, DATE, TASKID, EMAIL, FILENAME, FILEDATA)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result, fields] = await db.query(sql, [COMMENT, DATE, TASKID, EMAIL, FILENAME, FILEDATA]);

    res.status(200).send({ message: 'Comment created successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'An error occurred', error: err.message });
  }
};



exports.updateComment = async (req, res) => {
  const id = req.params.id;
  const { COMMENT, DATE, TASKID, EMAIL } = req.body;

  let FILENAME = null;
  let FILEDATA = null;

  // Check if a file was uploaded
  if (req.file) {
    const file = req.file;

    // Read the file data
    FILEDATA = fs.readFileSync(file.path);

    // Assign the original name of the file
    FILENAME = file.originalname;

    // Remove the file from disk
    fs.unlinkSync(file.path);
  }

  try {
    const sql = `
      UPDATE COMMENT 
      SET COMMENT = ?, DATE = ?, TASKID = ?, EMAIL = ?, FILENAME = ?, FILEDATA = ? 
      WHERE COMMENTID = ?
    `;
    const [result, fields] = await db.query(sql, [COMMENT, DATE, TASKID, EMAIL, FILENAME, FILEDATA, id]);

    res.status(200).send({ message: 'Comment updated successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'An error occurred', error: err.message });
  }
};


exports.deleteComment = async (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM COMMENT WHERE COMMENTID = ?';

  try {
    const [result, fields] = await db.query(sql, [id]);
    res.status(200).send({ message: 'Comment deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'An error occurred', error: err.message });
  }
};

exports.getCommentsByTaskId = async (req, res) => {
  const taskId = req.query.taskId;
  const sql = 'SELECT * FROM COMMENT WHERE TASKID = ?';

  try {
    const [result, fields] = await db.query(sql, [taskId]);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'An error occurred', error: err.message });
  }
};
