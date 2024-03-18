#!/bin/bash

# Check if environment argument is provided, default to "dev" if not provided
if [ $# -eq 0 ]; then
    ENVIRONMENT="dev"
else
    ENVIRONMENT="$1"
fi

# Configuration file specifying robots.txt for different environments
ROBOTS_CONFIG="robots-config.json"

# Read the robots.txt file for the specified environment from the configuration file
ROBOTS_FILE=$(jq -r ".$ENVIRONMENT" "$ROBOTS_CONFIG")

# Copy the specified robots.txt file to the root directory
cp "$ROBOTS_FILE" "robots.txt"
