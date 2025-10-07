/**
 * Fees Redux Slice - State Management für Beitragsverwaltung
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { feeService } from '../../lib/api/services';
import type {
  Fee,
  FeeAssignment,
  FeePayment,
  MemberFeeStatus,
  CreateFeeRequest,
  CreateFeeAssignmentRequest,
  CreateFeePaymentRequest,
} from '../../lib/api/types';

interface FeesState {
  fees: Fee[];
  assignments: FeeAssignment[];
  payments: FeePayment[];
  statusOverview: MemberFeeStatus[];
  selectedFee: Fee | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: FeesState = {
  fees: [],
  assignments: [],
  payments: [],
  statusOverview: [],
  selectedFee: null,
  isLoading: false,
  error: null,
};

// ==================== ASYNC THUNKS ====================

export const fetchFees = createAsyncThunk(
  'fees/fetchAll',
  async (activeOnly: boolean = false) => {
    return await feeService.getAll(activeOnly);
  }
);

export const fetchFeeById = createAsyncThunk(
  'fees/fetchById',
  async (id: string) => {
    return await feeService.getById(id);
  }
);

export const createFee = createAsyncThunk(
  'fees/create',
  async (data: CreateFeeRequest) => {
    return await feeService.create(data);
  }
);

export const updateFee = createAsyncThunk(
  'fees/update',
  async ({ id, data }: { id: string; data: Partial<CreateFeeRequest> }) => {
    return await feeService.update(id, data);
  }
);

export const deleteFee = createAsyncThunk(
  'fees/delete',
  async (id: string) => {
    await feeService.delete(id);
    return id;
  }
);

export const fetchStatusOverview = createAsyncThunk(
  'fees/fetchStatusOverview',
  async () => {
    return await feeService.getStatusOverview();
  }
);

export const fetchMemberAssignments = createAsyncThunk(
  'fees/fetchMemberAssignments',
  async (memberId: string) => {
    return await feeService.getMemberAssignments(memberId);
  }
);

export const createAssignment = createAsyncThunk(
  'fees/createAssignment',
  async (data: CreateFeeAssignmentRequest) => {
    return await feeService.createAssignment(data);
  }
);

export const recordPayment = createAsyncThunk(
  'fees/recordPayment',
  async (data: CreateFeePaymentRequest) => {
    return await feeService.recordPayment(data);
  }
);

// ==================== SLICE ====================

const feesSlice = createSlice({
  name: 'fees',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedFee: (state, action: PayloadAction<Fee | null>) => {
      state.selectedFee = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Fees
      .addCase(fetchFees.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fees = action.payload;
      })
      .addCase(fetchFees.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Fehler beim Laden der Beiträge';
      })

      // Fetch Fee by ID
      .addCase(fetchFeeById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedFee = action.payload;
      })
      .addCase(fetchFeeById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Fehler beim Laden des Beitrags';
      })

      // Create Fee
      .addCase(createFee.fulfilled, (state, action) => {
        state.fees.push(action.payload);
      })
      
      // Update Fee
      .addCase(updateFee.fulfilled, (state, action) => {
        const index = state.fees.findIndex(f => f.id === action.payload.id);
        if (index !== -1) {
          state.fees[index] = action.payload;
        }
      })
      
      // Delete Fee
      .addCase(deleteFee.fulfilled, (state, action) => {
        state.fees = state.fees.filter(f => f.id !== action.payload);
      })
      
      // Status Overview
      .addCase(fetchStatusOverview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchStatusOverview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.statusOverview = action.payload;
      })
      
      // Assignments
      .addCase(fetchMemberAssignments.fulfilled, (state, action) => {
        state.assignments = action.payload;
      })
      .addCase(createAssignment.fulfilled, (state, action) => {
        state.assignments.push(action.payload);
      })
      
      // Payments
      .addCase(recordPayment.fulfilled, (state, action) => {
        state.payments.push(action.payload);
      });
  },
});

export const { clearError, setSelectedFee } = feesSlice.actions;
export default feesSlice.reducer;
