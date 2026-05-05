-- CreateTable
CREATE TABLE `Persona` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `comunidad` VARCHAR(255) NOT NULL,
    `anioRegistro` INTEGER NOT NULL,
    `ultimoAnioRefrendado` INTEGER NULL,
    `figura` VARCHAR(500) NULL,
    `libro` VARCHAR(255) NULL,
    `hoja` VARCHAR(255) NULL,
    `observacion` TEXT NULL,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizadoEn` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
