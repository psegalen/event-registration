#!/bin/bash

# Function to detect OS
detect_os() {
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        echo "linux"
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        echo "darwin"
    elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
        echo "windows"
    else
        echo "unsupported"
    fi
}

# Function to detect architecture
detect_arch() {
    if [[ "$OS" == "windows" ]]; then
        # On Windows, use wmic to get the architecture
        arch=$(wmic os get osarchitecture | grep -o '[0-9]*-bit' | cut -d'-' -f1)
        if [[ $arch == "64" ]]; then
            echo "amd64"
        elif [[ $arch == "32" ]]; then
            echo "386"
        else
            echo "unsupported"
        fi
    else
        arch=$(uname -m)
        if [[ $arch == "x86_64" ]]; then
            echo "amd64"
        elif [[ $arch == "arm64" ]]; then
            echo "arm64"
        else
            echo "unsupported"
        fi
    fi
}

# Detect OS and architecture
OS=$(detect_os)
ARCH=$(detect_arch)

if [[ $OS == "unsupported" || $ARCH == "unsupported" ]]; then
    echo "Unsupported operating system or architecture"
    exit 1
fi

# Download and replace PocketBase
POCKETBASE_URL="https://github.com/pocketbase/pocketbase/releases/download/v0.16.3/pocketbase_0.16.3_${OS}_${ARCH}.zip"
POCKETBASE_ZIP="pocketbase.zip"

echo "Downloading PocketBase..."
if [[ $OS == "windows" ]]; then
    powershell -Command "(New-Object Net.WebClient).DownloadFile('$POCKETBASE_URL', '$POCKETBASE_ZIP')"
else
    curl -L $POCKETBASE_URL -o $POCKETBASE_ZIP
fi

echo "Extracting PocketBase..."
if [[ $OS == "windows" ]]; then
    powershell -Command "Expand-Archive -Path $POCKETBASE_ZIP -DestinationPath back -Force"
else
    unzip -o $POCKETBASE_ZIP -d back/
fi
rm $POCKETBASE_ZIP

echo "Backend successfully deployed!"

# Initialize the frontend
echo "Initializing frontend..."
cd front
yarn install
cd ..

echo "Frontend successfully deployed!"
