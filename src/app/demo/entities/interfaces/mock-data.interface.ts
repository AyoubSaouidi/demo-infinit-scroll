export interface IMockDataItem {
    id: string;
    name: string;
    description?: string;
}

export interface IPaginatedData<T> {
    docs: T[],
    meta: IPaginationMeta
}

export interface IPaginationMeta {
    page: number;
    limit: number;
    count: number;
    totalPages: number;
    total: number;
    next?: number;
    previous?: number;
}