var express = require('express');
var router = express.Router();
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Práctica 2' });
});
router.get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM tabla_pr2');
      const results = { 'results': (result) ? result.rows : null};
      res.render('db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  });
router.get('/db2', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM tabla_pr2_asignaturas');
      const results = { 'results': (result) ? result.rows : null};
      res.render('db2', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  });


module.exports = router;
