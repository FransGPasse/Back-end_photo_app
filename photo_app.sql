-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Mar 10, 2022 at 07:27 PM
-- Server version: 5.7.34
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `photo_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `Album`
--

CREATE TABLE `Album` (
  `id` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `User_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Album`
--

INSERT INTO `Album` (`id`, `title`, `User_id`) VALUES
(1, 'moonpics', 4),
(2, 'Pictures of nature', 3),
(3, 'Bästa albumet', 4),
(4, 'catpixx', 5),
(5, 'Gurras bilder', 3),
(6, 'Gurras coola bilder', 3),
(7, 'catpixx 2.0', 5);

-- --------------------------------------------------------

--
-- Table structure for table `Album_Photo`
--

CREATE TABLE `Album_Photo` (
  `id` int(11) NOT NULL,
  `Photo_id` int(11) NOT NULL,
  `Album_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Album_Photo`
--

INSERT INTO `Album_Photo` (`id`, `Photo_id`, `Album_id`) VALUES
(1, 9, 3),
(2, 8, 3),
(4, 9, 1),
(5, 9, 3),
(6, 10, 2);

-- --------------------------------------------------------

--
-- Table structure for table `Photo`
--

CREATE TABLE `Photo` (
  `id` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `comment` varchar(250) DEFAULT NULL,
  `url` varchar(250) NOT NULL,
  `User_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Photo`
--

INSERT INTO `Photo` (`id`, `title`, `comment`, `url`, `User_id`) VALUES
(8, 'Månen', NULL, 'https://unsplash.com/photos/_3-60mgvPq8', 4),
(9, 'Ukraine', 'Slavia Ukrainya!', 'https://unsplash.com/photos/l8_1pRgBpsY', 4),
(10, 'Frothy sea', NULL, 'https://unsplash.com/photos/wIYLfpZfbGk', 3),
(11, 'Stuff', NULL, 'https://unsplash.com/photos/sNyRTZjtIaM', 4),
(12, 'flower', NULL, 'https://unsplash.com/photos/4iKdk29tMpU', 4);

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `id` int(11) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `firstName` varchar(250) NOT NULL,
  `lastName` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`id`, `email`, `password`, `firstName`, `lastName`) VALUES
(3, 'gurralicious@fakemail.com', '$2b$10$HLwP67buV3.HVqbDHjQO4.mqetrWnIY.Ti6jfgLkpFIfU2u1A/t9q', 'Gustaf', 'Grönlund'),
(4, 'fransfakemail@fakemail.com', '$2b$10$tMo5b3pcd.S9PMZ/NxaxDOpBRW2syJlFpV4Ch/ZtLn0PHzN0soDvu', 'Frans', 'Gustavson Påsse'),
(5, 'josefine@fakemail.com', '$2b$10$OU6R64Tg4BJDY3RYx3dGP.Stzty5XtAPLD1ygSPOxbyawixx8ngOq', 'Josefine', 'Ahlstedt'),
(6, 'hannahåki@fakemail.com', '$2b$10$6YDLkRf806qkVQxWbT9fOeMYQOLIE.XdIwJEzT7ocTiySPA8vF89y', 'Hanna', 'Håkanson'),
(7, 'frassesnr2@fakemail.com', '$2b$10$MTzj7YZQxbN5ChqowSGzUOkTDfmlwMnQJ2v1o2TickPKD0PgdqG8C', 'Fralleballe', 'Gustavson Påssé');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Album`
--
ALTER TABLE `Album`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Album_Photo`
--
ALTER TABLE `Album_Photo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Album_id` (`Album_id`),
  ADD KEY `Photo_id` (`Photo_id`) USING BTREE;

--
-- Indexes for table `Photo`
--
ALTER TABLE `Photo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Album`
--
ALTER TABLE `Album`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `Album_Photo`
--
ALTER TABLE `Album_Photo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Photo`
--
ALTER TABLE `Photo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Album_Photo`
--
ALTER TABLE `Album_Photo`
  ADD CONSTRAINT `album_photo_ibfk_1` FOREIGN KEY (`Photo_id`) REFERENCES `Photo` (`id`),
  ADD CONSTRAINT `album_photo_ibfk_2` FOREIGN KEY (`Album_id`) REFERENCES `Album` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
