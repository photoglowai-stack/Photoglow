/**
 * @file ProfilePage - Page de profil utilisateur
 * @description Page complète de gestion du profil utilisateur avec :
 * - Informations de profil (email, nom, ID)
 * - Gestion des crédits (affichage, ajout, reset)
 * - Galerie des photos générées par l'utilisateur
 * - Actions sur les photos (téléchargement)
 */

import { useEffect, useState } from 'react';
import { Button } from '../../ui/button';
import { LazyImage } from '../shared/LazyImage/LazyImage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Alert, AlertDescription } from '../../ui/alert';
import { 
  Coins, 
  User, 
  Mail, 
  Loader2, 
  Plus, 
  RotateCcw,
  Image as ImageIcon,
  AlertCircle,
  ArrowLeft,
  Download,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { supabase } from '../../../utils/supabase/client';
import { Header } from '../../shared/Header';
import { fetchWithTimeout, safeJsonParse, logError, shouldShowError } from '../../../utils/error-handler';
import { getCurrentUserCredits, addCredits, getCredits } from '../../../utils/credits-client';
import { VERCEL_API_BASE, API_ENDPOINTS } from '../../../utils/config';
import type { UserProfile, GeneratedPhoto, ProfilePageProps } from './ProfilePage.types';

/**
 * Page de profil utilisateur PhotoGlow
 * 
 * Fonctionnalités principales :
 * - Affichage des informations utilisateur
 * - Gestion complète des crédits (solde, ajout +1, reset)
 * - Galerie des photos générées par l'utilisateur
 * - Actions sur les photos (télécharger, voir détails)
 * - Gestion des états de chargement et d'erreur
 * 
 * Architecture :
 * - Charge la session Supabase au mount
 * - Récupère les crédits et photos en parallèle
 * - Affiche les états loading/error/success
 * - Permet des actions CRUD sur les crédits
 * 
 * @example
 * ```tsx
 * <ProfilePage onBack={() => navigate('/')} />
 * ```
 */
export function ProfilePage({ onBack }: ProfilePageProps) {
  // ============================================
  // STATE - Authentication & User Data
  // ============================================
  
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [credits, setCredits] = useState<number | null>(null);
  const [photos, setPhotos] = useState<GeneratedPhoto[]>([]);
  
  // ============================================
  // STATE - Loading & Error States
  // ============================================
  
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCredits, setIsLoadingCredits] = useState(false);
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ============================================
  // EFFECTS - Load Data on Mount
  // ============================================

  useEffect(() => {
    loadSession();
  }, []);

  /**
   * Charge la session utilisateur et les données du profil
   * Exécute en parallèle le chargement des crédits et photos
   */
  async function loadSession() {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) throw sessionError;
      
      if (!data.session) {
        setError('Veuillez vous connecter pour accéder à votre profil.');
        setIsLoading(false);
        return;
      }
      
      setSession(data.session);
      
      // Set profile from session data
      setProfile({
        email: data.session.user.email || 'Non défini',
        name: data.session.user.user_metadata?.name || data.session.user.email?.split('@')[0],
        user_id: data.session.user.id
      });
      
      // Load credits and photos in parallel
      await Promise.all([
        loadCredits(data.session.access_token),
        loadPhotos(data.session.access_token)
      ]);
      
    } catch (err: any) {
      console.error('Error loading session:', err);
      setError(err.message || 'Erreur de chargement de la session');
    } finally {
      setIsLoading(false);
    }
  }

  // ============================================
  // DATA LOADING - Credits
  // ============================================

  /**
   * Charge les crédits de l'utilisateur
   * @param token - Token d'authentification
   */
  async function loadCredits(token: string) {
    try {
      setIsLoadingCredits(true);
      
      const result = await getCurrentUserCredits();
      
      if (result.success) {
        setCredits(result.credits);
      } else {
        console.warn('[ProfilePage] Credits fetch failed:', result.error);
        setCredits(0);
      }
      
    } catch (err: any) {
      logError('loadCredits', err);
      
      if (shouldShowError(err)) {
        toast.error('Impossible de charger les crédits');
      }
      
      setCredits(0);
    } finally {
      setIsLoadingCredits(false);
    }
  }

  // ============================================
  // DATA LOADING - Photos
  // ============================================

  /**
   * Charge les photos générées par l'utilisateur
   * @param token - Token d'authentification
   */
  async function loadPhotos(token: string) {
    try {
      setIsLoadingPhotos(true);
      
      // Photos endpoint - use Vercel API base if needed, or skip if not implemented
      const res = await fetchWithTimeout(`${VERCEL_API_BASE}/api/photos`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });
      
      if (!res.ok) {
        // Si l'endpoint n'existe pas encore, on ne fait pas d'erreur
        if (res.status === 404) {
          console.log('Photos endpoint not found yet - using empty array');
          setPhotos([]);
          return;
        }
        const errorData = await safeJsonParse(res, { error: 'Unknown error' });
        throw new Error(errorData.error || 'Erreur lors de la récupération des photos');
      }
      
      const data = await safeJsonParse(res, { photos: [] });
      setPhotos(data.photos || []);
      
    } catch (err: any) {
      logError('loadPhotos', err);
      setPhotos([]);
    } finally {
      setIsLoadingPhotos(false);
    }
  }

  // ============================================
  // ACTIONS - Credit Management
  // ============================================

  /**
   * Ajoute 1 crédit à l'utilisateur
   * Utilisé pour les tests et démonstrations
   */
  async function creditPlusOne() {
    if (!session?.user?.id) {
      toast.error('Session expirée');
      return;
    }
    
    try {
      setIsLoadingCredits(true);
      
      const result = await addCredits(session.user.id, 1, 'manual_add');
      
      if (result.success) {
        const newBalance = result.new_balance ?? (credits ?? 0) + 1;
        setCredits(newBalance);
        
        toast.success('✅ +1 crédit ajouté !', {
          description: `Nouveau solde : ${newBalance} crédits`
        });
      } else {
        throw new Error(result.error || 'Erreur lors de l\'ajout de crédits');
      }
      
    } catch (err: any) {
      console.error('Error adding credit:', err);
      toast.error('Erreur lors de l\'ajout de crédit');
    } finally {
      setIsLoadingCredits(false);
    }
  }

  /**
   * Réinitialise les crédits de l'utilisateur à 0
   * Demande une confirmation avant l'action
   */
  async function resetCredits() {
    if (!session?.access_token) {
      toast.error('Session expirée');
      return;
    }
    
    if (!confirm('⚠️ Voulez-vous vraiment réinitialiser vos crédits à 0 ?')) {
      return;
    }
    
    try {
      setIsLoadingCredits(true);
      
      const res = await fetch(`${VERCEL_API_BASE}/api/credits`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ op: 'reset' })
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Erreur lors de la réinitialisation');
      }
      
      const data = await res.json();
      setCredits(data.credits);
      
      toast.success('Crédits réinitialisés', {
        description: 'Votre solde a été remis à 0'
      });
      
    } catch (err: any) {
      console.error('Error resetting credits:', err);
      toast.error('Erreur lors de la réinitialisation');
    } finally {
      setIsLoadingCredits(false);
    }
  }

  // ============================================
  // RENDER - Loading State
  // ============================================

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-pink-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Chargement de votre profil...</p>
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER - Error State (Not Authenticated)
  // ============================================

  if (error || !session || !profile) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <Card className="max-w-md w-full bg-gray-900 border-gray-800">
          <CardHeader>
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <CardTitle className="text-white">Connexion requise</CardTitle>
            <CardDescription className="text-gray-400">
              {error || 'Veuillez vous connecter pour accéder à votre profil.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={onBack} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ============================================
  // RENDER - Main Profile Page
  // ============================================

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header avec navigation */}
      <Header onShowLanding={onBack} />
      
      {/* Page Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                Mon Profil
              </h1>
              <p className="text-sm md:text-base text-gray-400 mt-1">
                Gérez vos crédits et vos photos générées
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* ========== SIDEBAR: Profile & Credits ========== */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Profile Card */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <User className="w-5 h-5 text-pink-500" />
                  Profil
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Nom</p>
                  <p className="text-white font-medium">{profile.name || 'Non défini'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </p>
                  <p className="text-white font-medium break-all">{profile.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">ID Utilisateur</p>
                  <p className="text-xs text-gray-500 font-mono break-all">
                    {profile.user_id.slice(0, 20)}...
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Credits Card */}
            <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Coins className="w-5 h-5 text-yellow-400" />
                  Crédits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                
                {/* Credits Badge */}
                <div className="bg-black/40 rounded-xl p-6 text-center">
                  {isLoadingCredits ? (
                    <Loader2 className="w-8 h-8 text-pink-500 animate-spin mx-auto" />
                  ) : (
                    <>
                      <div className="text-5xl font-bold text-yellow-400 mb-2">
                        {credits ?? '—'}
                      </div>
                      <p className="text-sm text-gray-400">crédits restants</p>
                    </>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button
                    onClick={creditPlusOne}
                    disabled={isLoadingCredits}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {isLoadingCredits ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        +1 Crédit
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={resetCredits}
                    disabled={isLoadingCredits}
                    variant="outline"
                    className="w-full border-red-700 text-red-400 hover:bg-red-950"
                  >
                    {isLoadingCredits ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset à 0
                      </>
                    )}
                  </Button>
                </div>

                <Alert className="bg-blue-950/30 border-blue-800">
                  <AlertDescription className="text-sm text-blue-300">
                    💡 Chaque génération d'image coûte 1 crédit
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>

          {/* ========== MAIN: Generated Photos ========== */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <ImageIcon className="w-5 h-5 text-pink-500" />
                  Mes Photos Générées
                  {photos.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {photos.length}
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Toutes vos créations IA
                </CardDescription>
              </CardHeader>
              <CardContent>
                
                {isLoadingPhotos ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-pink-500 animate-spin" />
                  </div>
                ) : photos.length === 0 ? (
                  <div className="text-center py-12">
                    <ImageIcon className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                    <p className="text-gray-400 mb-2">Aucune photo générée</p>
                    <p className="text-sm text-gray-500">
                      Vos créations apparaîtront ici
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {photos.map((photo, index) => (
                      <div
                        key={photo.id}
                        className="group relative aspect-square rounded-lg overflow-hidden bg-gray-800 border border-gray-700 hover:border-pink-500 transition-all animate-in zoom-in-95 fade-in duration-500"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <LazyImage
                          src={photo.image_url}
                          alt={photo.prompt || 'Generated photo'}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
                          <div>
                            <Badge variant="secondary" className="mb-2 text-xs">
                              {photo.category || 'Photo'}
                            </Badge>
                            <p className="text-xs text-gray-300 line-clamp-3">
                              {photo.prompt}
                            </p>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="secondary"
                              className="flex-1"
                              onClick={() => window.open(photo.image_url, '_blank')}
                            >
                              <Download className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Date badge */}
                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs text-gray-300">
                          {new Date(photo.created_at).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short'
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
