-- Barangay Management Information System relational schema
CREATE TABLE residents (
  id INTEGER PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  age INTEGER,
  sex VARCHAR(20),
  civil_status VARCHAR(30),
  household_code VARCHAR(30),
  contact_number VARCHAR(30),
  status VARCHAR(30) DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE households (
  id INTEGER PRIMARY KEY,
  code VARCHAR(30) UNIQUE NOT NULL,
  household_head VARCHAR(150),
  address VARCHAR(255),
  members INTEGER DEFAULT 0,
  status VARCHAR(30) DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE documents (
  id INTEGER PRIMARY KEY,
  document_type VARCHAR(100) NOT NULL,
  applicant VARCHAR(150) NOT NULL,
  request_date DATE,
  status VARCHAR(30) DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE officials (
  id INTEGER PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  position VARCHAR(100),
  term VARCHAR(30),
  contact_number VARCHAR(30),
  status VARCHAR(30) DEFAULT 'Active'
);
CREATE TABLE announcements (
  id INTEGER PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  announcement_date DATE,
  status VARCHAR(30) DEFAULT 'Draft',
  details TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE services (
  id INTEGER PRIMARY KEY,
  service_name VARCHAR(150) NOT NULL,
  category VARCHAR(100),
  fee VARCHAR(50),
  status VARCHAR(30) DEFAULT 'Active'
);
CREATE TABLE activity_log (
  id INTEGER PRIMARY KEY,
  action VARCHAR(255) NOT NULL,
  username VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
