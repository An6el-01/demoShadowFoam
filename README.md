# ShadowFoam Demo Project

This project is a demo for managing and visualizing orders using a drag-and-drop interface. It is built with **Next.js**, **React**, and **TailwindCSS**.

This guide will walk you through how to install and run this project on **Windows**, **macOS**, and **Linux**.

---

## Features
- Drag-and-drop functionality for managing orders.
- Visualize nested items on a foam sheet.
- Simple control pad to adjust item positions.
- Cross-platform compatibility.

---

## Requirements
To run this project, ensure the following are installed on your system:
1. **Node.js** (version 18 or higher)
   - [Download Node.js](https://nodejs.org/)
2. **Git** (for cloning the repository)
   - [Download Git](https://git-scm.com/)

---

## Installation

### Step 1: Clone the Repository
1. Open a terminal or command prompt.
2. Run the following command to clone the repository:
   ```bash
   git clone https://github.com/An6el-01/demoShadowFoam.git
3. Navigate into the project directory

### Step 2: Install Dependencies
1. Run the following command to install the required dependencies.
   - npm install

## Running The Project
1. Start the development server.
   - npm run dev
2. Open your browser and visit
   - http://localhost:3000

## Platform Specific Instructions

### Windows
1. Download and install Node.js and Git if not already installed.
2. Follow the **Installation** and **Running The Project** steps above.

### macOS
1. Install Node.js using Homebrew:
   - brew install node
2. Install Git using Homebrew:
   - brew install git
3. Follow the **Installation** and **Running The Project** steps above.

### Linux
1. Install Node.js
   - sudo apt update
   - sudo apt install -y node.js npm
2. Install Git
   - sudo apt install -y git
3. Follow the **Installation** and **Running The Project** steps above.

## Troubleshooting

### Common Issues
1. "Command Not Found" errors:
   - Ensure Node.js and Git are properly installed by running (Both should return numbers.):
       - node -v
       - git --version
2. Port already in use:
   - If port **3000** is in use, you can specify a different port when running the development server:
       - npm run dev -- -p 30001
   
