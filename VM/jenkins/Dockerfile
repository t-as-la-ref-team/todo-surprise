FROM jenkins/jenkins:lts-jdk17

USER root

# Install dependencies and Docker CLI
RUN apt-get update && apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    python3 \
    python3-pip \
    python3-dev \
    build-essential \
    pipx \
    && curl -fsSL https://download.docker.com/linux/debian/gpg | \
       gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] \
        https://download.docker.com/linux/debian $(lsb_release -cs) stable" \
        > /etc/apt/sources.list.d/docker.list \
    && apt-get update && apt-get install -y docker-ce-cli


# Install dependencies for Docker CLI plugins
RUN apt-get update && apt-get install -y curl jq

# Download Docker Compose V2 plugin binary
RUN mkdir -p /usr/local/lib/docker/cli-plugins \
    && curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 -o /usr/local/lib/docker/cli-plugins/docker-compose \
    && chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

# Create docker group with GID 999 (or match your host's docker group GID)
RUN groupadd -g 996 docker || true

# Add jenkins user to the docker group
RUN usermod -aG docker jenkins

USER jenkins