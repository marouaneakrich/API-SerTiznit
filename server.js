
require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Error connecting to the database:', err.stack);
  } else {
    console.log('✅ Successfully connected to PostgreSQL database');
    release();
  }
});


app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to SerTiznit Artisan Management API',
    version: '1.0.0',
  });
});


app.post('/artisans', async (req, res) => {
  try {
    const { name, phone, profession, experience_years, rating } = req.body;

    if (!name || !phone || !profession) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['name', 'phone', 'profession']
      });
    }

    if (rating && (rating < 0 || rating > 5)) {
      return res.status(400).json({
        error: 'Rating must be between 0 and 5'
      });
    }

    const query = `
      INSERT INTO artisans (name, phone, profession, experience_years, rating)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [name, phone, profession, experience_years || 0, rating || 0];
    const result = await pool.query(query, values);

    res.status(201).json({
      message: 'Artisan added successfully',
      artisan: result.rows[0]
    });
  } catch (error) {
    console.error('Error adding artisan:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
});


app.get('/artisans', async (req, res) => {
  try {
    const query = 'SELECT * FROM artisans ORDER BY id ASC';
    const result = await pool.query(query);

    res.status(200).json({
      count: result.rows.length,
      artisans: result.rows
    });
  } catch (error) {
    console.error('Error fetching artisans:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
});

app.get('/artisans/search', async (req, res) => {
  try {
    const { profession } = req.query;

    if (!profession) {
      return res.status(400).json({
        error: 'Missing profession parameter',
        message: 'Please provide a profession to search for'
      });
    }

    const query = 'SELECT * FROM artisans WHERE LOWER(profession) LIKE LOWER($1)';
    const result = await pool.query(query, [`%${profession}%`]);

    res.status(200).json({
      count: result.rows.length,
      profession_searched: profession,
      artisans: result.rows
    });
  } catch (error) {
    console.error('Error searching artisans:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
});


app.get('/stats/total', async (req, res) => {
  try {
    const totalQuery = 'SELECT COUNT(*) as total FROM artisans';
    const professionQuery = 'SELECT profession, COUNT(*) as count FROM artisans GROUP BY profession';
    const avgRatingQuery = 'SELECT AVG(rating) as average_rating FROM artisans';

    const totalResult = await pool.query(totalQuery);
    const professionResult = await pool.query(professionQuery);
    const avgRatingResult = await pool.query(avgRatingQuery);

    res.status(200).json({
      total_artisans: parseInt(totalResult.rows[0].total),
      by_profession: professionResult.rows,
      average_rating: parseFloat(avgRatingResult.rows[0].average_rating).toFixed(2)
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
});

app.get('/artisans/:id', async (req, res) => {
  try {
    const { id } = req.params;


    if (isNaN(id)) {
      return res.status(400).json({
        error: 'Invalid ID format',
        message: 'ID must be a number'
      });
    }

    const query = 'SELECT * FROM artisans WHERE id = $1';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Artisan not found',
        message: `No artisan found with ID ${id}`
      });
    }

    res.status(200).json({
      artisan: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching artisan:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
});


app.put('/artisans/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, profession, experience_years, rating } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        error: 'Invalid ID format',
        message: 'ID must be a number'
      });
    }

    const checkQuery = 'SELECT * FROM artisans WHERE id = $1';
    const checkResult = await pool.query(checkQuery, [id]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        error: 'Artisan not found',
        message: `No artisan found with ID ${id}`
      });
    }

    if (rating && (rating < 0 || rating > 5)) {
      return res.status(400).json({
        error: 'Rating must be between 0 and 5'
      });
    }

    const updateQuery = `
      UPDATE artisans
      SET name = $1, phone = $2, profession = $3, experience_years = $4, rating = $5, updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *
    `;
    const values = [
      name || checkResult.rows[0].name,
      phone || checkResult.rows[0].phone,
      profession || checkResult.rows[0].profession,
      experience_years !== undefined ? experience_years : checkResult.rows[0].experience_years,
      rating !== undefined ? rating : checkResult.rows[0].rating,
      id
    ];
    const result = await pool.query(updateQuery, values);

    res.status(200).json({
      message: 'Artisan updated successfully',
      artisan: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating artisan:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
});


app.delete('/artisans/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({
        error: 'Invalid ID format',
        message: 'ID must be a number'
      });
    }

    const checkQuery = 'SELECT * FROM artisans WHERE id = $1';
    const checkResult = await pool.query(checkQuery, [id]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        error: 'Artisan not found',
        message: `No artisan found with ID ${id}`
      });
    }

    const deleteQuery = 'DELETE FROM artisans WHERE id = $1 RETURNING *';
    const result = await pool.query(deleteQuery, [id]);

    res.status(200).json({
      message: 'Artisan deleted successfully',
      deleted_artisan: result.rows[0]
    });
  } catch (error) {
    console.error('Error deleting artisan:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
});




app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.url}`
  });
});

app.listen(PORT, () => {
  console.log(`🚀 SerTiznit API is running on http://localhost:${PORT}`);
});
