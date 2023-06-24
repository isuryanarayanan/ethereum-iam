#!/bin/bash

while true; do
    clear
    echo "===== Endpoint Menu ====="
    echo "1. Login with OTP"
    echo "2. Login with Google"
    echo "3. Logout"
    echo "0. Exit"

    read -p "Enter your choice: " choice

    case $choice in
        1)
            read -p "Enter your email: " email
            read -p "Enter the OTP code: " code
            curl -X POST -H "Content-Type: application/json" -d '{"email": "'"$email"'", "loginMethod": "otp", "code": "'"$code"'"}' http://localhost:3000/auth/login
            read -p "Press enter to continue..."
            ;;
        2)
            read -p "Enter your email: " email
            curl -X POST -H "Content-Type: application/json" -d '{"email": "'"$email"'", "loginMethod": "google"}' http://localhost:3000/auth/login
            read -p "Press enter to continue..."
            ;;
        3)
            curl -X POST http://localhost:3000/auth/logout
            read -p "Press enter to continue..."
            ;;
        0)
            echo "Exiting..."
            exit 0
            ;;
        *)
            echo "Invalid choice. Please try again."
            read -p "Press enter to continue..."
            ;;
    esac
done
