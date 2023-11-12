import { AuthService } from '../services/auth.service';

export function appInitializer(authService: AuthService) {
    return () => new Promise((resolve:any) => {
        authService.refreshToken()
            .subscribe()
            .add(resolve);
    });
}
