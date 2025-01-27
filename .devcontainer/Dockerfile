# Use Ubuntu as the base image
FROM ubuntu:22.04

# Install curl, zsh, git, and other necessary dependencies
RUN apt-get update && apt-get install -y \
  curl \
  unzip \
  zsh \
  git \
  sudo \
  ca-certificates \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Node.js 18 (LTS) using NodeSource
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && \
  apt-get install -y nodejs

# Install Bun using the official installer
RUN curl -fsSL https://bun.sh/install | bash

# Add Bun to the PATH
ENV PATH="/root/.bun/bin:$PATH"

# Install Oh My Zsh for a better Zsh experience
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended

# Set Zsh as the default shell
RUN chsh -s $(which zsh)

# Verify installations
RUN node -v
RUN npm -v
RUN bun -v
RUN zsh --version
RUN git --version

# Set working directory
WORKDIR /app

# Copy application code (optional)
COPY . .

# Expose application port (optional)
EXPOSE 3000

# Default shell for the container
CMD ["bun", "-v"]
