type EtovResponse<T> = [T | null, Error | null];

function isEtovResponse<T>(value: any): value is EtovResponse<T> {
    return Array.isArray(value) && value.length === 2 &&
           (value[0] === null || typeof value[0] !== 'undefined') &&
           (value[1] === null || value[1] instanceof Error);
}

// Function Overloads

// Overload for asynchronous functions
function etov<T, Args extends any[]>(func: (...args: Args) => Promise<T>, ...args: Args): Promise<EtovResponse<T>>;

// Overload for synchronous functions
function etov<T, Args extends any[]>(func: (...args: Args) => T, ...args: Args): EtovResponse<T>;

// Function Implementation
function etov<T, Args extends any[]>(func: (...args: Args) => T | Promise<T>, ...args: Args): EtovResponse<T> | Promise<EtovResponse<T>> {
    try {
        const result = func(...args);

        // Check if the function is asynchronous
        if (result instanceof Promise) {
            return result
                .then((value): EtovResponse<T> => {
                    if (isEtovResponse<T>(value)) {
                        return value;
                    }
                    return [value, null];
                })
                .catch((error): EtovResponse<T> => [null, error instanceof Error ? error : new Error(String(error))]);
        }

        if (isEtovResponse<T>(result)) {
            return result;
        }

        return [result as T, null];
    } catch (error) {
        return [null, error instanceof Error ? error : new Error(String(error))];
    }
}

export = etov;
