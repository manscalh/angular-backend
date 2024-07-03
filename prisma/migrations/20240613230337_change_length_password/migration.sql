BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[tb_SSD_FrontEnd_Customer_X_Partnumber] DROP CONSTRAINT [tb_SSD_FrontEnd_Customer_X_Partnumber_customer_key];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
