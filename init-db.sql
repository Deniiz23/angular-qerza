-- Datenbank erstellen (falls sie nicht existiert)
CREATE DATABASE qerza;

\c qerza;

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    job_type VARCHAR(50) DEFAULT 'fulltime',
    salary NUMERIC(15, 2) NULL,
    currency VARCHAR(3) DEFAULT 'EUR',
    company VARCHAR(255),
    companylogo VARCHAR(255),
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample data
INSERT INTO jobs (title, description, job_type, salary, currency, company, companylogo, location) VALUES
('Senior UX Designer', 'Erfahrener UX Designer für die Gestaltung von benutzerorientierten digitalen Produkten. Sie werden Teil eines hochmotivierten Teams sein, das innovative Lösungen entwickelt.', 'fulltime', 20000.00, 'EUR', 'Highspeed Studios', 'assets/images/companylogo/1.svg', 'London, England'),
('Intern UX Designer', 'Praktikant für das UX Design-Team gesucht. Sie werden die Grundlagen des User Experience Designs in einem professionellen Umfeld erlernen.', 'internship', 750.00, 'EUR', 'Maximoz Team', 'assets/images/companylogo/2.svg', 'Manchester, England'),
('Junior UX Designer', 'Junior UX Designer für die Unterstützung bei der Entwicklung von Benutzeroberflächen. Perfekte Position für Berufseinsteiger mit ersten Erfahrungen im Design-Bereich.', 'fulltime', 10000.00, 'EUR', 'Vvibu Leu Boz Studios', 'assets/images/companylogo/3.svg', 'Oxford, England'),
('Principal UX Designer', 'Leitender UX Designer mit umfangreicher Erfahrung in der Gestaltung komplexer digitaler Produkte und der Führung eines Design-Teams.', 'fulltime', 50000.00, 'EUR', 'Lowvoltages Team', 'assets/images/companylogo/4.svg', 'London, England'),
('Senior UX Designer', 'Erfahrener UX Designer für unser digitales Produktteam. Sie arbeiten an anspruchsvollen Projekten und bringen Ihre Expertise in den Designprozess ein.', 'freelance', 750.00, 'EUR', 'Highspeed Studios', 'assets/images/companylogo/5.svg', 'London, England'); 