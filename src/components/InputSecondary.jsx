import TextField from '@mui/material/TextField';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import { Box } from '@mui/material';

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

function InputSecondary({ placeholder, value, type, onChange, hasError, multiline, name }) {
    return (
        <Box sx={{ width: '100%', maxWidth: '800px' }}>
            <CacheProvider value={cacheRtl}>
                <div dir='rtl'>
                    <TextField
                        variant='outlined'
                        label={placeholder}
                        value={value}
                        type={type}
                        onChange={onChange}
                        error={hasError}
                        sx={{ margin: '1rem 0', width: '100%', alignSelf: 'stretch' }}
                        multiline={multiline}
                        rows={4}
                        name={name}
                    >
                    </TextField>
                </div>
            </CacheProvider>
        </Box>
    )
}

export default InputSecondary