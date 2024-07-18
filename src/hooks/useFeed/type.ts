export interface DataFeed {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface CreateFeed {
  title: string;
  body: string;
}
