import { deepCopy } from "../../../common/src/lib/utils";

export class TripDetail {
    id: string;
    tripId: string;
    elementType: string; // Transportation, Accomodation, Activity
    updated_at: string;
    created_at: string;
    account_id: string;
    admin_title: string;
    admin_status: string;
    admin_notes: string;
    start_date: string;
    end_date: string;
    location_start: string;
    location_end: string;
    participants: string[]; // Just going to keep emails
    cost: number;
    costType: string; // per individual or total?

    constructor(defaultValues: Partial<TripDetail>) {
        Object.keys(defaultValues).forEach((key) => {
            this[key] = defaultValues[key];
        });

    }

    clone() {
        return new TripDetail(deepCopy(this));
    }
}

export function mapToTripDetail(data: any): TripDetail {
    return new TripDetail(data);
}
export function mapToTripDetails(data: any[] | undefined): TripDetail[] {
    if (data !== undefined) {
        return data.map(mapToTripDetail);
    } else {
        return [];
    }
}