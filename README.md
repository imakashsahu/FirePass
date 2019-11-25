# Firepass

Firepass is a password manager. Firepass stores your database in the cloud so
you can access it from anywhere, anytime, from any device with a browser. It
uses Google Firebase as storage and authentication backend. In contrast to
popular online password managers you have to host your own Firebase instance and
take control of your data. See "Installation" below for details.

Want to play with a demo?

* Visit https://firepass-demo.firebaseapp.com/
* Login: demo@demo.com (password: demo123)
* Database password: demo321

Firepass uses username/password authentication to restrict access to your
database. If your login credentials get compromised, your database is
susceptible to vandalism (deletion, corruption), but all passwords are safely
encrypted using your master password. All crytographic operations happen locally
and unencrypted data never leaves the client. See "Cryptographic Notes" below
for more information.

## Cryptographic Notes

Firepass encrypts the database with AES-256 in CBC operation mode. The 128 bit
initialization vector for CBC is randomized every time the database is
encrypted, and stored along with the encrypted database. The symmetric AES key
is derived from your master password using PBKDF2 with 2048 iterations and a
256 bit salt which is randomized whenever the master password is changed. The
salt is stored along with the encrypted database. The database is encrypted in
its entirety into one opaque binary blob as opposed to individually encrypted
entries. Thus, no information about the database contents is revealed. The byte
size of the encrypted database will, however, correlate with the number of
entries in the the database.

## Installation

* Run `npm install` from the Firepass root to install all dependencies.
* Setup a Google Firebase project (see "Firebase Setup" below for details).
* Enter your Google Firebase config in `src/config/firebase.ts`.
* Optional: Run `npm run start` to run a local development server.
* Optional: Host your Firepass instance on Google Firebase (read below).

## Firebase Setup

Firepass uses Google Firebase as storage and authentication backend. Firepass
supports authentication using the "Email/Password" sign-in method only. Once
signed in, Firepass uses the "Cloud Firestore" database backend to host your
(encrypted) password database.

### Setup your Firebase instance

* Add a new Firebase project using the
  [Firebase Console](https://console.firebase.google.com/).
* Enable the "Email/Password" sign-in method in the "Authentication" menu.
* Add "Email/Password" users in the "Authentication" menu.
* Create a "Cloud Firestore" database in the "Database" menu.
* Add the below security rules to your database.
* Add a web-app to your project in the Settings and obtain the Firebase config.

### Add Database rules

Add the following database security rules under the "Rules" tab in the
"Database" menu, which restricts users to accessing their own data only.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
  }
}
```

### Enable Firebase hosting

Firebase can also host your Firepass instance (optional, but recommended).

* Click on "Hosting" in the Firebase console.
* Click "Get Started" and follow the instructions (install the Firebase tools,
  and login from the command line).
* Create a production build (`npm run build`)
* Deploy the build (`firebase deploy`)
