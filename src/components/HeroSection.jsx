"use client";
import {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {useRouter} from "next/navigation";
import classNames from "classnames";
import {ThemeProvider, createTheme} from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,0.3)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                    },
                },
            },
        },
    },
});

const HeroSection = ({titleShown = true}) => {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (query.length >= 3) {
            const fetchResults = async () => {
                const res = await fetch(`/api/article?query=${query}`);
                const data = await res.json();
                setResults(data);
            };

            fetchResults();
        } else {
            setResults([]);
        }
    }, [query]);

    return (
        <ThemeProvider theme={theme}>
            <div className={classNames("bg-gray-800 text-white text-center", {
                "py-20": !!titleShown,
                "py-4": !titleShown
            })}>
                {titleShown && <h1 className="text-4xl font-bold pb-10">Yardıma mı ihtiyacınız var?</h1>}
                <div className="max-w-md mx-auto">
                    <Autocomplete
                        freeSolo
                        options={results}
                        getOptionLabel={(option) => option.title}
                        onChange={(event, newValue) => {
                            if (newValue?.slug) router.push(`/${newValue.category}/${newValue.slug}`);
                        }}
                        onInputChange={(event, newInputValue) => {
                            setQuery(newInputValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Ara..."
                                variant="outlined"
                                InputProps={{
                                    ...params.InputProps,
                                    style: {color: 'white'},
                                }}
                                InputLabelProps={{
                                    style: {color: 'white'},
                                }}
                            />
                        )}
                    />
                </div>
            </div>
        </ThemeProvider>
    );
};

export default HeroSection;

