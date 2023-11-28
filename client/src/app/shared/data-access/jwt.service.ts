import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  role: string;
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  getUserRole(token: string): string {
    if (token) {
      const decodedToken: JwtPayload = jwtDecode(token);
      return decodedToken.role;
    }
    return '';
  }

  private getDecodedToken(token: string): JwtPayload | null {
    if (token) {
      const decodedToken: JwtPayload = jwtDecode(token);
      return decodedToken;
    }
    return null;
  }

  isTokenExpired(token: string): boolean {
    const decodedToken = this.getDecodedToken(token);
    const expirationTime = decodedToken?.exp;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (expirationTime !== undefined) {
      return expirationTime < currentTimestamp;
    }
    return false;
  }

  isAdmin(token: string): boolean {
    return this.getUserRole(token) === 'ADMIN';
  }

  isUser(token: string): boolean {
    return this.getUserRole(token) === 'USER';
  }
}
