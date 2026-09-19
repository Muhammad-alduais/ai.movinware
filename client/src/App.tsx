import { useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";

const App = () => {
  useEffect(() => {
    // Respect system preference on first load
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    if (mq.matches) {
      document.documentElement.classList.add("dark");
    }
    const handler = (e: MediaQueryListEvent) => {
      document.documentElement.classList.toggle("dark", e.matches);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="*" element={<Index />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
