import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StorePageTA } from "@/components/StorePageTA";
import "@/styles.css";

createRoot(document.getElementById("root")!).render(<StrictMode><StorePageTA /></StrictMode>);
