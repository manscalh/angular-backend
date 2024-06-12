BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[product] ADD [brandId] INT;

-- CreateTable
CREATE TABLE [dbo].[brand] (
    [id] INT NOT NULL IDENTITY(1,1),
    [description] NVARCHAR(1000) NOT NULL,
    [deleted] BIT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [brand_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [brand_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[product] ADD CONSTRAINT [product_brandId_fkey] FOREIGN KEY ([brandId]) REFERENCES [dbo].[brand]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
