import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {

    // Inserir dados na tabela Company
    await prisma.company.createMany({
        data: [
            {
                name: 'Positivo',
                CNPJ: '00000000',
                active: true,
            },
            {
                name: 'Boreo',
                CNPJ: '00000001',
                active: true,
            },
            {
                name: 'FIT',
                CNPJ: '00000002',
                active: true,
            },
        ]
    });

    // Inserir dados na tabela Profile
    await prisma.profile.createMany({
        data: [
            {
                name: 'Administrador',
                allowAdd: true,
                allowSave: true,
                allowEdit: true,
                allowDelete: true,
                allowView: true,
                active: true,
            },
            {
                name: 'Especialista ESG',
                allowAdd: true,
                allowSave: true,
                allowEdit: true,
                allowDelete: true,
                allowView: true,
                active: true,
            },
            {
                name: 'Visitante',
                allowAdd: false,
                allowSave: false,
                allowEdit: false,
                allowDelete: false,
                allowView: true,
                active: true,
            },
        ]
    });

    // Inserir dados na tabela User
    await prisma.user.createMany({
        data: [
            {
                name: 'Administrador',
                email: 'admin@admin.com',
                password: '$2b$10$7Kzta0EZ4T/kpSRwfw.QxenSWw4R9yByDAKmf4RravLCp9KzcZWri',
                profileId: 1, // ID do perfil inserido anteriormente
                companyId: 3, // ID da empresa inserida anteriormente
                active: true,
            },
            {
                name: 'Positivo',
                email: 'positivo@positivo.com',
                password: '$2b$10$7Kzta0EZ4T/kpSRwfw.QxenSWw4R9yByDAKmf4RravLCp9KzcZWri',
                profileId: 2, // ID do perfil inserido anteriormente
                companyId: 1, // ID da empresa inserida anteriormente
                active: true,
            },
            {
                name: 'boreo',
                email: 'boreo@boreo.com',
                password: '$2b$10$7Kzta0EZ4T/kpSRwfw.QxenSWw4R9yByDAKmf4RravLCp9KzcZWri',
                profileId: 3, // ID do perfil inserido anteriormente
                companyId: 1, // ID da empresa inserida anteriormente
                active: true,
            }
        ]
    });

    // Inserir dados na tabela Menu
    await prisma.menu.createMany({
        data: [

            {
                description: 'Home',
                url: '/home',
                active: true,
                showSideBar: true,
                showHome: false,
                isClick: true,
                image: 'icon-home-menu.svg',
                image_active: '',
                createdAt: new Date(),
                updatedAt: new Date(),
                idDad: null,
                order: 0,
                deleted: false,
            },
            {
                description: 'Gerenciamento',
                url: '/management',
                active: true,
                showSideBar: true,
                showHome: false,
                isClick: false,
                image: 'icon-management.svg',
                image_active: '',
                createdAt: new Date(),
                updatedAt: new Date(),
                idDad: null,
                order: 0,
                deleted: false,
            },
            {
                description: 'Grupo de Acesso',
                url: '/management/group-access',
                active: true,
                showSideBar: true,
                showHome: false,
                isClick: true,
                image: 'icon-setting.svg',
                image_active: '',
                createdAt: new Date(),
                updatedAt: new Date(),
                idDad: 2,
                order: 0,
                deleted: false,
            }
        ]
    });

    // Inserir dados na tabela ProfileAccess
    await prisma.profileAccess.createMany({
        data: [
            {
                profileId: 1, // ID do perfil inserido anteriormente
                menuId: 1, // ID do menu inserido anteriormente
            },
            {
                profileId: 2, // ID do perfil inserido anteriormente
                menuId: 2, // ID do menu inserido anteriormente
            },
        ]
    });
}

seed()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
