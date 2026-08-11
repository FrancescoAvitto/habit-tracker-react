import { parseISO } from "date-fns/fp/parseISO";
import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item, dateReviver) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
}) 

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storedValue));
    }, [key, storedValue]);

    return [storedValue, setStoredValue] as const;
}

function dateReviver(_key: string, value: unknown) {
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
        return parseISO(value);
    }
    return value;
}