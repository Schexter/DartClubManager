/**
 * Redux Hooks - Type-Safe Hooks für Redux
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Type-safe useDispatch Hook
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Type-safe useSelector Hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
