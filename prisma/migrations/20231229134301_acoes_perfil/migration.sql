BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[profile] ADD [allowAdd] BIT NOT NULL CONSTRAINT [profile_allowAdd_df] DEFAULT 0,
[allowDelete] BIT NOT NULL CONSTRAINT [profile_allowDelete_df] DEFAULT 0,
[allowEdit] BIT NOT NULL CONSTRAINT [profile_allowEdit_df] DEFAULT 0,
[allowSave] BIT NOT NULL CONSTRAINT [profile_allowSave_df] DEFAULT 0,
[allowView] BIT NOT NULL CONSTRAINT [profile_allowView_df] DEFAULT 0;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
