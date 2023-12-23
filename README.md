### README.md

# etov

`etov` (Error to Value) is a TypeScript/JavaScript library designed for developers who appreciate the clarity and directness of error handling by value. This approach, inspired by the error handling pattern in Go, involves returning errors as explicit values rather than throwing exceptions. `etov` serves as a wrapper for classical error handling functions, enabling a straightforward and predictable flow in both synchronous and asynchronous operations. It's an ideal tool for those looking to maintain clean, maintainable, and robust error handling in their code.

## Features

- Simple and intuitive error handling
- Supports both synchronous and asynchronous functions
- Compatible with 3rd-party libraries.
- Promotes writing clean, maintainable, and understandable code.

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
### Using with a 3rd-Party Library

```typescript
import etov from 'etov';
import someThirdPartyFunction from 'some-third-party-library';

const [result, error] = etov(someThirdPartyFunction, arg1, arg2);
if (error) {
    console.error('An error occurred:', error);
} else {
    console.log('Third-party function result:', result);
}
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request.