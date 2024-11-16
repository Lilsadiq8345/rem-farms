-- Create Database (No need for "IF NOT EXISTS" in PostgreSQL)
CREATE DATABASE REM_FARMS;

\c rem_farms; -- Connect to the database after creation

-- Users Table (Base table for all user types)
CREATE TABLE USERS (
    USER_ID SERIAL PRIMARY KEY,
    USERNAME VARCHAR(100) NOT NULL,
    EMAIL VARCHAR(255) UNIQUE NOT NULL,
    PASSWORD_HASH VARCHAR(255) NOT NULL,
    USER_TYPE VARCHAR(20) CHECK (USER_TYPE IN ('investor', 'staff', 'admin', 'super_admin')) NOT NULL,
    VERIFIED BOOLEAN DEFAULT FALSE,
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Profiles Table
CREATE TABLE USER_PROFILES (
    PROFILE_ID SERIAL PRIMARY KEY,
    USER_ID INT,
    FIRST_NAME VARCHAR(100),
    LAST_NAME VARCHAR(100),
    PHONE_NUMBER VARCHAR(20),
    ADDRESS TEXT,
    PROFILE_PICTURE VARCHAR(255),
    VERIFICATION_STATUS VARCHAR(20) DEFAULT 'pending',
    VERIFICATION_DOCUMENT VARCHAR(255),
    FOREIGN KEY (USER_ID) REFERENCES USERS(USER_ID) ON DELETE CASCADE
);

-- Tokens Table (for storing temporary tokens, e.g., for email verification)
CREATE TABLE TOKENS (
    TOKEN_ID SERIAL PRIMARY KEY,
    USER_ID INT NOT NULL,
    TOKEN VARCHAR(255) NOT NULL,
    EXPIRATION TIMESTAMP NOT NULL,
    TOKEN_TYPE VARCHAR(20) CHECK (TOKEN_TYPE IN ('verification', 'password_reset')) NOT NULL,
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (USER_ID) REFERENCES USERS(USER_ID) ON DELETE CASCADE
);

-- Portfolios Table (holds each user’s portfolio summary)
CREATE TABLE PORTFOLIOS (
    PORTFOLIO_ID SERIAL PRIMARY KEY,
    USER_ID INT NOT NULL,
    TOTAL_INVESTMENT DECIMAL(15, 2) DEFAULT 0.00,
    CURRENT_VALUE DECIMAL(15, 2) DEFAULT 0.00,
    RETURNS DECIMAL(5, 2) DEFAULT 0.00,
    FOREIGN KEY (USER_ID) REFERENCES USERS(USER_ID) ON DELETE CASCADE
);

-- Assets Table (individual assets in each portfolio)
CREATE TABLE ASSETS (
    ASSET_ID SERIAL PRIMARY KEY,
    PORTFOLIO_ID INT NOT NULL,
    NAME VARCHAR(100) NOT NULL,
    QUANTITY INT DEFAULT 0,
    UNIT VARCHAR(50),
    FOREIGN KEY (PORTFOLIO_ID) REFERENCES PORTFOLIOS(PORTFOLIO_ID) ON DELETE CASCADE
);

-- Asset Distribution Table (investment distribution within portfolios)
CREATE TABLE ASSET_DISTRIBUTION (
    DISTRIBUTION_ID SERIAL PRIMARY KEY,
    PORTFOLIO_ID INT NOT NULL,
    TYPE VARCHAR(50) NOT NULL,
    PERCENTAGE DECIMAL(5, 2) DEFAULT 0.00,
    FOREIGN KEY (PORTFOLIO_ID) REFERENCES PORTFOLIOS(PORTFOLIO_ID) ON DELETE CASCADE
);

-- Commodities Table
CREATE TABLE COMMODITIES (
    COMMODITY_ID SERIAL PRIMARY KEY,
    NAME VARCHAR(100) NOT NULL,
    CATEGORY VARCHAR(20) CHECK (CATEGORY IN ('short_term', 'mid_term', 'long_term')) NOT NULL,
    DESCRIPTION TEXT,
    PRICE DECIMAL(10, 2) NOT NULL,
    QUANTITY INT NOT NULL,
    STAFF_ID INT,
    IMAGE_URL VARCHAR(255),
    STATUS VARCHAR(20) DEFAULT 'available',
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (STAFF_ID) REFERENCES USERS(USER_ID) ON DELETE SET NULL
);

-- Services Table
CREATE TABLE SERVICES (
    SERVICE_ID SERIAL PRIMARY KEY,
    NAME VARCHAR(100) NOT NULL,
    DESCRIPTION TEXT,
    PRICE DECIMAL(10, 2) NOT NULL,
    DURATION INT NOT NULL,
    USER_ID INT,
    IMAGE_URL VARCHAR(255),
    STATUS VARCHAR(20) DEFAULT 'active',
    FOREIGN KEY (USER_ID) REFERENCES USERS(USER_ID) ON DELETE SET NULL
);

-- Transactions Table
CREATE TABLE TRANSACTIONS (
    TRANSACTION_ID SERIAL PRIMARY KEY,
    BUYER_ID INT,
    SELLER_ID INT,
    COMMODITY_ID INT,
    QUANTITY INT NOT NULL,
    TOTAL_AMOUNT DECIMAL(10, 2) NOT NULL,
    STATUS VARCHAR(20) DEFAULT 'pending',
    TRANSACTION_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (BUYER_ID) REFERENCES USERS(USER_ID) ON DELETE CASCADE,
    FOREIGN KEY (SELLER_ID) REFERENCES USERS(USER_ID) ON DELETE CASCADE,
    FOREIGN KEY (COMMODITY_ID) REFERENCES COMMODITIES(COMMODITY_ID) ON DELETE SET NULL
);

-- Service Subscriptions Table
CREATE TABLE SERVICE_SUBSCRIPTIONS (
    SUBSCRIPTION_ID SERIAL PRIMARY KEY,
    SERVICE_ID INT,
    USER_ID INT,
    START_DATE DATE NOT NULL,
    END_DATE DATE NOT NULL,
    STATUS VARCHAR(20) DEFAULT 'active',
    FOREIGN KEY (SERVICE_ID) REFERENCES SERVICES(SERVICE_ID) ON DELETE CASCADE,
    FOREIGN KEY (USER_ID) REFERENCES USERS(USER_ID) ON DELETE CASCADE
);

-- Live Sessions Table
CREATE TABLE LIVE_SESSIONS (
    SESSION_ID SERIAL PRIMARY KEY,
    STAFF_ID INT,
    INVESTOR_ID INT,
    COMMODITY_ID INT,
    SCHEDULED_TIME TIMESTAMP NOT NULL,
    STATUS VARCHAR(20) DEFAULT 'scheduled',
    VIDEO_URL VARCHAR(255),
    FOREIGN KEY (STAFF_ID) REFERENCES USERS(USER_ID) ON DELETE CASCADE,
    FOREIGN KEY (INVESTOR_ID) REFERENCES USERS(USER_ID) ON DELETE CASCADE,
    FOREIGN KEY (COMMODITY_ID) REFERENCES COMMODITIES(COMMODITY_ID) ON DELETE SET NULL
);

-- Messages Table
CREATE TABLE MESSAGES (
    MESSAGE_ID SERIAL PRIMARY KEY,
    SENDER_ID INT,
    RECEIVER_ID INT,
    MESSAGE_TEXT TEXT NOT NULL,
    SENT_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    READ_STATUS BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (SENDER_ID) REFERENCES USERS(USER_ID) ON DELETE CASCADE,
    FOREIGN KEY (RECEIVER_ID) REFERENCES USERS(USER_ID) ON DELETE CASCADE
);

-- Cart Items Table
CREATE TABLE CART_ITEMS (
    CART_ID SERIAL PRIMARY KEY,
    USER_ID INT,
    COMMODITY_ID INT,
    QUANTITY INT NOT NULL,
    ADDED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (USER_ID) REFERENCES USERS(USER_ID) ON DELETE CASCADE,
    FOREIGN KEY (COMMODITY_ID) REFERENCES COMMODITIES(COMMODITY_ID) ON DELETE CASCADE
);

-- Notifications Table
CREATE TABLE NOTIFICATIONS (
    NOTIFICATION_ID SERIAL PRIMARY KEY,
    USER_ID INT,
    TITLE VARCHAR(255) NOT NULL,
    MESSAGE TEXT NOT NULL,
    TYPE VARCHAR(20) DEFAULT 'info',
    READ_STATUS BOOLEAN DEFAULT FALSE,
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (USER_ID) REFERENCES USERS(USER_ID) ON DELETE CASCADE
);

-- Insert Sample Users
INSERT INTO USERS (
    USERNAME,
    EMAIL,
    PASSWORD_HASH,
    USER_TYPE
) VALUES (
    'investor1',
    'investor1@example.com',
    'hashed_password_1',
    'investor'
),
(
    'staff1',
    'staff1@example.com',
    'hashed_password_2',
    'staff'
),
(
    'admin',
    'admin@example.com',
    'hashed_password_3',
    'admin'
);

-- Insert Sample Portfolios
INSERT INTO PORTFOLIOS (
    USER_ID,
    TOTAL_INVESTMENT,
    CURRENT_VALUE,
    RETURNS
) VALUES (
    1,
    10000.00,
    15000.00,
    50.00
);

-- Insert Sample Assets
INSERT INTO ASSETS (
    PORTFOLIO_ID,
    NAME,
    QUANTITY,
    UNIT
) VALUES (
    1,
    'Asset 1',
    200,
    'shares'
),
(
    1,
    'Asset 2',
    150,
    'shares'
),
(
    1,
    'Asset 3',
    300,
    'units'
);

-- Insert Sample Asset Distribution
INSERT INTO ASSET_DISTRIBUTION (
    PORTFOLIO_ID,
    TYPE,
    PERCENTAGE
) VALUES (
    1,
    'Stocks',
    60.00
),
(
    1,
    'Real Estate',
    30.00
),
(
    1,
    'Commodities',
    10.00
);

-- Insert Sample Commodities
INSERT INTO COMMODITIES (
    NAME,
    CATEGORY,
    DESCRIPTION,
    PRICE,
    QUANTITY,
    STAFF_ID,
    IMAGE_URL,
    STATUS
) VALUES (
    'Organic Corn',
    'short_term',
    'High-quality organic corn.',
    100.00,
    500,
    2,
    '/images/maize.jpeg',
    'available'
),
(
    'Wheat Grain',
    'mid_term',
    'Premium wheat grain for milling.',
    250.00,
    300,
    2,
    '/images/wheat-grain.jpeg',
    'available'
),
(
    'Fresh Tomatoes',
    'short_term',
    'Pesticide-free ripe tomatoes.',
    50.00,
    1500,
    2,
    '/images/fresh-tomatoes.jpeg',
    'available'
);

-- Insert Sample Services
INSERT INTO SERVICES (
    NAME,
    DESCRIPTION,
    PRICE,
    DURATION,
    USER_ID,
    IMAGE_URL,
    STATUS
) VALUES (
    'Financial Planning Consultation',
    'One-on-one session to discuss financial planning and investment strategies.',
    200.00,
    60,
    2,
    '/images/financial-planning.jpg',
    'active'
),
(
    'Portfolio Review and Analysis',
    'Comprehensive review of investment portfolio with recommendations.',
    150.00,
    45,
    2,
    '/images/portfolio-review.jpg',
    'active'
),
(
    'Investment Risk Assessment',
    'Service to assess risk tolerance and provide suitable investment options.',
    100.00,
    30,
    2,
    '/images/risk-assessment.jpg',
    'active'
),
(
    'Commodity Market Insights',
    'Detailed insights and analysis on commodity markets.',
    250.00,
    60,
    2,
    '/images/market-insights.jpg',
    'inactive'
);