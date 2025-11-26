/**
 * API Route: GET /api/admin/categories
 * Returns all categories with their prompts for admin generation
 */

import { NextResponse } from 'next/server';
import { allCategoriesData, TOTAL_CATEGORIES, TOTAL_PROMPTS } from '@/lib/data/allCategoriesData';

/**
 * GET /api/admin/categories
 * Returns all 52 categories with their prompts
 */
export async function GET() {
  try {
    console.log('[Categories API] Loading categories...');
    console.log('[Categories API] Total categories:', allCategoriesData?.length || 0);
    
    if (!allCategoriesData || allCategoriesData.length === 0) {
      console.error('[Categories API] No categories found!');
      return NextResponse.json({
        success: false,
        error: 'No categories data available'
      }, { status: 500 });
    }
    
    return NextResponse.json({
      success: true,
      categories: allCategoriesData,
      meta: {
        totalCategories: TOTAL_CATEGORIES,
        totalPrompts: TOTAL_PROMPTS
      }
    });
  } catch (error: any) {
    console.error('[Categories API] Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to load categories'
    }, { status: 500 });
  }
}
