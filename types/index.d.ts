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
  credentials: any[]; // Specify the correct type instead of any if possible
  id: string;
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
}

export { Tenant, Workspace };
