// 1. 违反 import/first：导入前有语句
const a = 1;

// 2. 违反 import/consistent-type-specifier-style：要求使用 top-level 的 type 导入
import { type Buffer } from 'node:buffer';

// 3. 违反 import/no-duplicates：重复导入同一模块
import { resolve } from 'node:path';
import { join } from 'node:path';

// 4. 违反 import/no-named-default：使用 default 作为具名导出
import { default as myDefault } from 'node:os';
// 5. 违反 import/newline-after-import：导入后没有空行直接写语句
const b = 2;

// 6. 违反 import/no-mutable-exports：导出了可变变量（let）
export let mutableVar = 3;

export { a, b, mutableVar as default };
