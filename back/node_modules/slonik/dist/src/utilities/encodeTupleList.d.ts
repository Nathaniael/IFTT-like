/// <reference types="node" />
import type { TypeNameIdentifier } from '../types';
export declare const encodeTupleList: (tupleList: ReadonlyArray<readonly unknown[]>, columnTypes: readonly TypeNameIdentifier[]) => Promise<Buffer>;
