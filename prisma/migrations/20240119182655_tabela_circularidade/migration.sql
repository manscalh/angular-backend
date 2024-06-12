BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[circularityUploadType] (
    [id] INT NOT NULL,
    [name] VARCHAR(255) NOT NULL,
    [deleted] BIT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [circularityUploadType_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [circularityUploadType_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[circularityUpload] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(255) NOT NULL,
    [urlImage] NVARCHAR(1000) NOT NULL,
    [typeUploadId] INT NOT NULL,
    [circulatityId] INT NOT NULL,
    [deleted] BIT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [circularityUpload_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [circularityUpload_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[circulatityStatus] (
    [id] INT NOT NULL,
    [name] VARCHAR(255) NOT NULL,
    [deleted] BIT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [circulatityStatus_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [circulatityStatus_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[circulatityGeneralCondition] (
    [id] INT NOT NULL,
    [name] VARCHAR(255) NOT NULL,
    [deleted] BIT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [circulatityGeneralCondition_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [circulatityGeneralCondition_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[circulatityOriginDestination] (
    [id] INT NOT NULL IDENTITY(1,1),
    [CNPJ] VARCHAR(255) NOT NULL,
    [CPF] VARCHAR(255) NOT NULL,
    [name] VARCHAR(255) NOT NULL,
    CONSTRAINT [circulatityOriginDestination_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [circulatityOriginDestination_CNPJ_CPF_key] UNIQUE NONCLUSTERED ([CNPJ],[CPF])
);

-- CreateTable
CREATE TABLE [dbo].[circularity] (
    [id] INT NOT NULL IDENTITY(1,1),
    [serial] VARCHAR(255) NOT NULL,
    [productId] INT NOT NULL,
    [generalConditionId] INT NOT NULL,
    [originId] INT,
    [totalCountPrintPages] INT NOT NULL,
    [currentSupplylevel] DECIMAL(9,2),
    [currentInkLevel] DECIMAL(9,2),
    [currentMaintenanceKitLevel] DECIMAL(9,2),
    [printerCleaning] BIT NOT NULL CONSTRAINT [circularity_printerCleaning_df] DEFAULT 0,
    [replacementRepair] BIT NOT NULL CONSTRAINT [circularity_replacementRepair_df] DEFAULT 0,
    [commentReplacementRepair] NVARCHAR(1000),
    [destinationId] INT,
    [additionalNote] NVARCHAR(1000),
    [circulatityStatusId] INT NOT NULL,
    [userCreatedId] NVARCHAR(1000) NOT NULL,
    [deleted] BIT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [circularity_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [circularity_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[circularityUpload] ADD CONSTRAINT [circularityUpload_typeUploadId_fkey] FOREIGN KEY ([typeUploadId]) REFERENCES [dbo].[circularityUploadType]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[circularityUpload] ADD CONSTRAINT [circularityUpload_circulatityId_fkey] FOREIGN KEY ([circulatityId]) REFERENCES [dbo].[circularity]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[circularity] ADD CONSTRAINT [circularity_productId_fkey] FOREIGN KEY ([productId]) REFERENCES [dbo].[product]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[circularity] ADD CONSTRAINT [circularity_generalConditionId_fkey] FOREIGN KEY ([generalConditionId]) REFERENCES [dbo].[circulatityGeneralCondition]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[circularity] ADD CONSTRAINT [circularity_originId_fkey] FOREIGN KEY ([originId]) REFERENCES [dbo].[circulatityOriginDestination]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[circularity] ADD CONSTRAINT [circularity_destinationId_fkey] FOREIGN KEY ([destinationId]) REFERENCES [dbo].[circulatityOriginDestination]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[circularity] ADD CONSTRAINT [circularity_circulatityStatusId_fkey] FOREIGN KEY ([circulatityStatusId]) REFERENCES [dbo].[circulatityStatus]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[circularity] ADD CONSTRAINT [circularity_userCreatedId_fkey] FOREIGN KEY ([userCreatedId]) REFERENCES [dbo].[user]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
