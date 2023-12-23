// Function Overloads

// Overload for asynchronous functions
function etov<T, Args extends any[]>(func: (...args: Args) => Promise<T>, ...args: Args): Promise<[Error | null, T | null]>;

// Overload for synchronous functions
function etov<T, Args extends any[]>(func: (...args: Args) => T, ...args: Args): [Error | null, T | null];

// Function Implementation
function etov<T, Args extends any[]>(func: (...args: Args) => T | Promise<T>, ...args: Args): [Error | null, T | null] | Promise<[Error | null, T | null]> {
    try {
        const result = func(...args);

        // Check if the function is asynchronous
        if (result instanceof Promise) {
            return result
                .then((value): [null, T] => [null, value])
                .catch((error): [Error, null] => [error instanceof Error ? error : new Error(String(error)), null]);
        }

        // Handle synchronous function
        return [null, result as T];
    } catch (error) {
        return [error instanceof Error ? error : new Error(String(error)), null];
    }
}

export default etov;
