export type Organizer = {
  id: string;
  userId: string;
  organizationId?: string | null;
  displayName: string;
  description?: string | null;
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type ApiListResponse<T> = {
  items: T[];
  total?: number;
  page?: number;
  pageSize?: number;
};
