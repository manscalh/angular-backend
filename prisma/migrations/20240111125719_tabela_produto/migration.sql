/*
  Warnings:

  - You are about to drop the column `dateManufacturing` on the `product` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- RedefineTables
BEGIN TRANSACTION;
ALTER TABLE [dbo].[product] DROP CONSTRAINT [product_id_key];
ALTER TABLE [dbo].[product] DROP CONSTRAINT [product_SKU_key];
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'product'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_product] (
    [id] INT NOT NULL IDENTITY(1,1),
    [description] NVARCHAR(1000) NOT NULL,
    [SKU] NVARCHAR(1000) NOT NULL,
    [family] NVARCHAR(1000),
    [deleted] BIT,
    [weight] DECIMAL(32,16),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [product_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [product_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [product_SKU_key] UNIQUE NONCLUSTERED ([SKU])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_product] ON;
IF EXISTS(SELECT * FROM [dbo].[product])
    EXEC('INSERT INTO [dbo].[_prisma_new_product] ([SKU],[createdAt],[deleted],[description],[family],[id],[updatedAt]) SELECT [SKU],[createdAt],[deleted],[description],[family],[id],[updatedAt] FROM [dbo].[product] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_product] OFF;
DROP TABLE [dbo].[product];
EXEC SP_RENAME N'dbo._prisma_new_product', N'product';
COMMIT;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
