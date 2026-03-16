export type AdminNewsRow = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  createdAt: string;
  publishedAt: string | null;
  isPublished: boolean;
};
