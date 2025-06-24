
# IELTS Study Schedule

An application for scheduling and tracking the IELTS study progress, helping learners manage their time and study progress effectively.

## Key Features
- 📅 **Structured IELTS study schedule** for all 4 skills: Listening, Speaking, Reading, Writing.
- 📊 **Track study progress** with a visual progress chart.
- 🌓 **Supports dark/light mode** for user interface customization.
- ✅ **Update lesson status** (Not Started, In Progress, Completed, Overdue).
- 🔍 **Filters** for easily searching lessons by month, skill, and status.
- 📱 **Responsive design** for mobile devices.
- 💾 **Auto-save progress** to localStorage so the data is not lost after page refresh.

## Demo
Access the demo version at: [IELTS Study Schedule Demo](https://doando156.github.io/ielts-schedule/)

## Installation and Usage

### Requirements
- **Node.js** (version 12.x or higher)
- **npm** or **yarn**

### Installation
Clone the repository to your local machine:

```bash
git clone https://github.com/doando156/ielts-schedule.git
```

Navigate to the project directory:

```bash
cd ielts-schedule
```

Install dependencies:

```bash
npm install
```

### Usage
Start the app in development mode:

```bash
npm start
```

Access the application at:

```
http://localhost:3000
```

### Deployment
The project is configured to be deployed on **GitHub Pages**:

1. Ensure that the `homepage` field is set in `package.json`:

   ```json
   "homepage": "https://username.github.io/ielts-schedule"
   ```

2. Install **gh-pages** if not already installed:

   ```bash
   npm install --save-dev gh-pages
   ```

3. Deploy to GitHub Pages:

   ```bash
   npm run deploy
   ```

## Project Structure
```
ielts-schedule/
├── public/              # Static resources
├── src/                 # Source code
│   ├── components/      # React components
│   │   ├── CurrentDateIndicator.js
│   │   ├── Footer.js
│   │   ├── Pagination.js
│   │   ├── ScheduleFilter.js
│   │   ├── ScheduleTable.js
│   │   ├── StatsDashboard.js
│   │   └── ThemeToggle.js
│   ├── App.css         # Styles for the app
│   ├── App.js          # Main component
│   └── index.js        # Entry point for the app
└── package.json        # Project configuration and dependencies
```

## npm Commands
- `npm start`: Run the app in development mode.
- `npm run build`: Create an optimized version for production.
- `npm run deploy`: Deploy to GitHub Pages.
- `npm test`: Run tests.

## Technologies Used
- **React**
- **JavaScript (ES6+)**
- **CSS3**
- **LocalStorage API**
- **GitHub Pages**

## Author
**Do Doan**

## License
**Copyright (c) 2025 Do Doan**
