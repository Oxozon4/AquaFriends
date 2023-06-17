# AquaFriends - Aquarium Monitoring System

## Introduction

AquaFriends is a aquarium quality monitoring web system that aims to provide a free, easy-to-use, and portable solution for monitoring user's aquariums.
The application includes Admin panel view for creating aquarium templates, accessories, decorators, knowledge base and defining allowed fish types.
Dashboard view for user allows for personal Aquariums management and water parameters monitoring.

## Requirements
- Java 1.8
- NodeJS 19.8.1
- Npm 9.6.2

## Steps needed to run the application locally:

- Run docker desktop app
- In local-deployment run ./run_db.sh
- In main directory run mvn clean package
- In main directory run java -jar ./app-java/target/AquaFriends.jar or mvn spring-boot:run
