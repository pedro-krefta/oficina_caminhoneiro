-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: db_logistica
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `cargas`
--

DROP TABLE IF EXISTS `cargas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cargas` (
  `codCarga` int NOT NULL AUTO_INCREMENT,
  `idMotorista` int NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `codRastreio` varchar(255) NOT NULL,
  `peso` float NOT NULL,
  `volume` float NOT NULL,
  PRIMARY KEY (`codCarga`),
  KEY `idMotorista` (`idMotorista`),
  CONSTRAINT `cargas_ibfk_1` FOREIGN KEY (`idMotorista`) REFERENCES `motoristas` (`codMotorista`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cargas`
--

LOCK TABLES `cargas` WRITE;
/*!40000 ALTER TABLE `cargas` DISABLE KEYS */;
INSERT INTO `cargas` VALUES (1,3,'Entrega de caixas','RASTREIO-001',150.5,2.5),(2,3,'Entrega de caixas','RASTREIO-002',150.5,2.5),(3,3,'Entrega de caixas','RASTREIO-003',150.5,2.5);
/*!40000 ALTER TABLE `cargas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entregas`
--

DROP TABLE IF EXISTS `entregas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entregas` (
  `codEntrega` int NOT NULL AUTO_INCREMENT,
  `idCarga` int NOT NULL,
  `destino` varchar(255) NOT NULL,
  `status` enum('ENTREGUE','TRANSITO') NOT NULL,
  `data` date NOT NULL,
  `hora` time NOT NULL,
  PRIMARY KEY (`codEntrega`),
  KEY `idCarga` (`idCarga`),
  CONSTRAINT `entregas_ibfk_1` FOREIGN KEY (`idCarga`) REFERENCES `cargas` (`codCarga`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entregas`
--

LOCK TABLES `entregas` WRITE;
/*!40000 ALTER TABLE `entregas` DISABLE KEYS */;
INSERT INTO `entregas` VALUES (1,3,'Itapema - SC','TRANSITO','2026-11-01','14:30:00'),(2,3,'balneario - SC','TRANSITO','2026-11-01','14:30:00'),(3,3,'tijucas - SC','TRANSITO','2026-11-01','14:30:00');
/*!40000 ALTER TABLE `entregas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcionario`
--

DROP TABLE IF EXISTS `funcionario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funcionario` (
  `codFuncionario` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  PRIMARY KEY (`codFuncionario`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionario`
--

LOCK TABLES `funcionario` WRITE;
/*!40000 ALTER TABLE `funcionario` DISABLE KEYS */;
INSERT INTO `funcionario` VALUES (1,'JONAS','jonas@gmail.com','U2FsdGVkX19bLBbJF7s8owrVj7uAT5l4zTi4CLzR1Ws='),(2,'Funcionario Teste','funcionario.teste@exemplo.com','U2FsdGVkX1+K/c1U9vDYWSiF1ZXifKRjKilbh/RdocU='),(3,'Funcionario Teste1','funcionario.teste@exemplo.com','U2FsdGVkX1/8q0ev5gfRpEdDZPwFTrxDLVxtc60DDV0='),(4,'Funcionario Teste2','funcionario.teste@exemplo.com','U2FsdGVkX1/qPIswzqsEMIJ/N+G0Sg8DugELuo1sCN8=');
/*!40000 ALTER TABLE `funcionario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motoristas`
--

DROP TABLE IF EXISTS `motoristas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `motoristas` (
  `codMotorista` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `cnh` varchar(255) NOT NULL,
  `cpf` varchar(255) NOT NULL,
  `telefone` varchar(255) NOT NULL,
  PRIMARY KEY (`codMotorista`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motoristas`
--

LOCK TABLES `motoristas` WRITE;
/*!40000 ALTER TABLE `motoristas` DISABLE KEYS */;
INSERT INTO `motoristas` VALUES (1,'Carlos Teste1','U2FsdGVkX18USjb6p5mkGxy/C8uWUiMX7yZDfvt+Pkw=','U2FsdGVkX1+9vYxtPXFz/8umAhecYMc+jfym0rfj1a8=','47999990000'),(2,'Carlos Teste2','U2FsdGVkX1+VfGimeLrphyDq/KI2AzCXid5Iwwm43bs=','U2FsdGVkX19JjVu3yS/A9G9cTNtT6cwdhpUUOn5+08A=','47999990000'),(3,'Carlos Teste3','U2FsdGVkX192fDt+Wouz5jZDm7JeNXK00tG/eF7bmwI=','U2FsdGVkX1/cZuH35Pa9jNkau45A5KtSxCnbah5R2t8=','47999990000');
/*!40000 ALTER TABLE `motoristas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-27  8:41:20
