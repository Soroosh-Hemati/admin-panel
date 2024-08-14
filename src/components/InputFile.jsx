import { TextField } from '@mui/material'
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

function InputFile({ helperText, type, onChange, hasError }) {
    return (
        <CacheProvider value={cacheRtl}>
            <TextField
                variant='outlined'
                helperText={helperText}
                type={type}
                onChange={onChange}
                error={hasError}
                sx={{ margin: '1rem 0', width: '100%', maxWidth: '800px' }}
            ></TextField>
        </CacheProvider>
    )
}

export default InputFile