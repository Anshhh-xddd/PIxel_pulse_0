export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  views: number;
}

class ContentManagementService {
  private readonly STORAGE_KEY = 'pixel_pulse_portfolio_items';

  // Get all portfolio items
  getPortfolioItems(): PortfolioItem[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading portfolio items:', error);
      return [];
    }
  }

  // Add new portfolio item
  addPortfolioItem(item: Omit<PortfolioItem, 'id' | 'createdAt' | 'views'>): PortfolioItem {
    const newItem: PortfolioItem = {
      ...item,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      views: 0
    };

    const items = this.getPortfolioItems();
    items.push(newItem);
    this.savePortfolioItems(items);

    return newItem;
  }

  // Update existing portfolio item
  updatePortfolioItem(id: string, updates: Partial<Omit<PortfolioItem, 'id' | 'createdAt' | 'views'>>): PortfolioItem | null {
    const items = this.getPortfolioItems();
    const index = items.findIndex(item => item.id === id);
    
    if (index === -1) return null;

    items[index] = {
      ...items[index],
      ...updates
    };

    this.savePortfolioItems(items);
    return items[index];
  }

  // Delete portfolio item
  deletePortfolioItem(id: string): boolean {
    const items = this.getPortfolioItems();
    const filteredItems = items.filter(item => item.id !== id);
    
    if (filteredItems.length === items.length) return false;
    
    this.savePortfolioItems(filteredItems);
    return true;
  }

  // Get portfolio item by ID
  getPortfolioItem(id: string): PortfolioItem | null {
    const items = this.getPortfolioItems();
    return items.find(item => item.id === id) || null;
  }

  // Get portfolio items by category
  getPortfolioItemsByCategory(category: string): PortfolioItem[] {
    const items = this.getPortfolioItems();
    return items.filter(item => item.category === category);
  }

  // Search portfolio items
  searchPortfolioItems(query: string): PortfolioItem[] {
    const items = this.getPortfolioItems();
    const lowerQuery = query.toLowerCase();
    
    return items.filter(item => 
      item.title.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery)
    );
  }

  // Increment view count
  incrementViews(id: string): void {
    const items = this.getPortfolioItems();
    const index = items.findIndex(item => item.id === id);
    
    if (index !== -1) {
      items[index].views += 1;
      this.savePortfolioItems(items);
    }
  }

  // Get statistics
  getStatistics() {
    const items = this.getPortfolioItems();
    
    return {
      total: items.length,
      active: items.filter(item => item.status === 'active').length,
      draft: items.filter(item => item.status === 'draft').length,
      inactive: items.filter(item => item.status === 'inactive').length,
      totalViews: items.reduce((sum, item) => sum + item.views, 0),
      categories: this.getCategoryStats(items)
    };
  }

  // Get category statistics
  private getCategoryStats(items: PortfolioItem[]) {
    const stats: { [key: string]: number } = {};
    items.forEach(item => {
      stats[item.category] = (stats[item.category] || 0) + 1;
    });
    return stats;
  }

  // Generate unique ID
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Save portfolio items to localStorage
  private savePortfolioItems(items: PortfolioItem[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving portfolio items:', error);
    }
  }

  // Export data
  exportData(): string {
    const items = this.getPortfolioItems();
    return JSON.stringify(items, null, 2);
  }

  // Import data
  importData(data: string): boolean {
    try {
      const items = JSON.parse(data);
      if (Array.isArray(items)) {
        this.savePortfolioItems(items);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }

  // Clear all data
  clearAllData(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

export const contentManagementService = new ContentManagementService();
export default contentManagementService;
