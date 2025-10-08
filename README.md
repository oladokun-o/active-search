Good catch — you’re right. The README should include a **short, thoughtful “Notes on Approach” section** so reviewers see your reasoning and structure clearly.

Here’s an improved, **clean and professional** `README.md` version — fits your Expo + TypeScript setup and ticks all the evaluation boxes.

---

````md
# 🛍️ Active Search (Expo React Native + TypeScript)

A minimal **e-commerce product search demo** built using **Expo (React Native)** and **TypeScript**.

This project demonstrates a simple but realistic example of **active search** — fetching and displaying products as the user types, with loading, empty, and error states.

---

## 🚀 Setup / Run Steps

1. Clone the repo
   ```bash
   git clone https://github.com/oladokun-o/active-search.git
   cd active-search
````

2. Install dependencies

   ```bash
   npm install
   ```
3. Start the development server

   ```bash
   npx expo start
   ```
4. Open the project using:

   * **Expo Go** (scan the QR code), or
   * An **Android/iOS emulator**

> ⚠️ If you experience CORS errors while testing in Expo Go, use a proxy (e.g. [cors-anywhere](https://cors-anywhere.herokuapp.com)) or run a local CORS proxy as noted in comments inside the code.

---

## 🧠 Notes on Approach

### 1. **Project Structure**

The app follows a modular and predictable folder structure:

```
src/
  components/    → Reusable UI components (ProductCard)
  screens/       → Screen components (SearchScreen)
  types/         → Shared TypeScript interfaces
App.tsx          → App root and layout
```

### 2. **Data Fetching**

* Data is fetched from the public API:
  `https://dialist.ngrok.dev/api/v1/watches`
* Implemented with native `fetch` and `async/await`
* Includes **debounced** input (`setTimeout`) to prevent excessive API calls
* Handles **loading**, **error**, and **empty state** cleanly

### 3. **Active Search Logic**

* `TextInput` updates a `query` state
* A debounced `useEffect` triggers `fetchProducts` whenever `query` changes
* The `FlatList` renders fetched items as `ProductCard`s
* Clicking an item logs the full object to the console

### 4. **UI & Components**

* `ProductCard` displays:

  * Product image on the left
  * Dynamic key-value pairs on the right
* Layout kept intentionally minimal, focusing on **functionality and clarity**

### 5. **TypeScript & State Management**

* All components are strongly typed (`Product`, `ApiResponse`)
* Local `useState` + `useEffect` used for simplicity (no external state library)
* Ensures maintainability and type safety without unnecessary complexity

---

## 🧩 Tech Stack

* **React Native**
* **TypeScript**
* **FlatList**, **TextInput**, **TouchableOpacity**
* **Async fetch API**

---

## 📸 Features at a Glance

✔️ Real-time active search
✔️ Debounced API calls
✔️ Clean modular architecture
✔️ Typed components and interfaces
✔️ Graceful empty/loading/error states

---

## 🧰 Future Improvements

* Add pagination or infinite scroll
* Add product detail screen with navigation
* Integrate caching via React Query or Zustand
* Replace mock proxy with proper API CORS headers

---