FROM jenkins/jenkins:lts-jdk17

USER root

# Install Docker CLI (pour agent { docker } dans Jenkinsfile)
RUN apt-get update && apt-get install -y docker.io && apt-get clean

USER jenkins
