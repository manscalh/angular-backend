/*
  Warnings:

  - A unique constraint covering the columns `[numberRecord]` on the table `circularity` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `numberRecord` to the `circularity` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[circularity] ADD [numberRecord] VARCHAR(255) NOT NULL,
[sendEquipment] BIT NOT NULL CONSTRAINT [circularity_sendEquipment_df] DEFAULT 0;

-- CreateTable
CREATE TABLE [dbo].[circularityStatusHistory] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] NVARCHAR(1000) NOT NULL,
    [statusId] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [circularityStatusHistory_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [circularityStatusHistory_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
ALTER TABLE [dbo].[circularity] ADD CONSTRAINT [circularity_numberRecord_key] UNIQUE NONCLUSTERED ([numberRecord]);

-- AddForeignKey
ALTER TABLE [dbo].[circularityStatusHistory] ADD CONSTRAINT [circularityStatusHistory_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[user]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[circularityStatusHistory] ADD CONSTRAINT [circularityStatusHistory_statusId_fkey] FOREIGN KEY ([statusId]) REFERENCES [dbo].[circulatityStatus]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
