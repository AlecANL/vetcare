CREATE DATABASE vetcare;
use vetcare;


CREATE TABLE Role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

INSERT INTO Role (name) VALUES ('Administrador'), ('Veterinario'), ('Recepcionista');
select * from Role;

CREATE TABLE Specie (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

INSERT INTO Specie (name) VALUES ('Perro'), ('Gato'), ('Ave'), ('Roedor'), ('Reptil'), ('Otro');
select * from Specie;

CREATE TABLE Gender (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

INSERT INTO Gender (name) VALUES ('Macho'), ('Hembra');
select * from Gender;

CREATE TABLE Reason (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

INSERT INTO Reason (name) VALUES ('Consulta General'), ('Cirugía'), ('Vacunación'), ('Emergencia'), ('Seguimiento'), ('Estética');
select * from Reason;

CREATE TABLE Status (
	id CHAR(1) PRIMARY KEY,
    name VARCHAR(50)
);


INSERT INTO Status (id, name) VALUES ('A', 'Activo'), ('I', 'Inactivo');
select * from Status;

CREATE TABLE User (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  rol_id INT NOT NULL,
  status CHAR(1) DEFAULT 'A',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (rol_id) REFERENCES Role(id),
  FOREIGN KEY (status) REFERENCES Status(id)
);

INSERT INTO User (name, email, password, rol_id) VALUES ('admin', 'admin@email.com', '1', 1);
select * from User;

CREATE TABLE Client (
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    phone VARCHAR(8),
    email VARCHAR(100),
    address VARCHAR(200)
);

CREATE TABLE Pet (
	id INTEGER PRIMARY KEY auto_increment,
    client_id INTEGER NOT NULL,
	specie_id INT NOT NULL,
	gender_id INT NOT NULL,
    name VARCHAR(100),
    breed VARCHAR(100),
    age INT NOT NULL,
    status CHAR(1),
    weight INT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES Client(id),
	FOREIGN KEY (specie_id) REFERENCES Specie(id),
	FOREIGN KEY (gender_id) REFERENCES Gender(id)
);

ALTER TABLE Pet 
MODIFY COLUMN status CHAR(1) DEFAULT 'A';

-- CREATE TABLE Veterinarian (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   name VARCHAR(100) NOT NULL,
--   specialty VARCHAR(100),
--   user_id INT,
--   FOREIGN KEY (user_id) REFERENCES User(id)
-- );

CREATE TABLE Appointment (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  hour VARCHAR(6) NOT NULL,
  comments VARCHAR(255),
  status ENUM('pendiente', 'confirmada', 'cancelada') DEFAULT 'pendiente',
  pet_id INT NOT NULL,
  veterinarian_id INT NOT NULL,
  reason_id INT NOT NULL,
  FOREIGN KEY (pet_id) REFERENCES Pet(id),
  FOREIGN KEY (veterinarian_id) REFERENCES User(id)
);
select * from Appointment;

CREATE VIEW vw_appointments AS
SELECT 
    a.id AS appointment_id,
    a.date AS appointment_date,
    a.hour AS appointment_hour,
    a.comments AS appointment_comments,
    a.status AS appointment_status,
    r.name AS reason_name,
    p.name AS pet_name,
    p.breed AS pet_breed,
    p.age AS pet_age,
    p.id AS pet_id,
    p.weight AS pet_weight,
    s.name AS specie_name,
    g.name AS gender_name,
    c.name AS client_name,
    c.phone AS client_phone,
    c.email AS client_email,
    c.id AS client_id,
    u.name AS veterinarian_name,
    u.email AS veterinarian_email
FROM Appointment a
JOIN Pet p ON a.pet_id = p.id
JOIN Client c ON p.client_id = c.id
JOIN User u ON a.veterinarian_id = u.id
JOIN Specie s ON p.specie_id = s.id
JOIN Gender g ON p.gender_id = g.id
JOIN Reason r ON a.reason_id = r.id;

-- DROP VIEW vw_appointments;
-- select * from Pet;
-- SELECT * FROM vw_appointments;

CREATE TABLE Clinical_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT NOT NULL,
  date DATE NOT NULL,
  diagnosis TEXT,
  treatment TEXT,
  comments TEXT,
  FOREIGN KEY (pet_id) REFERENCES Pet(id)
);

CREATE OR REPLACE VIEW v_clinical_history AS
SELECT 
    ch.id AS history_id,
    ch.date,
    ch.diagnosis,
    ch.treatment,
    ch.comments,
    
    p.id AS pet_id,
    p.name AS pet_name,
    p.breed,
    p.age,
    p.weight,
    p.status,
    
    s.name AS specie,
    g.name AS gender,
    
    c.id AS client_id,
    c.name AS client_name,
    c.phone AS client_phone,
    c.email AS client_email

FROM Clinical_history ch
INNER JOIN Pet p ON ch.pet_id = p.id
INNER JOIN Specie s ON p.specie_id = s.id
INNER JOIN Gender g ON p.gender_id = g.id
INNER JOIN Client c ON p.client_id = c.id;

-- SELECT *
-- FROM v_clinical_history
-- ORDER BY pet_id, date DESC;

CREATE TABLE Products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type ENUM('medicamentos', 'accesorios', 'alimentos', 'vacunas') DEFAULT 'medicamentos',
  price DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0,
  stock_min INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Stock (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  type_movement ENUM('entrada', 'salida') NOT NULL,
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  comments VARCHAR(255),
  FOREIGN KEY (product_id) REFERENCES Products(id)
);

CREATE OR REPLACE VIEW vw_inventory AS
SELECT 
  p.id,
  p.name,
  p.type,
  p.price,
  p.stock_min,
  COALESCE(SUM(CASE 
      WHEN s.type_movement = 'entrada' THEN s.quantity
      WHEN s.type_movement = 'salida' THEN -s.quantity
  END), 0) AS stock_actual
FROM Products p
LEFT JOIN Stock s ON s.product_id = p.id
GROUP BY p.id;

CREATE TABLE Receipt (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT NOT NULL,
  appointment_id INT NOT NULL,
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (client_id) REFERENCES Client(id),
  FOREIGN KEY (appointment_id) REFERENCES Appointment(id)
);

CREATE TABLE Receipt_detail (
  id INT AUTO_INCREMENT PRIMARY KEY,
  receipt_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (receipt_id) REFERENCES Receipt(id),
  FOREIGN KEY (product_id) REFERENCES Products(id)
);

CREATE VIEW vw_dashboard_stats AS
SELECT 
    -- Citas de hoy
    (SELECT COUNT(*) 
     FROM Appointment 
     WHERE DATE(date) = CURDATE()) AS appointment_today,
    
    -- Total de pacientes registrados (pets activos)
    (SELECT COUNT(*) 
     FROM Pet 
     WHERE status = 'A') AS user_registered,
    
    -- Productos bajo stock (stock actual menor a stock mínimo)
    (SELECT COUNT(*) 
     FROM vw_inventory 
     WHERE stock_actual < stock_min) AS products_no_stock,
    
    -- Ingresos del mes actual (calculado desde citas confirmadas)
    (SELECT COALESCE(COUNT(*) * 100, 0)  -- Ajusta según tu modelo de negocio
     FROM Appointment 
     WHERE MONTH(date) = MONTH(CURDATE()) 
     AND YEAR(date) = YEAR(CURDATE())
     AND status = 'confirmada') AS billing;
     

CREATE VIEW vw_incomming_appointment AS
SELECT 
    a.id,
    a.hour AS hora,
    a.status,
    p.name AS mascota,
    p.breed AS raza,
    s.name AS especie,
    c.name AS cliente,
    r.name AS motivo,
    u.name AS veterinario,
    a.date AS fecha
FROM Appointment a
INNER JOIN Pet p ON a.pet_id = p.id
INNER JOIN Client c ON p.client_id = c.id
INNER JOIN User u ON a.veterinarian_id = u.id
INNER JOIN Specie s ON p.specie_id = s.id
INNER JOIN Reason r ON a.reason_id = r.id
WHERE DATE(a.date) = CURDATE()
ORDER BY a.hour ASC;


CREATE VIEW vw_productos_alerta AS
SELECT 
    p.id,
    p.name AS nombre,
    p.type AS tipo,
    vi.stock_actual AS unidades,
    p.stock_min,
    CASE 
        WHEN vi.stock_actual < p.stock_min THEN 'bajo_stock'
        ELSE 'normal'
    END AS estado,
    -- Si tienes campo de fecha de vencimiento, agrégalo aquí
    NULL AS fecha_vencimiento
FROM Products p
INNER JOIN vw_inventory vi ON p.id = vi.id
WHERE vi.stock_actual <= p.stock_min * 1.5  -- Alerta cuando está 50% sobre el mínimo
ORDER BY vi.stock_actual ASC
LIMIT 10;

CREATE VIEW vw_receipt_full AS
SELECT 
    r.id AS receipt_id,
    r.date AS receipt_date,
    r.total AS receipt_total,

    -- CLIENTE
    c.id AS client_id,
    c.name AS client_name,
    c.phone AS client_phone,
    c.email AS client_email,
    c.address AS client_address,

    -- CITA
    a.id AS appointment_id,
    a.date AS appointment_date,
    a.hour AS appointment_hour,
    a.comments AS appointment_comments,
    a.status AS appointment_status,
    a.pet_id AS pet_id,
    a.veterinarian_id AS veterinarian_id,
    a.reason_id AS reason_id,

    -- DETALLE
    rd.id AS detail_id,
    rd.product_id,
    rd.quantity,
    rd.subtotal,

    -- PRODUCTO
    p.name AS product_name,
    p.type AS product_type,
    p.price AS product_price

FROM Receipt r
JOIN Client c ON r.client_id = c.id
JOIN Appointment a ON r.appointment_id = a.id
JOIN Receipt_detail rd ON rd.receipt_id = r.id
JOIN Products p ON rd.product_id = p.id;


-- select * from vw_dashboard_stats;


-- select * from User;