import Dexie from 'dexie';

class AppDatabase extends Dexie {
  auth!: Dexie.Table<{ id: string; isAuthenticated: boolean }, string>;

  constructor() {
    super('AppDB');
    this.version(1).stores({
      auth: 'id',
    });
  }
}

export const db = new AppDatabase();
