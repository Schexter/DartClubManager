import { useAppSelector } from '../app/hooks';
import { selectIsAuthenticated, selectUser, selectAuthLoading } from '../features/auth/authSlice';

export const useAuth = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectAuthLoading);

  return {
    isAuthenticated,
    user,
    isLoading,
  };
};
