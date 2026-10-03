export interface FormattedTime {
  hours: string;
  minutes: string;
  seconds: string;
}

export interface ColorTheme {
  name: string;
  color: string;
  glow: string;
}

export interface Timezone {
  name: string;
  city: string;
  timezone: string;
  continent: string;
}

export const COLOR_THEMES: ColorTheme[] = [
  { name: 'Sauge', color: '#7ec8a0', glow: '#7ec8a0' },
  { name: 'Ciel', color: '#7eb4d4', glow: '#7eb4d4' },
  { name: 'Rose', color: '#d4909c', glow: '#d4909c' },
  { name: 'Lavande', color: '#a88bc4', glow: '#a88bc4' },
  { name: 'Sable', color: '#c9a87a', glow: '#c9a87a' }
];

export const TIMEZONES: Timezone[] = [
  { name: 'France', city: 'Paris', timezone: 'Europe/Paris', continent: 'Europe' },
  { name: 'Royaume-Uni', city: 'Londres', timezone: 'Europe/London', continent: 'Europe' },
  { name: 'Canada', city: 'Toronto', timezone: 'America/Toronto', continent: 'Amérique du Nord' },
  { name: 'États-Unis', city: 'New York', timezone: 'America/New_York', continent: 'Amérique du Nord' },
  { name: 'Brésil', city: 'São Paulo', timezone: 'America/Sao_Paulo', continent: 'Amérique du Sud' },
  { name: 'Argentine', city: 'Buenos Aires', timezone: 'America/Argentina/Buenos_Aires', continent: 'Amérique du Sud' },
  { name: 'Japon', city: 'Tokyo', timezone: 'Asia/Tokyo', continent: 'Asie' },
  { name: 'Inde', city: 'Mumbai', timezone: 'Asia/Kolkata', continent: 'Asie' },
  { name: 'Afrique du Sud', city: 'Johannesburg', timezone: 'Africa/Johannesburg', continent: 'Afrique' },
  { name: 'Égypte', city: 'Le Caire', timezone: 'Africa/Cairo', continent: 'Afrique' },
  { name: 'Togo', city: 'Lomé', timezone: 'Africa/Lome', continent: 'Afrique' },
  { name: 'Australie', city: 'Sydney', timezone: 'Australia/Sydney', continent: 'Océanie' }
];

const THEME_STORAGE_KEY = 'neon-clock-theme';
const TIMEZONE_STORAGE_KEY = 'neon-clock-timezone';
const timeFormatters = new Map<string, Intl.DateTimeFormat>();

export function formatTime(value: number): string {
  return value.toString().padStart(2, '0');
}

export function getFormattedTime(date: Date, timezone?: string): FormattedTime {
  if (!timezone) {
    return {
      hours: formatTime(date.getHours()),
      minutes: formatTime(date.getMinutes()),
      seconds: formatTime(date.getSeconds())
    };
  }

  let formatter = timeFormatters.get(timezone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat('fr-FR', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23'
    });
    timeFormatters.set(timezone, formatter);
  }

  const parts = formatter.formatToParts(date);
  const getPart = (type: 'hour' | 'minute' | 'second'): string => {
    const value = parts.find((part) => part.type === type)?.value;
    if (value === undefined) {
      throw new Error(`La partie "${type}" est absente du format horaire.`);
    }
    return value;
  };

  return {
    hours: getPart('hour'),
    minutes: getPart('minute'),
    seconds: getPart('second')
  };
}

export function startTimeUpdates(callback: (date: Date) => void): ReturnType<typeof setInterval> {
  return setInterval(() => callback(new Date()), 1000);
}

export function getSavedTheme(): ColorTheme {
  if (typeof window === 'undefined') return COLOR_THEMES[0];

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return COLOR_THEMES.find((theme) => theme.name === savedTheme) ?? COLOR_THEMES[0];
}

export function saveTheme(theme: ColorTheme): void {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme.name);
  }
}

export function getSavedTimezone(): Timezone {
  if (typeof window === 'undefined') return TIMEZONES[0];

  const savedTimezone = window.localStorage.getItem(TIMEZONE_STORAGE_KEY);
  return TIMEZONES.find((timezone) => timezone.name === savedTimezone) ?? TIMEZONES[0];
}

export function saveTimezone(timezone: Timezone): void {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(TIMEZONE_STORAGE_KEY, timezone.name);
  }
}
