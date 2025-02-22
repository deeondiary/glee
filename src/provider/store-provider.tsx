'use client'
import { type ReactNode, createContext, useRef } from 'react'
import {createStore} from "zustand/vanilla";

export type StoreApi = ReturnType<typeof createStore>

export const StoreContext = createContext<StoreApi | undefined>(
    undefined,
)

export interface StoreProviderProps {
    children: ReactNode
}

export const StoreProvider = ({
                                         children,
                                     }: StoreProviderProps) => {
    const storeRef = useRef<StoreApi>(null)

    return (
        <StoreContext.Provider value={storeRef.current}>
            {children}
        </StoreContext.Provider>
    )
}