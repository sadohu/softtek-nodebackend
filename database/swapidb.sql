CREATE DATABASE  IF NOT EXISTS `swapidb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `swapidb`;
-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: swapidb
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `especie`
--

DROP TABLE IF EXISTS `especie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especie` (
  `idEspecie` int NOT NULL AUTO_INCREMENT,
  `url` varchar(245) DEFAULT NULL,
  PRIMARY KEY (`idEspecie`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `navesespaciales`
--

DROP TABLE IF EXISTS `navesespaciales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `navesespaciales` (
  `idNavesEspaciales` int NOT NULL AUTO_INCREMENT,
  `url` varchar(245) DEFAULT NULL,
  PRIMARY KEY (`idNavesEspaciales`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pelicula`
--

DROP TABLE IF EXISTS `pelicula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pelicula` (
  `idPelicula` int NOT NULL AUTO_INCREMENT,
  `url` varchar(245) DEFAULT NULL,
  PRIMARY KEY (`idPelicula`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `personaje`
--

DROP TABLE IF EXISTS `personaje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personaje` (
  `idPersonaje` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(245) DEFAULT NULL,
  `altura` varchar(245) DEFAULT NULL,
  `masa` varchar(245) DEFAULT NULL,
  `colorDeCabello` varchar(245) DEFAULT NULL,
  `colorDeLaPiel` varchar(245) DEFAULT NULL,
  `colorDeOjos` varchar(245) DEFAULT NULL,
  `anoDeNacimiento` varchar(245) DEFAULT NULL,
  `genero` varchar(245) DEFAULT NULL,
  `mundoNatal` varchar(245) DEFAULT NULL,
  `creado` varchar(245) DEFAULT NULL,
  `editado` varchar(245) DEFAULT NULL,
  `url` varchar(245) DEFAULT NULL,
  PRIMARY KEY (`idPersonaje`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `personaje_especie`
--

DROP TABLE IF EXISTS `personaje_especie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personaje_especie` (
  `idPersonajeEspecie` int NOT NULL AUTO_INCREMENT,
  `idPersonaje` int DEFAULT NULL,
  `idEspecie` int DEFAULT NULL,
  PRIMARY KEY (`idPersonajeEspecie`),
  KEY `fk_personajeespecie_personaje_idx` (`idPersonaje`),
  KEY `fk_personajeespecie_especie_idx` (`idEspecie`),
  CONSTRAINT `fk_personajeespecie_especie` FOREIGN KEY (`idEspecie`) REFERENCES `especie` (`idEspecie`),
  CONSTRAINT `fk_personajeespecie_personaje` FOREIGN KEY (`idPersonaje`) REFERENCES `personaje` (`idPersonaje`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `personaje_navesespaciales`
--

DROP TABLE IF EXISTS `personaje_navesespaciales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personaje_navesespaciales` (
  `idPersonajeNavesEspaciales` int NOT NULL AUTO_INCREMENT,
  `idPersonaje` int DEFAULT NULL,
  `idNavesEspaciales` int DEFAULT NULL,
  PRIMARY KEY (`idPersonajeNavesEspaciales`),
  KEY `fk_personajenavesespaciales_personaje_idx` (`idPersonaje`),
  KEY `fk_personajenavesespaciales_navesespaciales_idx` (`idNavesEspaciales`),
  CONSTRAINT `fk_personajenavesespaciales_navesespaciales` FOREIGN KEY (`idNavesEspaciales`) REFERENCES `navesespaciales` (`idNavesEspaciales`),
  CONSTRAINT `fk_personajenavesespaciales_personaje` FOREIGN KEY (`idPersonaje`) REFERENCES `personaje` (`idPersonaje`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `personaje_pelicula`
--

DROP TABLE IF EXISTS `personaje_pelicula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personaje_pelicula` (
  `idPersonajePelicula` int NOT NULL AUTO_INCREMENT,
  `idPersonaje` int DEFAULT NULL,
  `idPelicula` int DEFAULT NULL,
  PRIMARY KEY (`idPersonajePelicula`),
  KEY `fk_personajepelicula_personaje_idx` (`idPersonaje`),
  KEY `fk_personajepelicula_pelicula_idx` (`idPelicula`),
  CONSTRAINT `fk_personajepelicula_pelicula` FOREIGN KEY (`idPelicula`) REFERENCES `pelicula` (`idPelicula`),
  CONSTRAINT `fk_personajepelicula_personaje` FOREIGN KEY (`idPersonaje`) REFERENCES `personaje` (`idPersonaje`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `personaje_vehiculo`
--

DROP TABLE IF EXISTS `personaje_vehiculo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personaje_vehiculo` (
  `idPersonajeVehiculo` int NOT NULL AUTO_INCREMENT,
  `idPersonaje` int DEFAULT NULL,
  `idVehiculo` int DEFAULT NULL,
  PRIMARY KEY (`idPersonajeVehiculo`),
  KEY `fk_personaje_personajevehiculo_idx` (`idPersonaje`),
  KEY `fk_vehiculo_personajevehiculo_idx` (`idVehiculo`),
  CONSTRAINT `fk_personaje_personajevehiculo` FOREIGN KEY (`idPersonaje`) REFERENCES `personaje` (`idPersonaje`),
  CONSTRAINT `fk_vehiculo_personajevehiculo` FOREIGN KEY (`idVehiculo`) REFERENCES `vehiculo` (`idVehiculo`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vehiculo`
--

DROP TABLE IF EXISTS `vehiculo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehiculo` (
  `idVehiculo` int NOT NULL AUTO_INCREMENT,
  `url` varchar(245) DEFAULT NULL,
  PRIMARY KEY (`idVehiculo`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping events for database 'swapidb'
--

--
-- Dumping routines for database 'swapidb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-04 17:33:47
