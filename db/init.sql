-- Create Players Table
CREATE TABLE players (
    id SERIAL PRIMARY KEY,  -- Automatically incrementing ID for each player
    name VARCHAR(100) NOT NULL  -- Player's name, cannot be null
);

-- Insert Players
INSERT INTO players (name) VALUES 
    ('Adam Fenwick'),
    ('Tommy Ford'),
    ('James Holding'),
    ('Tim Malkin'),
    ('Danny Shackleton'),
    ('Scott O''Brien'),
    ('Joshua Barnett'),
    ('Jamie Fozard'),
    ('Cameron Robinson'),
    ('Tom Hammond'),
    ('Joe Butler'),
    ('Danny Kreft'),
    ('Dan Edmonds'),
    ('Adam Franklin'),
    ('Dean Worral'),
    ('Cameron Liddell'),
    ('Jai Narayan'),
    ('Arjun Varma'),
    ('Aran Harris'),
    ('Harry Whittaker'),
    ('Andy Pye'),
    ('Josh Robinson'),
    ('Jordan Mercer'),
    ('Jordan Moore'),
    ('Jacob Darkes'),
    ('Oli Baron');

-- Create Votes Table
CREATE TABLE votes (
    id SERIAL PRIMARY KEY,  -- Automatically incrementing ID for each vote
    player_id INT REFERENCES players(id),   -- Foreign key linking to players table
    vote_count INT DEFAULT 0    -- Count of votes for each player, defaults to 0
);

-- Initialize votes to 0 for each player
INSERT INTO votes (player_id)
SELECT id FROM players; -- Inserts a row for each player in the votes table
