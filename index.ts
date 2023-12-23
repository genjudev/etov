// Function Overloads

// Overload for asynchronous functions
function etov<T, Args extends any[]>(func: (...args: Args) => Promise<T>, ...args: Args): Promise<[T | null, Error | null]>;

// Overload for synchronous functions
function etov<T, Args extends any[]>(func: (...args: Args) => T, ...args: Args): [T | null, Error | null];

// Function Implementation
function etov<T, Args extends any[]>(func: (...args: Args) => T | Promise<T>, ...args: Args): [T | null, Error | null] | Promise<[T | null, Error | null]> {
    try {
        const result = func(...args);

        // Check if the function is asynchronous
        if (result instanceof Promise) {
            return result
                .then((value): [T, null] => [value, null])
                .catch((error): [null, Error] => [null, error instanceof Error ? error : new Error(String(error))]);
        }

        // Handle synchronous function
        return [result as T, null];
    } catch (error) {
        return [null, error instanceof Error ? error : new Error(String(error))];
    }
}

export = etov;
