/**
 * ESLint代码检查
 * https://cn.eslint.org/docs/user-guide/configuring
 */

module.exports = {
    parserOptions: {
        ecmaVersion: 2015,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    rules: {
        /** 禁止使用嵌套的三目运算 */
        'no-nested-ternary': 0,

        /** 禁止使用alert confirm prompt */
        'no-alert': 1,
        /** 禁止在条件中使用常量表达式 if(true) if(1) */
        'no-constant-condition': 1,
        /** 禁止使用数组构造器 */
        'no-array-constructor': 1,
        /**  禁止在 return, throw, break 或 continue 之后还有代码 */
        'no-unreachable': 1,
        /** 禁止不必要的call和apply */
        'no-useless-call': 1,
        /** 禁用debugger */
        'no-debugger': 1,

        /**  禁止对 undefined 重新赋值 */
        'no-undefined': 2,
        /**  禁止使用保留字作为变量名 */
        'no-shadow-restricted-names': 2,
        /** 禁用with */
        'no-with': 2,
        /**  禁止使用逗号操作符 */
        'no-sequences': 2,
        /**  禁止将自己与自己比较 */
        'no-self-compare': 2,
        /**  禁止将自己赋值给自己 */
        'no-self-assign': 2,
        /**  禁止使用八进制的转义符 */
        'no-octal-escape': 2,
        /**  禁止使用 0 开头的数字表示八进制数 */
        'no-octal': 2,
        /**  禁止使用 new 来生成 String, Number 或 Boolean */
        'no-new-wrappers': 2,
        /**  禁止使用 new Function，比如 let x = new Function("a", "b", "return a + b"); */
        'no-new-func': 2,
        /**  禁止使用没必要的 {} 作为代码块 */
        'no-lone-blocks': 2,
        /**  禁止在 setTimeout 或 setInterval 中传入字符串，如 setTimeout('alert("Hi!")', 100); */
        'no-implied-eval': 2,
        /**  typeof 表达式比较的对象必须是 'undefined', 'object', 'boolean', 'number', 'string', 'function' 或 'symbol' */
        'valid-typeof': 2,
        /**  必须使用 isNaN(foo) 而不是 foo === NaN */
        'use-isnan': 2,
        /**  @fixable 禁止在 in 或 instanceof 操作符的左侧使用感叹号，如 if (!key in object) */
        'no-unsafe-negation': 2,
        /**  禁止在 finally 中出现 return, throw, break 或 continue */
        'no-unsafe-finally': 2,
        /** 禁止稀疏数组， [1,,2] */
        'no-sparse-arrays': 2,
        /** 禁止在正则表达式字面量中使用多个空格 /foo   bar/, 必须使用 /foo {3}bar/ 代替 */
        'no-regex-spaces': 2,
        /**  禁止将 Math, JSON 或 Reflect 直接作为函数调用 */
        'no-obj-calls': 2,
        /**  禁止在 RegExp 构造函数中出现非法的正则表达式 */
        'no-invalid-regexp': 2,
        /**    禁止在 if 代码块内出现函数声明 */
        'no-inner-declarations': 2,
        /**  禁止将一个函数声明重新赋值 */
        'no-func-assign': 2,
        /**  禁止出现多余的分号 */
        'no-extra-semi': 2,
        /**  禁止出现空代码块，允许 catch 为空代码块 */
        'no-empty': 2,
        'no-duplicate-case': 2,
        /**  除了单行判断，其余都要使用大括号 */
        curly: [2, 'multi-line'],
        /** 未定义前不能使用 */
        'no-use-before-define': [2, { functions: false }],
        /** 禁止else语句内只有if语句 */
        'no-lonely-if': 2,
        /** 不能有不规则的空格 */
        'no-irregular-whitespace': 2,
        /** 禁止使用__iterator__ 属性 */
        'no-iterator': 2,
        /** 正则表达式中的[]内容不能为空 */
        'no-empty-character-class': 2,
        /** 禁止使用arguments.caller或arguments.callee */
        'no-caller': 2,
        /** 禁止在循环中使用函数（如果没有引用外部变量不形成闭包就可以） */
        'no-loop-func': 2,
        /** 禁止在使用new构造一个实例后不赋值 */
        'no-new': 2,
        /** 禁止使用new Object() */
        'no-new-object': 2,
        /** 禁止使用new require */
        'no-new-require': 2,
        /**  禁止 for 循环出现方向错误的循环，比如 for (i = 0; i < 10; i--) */
        'for-direction': 2,
        /**  禁止与负零进行比较 */
        'no-compare-neg-zero': 2,
        /**  禁止在正则表达式中出现 Ctrl 键的 ASCII 表示，即禁止使用 /\x1f/ */
        'no-control-regex': 2,
        /**  禁止在函数参数中出现重复名称的参数 */
        'no-dupe-args': 2,
        /**  禁止在对象字面量中出现重复名称的键名 */
        'no-dupe-keys': 2,
        /** 禁止使用eval */
        'no-eval': 2,
        /** 禁止catch子句参数与外部作用域变量同名 */
        'no-catch-shadow': 2,
        /** 禁止给类赋值 */
        'no-class-assign': 2,
        /** 禁止给catch语句中的异常参数赋值 */
        'no-ex-assign': 2,
        /** 禁止扩展native对象 */
        'no-extend-native': 2,
        /** 不能重写native对象 */
        'no-native-reassign': 2,
        /** 禁止使用__proto__属性 */
        'no-proto': 2,
        /** 禁止重复声明变量 */
        'no-redeclare': 2,
        /** 外部作用域中的变量不能与它所包含的作用域中的变量或参数同名 */
        'no-shadow': 2,
        /** 函数调用时 函数名与()之间不能有空格 */
        'no-spaced-func': 2,
        /** 变量初始化时不能直接给它赋值为undefined */
        'no-undef-init': 2,
        /** 禁用void操作符 */
        'no-void': 2,
        /** 函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用 */
        // 'new-cap': 2,
        /** new时必须加小括号 */
        'new-parens': 2
    }
};