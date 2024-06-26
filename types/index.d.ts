interface Tenant {
  name: string;
  description: string;
  isActive: boolean;
  id: string;
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
}

interface Workspace {
  name: string;
  description: string;
  isActive: boolean;
  credentials: any[];
  id: string;
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  metadata: any;
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
}

interface CredentialResource {
  name: string;
  description: string;
  apiKey: string;
  isActive: boolean;
  id: string;
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
}

interface ApiResponse<T> {
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
  data: T;
}

export { Tenant, Workspace, Service, CredentialResource, ApiResponse };
