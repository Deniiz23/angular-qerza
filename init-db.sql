-- Datenbank erstellen (falls sie nicht existiert)
CREATE DATABASE qerza;

\c qerza;

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    companylogo VARCHAR(255),
    salary VARCHAR(50),
    location VARCHAR(255),
    url VARCHAR(255)
);

-- Insert exact mock data
INSERT INTO jobs (title, company, companylogo, salary, location, url) VALUES
('Senior UX Designer', 'Highspeed Studios', 'assets/images/companylogo/1.svg', '$14,000 - $25,000', 'London, England', 'admin/profile'),
('Intern UX Designer', 'Maximoz Team', 'assets/images/companylogo/2.svg', '$500 - $1,000', 'Manchester, England', 'admin/profile'),
('Junior UX Designer', 'Vvibu Leu Boz Studios', 'assets/images/companylogo/3.svg', '$8,000 - $12,000', 'Oxford, England', 'admin/profile'),
('Principal UX Designer', 'Lowvoltages Team', 'assets/images/companylogo/4.svg', '$11,000 - $60,000', 'London, England', 'admin/profile'),
('Senior UX Designer', 'Highspeed Studios', 'assets/images/companylogo/5.svg', '$500 - $1,000', 'London, England', 'admin/profile');