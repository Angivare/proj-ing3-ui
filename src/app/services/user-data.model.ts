export type UserId = number;

export enum PrivilegeLevel {
    Guest,
    Student,
    Operator,
    Admin
}

export type ProviderMap<V> = {
    linkedin?: V,
    github?: V,
}

export type UserModel = {
    userId: UserId,
    privilegeLevel: PrivilegeLevel,

    // Sets the operator read permissions based on tags
    authorizedTags: Array<string>,

    // Tags set on student
    tags: Array<string>,

    // These personal data are used for every
    // account type. null means account deanonymized
    // The account is then unusable.
    personalData: {
        mail: string,
        firstName: string,
        lastName: string,
    } | null,

    // As defined by the student. undefined means unauthorized
    // The value gives the URL to inspect for data
    authorizedProviders: ProviderMap<{
        [key: string]: string
    }>,

    // Scraped from the various provider plugins
    providerData: ProviderMap<any>,
}
