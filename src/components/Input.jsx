import TextField from '@mui/material/TextField';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

function Input({ placeholder, name, value, type, onChange, onBlur ,hasError}) {
    return <CacheProvider value={cacheRtl}>
        <div dir='rtl'>
            <TextField
                sx={{ width: '300px', marginBottom: '1.5rem' }}
                label={placeholder}
                name={name}
                value={value}
                type={type}
                onChange={onChange}
                onBlur={onBlur}
                size='small'
                variant='outlined'
                InputProps={{ style: { fontSize: '1rem' } }}
                error={hasError}

            >
            </TextField>
        </div>
    </CacheProvider>
}

export default Input