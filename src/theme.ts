'use client';
import { Roboto } from 'next/font/google';
import { createTheme, ThemeOptions } from '@mui/material/styles';
import { OverridableStringUnion } from '@mui/types';
import { ButtonPropsVariantOverrides } from '@mui/material/Button';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const baseTheme: ThemeOptions = {
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: 'contained' as OverridableStringUnion<
                    'contained' | 'text' | 'outlined',
                    ButtonPropsVariantOverrides
                >,
            },
        },
    },
};

const lightTheme: ThemeOptions = createTheme({
    ...baseTheme,
    palette: {
        mode: 'light',
        primary: {
            main: '#64B5F6',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#81C784',
            contrastText: '#FFFFFF',
        },
        error: {
            main: '#E57373',
            contrastText: '#FFFFFF',
        },
        warning: {
            main: '#FFB74D',
            contrastText: '#FFFFFF',
        },
        info: {
            main: '#4FC3F7',
            contrastText: '#FFFFFF',
        },
        success: {
            main: '#81C784',
            contrastText: '#FFFFFF',
        },
    },
});

const darkTheme: ThemeOptions = createTheme({
    ...baseTheme,
    palette: {
        mode: 'dark',
        primary: {
            main: '#2196F3', // A deep, vibrant blue
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#9CCC65', // A muted, earthy green
            contrastText: '#FFFFFF',
        },
        error: {
            main: '#EF9A9A', // A warm, muted red
            contrastText: '#FFFFFF',
        },
        warning: {
            main: '#FFB74D', // A golden, metallic orange
            contrastText: '#FFFFFF',
        },
        info: {
            main: '#64B5F6', // A calmer, more subdued blue
            contrastText: '#FFFFFF',
        },
        success: {
            main: '#9CCC65', // The same muted, earthy green as secondary
            contrastText: '#FFFFFF',
        },
    },
});

export { lightTheme, darkTheme };