import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class LocalpersistenceService {

  constructor(private storage: Storage) {
    // init storage
    this.init();
  }

  // Initialize storage
  private async init() {
    await this.storage.create();
  }

  // Set a key, val pair in storage
  async setItem(key: string, value: any): Promise<void> {
    try {
      await this.storage.set(key, value);
    } 
    catch (error) 
    {
      console.error('Error storing item', error);
    }
  }

  // Get a value from storage by key
  async getItem(key: string): Promise<any> {
    try {
      const value = await this.storage.get(key);
      return value;
    } 
    catch (error) 
    {
      console.error('Error retrieving item', error);
      return null;
    }
  }

  // Remove an item from storage by key
  async removeItem(key: string): Promise<void> {
    try {
      await this.storage.remove(key);
    } 
    catch (error) 
    {
      console.error('Error removing item', error);
    }
  }

  // Clear all items from storage
  async clearStorage(): Promise<void> {
    try {
      await this.storage.clear();
    } 
    catch (error) 
    {
      console.error('Error clearing storage', error);
    }
  }

  // Checking if a key exists
  async hasItem(key: string): Promise<boolean> {
    try {
      const value = await this.storage.get(key);
      return value !== null;
    } 
    catch (error) 
    {
      console.error('Error checking if item exists', error);
      return false;
    }
  }
}
