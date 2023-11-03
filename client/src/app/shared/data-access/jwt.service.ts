import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  getUserRole(token: string): string {
    if (token) {
      let tokenPrefix = '';
      if (token.startsWith('access:')) {
        tokenPrefix = 'access:';
      } else if (token.startsWith('google:')) {
        tokenPrefix = 'google:';
      }
      if (tokenPrefix) {
        const decodedToken: JwtPayload = jwtDecode(
          token.substring(tokenPrefix.length)
        );
        return decodedToken.role;
      }
    }

    return '';
  }
}
