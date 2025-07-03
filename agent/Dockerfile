FROM jenkins/inbound-agent:latest-jdk17

USER root

# Install Docker + Cypress dependencies + NodeJS + Sonar
RUN apt-get update && apt-get install -y \
    docker.io \
    git \
    curl \
    npm \
    unzip \
    xvfb \
    libgtk-3-0 \
    libnss3 \
    libasound2 \
    libxss1 \
    libx11-xcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxrandr2 \
    libgbm-dev \
    libxshmfence-dev \
    libglu1-mesa \
 && apt-get clean

# Install sonar-scanner manually
RUN curl -Lo /tmp/sonar-scanner.zip https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.8.0.2856.zip \
 && unzip /tmp/sonar-scanner.zip -d /opt \
 && mv /opt/sonar-scanner-* /opt/sonar-scanner \
 && ln -s /opt/sonar-scanner/bin/sonar-scanner /usr/bin/sonar-scanner

USER jenkins
