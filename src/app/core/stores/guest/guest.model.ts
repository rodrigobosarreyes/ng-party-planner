export interface Guest {
  id: string;
  fullName: string;
  email: string;
  cellPhone: string;
  picture: string;
  isAttendeeConfirmed: boolean | null;
}
