import etov, { EtovResponse } from '../index'; // Adjust the import path based on your project structure

// Synchronous function
function syncFunction(a: number, b: number): number {
    return a + b;
}

// Asynchronous function
async function asyncFunction(name: string): Promise<string> {
    return `Hello, ${name}`;
}

// Synchronous function that throws an error
function syncErrorFunction(): void {
    throw new Error('Sync error');
}

// Asynchronous function that throws an error
async function asyncErrorFunction(): Promise<void> {
    throw new Error('Async error');
}

// Synchronous function that returns an EtovResponse
function syncFunctionEtovResponse(a: number, b: number): EtovResponse<number> {
    return [a + b, null];
}

// Synchronous function that returns an EtovResponse with an error
function syncErrorFunctionEtovResponse(a: number, b: number): EtovResponse<number> {
    return [null, new Error('Sync error')];
}

describe('etov function', () => {
    test('handles synchronous function', () => {
        const [result, error] = etov(syncFunction, 5, 3);
        expect(error).toBeNull();
        expect(result).toBe(8);
    });

    test('handles asynchronous function', async () => {
        const [result, error] = await etov(asyncFunction, "Alice");
        expect(error).toBeNull();
        expect(result).toBe("Hello, Alice");
    });

    test('handles synchronous function with error', () => {
        const [result, error] = etov(syncErrorFunction);
        expect(error).toBeInstanceOf(Error);
        expect(error?.message).toBe('Sync error');
        expect(result).toBeNull();
    });

    test('handles asynchronous function with error', async () => {
        const [result, error] = await etov(asyncErrorFunction);
        expect(error).toBeInstanceOf(Error);
        expect(error?.message).toBe('Async error');
        expect(result).toBeNull();
    });

    test('handles synchronous function that returns an EtovResponse', () => {
        const [result, error] = etov(syncFunctionEtovResponse, 5, 3);
        expect(error).toBeNull();
        expect(result).toBe(8);
    });
    test('handles synchronous function that returns an EtovResponse with an error', () => {
        const [result, error] = etov(syncErrorFunctionEtovResponse, 5, 3);
        expect(error).toBeInstanceOf(Error);
        expect(error?.message).toBe('Sync error');
        expect(result).toBeNull();
    });
});
