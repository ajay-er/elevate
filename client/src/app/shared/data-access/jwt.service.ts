import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { IRole } from '../types';
import { IJwtPayload } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  getUserRole(token: string): string {
    if (token) {
      const decodedToken: IJwtPayload = jwtDecode(token);
      return decodedToken.role;
    }
    return '';
  }

  getDecodedToken(token: string): IJwtPayload | null {
    if (token) {
      const decodedToken: IJwtPayload = jwtDecode(token);
      return decodedToken;
    }
    return null;
  }

  isTokenExpired(token: string): boolean {
    const decodedToken = this.getDecodedToken(token);
    const expirationTime = decodedToken?.exp;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (expirationTime !== undefined) {
      const expirationTimeAsNumber = +expirationTime;
      return expirationTimeAsNumber < currentTimestamp;
    }
    return false;
  }

  isAdmin(token: string): boolean {
    return this.getUserRole(token) === IRole.ADMIN;
  }

  isFounder(token: string): boolean {
    return this.getUserRole(token) === IRole.FOUNDER;
  }

  isInvestor(token: string): boolean {
    return this.getUserRole(token) === IRole.INVESTOR;
  }
}
