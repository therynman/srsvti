// lib/store.ts
import { atom } from 'jotai';

export const cursorVariant = atom<'default' | 'hover'>('default');
export const scrollProgress = atom(0);