import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import * as path from 'path';

// 当前工作目录路径
const root = process.cwd();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 环境变量
  const env = loadEnv(mode, root, "");
  return {
    base: env.VITE_BASE_URL || "/",
    plugins: [react()],
    build: {
      sourcemap: false,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    test: {
      css: false,
      include: ['src/**/__tests__/*'],
      globals: true,
      environment: 'jsdom',
      setupFiles: 'src/setupTests.ts',
      clearMocks: true,
    },
  }
});
