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

OS=$(detect_os)

# Start the backend and frontend
echo "Starting backend and frontend..."

FRONTEND_URL="http://localhost:5173"
if [[ $OS == "darwin" ]]; then
    # macOS
    osascript -e 'tell app "Terminal" to do script "cd '$(pwd)'/back && ./pocketbase serve"'
    osascript -e 'tell app "Terminal" to do script "cd '$(pwd)'/front && yarn start"'
    sleep 5  # Give some time for the servers to start
    open "$FRONTEND_URL"
elif [[ $OS == "linux" ]]; then
    # Linux (assuming a Gnome-based desktop environment)
    gnome-terminal -- bash -c "cd $(pwd)/back && ./pocketbase serve; exec bash"
    gnome-terminal -- bash -c "cd $(pwd)/front && yarn start; exec bash"
    sleep 5  # Give some time for the servers to start
    xdg-open "$FRONTEND_URL"
elif [[ $OS == "windows" ]]; then
    # Windows
    start powershell -Command "back\pocketbase serve"
    start powershell -Command "cd front; yarn start"
    sleep 5  # Give some time for the servers to start
    start "" "$FRONTEND_URL"
else
    echo "Unsupported operating system for automatic terminal opening"
    echo "Please manually run the following commands in separate terminals:"
    echo "1. cd $(pwd)/back && ./pocketbase serve"
    echo "2. cd $(pwd)/front && yarn start"
    echo "Then open $FRONTEND_URL in your browser"
fi