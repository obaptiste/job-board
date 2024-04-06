'use client';
import { Roboto } from 'next/font/google';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: '#4CAF50', // A vibrant green
                    contrastText: '#FFFFFF', // White text for contrast
                },
                secondary: {
                    main: '#E91E63', // A bold pink
                    contrastText: '#FFFFFF', // White text for contrast
                },
                error: {
                    main: '#F44336', // A bright red
                    contrastText: '#FFFFFF', // White text for contrast
                },
                warning: {
                    main: '#FF9800', // An energetic orange
                    contrastText: '#FFFFFF', // White text for contrast
                },
                info: {
                    main: '#2196F3', // A clear blue
                    contrastText: '#FFFFFF', // White text for contrast
                },
                success: {
                    main: '#4CAF50', // The same vibrant green as primary
                    contrastText: '#FFFFFF', // White text for contrast
                },
            },
        },
        dark: {
            palette: {
                primary: {
                    main: '#9CCC65', // A lighter green for dark mode
                    contrastText: '#FFFFFF', // White text for contrast
                },
                secondary: {
                    main: '#F06292', // A softer pink for dark mode
                    contrastText: '#FFFFFF', // White text for contrast
                },
                error: {
                    main: '#EF9A9A', // A warmer red for dark mode
                    contrastText: '#FFFFFF', // White text for contrast
                },
                warning: {
                    main: '#FFCC80', // A more muted orange for dark mode
                    contrastText: '#FFFFFF', // White text for contrast
                },
                info: {
                    main: '#64B5F6', // A calmer blue for dark mode
                    contrastText: '#FFFFFF', // White text for contrast
                },
                success: {
                    main: '#9CCC65', // The same lighter green as primary
                    contrastText: '#FFFFFF', // White text for contrast
                },
            },
        },
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: 'contained',
            },
        },
    },
});



export default theme;
