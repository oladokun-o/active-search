# 🛍️ Active Search (Expo React Native + TypeScript)

A minimal e-commerce search example built using **Expo (React Native)** and **TypeScript**.

## 🚀 Setup

```bash
git clone https://github.com/oladokun-o/active-search.git
cd active-search
npm install
npm start
````

Then scan the QR code in **Expo Go**.

## 🧠 Approach

* **Expo + TypeScript** for a clean developer experience.
* **Debounced search** using `useEffect` to avoid excessive API calls.
* Clean async handling with **loading**, **error**, and **empty** states.
* `FlatList` for smooth and efficient rendering.
* Modular components and typed props (`ProductCard`, `Product` interface).
* Clicking a card logs the clicked product entry.