import { formatAbiParameters, } from './formatAbiParameters.js';
/**
 * Formats ABI item (e.g. error, event, function) into human-readable ABI item
 *
 * @param abiItem - ABI item
 * @returns Human-readable ABI item
 *
 * @deprecated Human-readable ABI utilities are moving to Ox.
 * Install [`ox`](https://oxlib.sh) and use [`AbiItem.format`](https://oxlib.sh/api/AbiItem/format) instead:
 * `import { AbiItem } from 'ox'`.
 */
export function formatAbiItem(abiItem) {
    if (abiItem.type === 'function')
        return `function ${abiItem.name}(${formatAbiParameters(abiItem.inputs)})${abiItem.stateMutability && abiItem.stateMutability !== 'nonpayable'
            ? ` ${abiItem.stateMutability}`
            : ''}${abiItem.outputs?.length
            ? ` returns (${formatAbiParameters(abiItem.outputs)})`
            : ''}`;
    if (abiItem.type === 'event')
        return `event ${abiItem.name}(${formatAbiParameters(abiItem.inputs)})`;
    if (abiItem.type === 'error')
        return `error ${abiItem.name}(${formatAbiParameters(abiItem.inputs)})`;
    if (abiItem.type === 'constructor')
        return `constructor(${formatAbiParameters(abiItem.inputs)})${abiItem.stateMutability === 'payable' ? ' payable' : ''}`;
    if (abiItem.type === 'fallback')
        return `fallback() external${abiItem.stateMutability === 'payable' ? ' payable' : ''}`;
    return 'receive() external payable';
}
//# sourceMappingURL=formatAbiItem.js.map