/*
SQLyog Ultimate v12.4.3 (64 bit)
MySQL - 10.4.32-MariaDB : Database - yuta_yuttari
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`yuta_yuttari` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `yuta_yuttari`;

/*Table structure for table `detalle-reserva` */

DROP TABLE IF EXISTS `detalle-reserva`;

CREATE TABLE `detalle-reserva` (
  `idDetalle` int(11) NOT NULL AUTO_INCREMENT,
  `reservaID` int(11) NOT NULL,
  `habitacion` varchar(50) NOT NULL,
  PRIMARY KEY (`idDetalle`),
  KEY `FK_884b38f09c089e430e317baf28e` (`reservaID`),
  CONSTRAINT `FK_884b38f09c089e430e317baf28e` FOREIGN KEY (`reservaID`) REFERENCES `reserva` (`reservaID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `detalle-reserva` */

/*Table structure for table `reserva` */

DROP TABLE IF EXISTS `reserva`;

CREATE TABLE `reserva` (
  `reservaID` int(11) NOT NULL AUTO_INCREMENT,
  `idCliente` varchar(255) NOT NULL,
  `idEmpleado` int(11) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `costo_total` decimal(10,2) NOT NULL,
  `metodo_pago` varchar(50) NOT NULL,
  `estado_pago` enum('pendiente','pagado','cancelado') NOT NULL DEFAULT 'pendiente',
  PRIMARY KEY (`reservaID`),
  KEY `FK_40d7eea262f9db7546af783c774` (`idCliente`),
  CONSTRAINT `FK_40d7eea262f9db7546af783c774` FOREIGN KEY (`idCliente`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `reserva` */

/*Table structure for table `reserva-servicio` */

DROP TABLE IF EXISTS `reserva-servicio`;

CREATE TABLE `reserva-servicio` (
  `idReservaServicio` int(11) NOT NULL AUTO_INCREMENT,
  `reservaID` int(11) NOT NULL,
  `idServicio` int(11) NOT NULL,
  PRIMARY KEY (`idReservaServicio`),
  KEY `FK_9dc34de3721c21bab28296dc0e5` (`reservaID`),
  KEY `FK_4f11a80d0d29740198718615b62` (`idServicio`),
  CONSTRAINT `FK_4f11a80d0d29740198718615b62` FOREIGN KEY (`idServicio`) REFERENCES `servicio` (`idServicio`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_9dc34de3721c21bab28296dc0e5` FOREIGN KEY (`reservaID`) REFERENCES `reserva` (`reservaID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `reserva-servicio` */

/*Table structure for table `servicio` */

DROP TABLE IF EXISTS `servicio`;

CREATE TABLE `servicio` (
  `idServicio` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(150) NOT NULL,
  PRIMARY KEY (`idServicio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `servicio` */

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `role` enum('USER','ADMIN','CLIENTE') NOT NULL DEFAULT 'USER',
  `isActive` tinyint(4) NOT NULL DEFAULT 1,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `emailVerified` tinyint(4) NOT NULL DEFAULT 0,
  `emailVerificationToken` varchar(255) DEFAULT NULL,
  `emailVerificationTokenExpires` timestamp NULL DEFAULT NULL,
  `resetPasswordToken` varchar(255) DEFAULT NULL,
  `resetPasswordExpires` timestamp NULL DEFAULT NULL,
  `avatar` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`email`,`password`,`name`,`phone`,`role`,`isActive`,`createdAt`,`updatedAt`,`emailVerified`,`emailVerificationToken`,`emailVerificationTokenExpires`,`resetPasswordToken`,`resetPasswordExpires`,`avatar`) values 
('28a0b1ce-a509-45b8-976a-38bfc9eb2273','nicomelo895@gmail.com','$2b$10$EJfXDBqMGtnPDQMgs/IuZu9o.LY8AHZ9C6INV.Zyg4Ylpl/33wOyG','Nicolas Melo','3155810487','USER',1,'2026-03-05 15:59:33.080269','2026-03-06 16:40:58.000000',0,'4a5f5313458d7a17b7c591ca99db3db7324acd836378634d6851f7ab351a963a',NULL,NULL,NULL,'/uploads/descarga-1772833258904-329883742.png');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
