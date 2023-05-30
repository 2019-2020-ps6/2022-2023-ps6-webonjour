import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FamilyMember, Prisma } from '@prisma/client';
import { RequestWrapper } from '@webonjour/util-interface';
import { environment } from '@webonjour/shared/environments';

@Injectable({
  providedIn: 'root',
})
export class FamilyMemberService {
  API_URL = `http://${environment.api.host}:${environment.api.port}`;

  constructor(private httpClient: HttpClient) {}

  getFamilyMembers() {
    return this.httpClient.get<RequestWrapper<FamilyMember[]>>(
      this.API_URL + '/family-members'
    );
  }

  getFamilyMember(id: number) {
    return this.httpClient.get<RequestWrapper<FamilyMember>>(
      this.API_URL + '/family-members/' + id
    );
  }

  createFamilyMember(familyMember: Prisma.FamilyMemberCreateInput) {
    return this.httpClient.post<RequestWrapper<FamilyMember>>(
      this.API_URL + '/family-members',
      familyMember
    );
  }

  updateFamilyMember(id: number, familyMember: Prisma.FamilyMemberUpdateInput) {
    return this.httpClient.put<RequestWrapper<FamilyMember>>(
      this.API_URL + '/family-members/' + id,
      familyMember
    );
  }

  deleteFamilyMember(id: number) {
    return this.httpClient.delete<RequestWrapper<null>>(
      this.API_URL + '/family-members/' + id
    );
  }
}
