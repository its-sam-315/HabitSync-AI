import { openDB } from 'idb';

const DB_NAME = 'HabitSyncDB';
const STORE_NAME = 'habits';

export async function getDB() {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
}

// Add a new habit
export async function addHabit(habit) {
  const db = await getDB();
  return await db.add(STORE_NAME, habit);
}

// Get all habits
export async function getHabits() {
  const db = await getDB();
  return await db.getAll(STORE_NAME);
}

// Update habit by ID
export async function updateHabit(id, updatedHabit) {
  const db = await getDB();
  return await db.put(STORE_NAME, { ...updatedHabit, id });
}

// Delete habit by ID
export async function deleteHabit(id) {
  const db = await getDB();
  return await db.delete(STORE_NAME, id);
}
