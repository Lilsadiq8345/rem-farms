-- Users Table (Base table for all user types)
CREATE TABLE USERS (
    USER_ID INT PRIMARY KEY AUTO_INCREMENT,
    USERNAME VARCHAR(100) NOT NULL,
    EMAIL VARCHAR(255) UNIQUE NOT NULL,
    PASSWORD_HASH VARCHAR(255) NOT NULL,
    USER_TYPE ENUM('investor', 'staff', 'admin', 'super_admin') NOT NULL,
    VERIFIED BOOLEAN DEFAULT FALSE,
    UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- User Profiles Table
CREATE TABLE USER_PROFILES (
    PROFILE_ID INT PRIMARY KEY AUTO_INCREMENT,
    USER_ID INT,
    FIRST_NAME VARCHAR(100),
    LAST_NAME VARCHAR(100),
    PHONE_NUMBER VARCHAR(20),
    ADDRESS TEXT,
    PROFILE_PICTURE VARCHAR(255),
    VERIFICATION_STATUS ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
    VERIFICATION_DOCUMENT VARCHAR(255),
    FOREIGN KEY (USER_ID) REFERENCES USERS(USER_ID) ON DELETE CASCADE
);

-- Tokens Table (for storing temporary tokens, e.g., for email verification)
CREATE TABLE TOKENS (
    TOKEN_ID INT PRIMARY KEY AUTO_INCREMENT,
    USER_ID INT NOT NULL,
    TOKEN VARCHAR(255) NOT NULL,
    EXPIRATION TIMESTAMP NOT NULL,
    TOKEN_TYPE ENUM('verification', 'password_reset') NOT NULL,
    FOREIGN KEY (USER_ID) REFERENCES USERS(USER_ID) ON DELETE CASCADE
);

-- Portfolios Table (holds each user’s portfolio summary)
CREATE TABLE PORTFOLIOS (
    PORTFOLIO_ID INT PRIMARY KEY AUTO_INCREMENT,
    USER_ID INT NOT NULL,
    TOTAL_INVESTMENT DECIMAL(15, 2) DEFAULT 0.00,
    CURRENT_VALUE DECIMAL(15, 2) DEFAULT 0.00,
    RETURNS DECIMAL(5, 2) DEFAULT 0.00,
    FOREIGN KEY (USER_ID) REFERENCES USERS(USER_ID) ON DELETE CASCADE
);

-- Assets Table (individual assets in each portfolio)
CREATE TABLE ASSETS (
    ASSET_ID INT PRIMARY KEY AUTO_INCREMENT,
    PORTFOLIO_ID INT NOT NULL,
    NAME VARCHAR(100) NOT NULL,
    QUANTITY INT DEFAULT 0,
    UNIT VARCHAR(50),
    FOREIGN KEY (PORTFOLIO_ID) REFERENCES PORTFOLIOS(PORTFOLIO_ID) ON DELETE CASCADE
);

-- Asset Distribution Table (investment distribution within portfolios)
CREATE TABLE ASSET_DISTRIBUTION (
    DISTRIBUTION_ID INT PRIMARY KEY AUTO_INCREMENT,
    PORTFOLIO_ID INT NOT NULL,
    TYPE VARCHAR(50) NOT NULL,
    PERCENTAGE DECIMAL(5, 2) DEFAULT 0.00,
    FOREIGN KEY (PORTFOLIO_ID) REFERENCES PORTFOLIOS(PORTFOLIO_ID) ON DELETE CASCADE
);

-- Services Table
CREATE TABLE SERVICES (
    SERVICE_ID INT PRIMARY KEY AUTO_INCREMENT,
    NAME VARCHAR(100) NOT NULL,
    DESCRIPTION TEXT,
    PRICE DECIMAL(10, 2) NOT NULL,
    DURATION INT NOT NULL,
    USER_ID INT,
    IMAGE_URL VARCHAR(255),
    STATUS ENUM('active', 'inactive') DEFAULT 'active',
    FOREIGN KEY (USER_ID) REFERENCES USERS(USER_ID) ON DELETE SET NULL
);

-- Transactions Table
CREATE TABLE TRANSACTIONS (
    TRANSACTION_ID INT PRIMARY KEY AUTO_INCREMENT,
    BUYER_ID INT,
    SELLER_ID INT,
    COMMODITY_ID INT,
    QUANTITY INT NOT NULL,
    TOTAL_AMOUNT DECIMAL(10, 2) NOT NULL,
    STATUS ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
    TRANSACTION_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (BUYER_ID) REFERENCES USERS(USER_ID) ON DELETE CASCADE,
    FOREIGN KEY (SELLER_ID) REFERENCES USERS(USER_ID) ON DELETE CASCADE,
    FOREIGN KEY (COMMODITY_ID) REFERENCES COMMODITIES(COMMODITY_ID) ON DELETE SET NULL
);

-- Service Subscriptions Table
CREATE TABLE SERVICE_SUBSCRIPTIONS (
    SUBSCRIPTION_ID INT PRIMARY KEY AUTO_INCREMENT,
    SERVICE_ID INT,
    USER_ID INT,
    START_DATE DATE NOT NULL,
    END_DATE DATE NOT NULL,
    STATUS ENUM('active', 'expired', 'cancelled') DEFAULT 'active',
    FOREIGN KEY (SERVICE_ID) REFERENCES SERVICES(SERVICE_ID) ON DELETE CASCADE,
    FOREIGN KEY (USER_ID) REFERENCES USERS(USER_ID) ON DELETE CASCADE
);

-- Live Sessions Table
CREATE TABLE LIVE_SESSIONS (
    SESSION_ID INT PRIMARY KEY AUTO_INCREMENT,
    STAFF_ID INT,
    INVESTOR_ID INT,
    COMMODITY_ID INT,
    SCHEDULED_TIME DATETIME NOT NULL,
    STATUS ENUM('scheduled', 'completed', 'cancelled') DEFAULT 'scheduled',
    VIDEO_URL VARCHAR(255),
    FOREIGN KEY (STAFF_ID) REFERENCES USERS(USER_ID) ON DELETE CASCADE,
    FOREIGN KEY (INVESTOR_ID) REFERENCES USERS(USER_ID) ON DELETE CASCADE,
    FOREIGN KEY (COMMODITY_ID) REFERENCES COMMODITIES(COMMODITY_ID) ON DELETE SET NULL
);

-- Messages Table
CREATE TABLE MESSAGES (
    MESSAGE_ID INT PRIMARY KEY AUTO_INCREMENT,
    SENDER_ID INT,
    RECEIVER_ID INT,
    MESSAGE_TEXT TEXT NOT NULL,
    SENT_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    READ_STATUS BOOLEAN DEFAULT FALSE,
    PARENT_MESSAGE_ID INT,
    FOREIGN KEY (SENDER_ID) REFERENCES USERS(USER_ID) ON DELETE CASCADE,
    FOREIGN KEY (RECEIVER_ID) REFERENCES USERS(USER_ID) ON DELETE CASCADE,
    FOREIGN KEY (PARENT_MESSAGE_ID) REFERENCES MESSAGES(MESSAGE_ID) ON DELETE CASCADE
);

-- Cart Items Table
CREATE TABLE CART_ITEMS (
    CART_ID INT PRIMARY KEY AUTO_INCREMENT,
    USER_ID INT,
    COMMODITY_ID INT,
    QUANTITY INT NOT NULL,
    ADDED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (USER_ID) REFERENCES USERS(USER_ID) ON DELETE CASCADE,
    FOREIGN KEY (COMMODITY_ID) REFERENCES COMMODITIES(COMMODITY_ID) ON DELETE CASCADE
);

-- Commodities Table
CREATE TABLE COMMODITIES (
    COMMODITY_ID INT PRIMARY KEY AUTO_INCREMENT,
    NAME VARCHAR(100) NOT NULL,
    CATEGORY ENUM('short_term', 'mid_term', 'long_term') NOT NULL,
    DESCRIPTION TEXT,
    PRICE DECIMAL(10, 2) NOT NULL,
    QUANTITY INT NOT NULL,
    STAFF_ID INT,
    IMAGE_URL VARCHAR(255),
    STATUS ENUM('available', 'sold', 'in_progress') DEFAULT 'available',
    INVESTOR_ID INT,
    FOREIGN KEY (STAFF_ID) REFERENCES USERS(USER_ID) ON DELETE SET NULL,
    FOREIGN KEY (INVESTOR_ID) REFERENCES USERS(USER_ID) ON DELETE SET NULL
);

-- Notifications Table
CREATE TABLE NOTIFICATIONS (
    NOTIFICATION_ID INT PRIMARY KEY AUTO_INCREMENT,
    USER_ID INT,
    TITLE VARCHAR(255) NOT NULL,
    MESSAGE TEXT NOT NULL,
    TYPE ENUM('info', 'success', 'warning', 'error') DEFAULT 'info',
    READ_STATUS BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (USER_ID) REFERENCES USERS(USER_ID) ON DELETE CASCADE
);

-- Sample data for USERS table
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

-- Sample data for USER_PROFILES table
INSERT INTO USER_PROFILES (
    USER_ID,
    FIRST_NAME,
    LAST_NAME,
    PHONE_NUMBER,
    ADDRESS,
    VERIFICATION_STATUS
) VALUES (
    1,
    'John',
    'Doe',
    '+1234567890',
    '123 Main St',
    'verified'
),
(
    2,
    'Jane',
    'Smith',
    '+0987654321',
    '456 Oak St',
    'pending'
),
(
    3,
    'Admin',
    'User',
    '+1122334455',
    '789 Pine St',
    'verified'
);

-- Sample data for TOKENS table
INSERT INTO TOKENS (
    USER_ID,
    TOKEN,
    EXPIRATION,
    TOKEN_TYPE
) VALUES (
    1,
    'token123',
    '2024-12-31 23:59:59',
    'verification'
),
(
    2,
    'token456',
    '2024-12-31 23:59:59',
    'password_reset'
);

-- Sample data for PORTFOLIOS table
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
),
(
    2,
    20000.00,
    22000.00,
    10.00
);

-- Sample data for ASSETS table
INSERT INTO ASSETS (
    PORTFOLIO_ID,
    NAME,
    QUANTITY,
    UNIT
) VALUES (
    1,
    'Asset A',
    100,
    'shares'
),
(
    1,
    'Asset B',
    200,
    'units'
),
(
    2,
    'Asset C',
    150,
    'shares'
);

-- Sample data for ASSET_DISTRIBUTION table
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

-- Sample data for COMMODITIES table
INSERT INTO COMMODITIES (
    NAME,
    CATEGORY,
    DESCRIPTION,
    PRICE,
    QUANTITY,
    STAFF_ID,
    IMAGE_URL,
    STATUS,
    INVESTOR_ID
) VALUES (
    'Organic Corn',
    'short_term',
    'High-quality organic corn.',
    100.00,
    500,
    2,
    '/images/maize.jpeg',
    'available',
    NULL
),
(
    'Wheat Grain',
    'mid_term',
    'Premium wheat grain for milling.',
    250.00,
    300,
    2,
    '/images/wheat-grain.jpeg',
    'available',
    NULL
),
(
    'Fresh Tomatoes',
    'short_term',
    'Pesticide-free ripe tomatoes.',
    50.00,
    1500,
    2,
    '/images/fresh-tomatoes.jpeg',
    'sold',
    1
);

-- Sample data for SERVICES table
INSERT INTO SERVICES (
    NAME,
    DESCRIPTION,
    PRICE,
    DURATION,
    USER_ID,
    IMAGE_URL,
    STATUS
) VALUES (
    'Agriculture Consultation',
    'Expert advice on farming and crop management.',
    500.00,
    60,
    2,
    '/images/agri-consultation.jpeg',
    'active'
);

-- Sample data for TRANSACTIONS table
INSERT INTO TRANSACTIONS (
    BUYER_ID,
    SELLER_ID,
    COMMODITY_ID,
    QUANTITY,
    TOTAL_AMOUNT,
    STATUS
) VALUES (
    1,
    2,
    1,
    50,
    5000.00,
    'completed'
),
(
    1,
    2,
    2,
    100,
    25000.00,
    'pending'
);

-- Sample data for SERVICE_SUBSCRIPTIONS table
INSERT INTO SERVICE_SUBSCRIPTIONS (
    SERVICE_ID,
    USER_ID,
    START_DATE,
    END_DATE,
    STATUS
) VALUES (
    1,
    1,
    '2024-01-01',
    '2025-01-01',
    'active'
);

-- Sample data for LIVE_SESSIONS table
INSERT INTO LIVE_SESSIONS (
    STAFF_ID,
    INVESTOR_ID,
    COMMODITY_ID,
    SCHEDULED_TIME,
    STATUS,
    VIDEO_URL
) VALUES (
    2,
    1,
    1,
    '2024-12-01 10:00:00',
    'scheduled',
    '/videos/agri-session1.mp4'
);

-- Insert sample messages into MESSAGES table

-- Investor (ID 1) sends a message to Staff (ID 2)
INSERT INTO MESSAGES (
    SENDER_ID,
    RECEIVER_ID,
    MESSAGE_TEXT,
    READ_STATUS,
    PARENT_MESSAGE_ID
) VALUES (
    1,
    2,
    'Hello Sarah, I need assistance with my account.',
    FALSE,
    NULL
);

-- Staff (ID 2) replies to Investor (ID 1)
INSERT INTO MESSAGES (
    SENDER_ID,
    RECEIVER_ID,
    MESSAGE_TEXT,
    READ_STATUS,
    PARENT_MESSAGE_ID
) VALUES (
    2,
    1,
    'Hello John, I am happy to help. What seems to be the issue?',
    FALSE,
    1
);

-- Investor (ID 1) replies to Staff (ID 2)
INSERT INTO MESSAGES (
    SENDER_ID,
    RECEIVER_ID,
    MESSAGE_TEXT,
    READ_STATUS,
    PARENT_MESSAGE_ID
) VALUES (
    1,
    2,
    'I cannot access my transaction history, could you check for me?',
    FALSE,
    1
);

-- Staff (ID 2) replies to Investor (ID 1)
INSERT INTO MESSAGES (
    SENDER_ID,
    RECEIVER_ID,
    MESSAGE_TEXT,
    READ_STATUS,
    PARENT_MESSAGE_ID
) VALUES (
    2,
    1,
    'I will check that for you and get back to you shortly.',
    FALSE,
    1
);

-- Investor (ID 1) marks message as read
UPDATE MESSAGES
SET
    READ_STATUS = TRUE
WHERE
    MESSAGE_ID = 4;

-- Sample data for CART_ITEMS table
INSERT INTO CART_ITEMS (
    USER_ID,
    COMMODITY_ID,
    QUANTITY,
    ADDED_AT
) VALUES (
    1,
    1,
    5,
    CURRENT_TIMESTAMP
),
(
    1,
    2,
    10,
    CURRENT_TIMESTAMP
);

-- Sample data for NOTIFICATIONS table
INSERT INTO NOTIFICATIONS (
    USER_ID,
    TITLE,
    MESSAGE,
    TYPE,
    READ_STATUS
) VALUES (
    1,
    'New Commodity Added',
    'A new commodity is now available.',
    'info',
    FALSE
),
(
    2,
    'Portfolio Update',
    'Your portfolio value has increased.',
    'success',
    TRUE
);