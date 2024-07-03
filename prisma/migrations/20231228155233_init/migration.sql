BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[product] (
    [id] INT NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [SKU] NVARCHAR(1000) NOT NULL,
    [family] NVARCHAR(1000) NOT NULL,
    [dateManufacturing] DATETIME2 NOT NULL CONSTRAINT [product_dateManufacturing_df] DEFAULT CURRENT_TIMESTAMP,
    [deleted] BIT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [product_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [product_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [product_id_key] UNIQUE NONCLUSTERED ([id]),
    CONSTRAINT [product_SKU_key] UNIQUE NONCLUSTERED ([SKU])
);

-- CreateTable
CREATE TABLE [dbo].[company] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [CNPJ] NVARCHAR(1000) NOT NULL,
    [active] BIT NOT NULL CONSTRAINT [company_active_df] DEFAULT 1,
    [deleted] BIT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [company_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [company_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [company_name_key] UNIQUE NONCLUSTERED ([name]),
    CONSTRAINT [company_CNPJ_key] UNIQUE NONCLUSTERED ([CNPJ])
);

-- CreateTable
CREATE TABLE [dbo].[profile] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [active] BIT NOT NULL CONSTRAINT [profile_active_df] DEFAULT 1,
    [deleted] BIT NOT NULL CONSTRAINT [profile_deleted_df] DEFAULT 0,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [profile_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [profile_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [profile_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[user] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [email] VARCHAR(255) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [profileId] INT NOT NULL,
    [companyId] INT NOT NULL,
    [active] BIT NOT NULL CONSTRAINT [user_active_df] DEFAULT 0,
    [deleted] BIT,
    [resetPasswordNextLogin] BIT,
    [codeChangePassword] NVARCHAR(1000),
    [dateRequestChangePassword] DATETIME2,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [user_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [user_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [user_id_key] UNIQUE NONCLUSTERED ([id]),
    CONSTRAINT [user_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[menu] (
    [id] INT NOT NULL IDENTITY(1,1),
    [description] NVARCHAR(1000) NOT NULL,
    [url] NVARCHAR(1000) NOT NULL,
    [active] BIT NOT NULL CONSTRAINT [menu_active_df] DEFAULT 0,
    [showSideBar] BIT NOT NULL CONSTRAINT [menu_showSideBar_df] DEFAULT 0,
    [showHome] BIT NOT NULL CONSTRAINT [menu_showHome_df] DEFAULT 0,
    [isClick] BIT NOT NULL CONSTRAINT [menu_isClick_df] DEFAULT 0,
    [image] NVARCHAR(1000),
    [image_active] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [menu_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [idDad] INT,
    [order] INT,
    [deleted] BIT,
    CONSTRAINT [menu_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[profileaccess] (
    [id] INT NOT NULL IDENTITY(1,1),
    [profileId] INT NOT NULL,
    [menuId] INT NOT NULL,
    CONSTRAINT [profileaccess_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[user] ADD CONSTRAINT [user_profileId_fkey] FOREIGN KEY ([profileId]) REFERENCES [dbo].[profile]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[user] ADD CONSTRAINT [user_companyId_fkey] FOREIGN KEY ([companyId]) REFERENCES [dbo].[company]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[profileaccess] ADD CONSTRAINT [profileaccess_profileId_fkey] FOREIGN KEY ([profileId]) REFERENCES [dbo].[profile]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[profileaccess] ADD CONSTRAINT [profileaccess_menuId_fkey] FOREIGN KEY ([menuId]) REFERENCES [dbo].[menu]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
