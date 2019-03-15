export interface Props {
    fullWidth?: boolean; // 1048592 boolean

    requiredFullWidth: boolean; // 1048592 boolean
}

interface Some extends Props {
    filtrationEnabled?: boolean;
}

// 1048592 boolean
function foo(bool: boolean): boolean {
    return bool;
}

class Clazz {
    bool: Boolean; // 524288 undefined
    bool0: boolean; // 1048592 boolean
    bool1 = false; // 1048592 boolean
    bool2 = true; // 1048592 boolean
    bool3 = true && foo(true); // 1048592 boolean
    bool4 = this.bool1; // 1048592 boolean
    bool5 = foo(false); // 1048592 boolean
    bool6 = Boolean(1); // 1048592 boolean
    str: string; // 4 string
    num: number; // 8 number
    strArr: string[]; // 524288 undefined

    defaultProps = {
        filtrationEnabled: true,
        onOptionSelect: () => {}
    };

    fullWidth?: boolean; // 1048592 boolean

    // 1048592 boolean, 1048592 boolean
    static testFunc(boolArg: boolean, boolArg2 = true): void {
        const boolFromArg = boolArg; // 1048592 boolean
        const boolFromArg2 = boolArg2; // 1048592 boolean

        let bool: boolean; // 1048592 boolean
        const bool1 = false; // 512 false
        const bool2 = true; // 512 true
        const bool3 = true && foo(true); // 1048592 boolean
        const bool4 = bool1; // 512 false
        const bool5 = foo(bool1); // 1048592 boolean
        const bool6 = Boolean(1); // 1048592 boolean

        bool = false;
        console.log(boolFromArg, boolFromArg2, bool, bool1, bool2, bool3, bool4, bool5, bool6);
    }
}

Clazz.testFunc(false);

const stolen = false;