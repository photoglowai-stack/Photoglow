
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

  export default defineConfig({
    plugins: [react()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        'sonner@2.0.3': 'sonner',
        'react-hook-form@7.55.0': 'react-hook-form',
        'hono@4': 'hono',
        'figma:asset/ffe26301c2af5df48a3eace6ad54f9fb2585a75c.png': path.resolve(__dirname, './src/assets/ffe26301c2af5df48a3eace6ad54f9fb2585a75c.png'),
        'figma:asset/ee083d841901de5407c30b4be9b4a42239af9fc0.png': path.resolve(__dirname, './src/assets/ee083d841901de5407c30b4be9b4a42239af9fc0.png'),
        'figma:asset/e5d9a2a1cdcb17f07c69550c0cd20071344f5cec.png': path.resolve(__dirname, './src/assets/e5d9a2a1cdcb17f07c69550c0cd20071344f5cec.png'),
        'figma:asset/bfa55256432d7539c6b31bba765fd93642044b16.png': path.resolve(__dirname, './src/assets/bfa55256432d7539c6b31bba765fd93642044b16.png'),
        'figma:asset/b5d162384a2ba13d77f091ac4c17c3ffe2c0ba8d.png': path.resolve(__dirname, './src/assets/b5d162384a2ba13d77f091ac4c17c3ffe2c0ba8d.png'),
        'figma:asset/b45cb94262e9dc3e4f49d97475ceb9570d781443.png': path.resolve(__dirname, './src/assets/b45cb94262e9dc3e4f49d97475ceb9570d781443.png'),
        'figma:asset/a3d62fe320695b906cb3bc1f68f9228f8d43ed2c.png': path.resolve(__dirname, './src/assets/a3d62fe320695b906cb3bc1f68f9228f8d43ed2c.png'),
        'figma:asset/9fbd94f84c686f8a660346c0a5b33d5f11f2713f.png': path.resolve(__dirname, './src/assets/9fbd94f84c686f8a660346c0a5b33d5f11f2713f.png'),
        'figma:asset/889909b48ee021025e71d69b390ad6902f141398.png': path.resolve(__dirname, './src/assets/889909b48ee021025e71d69b390ad6902f141398.png'),
        'figma:asset/7b72549a8a77efb9402ca42ba29b2b153272e742.png': path.resolve(__dirname, './src/assets/7b72549a8a77efb9402ca42ba29b2b153272e742.png'),
        'figma:asset/7908cc95b51e4da62111a52533d59e9ff10cea21.png': path.resolve(__dirname, './src/assets/7908cc95b51e4da62111a52533d59e9ff10cea21.png'),
        'figma:asset/78561249bdabb10db45f2e19c3785798769f88cb.png': path.resolve(__dirname, './src/assets/78561249bdabb10db45f2e19c3785798769f88cb.png'),
        'figma:asset/5d083b8c046522abf88456dc17431671c7a94f0d.png': path.resolve(__dirname, './src/assets/5d083b8c046522abf88456dc17431671c7a94f0d.png'),
        'figma:asset/38da05c51f952bb9af3bc061ba6d5ec880a20755.png': path.resolve(__dirname, './src/assets/38da05c51f952bb9af3bc061ba6d5ec880a20755.png'),
        'figma:asset/2c508c4e08485a8f3e97314d1e81a5ddf454e5a1.png': path.resolve(__dirname, './src/assets/2c508c4e08485a8f3e97314d1e81a5ddf454e5a1.png'),
        'figma:asset/16b71f196debb8a02e63c336078a93f05b9711fe.png': path.resolve(__dirname, './src/assets/16b71f196debb8a02e63c336078a93f05b9711fe.png'),
        'figma:asset/122dcd2ebe2b9d58e158d5aa006fd43d2ea55ea8.png': path.resolve(__dirname, './src/assets/122dcd2ebe2b9d58e158d5aa006fd43d2ea55ea8.png'),
        'figma:asset/0add018c10f3889f2c712223ec4a093b5ddf753a.png': path.resolve(__dirname, './src/assets/0add018c10f3889f2c712223ec4a093b5ddf753a.png'),
        'figma:asset/06c17fd60b109f44663983174a9fcffb6a7e8ca4.png': path.resolve(__dirname, './src/assets/06c17fd60b109f44663983174a9fcffb6a7e8ca4.png'),
        'figma:asset/0690a5805cd67144f4f9f4968e8da6dc518fa63d.png': path.resolve(__dirname, './src/assets/0690a5805cd67144f4f9f4968e8da6dc518fa63d.png'),
        'class-variance-authority@0.7.0': 'class-variance-authority',
        '@supabase/supabase-js@2.47.10': '@supabase/supabase-js',
        '@radix-ui/react-dialog@1.1.2': '@radix-ui/react-dialog',
        '@jsr/supabase__supabase-js@2.49.8': '@jsr/supabase__supabase-js',
        '@jsr/supabase__supabase-js@2': '@jsr/supabase__supabase-js',
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true,
    },
  });