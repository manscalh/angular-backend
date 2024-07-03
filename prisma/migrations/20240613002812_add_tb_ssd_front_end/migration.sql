BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[tb_SSD_FrontEnd_Customer_X_Partnumber] (
    [id] INT NOT NULL IDENTITY(1,1),
    [customer] VARCHAR(30) NOT NULL,
    [partnumber] VARCHAR(50) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [tb_SSD_FrontEnd_Customer_X_Partnumber_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [tb_SSD_FrontEnd_Customer_X_Partnumber_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
