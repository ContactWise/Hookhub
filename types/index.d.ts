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

interface EventRegistryResource {
  id: string;
  name: string;
  description: string;
  eventTypes: string[];
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
}

interface EventResource {
  name: string;
}

interface ApiResponse<T> {
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
  data: T;
}

interface EndpointResource {
  name: string;
  description: string;
  isActive: boolean;
  url: string;
  method: number;
  secret: string;
  eventRegistryId: string;
  events: string[];
  source: string;
  subject: string;
  headers: {
    [key: string]: string;
  };
  id: string;
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
}

export {
  Tenant,
  Workspace,
  Service,
  CredentialResource,
  EndpointResource,
  ApiResponse,
  EventRegistryResource,
};
