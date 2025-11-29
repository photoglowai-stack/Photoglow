/**
 * Page admin - Générateur d'images IDEAS
 * 
 * @module app/admin/page
 */

'use client';

import { AdminGenerateIdeasSimple } from '@/components/AdminGenerateIdeasSimple';

/**
 * Admin Page - Générateur d'images pour toutes les IDEAS
 * 
 * @returns Page complète avec générateur
 */
export default function AdminPage() {
  return <AdminGenerateIdeasSimple />;
}

/*
// OLD DASHBOARD CODE - Keep for reference
import { useState } from 'react';
import { SEOHead } from '@/components/shared/SEOHead';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { admin } from '@/lib/admin';
import { toast } from 'sonner';
import {
  Rocket,
  RefreshCw,
  Activity,
  Loader2,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

export default function AdminPageOld() {
*/
