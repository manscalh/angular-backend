/*
  Warnings:

  - A unique constraint covering the columns `[partnumber]` on the table `tb_SSD_FrontEnd_Customer_X_Partnumber` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[tb_SSD_FrontEnd_Customer_X_Partnumber] ADD CONSTRAINT [tb_SSD_FrontEnd_Customer_X_Partnumber_partnumber_key] UNIQUE NONCLUSTERED ([partnumber]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
