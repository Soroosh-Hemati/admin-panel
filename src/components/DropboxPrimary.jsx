import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});


function DropboxPrimary({ value, categories, onValueChange }) {
  // const [selectedCategory, setSelectedCategory] = useState('')

  const handleChange = (event) => {
    // setSelectedCategory(event.target.value);
    onValueChange(event.target.value);
  };
  console.log(categories);
  console.log(value);

  return (
    <CacheProvider value={cacheRtl}>
      <div dir='rtl'>

        <InputLabel id='category-select-label' style={{ textAlign: 'right' }}>انتخاب دسته بندی</InputLabel>
        <Select
          labelId='category-select-label'
          label='انتخاب دسته بندی'
          value={value}
          onChange={handleChange}
          direction='rtl'
          sx={{ margin: '1rem 0', width: '100%', minWidth: '800px' }}
          style={{ direction: 'rtl' }}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id} style={{ direction: 'rtl' }}>
              {category.name}
            </MenuItem>
          ))}
        </Select>

      </div>
    </CacheProvider>
  )
}

export default DropboxPrimary