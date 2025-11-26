/**
 * All Categories Data - Re-export from server
 * Makes the data accessible for Next.js API routes
 */

// Re-export everything from the server file
export {
  allCategoriesData,
  getCategoryData,
  getAllCategoryIds,
  TOTAL_CATEGORIES,
  TOTAL_PROMPTS,
  type PromptTemplate,
  type CategoryData
} from '../../supabase/functions/server/category-prompts-all-categories';
