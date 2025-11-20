# SerTiznit - Artisan Management API 🔨

## 📋 Project Description
Backend API for SerTiznit to digitalize the management of local craftsmen in the Tiznit region of Morocco. This system replaces traditional phone-based coordination with a modern REST API.

## 🎯 Features
- ✅ Add new artisans
- ✅ List all artisans
- ✅ Get artisan by ID
- ✅ Update artisan information
- ✅ Delete artisan
- ✅ Search by profession (Bonus)
- ✅ Statistics endpoint (Bonus)

## 🛠 Technologies
- Node.js
- Express.js
- PostgreSQL
- pg (node-postgres)

## 📦 Installation

### Prerequisites
- Node.js installed
- PostgreSQL installed and running

### Steps

1. **Clone/Download the project**

2. **Install dependencies**
```bash
npm init -y
npm install express pg dotenv
```

3. **Setup PostgreSQL Database**
   - Create a database named `sertiznit_db`
   - Run the SQL script `database.sql` to create the table

```bash
psql -U postgres
CREATE DATABASE sertiznit_db;
\c sertiznit_db
\i database.sql
```

4. **Configure environment variables**
   
   Create a `.env` file in the root:
```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=sertiznit_db
DB_PASSWORD=your_password
DB_PORT=5432
PORT=3000
```

5. **Start the server**
```bash
node server.js
```

Server will run on `http://localhost:3000`

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/artisans` | Add new artisan |
| GET | `/artisans` | Get all artisans |
| GET | `/artisans/:id` | Get artisan by ID |
| PUT | `/artisans/:id` | Update artisan |
| DELETE | `/artisans/:id` | Delete artisan |
| GET | `/artisans/search?profession=plumber` | Search by profession (Bonus) |
| GET | `/stats/total` | Get total count (Bonus) |

## 📝 Request Examples

### Add Artisan
```json
POST /artisans
{
  "name": "Ahmed Alaoui",
  "phone": "0661234567",
  "profession": "Electrician",
  "experience_years": 10,
  "rating": 4.5
}
```

### Update Artisan
```json
PUT /artisans/1
{
  "name": "Ahmed Alaoui",
  "phone": "0661234567",
  "profession": "Electrician",
  "experience_years": 12,
  "rating": 4.8
}
```

## 🧪 Testing with Postman
Import the following requests:
1. POST - Add artisan
2. GET - Get all artisans
3. GET - Get artisan by ID
4. PUT - Update artisan
5. DELETE - Delete artisan
6. GET - Search by profession
7. GET - Statistics

## 👥 Artisan Types Supported
- Electrician (Électricien)
- Plumber (Plombier)
- Painter (Peintre)
- Carpenter (Menuisier)
- Air conditioning technician (Technicien climatisation)
- Mason (Maçon)
- Locksmith (Serrurier)
- Gardener (Jardinier)

## 🏗 Project Structure
```
sertiznit-api/
│
├── server.js           # Main application file
├── database.sql        # Database creation script
├── .env               # Environment variables
├── package.json       # Dependencies
└── README.md          # This file
```
