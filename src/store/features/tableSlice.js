import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dummy } from '../dummy';
// import customerInfo from "../MOCK_DATA.json"
// import axios from 'axios';

// Async thunk for fetching table data with filters, pagination, etc.
export const fetchTableData = createAsyncThunk(
  'table/fetchTableData',
  async ({ page, pageSize, search, sortBy }, { rejectWithValue }) => {
    try {
    //   const response = await axios.get('/api/your-endpoint', {
    //     params: {
    //       page,
    //       pageSize,
    //       search,
    //       sort: sortBy.column,
    //       order: sortBy.direction,
    //     },
    //   });
    //   return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const tableSlice = createSlice({
  name: 'table',
  initialState: {
    data: dummy.customerInfo ,//customerInfo,
    page: 1,
    pageSize: 10,
    search: '',
    sortBy: { column: 'id', direction: 'asc' },
    totalRecords: 0,
    loading: false,
    error: null,
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setPageSize(state, action) {
      state.pageSize = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTableData.pending, (state) => {
        state.loading = false;
      })
      .addCase(fetchTableData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.data;
        state.totalRecords = action.payload?.totalRecords;
      })
      .addCase(fetchTableData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage, setPageSize, setSearch, setSortBy } = tableSlice.actions;
export default tableSlice.reducer;
