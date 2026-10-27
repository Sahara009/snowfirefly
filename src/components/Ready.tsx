"use client";

import { createContext, useContext } from "react";

/** true, когда прелоадер начал подниматься — можно запускать анимации первого экрана */
export const ReadyContext = createContext(false);
export const useReady = () => useContext(ReadyContext);
