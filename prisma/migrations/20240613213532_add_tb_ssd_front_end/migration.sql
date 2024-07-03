/*
  Warnings:

  - A unique constraint covering the columns `[customer]` on the table `tb_SSD_FrontEnd_Customer_X_Partnumber` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[tb_SSD_FrontEnd_Customer_X_Partnumber] ALTER COLUMN [customer] VARCHAR(255) NOT NULL;
ALTER TABLE [dbo].[tb_SSD_FrontEnd_Customer_X_Partnumber] ALTER COLUMN [partnumber] VARCHAR(255) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[tb_SSD_FrontEnd_Customer_X_Partnumber] ADD CONSTRAINT [tb_SSD_FrontEnd_Customer_X_Partnumber_customer_key] UNIQUE NONCLUSTERED ([customer]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
