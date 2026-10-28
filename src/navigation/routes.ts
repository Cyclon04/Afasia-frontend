// src/navigation/routes.ts
import { Href } from 'expo-router';

export const ROUTES = {
  NOTIFICATIONS: '/notification',
  ACHIEVEMENTS: '/achievements',
  REWARDS: '/rewards',
  SUPPORT: '/support',
  CHATBOT: '/chatbot' as Href & '/chatbot',
  GAME: '/game' as Href & '/game',
  PROFILE: '/settings',
  HOME: '/homeKids',
  PARENTS_HOME: '/homeParentsMode',
  LOGIN: '/',
} as const satisfies Record<string, Href>;