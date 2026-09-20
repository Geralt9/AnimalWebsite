-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: cats_api
-- ------------------------------------------------------
-- Server version	9.2.0

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
-- Table structure for table `animal_habitats`
--

DROP TABLE IF EXISTS `animal_habitats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animal_habitats` (
  `animal_id` int NOT NULL,
  `habitat_id` int NOT NULL,
  PRIMARY KEY (`animal_id`,`habitat_id`),
  KEY `habitat_id` (`habitat_id`),
  CONSTRAINT `animal_habitats_ibfk_1` FOREIGN KEY (`animal_id`) REFERENCES `animals` (`id`) ON DELETE CASCADE,
  CONSTRAINT `animal_habitats_ibfk_2` FOREIGN KEY (`habitat_id`) REFERENCES `habitats` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animal_habitats`
--

LOCK TABLES `animal_habitats` WRITE;
/*!40000 ALTER TABLE `animal_habitats` DISABLE KEYS */;
/*!40000 ALTER TABLE `animal_habitats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `animal_images`
--

DROP TABLE IF EXISTS `animal_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animal_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `animal_id` int NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `alt_text` varchar(255) DEFAULT NULL,
  `is_primary` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `animal_id` (`animal_id`),
  CONSTRAINT `animal_images_ibfk_1` FOREIGN KEY (`animal_id`) REFERENCES `animals` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animal_images`
--

LOCK TABLES `animal_images` WRITE;
/*!40000 ALTER TABLE `animal_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `animal_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `animals`
--

DROP TABLE IF EXISTS `animals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `life_span` int NOT NULL,
  `friendliness_level` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animals`
--

LOCK TABLES `animals` WRITE;
/*!40000 ALTER TABLE `animals` DISABLE KEYS */;
/*!40000 ALTER TABLE `animals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cat_data`
--

DROP TABLE IF EXISTS `cat_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cat_data` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `cat_id` varchar(255) NOT NULL,
  `description` varchar(15000) DEFAULT NULL,
  `Image_url` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `cat_id` (`cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=273 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat_data`
--

LOCK TABLES `cat_data` WRITE;
/*!40000 ALTER TABLE `cat_data` DISABLE KEYS */;
INSERT INTO `cat_data` VALUES (1,'crex','This is a confident cat who loves people and will follow them around, waiting for any opportunity to sit in a lap or give a kiss. He enjoys being handled, making it easy to take him to the veterinarian or train him for therapy work. The Cornish Rex stay in kitten mode most of their lives and well into their senior years. ','unX21IBVB'),(2,'cymr','The Cymric is a placid, sweet cat. They do not get too upset about anything that happens in their world. They are loving companions and adore people. They are smart and dexterous, capable of using his paws to get into cabinets or to open doors.','3dbtapCWM'),(3,'chau','For those owners who desire a feline capable of evoking the great outdoors, the strikingly beautiful Chausie retains a bit of the wild in its appearance but has the house manners of our friendly, familiar moggies. Very playful, this cat needs a large amount of space to be able to fully embrace its hunting instincts.','vJ3lEYgXr'),(5,'raga','The Ragamuffin is calm, even tempered and gets along well with all family members. Changes in routine generally do not upset her. She is an ideal companion for those in apartments, and with children due to her patient nature.','SMuZx-bFM'),(6,'sfol','The Scottish Fold is a sweet, charming breed. She is an easy cat to live with and to care for. She is affectionate and is comfortable with all members of her family. Her tail should be handled gently. Folds are known for sleeping on their backs, and for sitting with their legs stretched out and their paws on their belly. This is called the \"Buddha Position\".','o9t0LDcsa'),(7,'soma','The Somali lives life to the fullest. He climbs higher, jumps farther, plays harder. Nothing escapes the notice of this highly intelligent and inquisitive cat. Somalis love the company of humans and other animals.','EPF2ejNS0'),(8,'srex','The Selkirk Rex is an incredibly patient, loving, and tolerant breed. The Selkirk also has a silly side and is sometimes described as clownish. She loves being a lap cat and will be happy to chat with you in a quiet voice if you talk to her. ','II9dOZmrw'),(9,'toyg','The Toyger has a sweet, calm personality and is generally friendly. He\'s outgoing enough to walk on a leash, energetic enough to play fetch and other interactive games, and confident enough to get along with other cats and friendly dogs.','O3F3_S1XN'),(10,'tvan','While the Turkish Van loves to jump and climb, play with toys, retrieve and play chase, she is is big and ungainly; this is one cat who doesn’t always land on his feet. While not much of a lap cat, the Van will be happy to cuddle next to you and sleep in your bed. ','sxIXJax6h'),(11,'bslo','The British Longhair is a very laid-back relaxed cat, often perceived to be very independent although they will enjoy the company of an equally relaxed and likeminded cat. They are an affectionate breed, but very much on their own terms and tend to prefer to choose to come and sit with their owners rather than being picked up.','7isAO4Cav'),(12,'esho','The Exotic Shorthair is a gentle friendly cat that has the same personality as the Persian. They love having fun, don’t mind the company of other cats and dogs, also love to curl up for a sleep in a safe place. Exotics love their own people, but around strangers they are cautious at first. Given time, they usually warm up to visitors.','YnPrYEmfe'),(13,'chee','The Cheetoh has a super affectionate nature and real love for their human companions; they are intelligent with the ability to learn quickly. You can expect that a Cheetoh will be a fun-loving kitty who enjoys playing, running, and jumping through every room in your house.','IFXsxmXLm'),(14,'munc','The Munchkin is an outgoing cat who enjoys being handled. She has lots of energy and is faster and more agile than she looks. The shortness of their legs does not seem to interfere with their running and leaping abilities.','j5cVSqLer'),(16,'norw','The Norwegian Forest Cat is a sweet, loving cat. She appreciates praise and loves to interact with her parent. She makes a loving companion and bonds with her parents once she accepts them for her own. She is still a hunter at heart. She loves to chase toys as if they are real. She is territorial and patrols several times each day to make certain that all is fine.','06dgGmEOV'),(18,'mcoo','They are known for their size and luxurious long coat Maine Coons are considered a gentle giant. The good-natured and affable Maine Coon adapts well to many lifestyles and personalities. She likes being with people and has the habit of following them around, but isn’t needy. Most Maine Coons love water and they can be quite good swimmers.','OOD3VXAQn'),(19,'tang','This is a smart and intelligent cat which bonds well with humans. With its affectionate and playful personality the Angora is a top choice for families. The Angora gets along great with other pets in the home, but it will make clear who is in charge, and who the house belongs to','7CGV6WVXq'),(20,'aege','Native to the Greek islands known as the Cyclades in the Aegean Sea, these are natural cats, meaning they developed without humans getting involved in their breeding. As a breed, Aegean Cats are rare, although they are numerous on their home islands. They are generally friendly toward people and can be excellent cats for families with children.','ozEvzdVM-'),(31,'awir','The American Wirehair tends to be a calm and tolerant cat who takes life as it comes. His favorite hobby is bird-watching from a sunny windowsill, and his hunting ability will stand you in good stead if insects enter the house.','8D--jCd21'),(32,'java','Javanese are endlessly interested, intelligent and active. They tend to enjoy jumping to great heights, playing with fishing pole-type or other interactive toys and just generally investigating their surroundings. He will attempt to copy things you do, such as opening doors or drawers.','xoI_EpOKe'),(33,'lape','LaPerms are gentle and affectionate but also very active. Unlike many active breeds, the LaPerm is also quite content to be a lap cat. The LaPerm will often follow your lead; that is, if they are busy playing and you decide to sit and relax, simply pick up your LaPerm and sit down with it, and it will stay in your lap, devouring the attention you give it.','aKbsEYjSl'),(34,'ragd','Ragdolls love their people, greeting them at the door, following them around the house, and leaping into a lap or snuggling in bed whenever given the chance. They are the epitome of a lap cat, enjoy being carried and collapsing into the arms of anyone who holds them.','oGefY4YoG'),(35,'sing','The Singapura is usually cautious when it comes to meeting new people, but loves attention from his family so much that she sometimes has the reputation of being a pest. This is a highly active, curious and affectionate cat. She may be small, but she knows she’s in charge','Qtncp2nRe'),(36,'ycho','York Chocolate cats are known to be true lap cats with a sweet temperament. They love to be cuddled and petted. Their curious nature makes them follow you all the time and participate in almost everything you do, even if it\'s related to water: unlike many other cats, York Chocolates love it.','0SxW2SQ_S'),(37,'sibe','The Siberians dog like temperament and affection makes the ideal lap cat and will live quite happily indoors. Very agile and powerful, the Siberian cat can easily leap and reach high places, including the tops of refrigerators and even doors. ','3bkZAjRh1'),(41,'nebe','The Nebelung may have a reserved nature, but she loves to play (being especially fond of retrieving) and enjoys jumping or climbing to high places where she can study people and situations at her leisure before making up her mind about whether she wants to get involved.','OGTWqNNOt'),(42,'orie','Orientals are passionate about the people in their lives. They become extremely attached to their humans, so be prepared for a lifetime commitment. When you are not available to entertain her, an Oriental will divert herself by jumping on top of the refrigerator, opening drawers, seeking out new hideaways.','LutjkZJpH'),(43,'pers','Persians are sweet, gentle cats that can be playful or quiet and laid-back. Great with families and children, they absolutely love to lounge around the house. While they don’t mind a full house or active kids, they’ll usually hide when they need some alone time.','-Zfz5z2jK'),(44,'rblu','Russian Blues are very loving and reserved. They do not like noisy households but they do like to play and can be quite active when outdoors. They bond very closely with their owner and are known to be compatible with other pets.','Rhj-JsTLP'),(51,'asho','The American Shorthair is known for its longevity, robust health, good looks, sweet personality, and amiability with children, dogs, and other pets.','JFPROfGtQ'),(52,'hima','Calm and devoted, Himalayans make excellent companions, though they prefer a quieter home. They are playful in a sedate kind of way and enjoy having an assortment of toys. The Himalayan will stretch out next to you, sleep in your bed and even sit on your lap when she is in the mood.','CDhOtM-Ig'),(53,'snow','The Snowshoe is a vibrant, energetic, affectionate and intelligent cat. They love being around people which makes them ideal for families, and becomes unhappy when left alone for long periods of time. Usually attaching themselves to one person, they do whatever they can to get your attention.','MK-sYESvO'),(61,'csho','Colorpoint Shorthairs are an affectionate breed, devoted and loyal to their people. Sensitive to their owner’s moods, Colorpoints are more than happy to sit at your side or on your lap and purr words of encouragement on a bad day. They will constantly seek out your lap whenever it is open and in the moments when your lap is preoccupied they will stretch out in sunny spots on the ground.','oSpqGyUDS'),(62,'ocic','Loyal and devoted to their owners, the Ocicat is intelligent, confident, outgoing, and seems to have many dog traits. They can be trained to fetch toys, walk on a lead, taught to \'speak\', come when called, and follow other commands. ','JAx-08Y0n'),(63,'siam','While Siamese cats are extremely fond of their people, they will follow you around and supervise your every move, being talkative and opinionated. They are a demanding and social cat, that do not like being left alone for long periods.','ai6Jps4sx'),(64,'abys','The Abyssinian is easy to care for, and a joy to have in your home. They’re affectionate cats and love both people and other animals.','0XYvRd7oD'),(71,'jbob','The Japanese Bobtail is an active, sweet, loving and highly intelligent breed. They love to be with people and play seemingly endlessly. They learn their name and respond to it. They bring toys to people and play fetch with a favorite toy for hours. Bobtails are social and are at their best when in the company of people. They take over the house and are not intimidated. If a dog is in the house, Bobtails assume Bobtails are in charge.','-tm9-znzl'),(72,'manx','The Manx is a placid, sweet cat that is gentle and playful. She never seems to get too upset about anything. She is a loving companion and adores being with people.','fhYh2PDcC'),(81,'bali','Balinese are curious, outgoing, intelligent cats with excellent communication skills. They are known for their chatty personalities and are always eager to tell you their views on life, love, and what you’ve served them for dinner. ','13MkvUreZ'),(91,'pixi','Companionable and affectionate, the Pixie-bob wants to be an integral part of the family. The Pixie-Bob’s ability to bond with their humans along with their patient personas make them excellent companions for children.','z7fJRNeN6'),(92,'sava','Savannah is the feline version of a dog. Actively seeking social interaction, they are given to pouting if left out. Remaining kitten-like through life. Profoundly loyal to immediate family members whilst questioning the presence of strangers. Making excellent companions that are loyal, intelligent and eager to be involved.','a8nIYvs6S'),(93,'cspa','Perhaps the only thing about the California spangled cat that isn’t wild-like is its personality. Known to be affectionate, gentle and sociable, this breed enjoys spending a great deal of time with its owners. They are very playful, often choosing to perch in high locations and show off their acrobatic skills.','B1ERTmgph'),(94,'tonk','Intelligent and generous with their affection, a Tonkinese will supervise all activities with curiosity. Loving, social, active, playful, yet content to be a lap cat','KBroiVNCM'),(101,'lihu','The Dragon Li is loyal, but not particularly affectionate. They are known to be very intelligent, and their natural breed status means that they\'re very active. She is is gentle with people, and has a reputation as a talented hunter of rats and other vermin.','BQMSld0A0'),(102,'emau','The Egyptian Mau is gentle and reserved. She loves her people and desires attention and affection from them but is wary of others. Early, continuing socialization is essential with this sensitive and sometimes shy cat, especially if you plan to show or travel with her. Otherwise, she can be easily startled by unexpected noises or events.','TuSyTkt2n'),(111,'birm','The Birman is a docile, quiet cat who loves people and will follow them from room to room. Expect the Birman to want to be involved in what you’re doing. He communicates in a soft voice, mainly to remind you that perhaps it’s time for dinner or maybe for a nice cuddle on the sofa. He enjoys being held and will relax in your arms like a furry baby.','HOrX5gwLS'),(121,'bsho','The British Shorthair is a very pleasant cat to have as a companion, ans is easy going and placid. The British is a fiercely loyal, loving cat and will attach herself to every one of her family members. While loving to play, she doesn\'t need hourly attention. If she is in the mood to play, she will find someone and bring a toy to that person. The British also plays well by herself, and thus is a good companion for single people.','s4wQfYoEk'),(151,'beng','Bengals are a lot of fun to live with, but they\'re definitely not the cat for everyone, or for first-time cat owners. Extremely intelligent, curious and active, they demand a lot of interaction and woe betide the owner who doesn\'t provide it.','O3btzLlsO'),(171,'abob','American Bobtails are loving and incredibly intelligent cats possessing a distinctive wild appearance. They are extremely interactive cats that bond with their human family with great devotion.','hBXicehMA'),(172,'sphy','The Sphynx is an intelligent, inquisitive, extremely friendly people-oriented breed. Sphynx commonly greet their owners  at the front door, with obvious excitement and happiness. She has an unexpected sense of humor that is often at odds with her dour expression.','BDb8ZXb1v'),(221,'amis','The Australian Mist thrives on human companionship. Tolerant of even the youngest of children, these friendly felines enjoy playing games and being part of the hustle and bustle of a busy household. They make entertaining companions for people of all ages, and are happy to remain indoors between dusk and dawn or to be wholly indoor pets.','_6x-3TiCA'),(222,'kora','The Korat is a natural breed, and one of the oldest stable cat breeds. They are highly intelligent and confident cats that can be fearless, although they are startled by loud sounds and sudden movements. Korats form strong bonds with their people and like to cuddle and stay nearby.','DbwiefiaY'),(251,'hbro','The Havana Brown is human oriented, playful, and curious. She has a strong desire to spend time with her people and involve herself in everything they do. Being naturally inquisitive, the Havana Brown reaches out with a paw to touch and feel when investigating curiosities in its environment. They are truly sensitive by nature and frequently gently touch their human companions as if they are extending a paw of friendship.','njK25knLH'),(271,'bamb','The Bambino is a breed of cat that was created as a cross between the Sphynx and the Munchkin breeds. The Bambino cat has short legs, large upright ears, and is usually hairless. They love to be handled and cuddled up on the laps of their family members.','5AdhMjeEu');
/*!40000 ALTER TABLE `cat_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_likes`
--

DROP TABLE IF EXISTS `comment_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment_id` int NOT NULL,
  `user_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_comment_likes` (`comment_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comment_likes_ibfk_1` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comment_likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=174 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_likes`
--

LOCK TABLES `comment_likes` WRITE;
/*!40000 ALTER TABLE `comment_likes` DISABLE KEYS */;
INSERT INTO `comment_likes` VALUES (2,9,3,'2025-11-30 22:17:39'),(10,3,3,'2025-12-20 10:53:02'),(11,5,3,'2025-12-20 10:53:37'),(75,14,5,'2026-01-03 13:29:18'),(101,15,5,'2026-01-16 14:14:26'),(102,14,3,'2026-01-16 14:39:10'),(103,15,3,'2026-01-16 14:39:13'),(149,28,3,'2026-02-10 20:29:33'),(160,25,3,'2026-04-01 20:52:13'),(162,36,3,'2026-04-01 21:19:26'),(163,21,3,'2026-04-01 21:19:37'),(166,6,3,'2026-04-04 19:39:24'),(167,12,3,'2026-04-04 19:41:47'),(169,38,5,'2026-04-04 20:05:57'),(172,40,3,'2026-04-04 20:40:44'),(173,42,3,'2026-04-05 18:37:19');
/*!40000 ALTER TABLE `comment_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  `content` varchar(500) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `parent_comment_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `user_id` (`user_id`),
  KEY `fk_parent_comment` (`parent_comment_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `fk_parent_comment` FOREIGN KEY (`parent_comment_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,20,3,'hi there','2025-11-01 18:30:24',NULL),(2,20,3,'this is comment 1 ','2025-11-09 20:12:52',NULL),(3,20,3,'this is comment 2','2025-11-09 20:12:59',NULL),(4,19,3,'hey all this is another post','2025-11-13 13:35:38',NULL),(5,20,5,'hey everyone !','2025-11-13 14:55:38',NULL),(6,20,5,'how s the weather in your  place ?\n','2025-11-13 14:57:09',NULL),(7,20,3,'Greetings','2025-11-20 15:27:43',NULL),(8,20,3,'hello !','2025-11-20 19:20:08',NULL),(9,20,3,'hey','2025-11-20 19:49:53',NULL),(10,20,3,'this is  a new test comment','2025-11-20 20:45:31',NULL),(11,18,3,'Hello !','2025-11-23 19:08:35',NULL),(12,21,3,'Hello Nice view !','2025-12-07 21:28:38',NULL),(13,19,3,'Hey guys !','2025-12-21 10:13:39',NULL),(14,22,3,'Nice !','2025-12-21 10:20:12',NULL),(15,22,3,'Good day everyone','2025-12-21 10:20:39',NULL),(17,22,3,'Hello again','2026-01-10 10:21:51',15),(18,22,3,'hey there !','2026-01-10 10:22:02',14),(19,22,3,'How is it going !','2026-01-16 12:40:57',15),(20,22,5,'greetings!','2026-01-16 12:54:48',15),(21,23,3,'hello','2026-01-22 17:54:43',NULL),(22,23,3,'hi','2026-01-31 12:10:59',21),(23,20,3,'greetings !','2026-02-05 12:38:48',1),(24,23,3,'Greetings !','2026-02-05 13:47:25',21),(25,23,3,'hey there :)','2026-02-05 14:12:48',21),(26,23,3,'Bonjour !','2026-02-05 14:28:05',21),(27,23,3,'this is another comment','2026-02-06 13:28:37',21),(28,23,3,'hey there','2026-02-10 19:28:00',27),(29,23,3,'hi!','2026-02-10 19:28:05',28),(30,23,3,'hey1','2026-02-10 19:28:16',29),(31,23,3,'hey 5\n','2026-02-10 19:28:20',30),(32,23,3,'hey!','2026-02-10 19:29:43',21),(33,23,3,'greetings','2026-03-20 15:04:30',21),(34,23,3,'heyy ','2026-03-20 15:04:42',33),(35,23,3,'yo','2026-03-20 15:21:54',28),(36,23,3,'yo','2026-03-21 20:56:40',21),(37,23,3,'greetings all','2026-03-21 20:57:00',NULL),(38,25,3,'hey There !','2026-04-04 18:38:37',NULL),(39,21,3,'hey','2026-04-04 18:41:51',12),(40,25,5,'good day to you !','2026-04-04 19:05:56',NULL),(41,25,5,'hello!','2026-04-04 19:06:03',38),(42,20,3,'hey!','2026-04-05 17:37:18',NULL);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habitats`
--

DROP TABLE IF EXISTS `habitats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habitats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habitats`
--

LOCK TABLES `habitats` WRITE;
/*!40000 ALTER TABLE `habitats` DISABLE KEYS */;
/*!40000 ALTER TABLE `habitats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_like` (`post_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=193 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (4,10,3,'2025-10-04 14:12:00'),(6,12,3,'2025-10-04 14:12:01'),(26,20,5,'2025-10-04 15:27:10'),(27,18,5,'2025-10-04 15:27:13'),(111,11,3,'2025-10-13 20:13:26'),(113,9,3,'2025-10-16 14:41:14'),(116,13,3,'2025-10-19 15:50:18'),(126,14,3,'2025-10-25 13:26:02'),(165,17,3,'2025-11-29 20:38:23'),(169,19,3,'2025-12-07 21:28:55'),(174,21,3,'2025-12-21 10:19:29'),(179,22,5,'2026-01-03 12:23:26'),(186,20,3,'2026-03-21 20:57:19'),(188,24,3,'2026-03-24 20:23:34'),(191,23,3,'2026-04-05 17:37:05'),(192,22,3,'2026-04-05 17:37:10');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pet`
--

DROP TABLE IF EXISTS `pet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pet` (
  `pet_ID` int NOT NULL AUTO_INCREMENT,
  `user_ID` int NOT NULL,
  `name` varchar(225) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `sex` enum('male','female') NOT NULL,
  `breed` varchar(255) DEFAULT NULL,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`pet_ID`),
  KEY `user_ID` (`user_ID`),
  CONSTRAINT `pet_ibfk_1` FOREIGN KEY (`user_ID`) REFERENCES `users` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pet`
--

LOCK TABLES `pet` WRITE;
/*!40000 ALTER TABLE `pet` DISABLE KEYS */;
INSERT INTO `pet` VALUES (1,3,'Lothric',20,'male','Husky','2025-08-24 13:10:18'),(2,5,'Narko',10,'male','Pug','2025-09-14 15:01:26');
/*!40000 ALTER TABLE `pet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_pics`
--

DROP TABLE IF EXISTS `post_pics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_pics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `img_url` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `post_pics_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `post_pics_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_pics`
--

LOCK TABLES `post_pics` WRITE;
/*!40000 ALTER TABLE `post_pics` DISABLE KEYS */;
INSERT INTO `post_pics` VALUES (1,3,15,'2025-08-05 21:45:08','https://res.cloudinary.com/dayrdslq5/image/upload/v1754430307/users/posts/3/mlbvuaz1hr4m0sx1yu9l.jpg'),(2,3,15,'2025-08-05 21:45:09','https://res.cloudinary.com/dayrdslq5/image/upload/v1754430308/users/posts/3/awmjgcjfgvskqylaq0jc.jpg'),(3,3,16,'2025-08-05 21:45:15','https://res.cloudinary.com/dayrdslq5/image/upload/v1754430314/users/posts/3/gjkaczpuc8wjc5swh173.jpg'),(4,3,16,'2025-08-05 21:45:16','https://res.cloudinary.com/dayrdslq5/image/upload/v1754430315/users/posts/3/jawkmvyr1mj2s53ai6ii.jpg'),(5,3,17,'2025-08-09 15:18:00','https://res.cloudinary.com/dayrdslq5/image/upload/v1754752679/users/posts/3/ff28pscag9gfinxnbu2y.jpg'),(6,3,17,'2025-08-09 15:18:01','https://res.cloudinary.com/dayrdslq5/image/upload/v1754752680/users/posts/3/ugzjo3niyugnz3tgnz2f.jpg'),(7,3,17,'2025-08-09 15:18:01','https://res.cloudinary.com/dayrdslq5/image/upload/v1754752680/users/posts/3/asxb71hx6vd1j1jzavyc.jpg'),(8,3,17,'2025-08-09 15:18:02','https://res.cloudinary.com/dayrdslq5/image/upload/v1754752681/users/posts/3/zejwdc6sqnfhotf9k1zg.jpg'),(9,6,18,'2025-08-19 17:38:59','https://res.cloudinary.com/dayrdslq5/image/upload/v1755625138/users/posts/6/kqtlybt8sqrxsfoco9uy.jpg'),(10,3,19,'2025-08-26 20:26:33','https://res.cloudinary.com/dayrdslq5/image/upload/v1756239992/users/posts/3/rqeezwogh3toirzctglv.jpg'),(11,3,19,'2025-08-26 20:26:33','https://res.cloudinary.com/dayrdslq5/image/upload/v1756239993/users/posts/3/eexnol8siajuetuxcfrz.jpg'),(12,3,19,'2025-08-26 20:26:35','https://res.cloudinary.com/dayrdslq5/image/upload/v1756239994/users/posts/3/ryetqb5rhgbvmnd1tgtd.jpg'),(13,3,19,'2025-08-26 20:26:36','https://res.cloudinary.com/dayrdslq5/image/upload/v1756239995/users/posts/3/devqtzj399cblajap5gg.jpg'),(14,5,20,'2025-09-05 15:28:12','https://res.cloudinary.com/dayrdslq5/image/upload/v1757086091/users/posts/5/o72sfdwpzugng7ift5wz.png'),(15,3,21,'2025-12-07 21:28:14','https://res.cloudinary.com/dayrdslq5/image/upload/v1765142892/users/posts/3/f959rjipbwvtjx2dxmpd.jpg'),(16,3,21,'2025-12-07 21:28:14','https://res.cloudinary.com/dayrdslq5/image/upload/v1765142893/users/posts/3/gfxypwqfio1zgf3ikqty.jpg'),(17,3,22,'2025-12-21 10:19:46','https://res.cloudinary.com/dayrdslq5/image/upload/v1766312385/users/posts/3/x7uj8cfpnrkt1sgmma6q.jpg'),(18,3,22,'2025-12-21 10:19:47','https://res.cloudinary.com/dayrdslq5/image/upload/v1766312386/users/posts/3/twvwhc8kohmrdg9hzgg4.jpg'),(19,3,23,'2026-01-22 17:54:16','https://res.cloudinary.com/dayrdslq5/image/upload/v1769104454/users/posts/3/cezivveiyiywneeckzzt.jpg'),(20,3,23,'2026-01-22 17:54:17','https://res.cloudinary.com/dayrdslq5/image/upload/v1769104455/users/posts/3/ta48vmly0dygn58sytia.jpg'),(21,3,24,'2026-03-21 20:57:39','https://res.cloudinary.com/dayrdslq5/image/upload/v1774126658/users/posts/3/pamanldnafsti69wq6gw.png');
/*!40000 ALTER TABLE `post_pics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (8,3,'Hello everyone, this is my very first Post :D.','2025-06-15 19:55:46'),(9,3,'Hello this is my second post here :3','2025-06-16 20:49:48'),(10,3,'Hello everyone how s the weather in your place ?','2025-06-29 16:40:45'),(11,5,'Hey there, can anyone recommend a good vaccine for a newborn kitten . Thanks! ','2025-06-30 19:00:24'),(12,3,'Hello everyone!','2025-07-12 21:55:03'),(13,3,'','2025-08-03 19:29:41'),(14,3,'Hello yall','2025-08-03 20:54:50'),(15,3,'Hello check these pics I got','2025-08-05 21:45:07'),(16,3,'Hello check these pics I got','2025-08-05 21:45:14'),(17,3,'Hello everyone this is another test posts for pictures upload. ','2025-08-09 15:17:58'),(18,6,'Hello everyone can I get a warm welcome :D','2025-08-19 17:38:57'),(19,3,'Hello','2025-08-26 20:26:31'),(20,5,'Hello everyone! this is Cal.','2025-09-05 15:28:10'),(21,3,'Hello all !','2025-12-07 21:28:12'),(22,3,'Hello check this out','2025-12-21 10:19:45'),(23,3,'Hello world','2026-01-22 17:54:15'),(24,3,'New addition ','2026-03-21 20:57:38'),(25,3,'Greetings everyone','2026-04-03 19:27:27');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile_details`
--

DROP TABLE IF EXISTS `profile_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile_details` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Profile_id` int NOT NULL,
  `Bio` text,
  `Pictures` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Profile_id` (`Profile_id`),
  CONSTRAINT `profile_details_ibfk_1` FOREIGN KEY (`Profile_id`) REFERENCES `users` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile_details`
--

LOCK TABLES `profile_details` WRITE;
/*!40000 ALTER TABLE `profile_details` DISABLE KEYS */;
INSERT INTO `profile_details` VALUES (1,3,'Hello, welcome to my page !','https://res.cloudinary.com/dayrdslq5/image/upload/v1769104411/users/Profile/Pet_image/3/e23xplaavhv9etdg3fc7.jpg','2025-10-16 15:15:11'),(27,5,'Welcome to my profile, My name is Cal !','https://res.cloudinary.com/dayrdslq5/image/upload/v1757861960/users/Profile/Pet_image/5/ueyjnockxyrk7xfzhvut.jpg','2025-09-14 15:01:53'),(35,6,'Hi there!','https://res.cloudinary.com/dayrdslq5/image/upload/v1755625105/users/Profile/Pet_image/6/mrjenciexr1jfryvlrj3.jpg','2025-08-19 17:37:47');
/*!40000 ALTER TABLE `profile_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh_tokens`
--

DROP TABLE IF EXISTS `refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_tokens` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `Token` varchar(255) NOT NULL,
  `Expiry_time` datetime NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Token` (`Token`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `refresh_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=522 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_tokens`
--

LOCK TABLES `refresh_tokens` WRITE;
/*!40000 ALTER TABLE `refresh_tokens` DISABLE KEYS */;
INSERT INTO `refresh_tokens` VALUES (25,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NDc1MjA3MzQsImV4cCI6MTc0ODEyNTUzNH0.IXz0aBlKetD8yaGktSActFzx4LyoijjF_qDm-zBBsgM','2025-05-24 23:25:35'),(42,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NDkxMzcyNTMsImV4cCI6MTc0OTc0MjA1M30.DnRC-oC9m_UPM0ifRpYwaXCO1rWtopIyhyOmJON4Jtc','2025-06-12 16:27:34'),(44,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NDkxMzg1MDQsImV4cCI6MTc0OTc0MzMwNH0.6PtgwLLIE95LYVyaYjH3MohW5UBdVOyTTkAMN4IrY9M','2025-06-12 16:48:25'),(53,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NDk3NDIzNzMsImV4cCI6MTc1MDM0NzE3M30.5WV1T4dSeRzAC4AvwlKTw0Mp-wlk3PxFcrJRRW5EDOs','2025-06-19 16:32:54'),(78,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NDk3NTkxODUsImV4cCI6MTc1MDM2Mzk4NX0.qlJaUHQQzDado4MAzisjNPUW3QfJcyuCly2-zpOcIRw','2025-06-19 21:13:06'),(86,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTAxODkwOTAsImV4cCI6MTc1MDc5Mzg5MH0.QUofkgcJucyUn5OtchPxVpBZfKSyCeeyRAszd6JqPa0','2025-06-24 20:38:11'),(88,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTAyNzgxNTYsImV4cCI6MTc1MDg4Mjk1Nn0.e7o9nU-d4ywgRhNcgtrSMqEHIUOi-SS6xu8DCeO0QUA','2025-06-25 21:22:37'),(89,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTAzNDQ2NjQsImV4cCI6MTc1MDk0OTQ2NH0.kXFATbMBmyLxsdY8j5HTfsSo7tvpjRVbvyrLfWSIuvw','2025-06-26 15:51:04'),(90,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTAzNDU4NTgsImV4cCI6MTc1MDk1MDY1OH0.KorfvdhGODFL5cJR7dj8aEu50Kl11UqwApdlRK0R1Bk','2025-06-26 16:10:58'),(92,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTAzNDgxMTQsImV4cCI6MTc1MDk1MjkxNH0.eEak0r5AyLZe4lkRI5Ly22x8g-Tsu9TTmQDznwaSp50','2025-06-26 16:48:35'),(93,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTAzNDk0OTksImV4cCI6MTc1MDk1NDI5OX0.gMv1873y2gTg7yOAToxnn-fCSqCTTXJAgr8cALMyDVE','2025-06-26 17:11:39'),(96,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTA1MjI1MTcsImV4cCI6MTc1MTEyNzMxN30.1akSuD6s0KXJDejSTQbICX1cU90X3UxJLtZIvJqVOFA','2025-06-28 17:15:18'),(97,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTA1Mjk5OTgsImV4cCI6MTc1MTEzNDc5OH0.-8f-2aHueuaeNtP2EC4xDhhjl-AD9SQ5Gncs10BPpZg','2025-06-28 19:19:59'),(98,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTA1NDAxMDMsImV4cCI6MTc1MTE0NDkwM30.kv8f0wg9rgbfQAZInoZ0zLH87ylE7wundUeURVDongQ','2025-06-28 22:08:24'),(99,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTA1NDE1MTksImV4cCI6MTc1MTE0NjMxOX0.Tx_DZV9VuC7SlC77OQjO8YcnWs4JKp_wMMHEmwLlLfk','2025-06-28 22:32:00'),(101,5,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInVzZXJOYW1lIjoiQ2FsdmluIEhlcm8iLCJpYXQiOjE3NTA2MDUzMjMsImV4cCI6MTc1MTIxMDEyM30.xeq0OcbLGwrCqYYxnBKjNPweDqk_DBBJKfss-pTbTvA','2025-06-29 16:15:24'),(102,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTA2MDY3NDEsImV4cCI6MTc1MTIxMTU0MX0.znF2EBplU0lGK_550yPqTt4qIWXB-t8TbLqLZIB1xI0','2025-06-29 16:39:02'),(106,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTA2MTc0MDQsImV4cCI6MTc1MTIyMjIwNH0.QO8OuSC_sIkgYvK3P0suCZ6_UUFT-IUbHOWneWP23ds','2025-06-29 19:36:44'),(109,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTA2MjQ4NjEsImV4cCI6MTc1MTIyOTY2MX0.tEqThZqsXpR-B_VF9FLqa2RmX9Aa6nFNwVI7D8ticLA','2025-06-29 21:41:01'),(110,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTA2MjUxODAsImV4cCI6MTc1MTIyOTk4MH0.mVnZW1HupxdsaC_H9TwcOgIFHiYJLSIViAdekKo5uG8','2025-06-29 21:46:21'),(111,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTExMTk5ODgsImV4cCI6MTc1MTcyNDc4OH0.x66ezjKJAw4PAehb8SlfsGoUtdUtW5zdpaPIZ4s1fxQ','2025-07-05 15:13:08'),(114,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTExMjIzNjYsImV4cCI6MTc1MTcyNzE2Nn0.K2Fek4S-BoD7_T2UkOR9RyWAzzKoDYztHzpxf3AtAes','2025-07-05 15:52:46'),(115,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTExMjM1MjksImV4cCI6MTc1MTcyODMyOX0.jUun-rXPONF9MxYC2Zfb2_5Pey1zWQB5U1zOj9njBpQ','2025-07-05 16:12:09'),(117,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTExMzgwNjMsImV4cCI6MTc1MTc0Mjg2M30.BcHcT9hJW9_TiRps5uAtbQ5XAc-0Tw8-XHNPD2DEw2o','2025-07-05 20:14:23'),(121,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTExNDMzNTMsImV4cCI6MTc1MTc0ODE1M30.7AZ_K5-nNCEKKPGDo2DxfdpUpGzoLt6q62kTuk13jM0','2025-07-05 21:42:33'),(130,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTEyMjQzNjMsImV4cCI6MTc1MTgyOTE2M30.BHP9N3bRDxJI1ko9Ur-dKlHZ_K7Sc16VPZWg0nNvlFk','2025-07-06 20:12:44'),(136,5,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInVzZXJOYW1lIjoiQ2FsdmluIEhlcm8iLCJpYXQiOjE3NTEzMDk4MjEsImV4cCI6MTc1MTkxNDYyMX0.NC3X23YurDn1MRQKjAJVKulZ-tYnmb_4WqYbclFxtmg','2025-07-07 19:57:02'),(139,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTE3NDUxNzcsImV4cCI6MTc1MjM0OTk3N30.T2ZWGcLvXlFv3Jtt0uXtcW3T1pZPdpM-lDG_zQCnfms','2025-07-12 20:52:57'),(142,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTE4Mjg3MTcsImV4cCI6MTc1MjQzMzUxN30.ns-MgTfal7HcuWUHn1sJmgw7ZIyWZz1C4CYl1DwClVs','2025-07-13 20:05:18'),(145,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTE5MjI4MzgsImV4cCI6MTc1MjUyNzYzOH0.ciCfSkiyOZvvukuBISz0ss3xAu2C079O_cz1aGYz1kA','2025-07-14 22:13:59'),(149,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTIzMjk5NjMsImV4cCI6MTc1MjkzNDc2M30.Gj2rR5xcqrVcxdMk5p5TB9pl6OpSYYMJ2toBfZcsPyk','2025-07-19 15:19:24'),(150,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTIzNTAyODYsImV4cCI6MTc1Mjk1NTA4Nn0.f4unGLwl1UNjDNJk1JogjGcC3_iwKiCN3Ft-VE1sIHc','2025-07-19 20:58:07'),(152,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTIzNTI0NjEsImV4cCI6MTc1Mjk1NzI2MX0.ZXIZbxa7StMpAWRjkvpQW4gNbe1yjOaaeBnCzwyl518','2025-07-19 21:34:22'),(154,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTI0MTkwMTQsImV4cCI6MTc1MzAyMzgxNH0.6GYMHJzNxGPlBHp_1GN6TvxG8GbiLTlbD_3nfllnNWI','2025-07-20 16:03:34'),(155,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTI0MjEyNjMsImV4cCI6MTc1MzAyNjA2M30.jb5ZHMWVGlwWp55_BnBMKrai7GcfsECJmI7PFuASjAY','2025-07-20 16:41:04'),(156,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTI5Mzk4OTIsImV4cCI6MTc1MzU0NDY5Mn0.O1vfnYx7Jupy1-zXrz20Ociibboz26un9yu32UidURA','2025-07-26 16:44:53'),(157,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTI5NDE0NTYsImV4cCI6MTc1MzU0NjI1Nn0.b4uAUsseavf8snkgkBRPG0FznvEdqS2XAoQfeTnuzZY','2025-07-26 17:10:56'),(158,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTI5NTAzOTgsImV4cCI6MTc1MzU1NTE5OH0.IQG6R7cBmSn7hI0G9mimZ983CYJns_DGovvPXmlPvwQ','2025-07-26 19:39:58'),(159,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTI5NTYzNDcsImV4cCI6MTc1MzU2MTE0N30.UEpE18UUZv4Xn9YwxjMh0ymVkbMQoYIavrkxiuxzm6Q','2025-07-26 21:19:07'),(160,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTI5NTc0OTgsImV4cCI6MTc1MzU2MjI5OH0.pP2RXkHNbo0RjGb8OeNbCK48UQG3RkY0wSAY74jLiAo','2025-07-26 21:38:19'),(161,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTI5NTg0MTYsImV4cCI6MTc1MzU2MzIxNn0.LwsFshCHxFOJBUUs5fruK6jr9LQbCD8g58-9aRUejKk','2025-07-26 21:53:37'),(165,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTMwMjIzODMsImV4cCI6MTc1MzYyNzE4M30.KPcrrx-js6rwKctY-m1Q18m1RblR0pyxTL-uwB1om-k','2025-07-27 15:39:43'),(166,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTMwMjQ5MjEsImV4cCI6MTc1MzYyOTcyMX0.Uj3ZjqTXcbKdzc_-tStCkL91oF1HudkgKCF_n-PCYmE','2025-07-27 16:22:01'),(167,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTMwMjYyMDksImV4cCI6MTc1MzYzMTAwOX0.UcuCoCsoyGzLSuhW7WOw4xtwQbh9zFr3yG5ilYuYxw4','2025-07-27 16:43:30'),(168,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTM0NTA2MzEsImV4cCI6MTc1NDA1NTQzMX0.MJqm2yvptTWpJBkUvuME0RL2NxXgWtNSi-zyjmkVaKc','2025-08-01 14:37:11'),(175,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTM1NTQ5NDgsImV4cCI6MTc1NDE1OTc0OH0.xVqZoJwkR8YG3sbafj6G5eqaVjKHadLSlHtMBDbG_x4','2025-08-02 19:35:49'),(186,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTQwNTg2ODYsImV4cCI6MTc1NDY2MzQ4Nn0.sWUuedwJQhclpgMwZ4o88DRLZc15CFe92bqDvEaXuA0','2025-08-08 15:31:26'),(190,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTQxNDgxNTksImV4cCI6MTc1NDc1Mjk1OX0.un5L0GF_jY0KaO70PMFa_UT_4SZtbyPYdBiRIBr2MrU','2025-08-09 16:22:40'),(192,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTQxNTIwMjgsImV4cCI6MTc1NDc1NjgyOH0.rFKtsepQb5n0HyxyYwNLkzoODzpok9L5eQr5cxOThtM','2025-08-09 17:27:09'),(195,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTQxNjMyMzMsImV4cCI6MTc1NDc2ODAzM30.9fXob_1QBn4wTCFYd5cs_6ds4qds_sFJjM6A7G0A3ZE','2025-08-09 20:33:54'),(197,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTQyMzEzNDgsImV4cCI6MTc1NDgzNjE0OH0.DEyUkmFXJfYEbQ6O3cwDA-ALim3KPQSbrxjobkSFeS8','2025-08-10 15:29:08'),(201,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTQyNDU0ODEsImV4cCI6MTc1NDg1MDI4MX0.ta0U4x6JLltd0p8Dwye-s5W3vDgLMNrN3I6u4GEWXEo','2025-08-10 19:24:42'),(202,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTQyNDY5NzMsImV4cCI6MTc1NDg1MTc3M30.5Qt_PJoDi08ObbWR_g1b3ybr0Lea4oCNPj7kmd_HxRI','2025-08-10 19:49:33'),(203,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTQyNDgxNDAsImV4cCI6MTc1NDg1Mjk0MH0.cPZUi7eQpVamHIT1SWRhjtuclQpoTEnSpZMbN25yV3s','2025-08-10 20:09:00'),(206,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTQyNTI2MTQsImV4cCI6MTc1NDg1NzQxNH0.pDVSRAkd1kEZeOhlHxEHHq0-9mZnSY2tYWGJiDxuy28','2025-08-10 21:23:35'),(210,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTQ1NzQ0NDIsImV4cCI6MTc1NTE3OTI0Mn0.KDiRutMnjmjmtDIUTB13mF9mtt1ruAExW-4PFrm5LYY','2025-08-14 14:47:23'),(211,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTQ1NzU0MjksImV4cCI6MTc1NTE4MDIyOX0.nM9tnSAgEzpwyw3idRxQZh3zM2EOhwHnKnILnCu9r3o','2025-08-14 15:03:50'),(217,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTQ3NTE5NTcsImV4cCI6MTc1NTM1Njc1N30.XUYuvPfIQ7Ws70U5PMZi8uFYWDGttV_Kd6ru5olPVQU','2025-08-16 16:05:57'),(218,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTQ3NTMwMzcsImV4cCI6MTc1NTM1NzgzN30.XKourRZse96cQoRRk9F-327LioDNrW6OcJjxkXkk97Y','2025-08-16 16:23:57'),(219,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTQ3NTQ3NDMsImV4cCI6MTc1NTM1OTU0M30.0dQMfZZOr42jXqyGd_g34Q4PJ5UZ0826mdHWMfDXKe8','2025-08-16 16:52:24'),(221,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTQ3NjU3NTIsImV4cCI6MTc1NTM3MDU1Mn0.kCnMZUfEaca6s96ywsfFeFbXFdIVCM-577OQ3mu8QD0','2025-08-16 19:55:52'),(223,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTQ4MzU3MTAsImV4cCI6MTc1NTQ0MDUxMH0.uC6fLoTcC9yfNSm0UzXw-a9CDlDnerjOwJMFBda8Qcg','2025-08-17 15:21:51'),(226,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTQ4NTE0MjYsImV4cCI6MTc1NTQ1NjIyNn0.UtykudUcbC4D4Uf9jggX_tY6lyQy-1aIXf1osnDu-ao','2025-08-17 19:43:47'),(227,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTQ4NTM3MTMsImV4cCI6MTc1NTQ1ODUxM30.7BXyvEXNTivm2q3SzkC7ecxP944DqETX_VecVDQ-NEI','2025-08-17 20:21:54'),(228,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTQ4NTQ4ODQsImV4cCI6MTc1NTQ1OTY4NH0.lPLxd9BIoRRBom5QOz2u_bXTe0rwyuKGFIahHCkcR38','2025-08-17 20:41:24'),(229,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTUxNzY1OTIsImV4cCI6MTc1NTc4MTM5Mn0.FJ9uTKpdCwOw-MG1vvSEEZ0rjdyp9GNcdcbjrTet714','2025-08-21 14:03:12'),(230,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTUzNTAzNjQsImV4cCI6MTc1NTk1NTE2NH0.4TThTfPnzrYAp4-akYx9wIeZCPgDiDNC_HJb7YON5rk','2025-08-23 14:19:24'),(231,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTUzNTM3MDksImV4cCI6MTc1NTk1ODUwOX0.Y37_anntvYbywgWRskL-E_K5DV08VpmTziaLjG0GCRk','2025-08-23 15:15:10'),(232,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTUzNjEzMjAsImV4cCI6MTc1NTk2NjEyMH0.9rePrD1HUYhAjQVFWg4S7fZ8KdYcS8XHbn8gJ4sh79s','2025-08-23 17:22:00'),(234,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTUzNzExNzIsImV4cCI6MTc1NTk3NTk3Mn0.ZMI3ZCfEjgiVbHO0DYN3Fx8qDdOM4-RkLQPgB9jx84Q','2025-08-23 20:06:13'),(236,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTU0MzMzMDAsImV4cCI6MTc1NjAzODEwMH0.zAM7EWa3YxGw6ELPqPhMSntwpjY68WxQvS_Ig-E51mU','2025-08-24 13:21:41'),(237,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTU0MzcwMDEsImV4cCI6MTc1NjA0MTgwMX0.ooewMEl1cY9bOeuq1JuBM2q2CPN04CRNlbBm4wBmNrE','2025-08-24 14:23:21'),(238,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTU0Mzc5MTgsImV4cCI6MTc1NjA0MjcxOH0.Clg4vd9dHNYkNvrv0dvlptIr3-592F1N3lh_nEpeq7Q','2025-08-24 14:38:38'),(239,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTU0NDMzNzYsImV4cCI6MTc1NjA0ODE3Nn0.GB0pa1NbLaU3DWOfif4ZB8t6svLAkA5eHy8Dtzpy5Ps','2025-08-24 16:09:37'),(240,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTU0NDQwNzIsImV4cCI6MTc1NjA0ODg3Mn0.6qKg42l2fxJoFCpRz-JAmLkanfLO0FwLXsynJmrKrIQ','2025-08-24 16:21:12'),(241,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTU0NDU1OTcsImV4cCI6MTc1NjA1MDM5N30.LL48sqFC8oVsNsY_R5uVU4cMObvrclDtrsN3rT2NyN8','2025-08-24 16:46:37'),(245,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTU0NDg4NzcsImV4cCI6MTc1NjA1MzY3N30.-09xBIhT2pBF4LbCXtZ4u9A7UUi7QboKImLI0ykvcvQ','2025-08-24 17:41:17'),(246,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTU0NDkxMDMsImV4cCI6MTc1NjA1MzkwM30.X9kWrxk_zmVjFm0PJEgt2mZ74Akn8xv4haZKpEFitXc','2025-08-24 17:45:03'),(247,5,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInVzZXJOYW1lIjoiQ2FsdmluIEhlcm8iLCJpYXQiOjE3NTU0NDkxMzAsImV4cCI6MTc1NjA1MzkzMH0.9kmiMiBLcSfXwKdLZn2achpeciBE8MRKDLqcQk8ts3Y','2025-08-24 17:45:30'),(252,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTU0NTEzMzYsImV4cCI6MTc1NjA1NjEzNn0.ykej4kABvdMnkcClHx5Leo0TshVCg-N3gcirUoIfW3I','2025-08-24 18:22:17'),(258,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTU3MDMzMzUsImV4cCI6MTc1NjMwODEzNX0.5TrjVUrwH1VSMtHl-qgu21gutxFU7KyxfSFi9kEY50E','2025-08-27 16:22:15'),(259,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTU3MDgxMzAsImV4cCI6MTc1NjMxMjkzMH0.w-O-FkOVcGQJSh76b-Yhk-dkEEHOGnaEFZp2Uw2wWe0','2025-08-27 17:42:11'),(261,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTU3ODQ1NzgsImV4cCI6MTc1NjM4OTM3OH0.-gaVaIddPOwmIi7pmSlrvVNGsNFCjK8JW2_n5RLJNPQ','2025-08-28 14:56:19'),(262,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTU3ODgzNTMsImV4cCI6MTc1NjM5MzE1M30.M__w1NbbZXEJHQo9ere16TLT3xhANREc9tOu6GJccYg','2025-08-28 15:59:13'),(263,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTU5NTU5MzgsImV4cCI6MTc1NjU2MDczOH0.YbQveZz1ZROo4qa3nXso8818jh5eqJ3xsFQJJL9QUDQ','2025-08-30 14:32:18'),(264,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTU5ODE2NDIsImV4cCI6MTc1NjU4NjQ0Mn0.qufy79_95fL2cMiIbhMN94SzMExsnym6dyEjduSsamk','2025-08-30 21:40:42'),(266,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTYwNDA2NzIsImV4cCI6MTc1NjY0NTQ3Mn0.gjmwMpskJsGY8hJoyvjG6UaN7WQGlRl88NrDmzWirx0','2025-08-31 14:04:33'),(267,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTYwNDE2MjMsImV4cCI6MTc1NjY0NjQyM30.UpFJIu1CAYWQ1iK1yxAFt1XvJvjlkMc1tZShnjSNik4','2025-08-31 14:20:23'),(268,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTYwNDI4OTIsImV4cCI6MTc1NjY0NzY5Mn0.Oov1-RjBG1ByZtDPQZghT-Oq9b7XzTjSkRlloSx2vGc','2025-08-31 14:41:33'),(269,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTYwNDUyNDcsImV4cCI6MTc1NjY1MDA0N30.IwMWUIiwfNhzwIYJZotIV3dTrtnxBMVDSr0Xn5KevXU','2025-08-31 15:20:47'),(272,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTYwNDczMjEsImV4cCI6MTc1NjY1MjEyMX0.U54xpXpKg6E7d7s-e2fVvazEVuLXkbQk8LvmPVXgKzo','2025-08-31 15:55:21'),(273,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTYxNDkzNzksImV4cCI6MTc1Njc1NDE3OX0.lwBCan-H9791yOzCvTXDNCnmbB2jMvYFo972Ifkvomk','2025-09-01 20:16:19'),(277,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTY1NTg3OTMsImV4cCI6MTc1NzE2MzU5M30.Hgtd_EIa4aWbFlNpSbGJKO3-mMXC0tTK23ggMuXbn0Y','2025-09-06 13:59:54'),(279,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTY1NjcyMTYsImV4cCI6MTc1NzE3MjAxNn0.0ItCnLFsVWdQArKCT9Mh3JZag3OZUM81n9D5K7tM1B8','2025-09-06 16:20:16'),(280,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTY1NjgyMzksImV4cCI6MTc1NzE3MzAzOX0.umnH3elvXACv_BBMY6UuutsgEj9h7OAXPA34z3k8AeY','2025-09-06 16:37:19'),(282,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTY1ODYwMjUsImV4cCI6MTc1NzE5MDgyNX0.Y8AVNMVgd6DtqqMAd2Cyhp_VVg_Y6B7XEbKPBwXkFEk','2025-09-06 21:33:46'),(284,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTY2NTI5MjEsImV4cCI6MTc1NzI1NzcyMX0.FeCAWmcE1nHvnGdCQAfXXahnTd6pNetDu1c7N_AcxEY','2025-09-07 16:08:41'),(285,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTY2NTU2ODUsImV4cCI6MTc1NzI2MDQ4NX0.p-Ydq9EeS7rr8kYCsUfVBbRaek0TGpg_OFJYKYAoJkc','2025-09-07 16:54:45'),(286,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTY2NTY3OTMsImV4cCI6MTc1NzI2MTU5M30.5YRiH_ZlwZKHHQ7wIpv0YjFXB5WHer7ZX7gXhA9GnTU','2025-09-07 17:13:13'),(290,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTcwODQ3MzQsImV4cCI6MTc1NzY4OTUzNH0.lMtkQqlwOLKrctpRYtaaIXPQ80Ni6-UnmFpTitnnIwQ','2025-09-12 16:05:34'),(302,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTc3NzYwMzksImV4cCI6MTc1ODM4MDgzOX0.ic9KrIWEcuV-PH2KFn9LbVOlnKTioJfKLGMqOsZHaZo','2025-09-20 16:07:19'),(309,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTc3OTcyNTUsImV4cCI6MTc1ODQwMjA1NX0.bCd-NADe91T-4rBQVFjsuCkGF78OrSZEuBgpejhYxL8','2025-09-20 22:00:55'),(311,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTc4NTg1ODYsImV4cCI6MTc1ODQ2MzM4Nn0.IFl6TLTuwp3sCDF5TWPYjztivgilZDGO-8OykwjOwxE','2025-09-21 15:03:07'),(312,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTc4NTk5MjMsImV4cCI6MTc1ODQ2NDcyM30.zgjn3o0nFJZQRFXoYj7A0tzmIBWNcBazzHy_x7tdNSc','2025-09-21 15:25:24'),(316,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTc4NjQzMDIsImV4cCI6MTc1ODQ2OTEwMn0.ptrWk5NWEBQ5b3_k_5iucwhHEuzoVsee1ZVK1hCxA3A','2025-09-21 16:38:23'),(317,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTc4NjU0NTUsImV4cCI6MTc1ODQ3MDI1NX0.Qivgt607carUfXh6fAgvUoysT4tWj8c1PLVTpvIZTno','2025-09-21 16:57:35'),(319,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTkwNzAxNDMsImV4cCI6MTc1OTY3NDk0M30.bdEugM59bMqIb1qocKHcIh97I1vW9wUJWrkDR5N6InQ','2025-10-05 15:35:44'),(325,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTk1ODY4NDUsImV4cCI6MTc2MDE5MTY0NX0.06tiNqheidJDpfa47hmSlzFakBg4JCkPudeZuti5OyA','2025-10-11 15:07:26'),(326,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTk1ODc5MjYsImV4cCI6MTc2MDE5MjcyNn0.nxwMsejAgUXGNRTITkfFIoMrGdh9teofK6tHFjESjT4','2025-10-11 15:25:27'),(327,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTk1ODk1NzgsImV4cCI6MTc2MDE5NDM3OH0.yHIhvGoEypvQ5Nf_bHyPuIg0Qsg4dfvC_9ytXFOKrOM','2025-10-11 15:52:59'),(334,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NTk2NzM1NTIsImV4cCI6MTc2MDI3ODM1Mn0.XtNriUeoeuY7VQpqALELQa2uvZdDbKV3PWmdBT827Ss','2025-10-12 15:12:33'),(344,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjAxOTY4ODksImV4cCI6MTc2MDgwMTY4OX0.BWdqsHTyYxGK6w9U1gTtOuBthzie0vkd0rAx5YbPYvI','2025-10-18 16:34:49'),(347,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjAyNzc5MzMsImV4cCI6MTc2MDg4MjczM30.NYdQXkvnim0BkhVI0qj2xKmjcwpceIcOgdaxMNEmkIU','2025-10-19 15:05:33'),(349,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjAyODAyNjUsImV4cCI6MTc2MDg4NTA2NX0.w6G_Y7lvRwmagfpORLuy50OsidWZ1WBn0TYO6xg359o','2025-10-19 15:44:25'),(355,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjAzNjkwNTcsImV4cCI6MTc2MDk3Mzg1N30.DOG5hwxgDHdUujiRa1XhzzJNffoKWa8TPY_lmwaZNV0','2025-10-20 16:24:18'),(357,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjAzNzIxMjgsImV4cCI6MTc2MDk3NjkyOH0.4LGDj6ADAMwr4xzqRLFJmewaEx0huMPwvm2E8SoxV-Q','2025-10-20 17:15:28'),(361,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjA2MjU2NjIsImV4cCI6MTc2MTIzMDQ2Mn0.i7ITeR2ogh-IrAZfBHnX9rzWAVrWhcAmQUIGWv2Yg4c','2025-10-23 15:41:03'),(366,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjA4MDM0NDUsImV4cCI6MTc2MTQwODI0NX0.fPRTsY8klpWyRbwR1Dd8jHtse7ood5MVh1fQ8z4jegY','2025-10-25 17:04:05'),(382,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjE4Mzg1MjcsImV4cCI6MTc2MjQ0MzMyN30.TxmmQub7wcZWYrOFOyeE-deOuUviiv9zesb9a8hBgTc','2025-11-06 16:35:28'),(387,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjIwMjE1MTQsImV4cCI6MTc2MjYyNjMxNH0.YHoO24vARDRqHqAWkMJpkVTcKGCjkNmEKuRmtha-oQA','2025-11-08 19:25:15'),(388,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjIwMjQzNTgsImV4cCI6MTc2MjYyOTE1OH0.f5JR6Qijjvm5LwFL-9e7juNmyWrr864ZKAFsUlqKAFQ','2025-11-08 20:12:38'),(392,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjI3MTg0NjksImV4cCI6MTc2MzMyMzI2OX0.VLI8hNYTJzWG_BMWQNtIAqOMWRR2jJpsglXqamFAm9w','2025-11-16 21:01:10'),(394,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjMwMzg4NTksImV4cCI6MTc2MzY0MzY1OX0.vQP7g1LSBS3lPDyixSBKiCmLETXLMaAWjJMCQXRU_M8','2025-11-20 14:01:00'),(395,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjMwNDAwODIsImV4cCI6MTc2MzY0NDg4Mn0.LmN6QdCOAfVCDLg1a02dSGubra8Cn-sTblmqy7y6pOA','2025-11-20 14:21:23'),(396,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjMwNDEwMzQsImV4cCI6MTc2MzY0NTgzNH0.z8Hwd0jIOzERhDThz4gT8TqP5UkT2NDSpNqVC9ziGYo','2025-11-20 14:37:15'),(400,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjMzMTc3OTYsImV4cCI6MTc2MzkyMjU5Nn0.7hAQQY5XtrfyAnlR2m_YQGndQwkhi2MZRsbEA80agaU','2025-11-23 19:29:56'),(402,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjMzMjUyNDUsImV4cCI6MTc2MzkzMDA0NX0.T-tTYZlXTqfzeIDUEdDhLmSzgx4E1mS46eLDa5rxwYQ','2025-11-23 21:34:06'),(407,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjM2NTEyNDEsImV4cCI6MTc2NDI1NjA0MX0.9N0U49s9D87LzAE-oGq-oXlhC0ZTfhGXOd1AeSNwppg','2025-11-27 16:07:21'),(409,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjM2NjQ1MzgsImV4cCI6MTc2NDI2OTMzOH0.09EYHSi7DhIIbb9eab1QJsKCz--nPpeusaVM-c2nMaQ','2025-11-27 19:48:58'),(413,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjM2NjgzODMsImV4cCI6MTc2NDI3MzE4M30.h9CbhH5T4B7_7wkXjguf4xKb-zFxUvzUNXkj26Yzrgo','2025-11-27 20:53:04'),(415,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjM2NzAzODUsImV4cCI6MTc2NDI3NTE4NX0.AEJKL3HTjbtqhhrGZfyCixMbip-ABHBcLSLYo19C57g','2025-11-27 21:26:25'),(416,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjM2NzE1MDQsImV4cCI6MTc2NDI3NjMwNH0.JMTfH8I0RP2Ewo9ODtZyDaaigIvKJeCV95tAoyKuMpY','2025-11-27 21:45:04'),(417,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjM5MjI3ODIsImV4cCI6MTc2NDUyNzU4Mn0.YhV-erZwP6hRtqmq3qt52Vv-bPhjzW2FdWUlliE6Atg','2025-11-30 19:33:03'),(418,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjM5MjM5NzAsImV4cCI6MTc2NDUyODc3MH0.tj6F3U9J4_L2Ib03W3wOe4RwIOVKqv-zStbq5PhcyYs','2025-11-30 19:52:50'),(419,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjM5MjQ5MDIsImV4cCI6MTc2NDUyOTcwMn0.9P-w7efqJ4oE8meY20zmnyc-lGBHwB9ZIvA09BDgSPA','2025-11-30 20:08:23'),(420,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjM5MjY0NDQsImV4cCI6MTc2NDUzMTI0NH0.4tU5cCzzHbHYb2QUHsOxacQ0K4mrKyQ8jaTkJ95zTz4','2025-11-30 20:34:04'),(423,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjQ0NDY3MTUsImV4cCI6MTc2NTA1MTUxNX0.qe6AkG7PF1CuyBz36ONJZokO5ZIRF99x7q1LzfQEIGw','2025-12-06 21:05:15'),(424,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjQ0NDc2MzYsImV4cCI6MTc2NTA1MjQzNn0.2GTtCjXYXA6gfUw3VOGD6r6iuzwurBO6LKQYYjYdC5g','2025-12-06 21:20:36'),(425,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjQ0NDg2MTIsImV4cCI6MTc2NTA1MzQxMn0.WTQZyGsg-pB5dh8d6SUBhtiXEpE5fqoAW8q_yZrfO7M','2025-12-06 21:36:53'),(426,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjQ1MzQxMjgsImV4cCI6MTc2NTEzODkyOH0.O7RG8vFuP30_Rf45EuMsM2B-WOZt2fZJWJhWMKb4Qe0','2025-12-07 21:22:08'),(428,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjQ4NTY3NzgsImV4cCI6MTc2NTQ2MTU3OH0.mBlAaOlFZTBxT6z0o21Ap6lldCW4yvdkEzM4X0BKxEE','2025-12-11 14:59:38'),(431,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjUwMzc4OTMsImV4cCI6MTc2NTY0MjY5M30.coDXLER-DSo8Pg6ts3Kz0aBbXq33lMGoXYt3wtCkBYY','2025-12-13 17:18:14'),(436,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjYyMjA2ODYsImV4cCI6MTc2NjgyNTQ4Nn0.6rWc7z8cV0GcvwVPkzNK_loo4LUTb4hoxw0a-aOZXoc','2025-12-27 09:51:26'),(437,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjYyMjI0OTUsImV4cCI6MTc2NjgyNzI5NX0.kHPAFmiiBI1dz2LhttuB4XTiOa8fHNP1JKptgIuQP00','2025-12-27 10:21:35'),(438,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjYyMjQyOTgsImV4cCI6MTc2NjgyOTA5OH0.OiCXFLhX2u8a2laSiOS6YxzzUUtVrIwQHfdmgL2jZLM','2025-12-27 10:51:39'),(439,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjYyMjU4OTQsImV4cCI6MTc2NjgzMDY5NH0.TbUKQKvb-JQqwfCXYKDfSzaYYlYMZR7zIVZyAiU47jk','2025-12-27 11:18:14'),(440,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjYyMjcwMTksImV4cCI6MTc2NjgzMTgxOX0.gXIjE0fsqhtzs1_TGqnsUJwiJJjwpal15fkFgwdTpZc','2025-12-27 11:37:00'),(441,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjYyMjc5NDksImV4cCI6MTc2NjgzMjc0OX0.2NM8UoF2yHXInny2yPeXM90yCVMoM1YeIBam2o4Gp4E','2025-12-27 11:52:30'),(442,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjYyMjkyNjUsImV4cCI6MTc2NjgzNDA2NX0.6YvBX11YX4x_TJsr6xFplzkC1KYSkYX0d09cl0NDJSU','2025-12-27 12:14:25'),(444,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjYzMTA5MzcsImV4cCI6MTc2NjkxNTczN30.7rJLGkCKViN7zL_3fA7BRH5DJiZ955fjf0GJB25SDdw','2025-12-28 10:55:37'),(446,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjYzMTIwNjAsImV4cCI6MTc2NjkxNjg2MH0.-ZJdwaOY2z7G9W7WIpKYdJIzgZ8d4voa7SZcYSRaTcQ','2025-12-28 11:14:20'),(447,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjYzMTMwNjAsImV4cCI6MTc2NjkxNzg2MH0.2fn22fxup5ysyXF3BH-d_6AorU5Mr8_TGOOQQMX0Vmk','2025-12-28 11:31:00'),(448,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3Njc0MzQ0NzEsImV4cCI6MTc2ODAzOTI3MX0.4cBTZJbOY6JHrq0Xru4C1VLZqAFAE0oqqotO2dp-PsE','2026-01-10 11:01:12'),(449,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3Njc0MzcyMTAsImV4cCI6MTc2ODA0MjAxMH0.vjW_pKNktk8IXx4DzuxGrrd8pUEe7pvW6L0v1WRC1Jw','2026-01-10 11:46:51'),(450,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3Njc0Mzg5NjgsImV4cCI6MTc2ODA0Mzc2OH0.Vw77iFcvbPjANzcvIfQFUvmUWvbcx1VhLaag1t4Ab_Y','2026-01-10 12:16:09'),(451,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3Njc0NDA0NzksImV4cCI6MTc2ODA0NTI3OX0.RPwiD6WOqHsOeVB5UJe4GsffR7kPGq444jAx9KLbzGE','2026-01-10 12:41:20'),(459,5,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInVzZXJOYW1lIjoiQ2FsdmluIEhlcm8iLCJpYXQiOjE3Njc0NDMzNDMsImV4cCI6MTc2ODA0ODE0M30.wjk-VQdj9JJArS2Pc5P9TGymUQ0lubZ_dP-Q-F40_xU','2026-01-10 13:29:04'),(460,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3Njc1MjA5MDIsImV4cCI6MTc2ODEyNTcwMn0.nz9vua7CvjUnV93xN6Ziep91SLlG3vOBp7jT3zf47zY','2026-01-11 11:01:43'),(462,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3Njc1MjM3NDMsImV4cCI6MTc2ODEyODU0M30.7GjsRqSauH42BZVC2qFleturHWMBkLPwy7POUDppFVY','2026-01-11 11:49:03'),(463,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3Njc1MjQ5NDMsImV4cCI6MTc2ODEyOTc0M30.KRldfZyATj3xCgb53kDowbcGvd7HST4sKD1RYZZBBVc','2026-01-11 12:09:03'),(466,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3Njc1MjgzMzYsImV4cCI6MTc2ODEzMzEzNn0.u1QfJCyECPZqN3ScnJRULoyQ-SOt-6se33jxiajd9I0','2026-01-11 13:05:36'),(468,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3Njc2OTM3MTYsImV4cCI6MTc2ODI5ODUxNn0.Gr0SolzC-fubWlfDikeg0ijHVWiueiJScOnuA_KS9_Y','2026-01-13 11:01:56'),(469,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3Njc2OTU0ODYsImV4cCI6MTc2ODMwMDI4Nn0.9FoF7DvPhPUUQx40tmAZ3jjicnOsDaxesZhTEqWNeME','2026-01-13 11:31:27'),(470,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3Njc2OTY2MzUsImV4cCI6MTc2ODMwMTQzNX0.WxmZEeA-P5TNdgOe_tV_LaVs7XydBQMursvwIsOmizY','2026-01-13 11:50:35'),(471,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3Njc2OTc4MDcsImV4cCI6MTc2ODMwMjYwN30.HS6pl6_CeRUycZGiKt2xLPLlMOhL3t9w0gZsPFZ5BYs','2026-01-13 12:10:07'),(472,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3Njc2OTkwMDIsImV4cCI6MTc2ODMwMzgwMn0.FBRa51aOctP5_-ubuol_sY1QGNkcul5SX5sGIwPtMQo','2026-01-13 12:30:02'),(474,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjgwMzg3MTcsImV4cCI6MTc2ODY0MzUxN30.Ko5uc0zsoetRWmoejhnrZ9HmbD-yr_RzKorWsyIjmnc','2026-01-17 10:51:57'),(475,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjgwMzk3OTYsImV4cCI6MTc2ODY0NDU5Nn0.PB6p4M7KclFK9PSx3tMqRGhfNjwi35BW777wqd5Pz0A','2026-01-17 11:09:57'),(476,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjgwNDA3NzYsImV4cCI6MTc2ODY0NTU3Nn0.EZCWK9_sofvMQKjD8Jt6Ha_jNW5POJt1_O42_Npgwjk','2026-01-17 11:26:16'),(477,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3Njg1NjM3ODAsImV4cCI6MTc2OTE2ODU4MH0.swZfErTwwcJbTQeaSxdBsyOkbVZtLgFPtfqdSV5A048','2026-01-23 12:43:00'),(479,5,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInVzZXJOYW1lIjoiQ2FsdmluIEhlcm8iLCJpYXQiOjE3Njg1NjgwNzEsImV4cCI6MTc2OTE3Mjg3MX0.5Dtb54SbPspWsFaB4qxMQkxZydQ7HFf7F-D6WQqDMhM','2026-01-23 13:54:31'),(480,5,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInVzZXJOYW1lIjoiQ2FsdmluIEhlcm8iLCJpYXQiOjE3Njg1NjkwNzYsImV4cCI6MTc2OTE3Mzg3Nn0.V4w-BoFSvXC8PqWx3uVJyRjKb8hITO3QrJcP3yGDkHI','2026-01-23 14:11:17'),(483,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NjkxMDQzOTksImV4cCI6MTc2OTcwOTE5OX0.FJVRizIKwwb9-hGFfzT9TYqNUGJcaI36velRMKT3WzY','2026-01-29 18:53:20'),(485,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NzAyOTQ5NjcsImV4cCI6MTc3MDg5OTc2N30.1UQrIiEXuTtvxEJtE0kTw9Uu4a-8BdAvK3BveWDBckA','2026-02-12 13:36:08'),(486,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NzAyOTU4ODUsImV4cCI6MTc3MDkwMDY4NX0.M2-moj0onAO74e3BCdnGjewbJHm90f91oG3iNXitNuo','2026-02-12 13:51:26'),(488,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NzAyOTc4NTcsImV4cCI6MTc3MDkwMjY1N30.iLQ7R5JVJ1PBGKmdv587Dy8usrpC72Dtnun3vLihCJk','2026-02-12 14:24:17'),(490,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NzAzMDA2NjgsImV4cCI6MTc3MDkwNTQ2OH0.bHr4nJbcnY6OsMvng2ZqVz2E5v7A-Q5FSnpx-4peLU4','2026-02-12 15:11:08'),(491,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NzAzMDE2MjYsImV4cCI6MTc3MDkwNjQyNn0.VxjL-O18rIqOApNbw-dNP5wVGlHwaJJfPsUi4tDImoo','2026-02-12 15:27:06'),(493,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NzAzODI5OTgsImV4cCI6MTc3MDk4Nzc5OH0.5RrmulVyTvbd72Fntw2vrXGT0SMUBp1gSfuXYOIkYD4','2026-02-13 14:03:18'),(494,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NzAzODM5NzEsImV4cCI6MTc3MDk4ODc3MX0.OXOZUiflH0SzSOuC1tNcUbwzrJ3Iatg9jmwGlZEZQtI','2026-02-13 14:19:31'),(495,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NzAzODU1MzMsImV4cCI6MTc3MDk5MDMzM30.8_ti1LY9MYsxaaskrFeMhQVzirskzpnF_97KBfPXm-M','2026-02-13 14:45:34'),(496,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NzAzODY1ODUsImV4cCI6MTc3MDk5MTM4NX0.jcuEpiv4JE2hLsrSKZgAbOfycsOsvxQBu1_6No8uZHI','2026-02-13 15:03:05'),(498,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NzA3NDY2ODUsImV4cCI6MTc3MTM1MTQ4NX0.kYSjbZrMRkV09HxatGKiGveLCmuDd8_LVEYowNI4oDo','2026-02-17 18:04:45'),(499,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NzA3NDgzODQsImV4cCI6MTc3MTM1MzE4NH0.lnb2m29UqnhAAtcByK_JALkm03dUpfs8dPDNfwNEKC4','2026-02-17 18:33:05'),(500,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NzA3NTExOTQsImV4cCI6MTc3MTM1NTk5NH0.2_klK8zrdPB_zC2OiuumerUMFbXGGm9-xcazWx291ac','2026-02-17 19:19:55'),(501,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NzQwMTkwNTEsImV4cCI6MTc3NDYyMzg1MX0.jn9dpkeFEAKJRkqRNFM4B5vTF-Zy5jLcapHEaLoa0qU','2026-03-27 16:04:12'),(502,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NzQwMjAwOTEsImV4cCI6MTc3NDYyNDg5MX0.agHFMUXLZLSz3mw27jHdWJfDWRkLVimdXBu7fc4uUAM','2026-03-27 16:21:32'),(504,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NzQwMjI3NTAsImV4cCI6MTc3NDYyNzU1MH0.bl1O-6bxpdI_79rWoZkHJDN_tVhkFClTRgSNtRhZs0I','2026-03-27 17:05:51'),(510,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NzQ3Mjk3ODYsImV4cCI6MTc3NTMzNDU4Nn0.Webw57oN17RgVol_xsNdfu73zxn1GrLtv5PhxyMvXig','2026-04-04 21:29:47'),(512,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NzUwNjgxODUsImV4cCI6MTc3NTY3Mjk4NX0.Fx48p4yfCvK-IkVOxfePCPvQ67p-Eg6ujV245zUDhyk','2026-04-08 19:29:46'),(513,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NzUwNzMxMTQsImV4cCI6MTc3NTY3NzkxNH0.xoj58HRxT4dVFd1gHU25P2bbu3DlRTiyx5Uvx144cgM','2026-04-08 20:51:54'),(515,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NzUyNDQwNjAsImV4cCI6MTc3NTg0ODg2MH0.vgv8HTraB6QmPi9plqY879Bg96xAcsxkDSXGGqisW-Y','2026-04-10 20:21:01'),(516,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NzUzMjc1NzgsImV4cCI6MTc3NTkzMjM3OH0.p6r6nJmaVY1vvHaLLwQ-6rbwBbB8rjj5Fr3hKzbCNGU','2026-04-11 19:32:59'),(517,5,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInVzZXJOYW1lIjoiQ2FsdmluIEhlcm8iLCJpYXQiOjE3NzUzMjk1MzQsImV4cCI6MTc3NTkzNDMzNH0.10hHkoLfwWsaPRyFMhaMNGLGgKLI5nxUamSxorf64FU','2026-04-11 20:05:34'),(521,3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJOYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE3NzU1OTEzNzMsImV4cCI6MTc3NjE5NjE3M30.ZKfc10_uPRNHGd_TafPaaA8mILOupwdvUeexdE8BzoM','2026-04-14 20:49:33');
/*!40000 ALTER TABLE `refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taxonomy_classes`
--

DROP TABLE IF EXISTS `taxonomy_classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taxonomy_classes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taxonomy_classes`
--

LOCK TABLES `taxonomy_classes` WRITE;
/*!40000 ALTER TABLE `taxonomy_classes` DISABLE KEYS */;
/*!40000 ALTER TABLE `taxonomy_classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `FullName` varchar(500) NOT NULL,
  `EmailAddress` varchar(500) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Fav_Cat` varchar(400) DEFAULT NULL,
  `background_img` varchar(512) DEFAULT NULL,
  `pfp_img` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Fav_Cat` (`Fav_Cat`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`Fav_Cat`) REFERENCES `cat_data` (`cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Tarik Diouane','ga@gmail.com','$2b$10$IEnqGc1HSFvuyb5HGOn/7OspLC8ubf4ILnpv9g6Lcp1bLXQArJTMS',NULL,NULL,NULL),(2,'Geralt Of Rivia','Geralt@gmail.com','$2b$10$j5H368JZ184g4ToR4SO.qOy03qN3hBmM6wDrYuD5xJKfZ44CM5AJO',NULL,NULL,NULL),(3,'John Doe','John@gmail.com','$2b$10$U7L3ICm.1Sjtha471UGHEu3RmLa3OvEvC5/2xpaBBQfA0A1yjoEGW',NULL,'https://res.cloudinary.com/dayrdslq5/image/upload/v1774730858/users/3/BG_Img.png','https://res.cloudinary.com/dayrdslq5/image/upload/v1774730874/users/3/Pfp.png'),(4,'Name Test','Test1@gmail.com','$2b$10$reZqLPoIJkqpGrgUK.8I9uaLRCdLXi.wduVaDAOZVLWriAgklsDAC',NULL,NULL,NULL),(5,'Calvin Hero','Cal96@gmail.com','$2b$10$MSY4w70E.7rTqRq07ycNVukBJrZSnFR.feBz95do5tMOGzQEnAI9i',NULL,'https://res.cloudinary.com/dayrdslq5/image/upload/v1751227632/users/5/BG_Img.png','https://res.cloudinary.com/dayrdslq5/image/upload/v1751227689/users/5/Pfp.png'),(6,'John Fromsoft','John6@gmail.com','$2b$10$v.0lGBKsFNKVpunlFg1I4.C3xDugzrwSsHXYbUBf04mG7Kgx6aaG.',NULL,'https://res.cloudinary.com/dayrdslq5/image/upload/v1755625094/users/6/BG_Img.png','https://res.cloudinary.com/dayrdslq5/image/upload/v1755625080/users/6/Pfp.png');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-23 16:53:03
