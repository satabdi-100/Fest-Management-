CREATE TABLE fests (
    fest_id INT AUTO_INCREMENT PRIMARY KEY,
    fest_name VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    location VARCHAR(255),
    description TEXT
);


CREATE TABLE events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    fest_id INT,
    event_name VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    venue VARCHAR(255),
    max_participants INT,
    registration_fee DECIMAL(10, 2),
    FOREIGN KEY (fest_id) REFERENCES fests(fest_id)
);

CREATE TABLE participants (
    participant_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE registrations (
    registration_id INT AUTO_INCREMENT PRIMARY KEY,
    participant_id INT,
    event_id INT,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'confirmed',
    FOREIGN KEY (participant_id) REFERENCES participants(participant_id),
    FOREIGN KEY (event_id) REFERENCES events(event_id)
);

CREATE TABLE teams (
    team_id INT AUTO_INCREMENT PRIMARY KEY,
    team_name VARCHAR(255) NOT NULL,
    event_id INT,
    leader_participant_id INT,
    FOREIGN KEY (event_id) REFERENCES events(event_id),
    FOREIGN KEY (leader_participant_id) REFERENCES participants(participant_id)
);

-- Insert a sample fest
INSERT INTO fests (fest_name, start_date, end_date, location, description) VALUES
('Tech-A-Thon 2025', '2025-09-10', '2025-09-12', 'University Campus', 'Annual tech festival featuring various competitions and workshops.');

-- Insert some sample events for the fest
-- Note: Replace `1` with the actual fest_id from the fests table
INSERT INTO events (fest_id, event_name, description, event_date, start_time, end_time, venue, max_participants, registration_fee) VALUES
(1, 'Code-A-Thon', 'A 24-hour coding marathon.', '2025-09-10', '09:00:00', '09:00:00', 'IT Lab 101', 100, 50.00),
(1, 'Robo War', 'Robotic combat tournament.', '2025-09-11', '13:00:00', '17:00:00', 'Sports Arena', 50, 75.00),
(1, 'Gaming Tournament', 'Valorant and CS:GO tournament.', '2025-09-12', '10:00:00', '18:00:00', 'Computer Center', 200, 30.00);

-- Insert some sample participants
INSERT INTO participants (first_name, last_name, email, phone_number) VALUES
('John', 'Doe', 'john.doe@example.com', '123-456-7890'),
('Jane', 'Smith', 'jane.smith@example.com', '098-765-4321'),
('Alice', 'Johnson', 'alice.j@example.com', '111-222-3333');

-- Insert registration data (linking participants to events)
-- Note: Replace the IDs with the actual IDs from your tables
INSERT INTO registrations (participant_id, event_id) VALUES
(1, 1), -- John Doe registers for Code-A-Thon
(1, 3), -- John Doe registers for Gaming Tournament
(2, 2), -- Jane Smith registers for Robo War
(3, 1); -- Alice Johnson registers for Code-A-Thon
