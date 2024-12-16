import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: [
            "**/tests/**/*.ts",
            "**/lib/*",
            "**/config/*"
        ],
      },
    {
        files: ["**/src/**/*.ts"],
        
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommended,
            ...tseslint.configs.stylistic,
        ],
        rules: {
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    "argsIgnorePattern": "^_",
                    "varsIgnorePattern": "^_",
                    "caughtErrorsIgnorePattern": "^_"
                }
            ],
            "@typescript-eslint/no-inferrable-types": "off",
            "@typescript-eslint/no-explicit-any": "off",
            
        }
    },
);