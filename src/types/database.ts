/**
 * Types de la base de données Supabase
 * Généré à partir du schéma PostgreSQL
 * @module types/database
 */

/**
 * Type principal de la base de données Supabase
 */
export interface Database {
  public: {
    Tables: {
      /** Table des crédits utilisateur */
      credits: {
        Row: {
          user_id: string;
          balance: number;
          total_used: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          balance?: number;
          total_used?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          balance?: number;
          total_used?: number;
          created_at?: string;
          updated_at?: string;
        };
      };

      /** Table des jobs de génération */
      generation_jobs: {
        Row: {
          id: string;
          user_id: string;
          status: "pending" | "processing" | "completed" | "failed";
          prompt: string;
          image_url: string | null;
          error_message: string | null;
          created_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          status?: "pending" | "processing" | "completed" | "failed";
          prompt: string;
          image_url?: string | null;
          error_message?: string | null;
          created_at?: string;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          status?: "pending" | "processing" | "completed" | "failed";
          prompt?: string;
          image_url?: string | null;
          error_message?: string | null;
          created_at?: string;
          completed_at?: string | null;
        };
      };

      /** Table des modèles IA personnalisés */
      ai_models: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          status: "training" | "ready" | "failed";
          replicate_model_id: string | null;
          training_images_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          status?: "training" | "ready" | "failed";
          replicate_model_id?: string | null;
          training_images_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          status?: "training" | "ready" | "failed";
          replicate_model_id?: string | null;
          training_images_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };

      /** Table KV store pour données génériques */
      kv_store_ab844084: {
        Row: {
          key: string;
          value: unknown;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          key: string;
          value: unknown;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          key?: string;
          value?: unknown;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: {
      /** Fonction pour débiter des crédits */
      debit_credits: {
        Args: {
          p_user_id: string;
          p_amount: number;
        };
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
  };
}
