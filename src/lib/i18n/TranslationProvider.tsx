"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { locales, defaultLocale, Locale } from "@/config";

// Define the translation context type
type TranslationContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string>) => string;
};

// Create the context with a default value
const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Translation messages cache
const messagesCache: Record<Locale, Record<string, any>> = {} as Record<Locale, Record<string, any>>;

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [messages, setMessages] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  // Load translations for the current locale
  useEffect(() => {
    const loadTranslations = async () => {
      setLoading(true);
      try {
        // Check if we already have the messages in cache
        if (messagesCache[locale]) {
          setMessages(messagesCache[locale]);
        } else {
          // Load messages from the JSON file
          const loadedMessages = (await import(`../../messages/${locale}/index.json`)).default;
          messagesCache[locale] = loadedMessages;
          setMessages(loadedMessages);
        }
      } catch (error) {
        console.error(`Failed to load translations for ${locale}:`, error);
        // Fallback to default locale if translation loading fails
        if (locale !== defaultLocale) {
          setLocale(defaultLocale);
        }
      } finally {
        setLoading(false);
      }
    };

    loadTranslations();
  }, [locale]);

  // Save the selected locale to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userLocale", locale);
    }
  }, [locale]);

  // Load the locale from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLocale = localStorage.getItem("userLocale") as Locale | null;
      if (savedLocale && locales.includes(savedLocale as any)) {
        setLocale(savedLocale);
      }
    }
  }, []);

  // Translation function
  const t = (key: string, params?: Record<string, string>): string => {
    if (loading) return key; // Return the key if translations are still loading

    // Split the key by dots to navigate the nested messages object
    const keys = key.split(".");
    let value = messages;

    // Navigate through the nested object
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key; // Return the key if the translation is not found
      }
    }

    // If the value is not a string, return the key
    if (typeof value !== "string") {
      console.warn(`Translation value is not a string for key: ${key}`);
      return key;
    }

    // Replace parameters in the translation if provided
    if (params) {
      return Object.entries(params).reduce((acc: string, entry) => {
        const [paramKey, paramValue] = entry;
        return acc.replace(new RegExp(`{${paramKey}}`, "g"), paramValue);
      }, value);
    }

    return value;
  };

  return (
    <TranslationContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Custom hook to use the translation context
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
