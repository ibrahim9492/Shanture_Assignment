# 📊 Shanture Frontend (Analytics Dashboard)

A responsive **React-based analytics dashboard** for visualizing business data. It features a modern, clean UI with a **dark theme**, date range selection, and dynamic data visualization using **ECharts**. The application communicates with the `Shanture-backend` API to fetch and display real-time analytics.

## 🚀 Features

  * **Dark Theme:** A professional dark mode with a cohesive color scheme.
  * **Responsive UI:** Optimized for desktop and mobile devices.
  * **Date Range Selection:** Easily filter data using the integrated date picker.
  * **Dynamic Charts:** Visualizes key metrics like revenue and sales trends.
  * **ECharts Integration:** Utilizes Apache ECharts for powerful and customizable data visualization.
  * **Secure API Communication:** Fetches data from protected backend endpoints using **JWT authentication**.
  * **Modular Components:** Organized folder structure for maintainability.

## 📂 Project Structure

```
shanture-frontend/
├── src/
│   ├── components/       # Reusable components (e.g., AnalyticsDashboard, ThemeContext)
│   ├── theme/            # Theme configuration (light and dark palettes)
│   ├── services/         # API service (e.g., a file for Axios setup)
│   ├── pages/            # Application pages (e.g., DashboardPage)
│   ├── App.js            # Main application component
│   └── index.js          # Entry file
├── public/
├── package.json
└── README.md
```

-----

## ⚙️ Installation

To set up the frontend project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ibrahim9492/shanture_Assignment.git
    cd shanture_Assignment
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
    This will install key packages like `@mui/material`, `react-datepicker`, and `echarts-for-react`.

-----

## ▶️ Running the Project

To start the development server:

```bash
npm run dev
```


## 🎨 Styling & Theming

The application is styled using **Material-UI (MUI)**. The dark theme is implemented via a **React Context** to allow for easy toggling across the entire application.

### Theme Implementation Details:

  - A **`ThemeContext`** manages the theme state (`light` or `dark`).
  - The **`ThemeProvider`** from MUI wraps the entire application, making the theme accessible to all components.
  - **`useTheme()`** and **`useContext()`** hooks are used to retrieve the current theme and the theme toggle function.

## 📊 Perfecting the Charts

The application uses `echarts-for-react` to render charts. To ensure the charts look perfect in both themes:

  - The chart's `backgroundColor` is set to **`transparent`**.
  - **MUI's theme palette** is directly used to style the chart elements (e.g., axis labels, lines, and data series colors). This creates a seamless and integrated look that automatically adapts to the selected theme.

-----

## 🔧 Dependencies

| Package                | Version  | Purpose                                   |
| ---------------------- | -------- | ----------------------------------------- |
| `react`                | ^18.2.0  | The core React library.                   |
| `@mui/material`        | ^5.15.11 | Modern UI components and styling.         |
| `@emotion/react`       | ^11.11.4 | CSS-in-JS library for MUI.                |
| `react-datepicker`     | ^6.0.0   | Calendar and date range picker.           |
| `echarts`              | ^5.4.3   | Powerful charting library.                |
| `echarts-for-react`    | ^3.0.2   | React wrapper for ECharts.                |
| `axios`                | ^1.6.8   | Promise-based HTTP client for API calls.  |

## 🤝 Contributing

Contributions are welcome\! If you have suggestions or find a bug, please open an issue or submit a pull request.

1.  Fork the repository.
2.  Create your feature branch: `git checkout -b feature/my-new-feature`
3.  Commit your changes: `git commit -am 'Add new feature'`
4.  Push to the branch: `git push origin feature/my-new-feature`
5.  Open a Pull Request.

## 📜 License

This project is licensed under the MIT License.

## 👨‍💻 Author

  * **Ibrahim Shaik** - [GitHub Profile](https://www.google.com/search?q=https://github.com/ibrahim9492)
