/**
 * Helper function to get all categories for admin generation
 */

import { mainCategories, CategoryConfig } from './allCategoriesPromptsConfig';

export function getAllCategories(): CategoryConfig[] {
  return mainCategories;
}
