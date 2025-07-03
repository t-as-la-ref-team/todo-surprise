FROM jenkins/inbound-agent:latest-jdk17

USER root

# Install Docker, Node.js/npm, Cypress dependencies, Git, curl, unzip
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
 && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Sonar Scanner
ENV SONAR_SCANNER_VERSION=4.8.0.2856

RUN curl -Lo /tmp/sonar-scanner.zip https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-${SONAR_SCANNER_VERSION}.zip \
 && unzip /tmp/sonar-scanner.zip -d /opt \
 && mv /opt/sonar-scanner-* /opt/sonar-scanner \
 && ln -s /opt/sonar-scanner/bin/sonar-scanner /usr/bin/sonar-scanner \
 && rm -rf /tmp/sonar-scanner.zip

# ✅ Cypress : installation globale + binaire
RUN npm install -g cypress@14.5.1 \
 && cypress install

# Vérification des outils installés
RUN docker --version && npm --version && sonar-scanner --version && cypress --version

USER jenkins
