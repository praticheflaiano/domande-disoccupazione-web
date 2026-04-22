import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'jsdom',
        globals: true,
        include: ['src/**/*.{test,spec}.{ts,tsx}', 'api/**/*.{test,spec}.ts'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html', 'lcov'],
            include: ['src/utils/**', 'src/services/**', 'api/_lib/**'],
            thresholds: {
                'src/utils/calculations.ts': {
                    statements: 80,
                    branches: 75,
                    functions: 80,
                    lines: 80,
                },
            },
        },
    },
});
