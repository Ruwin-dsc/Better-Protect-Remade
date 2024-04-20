-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : sam. 20 avr. 2024 à 13:58
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `betterbots`
--

-- --------------------------------------------------------

--
-- Structure de la table `antiban`
--

CREATE TABLE `antiban` (
  `guildId` varchar(255) DEFAULT NULL,
  `state` varchar(255) NOT NULL DEFAULT 'off',
  `logs` varchar(255) NOT NULL DEFAULT 'off',
  `permission` varchar(255) NOT NULL DEFAULT 'off',
  `punition` varchar(255) NOT NULL DEFAULT 'supprrole',
  `reste` varchar(255) NOT NULL DEFAULT 'proprioblanche',
  `intervalle` varchar(255) NOT NULL DEFAULT '10m',
  `maximum` varchar(255) NOT NULL DEFAULT '5'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `antibanlistuser`
--

CREATE TABLE `antibanlistuser` (
  `guildId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `antibot`
--

CREATE TABLE `antibot` (
  `guildId` varchar(255) DEFAULT NULL,
  `state` varchar(255) NOT NULL DEFAULT 'off',
  `logs` varchar(255) NOT NULL DEFAULT 'off',
  `permission` varchar(255) NOT NULL DEFAULT 'off',
  `punition` varchar(255) NOT NULL DEFAULT 'supprrole',
  `reste` varchar(255) NOT NULL DEFAULT 'proprioblanche'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `antibotlistuser`
--

CREATE TABLE `antibotlistuser` (
  `guildId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `antilink`
--

CREATE TABLE `antilink` (
  `guildId` varchar(255) DEFAULT NULL,
  `state` varchar(255) NOT NULL DEFAULT 'off',
  `logs` varchar(255) NOT NULL DEFAULT 'off',
  `permission` varchar(255) NOT NULL DEFAULT 'off',
  `punition` varchar(255) NOT NULL DEFAULT 'excluretempo',
  `reste` varchar(255) NOT NULL DEFAULT 'proprioblanche',
  `duree` varchar(255) NOT NULL DEFAULT '10s',
  `inclus` varchar(255) NOT NULL DEFAULT 'imagediscordlien'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `antilinkchannel`
--

CREATE TABLE `antilinkchannel` (
  `guildId` varchar(255) DEFAULT NULL,
  `channelId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `antilinklistuser`
--

CREATE TABLE `antilinklistuser` (
  `guildId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `antiroleadd`
--

CREATE TABLE `antiroleadd` (
  `guildId` varchar(255) DEFAULT NULL,
  `state` varchar(255) NOT NULL DEFAULT 'off',
  `logs` varchar(255) NOT NULL DEFAULT 'off',
  `permission` varchar(255) NOT NULL DEFAULT 'off',
  `punition` varchar(255) NOT NULL DEFAULT 'supprrole',
  `reste` varchar(255) NOT NULL DEFAULT 'proprioblanche'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `antiroleaddauser`
--

CREATE TABLE `antiroleaddauser` (
  `guildId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `antiroleaddperms`
--

CREATE TABLE `antiroleaddperms` (
  `guildId` varchar(255) DEFAULT NULL,
  `perm` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `antiroleaddrole`
--

CREATE TABLE `antiroleaddrole` (
  `guildId` varchar(255) DEFAULT NULL,
  `roleId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `antispam`
--

CREATE TABLE `antispam` (
  `guildId` varchar(255) DEFAULT NULL,
  `state` varchar(255) NOT NULL DEFAULT 'off',
  `logs` varchar(255) NOT NULL DEFAULT 'off',
  `permission` varchar(255) NOT NULL DEFAULT 'off',
  `punition` varchar(255) NOT NULL DEFAULT 'excluretempo',
  `reste` varchar(255) NOT NULL DEFAULT 'proprioblanche',
  `duree` varchar(255) NOT NULL DEFAULT '10s',
  `inclus` varchar(255) NOT NULL DEFAULT '0',
  `message` varchar(255) NOT NULL DEFAULT '5',
  `intervalle` varchar(255) NOT NULL DEFAULT '2s'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `antispamchannel`
--

CREATE TABLE `antispamchannel` (
  `guildId` varchar(255) DEFAULT NULL,
  `channelId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `antispamlistuser`
--

CREATE TABLE `antispamlistuser` (
  `guildId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `antithreadcreate`
--

CREATE TABLE `antithreadcreate` (
  `guildId` varchar(255) DEFAULT NULL,
  `state` varchar(255) NOT NULL DEFAULT 'off',
  `logs` varchar(255) NOT NULL DEFAULT 'off',
  `permission` varchar(255) NOT NULL DEFAULT 'off',
  `punition` varchar(255) NOT NULL DEFAULT 'supprrole',
  `reste` varchar(255) NOT NULL DEFAULT 'proprioblanche',
  `duree` varchar(255) NOT NULL DEFAULT '10s'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `antithreadcreatechannel`
--

CREATE TABLE `antithreadcreatechannel` (
  `guildId` varchar(255) DEFAULT NULL,
  `channelId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `antithreadcreatelistuser`
--

CREATE TABLE `antithreadcreatelistuser` (
  `guildId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `blacklist`
--

CREATE TABLE `blacklist` (
  `guildId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `createchannel`
--

CREATE TABLE `createchannel` (
  `guildId` varchar(255) DEFAULT NULL,
  `state` varchar(255) NOT NULL DEFAULT 'off',
  `logs` varchar(255) NOT NULL DEFAULT 'off',
  `permission` varchar(255) NOT NULL DEFAULT 'off',
  `punition` varchar(255) NOT NULL DEFAULT 'supprrole',
  `reste` varchar(255) NOT NULL DEFAULT 'proprioblanche'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `createchannellistuser`
--

CREATE TABLE `createchannellistuser` (
  `guildId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `createrole`
--

CREATE TABLE `createrole` (
  `guildId` varchar(255) DEFAULT NULL,
  `state` varchar(255) NOT NULL DEFAULT 'off',
  `logs` varchar(255) NOT NULL DEFAULT 'off',
  `permission` varchar(255) NOT NULL DEFAULT 'off',
  `punition` varchar(255) NOT NULL DEFAULT 'supprrole',
  `reste` varchar(255) NOT NULL DEFAULT 'proprioblanche'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `createrolelistuser`
--

CREATE TABLE `createrolelistuser` (
  `guildId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `createwebhook`
--

CREATE TABLE `createwebhook` (
  `guildId` varchar(255) DEFAULT NULL,
  `state` varchar(255) NOT NULL DEFAULT 'off',
  `logs` varchar(255) NOT NULL DEFAULT 'off',
  `permission` varchar(255) NOT NULL DEFAULT 'off',
  `punition` varchar(255) NOT NULL DEFAULT 'supprrole',
  `reste` varchar(255) NOT NULL DEFAULT 'proprioblanche',
  `action` varchar(255) NOT NULL DEFAULT 'clonnchannel'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `createwebhooklistuser`
--

CREATE TABLE `createwebhooklistuser` (
  `guildId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `decouser`
--

CREATE TABLE `decouser` (
  `guildId` varchar(255) DEFAULT NULL,
  `state` varchar(255) NOT NULL DEFAULT 'off',
  `logs` varchar(255) NOT NULL DEFAULT 'off',
  `permission` varchar(255) NOT NULL DEFAULT 'off',
  `punition` varchar(255) NOT NULL DEFAULT 'supprrole',
  `reste` varchar(255) NOT NULL DEFAULT 'proprioblanche',
  `intervalle` varchar(255) NOT NULL DEFAULT '10m',
  `maximum` varchar(255) NOT NULL DEFAULT '5'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `decouserlistuser`
--

CREATE TABLE `decouserlistuser` (
  `guildId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `deletechannel`
--

CREATE TABLE `deletechannel` (
  `guildId` varchar(255) DEFAULT NULL,
  `state` varchar(255) NOT NULL DEFAULT 'off',
  `logs` varchar(255) NOT NULL DEFAULT 'off',
  `permission` varchar(255) NOT NULL DEFAULT 'off',
  `punition` varchar(255) NOT NULL DEFAULT 'supprrole',
  `reste` varchar(255) NOT NULL DEFAULT 'proprioblanche'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `deletechannellistuser`
--

CREATE TABLE `deletechannellistuser` (
  `guildId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `deleterole`
--

CREATE TABLE `deleterole` (
  `guildId` varchar(255) DEFAULT NULL,
  `state` varchar(255) NOT NULL DEFAULT 'off',
  `logs` varchar(255) NOT NULL DEFAULT 'off',
  `permission` varchar(255) NOT NULL DEFAULT 'off',
  `punition` varchar(255) NOT NULL DEFAULT 'supprrole',
  `reste` varchar(255) NOT NULL DEFAULT 'proprioblanche'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `deleterolelistuser`
--

CREATE TABLE `deleterolelistuser` (
  `guildId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `depluser`
--

CREATE TABLE `depluser` (
  `guildId` varchar(255) DEFAULT NULL,
  `state` varchar(255) NOT NULL DEFAULT 'off',
  `logs` varchar(255) NOT NULL DEFAULT 'off',
  `permission` varchar(255) NOT NULL DEFAULT 'off',
  `punition` varchar(255) NOT NULL DEFAULT 'supprrole',
  `reste` varchar(255) NOT NULL DEFAULT 'proprioblanche',
  `intervalle` varchar(255) NOT NULL DEFAULT '10m',
  `maximum` varchar(255) NOT NULL DEFAULT '5'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `depluserlistuser`
--

CREATE TABLE `depluserlistuser` (
  `guildId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `expuluser`
--

CREATE TABLE `expuluser` (
  `guildId` varchar(255) DEFAULT NULL,
  `state` varchar(255) NOT NULL DEFAULT 'off',
  `logs` varchar(255) NOT NULL DEFAULT 'off',
  `permission` varchar(255) NOT NULL DEFAULT 'off',
  `punition` varchar(255) NOT NULL DEFAULT 'supprrole',
  `reste` varchar(255) NOT NULL DEFAULT 'proprioblanche',
  `intervalle` varchar(255) NOT NULL DEFAULT '10m',
  `maximum` varchar(255) NOT NULL DEFAULT '5'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `expuluserlistuser`
--

CREATE TABLE `expuluserlistuser` (
  `guildId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `guild`
--

CREATE TABLE `guild` (
  `guildId` varchar(255) DEFAULT NULL,
  `raidmode` varchar(255) NOT NULL DEFAULT 'off',
  `blacklist` varchar(255) DEFAULT 'wlowner',
  `configcmd` varchar(255) NOT NULL DEFAULT 'owner',
  `ownerlistcmd` varchar(255) NOT NULL DEFAULT 'any',
  `panelcmd` varchar(255) NOT NULL DEFAULT 'owner',
  `raidmodecmd` varchar(255) NOT NULL DEFAULT 'owner',
  `whitelistcmd` varchar(255) NOT NULL DEFAULT 'owner',
  `buttonrole` varchar(255) NOT NULL DEFAULT 'owner',
  `buttonmsg` varchar(255) NOT NULL DEFAULT 'owner'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `logs`
--

CREATE TABLE `logs` (
  `guildId` varchar(255) DEFAULT NULL,
  `addbot` varchar(255) DEFAULT NULL,
  `addrole` varchar(255) DEFAULT NULL,
  `banuser` varchar(255) DEFAULT NULL,
  `filcreate` varchar(255) DEFAULT NULL,
  `rolecreate` varchar(255) DEFAULT NULL,
  `channelcreate` varchar(255) DEFAULT NULL,
  `webhookcreate` varchar(255) DEFAULT NULL,
  `deconnectuser` varchar(255) DEFAULT NULL,
  `moovuser` varchar(255) DEFAULT NULL,
  `removerole` varchar(255) DEFAULT NULL,
  `temporalyexpulse` varchar(255) DEFAULT NULL,
  `expulsemember` varchar(255) DEFAULT NULL,
  `linkmsg` varchar(255) DEFAULT NULL,
  `spammsg` varchar(255) DEFAULT NULL,
  `toxicmsg` varchar(255) DEFAULT NULL,
  `roleupdate` varchar(255) DEFAULT NULL,
  `channelupdate` varchar(255) DEFAULT NULL,
  `guildupdate` varchar(255) DEFAULT NULL,
  `massiveroleupdate` varchar(255) DEFAULT NULL,
  `muteuservoc` varchar(255) DEFAULT NULL,
  `sourdineuservoc` varchar(255) DEFAULT NULL,
  `deleteembed` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `logstxt`
--

CREATE TABLE `logstxt` (
  `guildId` varchar(255) DEFAULT NULL,
  `addbot` varchar(255) DEFAULT NULL,
  `addrole` varchar(255) DEFAULT NULL,
  `banuser` varchar(255) DEFAULT NULL,
  `filcreate` varchar(255) DEFAULT NULL,
  `rolecreate` varchar(255) DEFAULT NULL,
  `channelcreate` varchar(255) DEFAULT NULL,
  `webhookcreate` varchar(255) DEFAULT NULL,
  `deconnectuser` varchar(255) DEFAULT NULL,
  `moovuser` varchar(255) DEFAULT NULL,
  `removerole` varchar(255) DEFAULT NULL,
  `temporalyexpulse` varchar(255) DEFAULT NULL,
  `expulsemember` varchar(255) DEFAULT NULL,
  `linkmsg` varchar(255) DEFAULT NULL,
  `spammsg` varchar(255) DEFAULT NULL,
  `toxicmsg` varchar(255) DEFAULT NULL,
  `roleupdate` varchar(255) DEFAULT NULL,
  `channelupdate` varchar(255) DEFAULT NULL,
  `guildupdate` varchar(255) DEFAULT NULL,
  `massiveroleupdate` varchar(255) DEFAULT NULL,
  `muteuservoc` varchar(255) DEFAULT NULL,
  `sourdineuservoc` varchar(255) DEFAULT NULL,
  `deleteembed` varchar(255) DEFAULT NULL,
  `text` varchar(1000) DEFAULT NULL,
  `deleterole` varchar(255) DEFAULT NULL,
  `deletechannel` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `massiverole`
--

CREATE TABLE `massiverole` (
  `guildId` varchar(255) DEFAULT NULL,
  `state` varchar(255) NOT NULL DEFAULT 'off',
  `logs` varchar(255) NOT NULL DEFAULT 'off',
  `permission` varchar(255) NOT NULL DEFAULT 'off',
  `punition` varchar(255) NOT NULL DEFAULT 'supprrole',
  `reste` varchar(255) NOT NULL DEFAULT 'proprioblanche'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `massiverolelistuser`
--

CREATE TABLE `massiverolelistuser` (
  `guildId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `muteuser`
--

CREATE TABLE `muteuser` (
  `guildId` varchar(255) DEFAULT NULL,
  `state` varchar(255) NOT NULL DEFAULT 'off',
  `logs` varchar(255) NOT NULL DEFAULT 'off',
  `permission` varchar(255) NOT NULL DEFAULT 'off',
  `punition` varchar(255) NOT NULL DEFAULT 'supprrole',
  `reste` varchar(255) NOT NULL DEFAULT 'proprioblanche',
  `intervalle` varchar(255) NOT NULL DEFAULT '10m',
  `maximum` varchar(255) NOT NULL DEFAULT '5'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `muteuserlistuser`
--

CREATE TABLE `muteuserlistuser` (
  `guildId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `ownerlist`
--

CREATE TABLE `ownerlist` (
  `guildId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `permissionbl`
--

CREATE TABLE `permissionbl` (
  `guildId` varchar(255) DEFAULT NULL,
  `authorId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `rolesIds` varchar(1638) DEFAULT NULL,
  `perms` varchar(1638) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `removerole`
--

CREATE TABLE `removerole` (
  `guildId` varchar(255) DEFAULT NULL,
  `state` varchar(255) NOT NULL DEFAULT 'off',
  `logs` varchar(255) NOT NULL DEFAULT 'off',
  `permission` varchar(255) NOT NULL DEFAULT 'off',
  `punition` varchar(255) NOT NULL DEFAULT 'supprrole',
  `reste` varchar(255) NOT NULL DEFAULT 'proprioblanche'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `removerolelistuser`
--

CREATE TABLE `removerolelistuser` (
  `guildId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `removeroleperms`
--

CREATE TABLE `removeroleperms` (
  `guildId` varchar(255) DEFAULT NULL,
  `perm` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `removerolerole`
--

CREATE TABLE `removerolerole` (
  `guildId` varchar(255) DEFAULT NULL,
  `roleId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `sourdineuser`
--

CREATE TABLE `sourdineuser` (
  `guildId` varchar(255) DEFAULT NULL,
  `state` varchar(255) NOT NULL DEFAULT 'off',
  `logs` varchar(255) NOT NULL DEFAULT 'off',
  `permission` varchar(255) NOT NULL DEFAULT 'off',
  `punition` varchar(255) NOT NULL DEFAULT 'supprrole',
  `reste` varchar(255) NOT NULL DEFAULT 'proprioblanche',
  `intervalle` varchar(255) NOT NULL DEFAULT '10m',
  `maximum` varchar(255) NOT NULL DEFAULT '5'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `sourdineuserlistuser`
--

CREATE TABLE `sourdineuserlistuser` (
  `guildId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `supprembed`
--

CREATE TABLE `supprembed` (
  `guildId` varchar(255) DEFAULT NULL,
  `state` varchar(255) NOT NULL DEFAULT 'off',
  `logs` varchar(255) NOT NULL DEFAULT 'off',
  `permission` varchar(255) NOT NULL DEFAULT 'off',
  `punition` varchar(255) NOT NULL DEFAULT 'supprrole',
  `reste` varchar(255) NOT NULL DEFAULT 'proprioblanche'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `timeout`
--

CREATE TABLE `timeout` (
  `guildId` varchar(255) DEFAULT NULL,
  `state` varchar(255) NOT NULL DEFAULT 'off',
  `logs` varchar(255) NOT NULL DEFAULT 'off',
  `permission` varchar(255) NOT NULL DEFAULT 'off',
  `punition` varchar(255) NOT NULL DEFAULT 'supprrole',
  `reste` varchar(255) NOT NULL DEFAULT 'proprioblanche',
  `intervalle` varchar(255) NOT NULL DEFAULT '10m',
  `maximum` varchar(255) NOT NULL DEFAULT '5'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `timeoutlistuser`
--

CREATE TABLE `timeoutlistuser` (
  `guildId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `toxicite`
--

CREATE TABLE `toxicite` (
  `guildId` varchar(255) DEFAULT NULL,
  `state` varchar(255) NOT NULL DEFAULT 'off',
  `logs` varchar(255) NOT NULL DEFAULT 'off',
  `permission` varchar(255) NOT NULL DEFAULT 'off',
  `punition` varchar(255) NOT NULL DEFAULT 'excluretempo',
  `reste` varchar(255) NOT NULL DEFAULT 'proprioblanche',
  `duree` varchar(255) NOT NULL DEFAULT '10s',
  `pourcentage` varchar(255) NOT NULL DEFAULT '80'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `toxicitechannel`
--

CREATE TABLE `toxicitechannel` (
  `guildId` varchar(255) DEFAULT NULL,
  `channelId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `toxicitelistuser`
--

CREATE TABLE `toxicitelistuser` (
  `guildId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `updatechannel`
--

CREATE TABLE `updatechannel` (
  `guildId` varchar(255) DEFAULT NULL,
  `state` varchar(255) NOT NULL DEFAULT 'off',
  `logs` varchar(255) NOT NULL DEFAULT 'off',
  `permission` varchar(255) NOT NULL DEFAULT 'off',
  `punition` varchar(255) NOT NULL DEFAULT 'supprrole',
  `reste` varchar(255) NOT NULL DEFAULT 'proprioblanche'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `updatechannelchannel`
--

CREATE TABLE `updatechannelchannel` (
  `guildId` varchar(255) DEFAULT NULL,
  `channelId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `updatechannellistuser`
--

CREATE TABLE `updatechannellistuser` (
  `guildId` varchar(255) DEFAULT NULL,
  `userId` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `updateguild`
--

CREATE TABLE `updateguild` (
  `guildId` varchar(255) DEFAULT NULL,
  `state` varchar(255) NOT NULL DEFAULT 'off',
  `logs` varchar(255) NOT NULL DEFAULT 'off',
  `permission` varchar(255) NOT NULL DEFAULT 'off',
  `punition` varchar(255) NOT NULL DEFAULT 'supprrole',
  `reste` varchar(255) NOT NULL DEFAULT 'proprioblanche'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `updateguildlistuser`
--

CREATE TABLE `updateguildlistuser` (
  `guildId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `updaterole`
--

CREATE TABLE `updaterole` (
  `guildId` varchar(255) DEFAULT NULL,
  `state` varchar(255) NOT NULL DEFAULT 'off',
  `logs` varchar(255) NOT NULL DEFAULT 'off',
  `permission` varchar(255) NOT NULL DEFAULT 'off',
  `punition` varchar(255) NOT NULL DEFAULT 'supprrole',
  `reste` varchar(255) NOT NULL DEFAULT 'proprioblanche'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `updaterolelistuser`
--

CREATE TABLE `updaterolelistuser` (
  `guildId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `whitelist`
--

CREATE TABLE `whitelist` (
  `guildId` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
