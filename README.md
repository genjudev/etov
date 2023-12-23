### README.md

# etov

`etov` (Error to Value) is a TypeScript/JavaScript library designed to streamline error handling by returning errors as values. This package provides a simple and consistent way to handle errors for both synchronous and asynchronous functions, inspired by the error handling approach in Go.

## Features

- Simple and intuitive error handling
- Supports both synchronous and asynchronous functions
- Helps in writing clean and maintainable code

## Installation

```bash
npm install etov
```

## Usage

### Synchronous Function

```typescript
import etov from 'etov';

function syncFunction(a: number, b: number): number {
    if (a < 0) throw new Error('Negative number not allowed');
    return a + b;
}

const [result, error] = etov(syncFunction, 5, 3);
if (error) {
    console.error(error);
} else {
    console.log('Result:', result);
}
```

### Asynchronous Function

```typescript
import etov from 'etov';

async function asyncFunction(name: string): Promise<string> {
    return `Hello, ${name}`;
}

const [result, error] = await etov(asyncFunction, 'Alice');
if (error) {
    console.error(error);
} else {
    console.log('Result:', result);
}
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request.