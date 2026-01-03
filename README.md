React Native Authentication App

A simple React Native authentication flow using Context API, React Navigation, and AsyncStorage.
This project demonstrates local user registration, login validation, persisted user data, and logout handling — without a backend.

Features

Login with email & password

Register user locally (name, email, password)

Persist user data using AsyncStorage

Logout clears authentication state

Conditional navigation based on authentication

Simple navigation with only three screens

Clean and minimal architecture

Screens

LoginScreen

RegisterScreen

HomeScreen

No additional screens are used.

Tech Stack

React Native

React Navigation (Native Stack)

Context API

AsyncStorage

TypeScript

Project Structure
src/
├── components/
│   └── AppInput.tsx
│
├── context/
│   └── AuthContext.tsx
│
├── navigation/
│   └── AppNavigator.tsx
│
├── screens/
│   ├── LoginScreen.tsx
│   ├── RegisterScreen.tsx
│   └── HomeScreen.tsx
│
└── App.tsx

Authentication Logic (How It Works)
Registration

Saves name, email, and password in AsyncStorage

Sets user in context

Navigates to Home screen

Login

Reads saved user from AsyncStorage

Compares entered email & password

If matched, sets user in context

Navigates to Home screen

Logout

Clears user from context

Does not remove registered user data

Navigates back to Login screen

App Reload Behavior

On app refresh, stored user data may still exist

Authentication depends on context state

No automatic session restoration is implemented

AsyncStorage Usage

Stored data includes:

{
  name: string;
  email: string;
  password: string;
}


Stored under a single user key.

Installation
npm install
cd ios && pod install


Run the app:

npx react-native run-ios
# or
npx react-native run-android

Important Notes

Passwords are stored in plain text (for demo purposes only)

This approach is not suitable for production

No backend or encryption is used

Intended for learning and prototyping