/**
 * Redux Store Hooks - Typed useDispatch & useSelector
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Typed useDispatch Hook
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Typed useSelector Hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
