-- Schema for Serene Spa Directory
-- Normalized from the mock data in src/data/spas.js, categories.js, locations.js
-- Run this first, then run `npm run seed` (or import sql/seed.sql if you generated one) to load demo data.

CREATE DATABASE IF NOT EXISTS website_aminh3 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE website_aminh3;

-- ── Admin accounts (multi-admin, all equal privilege) ─────────────────────
CREATE TABLE admin_users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  username      VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  display_name  VARCHAR(100),
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ── Locations: city -> areas (district), matches locations.js groups ──────
CREATE TABLE cities (
  id   INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE areas (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  city_id    INT NOT NULL,
  slug       VARCHAR(50) NOT NULL UNIQUE,
  label      VARCHAR(100) NOT NULL,
  spa_count  INT NOT NULL DEFAULT 0,   -- editable display counter (mirrors the mock "count" field, admin-curated)
  sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ── Category master list (matches categories.js) ──────────────────────────
CREATE TABLE categories (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  slug       VARCHAR(50) NOT NULL UNIQUE,
  label      VARCHAR(100) NOT NULL,
  title      VARCHAR(100) NOT NULL,
  icon       VARCHAR(10),
  sort_order INT NOT NULL DEFAULT 0
) ENGINE=InnoDB;

-- ── Badge master list (matches badgeMeta in spas.js) ───────────────────────
CREATE TABLE badges (
  id    INT AUTO_INCREMENT PRIMARY KEY,
  `key` VARCHAR(30) NOT NULL UNIQUE,
  label VARCHAR(50) NOT NULL,
  color VARCHAR(20) NOT NULL
) ENGINE=InnoDB;

-- ── Spas (main entity) ──────────────────────────────────────────────────
CREATE TABLE spas (
  id           VARCHAR(80) PRIMARY KEY,   -- keeps the original slug id, e.g. 'serene-lotus-spa'
  name         VARCHAR(150) NOT NULL,
  tagline      VARCHAR(255),
  area_id      INT NOT NULL,
  address      VARCHAR(255),
  rating       DECIMAL(2,1) NOT NULL DEFAULT 0,
  review_count INT NOT NULL DEFAULT 0,
  bio          TEXT,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (area_id) REFERENCES areas(id)
) ENGINE=InnoDB;

-- Many-to-many: spa <-> category
CREATE TABLE spa_categories (
  spa_id      VARCHAR(80) NOT NULL,
  category_id INT NOT NULL,
  PRIMARY KEY (spa_id, category_id),
  FOREIGN KEY (spa_id) REFERENCES spas(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Many-to-many: spa <-> badge (ordered)
CREATE TABLE spa_badges (
  spa_id     VARCHAR(80) NOT NULL,
  badge_id   INT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  PRIMARY KEY (spa_id, badge_id),
  FOREIGN KEY (spa_id) REFERENCES spas(id) ON DELETE CASCADE,
  FOREIGN KEY (badge_id) REFERENCES badges(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- One-to-many: gallery images (images[0] = cover)
CREATE TABLE spa_images (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  spa_id     VARCHAR(80) NOT NULL,
  url        VARCHAR(500) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (spa_id) REFERENCES spas(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- One-to-many: info panel key/value rows (Experience, Specialty, Languages, ...)
CREATE TABLE spa_info (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  spa_id     VARCHAR(80) NOT NULL,
  label      VARCHAR(100) NOT NULL,
  value      VARCHAR(255) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (spa_id) REFERENCES spas(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- One-to-many: pricing rows
CREATE TABLE spa_rates (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  spa_id     VARCHAR(80) NOT NULL,
  duration   VARCHAR(50) NOT NULL,
  price      INT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (spa_id) REFERENCES spas(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- One-to-many: included/optional services
CREATE TABLE spa_services (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  spa_id      VARCHAR(80) NOT NULL,
  name        VARCHAR(150) NOT NULL,
  included    TINYINT(1) NOT NULL DEFAULT 0,
  extra_price INT NULL,
  sort_order  INT NOT NULL DEFAULT 0,
  FOREIGN KEY (spa_id) REFERENCES spas(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- One-to-many: customer reviews
CREATE TABLE spa_reviews (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  spa_id      VARCHAR(80) NOT NULL,
  author      VARCHAR(100) NOT NULL,
  review_date DATE NOT NULL,
  rating      TINYINT NOT NULL,
  text        TEXT,
  FOREIGN KEY (spa_id) REFERENCES spas(id) ON DELETE CASCADE
) ENGINE=InnoDB;
