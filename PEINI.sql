-- DROP database IF EXISTS peini; --
-- Iniciar la transacción
START TRANSACTION;

-- Crear la base de datos 'peini' si no existe y cambiar al contexto de la base de datos
CREATE DATABASE IF NOT EXISTS peini
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE peini;

-- Crear la tabla 'perfiles' con los perfiles 'Admin' y 'Maestra/o'
CREATE TABLE IF NOT EXISTS perfiles (
    id_perfil TINYINT UNSIGNED AUTO_INCREMENT,
    perfil VARCHAR(20) NOT NULL,
    PRIMARY KEY (id_perfil)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insertar los perfiles de ejemplo
INSERT INTO perfiles (perfil) VALUES ('Admin'), ('Maestra/o');

-- Crear la tabla 'usuarios' con todas las especificaciones
CREATE TABLE IF NOT EXISTS usuarios (
	firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    dni INT UNSIGNED NOT NULL,
    email VARCHAR(100) NOT NULL,
    clave VARCHAR(255) NOT NULL,
    id_usuario_perfil TINYINT UNSIGNED NOT NULL,
    fotografia BLOB,
    PRIMARY KEY (dni),
    FOREIGN KEY (id_usuario_perfil) REFERENCES perfiles(id_perfil)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insertar registros de ejemplo en la tabla 'usuarios'
INSERT INTO usuarios (firstname, lastname, dni, email, clave, id_usuario_perfil, fotografia)
VALUES 
    ('Juan', 'Pérez', 11111111, 'juan@example.com', 'password123', 1, NULL),
    ('María', 'González', 22222222, 'maria@example.com', 'securepwd', 2, NULL),
    ('Pedro', 'Sánchez', 33333333, 'pedro@example.com', '1234pass', 1, NULL),
    ('Ana', 'López', 44444444, 'ana@example.com', 'p@ssw0rd', 2, NULL),
    ('Lucía', 'Martínez', 55555555, 'lucia@example.com', 'mypassword', 1, NULL);

-- Confirmar la transacción
COMMIT;

-- Mostrar mensaje de éxito
SELECT 'Base de datos y tablas creadas correctamente.';
-- ROLLBACK