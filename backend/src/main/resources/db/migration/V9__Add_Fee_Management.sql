-- Migration V9: Fee Management Tables
-- Erstellt von Hans Hahn - Alle Rechte vorbehalten
-- Datum: 2025-10-07

-- ============================================
-- 1. FEES Table (Beitragssätze)
-- ============================================
CREATE TABLE fees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL CHECK (amount >= 0),
    period VARCHAR(50) NOT NULL CHECK (period IN ('YEARLY', 'QUARTERLY', 'MONTHLY', 'ONCE')),
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT unique_fee_name_per_org UNIQUE (org_id, name)
);

CREATE INDEX idx_fees_org_id ON fees(org_id);
CREATE INDEX idx_fees_org_active ON fees(org_id, is_active);

-- ============================================
-- 2. FEE_ASSIGNMENTS Table (Zuweisungen)
-- ============================================
CREATE TABLE fee_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
    fee_id UUID NOT NULL REFERENCES fees(id) ON DELETE RESTRICT,
    start_date DATE NOT NULL,
    end_date DATE,
    status VARCHAR(50) NOT NULL CHECK (status IN ('ACTIVE', 'INACTIVE', 'CANCELLED')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT check_end_date_after_start CHECK (end_date IS NULL OR end_date >= start_date)
);

CREATE INDEX idx_fee_assignments_member_id ON fee_assignments(member_id);
CREATE INDEX idx_fee_assignments_fee_id ON fee_assignments(fee_id);
CREATE INDEX idx_fee_assignments_status ON fee_assignments(status);
CREATE INDEX idx_fee_assignments_dates ON fee_assignments(start_date, end_date);

-- ============================================
-- 3. FEE_PAYMENTS Table (Zahlungen)
-- ============================================
CREATE TABLE fee_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fee_assignment_id UUID NOT NULL REFERENCES fee_assignments(id) ON DELETE RESTRICT,
    amount_paid DECIMAL(10, 2) NOT NULL CHECK (amount_paid > 0),
    payment_date DATE NOT NULL,
    payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('CASH', 'BANK_TRANSFER', 'SEPA', 'PAYPAL', 'OTHER')),
    period_start DATE,
    period_end DATE,
    reference_number VARCHAR(255),
    notes TEXT,
    recorded_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT check_payment_period CHECK (period_end IS NULL OR period_end >= period_start)
);

CREATE INDEX idx_fee_payments_assignment_id ON fee_payments(fee_assignment_id);
CREATE INDEX idx_fee_payments_payment_date ON fee_payments(payment_date);
CREATE INDEX idx_fee_payments_recorded_by ON fee_payments(recorded_by_user_id);

-- ============================================
-- 4. Comments
-- ============================================
COMMENT ON TABLE fees IS 'Beitragssätze (z.B. Jahresbeitrag, Monatsbeitrag)';
COMMENT ON TABLE fee_assignments IS 'Zuweisung von Beiträgen zu Mitgliedern';
COMMENT ON TABLE fee_payments IS 'Dokumentation aller Zahlungseingänge';

COMMENT ON COLUMN fees.period IS 'YEARLY, QUARTERLY, MONTHLY, ONCE';
COMMENT ON COLUMN fee_assignments.status IS 'ACTIVE, INACTIVE, CANCELLED';
COMMENT ON COLUMN fee_payments.payment_method IS 'CASH, BANK_TRANSFER, SEPA, PAYPAL, OTHER';
