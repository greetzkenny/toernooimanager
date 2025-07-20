export interface Application {
  id: string;
  userId: string;
  tournamentId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: Date;
}

export interface Tournament {
  id: string;
  name: string;
  startDate: Date;
  stage: 'GROUP' | 'KNOCKOUT' | 'FINALS';
  matches: any[];
  location?: string;
  description?: string;
  maxTeams?: number;
} 