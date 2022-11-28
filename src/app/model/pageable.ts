export interface Pageable<T> {
    content: T[];
    total: number;
    loading: boolean;
    page: number;
}

export const initialPageableState = <T>(): Pageable<T> => ({
    content: [],
    total: 0,
    loading: false,
    page: 0,
});
