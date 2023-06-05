import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FamilyMember, Prisma } from '@prisma/client';
import { RequestWrapper } from '@webonjour/util-interface';
import { api_root, environment } from '@webonjour/shared/environments';

@Injectable({
  providedIn: 'root',
})
export class FamilyMemberService {
  FAMILY_URL = `${api_root(environment)}/family-members/`;

  constructor(private httpClient: HttpClient) {}

  getFamilyMembers() {
    return this.httpClient.get<RequestWrapper<FamilyMember[]>>(this.FAMILY_URL);
  }

  getFamilyMember(id: number) {
    return this.httpClient.get<RequestWrapper<FamilyMember>>(
      this.FAMILY_URL + id
    );
  }

  createFamilyMember(familyMember: Prisma.FamilyMemberCreateInput) {
    return this.httpClient.post<RequestWrapper<FamilyMember>>(
      this.FAMILY_URL,
      familyMember
    );
  }

  updateFamilyMember(id: number, familyMember: Prisma.FamilyMemberUpdateInput) {
    return this.httpClient.put<RequestWrapper<FamilyMember>>(
      this.FAMILY_URL + id,
      familyMember
    );
  }

  deleteFamilyMember(id: number) {
    return this.httpClient.delete<RequestWrapper<null>>(this.FAMILY_URL + id);
  }
}
