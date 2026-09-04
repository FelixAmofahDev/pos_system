-- Add Paystack columns to payments table if they don't exist

SET @paid_amount_sql = IF(
	EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = 'payments' AND column_name = 'paid_amount'),
	'SELECT 1',
	'ALTER TABLE payments ADD COLUMN paid_amount DECIMAL(15,2)'
);
PREPARE paid_amount_statement FROM @paid_amount_sql;
EXECUTE paid_amount_statement;
DEALLOCATE PREPARE paid_amount_statement;

SET @paystack_reference_sql = IF(
	EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = 'payments' AND column_name = 'paystack_reference'),
	'SELECT 1',
	'ALTER TABLE payments ADD COLUMN paystack_reference VARCHAR(100)'
);
PREPARE paystack_reference_statement FROM @paystack_reference_sql;
EXECUTE paystack_reference_statement;
DEALLOCATE PREPARE paystack_reference_statement;

SET @paystack_access_code_sql = IF(
	EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = 'payments' AND column_name = 'paystack_access_code'),
	'SELECT 1',
	'ALTER TABLE payments ADD COLUMN paystack_access_code VARCHAR(100)'
);
PREPARE paystack_access_code_statement FROM @paystack_access_code_sql;
EXECUTE paystack_access_code_statement;
DEALLOCATE PREPARE paystack_access_code_statement;

-- Verify columns exist
SHOW COLUMNS FROM payments;
