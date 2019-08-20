-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 20, 2019 at 02:03 AM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `orders`
--

-- --------------------------------------------------------

--
-- Table structure for table `tblorders`
--

CREATE TABLE `tblorders` (
  `ID` int(11) NOT NULL,
  `CustomerEmail` varchar(255) DEFAULT NULL,
  `RestaurentID` int(11) NOT NULL,
  `OrderItem` varchar(255) NOT NULL,
  `OrderPrice` decimal(6,2) NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Updated_At` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblorders`
--

INSERT INTO `tblorders` (`ID`, `CustomerEmail`, `RestaurentID`, `OrderItem`, `OrderPrice`, `Created_At`, `Updated_At`) VALUES
(15, 'test@gmail.com', 16, 'Coke', '15.00', '2019-08-19 23:45:42', '2019-08-19 18:01:24'),
(16, 'demo@gmail.com', 18, 'Pizza', '80.00', '2019-08-19 18:01:25', '2019-08-19 18:01:25'),
(17, 'test@gmail.com', 14, 'BBQ Pizza', '14.00', '2019-08-19 18:55:43', '2019-08-19 18:55:43');

-- --------------------------------------------------------

--
-- Table structure for table `tblrestaurents`
--

CREATE TABLE `tblrestaurents` (
  `ID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Created_At` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `Updated_At` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblrestaurents`
--

INSERT INTO `tblrestaurents` (`ID`, `Name`, `Created_At`, `Updated_At`) VALUES
(14, 'Bob Evans Restaurants', '2019-08-19 19:44:23', '2019-08-19 19:44:23'),
(16, 'Applebee’s International, Inc.', '2019-08-19 19:48:08', '2019-08-19 19:48:08'),
(17, 'America Incredible Pizza Company', '2019-08-19 19:48:20', '2019-08-19 19:48:20'),
(18, 'kalash resturent', '2019-08-19 21:41:03', '2019-08-19 21:41:03'),
(20, 'A&W Restaurants', '2019-08-19 22:56:05', '2019-08-19 22:56:05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tblorders`
--
ALTER TABLE `tblorders`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tblrestaurents`
--
ALTER TABLE `tblrestaurents`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tblorders`
--
ALTER TABLE `tblorders`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `tblrestaurents`
--
ALTER TABLE `tblrestaurents`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
