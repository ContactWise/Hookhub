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

export { Tenant, Workspace, Service };
