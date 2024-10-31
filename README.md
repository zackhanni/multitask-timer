# Multi-Timer App

A simple, open-source Next.js app that allows users to set, manage, and export multiple timers. Designed for web and desktop with Electron support.

## Features

- **Multiple Timers**: Add, rename, and delete as many timers as needed.
- **Single Timer Mode**: Toggle setting to allow only one timer to run at a time.
- **Start, Pause, and Reset**: Controls for each timer to customize time tracking.
- **Export Timer Data**: Export timer data as a CSV file for easy record-keeping.

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/username/multi-timer-app.git
   cd multi-timer-app
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run the App**:

   - **Web**: Start the development server

     ```bash
     npm run dev
     npm run start-electron

     ```

   - **Desktop** (Electron): Run with Electron to package as a desktop app.

````bash
   npm run make
   ```

## Usage

- **Add a Timer**: Enter a timer name in the input box and press "Add Timer" or hit "Enter."
- **Rename a Timer**: Click the edit icon to rename any timer.
- **Export Data**: Go to the Settings tab and export all timer data as a CSV.

## Settings

- **Single Timer Mode**: Toggle this to enforce only one active timer at a time.

## Development

This app is built using Next.js with React and TypeScript. The Electron integration enables cross-platform desktop functionality.

## Contributing

Pull requests are welcome! For major changes, please open an issue to discuss the changes first.

## License

This project is open source and available under the [MIT License](LICENSE).
````
