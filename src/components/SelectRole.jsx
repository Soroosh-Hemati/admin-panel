import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

function SelectRole({ value, onChange, name }) {
    return (
        <CacheProvider value={cacheRtl}>
            <div dir='rtl'>
                <FormControl fullWidth>
                    <InputLabel>نقش</InputLabel>
                    <Select
                        name={name}
                        value={value}
                        onChange={onChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'نقش' }}
                        sx={{ margin: '1rem 0', width: '100%', minWidth: '800px' }}
                    >
                        <MenuItem value={0}>نویسنده</MenuItem>
                        <MenuItem value={1}>مدیر</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </CacheProvider>
    );
}

export default SelectRole;
