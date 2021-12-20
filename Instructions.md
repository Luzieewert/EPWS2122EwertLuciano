# Start API
* Install MongoDb
* cd Rapid Prototype/TicketFor2Api
* Install dependencies (yarn install || npm install)
* Run Server yarn (devStart || npm run devStart)

# Start App(Android)
* Install React Native CLI
* Setup an Emulator
* cd Rapid Prototype/TicketFor2
* Install dependencies (yarn install || npm install)
* Start Metro (yarn start || npm run start)
* Run Android (yarn android || npm run android)


# Connect Api on Localhost
***One Emulator:***

adb reverse tcp:PORT tcp:PORT

***Two Emulators:***

adb -s emulator1 reverse tcp:8001 tcp:8001
adb -s emulator2 reverse tcp:8001 tcp:8001

# Change Emulator Geolocation

adb emu geo fix longitude latitude
 ***or*** adb -s emulatorname emu geo fix longitude latitude
