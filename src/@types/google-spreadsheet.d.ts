declare module 'google-spreadsheet' {

    export interface Worksheet {
        title: string;

        clear(cb: Function): Promise<void>;

        getCells(options: Object): void;

        bulkUpdateCells(cells: Object[]): Promise<void>;
    }

    export interface Cell {
        value: string | number;
    }

    export interface Info {
        worksheets: Worksheet[];
    }
}
