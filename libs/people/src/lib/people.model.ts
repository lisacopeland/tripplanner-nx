import { deepCopy } from '@tripplanner-nx/common'

export const PERSON_STATUS_NEW = 'new';
export const PERSON_STATUS_ARCHIVED = 'archived';
export const PERSON_STATUS_HASDATA = 'hasdata';

export class Person {
    id: string;
    account_id: string;
    updated_at: string;
    created_at: string;
    name: string;
    admin_status: string;
    admin_notes: string;
    background_pic_url: string;
    email: string;
    passport_number: string;
    passport_expirydate: string;
    birth_date: string;
    phone_number: string;

    constructor(defaultValues: Partial<Person>) {
        Object.keys(defaultValues).forEach((key) => {
            this[key] = defaultValues[key];
        });
    }

    clone() {
        return new Person(deepCopy(this));
    }
}

export function mapToPerson(data: any): Person {
    return new Person(data);
}
export function mapToPeople(data: any[]): Person[] {
    if ((data !== undefined) && (data.length)) {
        const allData = data.map(mapToPerson);
        return allData;
    } else {
        return [];
    }
}

