export const colors = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },
  secondary: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
    950: '#2e1065',
  },
  neutral: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
  },
  success: {
    50: '#f0fdf4',
    500: '#10b981',
    700: '#047857',
  },
  warning: {
    50: '#fffbeb',
    500: '#f59e0b',
    700: '#b45309',
  },
  error: {
    50: '#fef2f2',
    500: '#ef4444',
    700: '#b91c1c',
  },
};

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: 'none',
};

export const borderRadius = {
  none: '0px',
  sm: '0.125rem',
  DEFAULT: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
};

export const transition = {
  DEFAULT: 'all 0.2s ease-in-out',
  transform: 'transform 0.2s ease-in-out',
  colors: 'background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, color 0.2s ease-in-out',
  opacity: 'opacity 0.2s ease-in-out',
  shadow: 'box-shadow 0.2s ease-in-out',
};

export const typography = {
  h1: 'text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl',
  h2: 'text-3xl font-bold tracking-tight sm:text-4xl',
  h3: 'text-2xl font-semibold tracking-tight',
  h4: 'text-xl font-semibold',
  body: 'text-base leading-relaxed',
  small: 'text-sm text-neutral-500',
  caption: 'text-xs text-neutral-400',
};

export const container = {
  base: 'mx-auto px-4 sm:px-6 lg:px-8',
  padded: 'mx-auto px-4 py-12 sm:px-6 lg:px-8',
  full: 'w-full',
};

export const button = {
  base: 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  size: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  },
  variant: {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500',
    outline: 'border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 focus:ring-primary-500',
    ghost: 'text-neutral-700 hover:bg-neutral-100 focus:ring-primary-500',
    link: 'text-primary-600 hover:text-primary-800 hover:underline focus:ring-0',
  },
};

export const card = {
  base: 'bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md',
  body: 'p-6',
  title: 'text-xl font-semibold text-neutral-900',
  description: 'mt-2 text-neutral-600',
  footer: 'px-6 py-4 bg-neutral-50 border-t border-neutral-100',
};

export const input = {
  base: 'block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm',
  error: 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500',
};

export const label = {
  base: 'block text-sm font-medium text-neutral-700',
  required: "after:content-['*'] after:ml-0.5 after:text-red-500",
};

export const badge = {
  base: 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
  variant: {
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-secondary-100 text-secondary-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    gray: 'bg-gray-100 text-gray-800',
  },
};

export const theme = {
  colors,
  shadows,
  borderRadius,
  transition,
  typography,
  container,
  button,
  card,
  input,
  label,
  badge,
};

export default theme;
