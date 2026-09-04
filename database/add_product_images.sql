-- Add image_url column to products table for existing databases
SET @image_column_sql = (
	SELECT IF(
		EXISTS (
			SELECT 1
			FROM information_schema.columns
			WHERE table_schema = DATABASE()
				AND table_name = 'products'
				AND column_name = 'image_url'
		),
		'SELECT 1',
		'ALTER TABLE products ADD COLUMN image_url VARCHAR(2000) NULL AFTER barcode'
	)
);
PREPARE image_column_statement FROM @image_column_sql;
EXECUTE image_column_statement;
DEALLOCATE PREPARE image_column_statement;

