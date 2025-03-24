-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 24, 2025 at 01:00 AM
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
-- Table structure for table `attendance_monitoring`
--

CREATE TABLE `attendance_monitoring` (
  `id` bigint NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `section` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `birthdate` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `attendance_monitoring`
--

INSERT INTO `attendance_monitoring` (`id`, `fullname`, `section`, `email`, `subject`, `birthdate`, `created_at`, `updated_at`) VALUES
(3, 'Charmel Montellanos', '4F2', 'charmbloodwain29@gmail.com', 'Science', '2025-03-14 08:39:00', '2025-03-11 16:39:47', '2025-03-11 22:27:59'),
(4, 'Allan C. Capio', '4F3', 'allancapio@gmail.com', 'Capstone', '2025-03-06 08:52:00', '2025-03-11 16:52:48', '2025-03-11 16:52:48'),
(5, 'Jhunnel De Jesus', '4F1', 'jhunz@gmail.com', 'Programming', '2025-03-13 08:57:00', '2025-03-11 16:58:00', '2025-03-11 16:58:00');

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
(24, 'Ariel James De Guzmans was Allowed to Login', 'unread', '/User', '2025-03-20 18:41:24', '2025-03-20 18:41:24');

-- --------------------------------------------------------

--
-- Table structure for table `check_table`
--

CREATE TABLE `check_table` (
  `id` bigint NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `section` varchar(25) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `forms`
--

INSERT INTO `forms` (`id`, `fields`, `tableName`, `status`, `backend`, `created_at`, `updated_at`) VALUES
(27, '[{\"id\": \"section-1\", \"fields\": [{\"id\": \"100\", \"type\": \"text\", \"label\": \"Full Name\", \"length\": \"255\", \"datatype\": \"VARCHAR\", \"required\": true, \"columnName\": \"fullname\", \"placeholder\": \"Enter text\"}, {\"id\": \"101\", \"type\": \"text\", \"label\": \"Section\", \"length\": \"255\", \"datatype\": \"VARCHAR\", \"required\": true, \"columnName\": \"section\", \"placeholder\": \"Enter text\"}]}, {\"id\": \"section-2\", \"fields\": [{\"id\": \"102\", \"type\": \"email\", \"label\": \"Email\", \"length\": \"255\", \"datatype\": \"VARCHAR\", \"required\": true, \"columnName\": \"email\", \"placeholder\": \"Enter text\"}, {\"id\": \"103\", \"type\": \"text\", \"label\": \"Subject (Course/Code)\", \"length\": \"255\", \"datatype\": \"VARCHAR\", \"required\": true, \"columnName\": \"subject\", \"placeholder\": \"Enter text\"}, {\"id\": \"104\", \"type\": \"datetime\", \"label\": \"Birth Date\", \"datatype\": \"DATETIME\", \"required\": true, \"columnName\": \"birthdate\", \"placeholder\": \"Enter text\"}]}]', 'attendance_monitoring', 'disabled', 'done', '2025-03-11 01:02:08', '2025-03-20 21:43:56'),
(31, '[{\"id\": \"section-1\", \"fields\": [{\"id\": \"100\", \"type\": \"text\", \"label\": \"Full Name\", \"length\": \"255\", \"datatype\": \"VARCHAR\", \"required\": true, \"columnName\": \"fullname\", \"placeholder\": \"Enter text\"}, {\"id\": \"200\", \"type\": \"email\", \"label\": \"Email\", \"length\": \"255\", \"datatype\": \"VARCHAR\", \"required\": true, \"columnName\": \"email\", \"placeholder\": \"Enter email\"}, {\"id\": \"300\", \"type\": \"datetime\", \"label\": \"Birth Date\", \"length\": null, \"datatype\": \"DATETIME\", \"required\": false, \"columnName\": \"birthdate\", \"placeholder\": \"Enter age\"}]}]', 'try_table', 'enabled', 'done', '2025-03-12 00:46:58', '2025-03-20 21:43:56'),
(84, '[{\"id\": \"1\", \"fields\": [{\"id\": \"100\", \"type\": \"text\", \"label\": \"Full Name\", \"length\": \"255\", \"datatype\": \"VARCHAR\", \"required\": true, \"columnName\": \"fullname\", \"placeholder\": \"Enter text\", \"defaultOption\": \"defined\"}, {\"id\": \"101\", \"type\": \"text\", \"label\": \"Section\", \"length\": \"25\", \"datatype\": \"VARCHAR\", \"required\": true, \"columnName\": \"section\", \"placeholder\": \"Enter text\"}]}]', 'check_table', 'disabled', 'undone', '2025-03-23 16:43:56', '2025-03-23 16:43:56');

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
(8, '2025_03_20_011522_create_audit_logs_table', 5);

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
(436, 'Ariel James Aljecera De Guzmans has logged in successfully.', 'read', '/User', '2025-03-21 02:43:41', '2025-03-20 21:48:45'),
(437, 'Ariel James Aljecera De Guzmans has logged in successfully.', 'read', '/User', '2025-03-21 03:44:32', '2025-03-21 02:18:21'),
(438, 'Ariel James Aljecera De Guzmans has logged in successfully.', 'read', '/User', '2025-03-21 09:44:13', '2025-03-21 02:17:48'),
(439, 'Ariel James Aljecera De Guzmans has logged in successfully.', 'unread', '/User', '2025-03-23 07:22:10', '2025-03-22 23:22:10'),
(440, 'Ariel James Aljecera De Guzmans has logged in successfully.', 'unread', '/User', '2025-03-24 00:03:41', '2025-03-23 16:03:41'),
(441, 'Ariel James Aljecera De Guzmans has logged in successfully.', 'unread', '/User', '2025-03-24 00:04:01', '2025-03-23 16:04:01'),
(442, 'Ariel James Aljecera De Guzmans has logged in successfully.', 'unread', '/User', '2025-03-24 00:11:16', '2025-03-23 16:11:16');

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
(237, 'App\\Models\\User', 23, 'authToken', '0e7a7eccc4edcc98865b759568ec0dcc1d8ff4670bf339f1086376cb6c5271e9', '[\"*\"]', NULL, NULL, '2025-03-19 19:16:17', '2025-03-19 19:16:17'),
(238, 'App\\Models\\User', 40, 'authToken', 'e26f8427c7dea30aa7f466f6556a8adc6fa3c748d567056b15d31a13943e7ed5', '[\"*\"]', NULL, NULL, '2025-03-19 19:16:46', '2025-03-19 19:16:46'),
(239, 'App\\Models\\User', 40, 'authToken', 'd06cd381ccff91f5b1f6ba0f4927bf89c94f40a508bb114e3bc15366f2a4d614', '[\"*\"]', NULL, NULL, '2025-03-19 19:16:58', '2025-03-19 19:16:58'),
(240, 'App\\Models\\User', 40, 'authToken', '644a51b65eb826c8f047a1a475a28a969697ca74182820cf06cb534db549c51e', '[\"*\"]', NULL, NULL, '2025-03-19 19:17:10', '2025-03-19 19:17:10'),
(241, 'App\\Models\\User', 40, 'authToken', 'e5ac2785b301fdc146b270755a17e88f54cb35b0b479b13b6f5c04bae83f9c1a', '[\"*\"]', NULL, NULL, '2025-03-19 19:18:45', '2025-03-19 19:18:45'),
(242, 'App\\Models\\User', 23, 'authToken', '7b81d90d0923939d9038f58fa3161b288f70b670d73c827446a45b0dc07ec09c', '[\"*\"]', NULL, NULL, '2025-03-19 19:18:52', '2025-03-19 19:18:52'),
(243, 'App\\Models\\User', 40, 'authToken', '953db682d5d5ac8afb39ebf301c113687ff03534bd3bdd8245e2edd0024f4728', '[\"*\"]', NULL, NULL, '2025-03-19 19:19:04', '2025-03-19 19:19:04'),
(244, 'App\\Models\\User', 40, 'authToken', 'a74a0fed452f0f26b0a1aee3a47fd8f9059d723c745491d311fb29a9b3cc7164', '[\"*\"]', NULL, NULL, '2025-03-19 19:19:25', '2025-03-19 19:19:25'),
(245, 'App\\Models\\User', 40, 'authToken', 'c2b691833c439adcdd137592321928a1551ae3818a2bd73f7f9c9bc111746bed', '[\"*\"]', NULL, NULL, '2025-03-19 22:49:21', '2025-03-19 22:49:21'),
(246, 'App\\Models\\User', 40, 'authToken', '5ae55f54868f6bedbc74ed2a8a2b0d2f60d1a4a5b1134f1dcddd7f1c92d28d37', '[\"*\"]', NULL, NULL, '2025-03-19 22:49:28', '2025-03-19 22:49:28'),
(249, 'App\\Models\\User', 23, 'authToken', 'f99baa378c8fdc6dd86f4c19fed33e16fe92cb951aa9835c87ef16568169f163', '[\"*\"]', NULL, NULL, '2025-03-20 18:41:12', '2025-03-20 18:41:12'),
(250, 'App\\Models\\User', 23, 'authToken', '5784c30860ce0981cc428afb1c605f70d836e2d686a0a36c2e2848232c6f16b4', '[\"*\"]', '2025-03-20 23:04:41', NULL, '2025-03-20 18:41:29', '2025-03-20 23:04:41'),
(252, 'App\\Models\\User', 33, 'authToken', '4b0abc96c601b39b0a064bd14d5a59017a1fc70e6767f565bcc3ace17951dade', '[\"*\"]', '2025-03-21 00:58:45', NULL, '2025-03-20 19:44:33', '2025-03-21 00:58:45'),
(253, 'App\\Models\\User', 33, 'authToken', 'e657a247371b1b3d469c0cd4ce70e8114c252862884583ceac8a8eda6406c82c', '[\"*\"]', '2025-03-21 02:24:43', NULL, '2025-03-21 01:44:15', '2025-03-21 02:24:43'),
(254, 'App\\Models\\User', 33, 'authToken', '957d1e604073307b9a671deda498fb4aaa29e49c5e31d8639c1b65d00e71bcd1', '[\"*\"]', '2025-03-23 00:03:39', NULL, '2025-03-22 23:22:12', '2025-03-23 00:03:39'),
(255, 'App\\Models\\User', 33, 'authToken', '2ae7e9db407b26c973d3a77d8e063e3037219f683dc3eefc2be39ae7cd66fa3f', '[\"*\"]', '2025-03-23 16:46:06', NULL, '2025-03-23 16:11:24', '2025-03-23 16:46:06');

-- --------------------------------------------------------

--
-- Table structure for table `try_table`
--

CREATE TABLE `try_table` (
  `id` bigint NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `birthdate` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `try_table`
--

INSERT INTO `try_table` (`id`, `fullname`, `email`, `birthdate`, `created_at`, `updated_at`) VALUES
(1, 'Leslie Jean Riveras', 'arieljamesdeguzman321@gmail.com', '2025-03-16 15:46:00', '2025-03-15 23:46:52', '2025-03-19 17:44:28'),
(2, 'Rizalyn Cartagena', 'rizalyn@gmail.com', '2025-03-20 09:44:00', '2025-03-19 17:44:21', '2025-03-19 17:44:21');

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
  `permitted_route` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '["/Userface/Dashboard","/Userface/Form","/Userface/Profile","/Userface/Table","/Userface/User"]',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `fullname`, `email`, `usertype`, `status`, `password`, `profile_image`, `authToken`, `permitted_route`, `created_at`, `updated_at`) VALUES
(23, 'eryeljeyms', 'Ariel James De Guzmans', 'scharmbloodwain29@gmail.com', 'user', 'Allowed', '$2y$12$ahfVylHwOO3L5m86OCA4SOB5o1Uak7I50N92qaYUI./izV2Lei.ve', 'profile_images/1741920840_Main Scene Robot (1).gif', '250|AlxDT17Bq4nfJKfPXjfbGrvRWHVyg9ILTdGKPkVB093d72af', '[\"\\/Userface\\/Dashboard\",\"\\/Userface\\/Form\",\"\\/Userface\\/Table\",\"\\/Userface\\/Profile\"]', '2025-02-19 22:20:59', '2025-03-21 02:41:29'),
(33, 'master_eryel', 'Ariel James Aljecera De Guzmans', 'arieljamesdeguzman321@gmail.com', 'admin', 'Allowed', '$2y$12$KXW4qWZgwN44FHkobdymaOJ1.p/.fyWnODqhKmsL8Y63cEqwIEVF.', 'profile_images/1741446063_2984.jpg', '255|7pw66cVcWcSFt6k7pSvsmMJHP3Y7esCh1YRwnuFZ71e63b35', '[\"/Userface/Dashboard\",\"/Userface/Form\",\"/Userface/Profile\",\"/Userface/Table\",\"/Userface/User\"]', '2024-02-20 17:13:50', '2025-03-24 00:11:24'),
(34, 'joriel', 'Joriel De Guzman', 'joriel@gmail.com', 'admin', 'pending', '$2y$12$kDuiJuGeMRQCW0VyK77xjebHJV7JD.L2eUi9n4Jo6E7aS67iEm4zG', 'profile_images/1740100855_447781243_1008606420968948_3557949476097395068_n.jpg', NULL, '[\"/Userface/Dashboard\",\"/Userface/Form\",\"/Userface/Profile\",\"/Userface/Table\",\"/Userface/User\"]', '2025-02-20 17:20:56', '2025-02-21 01:20:56'),
(35, 'charmeluus', 'Charmel M. De Guzman', 'charm@gmail.com', 'user', 'Blocked', '$2y$12$dZ29k52i6GndlokuOsoHQuRnZDnxiS8qEZq6FxuN8dp6l858odAZG', 'profile_images/1740123637_admin-icon.png', '156|hYupEi2oDHUdsgobrwL2vF6QoOhLZLQptVQxHYgz72933043', '[\"\\/Userface\\/Dashboard\",\"\\/Userface\\/Table\",\"\\/Userface\\/User\",\"\\/Userface\\/Form\",\"\\/Userface\\/Profile\"]', '2025-02-20 23:36:47', '2025-03-12 08:35:24'),
(36, 'justin', 'Justin De Castro', 'justin@gmail.com', 'admin', 'pending', '$2y$12$PkDpaw1/Nml6JUnftwTxgeyFHqGkq9UjsShm8p/xBaXgsCwK25OzO', 'profile_images/1740123832_user-icon.png', '108|IFedrIcMqvmEiWDr0lVdZUrwoKGExCDzKLuGWxAjb79f6b11', '[\"/Userface/Dashboard\",\"/Userface/Form\",\"/Userface/Profile\",\"/Userface/Table\",\"/Userface/User\"]', '2025-02-20 23:43:52', '2025-02-24 01:10:46'),
(37, 'allancapio', 'Allan Capio', 'allancapio@gmail.com', 'user', 'Allowed', '$2y$12$ckdLYgVeLAEFw.ExH6QsWu6CLHwZBnusJgKBdEIUZTnU1u5rmtf1C', 'profile_images/1740236424_444481530_2225530571127267_3935351773097404240_n (3).jpg', '127|lQuWpYV1VgsaYjBP9AlyO4Bih4xG859RBPG5CIFs7b270125', '[\"\\/Userface\\/Dashboard\",\"\\/Userface\\/Form\",\"\\/Userface\\/Profile\",\"\\/Userface\\/User\",\"\\/Userface\\/Table\"]', '2025-02-22 07:00:24', '2025-03-14 01:36:59'),
(38, 'juan', 'Juan Tamad', 'juan@gmail.com', 'admin', 'pending', '$2y$12$K1wtjuJBxnX4GE9Me.K4LegDk55qYtxExIjF6JRCkc.BrzttJ5Y.i', 'profile_images/1740365291_dew.jpg', NULL, '[\"/Userface/Dashboard\",\"/Userface/Form\",\"/Userface/Profile\",\"/Userface/Table\",\"/Userface/User\"]', '2025-02-23 18:48:11', '2025-02-24 02:48:11'),
(39, 'salmon', 'Salmon Salad', 'salmon@gmail.com', 'admin', 'pending', '$2y$12$1yT7FPw3vpcZAd4imn.uH.Cjq1rRTeXTIh/77n2Udrlow3.VlUoqa', 'profile_images/1740365747_admin-icon.png', NULL, '[\"/Userface/Dashboard\",\"/Userface/Form\",\"/Userface/Profile\",\"/Userface/Table\",\"/Userface/User\"]', '2025-02-23 18:55:47', '2025-02-24 02:55:47'),
(40, 'sumpak', 'Sumpak Wangdu', 'sumpak@gmail.com', 'user', 'pending', '$2y$12$C2djbfRhNQqbHq1XigBcaepRUCryfADHxEr61ujrzhfjVJKYF5WvW', 'profile_images/1740446314_7451abb3-a372-410f-a802-2a9831f23189.jpg', '246|Mbt6UniNulN6CPWeGrN4U53SCcWhujyc8ZafCXuB8b2e9e2f', '[\"\\/Userface\\/Dashboard\",\"\\/Userface\\/Form\",\"\\/Userface\\/Profile\"]', '2025-02-24 17:18:34', '2025-03-20 06:49:28'),
(41, 'salamander', 'Salaman Der', 'salamander@gmail.com', 'user', 'pending', '$2y$12$PJZovo0GvQI167IMIoryT.V7MQ5gKwYC8BDjQHfgsOWubxwNsR4Z.', 'profile_images/1740448479_700674.png', NULL, '[\"/Userface/Dashboard\",\"/Userface/Form\",\"/Userface/Profile\",\"/Userface/Table\",\"/Userface/User\"]', '2025-02-24 17:54:39', '2025-02-25 01:54:39'),
(43, 'kambal', 'Kambal Kambal', 'kambal@gmail.com', 'user', 'pending', '$2y$12$rQDhJCzBPVzcEV7ndbmba.0IA2M2ZJPLcIZLdeJEvf5z7TKrYz5uy', 'profile_images/1740449054_474865537_1591403721738391_5733170716960327723_n.png', NULL, '[\"/Userface/Dashboard\",\"/Userface/Form\",\"/Userface/Profile\",\"/Userface/Table\",\"/Userface/User\"]', '2025-02-24 18:04:15', '2025-02-25 02:04:15'),
(44, 'sisidlan', 'Sisidlanng Bunga', 'sisidlan@gmail.com', 'user', 'Allowed', '$2y$12$mtpq3ctuOL9IiOYisPnwsuFkjF0hrDOUkKaNbg9z5ZRtPXy1JJZkC', 'profile_images/1740459140_2984.jpg', NULL, '[\"/Userface/Dashboard\",\"/Userface/Form\",\"/Userface/Profile\",\"/Userface/Table\",\"/Userface/User\"]', '2025-02-28 20:52:20', '2025-02-25 05:08:43');

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
-- Indexes for table `attendance_monitoring`
--
ALTER TABLE `attendance_monitoring`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `check_table`
--
ALTER TABLE `check_table`
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
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
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
-- Indexes for table `try_table`
--
ALTER TABLE `try_table`
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
-- AUTO_INCREMENT for table `attendance_monitoring`
--
ALTER TABLE `attendance_monitoring`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `audit_logs`
--
ALTER TABLE `audit_logs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `check_table`
--
ALTER TABLE `check_table`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `forms`
--
ALTER TABLE `forms`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=443;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=256;

--
-- AUTO_INCREMENT for table `try_table`
--
ALTER TABLE `try_table`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `users_archive`
--
ALTER TABLE `users_archive`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
