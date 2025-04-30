-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 30, 2025 at 06:21 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_next`
--

-- --------------------------------------------------------

--
-- Table structure for table `adminreusable`
--

CREATE TABLE `adminreusable` (
  `id` bigint NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `agendas`
--

CREATE TABLE `agendas` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `agendas`
--

INSERT INTO `agendas` (`id`, `title`, `description`, `date`, `time`, `created_at`, `updated_at`) VALUES
(30, 'ssssssssasddsadsadsa', 'asdasdasde', '2025-04-10', '22:06:00', '2025-04-15 17:42:15', '2025-04-27 23:33:02'),
(34, 'Meeting de Abanse', 'The meeting served as a platform for team members to discuss ongoing projects, align on key objectives, and address any outstanding issues. It began with a brief overview of previous action items, followed by detailed updates from each department. Key topics included project timelines, resource allocation, and strategies for overcoming current challenges. Participants actively contributed ideas, raised concerns, and collaborated to develop actionable next steps. The meeting concluded with a clear summary of responsibilities, deadlines, and a commitment to follow up on progress during the next scheduled session. Overall, the meeting fostered communication, encouraged teamwork, and reinforced the shared goals of the organization.', '2025-04-30', '11:50:00', '2025-04-28 19:49:32', '2025-04-28 19:49:32'),
(35, 'Meeting', 'asssssssssssssss', '2025-04-16', '15:14:00', '2025-04-28 23:12:08', '2025-04-28 23:12:16');

-- --------------------------------------------------------

--
-- Table structure for table `all_tools_all_in`
--

CREATE TABLE `all_tools_all_in` (
  `id` bigint NOT NULL,
  `text` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `age` varchar(255) NOT NULL,
  `selection` varchar(255) NOT NULL,
  `datetime` datetime NOT NULL,
  `checkbox` json NOT NULL,
  `radio` varchar(255) NOT NULL,
  `file` varchar(255) NOT NULL,
  `text_area` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `all_tools_all_in`
--

INSERT INTO `all_tools_all_in` (`id`, `text`, `email`, `age`, `selection`, `datetime`, `checkbox`, `radio`, `file`, `text_area`, `created_at`, `updated_at`) VALUES
(4, 'Addadsdds', 'charmbloodwain29@gmail.com', '234', 'selection 1', '2025-04-25 10:45:00', '\"[\\\"Checkbox 1\\\"]\"', 'Radio 1', 'XjVE73AaSG.jpeg', 'ADADDSAASDASAS', '2025-04-22 18:45:41', '2025-04-22 18:45:41');

-- --------------------------------------------------------

--
-- Table structure for table `audit_logs`
--

CREATE TABLE `audit_logs` (
  `id` bigint UNSIGNED NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('unread','read') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'unread',
  `path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `audit_logs`
--

INSERT INTO `audit_logs` (`id`, `message`, `status`, `path`, `created_at`, `updated_at`) VALUES
(1, 'Ariel James De Guzmans was Blocked to Login', 'unread', '/User', '2025-03-19 18:14:42', '2025-03-19 18:14:42'),
(2, 'Ariel James De Guzmans was Allowed to Login', 'unread', '/User', '2025-03-19 18:22:19', '2025-03-19 18:22:19'),
(3, 'Ariel James De Guzmans updated their user profile', 'unread', '/User', '2025-03-19 18:23:27', '2025-03-19 18:23:27'),
(4, 'Ariel James De Guzmans updated their user profile', 'unread', '/User', '2025-03-19 18:23:44', '2025-03-19 18:23:44'),
(5, 'Pagdatingsa Dulo updated their user profile', 'unread', '/User', '2025-03-19 18:26:55', '2025-03-19 18:26:55'),
(6, 'Ariel James De Guzmans\'s permission access has been updated!', 'unread', '/User', '2025-03-19 18:28:13', '2025-03-19 18:28:13'),
(7, 'Ariel James De Guzmans\'s permission access has been updated!', 'unread', '/User', '2025-03-19 18:28:23', '2025-03-19 18:28:23'),
(8, 'Ariel James De Guzmans updated their user profile', 'unread', '/User', '2025-03-19 18:33:34', '2025-03-19 18:33:34'),
(9, 'Ariel James De Guzmans updated their user profile', 'unread', '/User', '2025-03-19 18:34:59', '2025-03-19 18:34:59'),
(10, 'Ariel James De Guzmans updated their user profile', 'unread', '/User', '2025-03-19 18:35:08', '2025-03-19 18:35:08'),
(11, 'Ariel James De Guzmans was Blocked to Login', 'unread', '/User', '2025-03-19 18:35:33', '2025-03-19 18:35:33'),
(12, 'Ariel James De Guzmans was Allowed to Login', 'unread', '/User', '2025-03-19 18:35:37', '2025-03-19 18:35:37'),
(13, 'Ariel James De Guzmans was Blocked to Login', 'unread', '/User', '2025-03-19 18:36:11', '2025-03-19 18:36:11'),
(14, 'Ariel James De Guzmans was Allowed to Login', 'unread', '/User', '2025-03-19 18:39:28', '2025-03-19 18:39:28'),
(15, 'Ariel James De Guzmans was Blocked to Login', 'unread', '/User', '2025-03-19 18:39:31', '2025-03-19 18:39:31'),
(16, 'Ariel James De Guzmans was Allowed to Login', 'unread', '/User', '2025-03-19 18:39:42', '2025-03-19 18:39:42'),
(17, 'Ariel James De Guzmans was Blocked to Login', 'unread', '/User', '2025-03-19 18:40:42', '2025-03-19 18:40:42'),
(18, 'Ariel James De Guzmans was Allowed to Login', 'unread', '/User', '2025-03-19 18:40:44', '2025-03-19 18:40:44'),
(19, 'Ariel James De Guzmans was Blocked to Login', 'unread', '/User', '2025-03-19 18:40:46', '2025-03-19 18:40:46'),
(20, 'Ariel James De Guzmans updated their user profile', 'unread', '/User', '2025-03-19 19:05:40', '2025-03-19 19:05:40'),
(21, 'Ariel James De Guzmans was Allowed to Login', 'unread', '/User', '2025-03-19 19:06:32', '2025-03-19 19:06:32'),
(22, 'Ariel James De Guzmans was Blocked to Login', 'unread', '/User', '2025-03-19 19:15:07', '2025-03-19 19:15:07'),
(23, 'Ariel James De Guzmans updated their user profile', 'unread', '/User', '2025-03-19 22:49:12', '2025-03-19 22:49:12'),
(24, 'Ariel James De Guzmans was Allowed to Login', 'unread', '/User', '2025-03-20 18:41:24', '2025-03-20 18:41:24'),
(25, 'Ariel James De Guzmans updated their user profile', 'unread', '/User', '2025-03-23 22:56:19', '2025-03-23 22:56:19'),
(26, 'Ariel James De Guzmans updated their user profile', 'unread', '/User', '2025-03-23 22:56:44', '2025-03-23 22:56:44'),
(27, 'Charmel M. De Guzman was Allowed to Login', 'unread', '/User', '2025-03-23 23:55:20', '2025-03-23 23:55:20'),
(28, 'Charmel M. De Guzman was Blocked to Login', 'unread', '/User', '2025-03-23 23:55:24', '2025-03-23 23:55:24'),
(29, 'Ariel James De Guzmans updated their user profile', 'unread', '/User', '2025-03-26 16:50:29', '2025-03-26 16:50:29'),
(30, 'Ariel James De Guzmans updated their user profile', 'unread', '/User', '2025-03-26 16:51:57', '2025-03-26 16:51:57'),
(31, 'Ariel James De Guzmans updated their user profile', 'unread', '/User', '2025-03-26 16:52:35', '2025-03-26 16:52:35'),
(32, 'Ariel James De Guzmans was Blocked to Login', 'unread', '/User', '2025-03-26 16:53:22', '2025-03-26 16:53:22'),
(33, 'Ariel James De Guzmans updated their user profile', 'unread', '/User', '2025-03-26 16:54:36', '2025-03-26 16:54:36'),
(34, 'Ariel James De Guzmans was Allowed to Login', 'unread', '/User', '2025-03-26 16:55:00', '2025-03-26 16:55:00'),
(35, 'Ariel James De Guzmans updated their user profile', 'unread', '/User', '2025-03-26 16:55:02', '2025-03-26 16:55:02'),
(36, 'Ariel James De Guzmans updated their user profile', 'unread', '/User', '2025-03-26 23:27:58', '2025-03-26 23:27:58'),
(37, 'Ariel James De Guzmans updated their user profile', 'unread', '/User', '2025-03-26 23:29:29', '2025-03-26 23:29:29'),
(38, 'Ariel James De Guzmans updated their user profile', 'unread', '/User', '2025-03-26 23:30:31', '2025-03-26 23:30:31'),
(39, 'Ariel James De Guzmans updated their user profile', 'unread', '/User', '2025-03-26 23:31:39', '2025-03-26 23:31:39'),
(40, 'Ariel James De Guzmans updated their user profile', 'unread', '/User', '2025-03-26 23:32:53', '2025-03-26 23:32:53'),
(41, 'Ariel James De Guzmans updated their user profile', 'unread', '/User', '2025-03-27 00:05:44', '2025-03-27 00:05:44'),
(42, 'Ariel James De Guzmans updated their user profile', 'unread', '/User', '2025-03-27 00:08:19', '2025-03-27 00:08:19'),
(43, 'Sisidlanng Bunga was Blocked to Login', 'unread', '/User', '2025-03-27 16:42:12', '2025-03-27 16:42:12'),
(44, 'Sisidlanng Bunga was Allowed to Login', 'unread', '/User', '2025-03-27 16:42:14', '2025-03-27 16:42:14'),
(45, 'Kambal Kambal updated their user profile', 'unread', '/User', '2025-03-27 16:42:25', '2025-03-27 16:42:25'),
(46, 'Ariel James Aljecera De Guzman updated their user profile', 'unread', '/Profile', '2025-03-27 19:18:53', '2025-03-27 19:18:53'),
(47, 'Ariel James Aljecera De Guzman updated their user profile', 'unread', '/Profile', '2025-03-27 19:19:03', '2025-03-27 19:19:03'),
(48, 'Ariel James Aljecera De Guzman updated their user profile', 'unread', '/Profile', '2025-03-27 19:19:08', '2025-03-27 19:19:08'),
(49, 'Ariel James Aljecera De Guzman updated their user profile', 'unread', '/Profile', '2025-03-27 19:19:11', '2025-03-27 19:19:11'),
(50, 'Ariel James Aljecera De Guzman updated their user profile', 'unread', '/Profile', '2025-03-27 19:19:59', '2025-03-27 19:19:59'),
(51, 'Ariel James De Guzmans updated their user profile', 'unread', '/Profile', '2025-03-27 19:45:49', '2025-03-27 19:45:49'),
(52, 'Allan Capio was Blocked to Login', 'unread', '/User', '2025-03-27 20:57:17', '2025-03-27 20:57:17'),
(53, 'Allan Capio was Allowed to Login', 'unread', '/User', '2025-03-27 20:57:19', '2025-03-27 20:57:19'),
(54, 'Kambal Kambal\'s permission access has been updated!', 'unread', '/User', '2025-03-27 21:48:51', '2025-03-27 21:48:51'),
(55, 'Kambal Kambal updated their user profile', 'unread', '/User', '2025-03-27 21:49:04', '2025-03-27 21:49:04'),
(56, 'Kambal Kambal updated their user profile', 'unread', '/User', '2025-03-27 21:49:07', '2025-03-27 21:49:07'),
(57, 'Kambal Kambal was Allowed to Login', 'unread', '/User', '2025-03-27 21:49:10', '2025-03-27 21:49:10'),
(58, 'Kambal Kambal was Blocked to Login', 'unread', '/User', '2025-03-27 21:49:11', '2025-03-27 21:49:11'),
(59, 'Ariel James Aljecera De Guzman updated their user profile', 'unread', '/Profile', '2025-03-27 22:05:03', '2025-03-27 22:05:03'),
(60, 'New admin registered: Sampong Utos', 'unread', '/Profile', '2025-03-27 22:05:54', '2025-03-27 22:05:54'),
(61, 'Allan Capio was Blocked to Login', 'unread', '/User', '2025-03-27 22:06:11', '2025-03-27 22:06:11'),
(62, 'Allan Capio updated their user profile', 'unread', '/User', '2025-03-27 22:06:18', '2025-03-27 22:06:18'),
(63, 'Allan Capios updated their user profile', 'unread', '/User', '2025-03-27 22:06:45', '2025-03-27 22:06:45'),
(64, 'Sisidlanng Bunga\'s account was deleted!', 'unread', '/User', '2025-03-27 22:06:53', '2025-03-27 22:06:53'),
(65, 'Charmel M. De Guzman\'s permission access has been updated!', 'unread', '/User', '2025-03-27 23:33:19', '2025-03-27 23:33:19'),
(66, 'Maria Charisma Castillo was Allowed to Login', 'unread', '/User', '2025-03-28 00:32:39', '2025-03-28 00:32:39'),
(67, 'Maria Charisma Castillo\'s permission access has been updated!', 'unread', '/User', '2025-03-28 00:33:04', '2025-03-28 00:33:04'),
(68, 'Ariel James De Guzmans\'s permission access has been updated!', 'unread', '/User', '2025-04-01 16:45:57', '2025-04-01 16:45:57'),
(69, 'Ariel James De Guzmans updated their user profile', 'unread', '/User', '2025-04-01 16:46:55', '2025-04-01 16:46:55'),
(70, 'Charmel M. De Guzman was Allowed to Login', 'unread', '/User', '2025-04-01 17:08:41', '2025-04-01 17:08:41'),
(71, 'Charmel M. De Guzman was Blocked to Login', 'unread', '/User', '2025-04-01 17:08:43', '2025-04-01 17:08:43'),
(72, 'Allan Capios updated their user profile', 'unread', '/User', '2025-04-01 21:57:02', '2025-04-01 21:57:02'),
(73, 'Ariel James Aljecera De Guzman updated their user profile', 'unread', '/Profile', '2025-04-09 16:37:54', '2025-04-09 16:37:54'),
(74, 'Ariel James De Guzmans\'s permission access has been updated!', 'unread', '/User', '2025-04-09 16:39:51', '2025-04-09 16:39:51'),
(75, 'Allan Capios\'s permission access has been updated!', 'unread', '/User', '2025-04-09 16:40:53', '2025-04-09 16:40:53'),
(76, 'Allan Capios was Allowed to Login', 'unread', '/User', '2025-04-09 16:41:19', '2025-04-09 16:41:19'),
(77, 'Allan Capios was Blocked to Login', 'unread', '/User', '2025-04-09 16:41:20', '2025-04-09 16:41:20'),
(78, 'Allan Capios was Allowed to Login', 'unread', '/User', '2025-04-09 16:41:21', '2025-04-09 16:41:21'),
(79, 'Allan Capios was Blocked to Login', 'unread', '/User', '2025-04-09 16:41:26', '2025-04-09 16:41:26'),
(80, 'Allan Capios was Allowed to Login', 'unread', '/User', '2025-04-09 16:41:28', '2025-04-09 16:41:28'),
(81, 'asefedsasdasss\'s account was deleted!', 'unread', '/User', '2025-04-09 16:52:24', '2025-04-09 16:52:24'),
(82, 'asefedsasdass\'s account was deleted!', 'unread', '/User', '2025-04-09 16:53:10', '2025-04-09 16:53:10'),
(83, 'Ariel James De Guzmans\'s permission access has been updated!', 'unread', '/User', '2025-04-10 00:43:20', '2025-04-10 00:43:20'),
(84, 'Ariel James De Guzmans\'s permission access has been updated!', 'unread', '/User', '2025-04-10 00:44:35', '2025-04-10 00:44:35'),
(85, 'Ariel James Aljecera De Guzman updated their user profile', 'unread', '/Profile', '2025-04-10 19:12:28', '2025-04-10 19:12:28'),
(86, 'Allan Capios updated their user profile', 'unread', '/User', '2025-04-13 18:20:00', '2025-04-13 18:20:00'),
(87, 'Allan Capios updated their user profile', 'unread', '/User', '2025-04-13 18:20:14', '2025-04-13 18:20:14'),
(88, 'Charmel M. De Guzman updated their user profile', 'unread', '/User', '2025-04-13 18:20:35', '2025-04-13 18:20:35'),
(89, 'Allan Capio updated their user profile', 'unread', '/User', '2025-04-22 18:47:44', '2025-04-22 18:47:44'),
(90, 'Charmel M. De Guzman updated their user profile', 'unread', '/User', '2025-04-22 18:47:55', '2025-04-22 18:47:55'),
(91, 'Allan Capio\'s permission access has been updated!', 'unread', '/User', '2025-04-22 18:48:17', '2025-04-22 18:48:17'),
(92, 'Allan Capio updated their user profile', 'unread', '/User', '2025-04-22 18:48:32', '2025-04-22 18:48:32'),
(93, 'Allan Capio\'s permission access has been updated!', 'unread', '/User', '2025-04-22 18:51:32', '2025-04-22 18:51:32'),
(94, 'Ariel James De Guzmans\'s permission access has been updated!', 'unread', '/User', '2025-04-22 18:52:07', '2025-04-22 18:52:07'),
(95, 'Ariel James De Guzman updated their user profile', 'unread', '/Profile', '2025-04-22 18:52:35', '2025-04-22 18:52:35'),
(96, 'Ariel James De Guzman updated their user profile', 'unread', '/Profile', '2025-04-22 18:52:51', '2025-04-22 18:52:51'),
(97, 'Allan Capio updated their user profile', 'unread', '/User', '2025-04-28 18:42:46', '2025-04-28 18:42:46'),
(98, 'Charmel M. De Guzman updated their user profile', 'unread', '/User', '2025-04-28 18:43:16', '2025-04-28 18:43:16'),
(99, 'Ariel James Aljecera De Guzman updated their user profile', 'unread', '/Profile', '2025-04-28 19:09:37', '2025-04-28 19:09:37'),
(100, 'Ariel James Aljecera De Guzman updated their user profile', 'unread', '/Profile', '2025-04-28 19:12:28', '2025-04-28 19:12:28'),
(101, 'Ariel James Aljecera De Guzman updated their user profile', 'unread', '/Profile', '2025-04-28 19:12:40', '2025-04-28 19:12:40'),
(102, 'Ariel James Aljecera De Guzman updated their user profile', 'unread', '/Profile', '2025-04-28 19:12:58', '2025-04-28 19:12:58'),
(103, 'Ariel James Aljecera De Guzmans updated their user profile', 'unread', '/Profile', '2025-04-28 19:13:17', '2025-04-28 19:13:17'),
(104, 'Allan Capio was Blocked to Login', 'unread', '/User', '2025-04-28 19:14:15', '2025-04-28 19:14:15'),
(105, 'Allan Capio was Allowed to Login', 'unread', '/User', '2025-04-28 19:14:17', '2025-04-28 19:14:17'),
(106, 'Allan Capio updated their user profile', 'unread', '/User', '2025-04-28 19:14:30', '2025-04-28 19:14:30'),
(107, 'Ariel James De Guzman\'s permission access has been updated!', 'unread', '/User', '2025-04-28 19:15:12', '2025-04-28 19:15:12'),
(108, 'Ariel James De Guzman\'s permission access has been updated!', 'unread', '/User', '2025-04-28 19:15:23', '2025-04-28 19:15:23'),
(109, 'Ariel James Aljecera De Guzman updated their user profile', 'unread', '/Profile', '2025-04-28 20:55:53', '2025-04-28 20:55:53'),
(110, 'Ariel James De Guzman\'s permission access has been updated!', 'unread', '/User', '2025-04-28 23:42:21', '2025-04-28 23:42:21'),
(111, 'Ariel James De Guzman\'s permission access has been updated!', 'unread', '/User', '2025-04-28 23:43:05', '2025-04-28 23:43:05'),
(112, 'Ariel Jamess Aljecera De Guzman updated their user profile', 'unread', '/Profile', '2025-04-28 23:43:50', '2025-04-28 23:43:50'),
(113, 'Ariel Jamess Aljecera De Guzman updated their user profile', 'unread', '/Profile', '2025-04-29 01:27:43', '2025-04-29 01:27:43');

-- --------------------------------------------------------

--
-- Table structure for table `checkbox_options`
--

CREATE TABLE `checkbox_options` (
  `id` bigint NOT NULL,
  `checkbox_options` json NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `checkbox_options`
--

INSERT INTO `checkbox_options` (`id`, `checkbox_options`, `created_at`, `updated_at`) VALUES
(1, '\"[\\\"Checkbox 1\\\",\\\"Checkbox 5\\\",\\\"Checkbox 9\\\",\\\"Checkbox 11\\\"]\"', '2025-04-29 21:42:06', '2025-04-29 21:42:06');

-- --------------------------------------------------------

--
-- Table structure for table `checks_table`
--

CREATE TABLE `checks_table` (
  `id` bigint NOT NULL,
  `asdaasd` json NOT NULL,
  `file` varchar(123) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `checks_table`
--

INSERT INTO `checks_table` (`id`, `asdaasd`, `file`, `created_at`, `updated_at`) VALUES
(1, '\"[\\\"sads\\\",\\\"sdasd\\\",\\\"sadasd\\\",\\\"sdasd\\\"]\"', 'K0pj6oJs1b.jpg', '2025-04-29 18:59:33', '2025-04-29 21:28:13'),
(2, '\"[\\\"sdasd\\\",\\\"sadasd\\\",\\\"sdasd\\\"]\"', 'eM2HSfWEQp.jpeg', '2025-04-29 19:04:16', '2025-04-29 19:04:16'),
(3, '\"[\\\"dsadsa\\\"]\"', 'cLrqpvhYdu.jpeg', '2025-04-29 19:34:08', '2025-04-29 19:34:08');

-- --------------------------------------------------------

--
-- Table structure for table `check_table`
--

CREATE TABLE `check_table` (
  `id` bigint NOT NULL,
  `checkbox` json NOT NULL,
  `text` varchar(123) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `check_table`
--

INSERT INTO `check_table` (`id`, `checkbox`, `text`, `created_at`, `updated_at`) VALUES
(1, '\"[\\\"sadasd\\\",\\\"asdas\\\",\\\"dasd\\\"]\"', 'adasdasdas', '2025-04-29 18:27:29', '2025-04-29 18:27:29');

-- --------------------------------------------------------

--
-- Table structure for table `color_table`
--

CREATE TABLE `color_table` (
  `id` bigint UNSIGNED NOT NULL,
  `color` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `color_table`
--

INSERT INTO `color_table` (`id`, `color`, `status`, `created_at`, `updated_at`) VALUES
(1, 'hsl(192, 100%, 50%)', 'inactive', '2025-03-26 17:03:50', '2025-04-29 16:34:13'),
(4, 'hsl(107, 100%, 23%)', 'inactive', '2025-03-26 17:36:59', '2025-04-29 16:34:13'),
(5, 'hsl(292, 100%, 50%)', 'inactive', '2025-03-26 17:43:39', '2025-04-29 16:34:13'),
(6, 'hsl(200, 100%, 50%)', 'inactive', '2025-03-26 17:43:52', '2025-04-29 16:34:13'),
(30, 'purple', 'inactive', '2025-03-27 18:44:09', '2025-04-29 16:34:13'),
(35, 'gold', 'inactive', '2025-03-27 18:52:49', '2025-04-29 16:34:13'),
(37, 'lightcoral', 'inactive', '2025-03-27 18:53:14', '2025-04-29 16:34:13'),
(45, 'violet', 'inactive', '2025-03-27 22:08:40', '2025-04-29 16:34:13'),
(46, 'lightblue', 'inactive', '2025-04-01 16:54:09', '2025-04-29 16:34:13'),
(47, 'hsl(131, 100%, 50%)', 'inactive', '2025-04-22 18:44:26', '2025-04-29 16:34:13'),
(48, 'beige', 'inactive', '2025-04-28 22:27:26', '2025-04-29 16:34:13'),
(49, 'white', 'active', '2025-04-28 22:27:45', '2025-04-29 16:34:03'),
(50, 'cyan', 'inactive', '2025-04-28 23:30:21', '2025-04-29 16:34:13');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `forms`
--

CREATE TABLE `forms` (
  `id` bigint UNSIGNED NOT NULL,
  `fields` json NOT NULL,
  `tableName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'disabled',
  `backend` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'undone',
  `count` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `forms`
--

INSERT INTO `forms` (`id`, `fields`, `tableName`, `status`, `backend`, `count`, `created_at`, `updated_at`) VALUES
(152, '[{\"id\": \"1\", \"fields\": [{\"id\": \"101\", \"type\": \"text\", \"label\": \"Text\", \"length\": \"255\", \"datatype\": \"VARCHAR\", \"required\": true, \"columnName\": \"text\", \"placeholder\": \"Enter text\"}, {\"id\": \"201\", \"type\": \"email\", \"label\": \"Email\", \"length\": \"255\", \"datatype\": \"VARCHAR\", \"required\": true, \"columnName\": \"email\", \"placeholder\": \"Enter email\"}, {\"id\": \"303\", \"type\": \"number\", \"label\": \"Age\", \"length\": \"255\", \"datatype\": \"VARCHAR\", \"required\": false, \"columnName\": \"age\", \"placeholder\": \"Enter age\"}, {\"id\": \"401\", \"type\": \"select\", \"label\": \"Selection\", \"length\": \"255\", \"options\": [\"selection 1\", \"selection 2\", \"selection 3\"], \"datatype\": \"VARCHAR\", \"required\": false, \"columnName\": \"selection\"}, {\"id\": \"502\", \"type\": \"datetime\", \"label\": \"DateTime\", \"datatype\": \"DATETIME\", \"required\": false, \"columnName\": \"datetime\", \"placeholder\": \"Select date and time\"}, {\"id\": \"600\", \"type\": \"checkbox\", \"label\": \"Checkbox\", \"length\": null, \"options\": [\"Checkbox 1\", \"Checkbox 2\", \"Checkbox 3\"], \"datatype\": \"JSON\", \"required\": false, \"columnName\": \"checkbox\"}, {\"id\": \"700\", \"type\": \"radio\", \"label\": \"Radio\", \"length\": \"255\", \"options\": [\"Radio 1\", \"Radio 2\", \"Radio 3\"], \"datatype\": \"VARCHAR\", \"required\": false, \"columnName\": \"radio\"}, {\"id\": \"900\", \"type\": \"file\", \"label\": \"File Upload\", \"length\": \"255\", \"datatype\": \"VARCHAR\", \"required\": false, \"columnName\": \"file\"}, {\"id\": \"1000\", \"type\": \"textarea\", \"label\": \"Text Area\", \"length\": \"255\", \"datatype\": \"VARCHAR\", \"required\": false, \"columnName\": \"text_area\", \"placeholder\": \"Enter text here\"}]}]', 'all_tools_all_in', 'disabled', 'done', 12, '2025-03-25 22:10:47', '2025-04-28 22:27:01'),
(156, '[{\"id\": \"1\", \"fields\": [{\"id\": \"101\", \"type\": \"text\", \"label\": \"Fullname\", \"length\": \"255\", \"datatype\": \"VARCHAR\", \"required\": true, \"columnName\": \"fullname\", \"placeholder\": \"Enter text\"}, {\"id\": \"900\", \"type\": \"file\", \"label\": \"Profile Picture\", \"length\": \"255\", \"datatype\": \"VARCHAR\", \"required\": false, \"columnName\": \"file\"}]}]', 'profile', 'disabled', 'done', 6, '2025-03-25 23:45:11', '2025-03-27 16:55:55'),
(158, '[{\"id\": \"1\", \"fields\": [{\"id\": \"100\", \"type\": \"text\", \"label\": \"Full Name\", \"length\": \"255\", \"datatype\": \"VARCHAR\", \"required\": true, \"columnName\": \"full_name\", \"placeholder\": \"Enter text\"}, {\"id\": \"300\", \"type\": \"number\", \"label\": \"Your Age\", \"length\": \"255\", \"datatype\": \"VARCHAR\", \"required\": false, \"columnName\": \"your_age\", \"placeholder\": \"Enter age\"}]}]', 'mikmik', 'disabled', 'done', 5, '2025-03-27 01:41:18', '2025-04-28 23:26:10'),
(171, '[{\"id\": \"1\", \"fields\": [{\"id\": \"100\", \"type\": \"text\", \"label\": \"Full Name\", \"length\": \"255\", \"datatype\": \"VARCHAR\", \"required\": true, \"columnName\": \"full_name\", \"placeholder\": \"Enter text\"}]}]', 'adminreusable', 'disabled', 'done', 2, '2025-04-27 23:35:23', '2025-04-28 23:25:06'),
(172, '[{\"id\": \"1\", \"fields\": [{\"id\": \"100\", \"type\": \"text\", \"label\": \"Full Name\", \"length\": \"255\", \"datatype\": \"VARCHAR\", \"required\": true, \"columnName\": \"full_name\", \"placeholder\": \"Enter text\"}, {\"id\": \"200\", \"type\": \"email\", \"label\": \"Email\", \"length\": \"255\", \"datatype\": \"VARCHAR\", \"required\": true, \"columnName\": \"email\", \"placeholder\": \"Enter email\"}, {\"id\": \"300\", \"type\": \"number\", \"label\": \"Age\", \"length\": \"255\", \"datatype\": \"VARCHAR\", \"required\": false, \"columnName\": \"age\", \"placeholder\": \"Enter age\"}, {\"id\": \"400\", \"type\": \"select\", \"label\": \"Favorite Food\", \"length\": \"255\", \"options\": [\"Adobo\", \"Menudo\", \"Tinola\"], \"datatype\": \"VARCHAR\", \"required\": false, \"columnName\": \"favorite_food\"}, {\"id\": \"500\", \"type\": \"datetime\", \"label\": \"Birth Date\", \"length\": \"255\", \"datatype\": \"DATETIME\", \"required\": false, \"columnName\": \"birth_date\", \"placeholder\": \"Select date and time\"}, {\"id\": \"600\", \"type\": \"checkbox\", \"label\": \"Gender\", \"length\": \"255\", \"options\": [\"Male\", \"Female\"], \"datatype\": \"JSON\", \"required\": false, \"columnName\": \"gender\"}, {\"id\": \"700\", \"type\": \"radio\", \"label\": \"Favorite Color\", \"length\": \"255\", \"options\": [\"Red\", \"Green\", \"Blue\"], \"datatype\": \"VARCHAR\", \"required\": false, \"columnName\": \"favorite_color\"}, {\"id\": \"900\", \"type\": \"file\", \"label\": \"Profile Image\", \"length\": \"255\", \"datatype\": \"VARCHAR\", \"required\": false, \"columnName\": \"file\"}, {\"id\": \"1000\", \"type\": \"textarea\", \"label\": \"Describe Yourself\", \"length\": \"255\", \"datatype\": \"VARCHAR\", \"required\": false, \"columnName\": \"describe_yourself\", \"placeholder\": \"Enter text here\"}]}]', 'testalltools', 'disabled', 'done', 5, '2025-04-28 22:26:39', '2025-04-29 17:50:13'),
(174, '[{\"id\": \"1\", \"fields\": [{\"id\": \"100\", \"type\": \"text\", \"label\": \"asd\", \"length\": \"123\", \"datatype\": \"VARCHAR\", \"required\": true, \"columnName\": \"asd\", \"placeholder\": \"Enter text\"}]}, {\"id\": \"2\", \"fields\": [{\"id\": \"101\", \"type\": \"text\", \"label\": \"sadsdda\", \"length\": \"123\", \"datatype\": \"VARCHAR\", \"required\": true, \"columnName\": \"sadsdda\", \"placeholder\": \"Enter text\"}, {\"id\": \"102\", \"type\": \"text\", \"label\": \"sasdad\", \"length\": \"123\", \"datatype\": \"VARCHAR\", \"required\": true, \"columnName\": \"sasdad\", \"placeholder\": \"Enter text\"}]}]', 'input_longer', 'disabled', 'done', 1, '2025-04-29 16:35:41', '2025-04-29 17:24:09'),
(175, '[{\"id\": \"1\", \"fields\": [{\"id\": \"100\", \"type\": \"text\", \"label\": \"Text\", \"length\": \"123\", \"datatype\": \"VARCHAR\", \"required\": true, \"columnName\": \"text\", \"placeholder\": \"Enter text\"}]}, {\"id\": \"2\", \"fields\": [{\"id\": \"200\", \"type\": \"email\", \"label\": \"Email\", \"length\": \"123\", \"datatype\": \"VARCHAR\", \"required\": true, \"columnName\": \"email\", \"placeholder\": \"Enter email\"}]}, {\"id\": \"3\", \"fields\": [{\"id\": \"300\", \"type\": \"number\", \"label\": \"Age\", \"length\": \"233\", \"datatype\": \"VARCHAR\", \"required\": false, \"columnName\": \"age\", \"placeholder\": \"Enter age\"}]}, {\"id\": \"4\", \"fields\": [{\"id\": \"500\", \"type\": \"datetime\", \"label\": \"DateTime\", \"datatype\": \"DATETIME\", \"required\": false, \"columnName\": \"datetime\", \"placeholder\": \"Select date and time\"}]}, {\"id\": \"5\", \"fields\": [{\"id\": \"900\", \"type\": \"file\", \"label\": \"File Upload\", \"length\": \"123\", \"datatype\": \"VARCHAR\", \"required\": false, \"columnName\": \"file\"}]}, {\"id\": \"6\", \"fields\": [{\"id\": \"1000\", \"type\": \"textarea\", \"label\": \"Text Area\", \"length\": \"123\", \"datatype\": \"VARCHAR\", \"required\": false, \"columnName\": \"text_area\", \"placeholder\": \"Enter text here\"}]}]', 'longer', 'disabled', 'done', 1, '2025-04-29 17:19:36', '2025-04-29 17:24:26'),
(177, '[{\"id\": \"1\", \"fields\": [{\"id\": \"100\", \"type\": \"text\", \"label\": \"Text\", \"length\": \"123\", \"datatype\": \"VARCHAR\", \"required\": true, \"columnName\": \"text\", \"placeholder\": \"Enter text\"}, {\"id\": \"200\", \"type\": \"email\", \"label\": \"Email\", \"length\": \"123\", \"datatype\": \"VARCHAR\", \"required\": true, \"columnName\": \"email\", \"placeholder\": \"Enter email\"}]}, {\"id\": \"2\", \"fields\": [{\"id\": \"500\", \"type\": \"datetime\", \"label\": \"Birth Date\", \"datatype\": \"DATETIME\", \"required\": false, \"columnName\": \"birth_date\", \"placeholder\": \"Select date and time\"}]}, {\"id\": \"3\", \"fields\": [{\"id\": \"900\", \"type\": \"file\", \"label\": \"Profile Picture\", \"length\": \"123\", \"datatype\": \"VARCHAR\", \"required\": false, \"columnName\": \"file\"}]}, {\"id\": \"4\", \"fields\": [{\"id\": \"1000\", \"type\": \"textarea\", \"label\": \"Text Area\", \"length\": \"123\", \"datatype\": \"VARCHAR\", \"required\": false, \"columnName\": \"text_area\", \"placeholder\": \"Enter text here\"}]}, {\"id\": \"5\", \"fields\": [{\"id\": \"400\", \"type\": \"select\", \"label\": \"Gender\", \"length\": \"123\", \"options\": [\"Male\", \"Female\", \"Other\"], \"datatype\": \"VARCHAR\", \"required\": false, \"columnName\": \"gender\"}]}]', 'table_longer', 'disabled', 'done', 1, '2025-04-29 17:28:36', '2025-04-29 17:41:17'),
(179, '[{\"id\": \"1\", \"fields\": [{\"id\": \"700\", \"type\": \"radio\", \"label\": \"Radio\", \"length\": \"123\", \"options\": [\"Red\", \"Green\", \"Blue\", \"wddasdsas\", \"dasdsadasdsa\", \"dasdsa\", \"sdasdsadsadsadas\"], \"datatype\": \"VARCHAR\", \"required\": false, \"columnName\": \"radio\"}]}]', 'radio_try', 'disabled', 'done', 1, '2025-04-29 17:42:04', '2025-04-29 17:42:30'),
(181, '[{\"id\": \"1\", \"fields\": [{\"id\": \"600\", \"type\": \"checkbox\", \"label\": \"Checkbox\", \"length\": \"123\", \"options\": [\"sdsds\", \"asdasd\", \"asdasd\", \"sadasd\", \"asdas\", \"dasd\", \"sad\", \"das\", \"ad\", \"sadasdasdsa\", \"asdasd\", \"dsadsadasd\", \"asdsadsa\", \"adasdasd\", \"dasdsadasd\"], \"datatype\": \"JSON\", \"required\": false, \"columnName\": \"checkbox\"}, {\"id\": \"100\", \"type\": \"text\", \"label\": \"Text\", \"length\": \"123\", \"datatype\": \"VARCHAR\", \"required\": true, \"columnName\": \"text\", \"placeholder\": \"Enter text\"}]}]', 'check_table', 'disabled', 'done', 1, '2025-04-29 18:23:25', '2025-04-29 18:55:55'),
(182, '[{\"id\": \"1\", \"fields\": [{\"id\": \"601\", \"type\": \"checkbox\", \"label\": \"sadasdasdas\", \"options\": [\"sdadsa\", \"dsadsa\", \"dsadsa\", \"asdasdas\", \"dasdasd\", \"sadasd\"], \"datatype\": \"JSON\", \"required\": false, \"columnName\": \"sadasdasdas\"}, {\"id\": \"900\", \"type\": \"file\", \"label\": \"Profile Picture\", \"length\": \"123\", \"datatype\": \"VARCHAR\", \"required\": false, \"columnName\": \"file\"}]}]', 'check_file', 'disabled', 'undone', 0, '2025-04-29 18:55:41', '2025-04-29 18:55:41'),
(184, '[{\"id\": \"1\", \"fields\": [{\"id\": \"600\", \"type\": \"checkbox\", \"label\": \"asdaasd\", \"options\": [\"sads\", \"sdasd\", \"dsadsa\", \"adsadsa\", \"sadasd\", \"sdasd\"], \"datatype\": \"JSON\", \"required\": false, \"columnName\": \"asdaasd\"}, {\"id\": \"900\", \"type\": \"file\", \"label\": \"Profile Picture\", \"length\": \"123\", \"datatype\": \"VARCHAR\", \"required\": false, \"columnName\": \"file\"}]}]', 'checks_table', 'enabled', 'done', 2, '2025-04-29 18:59:06', '2025-04-29 21:43:05'),
(185, '[{\"id\": \"1\", \"fields\": [{\"id\": \"601\", \"type\": \"checkbox\", \"label\": \"Checkbox Options\", \"options\": [\"Checkbox 1\", \"Checkbox 2\", \"Checkbox 3\", \"Checkbox 4\", \"Checkbox 5\", \"Checkbox 6\", \"Checkbox 7\", \"Checkbox 8\", \"Checkbox 9\", \"Checkbox 10\", \"Checkbox 11\", \"Checkbox 12\"], \"datatype\": \"JSON\", \"required\": false, \"columnName\": \"checkbox_options\"}]}]', 'checkbox_options', 'disabled', 'done', 1, '2025-04-29 21:41:26', '2025-04-29 21:43:05');

-- --------------------------------------------------------

--
-- Table structure for table `galleries`
--

CREATE TABLE `galleries` (
  `id` bigint UNSIGNED NOT NULL,
  `gallery_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `images` json NOT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `galleries`
--

INSERT INTO `galleries` (`id`, `gallery_name`, `images`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Gallery 1', '[\"/Carousel/680899162a7bd.jpeg\", \"/Carousel/680738ff9c5af.jpeg\", \"/Carousel/680738ff9c093.jpeg\", \"/Carousel/680736f171a49.jpeg\", \"/Carousel/68084e5871b9c.jpeg\"]', '0', '2025-04-21 22:28:01', '2025-04-28 23:41:22'),
(2, 'Gallery 2', '[\"/Carousel/68074322906a8.jpeg\", \"/Carousel/680743228fd35.jpeg\", \"/Carousel/68074322908cc.jpeg\", \"/Carousel/680743318173a.jpeg\", \"/Carousel/681045fe4802b.png\", \"/Carousel/681045fe483cf.jpeg\"]', '0', '2025-04-21 22:45:02', '2025-04-28 19:22:38'),
(6, 'Astig na Gallery', '[\"/Carousel/68108285a3de8.jpg\", \"/Carousel/68108285a2bdf.jpg\", \"/Carousel/68108285a2fbb.png\", \"/Carousel/68108285a32f8.jpg\", \"/Carousel/68108285a360e.png\", \"/Carousel/68108285a3ab3.jpg\"]', '1', '2025-04-28 23:40:53', '2025-04-28 23:41:22');

-- --------------------------------------------------------

--
-- Table structure for table `input_longer`
--

CREATE TABLE `input_longer` (
  `id` bigint NOT NULL,
  `asd` varchar(123) NOT NULL,
  `sadsdda` varchar(123) NOT NULL,
  `sasdad` varchar(123) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `longer`
--

CREATE TABLE `longer` (
  `id` bigint NOT NULL,
  `text` varchar(123) NOT NULL,
  `email` varchar(123) NOT NULL,
  `age` varchar(233) NOT NULL,
  `datetime` datetime NOT NULL,
  `file` varchar(123) NOT NULL,
  `text_area` varchar(123) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2025_02_25_022027_create_notifications_table', 2),
(6, '2025_03_03_055149_create_forms_table', 3),
(7, '2025_03_20_011500_create_audit_logs_table', 4),
(8, '2025_03_20_011522_create_audit_logs_table', 5),
(9, '2025_03_27_004004_create_color_table', 6),
(10, '2025_04_03_001546_create_google_tokens_table', 7),
(11, '2025_04_03_022351_create_google_users_table', 8),
(12, '2025_04_03_025901_create_sent_emails_table', 9),
(13, '2025_04_15_030452_create_agendas_table', 10),
(14, '2025_04_22_011430_create_testimonials_table', 11),
(15, '2025_04_22_062406_create_galleries_table', 12);

-- --------------------------------------------------------

--
-- Table structure for table `mikmik`
--

CREATE TABLE `mikmik` (
  `id` bigint NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `your_age` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mikmik`
--

INSERT INTO `mikmik` (`id`, `full_name`, `your_age`, `created_at`, `updated_at`) VALUES
(1, 'adaasdsadasdsadas', '34', '2025-04-28 23:26:02', '2025-04-28 23:26:06');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint UNSIGNED NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('unread','read') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'unread',
  `path` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `message`, `status`, `path`, `created_at`, `updated_at`) VALUES
(1, 'Ariel James De Guzman logged in.', 'read', '', '2025-02-25 03:57:00', '2025-02-25 00:24:27'),
(2, 'Ariel James De Guzman logged in.', 'read', '', '2025-02-25 04:00:09', '2025-02-24 23:48:02'),
(3, 'Ariel James De Guzman was Blocked to Login', 'read', '', '2025-02-25 05:08:14', '2025-02-25 00:02:33'),
(4, 'Sisidlanng Bunga was Allowed to Login', 'read', '', '2025-02-25 05:08:43', '2025-02-25 00:02:33'),
(5, 'Ariel James De Guzman logged in.', 'read', '', '2025-02-25 05:09:17', '2025-02-24 23:47:58'),
(6, 'Ariel James De Guzman was Allowed to Login', 'read', '', '2025-02-25 05:09:24', '2025-03-07 00:36:07'),
(7, 'Charmel M. De Guzman was Allowed to Login', 'read', '', '2025-02-25 05:09:32', '2025-03-07 00:36:09'),
(8, 'Ariel James De Guzman logged in.', 'read', '', '2025-02-25 05:09:42', '2025-02-24 23:47:56'),
(9, 'Ariel James De Guzman updated their user profile', 'read', '', '2025-02-25 06:53:24', '2025-02-24 23:48:24'),
(10, 'Ariel James De Guzman updated their user profile', 'read', '', '2025-02-25 06:53:42', '2025-02-24 23:48:23'),
(11, 'Ariel James Aljecera De Guzman logged in.', 'read', '', '2025-02-25 06:57:46', '2025-02-24 23:48:22'),
(12, 'Ariel James De Guzman updated their user profile', 'read', '', '2025-02-25 07:48:51', '2025-02-25 00:02:40'),
(13, 'Ariel James De Guzman updated their user profile', 'read', '', '2025-02-25 07:49:10', '2025-02-24 23:54:52'),
(14, 'Ariel James De Guzman updated their user profile', 'read', '', '2025-02-25 08:03:19', '2025-02-25 00:20:02'),
(15, 'Ariel James De Guzman updated their user profile', 'read', '', '2025-02-25 08:28:27', '2025-02-25 05:53:15'),
(16, 'Ariel James De Guzman updated their user profile', 'read', '', '2025-02-25 13:49:00', '2025-02-25 05:53:20'),
(17, 'Ariel James De Guzman updated their user profile', 'read', '', '2025-02-25 13:49:00', '2025-02-25 05:53:21'),
(18, 'Ariel James Aljecera De Guzman updated their user profile', 'read', '', '2025-02-25 13:51:10', '2025-02-25 05:53:19'),
(19, 'Ariel James Aljecera De Guzman updated their user profile', 'read', '', '2025-02-25 13:51:32', '2025-02-25 05:53:18'),
(20, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-25 13:52:09', '2025-02-25 05:53:12'),
(21, 'Ariel James Aljecera De Guzman logged in.', 'read', '', '2025-02-25 14:02:16', '2025-02-25 18:00:58'),
(22, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 00:33:48', '2025-02-25 18:00:58'),
(23, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 00:36:04', '2025-02-25 18:00:58'),
(24, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 00:36:23', '2025-02-25 18:00:58'),
(25, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 00:37:00', '2025-02-25 18:00:58'),
(26, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 00:38:54', '2025-02-25 18:00:58'),
(27, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 00:40:27', '2025-02-25 18:00:58'),
(28, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 00:41:34', '2025-02-25 18:00:58'),
(29, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 00:42:19', '2025-02-25 18:00:58'),
(30, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 00:43:24', '2025-02-25 18:00:58'),
(31, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 00:43:39', '2025-02-25 18:00:58'),
(32, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 00:44:16', '2025-02-25 18:00:58'),
(33, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 00:44:36', '2025-02-25 18:00:58'),
(34, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 00:49:09', '2025-02-25 18:00:58'),
(35, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 00:49:21', '2025-02-25 18:00:58'),
(36, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 00:50:02', '2025-02-25 18:00:58'),
(37, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 00:50:20', '2025-02-25 18:00:58'),
(38, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 00:51:54', '2025-02-25 18:00:58'),
(39, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 00:52:07', '2025-02-25 18:00:58'),
(40, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 00:57:09', '2025-02-25 18:00:58'),
(41, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 00:58:11', '2025-02-25 18:00:58'),
(42, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 00:58:42', '2025-02-25 18:00:58'),
(43, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 00:58:59', '2025-02-25 18:00:58'),
(44, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:01:53', '2025-02-25 18:00:58'),
(45, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:05:02', '2025-02-25 18:00:58'),
(46, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:06:37', '2025-02-25 18:00:58'),
(47, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:08:57', '2025-02-25 18:00:58'),
(48, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:13:08', '2025-02-25 18:00:58'),
(49, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:13:43', '2025-02-25 18:00:58'),
(50, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:15:40', '2025-02-25 18:00:58'),
(51, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:24:26', '2025-02-25 18:00:58'),
(52, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:26:12', '2025-02-25 18:00:58'),
(53, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:26:36', '2025-02-25 18:00:58'),
(54, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:28:05', '2025-02-25 18:00:58'),
(55, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:29:17', '2025-02-25 18:00:58'),
(56, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:30:34', '2025-02-25 18:00:58'),
(57, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:31:08', '2025-02-25 18:00:58'),
(58, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:32:15', '2025-02-25 18:00:58'),
(59, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:32:34', '2025-02-25 18:00:58'),
(60, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:32:57', '2025-02-25 18:00:58'),
(61, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:33:10', '2025-02-25 18:00:58'),
(62, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:33:24', '2025-02-25 18:00:58'),
(63, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:33:33', '2025-02-25 18:00:58'),
(64, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:33:47', '2025-02-25 18:00:58'),
(65, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:36:27', '2025-02-25 18:00:58'),
(66, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:36:33', '2025-02-25 18:00:58'),
(67, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:36:53', '2025-02-25 18:00:58'),
(68, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:37:51', '2025-02-25 18:00:58'),
(69, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:42:21', '2025-02-25 18:00:58'),
(70, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:42:27', '2025-02-25 18:00:58'),
(71, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:42:56', '2025-02-25 18:00:58'),
(72, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:44:50', '2025-02-25 18:00:58'),
(73, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:45:24', '2025-02-25 18:00:58'),
(74, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:46:58', '2025-02-25 18:00:58'),
(75, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:56:39', '2025-02-25 18:00:58'),
(76, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:57:03', '2025-02-25 18:00:58'),
(77, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:57:18', '2025-02-25 18:00:58'),
(78, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:57:29', '2025-02-25 18:00:58'),
(79, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:57:38', '2025-02-25 18:00:58'),
(80, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 01:57:55', '2025-02-25 18:00:58'),
(81, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:08:41', '2025-02-25 19:30:36'),
(82, 'Ariel James Pogi De Guzman was Blocked to Login', 'read', '', '2025-02-26 02:13:26', '2025-02-25 19:30:36'),
(83, 'Charmel M. De Guzman was Blocked to Login', 'read', '', '2025-02-26 02:13:39', '2025-02-25 19:30:36'),
(84, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:14:06', '2025-02-25 19:30:36'),
(85, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:19:26', '2025-02-25 19:30:36'),
(86, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:21:15', '2025-02-25 19:30:36'),
(87, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:21:22', '2025-02-25 19:30:36'),
(88, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:24:08', '2025-02-25 19:30:36'),
(89, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:24:33', '2025-02-25 19:30:36'),
(90, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:25:00', '2025-02-25 19:30:36'),
(91, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:27:04', '2025-02-25 19:30:36'),
(92, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:27:27', '2025-02-25 19:30:36'),
(93, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:27:34', '2025-02-25 19:30:36'),
(94, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:29:34', '2025-02-25 19:30:36'),
(95, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:32:19', '2025-02-25 19:30:36'),
(96, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:33:24', '2025-02-25 19:30:36'),
(97, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:36:26', '2025-02-25 19:30:36'),
(98, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:37:21', '2025-02-25 19:30:36'),
(99, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:37:37', '2025-02-25 19:30:36'),
(100, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:37:56', '2025-02-25 19:30:36'),
(101, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:38:01', '2025-02-25 19:30:36'),
(102, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:38:19', '2025-02-25 19:30:36'),
(103, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:38:33', '2025-02-25 19:30:36'),
(104, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:39:27', '2025-02-25 19:30:36'),
(105, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:41:07', '2025-02-25 19:30:36'),
(106, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:42:29', '2025-02-25 19:30:36'),
(107, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:46:00', '2025-02-25 19:30:36'),
(108, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:46:33', '2025-02-25 19:30:36'),
(109, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:46:49', '2025-02-25 19:30:36'),
(110, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:47:02', '2025-02-25 19:30:36'),
(111, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:47:11', '2025-02-25 19:30:36'),
(112, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:49:01', '2025-02-25 19:30:36'),
(113, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:49:13', '2025-02-25 19:30:36'),
(114, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:49:31', '2025-02-25 19:30:36'),
(115, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:52:16', '2025-02-25 19:30:36'),
(116, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:52:24', '2025-02-25 19:30:36'),
(117, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:52:36', '2025-02-25 19:30:36'),
(118, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 02:56:20', '2025-02-25 19:30:36'),
(119, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 03:01:59', '2025-02-25 19:30:36'),
(120, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 03:04:24', '2025-02-25 19:30:36'),
(121, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 03:08:21', '2025-02-25 19:30:36'),
(122, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 03:09:39', '2025-02-25 19:30:36'),
(123, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 03:10:14', '2025-02-25 19:30:36'),
(124, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 03:13:00', '2025-02-25 19:30:36'),
(125, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 03:21:10', '2025-02-25 19:30:36'),
(126, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 03:21:54', '2025-02-25 19:30:36'),
(127, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 03:30:29', '2025-02-25 19:30:36'),
(128, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 03:30:44', '2025-02-25 19:31:07'),
(129, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 03:30:49', '2025-02-25 19:30:59'),
(130, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 03:30:55', '2025-02-25 19:31:06'),
(131, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 03:33:14', '2025-02-25 21:31:28'),
(132, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 03:42:52', '2025-02-25 21:31:28'),
(133, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 05:13:03', '2025-02-25 21:31:28'),
(134, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 05:17:35', '2025-02-25 21:31:28'),
(135, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 05:23:36', '2025-02-25 21:31:28'),
(136, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 05:27:12', '2025-02-25 21:31:28'),
(137, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 05:29:58', '2025-02-25 21:31:28'),
(138, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 05:30:32', '2025-02-25 21:31:28'),
(139, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 05:31:15', '2025-02-25 21:31:28'),
(140, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 05:31:32', '2025-02-25 21:35:03'),
(141, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 05:34:29', '2025-02-25 21:35:03'),
(142, 'Charmel M. De Guzman updated their user profile', 'read', '', '2025-02-26 05:34:48', '2025-02-25 21:35:02'),
(143, 'Ariel James Aljecera De Guzman updated their user profile', 'read', '', '2025-02-26 05:35:12', '2025-02-25 22:03:41'),
(144, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 05:43:02', '2025-02-25 22:03:40'),
(145, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 06:04:03', '2025-02-25 23:00:17'),
(146, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 06:18:21', '2025-02-25 23:00:17'),
(147, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 06:18:38', '2025-02-25 23:00:17'),
(148, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 06:18:51', '2025-02-25 23:00:17'),
(149, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 06:25:45', '2025-02-25 23:00:16'),
(150, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 06:36:06', '2025-02-25 23:00:14'),
(151, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 07:13:49', '2025-02-25 23:40:15'),
(152, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 07:25:57', '2025-02-25 23:40:38'),
(153, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 07:27:40', '2025-02-25 23:40:38'),
(154, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 07:30:21', '2025-02-25 23:40:38'),
(155, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 07:32:28', '2025-02-25 23:40:38'),
(156, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 07:34:51', '2025-02-25 23:40:38'),
(157, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 07:34:58', '2025-02-25 23:40:13'),
(158, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 07:36:12', '2025-02-25 23:40:12'),
(159, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 08:22:12', '2025-02-26 07:32:16'),
(160, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 08:22:18', '2025-02-26 07:32:16'),
(161, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 08:22:39', '2025-02-26 07:32:16'),
(162, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 08:26:45', '2025-02-26 07:32:16'),
(163, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 08:29:42', '2025-02-26 07:32:16'),
(164, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 08:30:47', '2025-02-26 07:32:16'),
(165, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 08:33:00', '2025-02-26 07:32:16'),
(166, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 08:34:47', '2025-02-26 07:32:16'),
(167, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 08:44:23', '2025-02-26 07:32:16'),
(168, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 08:47:13', '2025-02-26 07:32:16'),
(169, 'Ariel James Aljecera De Guzman updated their user profile', 'read', '', '2025-02-26 08:51:30', '2025-02-26 07:32:16'),
(170, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 14:25:24', '2025-02-26 07:32:16'),
(171, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 14:25:56', '2025-02-26 07:32:16'),
(172, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 14:31:12', '2025-02-26 07:32:16'),
(173, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 14:31:19', '2025-02-26 07:32:16'),
(174, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 14:35:02', '2025-02-26 07:32:16'),
(175, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 14:35:57', '2025-02-26 07:32:16'),
(176, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 14:36:01', '2025-02-26 07:32:16'),
(177, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 14:36:23', '2025-02-26 07:32:16'),
(178, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 14:36:33', '2025-02-26 07:32:16'),
(179, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 14:38:20', '2025-02-26 07:32:16'),
(180, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 14:38:32', '2025-02-26 07:32:16'),
(181, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 14:38:43', '2025-02-26 07:32:16'),
(182, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 14:39:37', '2025-02-26 07:32:16'),
(183, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 14:40:35', '2025-02-26 07:32:16'),
(184, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 14:40:40', '2025-02-26 07:32:16'),
(185, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 14:40:43', '2025-02-26 07:32:16'),
(186, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 14:40:59', '2025-02-26 07:32:16'),
(187, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 14:41:08', '2025-02-26 07:32:16'),
(188, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 14:42:25', '2025-02-26 07:32:16'),
(189, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 14:47:36', '2025-02-26 07:32:16'),
(190, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 14:49:10', '2025-02-26 07:32:16'),
(191, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 14:52:06', '2025-02-26 07:32:16'),
(192, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 14:53:04', '2025-02-26 07:32:16'),
(193, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 14:55:28', '2025-02-26 07:32:16'),
(194, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 14:58:02', '2025-02-26 07:32:16'),
(195, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 15:01:20', '2025-02-26 07:32:16'),
(196, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 15:01:34', '2025-02-26 07:32:16'),
(197, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 15:05:37', '2025-02-26 07:32:16'),
(198, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 15:06:40', '2025-02-26 07:32:16'),
(199, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 15:06:51', '2025-02-26 07:32:16'),
(200, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 15:06:56', '2025-02-26 07:32:16'),
(201, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 15:07:01', '2025-02-26 07:32:16'),
(202, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 15:09:46', '2025-02-26 07:32:16'),
(203, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 15:12:16', '2025-02-26 07:32:16'),
(204, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 15:16:37', '2025-02-26 07:32:16'),
(205, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 15:18:04', '2025-02-26 07:32:16'),
(206, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 15:18:43', '2025-02-26 07:32:16'),
(207, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 15:25:40', '2025-02-26 07:32:16'),
(208, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 15:25:46', '2025-02-26 07:32:16'),
(209, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 15:26:37', '2025-02-26 07:32:16'),
(210, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 15:32:41', '2025-02-26 16:06:20'),
(211, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 15:32:46', '2025-02-26 16:06:20'),
(212, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 15:32:50', '2025-02-26 16:06:20'),
(213, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 15:33:08', '2025-02-26 16:06:20'),
(214, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 15:33:57', '2025-02-26 16:06:20'),
(215, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 15:34:24', '2025-02-26 16:06:20'),
(216, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 15:34:49', '2025-02-26 16:06:20'),
(217, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 15:35:29', '2025-02-26 16:06:20'),
(218, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 15:35:47', '2025-02-26 16:06:20'),
(219, 'Ariel James Pogi De Guzman was Allowed to Login', 'read', '', '2025-02-26 15:36:23', '2025-02-26 16:06:20'),
(220, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 15:37:59', '2025-02-26 16:06:20'),
(221, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 15:38:04', '2025-02-26 16:06:20'),
(222, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 16:34:55', '2025-02-26 16:06:20'),
(223, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 16:35:06', '2025-02-26 16:06:20'),
(224, 'Ariel James Pogi De Guzman was Blocked to Login', 'read', '', '2025-02-26 16:35:57', '2025-02-26 16:06:20'),
(225, 'Ariel James Pogi De Guzman was Blocked to Login', 'read', '', '2025-02-26 16:36:00', '2025-02-26 16:06:20'),
(226, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 16:36:07', '2025-02-26 16:06:20'),
(227, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 16:36:28', '2025-02-26 16:06:20'),
(228, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 16:37:09', '2025-02-26 16:06:20'),
(229, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 16:38:24', '2025-02-26 16:06:20'),
(230, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 16:38:36', '2025-02-26 16:06:20'),
(231, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 16:39:10', '2025-02-26 16:06:20'),
(232, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 16:39:14', '2025-02-26 16:06:20'),
(233, 'Ariel James Pogi De Guzman updated their user profile', 'read', '', '2025-02-26 17:16:19', '2025-02-26 16:06:20'),
(234, 'Ariel James Pogi De Guzman updated their user profile', 'read', NULL, '2025-02-26 17:20:28', '2025-02-26 16:06:20'),
(235, 'Ariel James Pogi De Guzman updated their user profile', 'read', '/Users', '2025-02-26 17:27:08', '2025-02-26 16:06:20'),
(236, 'Ariel James Pogi De Guzman updated their user profile', 'read', '/Users', '2025-02-26 17:43:56', '2025-02-26 16:06:20'),
(237, 'Ariel James Pogi De Guzman updated their user profile', 'read', '/Users', '2025-02-26 17:58:03', '2025-02-26 16:06:20'),
(238, 'Ariel James Pogi De Guzman updated their user profile', 'read', '/User', '2025-02-26 18:00:31', '2025-02-26 10:33:18'),
(239, 'Ariel James Pogi De Guzman updated their user profile', 'read', '/User', '2025-02-26 18:00:39', '2025-02-26 10:33:18'),
(240, 'Ariel James Pogi De Guzman updated their user profile', 'read', '/User', '2025-02-26 18:01:13', '2025-02-26 10:33:18'),
(241, 'Ariel James A. De Guzman updated their user profile', 'read', '/Profile', '2025-02-26 18:04:41', '2025-02-26 10:33:48'),
(242, 'Ariel James A. De Guzman updated their user profile', 'read', '/Profile', '2025-02-26 18:06:28', '2025-02-26 10:33:48'),
(243, 'Ariel James Aljecera De Guzman updated their user profile', 'read', '/Profile', '2025-02-26 18:06:36', '2025-02-26 10:33:48'),
(244, 'Ariel James Aljecera De Guzman updated their user profile', 'read', '/Profile', '2025-02-26 18:14:35', '2025-02-26 10:33:48'),
(245, 'Ariel James Aljecera De Guzman updated their user profile', 'read', '/Profile', '2025-02-26 18:23:17', '2025-02-26 10:33:48'),
(246, 'Ariel James Pogi De Guzman updated their user profile', 'read', '/User', '2025-02-26 18:33:56', '2025-02-26 10:34:05'),
(247, 'Ariel James Pogi De Guzman updated their user profile', 'read', '/User', '2025-02-26 18:33:59', '2025-02-26 10:34:05'),
(248, 'Ariel James Pogi De Guzman updated their user profile', 'read', '/User', '2025-02-26 18:34:26', '2025-02-26 10:34:29'),
(249, 'Ariel James Pogi De Guzman updated their user profile', 'read', '/User', '2025-02-26 18:35:01', '2025-02-26 10:35:07'),
(250, 'Ariel James Aljecera De Guzman updated their user profile', 'read', '/Profile', '2025-02-26 18:35:27', '2025-02-26 10:35:35'),
(251, 'Ariel James Aljecera De Guzman updated their user profile', 'read', '/Profile', '2025-02-26 22:55:07', '2025-02-26 14:55:22'),
(252, 'Ariel James Aljecera De Guzman updated their user profile', 'read', '/Profile', '2025-02-26 22:55:38', '2025-02-26 14:55:59'),
(253, 'Ariel James Aljecera De Guzman updated their user profile', 'read', '/Profile', '2025-02-27 00:03:19', '2025-02-26 16:03:31'),
(254, 'Ariel James Pogi De Guzman updated their user profile', 'read', '/User', '2025-02-27 00:03:39', '2025-02-26 16:04:54'),
(255, 'Ariel James Pogi De Guzman updated their user profile', 'read', '/User', '2025-02-27 00:04:06', '2025-02-26 16:04:54'),
(256, 'Ariel James Aljecera De Guzman updated their user profile', 'read', '/Profile', '2025-02-27 00:05:00', '2025-02-26 16:06:20'),
(257, 'Ariel James Aljecera De Guzman updated their user profile', 'read', '/Profile', '2025-02-27 00:16:07', '2025-02-26 16:16:34'),
(258, 'Ariel James Aljecera De Guzman updated their user profile', 'read', '/Profile', '2025-02-27 00:18:47', '2025-02-26 16:33:58'),
(259, 'Ariel James Aljecera De Guzman updated their user profile', 'read', '/Profile', '2025-02-27 00:34:05', '2025-02-26 16:34:16'),
(260, 'Ariel James Aljecera De Guzman updated their user profile', 'read', '/Profile', '2025-02-27 00:34:28', '2025-02-26 16:34:40'),
(261, 'Ariel James Aljecera De Guzman logged in.', 'read', NULL, '2025-02-27 00:56:02', '2025-02-26 19:13:32'),
(262, 'Ariel James Pogi De Guzman updated their user profile', 'read', '/User', '2025-02-27 03:08:20', '2025-02-26 19:12:28'),
(263, 'Ariel James Pogi De Guzman updated their user profile', 'read', '/User', '2025-02-27 03:12:41', '2025-02-26 19:13:35'),
(264, 'Ariel James Pogi De Guzman updated their user profile', 'read', '/User', '2025-02-27 03:12:48', '2025-02-26 19:13:35'),
(265, 'Ariel James Aljecera De Guzman updated their user profile', 'read', '/Profile', '2025-02-27 05:28:21', '2025-02-26 21:29:42'),
(266, 'Ariel James Aljecera De Guzman updated their user profile', 'read', '/Profile', '2025-02-27 05:31:32', '2025-02-26 21:31:42'),
(267, 'Ariel James Pogi De Guzman updated their user profile', 'read', '/User', '2025-02-27 05:32:01', '2025-02-26 22:10:16'),
(268, 'Ariel James Pogi De Guzman logged in.', 'read', NULL, '2025-02-27 08:21:04', '2025-02-27 23:18:19'),
(269, 'Ariel James Aljecera De Guzman logged in.', 'read', NULL, '2025-02-27 08:47:12', '2025-02-27 23:18:19'),
(270, 'Ariel James Aljecera De Guzman logged in.', 'read', NULL, '2025-02-27 14:49:06', '2025-02-27 23:18:19'),
(271, 'Ariel James Pogi De Guzman logged in.', 'read', NULL, '2025-02-27 14:51:57', '2025-02-27 23:18:19'),
(272, 'Ariel James Aljecera De Guzman logged in.', 'read', NULL, '2025-02-27 14:52:16', '2025-02-27 23:18:19'),
(273, 'Ariel James Pogi De Guzman updated their user profile', 'read', '/User', '2025-02-28 00:04:38', '2025-02-27 16:05:42'),
(274, 'Ariel James Pogi De Guzman updated their user profile', 'read', '/User', '2025-02-28 00:04:50', '2025-02-27 16:05:42'),
(275, 'Ariel James Pogi De Guzman updated their user profile', 'read', '/User', '2025-02-28 01:25:26', '2025-02-27 17:26:18'),
(276, 'Charmel M. De Guzman updated their user profile', 'read', '/User', '2025-02-28 01:25:40', '2025-02-27 17:26:18'),
(277, 'Ariel James Pogi De Guzman updated their user profile', 'read', '/User', '2025-02-28 02:13:00', '2025-02-27 18:24:41'),
(278, 'Ariel James Pogi De Guzman updated their user profile', 'read', '/User', '2025-02-28 02:13:26', '2025-02-27 18:24:41'),
(279, 'Ariel James Pogi De Guzman was Blocked to Login', 'read', '/User', '2025-02-28 02:35:06', '2025-02-27 18:35:24'),
(280, 'Ariel James Pogi De Guzman was Allowed to Login', 'read', '/User', '2025-02-28 02:35:13', '2025-02-27 18:35:24'),
(281, 'Ariel James Pogi De Guzman was Blocked to Login', 'read', '/User', '2025-02-28 02:35:17', '2025-02-27 18:35:24'),
(282, 'Ariel James Pogi De Guzman was Allowed to Login', 'read', '/User', '2025-02-28 02:35:18', '2025-02-27 18:35:24'),
(283, 'Ariel James Pogi De Guzman was Blocked to Login', 'read', '/User', '2025-02-28 02:35:20', '2025-02-27 18:35:24'),
(284, 'Ariel James Aljecera De Guzman updated their user profile', 'read', '/Profile', '2025-02-28 08:49:41', '2025-02-28 00:49:55'),
(285, 'Ariel James Pogi De Guzman updated their user profile', 'read', '/User', '2025-02-28 08:54:44', '2025-02-28 00:59:48'),
(286, 'Ariel James Pogi De Guzman updated their user profile', 'read', '/User', '2025-02-28 09:00:15', '2025-02-28 01:00:31'),
(287, 'Charmel M. De Guzman updated their user profile', 'read', '/User', '2025-02-28 09:00:43', '2025-02-28 01:00:57'),
(288, 'Ariel James Pogi De Guzman updated their user profile', 'read', '/User', '2025-03-02 15:46:10', '2025-03-02 07:51:54'),
(289, 'Charmel M. De Guzman updated their user profile', 'read', '/User', '2025-03-02 15:47:37', '2025-03-02 07:51:54'),
(290, 'Charmel M. De Guzman was Allowed to Login', 'read', '/User', '2025-03-02 15:51:06', '2025-03-02 07:51:54'),
(291, 'Charmel M. De Guzman was Blocked to Login', 'read', '/User', '2025-03-02 15:51:09', '2025-03-02 07:51:54'),
(292, 'Charmel M. De Guzman was Allowed to Login', 'read', '/User', '2025-03-02 15:51:12', '2025-03-02 07:51:54'),
(293, 'Ariel James Aljecera De Guzman updated their user profile', 'read', '/Profile', '2025-03-02 15:52:26', '2025-03-02 07:52:56'),
(294, 'Ariel James Aljecera De Guzman updated their user profile', 'read', '/Profile', '2025-03-02 15:52:43', '2025-03-02 07:52:56'),
(295, 'Ariel James Pogi De Guzman was Allowed to Login', 'read', '/User', '2025-03-03 01:22:38', '2025-03-02 17:22:46'),
(296, 'Ariel James Pogi De Guzman was Blocked to Login', 'read', '/User', '2025-03-03 01:22:41', '2025-03-02 17:22:46'),
(297, 'Ariel James Pogi De Guzman updated their user profile', 'read', '/User', '2025-03-03 03:19:24', '2025-03-02 19:19:37'),
(298, 'Ariel James Pogi De Guzman updated their user profile', 'read', '/User', '2025-03-03 06:27:43', '2025-03-02 22:27:49'),
(299, 'Ariel James Pogi De Guzman updated their user profile', 'read', '/User', '2025-03-03 09:04:29', '2025-03-03 05:53:07'),
(300, 'Allan Capio updated their user profile', 'read', '/User', '2025-03-03 09:04:39', '2025-03-03 05:53:07'),
(301, 'Ariel James Pogi De Guzman logged in.', 'read', NULL, '2025-03-04 00:09:04', '2025-03-03 19:27:11'),
(302, 'Ariel James Pogi De Guzman was Allowed to Login', 'read', '/User', '2025-03-04 00:09:14', '2025-03-03 16:18:19'),
(303, 'Ariel James Pogi De Guzman logged in.', 'read', NULL, '2025-03-04 00:09:19', '2025-03-03 19:27:11'),
(304, 'Ariel James Pogi De Guzman logged in.', 'read', NULL, '2025-03-04 00:11:25', '2025-03-03 19:27:21'),
(305, 'Ariel James Pogi De Guzman updated their user profile', 'read', '/User', '2025-03-04 01:17:23', '2025-03-03 19:27:19'),
(306, 'Ariel James Pogi De Guzman was Blocked to Login', 'read', '/User', '2025-03-04 08:10:05', '2025-03-04 00:10:13'),
(307, 'Ariel James Pogi De Guzman was Allowed to Login', 'read', '/User', '2025-03-04 08:10:10', '2025-03-04 00:10:13'),
(308, 'Ariel James Aljecera De Guzman logged in.', 'read', NULL, '2025-03-05 03:24:58', '2025-03-04 19:25:27'),
(309, 'Charmel M. De Guzman updated their user profile', 'read', '/User', '2025-03-05 13:25:56', '2025-03-05 05:26:01'),
(310, 'Ariel James Pogi De Guzman updated their user profile', 'read', '/User', '2025-03-05 13:26:21', '2025-03-05 05:26:46'),
(311, 'Ariel James Aljecera De Guzman logged in.', 'read', NULL, '2025-03-06 00:05:45', '2025-03-05 16:28:39'),
(312, 'Ariel James Pogi De Guzman logged in.', 'read', NULL, '2025-03-06 00:05:48', '2025-03-05 16:28:38'),
(313, 'Ariel James Aljecera De Guzman logged in.', 'read', NULL, '2025-03-06 06:09:24', '2025-03-06 19:18:21'),
(314, 'Ariel James Aljecera De Guzman logged in.', 'read', NULL, '2025-03-06 13:47:00', '2025-03-06 19:18:21'),
(315, 'Ariel James Aljecera De Guzman logged in.', 'read', NULL, '2025-03-06 13:59:05', '2025-03-06 19:18:21'),
(316, 'Ariel James Pogi De Guzman updated their user profile', 'read', '/User', '2025-03-06 14:34:09', '2025-03-06 06:34:16'),
(317, 'Ariel James Pogi De Guzman logged in.', 'read', NULL, '2025-03-06 14:42:21', '2025-03-06 19:18:21'),
(318, 'Ariel James Pogi De Guzman logged in.', 'read', NULL, '2025-03-06 23:57:14', '2025-03-06 19:18:21'),
(319, 'Ariel James Aljecera De Guzman logged in.', 'read', NULL, '2025-03-06 23:57:21', '2025-03-06 19:18:21'),
(320, 'New user registered: Allan C. Capio', 'read', NULL, '2025-03-07 08:31:04', '2025-03-07 00:36:00'),
(321, 'Allan C. Capio logged in.', 'read', NULL, '2025-03-07 08:31:16', '2025-03-07 00:36:00'),
(322, 'Ariel James Aljecera De Guzman logged in.', 'read', NULL, '2025-03-07 08:31:38', '2025-03-07 00:36:00'),
(323, 'Allan C. Capio was Allowed to Login', 'read', '/User', '2025-03-07 08:31:54', '2025-03-07 00:36:00'),
(324, 'Allan C. Capio logged in.', 'read', NULL, '2025-03-07 08:32:20', '2025-03-07 00:36:00'),
(325, 'Allan C. Capio logged in.', 'read', NULL, '2025-03-07 08:32:47', '2025-03-07 00:36:00'),
(326, 'Allan C. Capio updated their user profile', 'read', '/Profile', '2025-03-07 08:33:22', '2025-03-07 00:34:13'),
(327, 'Allan C. Capio updated their user profile', 'read', '/Profile', '2025-03-07 08:33:32', '2025-03-07 00:34:13'),
(328, 'Ariel James Aljecera De Guzman logged in.', 'read', NULL, '2025-03-07 08:33:54', '2025-03-07 00:36:00'),
(329, 'Allan C. Capio logged in.', 'read', NULL, '2025-03-07 08:34:49', '2025-03-07 00:36:00'),
(330, 'Ariel James Aljecera De Guzman logged in.', 'read', NULL, '2025-03-07 08:35:33', '2025-03-07 00:36:00'),
(331, 'Ariel James Aljecera De Guzman updated their user profile', 'read', '/Profile', '2025-03-08 15:00:41', '2025-03-08 07:01:10'),
(332, 'Ariel James Aljecera De Guzman updated their user profile', 'read', '/Profile', '2025-03-08 15:01:03', '2025-03-08 07:01:10'),
(333, 'Ariel James Pogi De Guzman updated their user profile', 'read', '/User', '2025-03-10 08:22:46', '2025-03-10 00:34:11'),
(334, 'Ariel James Pogi De Guzman logged in.', 'read', NULL, '2025-03-12 05:40:47', '2025-03-11 21:44:33'),
(335, 'Ariel James Pogi De Guzman logged in.', 'read', NULL, '2025-03-12 05:59:10', '2025-03-12 16:14:20'),
(336, 'Ariel James Pogi De Guzman logged in.', 'read', NULL, '2025-03-12 06:15:54', '2025-03-12 16:14:21'),
(337, 'Ariel James Pogi De Guzman logged in.', 'read', NULL, '2025-03-12 06:23:50', '2025-03-12 16:14:22'),
(338, 'Ariel James Pogi De Guzman logged in.', 'read', NULL, '2025-03-12 08:33:46', '2025-03-12 16:14:23'),
(339, 'Ariel James Aljecera De Guzman logged in.', 'read', NULL, '2025-03-12 08:34:25', '2025-03-12 16:14:24'),
(340, 'Ariel James Pogi De Guzman updated their user profile', 'read', '/User', '2025-03-12 08:34:47', '2025-03-12 00:35:34'),
(341, 'Charmel M. De Guzman was Blocked to Login', 'read', '/User', '2025-03-12 08:35:23', '2025-03-12 00:35:34'),
(342, 'Ariel James Pogi De Guzman was Blocked to Login', 'read', '/User', '2025-03-12 09:02:13', '2025-03-12 01:02:33'),
(343, 'Ariel James Pogi De Guzman was Allowed to Login', 'read', '/User', '2025-03-14 01:35:13', '2025-03-13 17:35:50'),
(344, 'Ariel James Pogi De Guzman was Blocked to Login', 'read', '/User', '2025-03-14 01:35:17', '2025-03-13 17:35:50'),
(345, 'Ariel James Pogi De Guzman was Allowed to Login', 'read', '/User', '2025-03-14 01:35:20', '2025-03-13 17:35:50'),
(346, 'Ariel James Pogi De Guzman was Blocked to Login', 'read', '/User', '2025-03-14 01:35:21', '2025-03-13 17:35:50'),
(347, 'Ariel James De Guzman updated their user profile', 'read', '/User', '2025-03-14 01:35:46', '2025-03-13 17:35:50'),
(348, 'Ariel James De Guzman\'s permission access has been updated!', 'read', '/User', '2025-03-14 01:40:21', '2025-03-13 17:40:56'),
(349, 'Charmel M. De Guzman\'s permission access has been updated!', 'read', '/User', '2025-03-14 01:40:46', '2025-03-13 17:40:56'),
(350, 'Charmel M. De Guzman\'s permission access has been updated!', 'read', '/User', '2025-03-14 01:41:19', '2025-03-13 17:41:58'),
(351, 'Ariel James De Guzmans updated their user profile', 'read', '/User', '2025-03-14 01:43:38', '2025-03-13 17:43:58'),
(352, 'Ariel James De Guzmans\'s permission access has been updated!', 'read', '/User', '2025-03-14 01:44:21', '2025-03-13 17:44:31'),
(353, 'Ariel James De Guzmans was Allowed to Login', 'read', '/User', '2025-03-14 02:36:17', '2025-03-13 18:39:15'),
(354, 'Ariel James De Guzmans was Blocked to Login', 'read', '/User', '2025-03-14 02:36:19', '2025-03-13 18:39:15'),
(355, 'Ariel James De Guzmans was Allowed to Login', 'read', '/User', '2025-03-14 02:42:24', '2025-03-13 18:42:27'),
(356, 'Ariel James De Guzmans was Blocked to Login', 'read', '/User', '2025-03-14 02:42:25', '2025-03-13 18:42:27'),
(357, 'Ariel James De Guzmans updated their user profile', 'read', '/Profile', '2025-03-14 02:49:47', '2025-03-13 18:50:23'),
(358, 'Ariel James De Guzmans updated their user profile', 'read', '/Profile', '2025-03-14 02:50:04', '2025-03-13 18:50:23'),
(359, 'Ariel James De Guzmans was Allowed to Login', 'read', '/User', '2025-03-14 02:51:39', '2025-03-13 18:51:43'),
(360, 'Ariel James De Guzmans was Blocked to Login', 'read', '/User', '2025-03-14 02:51:41', '2025-03-13 18:51:43'),
(361, 'Ariel James De Guzmans updated their user profile', 'read', '/Profile', '2025-03-14 02:52:30', '2025-03-13 18:54:13'),
(362, 'Ariel James De Guzmans updated their user profile', 'read', '/Profile', '2025-03-14 02:54:00', '2025-03-13 18:59:44'),
(363, 'Ariel James Aljecera De Guzman logged in.', 'read', NULL, '2025-03-14 03:21:11', '2025-03-13 21:50:50'),
(364, 'Ariel James Aljecera De Guzman logged in.', 'read', NULL, '2025-03-16 07:45:10', '2025-03-16 10:33:40'),
(365, 'Ariel James De Guzmans logged in.', 'read', NULL, '2025-03-16 07:45:56', '2025-03-16 10:33:38'),
(366, 'Ariel James De Guzmans was Allowed to Login', 'read', '/User', '2025-03-16 07:46:09', '2025-03-15 23:46:34'),
(367, 'Ariel James De Guzmans logged in.', 'read', NULL, '2025-03-16 07:46:13', '2025-03-16 10:33:39'),
(368, 'Ariel James Aljecera De Guzman logged in.', 'read', NULL, '2025-03-16 13:40:41', '2025-03-16 10:33:37'),
(369, 'Ariel James Aljecera De Guzmans updated their user profile', 'read', '/Profile', '2025-03-16 18:31:50', '2025-03-16 10:31:56'),
(370, 'Ariel James De Guzmans logged in.', 'read', NULL, '2025-03-16 18:42:49', '2025-03-18 19:45:45'),
(371, 'Ariel James Aljecera De Guzmans logged in.', 'read', NULL, '2025-03-17 00:17:03', '2025-03-18 19:45:45'),
(372, 'Ariel James De Guzmans updated their user profile', 'read', '/User', '2025-03-17 01:26:16', '2025-03-16 17:27:59'),
(373, 'Ariel James Aljecera De Guzmans logged in.', 'read', NULL, '2025-03-19 03:01:10', '2025-03-18 19:45:45'),
(374, 'Ariel James De Guzmans logged in.', 'read', NULL, '2025-03-19 03:03:20', '2025-03-18 19:45:45'),
(375, 'Ariel James De Guzmans updated their user profile', 'read', '/User', '2025-03-19 03:04:58', '2025-03-18 19:45:45'),
(376, 'Ariel James De Guzmans updated their user profile', 'read', '/User', '2025-03-19 03:05:07', '2025-03-18 19:45:45'),
(377, 'Ariel James De Guzmans updated their user profile', 'read', '/User', '2025-03-19 03:05:13', '2025-03-18 19:45:45'),
(378, 'Ariel James De Guzmans updated their user profile', 'read', '/User', '2025-03-19 03:05:33', '2025-03-18 19:45:45'),
(379, 'Ariel James De Guzmans updated their user profile', 'read', '/User', '2025-03-19 03:05:43', '2025-03-18 19:45:45'),
(380, 'Ariel James Aljecera De Guzmans logged in.', 'read', NULL, '2025-03-19 03:30:03', '2025-03-18 19:45:45'),
(381, 'Ariel James De Guzmans\'s permission access has been updated!', 'read', '/User', '2025-03-19 03:57:16', '2025-03-18 21:28:39'),
(382, 'Ariel James De Guzmans logged in.', 'read', NULL, '2025-03-19 05:45:50', '2025-03-18 22:53:25'),
(383, 'Ariel James Aljecera De Guzmans updated their user profile', 'read', '/Profile', '2025-03-19 07:41:46', '2025-03-18 23:43:22'),
(384, 'Ariel James De Guzmans was Blocked to Login', 'read', '/User', '2025-03-19 07:43:00', '2025-03-18 23:43:22'),
(385, 'Ariel James De Guzmans was Allowed to Login', 'read', '/User', '2025-03-19 07:43:02', '2025-03-18 23:43:22'),
(386, 'Ariel James De Guzmans was Blocked to Login', 'read', '/User', '2025-03-19 07:43:05', '2025-03-18 23:43:22'),
(387, 'Ariel James De Guzmans was Allowed to Login', 'read', '/User', '2025-03-19 07:43:06', '2025-03-18 23:43:22'),
(388, 'Ariel James De Guzmans was Blocked to Login', 'read', '/User', '2025-03-19 07:43:07', '2025-03-18 23:43:22'),
(389, 'Ariel James De Guzmans was Allowed to Login', 'read', '/User', '2025-03-19 07:43:07', '2025-03-18 23:43:22'),
(390, 'Ariel James De Guzmans was Blocked to Login', 'read', '/User', '2025-03-19 07:43:07', '2025-03-18 23:43:22'),
(391, 'Ariel James De Guzmans was Allowed to Login', 'read', '/User', '2025-03-19 07:43:09', '2025-03-18 23:43:22'),
(392, 'Ariel James Aljecera De Guzmans logged in.', 'read', NULL, '2025-03-20 00:37:35', '2025-03-19 16:40:30'),
(393, 'New user registered: Rizalyn Cartagena', 'read', NULL, '2025-03-20 01:31:39', '2025-03-19 17:34:56'),
(394, 'New user registered: Rizalyn Cartagena', 'read', NULL, '2025-03-20 01:32:18', '2025-03-19 17:34:56'),
(395, 'New user registered: Rizalyn Cartagena', 'read', NULL, '2025-03-20 01:33:07', '2025-03-19 17:34:56'),
(396, 'New user registered: Rizalyn Cartagena', 'read', NULL, '2025-03-20 01:34:27', '2025-03-19 17:34:56'),
(397, 'New user registered: Rizalyn Cartagena', 'read', NULL, '2025-03-20 01:37:43', '2025-03-19 18:15:05'),
(398, 'Rizalyn Cartagena logged in.', 'read', NULL, '2025-03-20 01:37:56', '2025-03-19 18:15:05'),
(399, 'Rizalyn Cartagena was Allowed to Login', 'read', '/User', '2025-03-20 01:43:47', '2025-03-19 18:15:05'),
(400, 'Rizalyn Cartagena was Blocked to Login', 'read', '/User', '2025-03-20 01:43:50', '2025-03-19 18:15:05'),
(401, 'Rizalyn Cartagena logged in.', 'read', NULL, '2025-03-20 01:43:53', '2025-03-19 18:15:05'),
(402, 'Rizalyn Cartagena was Allowed to Login', 'read', '/User', '2025-03-20 01:43:55', '2025-03-19 18:15:05'),
(403, 'Rizalyn Cartagena logged in.', 'read', NULL, '2025-03-20 01:43:57', '2025-03-19 18:15:05'),
(404, 'Ariel James De Guzmans was Blocked to Login', 'read', '/User', '2025-03-20 01:49:22', '2025-03-19 18:15:05'),
(405, 'Ariel James De Guzmans was Allowed to Login', 'read', '/User', '2025-03-20 01:49:25', '2025-03-19 18:15:05'),
(406, 'Ariel James De Guzmans logged in.', 'read', NULL, '2025-03-20 02:29:12', '2025-03-19 18:31:06'),
(407, 'Ariel James De Guzmans logged in.', 'read', NULL, '2025-03-20 02:29:39', '2025-03-19 18:31:06'),
(408, 'Ariel James De Guzmans logged in.', 'read', NULL, '2025-03-20 02:31:42', '2025-03-19 18:37:06'),
(409, 'Ariel James De Guzmans logged in.', 'read', NULL, '2025-03-20 02:33:49', '2025-03-19 18:37:06'),
(410, 'Ariel James De Guzmans logged in.', 'read', NULL, '2025-03-20 02:36:31', '2025-03-19 18:37:06'),
(411, 'Ariel James De Guzmans logged in.', 'read', NULL, '2025-03-20 02:36:49', '2025-03-19 18:37:06'),
(412, 'Ariel James De Guzmans logged in.', 'read', NULL, '2025-03-20 02:36:55', '2025-03-19 18:37:06'),
(413, 'Ariel James De Guzmans logged in.', 'read', NULL, '2025-03-20 02:37:08', '2025-03-19 18:39:17'),
(414, 'Ariel James De Guzmans logged in.', 'read', NULL, '2025-03-20 02:37:29', '2025-03-19 18:39:17'),
(415, 'Ariel James De Guzmans logged in.', 'read', NULL, '2025-03-20 02:37:38', '2025-03-19 18:39:17'),
(416, 'Ariel James De Guzmans logged in.', 'read', NULL, '2025-03-20 02:39:24', '2025-03-19 19:14:28'),
(417, 'Ariel James De Guzmans logged in.', 'read', NULL, '2025-03-20 02:40:36', '2025-03-19 19:14:28'),
(418, 'Ariel James De Guzmans logged in.', 'read', NULL, '2025-03-20 02:41:00', '2025-03-19 19:14:28'),
(419, 'Ariel James De Guzmans logged in.', 'read', NULL, '2025-03-20 02:41:02', '2025-03-19 19:14:28'),
(420, 'Ariel James De Guzmans logged in.', 'read', NULL, '2025-03-20 03:00:37', '2025-03-19 19:14:28'),
(421, 'Ariel James De Guzmans logged in.', 'read', NULL, '2025-03-20 03:02:44', '2025-03-19 19:14:28'),
(422, 'Ariel James De Guzmans logged in.', 'read', NULL, '2025-03-20 03:06:01', '2025-03-19 19:14:28'),
(423, 'Ariel James De Guzmans logged in.', 'read', NULL, '2025-03-20 03:06:35', '2025-03-19 19:14:28'),
(424, 'Ariel James De Guzmans has logged in successfully.', 'read', NULL, '2025-03-20 03:14:48', '2025-03-21 02:17:37');
INSERT INTO `notifications` (`id`, `message`, `status`, `path`, `created_at`, `updated_at`) VALUES
(425, 'Ariel James De Guzmans is blocked and attempted to log in!', 'read', NULL, '2025-03-20 03:16:16', '2025-03-21 02:18:25'),
(426, 'Ariel James De Guzmans is blocked and attempted to log in!', 'read', '/User', '2025-03-20 03:18:52', '2025-03-19 22:11:09'),
(427, 'Sumpak Wangdu is not yet allowed and attempted to log in.', 'read', '/User', '2025-03-20 03:19:25', '2025-03-19 22:11:09'),
(428, 'Sumpak Wangdu is not yet allowed and attempted to log in.', 'read', '/User', '2025-03-20 06:49:21', '2025-03-20 21:48:45'),
(429, 'Sumpak Wangdu is not yet allowed and attempted to log in.', 'read', '/User', '2025-03-20 06:49:27', '2025-03-20 21:48:45'),
(430, 'Ariel James Aljecera De Guzmans has logged in successfully.', 'read', '/User', '2025-03-21 00:47:26', '2025-03-20 21:48:45'),
(431, 'Ariel James Aljecera De Guzmans has logged in successfully.', 'read', '/User', '2025-03-21 00:47:55', '2025-03-20 21:48:45'),
(432, 'Ariel James Aljecera De Guzmans has logged in successfully.', 'read', '/User', '2025-03-21 00:49:12', '2025-03-20 21:48:45'),
(433, 'Ariel James Aljecera De Guzmans has logged in successfully.', 'read', '/User', '2025-03-21 01:54:10', '2025-03-20 21:48:45'),
(434, 'Ariel James De Guzmans is blocked and attempted to log in!', 'read', '/User', '2025-03-21 02:41:12', '2025-03-20 21:48:45'),
(435, 'Ariel James De Guzmans has logged in successfully.', 'read', '/User', '2025-03-21 02:41:27', '2025-03-20 21:48:45'),
(436, 'Ariel James Aljecera De Guzmans has logged in successfully.', 'read', '/User', '2025-03-21 02:43:41', '2025-03-23 22:45:27'),
(437, 'Ariel James Aljecera De Guzmans has logged in successfully.', 'read', '/User', '2025-03-21 03:44:32', '2025-03-21 02:18:21'),
(438, 'Ariel James Aljecera De Guzmans has logged in successfully.', 'read', '/User', '2025-03-21 09:44:13', '2025-03-21 02:17:48'),
(439, 'Ariel James Aljecera De Guzmans has logged in successfully.', 'read', '/User', '2025-03-23 07:22:10', '2025-03-23 17:42:34'),
(440, 'Ariel James Aljecera De Guzmans has logged in successfully.', 'read', '/User', '2025-03-24 00:03:41', '2025-03-23 17:42:34'),
(441, 'Ariel James Aljecera De Guzmans has logged in successfully.', 'read', '/User', '2025-03-24 00:04:01', '2025-03-23 17:42:34'),
(442, 'Ariel James Aljecera De Guzmans has logged in successfully.', 'read', '/User', '2025-03-24 00:11:16', '2025-03-23 17:42:34'),
(443, 'Ariel James De Guzmans has logged in successfully.', 'read', '/User', '2025-03-24 05:18:18', '2025-03-23 22:49:13'),
(444, 'Ariel James De Guzmans has logged in successfully.', 'read', '/User', '2025-03-24 06:57:05', '2025-03-23 22:57:37'),
(445, 'Ariel James De Guzmans has logged in successfully.', 'read', '/User', '2025-03-24 06:59:51', '2025-03-23 23:00:13'),
(446, 'Ariel James Aljecera De Guzmans has logged in successfully.', 'read', '/User', '2025-03-25 00:08:27', '2025-03-24 21:39:12'),
(447, 'Ariel James De Guzmans has logged in successfully.', 'read', '/User', '2025-03-25 00:08:58', '2025-03-24 21:39:12'),
(448, 'Ariel James De Guzmans has logged in successfully.', 'read', '/User', '2025-03-25 02:15:42', '2025-03-24 21:39:12'),
(449, 'Ariel James Aljecera De Guzmans has logged in successfully.', 'read', '/User', '2025-03-25 02:16:14', '2025-03-24 21:39:12'),
(450, 'Ariel James Aljecera De Guzmans has logged in successfully.', 'read', '/User', '2025-03-26 00:02:08', '2025-03-26 16:51:52'),
(451, 'Ariel James De Guzmans has logged in successfully.', 'read', '/User', '2025-03-26 00:02:35', '2025-03-26 16:51:52'),
(452, 'Ariel James Aljecera De Guzmans has logged in successfully.', 'read', '/User', '2025-03-27 00:07:47', '2025-03-26 16:51:52'),
(453, 'Ariel James Aljecera De Guzmans has logged in successfully.', 'read', '/User', '2025-03-27 00:23:41', '2025-03-26 16:51:52'),
(454, 'Ariel James De Guzmans has logged in successfully.', 'read', '/User', '2025-03-27 00:27:06', '2025-03-26 16:51:52'),
(455, 'Ariel James Aljecera De Guzmans has logged in successfully.', 'read', '/User', '2025-03-27 02:05:53', '2025-03-26 18:09:21'),
(456, 'Ariel James De Guzmans has logged in successfully.', 'read', '/User', '2025-03-27 02:47:49', '2025-03-26 19:11:42'),
(457, 'Ariel James De Guzmans has logged in successfully.', 'read', '/User', '2025-03-27 07:28:13', '2025-03-26 23:32:26'),
(458, 'Ariel James De Guzmans has logged in successfully.', 'read', '/User', '2025-03-27 07:28:32', '2025-03-26 23:32:26'),
(459, 'Ariel James De Guzmans has logged in successfully.', 'read', '/User', '2025-03-27 07:30:41', '2025-03-26 23:32:26'),
(460, 'Ariel James De Guzmans has logged in successfully.', 'read', '/User', '2025-03-27 07:30:53', '2025-03-26 23:32:26'),
(461, 'Ariel James De Guzmans has logged in successfully.', 'read', '/User', '2025-03-27 07:31:50', '2025-03-26 23:32:26'),
(462, 'Ariel James De Guzmans has logged in successfully.', 'read', '/User', '2025-03-27 07:32:17', '2025-03-26 23:32:26'),
(463, 'Ariel James De Guzmans has logged in successfully.', 'read', '/User', '2025-03-27 07:32:46', '2025-03-27 00:36:23'),
(464, 'Ariel James De Guzmans has logged in successfully.', 'read', '/User', '2025-03-27 07:33:06', '2025-03-27 00:36:23'),
(465, 'Ariel James De Guzmans has logged in successfully.', 'read', '/User', '2025-03-27 08:06:05', '2025-03-27 00:36:23'),
(466, 'Ariel James De Guzmans has logged in successfully.', 'read', '/User', '2025-03-27 08:11:07', '2025-03-27 00:36:23'),
(467, 'Ariel James Aljecera De Guzmans has logged in successfully.', 'read', '/User', '2025-03-27 08:23:11', '2025-03-27 00:36:23'),
(468, 'Ariel James Aljecera De Guzmans has logged in successfully.', 'read', '/User', '2025-03-27 08:24:53', '2025-03-27 00:36:23'),
(469, 'Ariel James Aljecera De Guzmans has logged in successfully.', 'read', '/User', '2025-03-28 00:03:07', '2025-03-27 16:03:33'),
(470, 'Ariel James De Guzmans has logged in successfully.', 'read', '/User', '2025-03-28 03:29:52', '2025-03-27 19:45:56'),
(471, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-03-28 07:24:47', '2025-03-27 23:25:17'),
(472, 'New user registered: asefedsasdasss', 'read', '/User', '2025-03-28 08:30:50', '2025-03-28 00:31:12'),
(473, 'New user registered: Maria Charisma Castillo', 'read', '/User', '2025-03-28 08:31:59', '2025-03-28 01:26:29'),
(474, 'Maria Charisma Castillo is not yet allowed and attempted to log in.', 'read', '/User', '2025-03-28 08:32:17', '2025-03-28 01:26:29'),
(475, 'Maria Charisma Castillo has logged in successfully.', 'read', '/User', '2025-03-28 08:32:42', '2025-03-28 01:26:29'),
(476, 'New user registered: Ariel De Guzman', 'read', '/User', '2025-03-28 09:16:15', '2025-03-28 01:26:29'),
(477, 'New user registered: Ariel De Guzman', 'read', '/User', '2025-03-28 09:19:22', '2025-03-28 01:26:29'),
(478, 'New user registered: Ariel De Guzman', 'read', '/User', '2025-03-31 00:53:49', '2025-03-31 00:50:00'),
(479, 'New user registered: Ariel De Guzman', 'read', '/User', '2025-03-31 01:12:35', '2025-03-31 00:50:00'),
(480, 'New user registered: Ariel De Guzman', 'read', '/User', '2025-03-31 02:18:04', '2025-03-31 00:50:00'),
(481, 'New user registered: Ariel De Guzman', 'read', '/User', '2025-03-31 02:19:59', '2025-03-31 00:50:00'),
(482, 'Ariel James De Guzmans has logged in successfully.', 'read', '/User', '2025-03-31 04:53:37', '2025-03-31 00:50:00'),
(483, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-03-31 07:18:35', '2025-03-31 00:50:00'),
(484, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-03-31 07:19:51', '2025-03-31 00:50:00'),
(485, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-03-31 07:42:24', '2025-03-31 00:50:00'),
(486, 'Ariel De Guzman is not yet allowed and attempted to log in.', 'read', '/User', '2025-03-31 08:15:20', '2025-03-31 00:50:00'),
(487, 'Ariel James De Guzmans has logged in successfully.', 'read', '/User', '2025-03-31 08:15:27', '2025-03-31 00:50:00'),
(488, 'Ariel James De Guzmans has logged in successfully.', 'read', '/User', '2025-03-31 08:16:26', '2025-03-31 00:50:00'),
(489, 'Ariel James De Guzmans has logged in successfully.', 'read', '/User', '2025-03-31 08:16:49', '2025-03-31 00:50:00'),
(490, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-03-31 08:27:11', '2025-03-31 00:50:00'),
(491, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-03-31 08:27:47', '2025-03-31 00:50:00'),
(492, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-02 00:08:36', '2025-04-01 16:16:24'),
(493, 'Ariel James De Guzmans has logged in successfully.', 'read', '/User', '2025-04-02 00:45:30', '2025-04-01 17:08:46'),
(494, 'Ariel De Guzman is not yet allowed and attempted to log in.', 'read', '/User', '2025-04-02 02:31:36', '2025-04-01 21:33:06'),
(495, 'Ariel De Guzman is not yet allowed and attempted to log in.', 'read', '/User', '2025-04-02 02:32:15', '2025-04-01 21:33:06'),
(496, 'Ariel De Guzman is not yet allowed and attempted to log in.', 'read', '/User', '2025-04-02 02:32:18', '2025-04-01 21:33:06'),
(497, 'Ariel De Guzman is not yet allowed and attempted to log in.', 'read', '/User', '2025-04-02 02:32:26', '2025-04-01 21:33:06'),
(498, 'Ariel De Guzman is not yet allowed and attempted to log in.', 'read', '/User', '2025-04-02 02:42:20', '2025-04-01 21:33:06'),
(499, 'Ariel De Guzman is not yet allowed and attempted to log in.', 'read', '/User', '2025-04-02 02:44:18', '2025-04-01 21:33:06'),
(500, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-02 03:13:28', '2025-04-01 21:33:06'),
(501, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-02 05:32:30', '2025-04-01 21:33:06'),
(502, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-02 05:41:20', '2025-04-01 21:57:06'),
(503, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-02 05:56:48', '2025-04-01 21:57:06'),
(504, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-03 00:01:53', '2025-04-02 21:18:19'),
(505, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-03 00:02:10', '2025-04-02 21:18:19'),
(506, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-03 01:52:12', '2025-04-02 21:18:19'),
(507, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-04 00:01:52', '2025-04-09 16:23:14'),
(508, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-04 01:05:07', '2025-04-09 16:23:14'),
(509, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-04 01:07:23', '2025-04-09 16:23:14'),
(510, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-04 02:26:03', '2025-04-09 16:23:14'),
(511, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-08 00:12:16', '2025-04-09 16:23:14'),
(512, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-08 09:14:12', '2025-04-09 16:23:14'),
(513, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-10 00:06:20', '2025-04-09 16:23:14'),
(514, 'Ariel James De Guzmans has logged in successfully.', 'read', '/User', '2025-04-10 08:43:11', '2025-04-10 00:50:33'),
(515, 'Ariel James De Guzmans has logged in successfully.', 'read', '/User', '2025-04-10 08:43:49', '2025-04-10 00:50:33'),
(516, 'Ariel James De Guzmans has logged in successfully.', 'read', '/User', '2025-04-11 00:09:40', '2025-04-10 16:11:26'),
(517, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-11 00:09:53', '2025-04-10 16:11:26'),
(518, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-14 00:20:15', '2025-04-14 01:09:22'),
(519, 'Ariel James De Guzmans has logged in successfully.', 'read', '/User', '2025-04-14 02:18:05', '2025-04-14 01:09:22'),
(520, 'Ariel James De Guzmans has logged in successfully.', 'read', '/User', '2025-04-14 02:19:00', '2025-04-14 01:09:22'),
(521, 'Ariel James De Guzmans has logged in successfully.', 'read', '/User', '2025-04-14 02:19:31', '2025-04-14 01:09:22'),
(522, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-14 02:19:45', '2025-04-14 01:09:22'),
(523, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-15 00:51:50', '2025-04-21 21:28:46'),
(524, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-15 02:20:02', '2025-04-21 21:28:46'),
(525, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-15 02:21:10', '2025-04-21 21:28:46'),
(526, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-16 00:55:42', '2025-04-21 21:28:46'),
(527, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-21 00:20:15', '2025-04-21 21:28:46'),
(528, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-22 00:20:45', '2025-04-21 21:28:46'),
(529, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-22 02:46:43', '2025-04-21 21:28:46'),
(530, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-23 00:44:46', '2025-04-22 18:49:11'),
(531, 'Ariel James De Guzmans has logged in successfully.', 'read', '/User', '2025-04-23 02:43:38', '2025-04-22 18:49:11'),
(532, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-24 03:56:31', '2025-04-27 22:33:44'),
(533, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-28 00:31:18', '2025-04-27 22:33:44'),
(534, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-28 02:09:39', '2025-04-27 22:33:43'),
(535, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-28 07:04:57', '2025-04-28 19:16:21'),
(536, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-29 01:28:47', '2025-04-28 19:16:21'),
(537, 'Ariel James De Guzman has logged in successfully.', 'read', '/User', '2025-04-29 02:44:01', '2025-04-28 19:16:21'),
(538, 'Ariel James De Guzman has logged in successfully.', 'read', '/User', '2025-04-29 02:44:33', '2025-04-28 19:16:21'),
(539, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-29 06:14:54', '2025-04-28 23:10:18'),
(540, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-29 06:22:58', '2025-04-28 23:10:18'),
(541, 'Ariel James De Guzman has logged in successfully.', 'read', '/User', '2025-04-29 06:27:11', '2025-04-28 23:10:18'),
(542, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-29 06:51:35', '2025-04-28 23:10:18'),
(543, 'Ariel James Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-29 07:06:34', '2025-04-28 23:10:18'),
(544, 'Ariel James De Guzman has logged in successfully.', 'read', '/User', '2025-04-29 07:25:22', '2025-04-28 23:43:36'),
(545, 'Ariel Jamess Aljecera De Guzman has logged in successfully.', 'read', '/User', '2025-04-29 09:20:35', '2025-04-29 01:35:45'),
(546, 'Ariel Jamess Aljecera De Guzman has logged in successfully.', 'unread', '/User', '2025-04-30 00:32:13', '2025-04-29 16:32:13'),
(547, 'Ariel James De Guzman has logged in successfully.', 'unread', '/User', '2025-04-30 00:33:20', '2025-04-29 16:33:20'),
(548, 'Ariel James De Guzman has logged in successfully.', 'unread', '/User', '2025-04-30 02:24:02', '2025-04-29 18:24:02');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(2, 'App\\Models\\User', 6, 'authToken', '3d089cf7b0b57e5f7c51f51ba3b635e3b6d8794d92e75496a4b9517fece543a7', '[\"*\"]', NULL, NULL, '2025-02-18 19:17:57', '2025-02-18 19:17:57'),
(3, 'App\\Models\\User', 7, 'authToken', 'b4aedddd2eacc3bb06f0c191f8169b67bbbce222ea2d41537b11be4f914f25b7', '[\"*\"]', NULL, NULL, '2025-02-18 19:19:01', '2025-02-18 19:19:01'),
(39, 'App\\Models\\User', 5, 'authToken', 'f5c37bb3d727d90387bf2d6fd34a8ca1fd60ea0488c0ea51770e860f314ee9ad', '[\"*\"]', NULL, NULL, '2025-02-19 00:06:22', '2025-02-19 00:06:22'),
(45, 'App\\Models\\User', 9, 'authToken', '3f695ebbe1a0ee0ca8dff24625287888caffb514a0b7ecd9ff207661f018d0db', '[\"*\"]', NULL, NULL, '2025-02-19 17:52:07', '2025-02-19 17:52:07'),
(68, 'App\\Models\\User', 25, 'authToken', 'e5e2cb34b6d5a699dd53925c15b7365d3b1dd9009813fccdb7e311089b3e9ccf', '[\"*\"]', '2025-02-19 23:53:06', NULL, '2025-02-19 23:45:52', '2025-02-19 23:53:06'),
(86, 'App\\Models\\User', 21, 'authToken', '71770111bd8e7fc08086c8abb2c689b935c805f5af3d2426627de541d12e4628', '[\"*\"]', '2025-02-20 16:53:33', NULL, '2025-02-20 16:53:32', '2025-02-20 16:53:33'),
(108, 'App\\Models\\User', 36, 'authToken', '76c8aa70564a74e5f06007347308c31f5837e20bab55f540218b59c6b257c4fe', '[\"*\"]', '2025-02-23 17:10:47', NULL, '2025-02-23 17:10:46', '2025-02-23 17:10:47'),
(156, 'App\\Models\\User', 35, 'authToken', '37970dc1925bb9b07c6112b359c2819a746820356d434f81755af8332c6135f2', '[\"*\"]', NULL, NULL, '2025-02-23 23:31:04', '2025-02-23 23:31:04'),
(215, 'App\\Models\\User', 51, 'authToken', '721f003799de87e35a30d9dd467aa2cc2fd90f6291ed7e8759b3918681f6bdbe', '[\"*\"]', NULL, NULL, '2025-03-19 17:37:56', '2025-03-19 17:37:56'),
(216, 'App\\Models\\User', 51, 'authToken', 'd1bf68ca9518aa64f54d81753d388f59fdb2196ec53fa0649cb7a3ba4236c178', '[\"*\"]', NULL, NULL, '2025-03-19 17:43:53', '2025-03-19 17:43:53'),
(217, 'App\\Models\\User', 51, 'authToken', '77fe4c0055656259a00d5d513816ce92bb484baae8ecf7893f48e50ee866d17e', '[\"*\"]', '2025-03-19 17:48:03', NULL, '2025-03-19 17:43:57', '2025-03-19 17:48:03'),
(238, 'App\\Models\\User', 40, 'authToken', 'e26f8427c7dea30aa7f466f6556a8adc6fa3c748d567056b15d31a13943e7ed5', '[\"*\"]', NULL, NULL, '2025-03-19 19:16:46', '2025-03-19 19:16:46'),
(239, 'App\\Models\\User', 40, 'authToken', 'd06cd381ccff91f5b1f6ba0f4927bf89c94f40a508bb114e3bc15366f2a4d614', '[\"*\"]', NULL, NULL, '2025-03-19 19:16:58', '2025-03-19 19:16:58'),
(240, 'App\\Models\\User', 40, 'authToken', '644a51b65eb826c8f047a1a475a28a969697ca74182820cf06cb534db549c51e', '[\"*\"]', NULL, NULL, '2025-03-19 19:17:10', '2025-03-19 19:17:10'),
(241, 'App\\Models\\User', 40, 'authToken', 'e5ac2785b301fdc146b270755a17e88f54cb35b0b479b13b6f5c04bae83f9c1a', '[\"*\"]', NULL, NULL, '2025-03-19 19:18:45', '2025-03-19 19:18:45'),
(243, 'App\\Models\\User', 40, 'authToken', '953db682d5d5ac8afb39ebf301c113687ff03534bd3bdd8245e2edd0024f4728', '[\"*\"]', NULL, NULL, '2025-03-19 19:19:04', '2025-03-19 19:19:04'),
(244, 'App\\Models\\User', 40, 'authToken', 'a74a0fed452f0f26b0a1aee3a47fd8f9059d723c745491d311fb29a9b3cc7164', '[\"*\"]', NULL, NULL, '2025-03-19 19:19:25', '2025-03-19 19:19:25'),
(245, 'App\\Models\\User', 40, 'authToken', 'c2b691833c439adcdd137592321928a1551ae3818a2bd73f7f9c9bc111746bed', '[\"*\"]', NULL, NULL, '2025-03-19 22:49:21', '2025-03-19 22:49:21'),
(246, 'App\\Models\\User', 40, 'authToken', '5ae55f54868f6bedbc74ed2a8a2b0d2f60d1a4a5b1134f1dcddd7f1c92d28d37', '[\"*\"]', NULL, NULL, '2025-03-19 22:49:28', '2025-03-19 22:49:28'),
(285, 'App\\Models\\User', 58, 'authToken', 'ecc8a38116fc80c2f5599d5f0895f2047b72e714510bb5e497828c386b656ee7', '[\"*\"]', NULL, NULL, '2025-03-28 00:32:17', '2025-03-28 00:32:17'),
(286, 'App\\Models\\User', 58, 'authToken', 'fabd5d6a9bc0c0fd4b7a083505dda80cb46b8d4f9b211652f0fb513c15a11a11', '[\"*\"]', '2025-03-28 00:33:15', NULL, '2025-03-28 00:32:43', '2025-03-28 00:33:15'),
(287, 'App\\Models\\User', 66, 'authToken', '2edd7b68798e7a202beb27b792ac202ffb8f6c0b20b1e988a2612445da40c162', '[\"*\"]', NULL, NULL, '2025-03-30 18:45:19', '2025-03-30 18:45:19'),
(288, 'App\\Models\\User', 67, 'authToken', '1ea8ea1d1b368621dd5f8ff7fde732d7c20c2e39344060b653f1c40e2a28b46b', '[\"*\"]', NULL, NULL, '2025-03-30 18:45:32', '2025-03-30 18:45:32'),
(289, 'App\\Models\\User', 68, 'authToken', 'bfa701ebf78561825a6b3215880db2d4a741c68ec61bae5969ce6aa44b8fad07', '[\"*\"]', NULL, NULL, '2025-03-30 18:48:26', '2025-03-30 18:48:26'),
(290, 'App\\Models\\User', 69, 'authToken', 'c7476d005fe3cc74ac6fbdc992db415654dbc6b9d711bb5444c5cd68414d88cf', '[\"*\"]', NULL, NULL, '2025-03-30 18:51:51', '2025-03-30 18:51:51'),
(291, 'App\\Models\\User', 70, 'authToken', '073c8c66701cf7b29d95b7d48d5c2ee719475251c32d917e046fb42ea3d7a739', '[\"*\"]', NULL, NULL, '2025-03-30 19:13:23', '2025-03-30 19:13:23'),
(292, 'App\\Models\\User', 71, 'authToken', '1f2369049c4e49d5c6f045257230c31fa7e139cebad410031fe7f3069835899a', '[\"*\"]', NULL, NULL, '2025-03-30 19:25:01', '2025-03-30 19:25:01'),
(294, 'App\\Models\\User', 72, 'authToken', 'b4c86f5b5ebeabc2dcfd228d1afdcfab2c3d70524fab509ea5ad917a970bf26c', '[\"*\"]', NULL, NULL, '2025-03-30 21:10:24', '2025-03-30 21:10:24'),
(295, 'App\\Models\\User', 73, 'authToken', '708c2ca8fecba72fac088fc132bdd37ef107349ae09b3f949595f62975adb274', '[\"*\"]', NULL, NULL, '2025-03-30 21:22:37', '2025-03-30 21:22:37'),
(296, 'App\\Models\\User', 74, 'authToken', '5f65311ddb904a16c83eedb6d73483200de27f7fd4d7d5f22389889b84f72e61', '[\"*\"]', NULL, NULL, '2025-03-30 21:26:04', '2025-03-30 21:26:04'),
(297, 'App\\Models\\User', 75, 'authToken', '1fb79cab85fa914edf0d3da8e42d70acc2087be623e7020868d429299a2773d6', '[\"*\"]', NULL, NULL, '2025-03-30 21:37:24', '2025-03-30 21:37:24'),
(298, 'App\\Models\\User', 76, 'authToken', '481a75909276888567a21735ddc196fb6dd233aab4ad7cba8855d6b466fc58e8', '[\"*\"]', NULL, NULL, '2025-03-30 21:56:28', '2025-03-30 21:56:28'),
(299, 'App\\Models\\User', 76, 'authToken', '0e695d927d824e15f7127f7ca9edaf16ee8ea50bdee5018aa96d5bc35c891ae1', '[\"*\"]', NULL, NULL, '2025-03-30 21:57:26', '2025-03-30 21:57:26'),
(300, 'App\\Models\\User', 77, 'authToken', '7f379c339b90647432858126c4bc8c69370c009c5a7d2ebbd2688295dc5ee6e0', '[\"*\"]', NULL, NULL, '2025-03-30 22:00:53', '2025-03-30 22:00:53'),
(301, 'App\\Models\\User', 77, 'authToken', 'b901dd288425c58c36ac1763cf8543a34d65a0be17f0265633ca6d8a1c588127', '[\"*\"]', NULL, NULL, '2025-03-30 22:01:26', '2025-03-30 22:01:26'),
(302, 'App\\Models\\User', 78, 'authToken', '21e06a12bc24930df028a8ff840dee906d3af0cdaa814bdb16987813d3fd7bac', '[\"*\"]', NULL, NULL, '2025-03-30 22:23:49', '2025-03-30 22:23:49'),
(303, 'App\\Models\\User', 78, 'authToken', '4f1393c4e29be6702c8b43141c22113246f9db5736c556071958f9d08e718038', '[\"*\"]', NULL, NULL, '2025-03-30 22:26:09', '2025-03-30 22:26:09'),
(304, 'App\\Models\\User', 79, 'authToken', 'e0e56b1769daf479700016b3586c2f9ed70d97aaf741a17e03be4daeb10084a3', '[\"*\"]', NULL, NULL, '2025-03-30 22:30:05', '2025-03-30 22:30:05'),
(305, 'App\\Models\\User', 79, 'authToken', '25ed928cf94cf70f452015221399b4faea32fb4c9e27d7d2bec68d14a2a5d605', '[\"*\"]', NULL, NULL, '2025-03-30 22:30:18', '2025-03-30 22:30:18'),
(306, 'App\\Models\\User', 80, 'authToken', 'b1c63047bf140e13f2c00654b0c9c74439b45732baa6fb2ef82548c39a51bb7b', '[\"*\"]', NULL, NULL, '2025-03-30 22:32:02', '2025-03-30 22:32:02'),
(307, 'App\\Models\\User', 80, 'authToken', '69f301e9128d9086c5b2e9fa0ea15f49d84dd1dba72447633f034e8b8811f13a', '[\"*\"]', NULL, NULL, '2025-03-30 22:32:13', '2025-03-30 22:32:13'),
(308, 'App\\Models\\User', 81, 'authToken', 'c5ed55e6843da949ff2f9c68ee58030d9cd73b6ff2229f7444633cea19a13ca5', '[\"*\"]', NULL, NULL, '2025-03-30 22:37:37', '2025-03-30 22:37:37'),
(309, 'App\\Models\\User', 81, 'authToken', '1b91022816c6d54d96341b4d5a898b20b36cb234088bdfca8bd1762fef083d12', '[\"*\"]', NULL, NULL, '2025-03-30 22:37:47', '2025-03-30 22:37:47'),
(312, 'App\\Models\\User', 82, 'authToken', '7c7c3737502defd0ec79067f8ca0cb27fb69d516922a53156dfbc872727d0d1c', '[\"*\"]', NULL, NULL, '2025-03-30 23:22:16', '2025-03-30 23:22:16'),
(313, 'App\\Models\\User', 82, 'authToken', 'f2427a7192ac590deba84184e01709f9e610259519b9ea69bd210d7dd12200af', '[\"*\"]', NULL, NULL, '2025-03-30 23:22:36', '2025-03-30 23:22:36'),
(314, 'App\\Models\\User', 83, 'authToken', '7e9c8ae2ce2808a477d64bda370311ebb4e80bb754ea9770d4d60f8a347ba960', '[\"*\"]', NULL, NULL, '2025-03-30 23:26:01', '2025-03-30 23:26:01'),
(315, 'App\\Models\\User', 83, 'authToken', '014179028ccec550d2173c7cb95358b5b144533291d92bec23dcabb3a6dee021', '[\"*\"]', NULL, NULL, '2025-03-30 23:26:14', '2025-03-30 23:26:14'),
(317, 'App\\Models\\User', 84, 'authToken', 'e4acf270a04cde44d3a7af7e4c329c325677b6bca28032976b8d6d63a34bed9b', '[\"*\"]', NULL, NULL, '2025-03-30 23:57:47', '2025-03-30 23:57:47'),
(318, 'App\\Models\\User', 84, 'authToken', '5ed6646c874fbb9a2657eaeb948804fda6ea5be3ac807a0c3b7821f9c3717602', '[\"*\"]', NULL, NULL, '2025-03-30 23:58:04', '2025-03-30 23:58:04'),
(319, 'App\\Models\\User', 85, 'authToken', '82095d803f215462a41c9057811309c838498ae4aca6a62f7df6ad3e9d45b615', '[\"*\"]', NULL, NULL, '2025-03-31 00:02:03', '2025-03-31 00:02:03'),
(320, 'App\\Models\\User', 85, 'authToken', '19d02a8bb665182443df723071c578f48b4c77c4c323bb5ac8c3ef8197d46918', '[\"*\"]', NULL, NULL, '2025-03-31 00:02:14', '2025-03-31 00:02:14'),
(321, 'App\\Models\\User', 86, 'authToken', '2d7dee73da6a99e5762674adfbf3fb40ca4a053c8243414bc702dece9bb06600', '[\"*\"]', NULL, NULL, '2025-03-31 00:03:26', '2025-03-31 00:03:26'),
(322, 'App\\Models\\User', 86, 'authToken', 'a01a75188e6096577e039ffab5895f25526e44ddcb1d4d4dd829d95669eae4d5', '[\"*\"]', NULL, NULL, '2025-03-31 00:04:05', '2025-03-31 00:04:05'),
(323, 'App\\Models\\User', 87, 'authToken', 'd7f11b3bf3f412421776b798b5debba73b71851628b0ce1f16ddc41a06c36133', '[\"*\"]', NULL, NULL, '2025-03-31 00:08:06', '2025-03-31 00:08:06'),
(324, 'App\\Models\\User', 87, 'authToken', 'fc545f0aefc5750efd3e270335c15018cd2c457853f307c1d1bd2c12c9c5f725', '[\"*\"]', NULL, NULL, '2025-03-31 00:08:23', '2025-03-31 00:08:23'),
(325, 'App\\Models\\User', 87, 'authToken', 'a620ffdf6818d1d1c75d8484e8d4a06ef23caebcb3dd0bbd843c3852f7846d49', '[\"*\"]', NULL, NULL, '2025-03-31 00:15:20', '2025-03-31 00:15:20'),
(331, 'App\\Models\\User', 88, 'authToken', 'e4c8b6e436b27481a36b91adee295ba274c1ace9ee1035cea8360edb62a9d971', '[\"*\"]', NULL, NULL, '2025-03-31 01:01:49', '2025-03-31 01:01:49'),
(332, 'App\\Models\\User', 88, 'authToken', 'ffceaa4dbf921dc92d0ab0991ab4c07132eea61538cbf4b0c79dea0e3b307a74', '[\"*\"]', NULL, NULL, '2025-03-31 01:02:03', '2025-03-31 01:02:03'),
(335, 'App\\Models\\User', 89, 'authToken', '09da8ec73ae6c082c203d045a48bed1a08bb1a3b1b9ed28e93bff889ac89778d', '[\"*\"]', NULL, NULL, '2025-04-01 18:30:57', '2025-04-01 18:30:57'),
(336, 'App\\Models\\User', 89, 'authToken', 'b62f27c627ee99265f4461ad0af10f0584ee2a1a57a84e55ef00ea438f403e2e', '[\"*\"]', NULL, NULL, '2025-04-01 18:31:20', '2025-04-01 18:31:20'),
(337, 'App\\Models\\User', 89, 'authToken', 'a7671419612911eadfbb6d31412748a63ad0f27fdc7c999f86094a6fe928afec', '[\"*\"]', NULL, NULL, '2025-04-01 18:32:15', '2025-04-01 18:32:15'),
(338, 'App\\Models\\User', 89, 'authToken', 'd58dc66e85e3aa35c68a04c5899304646ead38e3b69ec57d8e03b94a0b31b1c6', '[\"*\"]', NULL, NULL, '2025-04-01 18:32:18', '2025-04-01 18:32:18'),
(339, 'App\\Models\\User', 89, 'authToken', '39bcdf30e37386e6f18d93f98862bcd15df3174f7963dea988b19889c67978ff', '[\"*\"]', NULL, NULL, '2025-04-01 18:32:27', '2025-04-01 18:32:27'),
(340, 'App\\Models\\User', 90, 'authToken', '961043cf51af654574e1b6a0a5b22fe1fe2248efb701cf2c2d34cf602c81b544', '[\"*\"]', NULL, NULL, '2025-04-01 18:40:01', '2025-04-01 18:40:01'),
(341, 'App\\Models\\User', 91, 'authToken', '59c74e5be20214e626895cfd09dd9da01d0788780b143918a0b710f8fc5333e8', '[\"*\"]', NULL, NULL, '2025-04-01 18:42:02', '2025-04-01 18:42:02'),
(342, 'App\\Models\\User', 91, 'authToken', '6bb9c89fa32f9c5f373132c2f382c67847485322f6ca9950118484ab325e9044', '[\"*\"]', NULL, NULL, '2025-04-01 18:42:24', '2025-04-01 18:42:24'),
(343, 'App\\Models\\User', 92, 'authToken', '63d2876d04a83e2ab8874be59309129daf0bd0ab9ad886c57cf36efcef0c0e95', '[\"*\"]', NULL, NULL, '2025-04-01 18:43:53', '2025-04-01 18:43:53'),
(344, 'App\\Models\\User', 92, 'authToken', '9c8d9896326ac4c6fde78a97f7b1ccbd91576284eabc0e60404a8ea6e2a3459f', '[\"*\"]', NULL, NULL, '2025-04-01 18:44:06', '2025-04-01 18:44:06'),
(345, 'App\\Models\\User', 92, 'authToken', '87f6bd2b9c3ade04b88eaf34b136c8bfb2deccdb2a22804cea6976215e430e56', '[\"*\"]', NULL, NULL, '2025-04-01 18:44:18', '2025-04-01 18:44:18'),
(347, 'App\\Models\\User', 93, 'authToken', '782843fcfadd39dfb32c14ee5bc1991816dccce62db9c86fb4ff4613c94fae45', '[\"*\"]', NULL, NULL, '2025-04-01 19:28:02', '2025-04-01 19:28:02'),
(348, 'App\\Models\\User', 94, 'authToken', 'f3439cd39f4231d607fcef232f8f8ce1bd14d4d4bfd166bfd746b5a31fcec2fa', '[\"*\"]', NULL, NULL, '2025-04-01 19:29:30', '2025-04-01 19:29:30'),
(349, 'App\\Models\\User', 94, 'authToken', '8c2eae38d506a161e2224e127ef32a2f1ec01437f4503b322256c60519879317', '[\"*\"]', NULL, NULL, '2025-04-01 19:29:55', '2025-04-01 19:29:55'),
(350, 'App\\Models\\User', 95, 'authToken', '25676178b2d7b3e947c01e20fb2b2a85a564bdfde752be5ba0ee5c14cd60a398', '[\"*\"]', NULL, NULL, '2025-04-01 19:34:06', '2025-04-01 19:34:06'),
(388, 'App\\Models\\User', 96, 'authToken', '54b76c1a76e329cf7a27facde3364dc84aaded2dee8d17282b649925b38e6ba6', '[\"*\"]', NULL, NULL, '2025-04-28 21:10:46', '2025-04-28 21:10:46'),
(389, 'App\\Models\\User', 96, 'authToken', '57eac9b4166316d7b8f2d07c463c276634368b8f22910cd4dd0e294b149be8b5', '[\"*\"]', NULL, NULL, '2025-04-28 21:11:05', '2025-04-28 21:11:05'),
(394, 'App\\Models\\User', 33, 'authToken', 'd3e70e1d3d09ace768cdcfe53baf4d5564998dff6f35b2871851945f880cd107', '[\"*\"]', '2025-04-28 23:44:31', NULL, '2025-04-28 23:06:34', '2025-04-28 23:44:31'),
(395, 'App\\Models\\User', 23, 'authToken', 'b94878c8a507fae7ea3086f303d535354bdb7ff7cca9103a2ca8e2b332449a0e', '[\"*\"]', '2025-04-29 01:35:58', NULL, '2025-04-28 23:25:23', '2025-04-29 01:35:58'),
(396, 'App\\Models\\User', 33, 'authToken', 'acdf037c127d90bf126aa5964ba20ed47b605e952924fe76feef470d7319cc5f', '[\"*\"]', '2025-04-29 01:27:48', NULL, '2025-04-29 01:20:37', '2025-04-29 01:27:48'),
(397, 'App\\Models\\User', 33, 'authToken', 'abad13316570f85148455bc39261b00f68cf19732af686535181928fd59b178b', '[\"*\"]', '2025-04-29 22:08:43', NULL, '2025-04-29 16:32:15', '2025-04-29 22:08:43'),
(398, 'App\\Models\\User', 23, 'authToken', '7115d3a2210a54b6d1f988b1132ef1f6a36364d94c837d283a56c3ca17cc0f9b', '[\"*\"]', '2025-04-29 17:50:21', NULL, '2025-04-29 16:33:20', '2025-04-29 17:50:21'),
(399, 'App\\Models\\User', 23, 'authToken', 'c2c371ebbad88d42a8b62fd09c65045763db4d2d5caf3e262b588a82abac897d', '[\"*\"]', '2025-04-29 21:43:11', NULL, '2025-04-29 18:24:03', '2025-04-29 21:43:11');

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `id` bigint NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `file` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `radio_try`
--

CREATE TABLE `radio_try` (
  `id` bigint NOT NULL,
  `radio` varchar(123) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sent_emails`
--

CREATE TABLE `sent_emails` (
  `id` bigint UNSIGNED NOT NULL,
  `to` json NOT NULL,
  `cc` json NOT NULL,
  `subject` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `body` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sent_emails`
--

INSERT INTO `sent_emails` (`id`, `to`, `cc`, `subject`, `body`, `created_at`, `updated_at`) VALUES
(1, '[\"arieljamesdeguzman321@gmai.com\"]', 'null', 'daddas', '<p>asdasd</p>', '2025-04-02 19:13:52', '2025-04-02 19:13:52'),
(2, '[\"arieljamesdeguzman321@gmail.com\"]', 'null', 'asdasd', '<p>asdasdasas</p>', '2025-04-02 19:27:13', '2025-04-02 19:27:13'),
(3, '[\"arieljamesdeguzman321@gmail.com\", \"arieljamesdeguzman123@gmail.com\"]', 'null', 'Double Send', '<p>asdadasdsaasds</p>', '2025-04-02 19:28:34', '2025-04-02 19:28:34'),
(4, '[\"capioallan091925@gmail.com\"]', 'null', 'Cupal Sent a Message', '<p>Mabili lang ako tubig sa labas, may baon ako</p>', '2025-04-02 19:34:59', '2025-04-02 19:34:59'),
(5, '[\"capioallan091929@gmail.com\"]', 'null', 'asddasd', '<p>asasadasdas</p>', '2025-04-02 19:36:45', '2025-04-02 19:36:45'),
(6, '[\"arieljamesdeguzman321@gmail.com\", \"arieljamesdeguzman123@gmail.com\"]', 'null', 'Double Send', '<p>asdadasdsaasds</p>', '2025-04-02 19:28:34', '2025-04-02 19:28:34'),
(7, '[\"arieljamesdeguzman321@gmail.com\"]', 'null', 'asdasd', '<p>asdasdasas</p>', '2025-04-02 19:27:13', '2025-04-02 19:27:13'),
(8, '[\"arieljamesdeguzman321@gmail.com\"]', 'null', 'asdasd', '<p>asdasdasas</p>', '2025-04-02 19:27:13', '2025-04-02 19:27:13'),
(9, '[\"arieljamesdeguzman321@gmail.com\", \"cartagenarizalyn@gmail.com\"]', 'null', 'TEST', '<p>asdadasdasdasdadasda</p>', '2025-04-03 00:38:58', '2025-04-03 00:38:58'),
(10, '[\"arieljamesdeguzman321@gmail.com\", \"cartagenarizalyn@gmail.com\"]', 'null', 'TEST', '<p>asdadasdasasdas</p>', '2025-04-03 00:39:43', '2025-04-03 00:39:43'),
(11, '[\"arieljamesdeguzman321@gmail.com\"]', 'null', 'Asdadadasd', '<p>asadasdasd</p>', '2025-04-03 23:21:12', '2025-04-03 23:21:12'),
(12, '[\"arieljamesdeguzman321@gmail.com\"]', '[\"arieljamesdeguzman123@gmail.com\", \"capioallan091929@gmail.com\"]', 'Test Again Multiple', '<p>adadasdsaasasas</p>', '2025-04-03 23:42:10', '2025-04-03 23:42:10'),
(13, '[\"arieljamesdeguzman321@gmail.com\"]', '[\"arieljamesdeguzman123@gmail.com\"]', 'asdsdsadasd', '<p>ssaasdsadsad</p>', '2025-04-03 23:46:44', '2025-04-03 23:46:44'),
(14, '[\"arieljamesdeguzman321@gmail.com\"]', '[]', 'TRYING CKEDITOR', '<h2>ALLAN <i>IS</i> <strong>CUPS!</strong></h2><h4>Allan is a very gud man!</h4><blockquote><p>Allan is a very gud man!</p></blockquote><figure class=\"table\"><table><tbody><tr><td>asdasdada</td><td>adadasdsad</td></tr><tr><td>sadadd</td><td>asdasdasdasds</td></tr></tbody></table></figure>', '2025-04-04 00:31:24', '2025-04-04 00:31:24'),
(15, '[\"arieljamesdeguzman321@gmail.com\"]', '[\"arieljamesdeguzman123@gmail.com\"]', 'ADadasdasas', '<p>aasdsadasdasdasd</p>', '2025-04-04 00:35:41', '2025-04-04 00:35:41'),
(16, '[\"arieljamesdeguzman321@gmail.com\"]', '[\"arieljamesdeguzman123@gmail.com\", \"deguzmanarieljames@gmail.com\", \"capioallan091929@gmail.com\"]', 'TESTING TEXT EDITOR AND NEW USER INTERFACE', '<h3>HELLO!<br><br><i>Welcome to my System!</i><br><br>I want to share this as proof!</h3><figure class=\"table\"><table><tbody><tr><td>TABLE</td><td>NAME</td></tr><tr><td>1</td><td>ARIEL DE GUZMAN</td></tr><tr><td>2</td><td>JAMES DE GUZMAN</td></tr></tbody></table></figure><p>Above is the table</p>', '2025-04-04 01:11:09', '2025-04-04 01:11:09'),
(17, '[\"capioallan091929@gmail.com\"]', '[\"arieljamesdeguzman321@gmail.com\", \"deguzmanarieljames@gmail.com\"]', 'CUPAL SI ALLAN', '<h2>ALLAN IS CUPAL</h2><p>asdadasdasdasdasdasd</p><p>adad</p><p>asda</p><p>sda</p><p>sdasd</p><figure class=\"table\"><table><tbody><tr><td>a</td><td>sad</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>ad</td><td>ad</td></tr><tr><td>asdasd</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>ada</td><td>&nbsp;</td></tr></tbody></table></figure>', '2025-04-04 01:31:41', '2025-04-04 01:31:41'),
(18, '[\"arieljamesdeguzman321@gmail.com\"]', '[]', 'sddsad', '<p>sddsadas</p>', '2025-04-04 01:36:51', '2025-04-04 01:36:51'),
(19, '[\"arieljamesdeguzman321@gmail.com\"]', '[]', 'Math', '<p>2233232</p>', '2025-04-04 01:38:51', '2025-04-04 01:38:51'),
(20, '[\"capioallan091929@gmail.com\"]', '[\"arieljamesdeguzman123@gmail.com\"]', 'Henlo', '<h2>asdsadasassa</h2>', '2025-04-08 01:09:43', '2025-04-08 01:09:43'),
(21, '[\"capioallan091929@gmail.com\"]', '[\"arieljamesdeguzman321@gmail.com\", \"arieljamesdeguzman123@gmail.com\"]', 'Hellooooooooooooooo', '<p>asdasasaaas</p>', '2025-04-08 01:13:00', '2025-04-08 01:13:00'),
(22, '[\"capioallan091929@gmail.com\"]', '[\"arieljamesdeguzman123@gmail.com\"]', 'Table Try', '<p>adadadas</p><figure class=\"table\"><table><tbody><tr><td>sad</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>addsdadadasdas</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>addasdsaas</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table></figure><p>addaadddad</p>', '2025-04-10 16:44:28', '2025-04-10 16:44:28'),
(23, '[\"arieljamesdeguzman123@gmail.com\"]', '[]', 'asadsadsa', '<p>dsadsadasdsa</p>', '2025-04-28 21:09:36', '2025-04-28 21:09:36'),
(24, '[\"arieljamesdeguzman123@gmail.com\"]', '[\"rizalyn@gmail.com\", \"deguzmanarieljames@gmail.com\", \"charmbloodwain29@gmail.com\"]', 'Test Email Sending', '<figure class=\"table\"><table><tbody><tr><td>Column 1</td><td>Column 2</td><td>Column 3</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>1</td><td>32</td><td>rwwed</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>2</td><td>12</td><td>swfsdf</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>3</td><td>12</td><td>sdfdsf</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table></figure><p><i><strong><u>Sample Email Message</u></strong></i></p>', '2025-04-28 23:35:08', '2025-04-28 23:35:08'),
(25, '[\"arieljamesdeguzman123@gmail.com\"]', '[]', 'Hellooooooooooooooo', '<p>asdasdaasdasdasdasdasdasdasd</p><figure class=\"table\"><table><tbody><tr><td><strong>21212321adas</strong></td><td><strong>sadasdsadasdsa</strong></td></tr><tr><td>1321321321</td><td>adadasd</td></tr></tbody></table></figure>', '2025-04-28 23:36:20', '2025-04-28 23:36:20'),
(26, '[\"arieljamesdeguzman123@gmail.com\"]', '[\"mshifu1116@gmail.com\"]', 'Helloooooooooooooooasdad', '<p>adadasdasdasdasd</p><figure class=\"table\"><table><tbody><tr><td><strong>dadasdsadsa</strong></td><td><strong>adsadsadsa</strong></td></tr><tr><td>assdasd</td><td>sadsadsadsa</td></tr></tbody></table></figure>', '2025-04-28 23:37:35', '2025-04-28 23:37:35');

-- --------------------------------------------------------

--
-- Table structure for table `table_longer`
--

CREATE TABLE `table_longer` (
  `id` bigint NOT NULL,
  `text` varchar(123) NOT NULL,
  `email` varchar(123) NOT NULL,
  `birth_date` datetime NOT NULL,
  `file` varchar(123) NOT NULL,
  `text_area` varchar(123) NOT NULL,
  `gender` varchar(123) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `table_longer`
--

INSERT INTO `table_longer` (`id`, `text`, `email`, `birth_date`, `file`, `text_area`, `gender`, `created_at`, `updated_at`) VALUES
(1, 'aSssSSADADADASD', 'arieljamesdeguzman321@gmail.com', '2025-04-30 09:29:00', 'kWRZY3fRhY.jpeg', 'SASASADSADSADSADDADSDADADADSADSADSA', 'Male', '2025-04-29 17:29:19', '2025-04-29 17:29:19');

-- --------------------------------------------------------

--
-- Table structure for table `testalltools`
--

CREATE TABLE `testalltools` (
  `id` bigint NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `age` varchar(255) NOT NULL,
  `favorite_food` varchar(255) NOT NULL,
  `birth_date` datetime NOT NULL,
  `gender` json NOT NULL,
  `favorite_color` varchar(255) NOT NULL,
  `file` varchar(255) NOT NULL,
  `describe_yourself` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `testalltools`
--

INSERT INTO `testalltools` (`id`, `full_name`, `email`, `age`, `favorite_food`, `birth_date`, `gender`, `favorite_color`, `file`, `describe_yourself`, `created_at`, `updated_at`) VALUES
(2, 'Ariel James De Guzman', 'arieljamesdeguzman321@gmail.com', '22', 'Menudo', '2025-04-10 15:26:00', '\"[\\\"Male\\\"]\"', 'Green', 'NQ9nMpCRem.jpg', 'adaassashdkashdiashdajshdashdkjashdkajsdkjashd', '2025-04-28 23:26:50', '2025-04-28 23:26:50');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_visible` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `name`, `message`, `is_visible`, `created_at`, `updated_at`) VALUES
(4, 'Emily Davis', 'What impressed me the most about this platform is how it simplifies complex operations without compromising on functionality. From real-time updates to comprehensive reporting, everything is designed with the end-user in mind. I\'ve noticed a significant improvement in my team\'s collaboration and overall performance. The exceptional support and continuous enhancements make it a standout choice in the market.', 1, NULL, '2025-04-28 00:25:00'),
(5, 'Samantha Thompson', 'I was amazed by the level of detail and the thoughtful design that went into creating this testimonial feature. It\'s not just about managing reviews; it’s about building trust and a strong community around our brand. The tool has enabled us to showcase genuine customer experiences in an engaging and impactful way. The reliability and forward-thinking design of the platform truly set it apart from others.', 0, NULL, '2025-04-28 19:40:42'),
(9, 'John Leynard Chequito', '\"From the moment we engaged with [Brand Name], it was clear we were dealing with professionals who are truly passionate about what they do. Their process is meticulous, their communication is flawless, and the results are simply outstanding. They took the time to understand our brand deeply and translated our vision into something even better than we imagined. It\'s not often you find a partner who treats your project as if it were their own, but that\'s exactly the experience we had. Highly recommend to anyone looking for top-tier service!\"', 0, '2025-04-28 00:10:22', '2025-04-28 21:41:14'),
(12, 'James Bond', 'The meeting served as a platform for team members to discuss ongoing projects, align on key objectives, and address any outstanding issues. It began with a brief overview of previous action items, followed by detailed updates from each department. Key topics included project timelines, resource allocation, and strategies for overcoming current challenges. Participants actively contributed ideas, raised concerns, and collaborated to develop actionable next steps. The meeting concluded with a clear summary of responsibilities, deadlines, and a commitment to follow up on progress during the next scheduled session. Overall, the meeting fostered communication, encouraged teamwork, and reinforced the shared goals of the organization.', 1, '2025-04-28 21:40:41', '2025-04-28 21:41:01'),
(13, 'Happiness Joyful', '\"I can\'t speak highly enough about my experience with [Service or Product Name]. They are more than just a vendor — they are a partner, a guide, and a true expert in their field. Their dedication to quality, innovation, and client satisfaction shines through in every interaction. The impact they\'ve had on our organization is immeasurable, from boosting our operational efficiency to enhancing our customer satisfaction ratings. I am consistently impressed by their ability to deliver above and beyond expectations.\"', 1, '2025-04-28 21:40:58', '2025-04-28 21:41:00'),
(14, 'Robert Browns', 'The meeting served as a platform for team members to discuss ongoing projects, align on key objectives, and address any outstanding issues. It began with a brief overview of previous action', 1, '2025-04-28 23:39:34', '2025-04-28 23:39:37');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usertype` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_image` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `authToken` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `if_verified` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'unverified',
  `permitted_route` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '["/Userface/Dashboard","/Userface/Form","/Userface/Profile","/Userface/Table","/Userface/User"]',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `fullname`, `email`, `usertype`, `status`, `password`, `profile_image`, `authToken`, `if_verified`, `permitted_route`, `created_at`, `updated_at`) VALUES
(23, 'eryeljeyms', 'Ariel James De Guzman', 'scharmbloodwain29@gmail.com', 'user', 'Allowed', '$2y$12$ahfVylHwOO3L5m86OCA4SOB5o1Uak7I50N92qaYUI./izV2Lei.ve', 'profile_images/1745376771_download.jpeg', '399|yOKyHEKID1nMe6MS7dpmZ6OqRoKIgfjWEz0dFD3A04f52a52', 'verified', '[\"\\/Userface\\/Dashboard\",\"\\/Userface\\/Form\",\"\\/Userface\\/Table\",\"\\/Userface\\/User\"]', '2025-02-19 22:20:59', '2025-04-30 02:24:03'),
(33, 'master_eryel', 'Ariel Jamess Aljecera De Guzman', 'arieljamessdeguzman321@gmail.com', 'admin', 'Allowed', '$2y$12$KXW4qWZgwN44FHkobdymaOJ1.p/.fyWnODqhKmsL8Y63cEqwIEVF.', 'profile_images/1745918863_download (1).jpeg', '397|evgaMjTc0IghzF0pwfKES636tHd8XYgUN4dBtqO9e6f7a0d9', 'verified', '[\"/Userface/Dashboard\",\"/Userface/Form\",\"/Userface/Profile\",\"/Userface/Table\",\"/Userface/User\"]', '2024-02-20 17:13:50', '2025-04-30 00:32:15'),
(34, 'joriel', 'Joriel De Guzman', 'joriel@gmail.com', 'admin', 'pending', '$2y$12$kDuiJuGeMRQCW0VyK77xjebHJV7JD.L2eUi9n4Jo6E7aS67iEm4zG', 'profile_images/1740100855_447781243_1008606420968948_3557949476097395068_n.jpg', NULL, 'unverified', '[\"/Userface/Dashboard\",\"/Userface/Form\",\"/Userface/Profile\",\"/Userface/Table\",\"/Userface/User\"]', '2025-02-20 17:20:56', '2025-02-21 01:20:56'),
(35, 'charmel', 'Charmel M. De Guzman', 'charm@gmail.com', 'user', 'Blocked', '$2y$12$dZ29k52i6GndlokuOsoHQuRnZDnxiS8qEZq6FxuN8dp6l858odAZG', 'profile_images/1740123637_admin-icon.png', '156|hYupEi2oDHUdsgobrwL2vF6QoOhLZLQptVQxHYgz72933043', 'unverified', '[\"\\/Userface\\/Dashboard\",\"\\/Userface\\/Table\",\"\\/Userface\\/User\",\"\\/Userface\\/Form\",\"\\/Userface\\/Profile\"]', '2025-02-20 23:36:47', '2025-04-23 02:47:55'),
(36, 'justin', 'Justin De Castro', 'justin@gmail.com', 'admin', 'pending', '$2y$12$PkDpaw1/Nml6JUnftwTxgeyFHqGkq9UjsShm8p/xBaXgsCwK25OzO', 'profile_images/1740123832_user-icon.png', '108|IFedrIcMqvmEiWDr0lVdZUrwoKGExCDzKLuGWxAjb79f6b11', 'unverified', '[\"/Userface/Dashboard\",\"/Userface/Form\",\"/Userface/Profile\",\"/Userface/Table\",\"/Userface/User\"]', '2025-02-20 23:43:52', '2025-02-24 01:10:46'),
(37, 'allancapios', 'Allan Capio', 'allancapio@gmail.com', 'user', 'Allowed', '$2y$12$ckdLYgVeLAEFw.ExH6QsWu6CLHwZBnusJgKBdEIUZTnU1u5rmtf1C', 'profile_images/1740236424_444481530_2225530571127267_3935351773097404240_n (3).jpg', '127|lQuWpYV1VgsaYjBP9AlyO4Bih4xG859RBPG5CIFs7b270125', 'unverified', '[\"\\/Userface\\/Dashboard\",\"\\/Userface\\/Form\",\"\\/Userface\\/Table\",\"\\/Userface\\/User\"]', '2025-02-22 07:00:24', '2025-04-29 03:14:30'),
(38, 'juan', 'Juan Tamad', 'juan@gmail.com', 'admin', 'pending', '$2y$12$K1wtjuJBxnX4GE9Me.K4LegDk55qYtxExIjF6JRCkc.BrzttJ5Y.i', 'profile_images/1740365291_dew.jpg', NULL, 'unverified', '[\"/Userface/Dashboard\",\"/Userface/Form\",\"/Userface/Profile\",\"/Userface/Table\",\"/Userface/User\"]', '2025-02-23 18:48:11', '2025-02-24 02:48:11'),
(39, 'salmon', 'Salmon Salad', 'salmon@gmail.com', 'admin', 'pending', '$2y$12$1yT7FPw3vpcZAd4imn.uH.Cjq1rRTeXTIh/77n2Udrlow3.VlUoqa', 'profile_images/1740365747_admin-icon.png', NULL, 'unverified', '[\"/Userface/Dashboard\",\"/Userface/Form\",\"/Userface/Profile\",\"/Userface/Table\",\"/Userface/User\"]', '2025-02-23 18:55:47', '2025-02-24 02:55:47'),
(40, 'sumpak', 'Sumpak Wangdu', 'sumpak@gmail.com', 'user', 'pending', '$2y$12$C2djbfRhNQqbHq1XigBcaepRUCryfADHxEr61ujrzhfjVJKYF5WvW', 'profile_images/1740446314_7451abb3-a372-410f-a802-2a9831f23189.jpg', '246|Mbt6UniNulN6CPWeGrN4U53SCcWhujyc8ZafCXuB8b2e9e2f', 'unverified', '[\"\\/Userface\\/Dashboard\",\"\\/Userface\\/Form\",\"\\/Userface\\/Profile\"]', '2025-02-24 17:18:34', '2025-03-20 06:49:28'),
(41, 'salamander', 'Salaman Der', 'salamander@gmail.com', 'user', 'pending', '$2y$12$PJZovo0GvQI167IMIoryT.V7MQ5gKwYC8BDjQHfgsOWubxwNsR4Z.', 'profile_images/1740448479_700674.png', NULL, 'unverified', '[\"/Userface/Dashboard\",\"/Userface/Form\",\"/Userface/Profile\",\"/Userface/Table\",\"/Userface/User\"]', '2025-02-24 17:54:39', '2025-02-25 01:54:39'),
(43, 'kambal', 'Kambal Kambal', 'kambal@gmail.com', 'user', 'Blocked', '$2y$12$rQDhJCzBPVzcEV7ndbmba.0IA2M2ZJPLcIZLdeJEvf5z7TKrYz5uy', 'profile_images/1740449054_474865537_1591403721738391_5733170716960327723_n.png', NULL, 'unverified', '[\"\\/Userface\\/Dashboard\",\"\\/Userface\\/Form\",\"\\/Userface\\/Table\",\"\\/Userface\\/User\"]', '2025-02-24 17:04:15', '2025-03-28 05:49:11'),
(52, 'sampongutos', 'Sampong Utos', 'sampong@gmail.com', 'admin', 'pending', '$2y$12$bDIQB/HUIp5zx/IuX.6i0.mEvzAHWQ8cMHHiSA4QLQW.RND.KhbxW', 'profile_images/1743141954_ai-generated-beautiful-nature-mountain-scenery-professionalgraphy-photo.jpg', NULL, 'unverified', '[\"/Userface/Dashboard\",\"/Userface/Form\",\"/Userface/Profile\",\"/Userface/Table\",\"/Userface/User\"]', '2025-03-27 22:05:54', '2025-03-28 06:05:54'),
(54, 'asdasddasdasasa', 'adadasdasdasas', 'arieljamesdegsuzman321@gmail.com', 'user', 'pending', '$2y$12$SylQOeOtjO7QYMWy6lAJBu02G5JvzFcVtJbUOMHsk4LZSdYjDkaLW', 'profile_images/1743150352_1380963.jpg', NULL, 'unverified', '[\"/Userface/Dashboard\",\"/Userface/Form\",\"/Userface/Profile\",\"/Userface/Table\",\"/Userface/User\"]', '2025-03-28 00:25:52', '2025-03-28 08:25:52'),
(55, 'asdasdsaa', 'asefedsasdas', 'arieljamesdegsuzmans321@gmail.com', 'user', 'pending', '$2y$12$k933iRzQs2Le3KXo353N0eItRZqj8f95ddh6wGG9i46vsxslrYrCO', 'profile_images/1743150449_1380963.jpg', NULL, 'unverified', '[\"/Userface/Dashboard\",\"/Userface/Form\",\"/Userface/Profile\",\"/Userface/Table\",\"/Userface/User\"]', '2025-03-28 00:27:29', '2025-03-28 08:27:29'),
(95, 'eryeljeymss', 'Ariel De Guzman', 'arieljamesdeguzmansss321@gmail.com', 'user', 'pending', '$2y$12$IX.gvqTelcaeHK/sge1w6e74Ok4UIi/wiFcR68Q3qkXH.LmCEFxte', 'profile_images/1743564846_1380963.jpg', '350|2alaKSyeSmtx4QWU5Xb0nqFB3ownPAZCjUYDBFYa68353e51', 'unverified', '[\"/Userface/Dashboard\",\"/Userface/Form\",\"/Userface/Profile\",\"/Userface/Table\",\"/Userface/User\"]', '2025-04-01 19:34:06', '2025-04-02 03:34:06'),
(96, 'testusername', 'Test Full Name', 'arieljamesdeguzman3521@gmail.com', 'user', 'pending', '$2y$12$MtjbI8w33m7UQu8aq9Ux3efSgbBIiE9/aJ/4VUra8wJgoSwwZD2LW', 'profile_images/1745903446_Anime Live Wallpapers 4K HD.jpeg', '389|TIZa4JbcTfaK5OGYuoSuX65TqfIJIr8riU2GNmfleb28aafb', 'verified', '[\"/Userface/Dashboard\",\"/Userface/Form\",\"/Userface/Profile\",\"/Userface/Table\",\"/Userface/User\"]', '2025-04-28 21:10:46', '2025-04-29 05:11:05');

-- --------------------------------------------------------

--
-- Table structure for table `users_archive`
--

CREATE TABLE `users_archive` (
  `id` bigint NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `usertype` varchar(10) NOT NULL,
  `password` varchar(255) NOT NULL,
  `authToken` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adminreusable`
--
ALTER TABLE `adminreusable`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `agendas`
--
ALTER TABLE `agendas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `all_tools_all_in`
--
ALTER TABLE `all_tools_all_in`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `checkbox_options`
--
ALTER TABLE `checkbox_options`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `checks_table`
--
ALTER TABLE `checks_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `check_table`
--
ALTER TABLE `check_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `color_table`
--
ALTER TABLE `color_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `forms`
--
ALTER TABLE `forms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `galleries`
--
ALTER TABLE `galleries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `input_longer`
--
ALTER TABLE `input_longer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `longer`
--
ALTER TABLE `longer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mikmik`
--
ALTER TABLE `mikmik`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `radio_try`
--
ALTER TABLE `radio_try`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sent_emails`
--
ALTER TABLE `sent_emails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `table_longer`
--
ALTER TABLE `table_longer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testalltools`
--
ALTER TABLE `testalltools`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `users_archive`
--
ALTER TABLE `users_archive`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adminreusable`
--
ALTER TABLE `adminreusable`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `agendas`
--
ALTER TABLE `agendas`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `all_tools_all_in`
--
ALTER TABLE `all_tools_all_in`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `audit_logs`
--
ALTER TABLE `audit_logs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT for table `checkbox_options`
--
ALTER TABLE `checkbox_options`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `checks_table`
--
ALTER TABLE `checks_table`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `check_table`
--
ALTER TABLE `check_table`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `color_table`
--
ALTER TABLE `color_table`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `forms`
--
ALTER TABLE `forms`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=186;

--
-- AUTO_INCREMENT for table `galleries`
--
ALTER TABLE `galleries`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `input_longer`
--
ALTER TABLE `input_longer`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `longer`
--
ALTER TABLE `longer`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `mikmik`
--
ALTER TABLE `mikmik`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=549;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=400;

--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `radio_try`
--
ALTER TABLE `radio_try`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sent_emails`
--
ALTER TABLE `sent_emails`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `table_longer`
--
ALTER TABLE `table_longer`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `testalltools`
--
ALTER TABLE `testalltools`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT for table `users_archive`
--
ALTER TABLE `users_archive`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
